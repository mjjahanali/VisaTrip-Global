import 'dotenv/config';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import express from 'express';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { leadStore, type LeadStatus } from './src/lib/leadStore';
import { servicesData } from './src/data/services';
import { destinationsData } from './src/data/destinations';
import { tourPackagesData } from './src/data/packages';
import { blogPostsData } from './src/data/blogs';
import { sampleTrackingRecords } from './src/data/siteContent';
import { imageManifest } from './src/config/imageManifest.generated';

type ImageKey = keyof typeof imageManifest;

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';
const SITE_URL = (process.env.APP_URL || process.env.VITE_SITE_URL || 'https://www.visatripglobal.com').replace(/\/$/, '');
const ENFORCE_WWW_REDIRECT = process.env.ENFORCE_WWW_REDIRECT === 'true';
const WHATSAPP_NUMBER = process.env.VITE_WHATSAPP_NUMBER || '8801771304219';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'visatrip-admin-2026';

// Simple in-memory rate limiter (10 inquiry submissions per 15 min per IP)
const rateMap = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxRequests = 10;
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxRequests) return false;
  entry.count += 1;
  return true;
}

const inquirySchema = z.object({
  name: z.string().trim().min(2, 'নাম কমপক্ষে ২ অক্ষরের হতে হবে').max(120),
  phone: z
    .string()
    .trim()
    .min(8, 'সঠিক মোবাইল বা WhatsApp নম্বর দিন')
    .max(25),
  email: z.string().trim().email().optional().or(z.literal('')),
  service: z.string().trim().min(1).max(120).default('General Consultation'),
  country: z.string().trim().max(120).optional().default(''),
  message: z.string().trim().max(2000).optional().default(''),
  sourcePage: z.string().trim().max(300).optional().default('/'),
  formType: z.string().trim().max(80).optional().default('consultation'),
  utmSource: z.string().trim().max(120).optional().default(''),
  utmMedium: z.string().trim().max(120).optional().default(''),
  utmCampaign: z.string().trim().max(120).optional().default(''),
  extra: z.record(z.string(), z.string()).optional(),
  // Honeypot field: bots fill this; humans leave it blank
  website_url: z.string().optional().default(''),
});

async function sendOptionalNotificationEmail(lead: {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  country: string;
  message: string;
  sourcePage: string;
  formType?: string;
}): Promise<boolean> {
  const emailTo = process.env.EMAIL_TO;
  const emailFrom = process.env.EMAIL_FROM || 'Visatrip Global <noreply@visatripglobal.com>';
  if (!emailTo) return false;

  const subject = `[Visatrip Global Lead ${lead.id}] ${lead.service} — ${lead.name}`;
  const textBody = [
    `Lead ID: ${lead.id}`,
    `Name: ${lead.name}`,
    `Phone / WhatsApp: ${lead.phone}`,
    lead.email ? `Email: ${lead.email}` : null,
    `Service: ${lead.service}`,
    lead.country ? `Country: ${lead.country}` : null,
    `Form Type: ${lead.formType || 'consultation'}`,
    `Source Page: ${lead.sourcePage}`,
    `Message: ${lead.message || '(No additional message)'}`,
  ]
    .filter(Boolean)
    .join('\n');

  // Option A: Resend HTTP API
  if (process.env.RESEND_API_KEY) {
    try {
      const resp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: emailFrom,
          to: [emailTo],
          subject,
          text: textBody,
        }),
      });
      if (resp.ok) return true;
    } catch {
      // Fallback gracefully
    }
  }

  // Option B: Nodemailer SMTP
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      await transporter.sendMail({
        from: emailFrom,
        to: emailTo,
        subject,
        text: textBody,
      });
      return true;
    } catch {
      return false;
    }
  }

  return false;
}

interface ServerRouteSeo {
  title: string;
  description: string;
  canonical: string;
  bnUrl: string;
  enUrl: string;
  locale: 'bn' | 'en';
  ogType: 'website' | 'article';
  ogImage: string;
  robots: 'index, follow' | 'noindex, follow' | 'noindex, nofollow';
  httpStatus: 200 | 404;
  emitHreflang: boolean;
}

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function getOptimizedOgImageUrl(imageKey: ImageKey = 'hero'): string {
  const entry = imageManifest[imageKey] || imageManifest.hero;
  return `${SITE_URL}${entry.src}`;
}

