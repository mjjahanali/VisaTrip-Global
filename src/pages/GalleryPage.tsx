import { lazy, Suspense, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { galleryItemsData, type GalleryItem } from '../data/siteContent';
import { SeoHead, buildBreadcrumbSchema, buildCollectionPageSchema } from '../lib/seo';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HeroCtaRow } from '../components/HeroCtaRow';
import { SafeImage } from '../components/SafeImage';
import { CtaBanner } from '../components/CtaBanner';
import { EmptyState } from '../components/EmptyState';
import { StaggerGroup, StaggerItem } from '../components/MotionPrimitives';

const GalleryLightbox = lazy(() =>
  import('../components/GalleryLightbox').then((mod) => ({ default: mod.GalleryLightbox }))
);

const CATEGORIES: ('All' | GalleryItem['category'])[] = [
  'All',
  'Office',
  'Destinations',
  'Pilgrimage',
  'Clients',
];

export function GalleryPage() {
  const { isEn, locale, t } = useLanguage();
  const [cat, setCat] = useState<'All' | GalleryItem['category']>('All');
  const [active, setActive] = useState<GalleryItem | null>(null);

  const filtered =
    cat === 'All' ? galleryItemsData : galleryItemsData.filter((g) => g.category === cat);

  return (
    <>
      <SeoHead
        title={t('ফটো গ্যালারি | Visatrip Global', 'Photo Gallery | Visatrip Global')}
        description={t(
          'Visatrip Global অফিস, মক্কা-মদিনা, জনপ্রিয় ভ্রমণ ডেস্টিনেশন এবং ক্লায়েন্ট মুহূর্তের ফটো গ্যালারি।',
          'Browse Visatrip Global’s office environment, sacred pilgrimage visuals, and featured international destinations.'
        )}
        canonicalPath="/gallery"
        locale={locale}
        schemas={[
          buildBreadcrumbSchema(
            [
              { name: t('হোম', 'Home'), path: '/' },
              { name: t('গ্যালারি', 'Gallery'), path: '/gallery' },
            ],
            locale
          ),
          buildCollectionPageSchema({
            name: t('Visatrip Global ফটো গ্যালারি', 'Visatrip Global Photo Gallery'),
            description: t(
              'Visatrip Global অফিস, মক্কা-মদিনা এবং জনপ্রিয় ভ্রমণ গন্তব্যের ফটো গ্যালারি।',
              'Office, pilgrimage, and destination photography gallery for Visatrip Global.'
            ),
            path: '/gallery',
            locale,
            items: galleryItemsData.map((g) => ({
              name: isEn ? g.titleEn : g.titleBn,
              path: '/gallery',
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
              { label: t('গ্যালারি', 'Gallery') },
            ]}
          />
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[#C9A24B]" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#C9A24B]">
              {t('অফিস ও ভ্রমণ মুহূর্ত', 'Visual Showcase')}
            </p>
          </div>
          <h1 className="heading-h1 text-white max-w-3xl">
            {t('Visatrip Global ফটো গ্যালারি', 'Photo Gallery & Destination Visuals')}
          </h1>
          <p className="body-lead mt-6 text-white/85 max-w-2xl">
            {t(
              'আমাদের অফিস পরিবেশ, পবিত্র মক্কা-মদিনা এবং জনপ্রিয় ভ্রমণ গন্তব্যগুলো দেখুন। ক্লায়েন্টদের ছবি শুধুমাত্র লিখিত সম্মতি সাপেক্ষে যুক্ত করা হয়।',
              'Explore our consultation desk, pilgrimage destinations, and global travel highlights. Client photos are published solely with written consent.'
            )}
          </p>
          <HeroCtaRow locationId="gallery_hero" />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div
            role="group"
            aria-label={t('গ্যালারি ক্যাটাগরি ফিল্টার', 'Filter gallery by category')}
            className="flex overflow-x-auto snap-carousel scrollbar-none gap-2 pb-1 sm:pb-0 sm:flex-wrap mb-10"
          >
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 snap-start cursor-pointer transition-colors duration-200 ${
                  cat === c
                    ? 'bg-[#0B1F3A] text-white shadow-sm'
                    : 'bg-white border border-[#0B1F3A]/15 text-[#374151] hover:border-[#C9A24B] hover:text-[#0B1F3A]'
                }`}
              >
                {c === 'All' ? t('সকল ছবি', 'All Photos') : c}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon="search"
              titleBn="এই ক্যাটাগরিতে কোনো ছবি নেই"
              titleEn="No Photos in This Category Yet"
              descriptionBn="সকল অফিস, ভ্রমণ ও ওমরাহ ছবি দেখতে ফিল্টার রিসেট করুন।"
              descriptionEn="Reset the category filter to browse all office, destination, and pilgrimage photos."
              onReset={() => setCat('All')}
              resetLabelBn="সকল ছবি দেখুন"
              resetLabelEn="View All Photos"
              locationId="gallery_empty_state"
            />
          ) : (
            <StaggerGroup key={cat} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <StaggerItem key={item.id}>
                  <button
                    type="button"
                    onClick={() => setActive(item)}
                    aria-label={`${isEn ? item.titleEn : item.titleBn} — ${t('বড় করে দেখুন', 'Open larger preview')}`}
                    className="group w-full text-left card-interactive overflow-hidden cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#0B1F3A]">
                      <SafeImage
                        imageKey={item.imageKey}
                        preset="galleryCard"
                        className="w-full h-full object-cover card-img-zoom"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071529]/50 via-transparent to-transparent" />
                      <div
                        aria-hidden="true"
                        className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-[#0B1F3A]/75 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#7D5D14]">{item.category}</p>
                      <h2 className="heading-h3 mt-1 text-[#0B1F3A]">
                        {isEn ? item.titleEn : item.titleBn}
                      </h2>
                      <p className="mt-2 text-sm text-[#4B5563] leading-[1.7]">
                        {isEn ? item.captionEn : item.captionBn}
                      </p>
                    </div>
                  </button>
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>

      <CtaBanner />

      {/* Dynamically imported Lightbox Modal (loaded only on click) */}
      {active && (
        <Suspense fallback={null}>
          <GalleryLightbox item={active} onClose={() => setActive(null)} />
        </Suspense>
      )}
    </>
  );
}
