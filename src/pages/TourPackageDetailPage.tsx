import { useParams } from 'react-router-dom';
import { Check, X as XIcon, Clock, Building2, Utensils } from 'lucide-react';
import { getPackageBySlug } from '../data/packages';
import { siteImages } from '../config/images';
import { formatBDT } from '../config/site';
import { SeoHead, buildBreadcrumbSchema, buildTourPackageSchema } from '../lib/seo';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SafeImage } from '../components/SafeImage';
import { InquiryForm } from '../components/InquiryForm';
import { HeroCtaRow } from '../components/HeroCtaRow';
import { SectionCtaStrip } from '../components/SectionCtaStrip';
import { CtaBanner } from '../components/CtaBanner';
import {
  LicenseStrip,
  ScamAwarenessBanner,
  TransparentFeeNote,
  PaymentReceiptNotice,
  OfficialSourcesNote,
  VerifiedDateStamp,
} from '../components/TrustSignals';
import { NotFoundPage } from './NotFoundPage';

export function TourPackageDetailPage() {
  const { slug = '' } = useParams();
  const { isEn, locale, t } = useLanguage();
  const pkg = getPackageBySlug(slug);

  if (!pkg) {
    return <NotFoundPage />;
  }

  const priceText = formatBDT(pkg.priceBDT, locale);
  const isUmrah = pkg.category === 'Umrah';

  return (
    <>
      <SeoHead
        title={isEn ? pkg.seo.titleEn : pkg.seo.titleBn}
        description={isEn ? pkg.seo.descriptionEn : pkg.seo.descriptionBn}
        canonicalPath={`/tour-packages/${pkg.slug}`}
        locale={locale}
        ogImage={siteImages[pkg.imageKey].src}
        schemas={[
          buildBreadcrumbSchema(
            [
              { name: t('হোম', 'Home'), path: '/' },
              { name: t('ট্যুর প্যাকেজ', 'Tour Packages'), path: '/tour-packages' },
              { name: isEn ? pkg.titleEn : pkg.titleBn, path: `/tour-packages/${pkg.slug}` },
            ],
            locale
          ),
          buildTourPackageSchema({
            name: isEn ? pkg.titleEn : pkg.titleBn,
            description: isEn ? pkg.summaryEn : pkg.summaryBn,
            path: `/tour-packages/${pkg.slug}`,
            image: siteImages[pkg.imageKey].src,
            priceBDT: pkg.priceBDT,
            locale,
            itineraryNames: pkg.itinerary.map((day) =>
              isEn ? `Day ${day.day}: ${day.titleEn}` : `দিন ${day.day}: ${day.titleBn}`
            ),
          }),
        ]}
      />

      <section className={`${isUmrah ? 'bg-hajj-hero' : 'bg-navy-hero'} text-white py-16 sm:py-24`}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Breadcrumbs
            light
            items={[
              { label: t('হোম', 'Home'), to: '/' },
              { label: t('ট্যুর প্যাকেজ', 'Tour Packages'), to: '/tour-packages' },
              { label: isEn ? pkg.titleEn : pkg.titleBn },
            ]}
          />
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[#C9A24B]" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#C9A24B]">
              {pkg.category} · {pkg.budgetTier}
            </p>
          </div>
          <h1 className="heading-h1 text-white max-w-3xl">
            {isEn ? pkg.titleEn : pkg.titleBn}
          </h1>
          <p className="body-lead mt-6 text-white/85 max-w-2xl">
            {isEn ? pkg.summaryEn : pkg.summaryBn}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs sm:text-sm text-white/90">
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C9A24B]" />
              {isEn ? pkg.durationEn : pkg.durationBn}
            </span>
            <span className="inline-flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#C9A24B]" />
              {isEn ? pkg.hotelTierEn : pkg.hotelTierBn}
            </span>
            <span className="inline-flex items-center gap-2">
              <Utensils className="w-4 h-4 text-[#C9A24B]" />
              {isEn ? pkg.mealsEn : pkg.mealsBn}
            </span>
          </div>

          {isUmrah && (
            <div className="mt-4">
              <VerifiedDateStamp light />
            </div>
          )}

          <HeroCtaRow
            primaryHref="#book"
            primaryLabelBn="প্যাকেজ বুক / কোট নিন"
            primaryLabelEn="Book or Request Quote"
            locationId={`package_hero_${pkg.slug}`}
            showCallLink
          />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
          <LicenseStrip variant={isUmrah ? 'hajj' : 'white'} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-12">
              {isUmrah && <ScamAwarenessBanner topic="hajj-umrah" />}

              <div className="rounded-2xl overflow-hidden aspect-[16/10] border border-[#0B1F3A]/10 shadow-[0_12px_32px_rgba(11,31,58,0.08)]">
                <SafeImage imageKey={pkg.imageKey} preset="detailFeature" priority className="w-full h-full object-cover" />
              </div>

              {/* Day-Wise Itinerary */}
              <div>
                <h2 className="heading-h2 text-[#0B1F3A] mb-6">
                  {t('দিনভিত্তিক ভ্রমণ পরিকল্পনা (Day-by-Day Itinerary)', 'Day-by-Day Itinerary')}
                </h2>
                <div className="space-y-4">
                  {pkg.itinerary.map((day) => (
                    <div
                      key={day.day}
                      className="card-surface p-6 flex items-start gap-4"
                    >
                      <div className="w-16 py-2 rounded-xl bg-[#0B1F3A] text-[#C9A24B] text-xs font-bold text-center shrink-0 tabular-nums">
                        {t(`দিন ${day.day}`, `Day ${day.day}`)}
                      </div>
                      <div>
                        <h3 className="heading-h3 text-[#0B1F3A]">
                          {isEn ? day.titleEn : day.titleBn}
                        </h3>
                        <p className="mt-2 text-sm text-[#4B5563] leading-[1.75]">
                          {isEn ? day.descEn : day.descBn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusion / Exclusion */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="card-surface border-[#0F5132]/20 p-6 sm:p-8">
                  <h2 className="heading-h3 text-[#0F5132] mb-4">
                    {t('প্যাকেজে যা অন্তর্ভুক্ত (Inclusions)', 'What’s Included')}
                  </h2>
                  <ul className="space-y-3 text-sm text-[#374151] leading-[1.75]">
                    {(isEn ? pkg.inclusionsEn : pkg.inclusionsBn).map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#0F5132] shrink-0 mt-1" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-surface p-6 sm:p-8">
                  <h2 className="heading-h3 text-[#0B1F3A] mb-4">
                    {t('যা অন্তর্ভুক্ত নয় (Exclusions)', 'Not Included')}
                  </h2>
                  <ul className="space-y-3 text-sm text-[#4B5563] leading-[1.75]">
                    {(isEn ? pkg.exclusionsEn : pkg.exclusionsBn).map((exc) => (
                      <li key={exc} className="flex items-start gap-2.5">
                        <XIcon className="w-4 h-4 text-[#9CA3AF] shrink-0 mt-1" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <TransparentFeeNote variant="inline" />
                <PaymentReceiptNotice variant="inline" />
              </div>

              {isUmrah && <OfficialSourcesNote tags={['hajj-umrah', 'saudi-arabia']} />}

              <SectionCtaStrip
                variant={isUmrah ? 'hajj' : 'white'}
                locationId={`package_after_inclusions_${pkg.slug}`}
                primaryHref="#book"
                primaryLabelBn="এই প্যাকেজটি কাস্টমাইজ করুন"
                primaryLabelEn="Customize This Package"
                headingBn="আপনার তারিখ ও পরিবার অনুযায়ী প্যাকেজ সাজিয়ে নিন"
                headingEn="Want to Tailor Dates, Hotel Tier or Group Size?"
                subtextBn="ভিসা, ফ্লাইট ও হোটেলের লাইভ রেট জানতে সরাসরি WhatsApp-এ মেসেজ করুন।"
                subtextEn="Message us on WhatsApp for live flight fares and custom room arrangements."
              />
            </div>

            <aside id="book" className="lg:col-span-4 lg:sticky lg:top-28">
              <div className="card-surface border-[#C9A24B]/45 p-6 sm:p-8 shadow-[0_14px_36px_rgba(11,31,58,0.08)]">
                <div className="pb-4 mb-6 border-b border-[#0B1F3A]/8 flex items-baseline justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#525B68]">
                    {t('প্যাকেজ মূল্য', 'Package Rate')}
                  </span>
                  <span className="text-xl font-bold text-[#0B1F3A] tabular-nums">
                    {priceText || t('কনসাল্টেশন নিন', 'Request Quote')}
                  </span>
                </div>
                <h2 className="heading-h3 text-[#0B1F3A] mb-6">
                  {t('এই প্যাকেজটি বুক বা কাস্টমাইজ করুন', 'Book or Customize This Package')}
                </h2>
                <InquiryForm
                  defaultService={isUmrah ? 'Hajj & Umrah Packages' : 'Curated Tour Packages'}
                  compact
                  formType={`package_${pkg.slug}`}
                  submitLabel={t('Book This Package', 'Book This Package')}
                  extraFields={{ PackageTitle: pkg.titleEn, Duration: pkg.durationEn }}
                />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CtaBanner
        defaultService={isUmrah ? 'Hajj & Umrah Packages' : 'Curated Tour Packages'}
        theme={isUmrah ? 'hajj' : 'navy'}
      />
    </>
  );
}