function buildServerRouteSeo(pathname: string): ServerRouteSeo {
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '') || '/';
  const isEn = normalizedPath === '/en' || normalizedPath.startsWith('/en/');
  const locale: 'bn' | 'en' = isEn ? 'en' : 'bn';
  const clean = normalizedPath.replace(/^\/en(?=\/|$)/, '') || '/';
  const bnUrl = `${SITE_URL}${clean}`;
  const enUrl = `${SITE_URL}${clean === '/' ? '/en' : `/en${clean}`}`;
  const canonical = isEn ? enUrl : bnUrl;
  const defaultImage = getOptimizedOgImageUrl('hero');

  const staticMeta: Record<
    string,
    {
      titleBn: string;
      descBn: string;
      titleEn: string;
      descEn: string;
      imageKey?: ImageKey;
      robots?: 'index, follow' | 'noindex, follow' | 'noindex, nofollow';
    }
  > = {
    '/': {
      titleBn: 'Visatrip Global — প্রতিটি গন্তব্যে এক বিশ্বস্ত সহযোগী',
      descBn: 'চাঁপাইনবাবগঞ্জের বিশ্বস্ত ট্রাভেল এজেন্সি — Work Permit, Tourist Visa, Student Visa, Hajj & Umrah, India Visa, Air Ticket ও Tour Package।',
      titleEn: 'Visatrip Global — Trusted Travel & Visa Agency Bangladesh',
      descEn: 'Visatrip Global in Chapai Nawabganj offers honest consultation for Work Permit, Tourist Visa, Student Visa, Hajj & Umrah, India Visa & Air Ticketing.',
      imageKey: 'hero',
    },
    '/about': {
      titleBn: 'আমাদের সম্পর্কে | Visatrip Global চাঁপাইনবাবগঞ্জ',
      descBn: 'Visatrip Global — চাঁপাইনবাবগঞ্জের বিশ্বস্ত ট্রাভেল ও ভিসা কনসালটেন্সি। আমাদের গল্প, মিশন, মূল্যবোধ এবং অভিজ্ঞ টিম সম্পর্কে জানুন।',
      titleEn: 'About Visatrip Global | Trusted Travel Agency Bangladesh',
      descEn: 'Discover Visatrip Global’s story, mission, transparent values, and consultancy team in Chapai Nawabganj, Bangladesh.',
      imageKey: 'office',
    },
    '/services': {
      titleBn: 'আমাদের ৮টি ট্রাভেল ও ভিসা সার্ভিস | Visatrip Global',
      descBn: 'Work Permit, Tourist Visa, Student Consultancy, Hajj & Umrah, India Visa, Air Ticketing, Hotel Booking ও Tour Package — Visatrip Global।',
      titleEn: 'All 8 Travel & Visa Services | Visatrip Global',
      descEn: 'Explore all 8 services at Visatrip Global: Work Permit, Tourist Visa, Student Consultancy, Hajj & Umrah, India Visa, Air Ticketing, Hotel Booking & Tours.',
      imageKey: 'hero',
    },
    '/destinations': {
      titleBn: 'জনপ্রিয় ডেস্টিনেশন ও ভিসা গাইড | Visatrip Global',
      descBn: 'দুবাই, সৌদি আরব, মালয়েশিয়া, থাইল্যান্ড, সিঙ্গাপুর, তুরস্ক, ইউরোপ, ভারত, মালদ্বীপ ও নেপাল ভ্রমণ ও ভিসা গাইড — Visatrip Global।',
      titleEn: 'Popular Destinations & Visa Guides | Visatrip Global',
      descEn: 'Explore visa requirements, processing times, and travel packages for Dubai, Saudi Arabia, Malaysia, Thailand, Singapore, Turkey, Europe, and India.',
      imageKey: 'dubai',
    },
    '/tour-packages': {
      titleBn: 'ট্যুর ও ওমরাহ প্যাকেজ বাংলাদেশ | Visatrip Global',
      descBn: 'দুবাই, মালয়েশিয়া, থাইল্যান্ড, সিঙ্গাপুর, তুরস্ক, ওমরাহ ও দেশের ভেতরের ট্যুর প্যাকেজ ফিল্টার এবং পাশাপাশি তুলনা করুন — Visatrip Global।',
      titleEn: 'Tour & Umrah Packages Bangladesh | Visatrip Global',
      descEn: 'Filter and compare up to 3 international, Umrah, and domestic Bangladesh tour packages side by side at Visatrip Global.',
      imageKey: 'thailand',
    },
    '/success-stories': {
      titleBn: 'সাফল্যের গল্প ও ক্লায়েন্ট মতামত | Visatrip Global',
      descBn: 'Visatrip Global-এর সাথে ভিসা, ওমরাহ, ভারত মেডিকেল ভিসা ও ভ্রমণের বাস্তব অভিজ্ঞতা ও স্বচ্ছ সেবার গল্প।',
      titleEn: 'Client Stories & Feedback | Visatrip Global',
      descEn: 'Read client experiences and feedback on Visatrip Global’s honest visa, Umrah, and travel services.',
      imageKey: 'office',
    },
    '/gallery': {
      titleBn: 'ফটো গ্যালারি | Visatrip Global',
      descBn: 'Visatrip Global অফিস, মক্কা-মদিনা, জনপ্রিয় ভ্রমণ ডেস্টিনেশন এবং ক্লায়েন্ট মুহূর্তের ফটো গ্যালারি।',
      titleEn: 'Photo Gallery | Visatrip Global',
      descEn: 'Browse Visatrip Global’s office environment, sacred pilgrimage visuals, and featured international destinations.',
      imageKey: 'office',
    },
    '/blog': {
      titleBn: 'ভিসা ও ট্রাভেল গাইড ব্লগ | Visatrip Global',
      descBn: 'Dubai Tourist Visa, India Medical Visa, ওমরাহ প্রস্তুতি, Work Permit সুরক্ষা, Student Bank Solvency ও Malaysia ভ্রমণ গাইড — Visatrip Global ব্লগ।',
      titleEn: 'Visa & Travel Knowledge Blog | Visatrip Global',
      descEn: 'In-depth travel and visa guides from Bangladesh covering Dubai Visa, India Medical Visa, Umrah prep, Work Permit safety, and Student Bank Solvency.',
      imageKey: 'malaysia',
    },
    '/faq': {
      titleBn: 'সচরাচর জিজ্ঞাসা (FAQ) | Visatrip Global',
      descBn: 'Work Permit, Tourist Visa, Student Consultancy, হজ্জ ও ওমরাহ, India Medical Visa এবং Air Ticketing সংক্রান্ত সকল প্রশ্নের সৎ উত্তর।',
      titleEn: 'Frequently Asked Questions | Visatrip Global',
      descEn: 'Honest answers to common questions about Work Permits, Tourist Visas, Student Visas, Hajj & Umrah, India Visa, and Air Ticketing.',
    },
    '/contact': {
      titleBn: 'যোগাযোগ ও ফ্রি কনসাল্টেশন | Visatrip Global চাঁপাইনবাবগঞ্জ',
      descBn: 'Visatrip Global — রহনপুর, গোমস্তাপুর, চাঁপাইনবাবগঞ্জ অফিস ঠিকানা, হটলাইন +880 1771-304219, WhatsApp ও অনলাইন ফ্রি কনসাল্টেশন ফর্ম।',
      titleEn: 'Contact Visatrip Global | Chapai Nawabganj Office & Hotline',
      descEn: 'Visit Visatrip Global in Rohanpur, Gomastapur, Chapai Nawabganj or contact +880 1771-304219 via Call or WhatsApp for free travel consultation.',
      imageKey: 'office',
    },
    '/service-areas': {
      titleBn: 'চাঁপাইনবাবগঞ্জ ও রাজশাহী সার্ভিস এরিয়া | Visatrip Global',
      descBn: 'রহনপুর, গোমস্তাপুর, চাঁপাইনবাবগঞ্জ সদর, শিবগঞ্জ ও রাজশাহী থেকে ভিসা, ওমরাহ প্যাকেজ, ইন্ডিয়া মেডিকেল ভিসা, স্টুডেন্ট কনসালটেন্সি ও এয়ার টিকেট সেবা।',
      titleEn: 'Chapai Nawabganj & Rajshahi Service Areas | Visatrip Global',
      descEn: 'Local travel & visa guidance across Rohanpur, Gomastapur, Nawabganj, Shibganj & Rajshahi: Umrah packages, Work Permit checks, India Medical Visa & Study Abroad.',
      imageKey: 'office',
    },
    '/licenses': {
      titleBn: 'লাইসেন্স, নিবন্ধন ও যাচাইকরণ | Visatrip Global',
      descBn: 'Visatrip Global-এর Trade License, TIN, HAB ও BMET নিবন্ধন যাচাইকরণ এবং নিরাপদ লেনদেনের স্বচ্ছ নীতিমালা।',
      titleEn: 'Licenses & Agency Credentials | Visatrip Global',
      descEn: 'Verify Visatrip Global’s business credentials, physical office address, and transparent payment receipt standards.',
      imageKey: 'office',
    },
    '/privacy-policy': {
      titleBn: 'গোপনীয়তা নীতিমালা | Visatrip Global',
      descBn: 'Visatrip Global-এ আপনার ব্যক্তিগত তথ্য, পাসপোর্ট ডকুমেন্ট ও যোগাযোগের নিরাপত্তা সংক্রান্ত নীতিমালা।',
      titleEn: 'Privacy Policy | Visatrip Global',
      descEn: 'How Visatrip Global collects, protects, and uses client contact details and travel documents.',
    },
    '/terms-and-conditions': {
      titleBn: 'সেবার শর্তাবলি | Visatrip Global',
      descBn: 'Visatrip Global-এর ভিসা কনসালটেন্সি, ওমরাহ, এয়ার টিকেট ও ট্যুর প্যাকেজ সেবার শর্তাবলি।',
      titleEn: 'Terms & Conditions | Visatrip Global',
      descEn: 'Terms and conditions governing visa consultancy, Umrah, air ticketing, and tour bookings at Visatrip Global.',
    },
    '/refund-policy': {
      titleBn: 'রিফান্ড ও বাতিলকরণ নীতিমালা | Visatrip Global',
      descBn: 'ভিসা ফি, এয়ার টিকেট, হোটেল ও ট্যুর প্যাকেজের রিফান্ড এবং ক্যান্সেলেশন নিয়মাবলি — Visatrip Global।',
      titleEn: 'Refund & Cancellation Policy | Visatrip Global',
      descEn: 'Clear refund and cancellation rules for visa fees, airline tickets, hotel bookings, and tour packages.',
    },
    '/admin/leads': {
      titleBn: 'Leads Admin | Visatrip Global',
      descBn: 'Private lead management dashboard for Visatrip Global staff.',
      titleEn: 'Leads Admin | Visatrip Global',
      descEn: 'Private lead management dashboard for Visatrip Global staff.',
      robots: 'noindex, nofollow',
    },
  };

  if (staticMeta[clean]) {
    const m = staticMeta[clean];
    const robots = m.robots || 'index, follow';
    return {
      title: isEn ? m.titleEn : m.titleBn,
      description: isEn ? m.descEn : m.descBn,
      canonical,
      bnUrl,
      enUrl,
      locale,
      ogType: 'website',
      ogImage: getOptimizedOgImageUrl(m.imageKey || 'hero'),
      robots,
      httpStatus: 200,
      emitHreflang: robots === 'index, follow',
    };
  }

  if (clean.startsWith('/services/')) {
    const slug = clean.replace('/services/', '');
    const s = servicesData.find((item) => item.slug === slug);
    if (s) {
      return {
        title: isEn ? s.seo.titleEn : s.seo.titleBn,
        description: isEn ? s.seo.descriptionEn : s.seo.descriptionBn,
        canonical,
        bnUrl,
        enUrl,
        locale,
        ogType: 'website',
        ogImage: getOptimizedOgImageUrl(s.imageKey),
        robots: 'index, follow',
        httpStatus: 200,
        emitHreflang: true,
      };
    }
  }

  if (clean.startsWith('/destinations/')) {
    const slug = clean.replace('/destinations/', '');
    const d = destinationsData.find((item) => item.slug === slug);
    if (d) {
      return {
        title: isEn ? d.seo.titleEn : d.seo.titleBn,
        description: isEn ? d.seo.descriptionEn : d.seo.descriptionBn,
        canonical,
        bnUrl,
        enUrl,
        locale,
        ogType: 'website',
        ogImage: getOptimizedOgImageUrl(d.imageKey),
        robots: 'index, follow',
        httpStatus: 200,
        emitHreflang: true,
      };
    }
  }

  if (clean.startsWith('/tour-packages/')) {
    const slug = clean.replace('/tour-packages/', '');
    const p = tourPackagesData.find((item) => item.slug === slug);
    if (p) {
      return {
        title: isEn ? p.seo.titleEn : p.seo.titleBn,
        description: isEn ? p.seo.descriptionEn : p.seo.descriptionBn,
        canonical,
        bnUrl,
        enUrl,
        locale,
        ogType: 'website',
        ogImage: getOptimizedOgImageUrl(p.imageKey),
        robots: 'index, follow',
        httpStatus: 200,
        emitHreflang: true,
      };
    }
  }

  if (clean.startsWith('/blog/')) {
    const slug = clean.replace('/blog/', '');
    const b = blogPostsData.find((item) => item.slug === slug);
    if (b) {
      return {
        title: isEn ? b.seo.titleEn : b.seo.titleBn,
        description: isEn ? b.seo.descriptionEn : b.seo.descriptionBn,
        canonical,
        bnUrl,
        enUrl,
        locale,
        ogType: 'article',
        ogImage: getOptimizedOgImageUrl(b.imageKey),
        robots: 'index, follow',
        httpStatus: 200,
        emitHreflang: true,
      };
    }
  }

  // Unknown route -> true HTTP 404 + noindex, nofollow (no soft-404)
  return {
    title: isEn ? 'Page Not Found (404) | Visatrip Global' : 'পৃষ্ঠাটি পাওয়া যায়নি (৪০৪) | Visatrip Global',
    description: isEn
      ? 'The requested page could not be found on Visatrip Global.'
      : 'দুঃখিত, আপনার কাঙ্ক্ষিত পৃষ্ঠাটি Visatrip Global-এ পাওয়া যায়নি।',
    canonical,
    bnUrl,
    enUrl,
    locale,
    ogType: 'website',
    ogImage: defaultImage,
    robots: 'noindex, nofollow',
    httpStatus: 404,
    emitHreflang: false,
  };
}

