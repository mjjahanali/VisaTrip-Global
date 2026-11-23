import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Navigation,
  ExternalLink,
  Check,
  ArrowRight,
  Compass,
  Building2,
} from 'lucide-react';
import { siteConfig, buildWhatsAppLink, toBanglaDigits } from '../config/site';
import { localAreasData } from '../data/localAreas';
import {
  SeoHead,
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildFaqSchema,
  trackAnalyticsEvent,
} from '../lib/seo';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SectionHeader } from '../components/SectionHeader';
import { GoldDivider } from '../components/GoldDivider';
import { HeroCtaRow } from '../components/HeroCtaRow';
import { FaqAccordion } from '../components/FaqAccordion';
import { GoogleMapFacade } from '../components/GoogleMapFacade';
import {
  LicenseStrip,
  PaymentReceiptNotice,
  TransparentFeeNote,
} from '../components/TrustSignals';
import { CtaBanner } from '../components/CtaBanner';

/**
 * Authoritative Regional Coverage & Local Service Hub Page
 * (`/service-areas` & `/en/service-areas`)
 *
 * Houses 5 genuinely unique, locally grounded landing sections:
 *  - #rohanpur (Head Office & Walk-In Desk)
 *  - #gomastapur (All 8 Unions & Safe Work Permit / Umrah)
 *  - #nawabganj (District HQ, Umrah, India Medical & Business Visas)
 *  - #shibganj (Sona Masjid Land Port Corridor & IVAC Rajshahi)
 *  - #rajshahi (Divisional Hub, RU/RUET Study Abroad & RJH Flights)
 *
 * Intentionally structured as one deeply useful, indexable regional hub with semantic
 * section anchors rather than thin, duplicated city doorway pages.
 */
