import { Phone, MessageCircle, MapPin, Clock, Mail, ExternalLink, ArrowRight, Star } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { localAreasData } from '../data/localAreas';
import { SeoHead, buildBreadcrumbSchema, buildLocalBusinessSchema, trackAnalyticsEvent } from '../lib/seo';
import { getPageLeadContext } from '../lib/leadContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HeroCtaRow } from '../components/HeroCtaRow';
import { InquiryForm } from '../components/InquiryForm';
import {
  LicenseStrip,
  PaymentReceiptNotice,
  TransparentFeeNote,
} from '../components/TrustSignals';
import { GoogleMapFacade } from '../components/GoogleMapFacade';

export function ContactPage() {
  const { isEn, locale, localizedPath, t } = useLanguage();
  const { pathname } = useLocation();
  const pageCtx = getPageLeadContext(pathname, locale);

  return (
    <>
      <SeoHead
        title={t('যোগাযোগ ও ফ্রি কনসাল্টেশন | Visatrip Global চাঁপাইনবাবগঞ্জ', 'Contact Visatrip Global | Chapai Nawabganj Office & Hotline')}
        description={t(
          'Visatrip Global — রহনপুর, গোমস্তাপুর, চাঁপাইনবাবগঞ্জ অফিস ঠিকানা, হটলাইন +880 1771-304219, WhatsApp ও অনলাইন ফ্রি কনসাল্টেশন ফর্ম।',
          'Visit Visatrip Global in Rohanpur, Gomastapur, Chapai Nawabganj or contact +880 1771-304219 via Call or WhatsApp for free travel consultation.'
        )}
        canonicalPath="/contact"
        locale={locale}
        schemas={[
          buildBreadcrumbSchema(
            [
              { name: t('হোম', 'Home'), path: '/' },
              { name: t('যোগাযোগ', 'Contact'), path: '/contact' },
            ],
            locale
          ),
          buildLocalBusinessSchema(),
        ]}
      />

      <section className="bg-navy-hero text-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Breadcrumbs
            light
            items={[
              { label: t('হোম', 'Home'), to: '/' },
              { label: t('যোগাযোগ', 'Contact') },
            ]}
          />
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[#C9A24B]" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#C9A24B]">
              {t('অফিস ও ২৪/৭ WhatsApp হেল্পলাইন', 'Office & Direct Support')}
            </p>
          </div>
          <h1 className="heading-h1 text-white max-w-3xl">
            {t('আমাদের সাথে যোগাযোগ করুন', 'Get in Touch with Visatrip Global')}
          </h1>
          <p className="body-lead mt-6 text-white/85 max-w-2xl">
            {t(
              'রহনপুর অফিসে সরাসরি আসুন, হটলাইনে কল করুন অথবা ৭ দিন WhatsApp-এ আমাদের কনসালটেন্টদের সাথে কথা বলুন।',
              'Visit our Rohanpur office in person, call our hotline, or message us on WhatsApp 7 days a week.'
            )}
          </p>
          <HeroCtaRow
            primaryHref="#contact-form"
            primaryLabelBn="ফ্রি কনসাল্টেশন ফর্ম পূরণ করুন"
            primaryLabelEn="Jump to Quick Form"
            locationId="contact_hero"
            showCallLink
          />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
          <LicenseStrip variant="white" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Info + Map */}
            <div className="lg:col-span-5 space-y-6">
              <div className="card-surface p-6 sm:p-8 space-y-6">
                <h2 className="heading-h3 text-[#0B1F3A]">
                  {t('অফিস ও হটলাইন তথ্য', 'Office & Hotline Details')}
                </h2>

                <address className="not-italic space-y-4 text-sm text-[#374151] leading-[1.75]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#C9A24B] shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <div className="font-bold text-[#0B1F3A]">{t('অফিস ঠিকানা', 'Office Address')}</div>
                      <div>{t(siteConfig.contact.officeAddressBn, siteConfig.contact.officeAddressEn)}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#C9A24B] shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <div className="font-bold text-[#0B1F3A]">{t('হটলাইন / WhatsApp', 'Hotline / WhatsApp')}</div>
                      <a
                        href={siteConfig.contact.phoneHref}
                        onClick={() => trackAnalyticsEvent('call_click', { location: 'contact_page' })}
                        className="hover:text-[#7D5D14] font-semibold tabular-nums"
                      >
                        {siteConfig.contact.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  {siteConfig.contact.email && (
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-[#C9A24B] shrink-0 mt-1" aria-hidden="true" />
                      <div>
                        <div className="font-bold text-[#0B1F3A]">{t('ইমেইল', 'Email')}</div>
                        <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#7D5D14]">
                          {siteConfig.contact.email}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#C9A24B] shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <div className="font-bold text-[#0B1F3A]">{t('অফিস সময়', 'Office Hours')}</div>
                      <div>{t(siteConfig.contact.officeHoursBn, siteConfig.contact.officeHoursEn)}</div>
                    </div>
                  </div>
                </address>

                <div className="pt-4 border-t border-[#0B1F3A]/8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={pageCtx.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackAnalyticsEvent('whatsapp_click', {
                        location: 'contact_card',
                        prefilled_topic: pageCtx.serviceLabel,
                      })
                    }
                    className="btn-primary btn-sm flex-1"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                  <a
                    href={siteConfig.contact.phoneHref}
                    onClick={() => trackAnalyticsEvent('call_click', { location: 'contact_card_button' })}
                    className="btn-navy btn-sm flex-1"
                  >
                    <Phone className="w-4 h-4 text-[#C9A24B]" />
                    {t('কল করুন', 'Call Now')}
                  </a>
                </div>

                {siteConfig.localSeo.gbpReviewUrl && (
                  <a
                    href={siteConfig.localSeo.gbpReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary btn-sm w-full"
                  >
                    <Star className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />
                    <span>{t('Google-এ আমাদের রিভিউ দিন', 'Leave a Google Review')}</span>
                  </a>
                )}
              </div>

              {/* Click-to-Load Google Maps Facade (0 third-party JS until user clicks) */}
              <div className="card-surface overflow-hidden">
                <GoogleMapFacade
                  variant="card"
                  tone="light"
                  heightClass="h-64"
                  title="Visatrip Global — Rohanpur, Gomastapur, Chapai Nawabganj, Bangladesh Map"
                />
                <div className="p-4 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-[#4B5563]">
                    {t(siteConfig.contact.officeAddressBn, siteConfig.contact.officeAddressEn)}
                  </span>
                  <a
                    href={siteConfig.contact.mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#7D5D14] inline-flex items-center gap-1 hover:underline"
                  >
                    {t('ম্যাপে দিকনির্দেশনা', 'Open Directions')}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Consultation Form */}
            <div id="contact-form" className="lg:col-span-7 card-surface border-[#C9A24B]/45 p-6 sm:p-8 shadow-[0_14px_36px_rgba(11,31,58,0.06)] scroll-mt-28">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#7D5D14] mb-1">
                {t('অনলাইন ইনকোয়ারি', 'Online Inquiry')}
              </p>
              <h2 className="heading-h2 text-[#0B1F3A] mb-3">
                {t('ফ্রি কনসাল্টেশন ফর্ম পাঠান', 'Send Us a Consultation Request')}
              </h2>
              <p className="text-sm text-[#4B5563] mb-6 leading-[1.75]">
                {t(
                  'ফর্মটি পূরণ করলে আমাদের টিম দ্রুত আপনার সাথে যোগাযোগ করবে অথবা আপনি সাথে সাথেই WhatsApp-এ মেসেজ পাঠাতে পারবেন।',
                  'Submit your details below and our consultant will follow up promptly, with an instant WhatsApp option.'
                )}
              </p>
              <InquiryForm formType="contact_page" />
              <div className="mt-6 pt-6 border-t border-[#0B1F3A]/8 space-y-3">
                <TransparentFeeNote variant="inline" />
                <PaymentReceiptNotice variant="inline" />
              </div>
            </div>
          </div>

          {/* Regional Coverage & Travel Access Strip (5 Local Areas) */}
          <div className="card-surface p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#7D5D14] mb-1">
                  {t('আঞ্চলিক কাভারেজ · চাঁপাইনবাবগঞ্জ ও রাজশাহী বিভাগ', 'Regional Coverage · Chapai Nawabganj & Rajshahi')}
                </p>
                <h2 className="heading-h3 text-[#0B1F3A]">
                  {t('আপনার এলাকা থেকে কীভাবে আমাদের সেবা নেবেন?', 'Local Guides for Your Area')}
                </h2>
              </div>
              <Link to={localizedPath('/service-areas')} className="btn-secondary btn-sm shrink-0 self-start sm:self-end">
                <span>{t('সব এলাকার বিস্তারিত গাইড', 'All 5 Area Guides')}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {localAreasData.map((area) => (
                <Link
                  key={area.id}
                  to={`${localizedPath('/service-areas')}#${area.id}`}
                  className="rounded-xl bg-[#FAF8F4] hover:bg-white border border-[#0B1F3A]/10 hover:border-[#C9A24B] p-4 transition-colors flex flex-col justify-between gap-2"
                >
                  <div>
                    <div className="text-sm font-bold text-[#0B1F3A]">
                      {isEn ? area.nameEn : area.nameBn}
                    </div>
                    <p className="text-xs text-[#4B5563] mt-1 leading-[1.6] line-clamp-2">
                      {isEn ? area.travelAccessEn : area.travelAccessBn}
                    </p>
                  </div>
                  <span className="text-xs leading-[1.55] font-semibold text-[#7D5D14] inline-flex items-center gap-1">
                    {t('গাইড দেখুন', 'View Guide')}
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
