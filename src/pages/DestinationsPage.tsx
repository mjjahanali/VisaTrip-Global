import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { destinationsData } from '../data/destinations';
import { toBanglaDigits } from '../config/site';
import { SeoHead, buildBreadcrumbSchema, buildCollectionPageSchema } from '../lib/seo';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { DestinationCard } from '../components/Cards';
import { CtaBanner } from '../components/CtaBanner';
import { HeroCtaRow } from '../components/HeroCtaRow';
import { EmptyState } from '../components/EmptyState';

const REGION_OPTIONS: { value: string; labelBn: string; labelEn: string }[] = [
  { value: 'All', labelBn: 'সকল অঞ্চল', labelEn: 'All Regions' },
  { value: 'Middle East', labelBn: 'মধ্যপ্রাচ্য', labelEn: 'Middle East' },
  { value: 'South Asia', labelBn: 'দক্ষিণ এশিয়া', labelEn: 'South Asia' },
  { value: 'Southeast Asia', labelBn: 'দক্ষিণ-পূর্ব এশিয়া', labelEn: 'Southeast Asia' },
  { value: 'East Asia', labelBn: 'পূর্ব এশিয়া', labelEn: 'East Asia' },
  { value: 'Europe', labelBn: 'ইউরোপ', labelEn: 'Europe' },
  { value: 'Eurasia', labelBn: 'ইউরোপ ও এশিয়া', labelEn: 'Eurasia' },
  { value: 'North America', labelBn: 'উত্তর আমেরিকা', labelEn: 'North America' },
  { value: 'Oceania', labelBn: 'ওশেনিয়া', labelEn: 'Oceania' },
  { value: 'Africa', labelBn: 'আফ্রিকা', labelEn: 'Africa' },
  { value: 'South America', labelBn: 'দক্ষিণ আমেরিকা', labelEn: 'South America' },
];