function applyServerRouteSeo(template: string, seo: ServerRouteSeo): string {
  const safeTitle = escapeHtmlAttr(seo.title);
  const safeDesc = escapeHtmlAttr(seo.description);
  const safeImage = escapeHtmlAttr(seo.ogImage);
  const ogLocale = seo.locale === 'en' ? 'en_US' : 'bn_BD';
  const ogLocaleAlt = seo.locale === 'en' ? 'bn_BD' : 'en_US';

  const headTags = [
    `<meta property="og:url" content="${escapeHtmlAttr(seo.canonical)}" />`,
    `<link rel="canonical" href="${escapeHtmlAttr(seo.canonical)}" />`,
    ...(seo.emitHreflang
      ? [
          `<link rel="alternate" hreflang="bn-BD" href="${escapeHtmlAttr(seo.bnUrl)}" />`,
          `<link rel="alternate" hreflang="en" href="${escapeHtmlAttr(seo.enUrl)}" />`,
          `<link rel="alternate" hreflang="x-default" href="${escapeHtmlAttr(seo.bnUrl)}" />`,
        ]
      : []),
  ].join('\n    ');

  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${seo.locale}">`)
    .replace(/<title>.*?<\/title>/, `<title>${safeTitle}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+name="robots"[\s\S]*?\/>/,
      `<meta name="robots" content="${seo.robots}" />`
    )
    .replace(
      /<meta\s+property="og:title"[\s\S]*?\/>/,
      `<meta property="og:title" content="${safeTitle}" />`
    )
    .replace(
      /<meta\s+property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+property="og:type"[\s\S]*?\/>/,
      `<meta property="og:type" content="${seo.ogType}" />`
    )
    .replace(
      /<meta\s+property="og:locale"[\s\S]*?\/>/,
      `<meta property="og:locale" content="${ogLocale}" />`
    )
    .replace(
      /<meta\s+property="og:locale:alternate"[\s\S]*?\/>/,
      `<meta property="og:locale:alternate" content="${ogLocaleAlt}" />`
    )
    .replace(
      /<meta\s+property="og:image"[\s\S]*?\/>/,
      `<meta property="og:image" content="${safeImage}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"[\s\S]*?\/>/,
      `<meta name="twitter:title" content="${safeTitle}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"[\s\S]*?\/>/,
      `<meta name="twitter:description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+name="twitter:image"[\s\S]*?\/>/,
      `<meta name="twitter:image" content="${safeImage}" />`
    )
    .replace('<!--SSR_HEAD_TAGS-->', headTags);
}

