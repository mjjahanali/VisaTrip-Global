import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { blogPostsData } from '../data/blogs';
import { SeoHead, buildBreadcrumbSchema, buildCollectionPageSchema } from '../lib/seo';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HeroCtaRow } from '../components/HeroCtaRow';
import { SafeImage } from '../components/SafeImage';
import { CtaBanner } from '../components/CtaBanner';
import { EmptyState } from '../components/EmptyState';
import { StaggerGroup, StaggerItem } from '../components/MotionPrimitives';

export function BlogListPage() {
  const { isEn, locale, localizedPath, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(blogPostsData.map((b) => b.categoryEn)))];
  const filtered =
    selectedCategory === 'All'
      ? blogPostsData
      : blogPostsData.filter((b) => b.categoryEn === selectedCategory);

  return (
    <>
      <SeoHead
        title={t('ভিসা ও ট্রাভেল গাইড ব্লগ | Visatrip Global', 'Visa & Travel Knowledge Blog | Visatrip Global')}
        description={t(
          'Dubai Tourist Visa, India Medical Visa, ওমরাহ প্রস্তুতি, Work Permit সুরক্ষা, Student Bank Solvency ও Malaysia ভ্রমণ গাইড — Visatrip Global ব্লগ।',
          'In-depth travel and visa guides from Bangladesh covering Dubai Visa, India Medical Visa, Umrah prep, Work Permit safety, and Student Bank Solvency.'
        )}
        canonicalPath="/blog"
        locale={locale}
        schemas={[
          buildBreadcrumbSchema(
            [
              { name: t('হোম', 'Home'), path: '/' },
              { name: t('ব্লগ ও গাইড', 'Blog'), path: '/blog' },
            ],
            locale
          ),
          buildCollectionPageSchema({
            name: t('ভিসা ও ট্রাভেল গাইড ব্লগ', 'Visa & Travel Knowledge Blog'),
            description: t(
              'বাংলাদেশি যাত্রীদের জন্য ভিসা, ওমরাহ ও নিরাপদ বিদেশ যাত্রার বিস্তারিত গাইড।',
              'Detailed visa, Umrah, and travel guides for Bangladeshi travelers.'
            ),
            path: '/blog',
            locale,
            items: blogPostsData.map((b) => ({
              name: isEn ? b.titleEn : b.titleBn,
              path: `/blog/${b.slug}`,
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
              { label: t('ব্লগ ও গাইড', 'Blog & Guides') },
            ]}
          />
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[#C9A24B]" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#C9A24B]">
              {t('ভিসা ও ভ্রমণ নলেজ হাব', 'Travel & Visa Knowledge Hub')}
            </p>
          </div>
          <h1 className="heading-h1 text-white max-w-3xl">
            {t('ভিসা, ওমরাহ ও নিরাপদ বিদেশ যাত্রার গাইড', 'Practical Visa, Umrah & Travel Guides')}
          </h1>
          <p className="body-lead mt-6 text-white/85 max-w-2xl">
            {t(
              'বাংলাদেশি যাত্রীদের জন্য বাস্তবসম্মত ডকুমেন্ট চেকলিস্ট, ব্যাংক সলভেন্সি এবং প্রতারণা থেকে বাঁচার বিস্তারিত বাংলা গাইড।',
              'Clear checklists, bank solvency guidelines, and scam-prevention articles tailored for Bangladeshi travelers.'
            )}
          </p>
          <HeroCtaRow locationId="blog_list_hero" />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div
            role="group"
            aria-label={t('ব্লগ ক্যাটাগরি ফিল্টার', 'Filter articles by category')}
            className="flex overflow-x-auto snap-carousel scrollbar-none gap-2 pb-1 sm:pb-0 sm:flex-wrap mb-10"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 snap-start cursor-pointer transition-colors duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#0B1F3A] text-white shadow-sm'
                    : 'bg-white border border-[#0B1F3A]/15 text-[#374151] hover:border-[#C9A24B] hover:text-[#0B1F3A]'
                }`}
              >
                {cat === 'All' ? t('সকল গাইড', 'All Articles') : cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon="files"
              titleBn="এই ক্যাটাগরিতে কোনো গাইড পাওয়া যায়নি"
              titleEn="No Guides Found in This Category"
              descriptionBn="সকল ভিসা ও ওমরাহ গাইড দেখতে ফিল্টার রিসেট করুন অথবা আপনার নির্দিষ্ট প্রশ্ন আমাদের WhatsApp-এ জিজ্ঞাসা করুন।"
              descriptionEn="Reset the category filter to view all visa and Umrah guides, or ask your specific question on WhatsApp."
              onReset={() => setSelectedCategory('All')}
              resetLabelBn="সকল গাইড দেখুন"
              resetLabelEn="View All Guides"
              locationId="blog_empty_state"
            />
          ) : (
            <StaggerGroup key={selectedCategory} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <StaggerItem key={post.slug} className="h-full">
                  <article className="group card-interactive overflow-hidden flex flex-col justify-between h-full">
                    <div>
                      <Link to={localizedPath(`/blog/${post.slug}`)} className="block relative aspect-[16/9] overflow-hidden bg-[#0B1F3A]">
                        <SafeImage
                          imageKey={post.imageKey}
                          preset="blogCard"
                          className="w-full h-full object-cover card-img-zoom"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071529]/45 via-transparent to-transparent" />
                      </Link>
                      <div className="p-6">
                        <div className="text-xs text-[#525B68] flex flex-wrap items-center gap-2 mb-2">
                          <span className="font-semibold text-[#7D5D14]">
                            {isEn ? post.categoryEn : post.categoryBn}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{post.publishedAt}</span>
                          <span aria-hidden="true">·</span>
                          <span>{isEn ? post.readingTimeEn : post.readingTimeBn}</span>
                        </div>
                        <h2 className="heading-h3 text-[#0B1F3A]">
                          <Link to={localizedPath(`/blog/${post.slug}`)} className="hover:text-[#7D5D14] transition-colors">
                            {isEn ? post.titleEn : post.titleBn}
                          </Link>
                        </h2>
                        <p className="mt-3 text-sm text-[#4B5563] leading-[1.75] line-clamp-3">
                          {isEn ? post.excerptEn : post.excerptBn}
                        </p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-4 border-t border-[#0B1F3A]/8">
                      <Link
                        to={localizedPath(`/blog/${post.slug}`)}
                        className="text-sm font-semibold text-[#0B1F3A] group-hover:text-[#7D5D14] inline-flex items-center gap-2 transition-colors"
                      >
                        {t('সম্পূর্ণ গাইড পড়ুন', 'Read Full Guide')}
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
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