export function DestinationsPage() {
  const { isEn, locale, t } = useLanguage();
  const [region, setRegion] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return destinationsData.filter((d) => {
      if (region !== 'All' && d.regionEn !== region) return false;
      if (!q) return true;
      return (
        d.nameBn.toLowerCase().includes(q) ||
        d.nameEn.toLowerCase().includes(q) ||
        d.regionBn.toLowerCase().includes(q) ||
        d.regionEn.toLowerCase().includes(q) ||
        d.taglineBn.toLowerCase().includes(q) ||
        d.taglineEn.toLowerCase().includes(q) ||
        d.slug.toLowerCase().includes(q)
      );
    });
  }, [region, query]);

  const totalLabel = isEn
    ? `${destinationsData.length} Countries`
    : `${toBanglaDigits(destinationsData.length)}টি দেশ`;

  const shownLabel = isEn
    ? `Showing ${filtered.length} of ${destinationsData.length} destinations`
    : `মোট ${toBanglaDigits(destinationsData.length)}টির মধ্যে ${toBanglaDigits(filtered.length)}টি দেশ দেখানো হচ্ছে`;

  return (
    <>
      <SeoHead
        title={t('জনপ্রিয় ডেস্টিনেশন ও ভিসা গাইড | Visatrip Global', 'Popular Destinations & Visa Guides | Visatrip Global')}
        description={t(
          'দুবাই, সৌদি আরব, মালয়েশিয়া, ইউরোপ, যুক্তরাজ্য, যুক্তরাষ্ট্র, কানাডা, অস্ট্রেলিয়া, জাপানসহ ৮০টি দেশের ভিসা ও ভ্রমণ গাইড — Visatrip Global।',
          'Explore visa requirements, processing times, and travel guidance for 80 countries including Dubai, Saudi Arabia, Europe, UK, USA, Canada, Japan & Australia.'
        )}
        canonicalPath="/destinations"
        locale={locale}
        schemas={[
          buildBreadcrumbSchema(
            [
              { name: t('হোম', 'Home'), path: '/' },
              { name: t('ডেস্টিনেশন', 'Destinations'), path: '/destinations' },
            ],
            locale
          ),
          buildCollectionPageSchema({
            name: t('জনপ্রিয় ডেস্টিনেশন ও ভিসা গাইড', 'Popular Destinations & Visa Guides'),
            description: t(
              'বাংলাদেশি যাত্রীদের জনপ্রিয় ভ্রমণ ও ভিসা গন্তব্যসমূহ।',
              'Popular visa and travel destinations for Bangladeshi travelers.'
            ),
            path: '/destinations',
            locale,
            items: destinationsData.map((d) => ({
              name: locale === 'en' ? d.nameEn : d.nameBn,
              path: `/destinations/${d.slug}`,
            })),
          }),
        ]}
      />

      <section className="bg-navy-hero text-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Breadcrumbs
            light
            items={[
              { label: t('হোম', 'Home'), to: '/' },
              { label: t('ডেস্টিনেশন', 'Destinations') },
            ]}
          />
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[#C9A24B]" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#C9A24B]">
              {t(`ভিসা ও ভ্রমণ গন্তব্য · ${totalLabel}`, `Global Destinations · ${totalLabel}`)}
            </p>
          </div>
          <h1 className="heading-h1 text-white max-w-3xl">
            {t('জনপ্রিয় ডেস্টিনেশন ও ভিসা গাইড', 'Popular Travel & Visa Destinations')}
          </h1>
          <p className="body-lead mt-6 text-white/85 max-w-2xl">
            {t(
              `এশিয়া, মধ্যপ্রাচ্য, ইউরোপ, আমেরিকা, অস্ট্রেলিয়া ও আফ্রিকার ${toBanglaDigits(destinationsData.length)}টি দেশের ভিসা ডকুমেন্ট, প্রসেসিং সময় ও ভ্রমণ পরিকল্পনা জানুন।`,
              `Discover document requirements, ideal travel windows, and visa guidance for ${destinationsData.length} destinations across Asia, the Middle East, Europe, the Americas, Oceania, and Africa.`
            )}
          </p>
          <HeroCtaRow locationId="destinations_hero" />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="sr-only">
            {t('অঞ্চল অনুযায়ী ডেস্টিনেশন তালিকা', 'Browse Destinations by Region')}
          </h2>

          {/* Search & Result Count Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="relative w-full sm:max-w-md">
              <Search
                className="w-4 h-4 text-[#525B68] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <label htmlFor="destination-search" className="sr-only">
                {t('দেশের নাম দিয়ে খুঁজুন', 'Search destination country')}
              </label>
              <input
                id="destination-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t(
                  'দেশের নাম লিখুন (যেমন: কানাডা, ইতালি, জাপান, কাতার...)',
                  'Search country (e.g. Canada, Italy, Japan, Qatar...)'
                )}
                className="w-full min-h-[46px] pl-10 pr-10 py-2.5 rounded-xl bg-white border border-[#0B1F3A]/15 text-sm text-[#0B1F3A] placeholder:text-[#6B7280] focus:outline-none focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/20"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label={t('সার্চ মুছুন', 'Clear search')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-[#525B68] hover:text-[#0B1F3A] cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>

            <p className="text-xs sm:text-sm font-medium text-[#525B68] tabular-nums">
              {shownLabel}
            </p>
          </div>

          {/* Interactive Region Filter Controls */}
          <div className="flex overflow-x-auto snap-carousel scrollbar-none items-center gap-2 pb-1 sm:pb-0 sm:flex-wrap mb-10">
            {REGION_OPTIONS.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRegion(r.value)}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 snap-start transition-colors duration-200 cursor-pointer ${
                  region === r.value
                    ? 'bg-[#0B1F3A] text-white shadow-sm'
                    : 'bg-white border border-[#0B1F3A]/12 text-[#4B5563] hover:border-[#C9A24B] hover:text-[#0B1F3A]'
                }`}
              >
                {isEn ? r.labelEn : r.labelBn}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon="destinations"
              titleBn="এই নামে বা অঞ্চলে কোনো দেশ পাওয়া যায়নি"
              titleEn="No Matching Destination Found"
              descriptionBn="আপনি যদি তালিকার বাইরের কোনো দেশের ভিসা বা ট্রাভেল তথ্য চান, সরাসরি আমাদের কনসালটেন্টকে WhatsApp-এ জিজ্ঞাসা করুন।"
              descriptionEn="Looking for visa guidance for a country not listed here? Message our consultant directly on WhatsApp."
              onReset={() => {
                setRegion('All');
                setQuery('');
              }}
              resetLabelBn="সকল দেশ দেখুন"
              resetLabelEn="Show All Destinations"
              whatsappLabelBn="অন্যান্য দেশের তথ্য জানুন"
              whatsappLabelEn="Ask About Another Country"
              whatsappMessageBn="আসসালামু আলাইকুম, আমি একটি নির্দিষ্ট দেশের ভিসা ও ডকুমেন্ট গাইডলাইন জানতে চাই।"
              locationId="destinations_empty_state"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((dest) => (
                <div key={dest.slug} className="h-full">
                  <DestinationCard destination={dest} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
