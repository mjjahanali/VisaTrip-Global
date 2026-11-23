import { useEffect } from 'react';
import { siteConfig } from '../config/site';
import { hasAnalyticsConsent } from './consent';

export interface SeoProps {
  title: string;
  description: string;
  canonicalPath: string;
  locale?: 'bn' | 'en';
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  /** Optional explicit robots directive (e.g. "noindex, follow" for utility tools) */
  robotsContent?: string;
  schemas?: Record<string, unknown>[];
}

function upsertMeta(attrName: 'name' | 'property', attrValue: string, content: string): void {
  let el = document.head.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, hreflang?: string): void {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function getCanonicalBase(): string {
  return siteConfig.domain;
}

export function localizeSchemaPath(path: string, locale: 'bn' | 'en' = 'bn'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const bnPath = clean.replace(/^\/en(?=\/|$)/, '') || '/';
  if (locale === 'en') {
    return bnPath === '/' ? '/en' : `/en${bnPath}`;
  }
  return bnPath;
}

export function resolveAbsoluteSeoUrl(assetOrPath: string): string {
  if (/^https:\/\//i.test(assetOrPath)) return assetOrPath;
  if (/^http:\/\//i.test(assetOrPath)) return assetOrPath.replace(/^http:\/\//i, 'https://');
  const normalized = assetOrPath.startsWith('/') ? assetOrPath : `/${assetOrPath}`;
  return `${siteConfig.domain}${normalized}`;
}

export function SeoHead({
  title,
  description,
  canonicalPath,
  locale = 'bn',
  ogImage = '/src/assets/optimized/hero/1280w.jpg',
  ogType = 'website',
  noIndex = false,
  robotsContent,
  schemas = [],
}: SeoProps) {
  const serializedSchemas = JSON.stringify(schemas);

  useEffect(() => {
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const base = siteConfig.domain;
    const bnPath = cleanPath.replace(/^\/en(?=\/|$)/, '') || '/';
    const enPath = bnPath === '/' ? '/en' : `/en${bnPath}`;
    const fullCanonical = `${base}${locale === 'en' ? enPath : bnPath}`;
    const fullImage = resolveAbsoluteSeoUrl(ogImage);
    const robots = robotsContent ?? (noIndex ? 'noindex, nofollow' : 'index, follow');

    document.documentElement.lang = locale === 'en' ? 'en' : 'bn';
    document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', robots);

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:url', fullCanonical);
    upsertMeta('property', 'og:site_name', siteConfig.brandName);
    upsertMeta('property', 'og:locale', locale === 'en' ? 'en_US' : 'bn_BD');
    upsertMeta('property', 'og:locale:alternate', locale === 'en' ? 'bn_BD' : 'en_US');
    upsertMeta('property', 'og:image', fullImage);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', fullImage);

    if (siteConfig.analytics.gscVerification) {
      upsertMeta('name', 'google-site-verification', siteConfig.analytics.gscVerification);
    }

    upsertLink('canonical', fullCanonical);
    if (!noIndex && !robots.startsWith('noindex')) {
      upsertLink('alternate', `${base}${bnPath}`, 'bn-BD');
      upsertLink('alternate', `${base}${enPath}`, 'en');
      upsertLink('alternate', `${base}${bnPath}`, 'x-default');
    } else {
      document.head
        .querySelectorAll('link[rel="alternate"][hreflang]')
        .forEach((node) => node.remove());
    }

    // Clear previous dynamic JSON-LD scripts injected by SeoHead
    document.head
      .querySelectorAll('script[data-visatrip-schema="true"]')
      .forEach((node) => node.remove());

    const parsedExtraSchemas = JSON.parse(serializedSchemas) as Record<string, unknown>[];
    const combinedSchemas: Record<string, unknown>[] = [
      buildOrganizationSchema(),
      buildWebSiteSchema(),
      ...parsedExtraSchemas,
    ];

    combinedSchemas.forEach((schemaObj) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.visatripSchema = 'true';
      script.textContent = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });
  }, [title, description, canonicalPath, locale, ogImage, ogType, noIndex, robotsContent, serializedSchemas]);

  return null;
}

function buildAreaServedSchema(): Record<string, unknown>[] {
  return siteConfig.localSeo.areaServed.map((area) => ({
    '@type': area.type,
    name: area.name,
  }));
}

export function buildOrganizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'TravelAgency'],
    '@id': `${siteConfig.domain}/#organization`,
    name: siteConfig.brandName,
    url: siteConfig.domain,
    logo: `${siteConfig.domain}/icon-512.png`,
    image: `${siteConfig.domain}/src/assets/optimized/hero/1280w.jpg`,
    slogan: siteConfig.taglineBn,
    telephone: siteConfig.contact.phoneDisplay,
    priceRange: 'BDT',
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rohanpur, Gomastapur',
      addressLocality: 'Chapai Nawabganj',
      addressRegion: 'Rajshahi Division',
      addressCountry: 'BD',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.contact.geo.latitude,
      longitude: siteConfig.contact.geo.longitude,
    },
    hasMap: siteConfig.contact.mapDirectionsUrl,
    openingHours: siteConfig.contact.openingHoursSchema,
    areaServed: buildAreaServedSchema(),
    availableLanguage: ['bn', 'en'],
    knowsAbout: [
      'Work Permit Consultancy',
      'Tourist Visa Processing',
      'Student Visa Consultancy',
      'Hajj and Umrah Packages',
      'India Medical and Tourist Visa',
      'Domestic and International Air Ticketing',
      'Hotel Booking',
      'Tour Packages',
    ],
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
    ],
  };
}