function generateSitemapXml(): string {
  // Exclude noindex/private routes (/admin/leads) from XML sitemap
  const staticPaths = [
    '/',
    '/about',
    '/services',
    '/destinations',
    '/tour-packages',
    '/success-stories',
    '/gallery',
    '/blog',
    '/faq',
    '/contact',
    '/service-areas',
    '/licenses',
    '/privacy-policy',
    '/terms-and-conditions',
    '/refund-policy',
  ];

  const dynamicPaths = [
    ...servicesData.map((s) => `/services/${s.slug}`),
    ...destinationsData.map((d) => `/destinations/${d.slug}`),
    ...tourPackagesData.map((p) => `/tour-packages/${p.slug}`),
    ...blogPostsData.map((b) => `/blog/${b.slug}`),
  ];

  const allPaths = [...staticPaths, ...dynamicPaths];
  const today = new Date().toISOString().split('T')[0];

  const urls = allPaths
    .flatMap((p) => {
      const bnUrl = `${SITE_URL}${p}`;
      const enPath = p === '/' ? '/en' : `/en${p}`;
      const enUrl = `${SITE_URL}${enPath}`;
      const priority =
        p === '/'
          ? '1.0'
          : p.startsWith('/services/')
          ? '0.9'
          : p.startsWith('/destinations/') || p.startsWith('/tour-packages/')
          ? '0.8'
          : p.includes('policy') || p.includes('terms')
          ? '0.4'
          : '0.7';

      const hreflangBlock = `    <xhtml:link rel="alternate" hreflang="bn-BD" href="${bnUrl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${bnUrl}" />`;

      // Bidirectional entries for BOTH Bangla and English URLs so Google Search Console validates return tags cleanly
      return [
        `  <url>
    <loc>${bnUrl}</loc>
${hreflangBlock}
    <lastmod>${today}</lastmod>
    <priority>${priority}</priority>
  </url>`,
        `  <url>
    <loc>${enUrl}</loc>
${hreflangBlock}
    <lastmod>${today}</lastmod>
    <priority>${priority}</priority>
  </url>`,
      ];
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;
}

async function startServer() {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.use(express.json({ limit: '1mb' }));

  // Optional canonical apex -> www 301 redirect (enable in production via ENFORCE_WWW_REDIRECT=true)
  if (ENFORCE_WWW_REDIRECT) {
    const targetUrl = new URL(SITE_URL);
    const canonicalHost = targetUrl.host.toLowerCase();
    const apexHost = canonicalHost.replace(/^www\./, '');
    app.use((req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') return next();
      const reqHost = String(req.headers['x-forwarded-host'] || req.headers.host || '')
        .split(',')[0]
        .trim()
        .toLowerCase();
      if (reqHost === apexHost && apexHost !== canonicalHost) {
        return res.redirect(301, `${SITE_URL}${req.originalUrl}`);
      }
      return next();
    });
  }

  // Production-grade Security Headers
  const productionCsp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://www.google-analytics.com https://www.facebook.com https://*.googleusercontent.com",
    "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://www.facebook.com",
    "frame-src 'self' https://www.google.com https://maps.google.com https://www.youtube-nocookie.com https://www.facebook.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');

  app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
    res.setHeader('X-DNS-Prefetch-Control', 'on');

    const isHttps =
      req.secure || String(req.headers['x-forwarded-proto'] || '').includes('https');
    if (isProduction || isHttps) {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }
    if (isProduction) {
      res.setHeader('Content-Security-Policy', productionCsp);
    }
    next();
  });

  // Clean URL 301 normalization (strip trailing slashes + lowercase page paths)
  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    const p = req.path;
    if (
      p === '/' ||
      p.startsWith('/api') ||
      p.startsWith('/src/') ||
      p.startsWith('/assets/') ||
      p.startsWith('/@') ||
      p.startsWith('/node_modules/') ||
      /\.[a-z0-9]{2,12}$/i.test(p)
    ) {
      return next();
    }

    const stripped = p.length > 1 && p.endsWith('/') ? p.replace(/\/+$/, '') : p;
    const normalized = stripped.toLowerCase();
    if (normalized !== p) {
      const qsIndex = req.originalUrl.indexOf('?');
      const qs = qsIndex >= 0 ? req.originalUrl.slice(qsIndex) : '';
      return res.redirect(301, `${normalized}${qs}`);
    }
    return next();
  });

  // 301 Redirects from /public/redirects.json
  try {
    const redirectsPath = path.resolve(process.cwd(), 'public', 'redirects.json');
    if (fs.existsSync(redirectsPath)) {
      const { redirects } = JSON.parse(fs.readFileSync(redirectsPath, 'utf8'));
      if (Array.isArray(redirects)) {
        app.use((req, res, next) => {
          const match = redirects.find((r: { from: string; to: string; status?: number }) => r.from === req.path);
          if (match) {
            const qsIndex = req.originalUrl.indexOf('?');
            const qs = qsIndex >= 0 ? req.originalUrl.slice(qsIndex) : '';
            return res.redirect(match.status || 301, `${match.to}${qs}`);
          }
          return next();
        });
      }
    }
  } catch {
    // Ignore malformed redirects file
  }

  // Dynamic SEO endpoints
  app.get('/sitemap.xml', (_req, res) => {
    res.type('application/xml').send(generateSitemapXml());
  });

  app.get('/robots.txt', (_req, res) => {
    res
      .type('text/plain')
      .send(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  });

  // Never cache dynamic API JSON responses
  app.use('/api', (_req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });

  // Uptime Monitoring Health Check Endpoint
  app.get('/api/health', (_req, res) => {
    return res.json({
      ok: true,
      status: 'healthy',
      service: 'visatrip-global',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.round(process.uptime()),
    });
  });

  // Inquiry Lead Submission API
  app.post('/api/inquiry', async (req, res) => {
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        ok: false,
        error: 'অনেকবার অনুরোধ পাঠানো হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন অথবা সরাসরি WhatsApp-এ যোগাযোগ করুন।',
      });
    }

    const parsed = inquirySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        error: parsed.error.issues[0]?.message || 'অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য সঠিকভাবে পূরণ করুন।',
      });
    }

    const data = parsed.data;
    // Honeypot check: silently succeed without saving spam
    if (data.website_url && data.website_url.trim().length > 0) {
      return res.json({
        ok: true,
        leadId: 'VTG-RECEIVED',
        whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}`,
      });
    }

    const saved = await leadStore.createLead({
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      service: data.service,
      country: data.country || '',
      message: data.message || '',
      sourcePage: data.sourcePage || '/',
      formType: data.formType || 'consultation',
      utmSource: data.utmSource || undefined,
      utmMedium: data.utmMedium || undefined,
      utmCampaign: data.utmCampaign || undefined,
      extra: data.extra,
    });

    const emailSent = await sendOptionalNotificationEmail(saved);

    const waText = [
      `আসসালামু আলাইকুম, আমি ${saved.name}।`,
      `সার্ভিস: ${saved.service}`,
      saved.country ? `দেশ/গন্তব্য: ${saved.country}` : null,
      `মোবাইল: ${saved.phone}`,
      saved.message ? `বিস্তারিত: ${saved.message}` : null,
      `রেফারেন্স আইডি: ${saved.id}`,
    ]
      .filter(Boolean)
      .join('\n');

    return res.status(201).json({
      ok: true,
      leadId: saved.id,
      emailSent,
      whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`,
    });
  });

  // Track Application API (Demo + Ready for CRM DB integration)
  app.get('/api/track', (req, res) => {
    const appId = String(req.query.applicationId || '').trim().toUpperCase();
    const phone = String(req.query.phone || '').replace(/\D/g, '');
    if (!appId || phone.length < 4) {
      return res.status(400).json({
        ok: false,
        error: 'সঠিক Application ID এবং মোবাইল নম্বর দিন।',
      });
    }
    const last4 = phone.slice(-4);
    const match = sampleTrackingRecords.find(
      (item) => item.applicationId.toUpperCase() === appId && item.phoneLast4 === last4
    );

    if (!match) {
      return res.status(404).json({
        ok: false,
        error: 'এই Application ID ও মোবাইল নম্বরের সাথে কোনো রেকর্ড মেলেনি। সঠিক তথ্য যাচাই করুন অথবা WhatsApp-এ যোগাযোগ করুন।',
      });
    }

    return res.json({ ok: true, record: match });
  });

  // Admin Leads API (Protected by ADMIN_PASSWORD header)
  const requireAdmin: express.RequestHandler = (req, res, next) => {
    const supplied = String(req.headers['x-admin-password'] || '');
    if (!supplied || supplied !== ADMIN_PASSWORD) {
      return res.status(401).json({ ok: false, error: 'Unauthorized' });
    }
    return next();
  };

  app.get('/api/leads', requireAdmin, async (_req, res) => {
    const leads = await leadStore.listLeads();
    return res.json({ ok: true, leads });
  });

  app.patch('/api/leads/:id', requireAdmin, async (req, res) => {
    const status = req.body?.status as LeadStatus;
    if (!['New', 'Contacted', 'Processing', 'Done'].includes(status)) {
      return res.status(400).json({ ok: false, error: 'Invalid lead status' });
    }
    const updated = await leadStore.updateLeadStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ ok: false, error: 'Lead not found' });
    }
    return res.json({ ok: true, lead: updated });
  });

  // On-demand ISR Cache Revalidation API (Admin protected)
  interface IsrCacheEntry {
    html: string;
    etag: string;
    generatedAt: number;
    revalidateSeconds: number;
    httpStatus: 200 | 404;
    robots: ServerRouteSeo['robots'];
  }
  const isrHtmlCache = new Map<string, IsrCacheEntry>();
  const ISR_STALE_WHILE_REVALIDATE_SECONDS = 86400; // 24 hours

  function getIsrRevalidateSeconds(routePath: string): number {
    const clean = routePath.replace(/^\/en(?=\/|$)/, '') || '/';
    if (clean === '/' || clean === '/tour-packages' || clean.startsWith('/tour-packages/')) {
      return 300; // 5 minutes for homepage & seasonal packages
    }
    return 3600; // 1 hour for evergreen service, destination, blog, and info pages
  }

  function sendCompressedBuffer(
    req: express.Request,
    res: express.Response,
    body: string | Buffer,
    contentType: string,
    statusCode = 200
  ): void {
    const buf = Buffer.isBuffer(body) ? body : Buffer.from(body, 'utf-8');
    const acceptEncoding = String(req.headers['accept-encoding'] || '');
    res.setHeader('Vary', 'Accept-Encoding');
    res.setHeader('Content-Type', contentType);

    if (buf.length < 1024) {
      res.status(statusCode).send(buf);
      return;
    }

    if (acceptEncoding.includes('br')) {
      res.setHeader('Content-Encoding', 'br');
      res.status(statusCode).send(zlib.brotliCompressSync(buf, {
        params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 },
      }));
      return;
    }

    if (acceptEncoding.includes('gzip')) {
      res.setHeader('Content-Encoding', 'gzip');
      res.status(statusCode).send(zlib.gzipSync(buf, { level: 6 }));
      return;
    }

    res.status(statusCode).send(buf);
  }

  app.post('/api/revalidate', requireAdmin, (req, res) => {
    const targetPath = typeof req.body?.path === 'string' ? req.body.path.trim() : '';
    if (targetPath) {
      const removed = isrHtmlCache.delete(targetPath);
      return res.json({ ok: true, revalidated: targetPath, cleared: removed ? 1 : 0 });
    }
    const cleared = isrHtmlCache.size;
    isrHtmlCache.clear();
    return res.json({ ok: true, revalidated: 'all', cleared });
  });

  // Ensure optimized static image assets receive immutable long-term caching in both dev & prod
  app.use('/src/assets/optimized', (_req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    next();
  });

  // Frontend Vite dev middleware OR production static files + ISR HTML cache
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      try {
        const url = req.originalUrl;
        const routePath = url.split('?')[0] || '/';
        const templatePath = path.resolve(process.cwd(), 'index.html');
        const seo = buildServerRouteSeo(routePath);
        const template = applyServerRouteSeo(fs.readFileSync(templatePath, 'utf-8'), seo);

        if (seo.robots !== 'index, follow') {
          res.setHeader('X-Robots-Tag', seo.robots);
        }

        const html = await vite.transformIndexHtml(url, template);
        res
          .status(seo.httpStatus)
          .set({
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache',
          })
          .end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    const indexTemplatePath = path.join(distDir, 'index.html');
    const readBaseIndexHtml = () => fs.readFileSync(indexTemplatePath, 'utf-8');

    const renderProductionRouteHtml = (routePath: string): IsrCacheEntry => {
      const seo = buildServerRouteSeo(routePath);
      const html = applyServerRouteSeo(readBaseIndexHtml(), seo);

      const etag = `"${crypto.createHash('sha256').update(html).digest('base64url').slice(0, 20)}"`;
      const entry: IsrCacheEntry = {
        html,
        etag,
        generatedAt: Date.now(),
        revalidateSeconds: getIsrRevalidateSeconds(routePath),
        httpStatus: seo.httpStatus,
        robots: seo.robots,
      };
      if (seo.httpStatus === 200 && !routePath.startsWith('/admin')) {
        isrHtmlCache.set(routePath, entry);
      }
      return entry;
    };

    // Compress JS, CSS, SVG, JSON static assets in production via Brotli/Gzip
    app.use((req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') return next();
      const ext = path.extname(req.path).toLowerCase();
      if (!['.js', '.css', '.svg', '.json', '.xml', '.txt', '.webmanifest'].includes(ext)) {
        return next();
      }
      const filePath = path.join(distDir, req.path);
      if (!filePath.startsWith(distDir) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        return next();
      }

      const contentTypeMap: Record<string, string> = {
        '.js': 'application/javascript; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.svg': 'image/svg+xml',
        '.json': 'application/json; charset=utf-8',
        '.xml': 'application/xml; charset=utf-8',
        '.txt': 'text/plain; charset=utf-8',
        '.webmanifest': 'application/manifest+json; charset=utf-8',
      };

      const isHashedAsset = req.path.startsWith('/assets/');
      res.setHeader(
        'Cache-Control',
        isHashedAsset
          ? 'public, max-age=31536000, immutable'
          : 'public, max-age=86400, stale-while-revalidate=604800'
      );

      const content = fs.readFileSync(filePath);
      sendCompressedBuffer(req, res, content, contentTypeMap[ext] || 'application/octet-stream');
    });

    app.use(
      express.static(distDir, {
        index: false,
        etag: true,
        lastModified: true,
        setHeaders(res, filePath) {
          if (filePath.endsWith('.avif')) {
            res.setHeader('Content-Type', 'image/avif');
          } else if (filePath.endsWith('.webp')) {
            res.setHeader('Content-Type', 'image/webp');
          }
          if (
            filePath.includes(`${path.sep}assets${path.sep}`) ||
            filePath.includes(`${path.sep}optimized${path.sep}`)
          ) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          } else {
            res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
          }
        },
      })
    );

    // ISR-style cached HTML delivery with ETag / 304 + background stale-while-revalidate
    app.use('*', (req, res) => {
      const routePath = req.originalUrl.split('?')[0] || '/';

      // Never cache private admin pages
      if (routePath.startsWith('/admin')) {
        const entry = renderProductionRouteHtml(routePath);
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('X-Cache-Status', 'BYPASS');
        res.setHeader('X-Robots-Tag', entry.robots);
        sendCompressedBuffer(req, res, entry.html, 'text/html; charset=utf-8', entry.httpStatus);
        return;
      }

      const now = Date.now();
      let entry = isrHtmlCache.get(routePath);
      let cacheStatus: 'HIT' | 'STALE' | 'MISS' = 'MISS';

      if (entry) {
        const ageSeconds = (now - entry.generatedAt) / 1000;
        if (ageSeconds <= entry.revalidateSeconds) {
          cacheStatus = 'HIT';
        } else if (ageSeconds <= entry.revalidateSeconds + ISR_STALE_WHILE_REVALIDATE_SECONDS) {
          cacheStatus = 'STALE';
          setImmediate(() => {
            try {
              renderProductionRouteHtml(routePath);
            } catch {
              // Keep serving last known good HTML on transient failure
            }
          });
        } else {
          entry = renderProductionRouteHtml(routePath);
        }
      } else {
        entry = renderProductionRouteHtml(routePath);
      }

      if (entry.robots !== 'index, follow') {
        res.setHeader('X-Robots-Tag', entry.robots);
      }

      if (entry.httpStatus === 404) {
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('X-Cache-Status', 'BYPASS');
        sendCompressedBuffer(req, res, entry.html, 'text/html; charset=utf-8', 404);
        return;
      }

      res.setHeader(
        'Cache-Control',
        `public, max-age=60, s-maxage=${entry.revalidateSeconds}, stale-while-revalidate=${ISR_STALE_WHILE_REVALIDATE_SECONDS}`
      );
      res.setHeader('ETag', entry.etag);
      res.setHeader('X-Cache-Status', cacheStatus);

      if (req.headers['if-none-match'] === entry.etag) {
        res.status(304).end();
        return;
      }

      sendCompressedBuffer(req, res, entry.html, 'text/html; charset=utf-8', 200);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Visatrip Global server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
