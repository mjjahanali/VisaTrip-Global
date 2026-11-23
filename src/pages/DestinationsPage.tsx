import { useState } from 'react';
import { destinationsData } from '../data/destinations';
import { SeoHead, buildBreadcrumbSchema, buildCollectionPageSchema } from '../lib/seo';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { DestinationCard } from '../components/Cards';
import { CtaBanner } from '../components/CtaBanner';
import { HeroCtaRow } from '../components/HeroCtaRow';
import { EmptyState } from '../components/EmptyState';
import { StaggerGroup, StaggerItem } from '../components/MotionPrimitives';

const REGIONS = ['All', 'Middle East', 'Southeast Asia', 'South Asia', 'Europe', 'Eurasia'];

export function DestinationsPage() {
  const { locale, t } = useLanguage();
  const [region, setRegion] = useState('All');

  const filtered =
    region === 'All'
      ? destinationsData
      : destinationsData.filter((d) => d.regionEn === region);

  return (
    <>
      <SeoHead
        title={t('জনপ্রিয় ডেস্টিনেশন ও ভিসা গাইড | Visatrip Global', 'Popular Destinations & Visa Guides | Visatrip Global')}
        description={t(
          'দুবাই, সৌদি আরব, মালয়েশিয়া, থাইল্যান্ড, সিঙ্গাপুর, তুরস্ক, ইউরোপ, ভারত, মালদ্বীপ ও নেপাল ভ্রমণ ও ভিসা গাইড — Visatrip Global।',
          'Explore visa requirements, processing times, and travel packages for Dubai, Saudi Arabia, Malaysia, Thailand, Singapore, Turkey, Europe, and India.'
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
              {t('ভিসা ও ভ্রমণ গন্তব্য', 'Global Destinations')}
            </p>
          </div>
          <h1 className="heading-h1 text-white max-w-3xl">
            {t('জনপ্রিয় ডেস্টিনেশন ও ভিসা গাইড', 'Popular Travel & Visa Destinations')}
          </h1>
          <p className="body-lead mt-6 text-white/85 max-w-2xl">
            {t(
              'বাংলাদেশি যাত্রীদের পছন্দের দেশগুলোর ভিসা ডকুমেন্ট, প্রসেসিং সময় ও ভ্রমণ পরিকল্পনা জানুন।',
              'Discover document requirements, ideal travel windows, and visa guidance for top destinations from Bangladesh.'
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
          {/* Interactive Region Filter Controls */}
          <div className="flex overflow-x-auto snap-carousel scrollbar-none items-center gap-2 pb-1 sm:pb-0 sm:flex-wrap mb-10">
            {REGIONS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegion(r)}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 snap-start transition-colors duration-200 cursor-pointer ${
                  region === r
                    ? 'bg-[#0B1F3A] text-white shadow-sm'
                    : 'bg-white border border-[#0B1F3A]/12 text-[#4B5563] hover:border-[#C9A24B] hover:text-[#0B1F3A]'
                }`}
              >
                {r === 'All' ? t('সকল অঞ্চল', 'All Regions') : r}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon="destinations"
              titleBn="এই অঞ্চলে কোনো গাইড তালিকাভুক্ত নেই"
              titleEn="No Destinations Listed in This Region"
              descriptionBn="আপনি যদি তালিকার বাইরের কোনো দেশের ভিসা বা ট্রাভেল তথ্য চান, সরাসরি আমাদের কনসালটেন্টকে WhatsApp-এ জিজ্ঞাসা করুন।"
              descriptionEn="Looking for visa guidance for a country not listed here? Message our consultant directly on WhatsApp."
              onReset={() => setRegion('All')}
              resetLabelBn="সকল অঞ্চল দেখুন"
              resetLabelEn="Show All Regions"
              whatsappLabelBn="অন্যান্য দেশের তথ্য জানুন"
              whatsappLabelEn="Ask About Another Country"
              whatsappMessageBn="আসসালামু আলাইকুম, আমি একটি নির্দিষ্ট দেশের ভিসা ও ডকুমেন্ট গাইডলাইন জানতে চাই।"
              locationId="destinations_empty_state"
            />
          ) : (
            <StaggerGroup key={region} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((dest) => (
                <StaggerItem key={dest.slug} className="h-full">
                  <DestinationCard destination={dest} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