export function buildLocalBusinessSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    '@id': `${siteConfig.domain}/#localbusiness`,
    name: siteConfig.brandName,
    description: siteConfig.seo.defaultDescriptionEn,
    image: `${siteConfig.domain}/src/assets/optimized/office/1200w.jpg`,
    url: siteConfig.domain,
    telephone: siteConfig.contact.phoneDisplay,
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rohanpur, Gomastapur',
      addressLocality: 'Chapai Nawabganj',
      addressRegion: 'Rajshahi Division',
      addressCountry: 'BD',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.contact.geo.latitude,
      longitude: siteConfig.contact.geo.longitude,
    },
    hasMap: siteConfig.contact.mapDirectionsUrl,
    areaServed: buildAreaServedSchema(),
    availableLanguage: ['bn', 'en'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '20:00',
      },
    ],
    priceRange: 'BDT',
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
    ],
  };
}

export function buildWebSiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.domain}/#website`,
    name: siteConfig.brandName,
    url: siteConfig.domain,
    inLanguage: ['bn-BD', 'en'],
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; path: string }[],
  locale: 'bn' | 'en' = 'bn'
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${siteConfig.domain}${localizeSchemaPath(item.path, locale)}`,
    })),
  };
}

export function buildFaqSchema(faqs: { question: string; answer: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildServiceSchema(params: {
  name: string;
  description: string;
  path: string;
  locale?: 'bn' | 'en';
}): Record<string, unknown> {
  const localizedPath = localizeSchemaPath(params.path, params.locale ?? 'bn');
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: params.name,
    name: params.name,
    description: params.description,
    url: `${siteConfig.domain}${localizedPath}`,
    provider: {
      '@type': 'TravelAgency',
      '@id': `${siteConfig.domain}/#organization`,
      name: siteConfig.brandName,
      url: siteConfig.domain,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Bangladesh',
    },
  };
}

export function buildTourPackageSchema(params: {
  name: string;
  description: string;
  path: string;
  image: string;
  priceBDT?: number | null;
  locale?: 'bn' | 'en';
  itineraryNames?: string[];
}): Record<string, unknown> {
  const localizedPath = localizeSchemaPath(params.path, params.locale ?? 'bn');
  const hasRealPrice = typeof params.priceBDT === 'number' && params.priceBDT > 0;
  return {
    '@context': 'https://schema.org',
    // Google Rich Results requires `offers`/`review`/`aggregateRating` on `Product`.
    // Use `TouristTrip` cleanly when price is consultation-based (`null`) to avoid invalid Product errors.
    '@type': hasRealPrice ? ['TouristTrip', 'Product'] : 'TouristTrip',
    name: params.name,
    description: params.description,
    url: `${siteConfig.domain}${localizedPath}`,
    image: resolveAbsoluteSeoUrl(params.image),
    touristType: 'Bangladeshi Travelers',
    provider: {
      '@type': 'TravelAgency',
      '@id': `${siteConfig.domain}/#organization`,
      name: siteConfig.brandName,
      url: siteConfig.domain,
    },
    ...(params.itineraryNames && params.itineraryNames.length > 0
      ? {
          itinerary: {
            '@type': 'ItemList',
            numberOfItems: params.itineraryNames.length,
            itemListElement: params.itineraryNames.map((stepName, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: stepName,
            })),
          },
        }
      : {}),
    ...(hasRealPrice
      ? {
          offers: {
            '@type': 'Offer',
            price: params.priceBDT,
            priceCurrency: 'BDT',
            availability: 'https://schema.org/InStock',
            url: `${siteConfig.domain}${localizedPath}`,
          },
        }
      : {}),
  };
}

