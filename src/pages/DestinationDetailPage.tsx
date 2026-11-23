import { Link, useParams } from 'react-router-dom';
import { Check, Clock, Calendar, ArrowRight } from 'lucide-react';
import { getDestinationBySlug, destinationsData } from '../data/destinations';
import { servicesData } from '../data/services';
import { tourPackagesData } from '../data/packages';
import { formatBDT } from '../config/site';
import { SeoHead, buildBreadcrumbSchema, buildFaqSchema } from '../lib/seo';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { GoldDivider } from '../components/GoldDivider';
import { SafeImage } from '../components/SafeImage';
import { InquiryForm } from '../components/InquiryForm';
import { FaqAccordion } from '../components/FaqAccordion';
import { HeroCtaRow } from '../components/HeroCtaRow';
import { SectionCtaStrip } from '../components/SectionCtaStrip';
import { CtaBanner } from '../components/CtaBanner';
import {
  LicenseStrip,
  VerifiedDateStamp,
  TransparentFeeNote,
  PaymentReceiptNotice,
  OfficialSourcesNote,
} from '../components/TrustSignals';
import { PackageCard, DestinationCard } from '../components/Cards';
import { NotFoundPage } from './NotFoundPage';

export function DestinationDetailPage() {
  const { country = '' } = useParams();
  const { isEn, locale, localizedPath, t } = useLanguage();
  const dest = getDestinationBySlug(country);

  if (!dest) {
    return <NotFoundPage />;
  }

  const availableServices = servicesData.filter((s) => dest.availableServices.includes(s.slug));
  const relatedPackages = tourPackagesData.filter((p) => p.countrySlug === dest.slug);
  const sameRegionOthers = destinationsData.filter(
    (d) => d.slug !== dest.slug && d.regionEn === dest.regionEn
  );
  const fallbackOthers = destinationsData.filter(
    (d) => d.slug !== dest.slug && d.regionEn !== dest.regionEn
  );
  const otherDestinations = [...sameRegionOthers, ...fallbackOthers].slice(0, 4);
  const startingPrice = formatBDT(dest.startingPriceBDT, locale);

  const faqEntries = dest.faqs.map((f) => ({
    question: isEn ? f.questionEn : f.questionBn,
    answer: isEn ? f.answerEn : f.answerBn,
  }));

  return (
    <>
      <SeoHead
        title={isEn ? dest.seo.titleEn : dest.seo.titleBn}
        description={isEn ? dest.seo.descriptionEn : dest.seo.descriptionBn}
        canonicalPath={`/destinations/${dest.slug}`}
        locale={locale}
        schemas={[
          buildBreadcrumbSchema(
            [
              { name: t('হোম', 'Home'), path: '/' },
              { name: t('ডেস্টিনেশন', 'Destinations'), path: '/destinations' },
              { name: isEn ? dest.nameEn : dest.nameBn, path: `/destinations/${dest.slug}` },
            ],
            locale
          ),
          ...(faqEntries.length > 0 ? [buildFaqSchema(faqEntries)] : []),
        ]}
      />

      <section className="relative bg-navy-hero text-white overflow-hidden">
        <div className="absolute inset-0">
          <SafeImage
            imageKey={dest.imageKey}
            destinationSlug={dest.slug}
            preset="detailHero"
            priority
            className="w-full h-full object-cover opacity-35"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#071529]/95 via-[#0B1F3A]/85 to-[#0B1F3A]/50" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <Breadcrumbs
            light
            items={[
              { label: t('হোম', 'Home'), to: '/' },
              { label: t('ডেস্টিনেশন', 'Destinations'), to: '/destinations' },
              { label: isEn ? dest.nameEn : dest.nameBn },
            ]}
          />
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[#C9A24B]" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#C9A24B]">
              {isEn ? dest.regionEn : dest.regionBn}
            </p>
          </div>
          <h1 className="heading-h1 text-white max-w-3xl">
            {isEn ? `${dest.nameEn} — Visa & Travel Guide` : `${dest.nameBn} — ভিসা ও ভ্রমণ গাইড`}
          </h1>
          <p className="body-lead mt-6 text-white/85 max-w-2xl">
            {isEn ? dest.taglineEn : dest.taglineBn}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs sm:text-sm text-white/90">
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C9A24B]" />
              {t('সেরা সময়:', 'Best Time:')} {isEn ? dest.bestTimeEn : dest.bestTimeBn}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C9A24B]" />
              {isEn ? dest.processingTimeEn : dest.processingTimeBn}
            </span>
            {startingPrice && (
              <span className="font-semibold text-[#C9A24B] tabular-nums">
                {t(`শুরু ${startingPrice} থেকে`, `Starting from ${startingPrice}`)}
              </span>
            )}
          </div>

          <div className="mt-4">
            <VerifiedDateStamp light />
          </div>

          <HeroCtaRow
            primaryHref="#dest-inquiry"
            locationId={`destination_hero_${dest.slug}`}
            showCallLink
          />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
          <LicenseStrip variant="white" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-12">
              <div>
                <h2 className="heading-h2 text-[#0B1F3A]">
                  {t('সংক্ষিপ্ত পরিচিতি', 'Destination Overview')}
                </h2>
                <p className="body-base mt-4 text-[#4B5563]">
                  {isEn ? dest.overviewEn : dest.overviewBn}
                </p>
              </div>

              <div>
                <h2 className="heading-h2 text-[#0B1F3A] mb-6">
                  {t('প্রধান আকর্ষণ ও সুবিধা', 'Key Highlights')}
                </h2>
                <ul className="card-surface p-6 sm:p-8 space-y-3">
                  {(isEn ? dest.highlightsEn : dest.highlightsBn).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] text-[#374151] leading-[1.75]">
                      <Check className="w-4 h-4 text-[#C9A24B] shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="heading-h2 text-[#0B1F3A] mb-6">
                  {t('প্রয়োজনীয় মূল ডকুমেন্ট', 'Core Required Documents')}
                </h2>
                <div className="card-surface p-6 sm:p-8 space-y-3">
                  {(isEn ? dest.documentsSummaryEn : dest.documentsSummaryBn).map((doc) => (
                    <div key={doc} className="flex items-start gap-3 text-[15px] text-[#374151] leading-[1.75]">
                      <Check className="w-4 h-4 text-[#C9A24B] shrink-0 mt-1.5" />
                      <span>{doc}</span>
                    </div>
                  ))}
                  <div className="pt-4 mt-4 border-t border-[#0B1F3A]/8 flex items-center justify-between flex-wrap gap-3">
                    <span className="text-xs text-[#525B68]">
                      {t('ভিসা সিদ্ধান্ত সম্পূর্ণরূপে সংশ্লিষ্ট Embassy-র।', 'Final visa decisions belong strictly to the Embassy.')}
                    </span>
                    <a
                      href="#dest-inquiry"
                      className="text-xs font-semibold text-[#7D5D14] hover:underline inline-flex items-center gap-1"
                    >
                      {t('ফ্রি ডকুমেন্ট যাচাই করুন', 'Request Free Document Check')}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="mt-6">
                  <SectionCtaStrip
                    variant="white"
                    locationId={`destination_after_docs_${dest.slug}`}
                    primaryHref="#dest-inquiry"
                    headingBn={`${dest.nameBn} ভিসা বা ট্যুরের জন্য ফ্রি প্রোফাইল যাচাই করুন`}
                    headingEn={`Free Eligibility & Document Check for ${dest.nameEn}`}
                    subtextBn="ডকুমেন্ট প্রস্তুত আছে কিনা তাৎক্ষণিক WhatsApp-এ জেনে নিন।"
                    subtextEn="Confirm your paperwork readiness with a consultant before applying."
                  />
                </div>
              </div>

              <div className="space-y-3">
                <TransparentFeeNote variant="inline" />
                <PaymentReceiptNotice variant="inline" />
              </div>

              <OfficialSourcesNote tags={[dest.slug, 'general']} />

              <div>
                <h2 className="heading-h2 text-[#0B1F3A] mb-6">
                  {t('এই গন্তব্যে আমাদের সেবাসমূহ', 'Available Services for This Destination')}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {availableServices.map((srv) => (
                    <Link
                      key={srv.slug}
                      to={localizedPath(`/services/${srv.slug}`)}
                      className="btn-secondary btn-sm"
                    >
                      <span>{isEn ? srv.titleEn : srv.titleBn}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C9A24B]" />
                    </Link>
                  ))}
                </div>
              </div>

              {relatedPackages.length > 0 && (
                <div>
                  <h2 className="heading-h2 text-[#0B1F3A] mb-6">
                    {t('এই দেশের জনপ্রিয় প্যাকেজ', 'Featured Packages for This Country')}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {relatedPackages.map((pkg) => (
                      <PackageCard key={pkg.slug} pkg={pkg} />
                    ))}
                  </div>
                </div>
              )}

              {faqEntries.length > 0 && (
                <div>
                  <h2 className="heading-h2 text-[#0B1F3A] mb-6">
                    {t('সচরাচর জিজ্ঞাসা', 'Frequently Asked Questions')}
                  </h2>
                  <FaqAccordion items={faqEntries} />
                </div>
              )}
            </div>

            <aside id="dest-inquiry" className="lg:col-span-4 lg:sticky lg:top-28">
              <div className="card-surface border-[#C9A24B]/45 p-6 sm:p-8 shadow-[0_14px_36px_rgba(11,31,58,0.08)]">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#7D5D14] mb-1">
                  {t('ফ্রি কনসাল্টেশন', 'Free Consultation')}
                </p>
                <h2 className="heading-h3 text-[#0B1F3A] mb-6">
                  {isEn ? `Plan Your ${dest.nameEn} Trip` : `${dest.nameBn} ভিসা বা ট্যুর সম্পর্কে জানুন`}
                </h2>
                <InquiryForm
                  defaultCountry={dest.nameEn}
                  compact
                  formType={`destination_${dest.slug}`}
                />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <GoldDivider />

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="heading-h2 text-[#0B1F3A] mb-10">
            {t('অন্যান্য জনপ্রিয় ডেস্টিনেশন', 'Explore Other Popular Destinations')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherDestinations.map((d) => (
              <DestinationCard key={d.slug} destination={d} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        defaultCountry={dest.nameEn}
        headingBn={`${dest.nameBn} ভ্রমণ বা ভিসা নিয়ে আজই কথা বলুন`}
        headingEn={`Plan Your ${dest.nameEn} Visa or Trip with Our Team`}
      />
    </>
  );
}
