import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { homepageFaqs } from '../data/siteContent';
import { servicesData } from '../data/services';
import { SeoHead, buildBreadcrumbSchema, buildFaqSchema } from '../lib/seo';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HeroCtaRow } from '../components/HeroCtaRow';
import { FaqAccordion } from '../components/FaqAccordion';
import { EmptyState } from '../components/EmptyState';
import { CtaBanner } from '../components/CtaBanner';

export function FaqPage() {
  const { isEn, locale, t } = useLanguage();
  const [group, setGroup] = useState('general');
  const [query, setQuery] = useState('');

  const allGroups = useMemo(
    () => [
      {
        id: 'general',
        label: t('সাধারণ প্রশ্ন', 'General'),
        items: homepageFaqs.map((f) => ({
          question: isEn ? f.questionEn : f.questionBn,
          answer: isEn ? f.answerEn : f.answerBn,
        })),
      },
      ...servicesData.map((srv) => ({
        id: srv.slug,
        label: isEn ? srv.titleEn : srv.titleBn,
        items: srv.faqs.map((f) => ({
          question: isEn ? f.questionEn : f.questionBn,
          answer: isEn ? f.answerEn : f.answerBn,
        })),
      })),
    ],
    [isEn, t]
  );

  const visibleItems = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed) {
      return allGroups
        .flatMap((g) => g.items)
        .filter(
          (item) =>
            item.question.toLowerCase().includes(trimmed) ||
            item.answer.toLowerCase().includes(trimmed)
        );
    }
    return allGroups.find((g) => g.id === group)?.items || [];
  }, [allGroups, group, query]);

  return (
    <>
      <SeoHead
        title={t('সচরাচর জিজ্ঞাসা (FAQ) | Visatrip Global', 'Frequently Asked Questions | Visatrip Global')}
        description={t(
          'Work Permit, Tourist Visa, Student Consultancy, হজ্জ ও ওমরাহ, India Medical Visa এবং Air Ticketing সংক্রান্ত সকল প্রশ্নের সৎ উত্তর।',
          'Honest answers to common questions about Work Permits, Tourist Visas, Student Visas, Hajj & Umrah, India Visa, and Air Ticketing.'
        )}
        canonicalPath="/faq"
        locale={locale}
        schemas={[
          buildBreadcrumbSchema(
            [
              { name: t('হোম', 'Home'), path: '/' },
              { name: t('সাধারণ প্রশ্ন (FAQ)', 'FAQ'), path: '/faq' },
            ],
            locale
          ),
          buildFaqSchema(visibleItems.slice(0, 15)),
        ]}
      />

      <section className="bg-navy-hero text-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Breadcrumbs
            light
            items={[
              { label: t('হোম', 'Home'), to: '/' },
              { label: t('সাধারণ প্রশ্ন (FAQ)', 'FAQ') },
            ]}
          />
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[#C9A24B]" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#C9A24B]">
              {t('সৎ ও স্পষ্ট উত্তর', 'Help & Guidance Center')}
            </p>
          </div>
          <h1 className="heading-h1 text-white max-w-3xl">
            {t('সচরাচর জিজ্ঞাসা ও সৎ উত্তর (FAQ)', 'Frequently Asked Questions')}
          </h1>
          <p className="body-lead mt-6 text-white/85 max-w-2xl">
            {t(
              'ভিসা প্রক্রিয়া, ফি, পেমেন্ট ও ওমরাহ সংক্রান্ত গুরুত্বপূর্ণ প্রশ্নগুলো ক্যাটাগরি অনুযায়ী অথবা সার্চ করে খুঁজুন।',
              'Browse questions by service category or search any keyword below.'
            )}
          </p>
          <HeroCtaRow locationId="faq_hero" />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="relative">
            <label htmlFor="faq-search" className="sr-only">
              {t('সাধারণ প্রশ্ন খুঁজুন', 'Search frequently asked questions')}
            </label>
            <Search className="w-4 h-4 text-[#525B68] absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              id="faq-search"
              type="search"
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('প্রশ্ন খুঁজুন (যেমন: Bank Solvency, Umrah, IVAC, BMET)...', 'Search FAQs (e.g., Bank Solvency, Umrah, IVAC)...')}
              className="w-full min-h-[52px] pl-12 pr-4 rounded-xl bg-white border border-[#0B1F3A]/20 text-base sm:text-sm placeholder:text-[#596270] focus:border-[#0B1F3A] shadow-[0_2px_12px_rgba(11,31,58,0.03)] transition-colors"
            />
          </div>

          {!query && (
            <div
              role="tablist"
              aria-label={t('FAQ ক্যাটাগরি', 'FAQ categories')}
              className="flex overflow-x-auto snap-carousel scrollbar-none gap-2 pb-1 sm:pb-0 sm:flex-wrap"
            >
              {allGroups.map((g, idx) => {
                const isSelected = group === g.id;
                return (
                  <button
                    key={g.id}
                    id={`faq-tab-${g.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls="faq-results-panel"
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setGroup(g.id)}
                    onKeyDown={(e) => {
                      let nextIdx: number | null = null;
                      if (e.key === 'ArrowRight') nextIdx = (idx + 1) % allGroups.length;
                      else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + allGroups.length) % allGroups.length;
                      else if (e.key === 'Home') nextIdx = 0;
                      else if (e.key === 'End') nextIdx = allGroups.length - 1;
                      if (nextIdx !== null) {
                        e.preventDefault();
                        const nextGroup = allGroups[nextIdx];
                        setGroup(nextGroup.id);
                        document.getElementById(`faq-tab-${nextGroup.id}`)?.focus();
                      }
                    }}
                    className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 snap-start cursor-pointer transition-colors duration-200 ${
                      isSelected
                        ? 'bg-[#0B1F3A] text-white shadow-sm'
                        : 'bg-white border border-[#0B1F3A]/15 text-[#374151] hover:border-[#C9A24B] hover:text-[#0B1F3A]'
                    }`}
                  >
                    {g.label}
                  </button>
                );
              })}
            </div>
          )}

          <div
            id="faq-results-panel"
            role={query ? 'region' : 'tabpanel'}
            aria-labelledby={query ? undefined : `faq-tab-${group}`}
            aria-live="polite"
          >
            {visibleItems.length > 0 ? (
              <FaqAccordion items={visibleItems} />
            ) : (
              <EmptyState
                icon="search"
                titleBn="এই কীওয়ার্ডে কোনো প্রশ্ন পাওয়া যায়নি"
                titleEn="No Matching Questions Found"
                descriptionBn="অন্য কোনো শব্দ দিয়ে খুঁজে দেখুন, অথবা আপনার নির্দিষ্ট প্রশ্ন সরাসরি আমাদের কনসালটেন্টকে WhatsApp-এ জিজ্ঞাসা করুন।"
                descriptionEn="Try a different keyword or ask your specific question directly on WhatsApp."
                onReset={() => setQuery('')}
                resetLabelBn="সার্চ মুছুন"
                resetLabelEn="Clear Search"
                whatsappLabelBn="WhatsApp-এ প্রশ্ন করুন"
                whatsappLabelEn="Ask on WhatsApp"
                whatsappMessageBn={`আসসালামু আলাইকুম, আমার একটি প্রশ্ন আছে: ${query.trim()}`}
                locationId="faq_empty_state"
              />
            )}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