export function buildBlogPostingSchema(params: {
  headline: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  authorName: string;
  locale?: 'bn' | 'en';
}): Record<string, unknown> {
  const localizedPath = localizeSchemaPath(params.path, params.locale ?? 'bn');
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: params.headline,
    description: params.description,
    inLanguage: params.locale === 'en' ? 'en' : 'bn-BD',
    image: resolveAbsoluteSeoUrl(params.image),
    datePublished: params.datePublished,
    dateModified: params.datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.domain}${localizedPath}`,
    },
    author: {
      '@type': 'Organization',
      name: params.authorName,
      url: siteConfig.domain,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteConfig.domain}/#organization`,
      name: siteConfig.brandName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.domain}/icon-512.png`,
      },
    },
  };
}

export function buildWebApplicationSchema(params: {
  name: string;
  description: string;
  path: string;
  locale?: 'bn' | 'en';
}): Record<string, unknown> {
  const localizedPath = localizeSchemaPath(params.path, params.locale ?? 'bn');
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: params.name,
    description: params.description,
    url: `${siteConfig.domain}${localizedPath}`,
    applicationCategory: 'TravelApplication',
    operatingSystem: 'All',
    inLanguage: params.locale === 'en' ? 'en' : 'bn-BD',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BDT',
    },
    publisher: {
      '@type': 'TravelAgency',
      '@id': `${siteConfig.domain}/#organization`,
      name: siteConfig.brandName,
    },
  };
}

export function buildCollectionPageSchema(params: {
  name: string;
  description: string;
  path: string;
  locale?: 'bn' | 'en';
  items: { name: string; path: string }[];
}): Record<string, unknown> {
  const locale = params.locale ?? 'bn';
  const localizedPath = localizeSchemaPath(params.path, locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: params.name,
    description: params.description,
    url: `${siteConfig.domain}${localizedPath}`,
    inLanguage: locale === 'en' ? 'en' : 'bn-BD',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: params.items.length,
      itemListElement: params.items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        url: `${siteConfig.domain}${localizeSchemaPath(item.path, locale)}`,
      })),
    },
  };
}

export { trackAnalyticsEvent, type AnalyticsEventName, type AnalyticsPayload } from './analytics';

let analyticsScheduled = false;

/**
 * Loads optional third-party scripts (GA4, Meta Pixel) ONLY after explicit visitor
 * cookie consent (`hasAnalyticsConsent() === true`), using a `lazyOnload` strategy
 * so LCP, FCP, TBT, and mobile Slow 3G hydration remain unaffected.
 */
export function initOptionalAnalyticsScripts(): void {
  if (typeof window === 'undefined' || analyticsScheduled) return;
  if (!hasAnalyticsConsent()) return;
  const { ga4Id, metaPixelId } = siteConfig.analytics;
  if (!ga4Id && !metaPixelId) return;

  analyticsScheduled = true;
  let injected = false;

  const injectScripts = () => {
    if (injected) return;
    injected = true;

    if (ga4Id && !document.getElementById('visatrip-ga4')) {
      const s = document.createElement('script');
      s.id = 'visatrip-ga4';
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`;
      document.head.appendChild(s);

      const inline = document.createElement('script');
      inline.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}',{send_page_view:true});`;
      document.head.appendChild(inline);
    }

    if (metaPixelId && !document.getElementById('visatrip-meta-pixel')) {
      const s = document.createElement('script');
      s.id = 'visatrip-meta-pixel';
      s.textContent = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`;
      document.head.appendChild(s);
    }
  };

  const scheduleAfterLoad = () => {
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    if (typeof win.requestIdleCallback === 'function') {
      win.requestIdleCallback(injectScripts, { timeout: 2500 });
    } else {
      window.setTimeout(injectScripts, 1800);
    }
  };

  // Trigger on first user interaction or post-load idle (whichever happens after load)
  const interactionEvents: (keyof WindowEventMap)[] = ['pointerdown', 'keydown', 'scroll'];
  const onFirstInteraction = () => {
    interactionEvents.forEach((ev) => window.removeEventListener(ev, onFirstInteraction));
    scheduleAfterLoad();
  };
  interactionEvents.forEach((ev) =>
    window.addEventListener(ev, onFirstInteraction, { once: true, passive: true })
  );

  if (document.readyState === 'complete') {
    scheduleAfterLoad();
  } else {
    window.addEventListener('load', scheduleAfterLoad, { once: true });
  }
}