export function ServiceAreasPage() {
  const { isEn, locale, localizedPath, t } = useLanguage();

  const allLocalFaqs = localAreasData.flatMap((area) =>
    area.faqs.map((faq) => ({
      question: isEn ? faq.questionEn : faq.questionBn,
      answer: isEn ? faq.answerEn : faq.answerBn,
    }))
  );

  return (
    <>
      <SeoHead
        title={t(
          'চাঁপাইনবাবগঞ্জ ও রাজশাহী সার্ভিস এরিয়া | Visatrip Global',
          'Chapai Nawabganj & Rajshahi Service Areas | Visatrip Global'
        )}
        description={t(
          'রহনপুর, গোমস্তাপুর, চাঁপাইনবাবগঞ্জ সদর, শিবগঞ্জ ও রাজশাহী থেকে ভিসা, ওমরাহ প্যাকেজ, ইন্ডিয়া মেডিকেল ভিসা, স্টুডেন্ট কনসালটেন্সি ও এয়ার টিকেট সেবা।',
          'Local travel & visa guidance across Rohanpur, Gomastapur, Nawabganj, Shibganj & Rajshahi: Umrah packages, Work Permit checks, India Medical Visa & Study Abroad.'
        )}
        canonicalPath="/service-areas"
        locale={locale}
        schemas={[
          buildBreadcrumbSchema(
            [
              { name: t('হোম', 'Home'), path: '/' },
              {
                name: t('আমাদের সার্ভিস এরিয়া', 'Service Areas'),
                path: '/service-areas',
              },
            ],
            locale
          ),
          buildLocalBusinessSchema(),
          buildFaqSchema(allLocalFaqs),
        ]}
      />

      {/* HERO BANNER */}
      <section className="bg-navy-hero text-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Breadcrumbs
            light
            items={[
              { label: t('হোম', 'Home'), to: '/' },
              { label: t('সার্ভিস এরিয়া', 'Service Areas') },
            ]}
          />
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[#C9A24B]" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#C9A24B]">
              {t(
                'চাঁপাইনবাবগঞ্জ · রাজশাহী বিভাগ · সারা বাংলাদেশ',
                'Chapai Nawabganj · Rajshahi Division · Bangladesh'
              )}
            </p>
          </div>
          <h1 className="heading-h1 text-white max-w-4xl">
            {t(
              'চাঁপাইনবাবগঞ্জ, রাজশাহী বিভাগ ও সারা বাংলাদেশে আমাদের স্থানীয় ভিসা ও ট্রাভেল সেবা',
              'Local Travel & Visa Support Across Chapai Nawabganj, Rajshahi & Bangladesh'
            )}
          </h1>
          <p className="body-lead mt-6 text-white/85 max-w-3xl">
            {t(
              'রহনপুর, গোমস্তাপুরের স্থায়ী অফিস থেকে সরাসরি কনসাল্টেশন এবং চাঁপাইনবাবগঞ্জ সদর, শিবগঞ্জ, রাজশাহীসহ সারা বাংলাদেশের যাত্রীদের জন্য নির্ভরযোগ্য WhatsApp ও ফোন সাপোর্ট।',
              'Walk-in consultation at our permanent office in Rohanpur, Gomastapur, backed by reliable WhatsApp and phone guidance for Nawabganj, Shibganj, Rajshahi, and all 64 districts of Bangladesh.'
            )}
          </p>

          {/* 5-Area Quick Jump Navigation */}
          <nav
            aria-label={t('স্থানীয় এলাকা নির্বাচন', 'Jump to service area')}
            className="mt-8 flex flex-wrap gap-2.5"
          >
            {localAreasData.map((area) => (
              <a
                key={area.id}
                href={`#${area.id}`}
                className="min-h-[44px] px-4 rounded-xl bg-white/10 hover:bg-[#C9A24B] hover:text-[#0B1F3A] border border-white/15 text-sm font-semibold text-white inline-flex items-center gap-2 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" aria-hidden="true" />
                <span>{isEn ? area.nameEn : area.nameBn}</span>
              </a>
            ))}
          </nav>

          <HeroCtaRow
            primaryHref="#office-map"
            primaryLabelBn="অফিস ম্যাপ ও দিকনির্দেশনা"
            primaryLabelEn="Office Map & Directions"
            locationId="service_areas_hero"
            showCallLink
          />
        </div>
      </section>

      {/* CONSISTENT NAP + LICENSE STRIP */}
      <section className="bg-white border-b border-[#0B1F3A]/8 py-4">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <LicenseStrip variant="light" />
        </div>
      </section>

      {/* EMBEDDED OFFICE MAP + EXACT NAP CARD */}
      <section id="office-map" className="py-16 sm:py-20 bg-[#FAF8F4] scroll-mt-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 card-surface p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#7D5D14] mb-2">
                  {t('স্থায়ী প্রধান কার্যালয় (NAP)', 'Permanent Head Office')}
                </p>
                <h2 className="heading-h3 text-[#0B1F3A]">{siteConfig.brandName}</h2>
                <p className="text-sm text-[#4B5563] mt-1">
                  {t(siteConfig.taglineBn, siteConfig.taglineEn)}
                </p>

                <address className="not-italic mt-6 space-y-4 text-sm text-[#374151] leading-[1.75]">
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
                        onClick={() => trackAnalyticsEvent('call_click', { location: 'service_areas_nap' })}
                        className="font-semibold hover:text-[#7D5D14] tabular-nums"
                      >
                        {siteConfig.contact.phoneDisplay}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#C9A24B] shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <div className="font-bold text-[#0B1F3A]">{t('অফিস সময়', 'Office Hours')}</div>
                      <div>{t(siteConfig.contact.officeHoursBn, siteConfig.contact.officeHoursEn)}</div>
                    </div>
                  </div>
                </address>
              </div>

              <div className="pt-4 border-t border-[#0B1F3A]/8 flex flex-wrap gap-3">
                <a
                  href={siteConfig.contact.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackAnalyticsEvent('cta_click', {
                      cta_label: 'Open Google Maps Directions',
                      cta_location: 'service_areas_nap',
                    })
                  }
                  className="btn-primary btn-sm flex-1"
                >
                  <Navigation className="w-4 h-4" aria-hidden="true" />
                  <span>{t('Google Maps দিকনির্দেশনা', 'Get Directions')}</span>
                </a>
                <Link to={localizedPath('/contact')} className="btn-secondary btn-sm flex-1">
                  <span>{t('ফ্রি কনসাল্টেশন', 'Book Consultation')}</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 card-surface overflow-hidden flex flex-col">
              <GoogleMapFacade
                variant="card"
                tone="light"
                heightClass="h-72 sm:h-80 lg:flex-1 lg:min-h-[340px]"
                title="Visatrip Global — Rohanpur, Gomastapur, Chapai Nawabganj, Bangladesh Map"
              />
              <div className="px-5 py-4 bg-white border-t border-[#0B1F3A]/8 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-[#4B5563] font-medium">
                  {t(siteConfig.contact.officeAddressBn, siteConfig.contact.officeAddressEn)}
                </span>
                <a
                  href={siteConfig.contact.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#7D5D14] inline-flex items-center gap-1 hover:underline"
                >
                  {t('গুগল ম্যাপে রাস্তা দেখুন', 'Open Turn-by-Turn Route')}
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* 5 UNIQUE LOCAL LANDING SECTIONS */}
      <div className="bg-white">
        {localAreasData.map((area, index) => {
          const isAltBg = index % 2 === 1;
          const areaWaHref = buildWhatsAppLink(
            isEn ? area.whatsappMessageEn : area.whatsappMessageBn,
            locale
          );
          const areaFaqs = area.faqs.map((f) => ({
            question: isEn ? f.questionEn : f.questionBn,
            answer: isEn ? f.answerEn : f.answerBn,
          }));

          return (
            <section
              key={area.id}
              id={area.id}
              className={`py-16 sm:py-24 scroll-mt-24 ${
                isAltBg ? 'bg-[#FAF8F4]' : 'bg-white'
              } border-b border-[#0B1F3A]/8`}
            >
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
                {/* Area Section Header */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8">
                    <div className="inline-flex items-center gap-2.5 mb-3">
                      <span className="font-editorial text-sm font-bold text-[#7D5D14] tabular-nums">
                        {isEn ? `0${index + 1}` : toBanglaDigits(`0${index + 1}`)}
                      </span>
                      <span className="h-[1px] w-6 bg-[#C9A24B]" aria-hidden="true" />
                      <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#7D5D14]">
                        {isEn ? area.badgeEn : area.badgeBn}
                      </p>
                    </div>
                    <h2 className="heading-h2 text-[#0B1F3A]">
                      {isEn ? area.headlineEn : area.headlineBn}
                    </h2>
                    <p className="body-base mt-4 text-[#4B5563]">
                      {isEn ? area.introEn : area.introBn}
                    </p>
                  </div>

                  {/* Practical Access Card */}
                  <div
                    data-dark-surface="true"
                    className="lg:col-span-4 rounded-2xl bg-[#0B1F3A] text-white p-6 border border-[#C9A24B]/35 space-y-4"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#C9A24B]">
                      <Compass className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{t('যোগাযোগ ও যাতায়াত সুবিধা', 'Access & Remote Support')}</span>
                    </div>
                    <p className="text-sm text-white/85 leading-[1.75]">
                      {isEn ? area.travelAccessEn : area.travelAccessBn}
                    </p>
                    <a
                      href={areaWaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackAnalyticsEvent('whatsapp_click', {
                          location: `local_area_${area.id}`,
                          prefilled_topic: area.nameEn,
                        })
                      }
                      className="btn-primary btn-sm w-full"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>
                        {t(`${area.nameBn} থেকে WhatsApp করুন`, `WhatsApp from ${area.nameEn}`)}
                      </span>
                    </a>
                  </div>
                </div>

                {/* Regional Corridor Guide + Priority Services */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="card-surface p-6 sm:p-7 border-[#C9A24B]/40">
                      <div className="flex items-center gap-2.5 text-[#0B1F3A] mb-3">
                        <Building2 className="w-5 h-5 text-[#7D5D14] shrink-0" aria-hidden="true" />
                        <h3 className="heading-h3 text-[#0B1F3A]">
                          {isEn ? area.corridorTitleEn : area.corridorTitleBn}
                        </h3>
                      </div>
                      <p className="text-sm text-[#4B5563] leading-[1.75]">
                        {isEn ? area.corridorDetailEn : area.corridorDetailBn}
                      </p>
                    </div>

                    <div className="card-surface p-6 sm:p-7">
                      <h3 className="heading-h3 text-[#0B1F3A] mb-4">
                        {t(`${area.nameBn}-এর যাত্রীদের জন্য বাস্তব পরামর্শ`, `Practical Tips for ${area.nameEn} Travelers`)}
                      </h3>
                      <ul className="space-y-3 text-sm text-[#374151] leading-[1.75]">
                        {(isEn ? area.practicalTipsEn : area.practicalTipsBn).map((tip) => (
                          <li key={tip} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-[#7D5D14] shrink-0 mt-1" aria-hidden="true" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Area Priority Services + Local FAQs */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <h3 className="heading-h3 text-[#0B1F3A] mb-4">
                        {t(`${area.nameBn}-এ সবচেয়ে চাহিদাসম্পন্ন সেবাসমূহ`, `Most Requested Services in ${area.nameEn}`)}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {area.priorityServices.map((srv) => (
                          <Link
                            key={srv.slug}
                            to={localizedPath(`/services/${srv.slug}`)}
                            className="card-interactive rounded-2xl bg-white border border-[#0B1F3A]/10 p-5 flex flex-col justify-between gap-3 hover:border-[#C9A24B]"
                          >
                            <div>
                              <div className="text-[15px] font-bold text-[#0B1F3A]">
                                {isEn ? srv.labelEn : srv.labelBn}
                              </div>
                              <p className="mt-1.5 text-xs sm:text-sm text-[#4B5563] leading-[1.7]">
                                {isEn ? srv.localNoteEn : srv.localNoteBn}
                              </p>
                            </div>
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7D5D14]">
                              <span>{t('বিস্তারিত দেখুন', 'View Service Details')}</span>
                              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="card-surface p-6">
                      <h3 className="heading-h3 text-[#0B1F3A] mb-4">
                        {t(`${area.nameBn} সম্পর্কিত সাধারণ প্রশ্ন`, `${area.nameEn} Local FAQs`)}
                      </h3>
                      <FaqAccordion items={areaFaqs} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* NATIONWIDE BANGLADESH SUPPORT + FINANCIAL TRANSPARENCY */}
      <section className="py-16 sm:py-20 bg-[#FAF8F4]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
          <SectionHeader
            kicker={t('সারা বাংলাদেশ কাভারেজ', 'Nationwide Bangladesh Coverage')}
            title={t(
              'রাজশাহী বিভাগের বাইরে থেকেও সম্পূর্ণ অনলাইন ও WhatsApp সাপোর্ট',
              'Serving Clients Across All 64 Districts of Bangladesh'
            )}
            subtitle={t(
              'নওগাঁ, নাটোর, বগুড়া, পাবনা, ঢাকা, চট্টগ্রাম কিংবা সিলেট — বাংলাদেশের যেকোনো জেলা থেকে WhatsApp-এ ডকুমেন্ট রিভিউ, ফ্লাইট টিকেট, ওমরাহ এবং ভিসা গাইডলাইন নিতে পারবেন।',
              'Whether you live in Naogaon, Natore, Bogura, Dhaka, Chattogram, or Sylhet, receive structured WhatsApp document checks, verified air tickets, and itemized receipts.'
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TransparentFeeNote />
            <PaymentReceiptNotice />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
