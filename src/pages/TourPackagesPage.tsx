import { useId, useState } from 'react';
import { X, Scale, Check, Minus } from 'lucide-react';
import { tourPackagesData, type PackageCategory, type BudgetTier } from '../data/packages';
import { formatBDT, toBanglaDigits } from '../config/site';
import { SeoHead, buildBreadcrumbSchema, buildCollectionPageSchema } from '../lib/seo';
import { useLanguage } from '../context/LanguageContext';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PackageCard } from '../components/Cards';
import { CtaBanner } from '../components/CtaBanner';
import { HeroCtaRow } from '../components/HeroCtaRow';
import { EmptyState } from '../components/EmptyState';
import { StaggerGroup, StaggerItem } from '../components/MotionPrimitives';

export function TourPackagesPage() {
  const { isEn, locale, t } = useLanguage();
  const [category, setCategory] = useState<'All' | PackageCategory>('All');
  const [budget, setBudget] = useState<'All' | BudgetTier>('All');
  const [duration, setDuration] = useState<'All' | 'short' | 'long'>('All');
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const compareTitleId = useId();
  const compareDialogRef = useFocusTrap<HTMLDivElement>({
    active: compareOpen,
    onEscape: () => setCompareOpen(false),
  });

  const filtered = tourPackagesData.filter((pkg) => {
    if (category !== 'All' && pkg.category !== category) return false;
    if (budget !== 'All' && pkg.budgetTier !== budget) return false;
    if (duration === 'short' && pkg.durationDays > 5) return false;
    if (duration === 'long' && pkg.durationDays <= 5) return false;
    return true;
  });

  const toggleCompare = (slug: string) => {
    setCompareSlugs((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) return [...prev.slice(1), slug];
      return [...prev, slug];
    });
  };

  const comparedPackages = tourPackagesData.filter((p) => compareSlugs.includes(p.slug));

  return (
    <>
      <SeoHead
        title={t('ট্যুর ও ওমরাহ প্যাকেজ বাংলাদেশ | Visatrip Global', 'Tour & Umrah Packages Bangladesh | Visatrip Global')}
        description={t(
          'দুবাই, মালয়েশিয়া, থাইল্যান্ড, সিঙ্গাপুর, তুরস্ক, ওমরাহ ও দেশের ভেতরের ট্যুর প্যাকেজ ফিল্টার এবং পাশাপাশি তুলনা করুন — Visatrip Global।',
          'Filter and compare up to 3 international, Umrah, and domestic Bangladesh tour packages side by side at Visatrip Global.'
        )}
        canonicalPath="/tour-packages"
        locale={locale}
        schemas={[
          buildBreadcrumbSchema(
            [
              { name: t('হোম', 'Home'), path: '/' },
              { name: t('ট্যুর প্যাকেজ', 'Tour Packages'), path: '/tour-packages' },
            ],
            locale
          ),
          buildCollectionPageSchema({
            name: t('ট্যুর ও ওমরাহ প্যাকেজসমূহ', 'Tour & Umrah Packages'),
            description: t(
              'বাংলাদেশ থেকে আন্তর্জাতিক, ওমরাহ এবং অভ্যন্তরীণ ট্যুর প্যাকেজের সম্পূর্ণ তালিকা।',
              'Curated international, Umrah, and domestic Bangladesh tour packages.'
            ),
            path: '/tour-packages',
            locale,
            items: tourPackagesData.map((p) => ({
              name: isEn ? p.titleEn : p.titleBn,
              path: `/tour-packages/${p.slug}`,
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
              { label: t('ট্যুর প্যাকেজ', 'Tour Packages') },
            ]}
          />
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[#C9A24B]" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#C9A24B]">
              {t('ট্যুর ও ওমরাহ কালেকশন', 'Curated Journeys')}
            </p>
          </div>
          <h1 className="heading-h1 text-white max-w-3xl">
            {t('পরিকল্পিত ট্যুর ও ওমরাহ প্যাকেজসমূহ', 'Curated International, Umrah & Domestic Packages')}
          </h1>
          <p className="body-lead mt-6 text-white/85 max-w-2xl">
            {t(
              'ক্যাটাগরি, বাজেট বা দিনসংখ্যা অনুযায়ী ফিল্টার করুন এবং সর্বোচ্চ ৩টি প্যাকেজ পাশাপাশি তুলনা করুন।',
              'Filter by category, budget tier, or duration — and compare up to 3 packages side by side.'
            )}
          </p>
          <HeroCtaRow
            primaryLabelBn="কাস্টম প্যাকেজ কোট নিন"
            primaryLabelEn="Request Custom Quote"
            locationId="packages_hero"
          />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="sr-only">
            {t('ট্যুর প্যাকেজ ফিল্টার ও তালিকা', 'Filter and Compare Tour Packages')}
          </h2>
          {/* Filters Bar */}
          <div className="card-surface p-5 sm:p-6 mb-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <div>
              <span id="pkg-filter-category" className="block text-xs font-semibold text-[#525B68] uppercase tracking-wider mb-2">
                {t('ধরন (Category)', 'Category')}
              </span>
              <div
                role="group"
                aria-labelledby="pkg-filter-category"
                className="flex overflow-x-auto snap-carousel scrollbar-none gap-2 pb-1 sm:pb-0 sm:flex-wrap"
              >
                {(['All', 'International', 'Umrah', 'Domestic'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={category === cat}
                    onClick={() => setCategory(cat)}
                    className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 snap-start cursor-pointer transition-colors ${
                      category === cat
                        ? 'bg-[#0B1F3A] text-white'
                        : 'bg-[#FAF8F4] text-[#374151] border border-[#0B1F3A]/12 hover:border-[#C9A24B] hover:text-[#0B1F3A]'
                    }`}
                  >
                    {cat === 'All' ? t('সব', 'All') : cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span id="pkg-filter-budget" className="block text-xs font-semibold text-[#525B68] uppercase tracking-wider mb-2">
                {t('বাজেট মান (Budget Tier)', 'Budget Tier')}
              </span>
              <div
                role="group"
                aria-labelledby="pkg-filter-budget"
                className="flex overflow-x-auto snap-carousel scrollbar-none gap-2 pb-1 sm:pb-0 sm:flex-wrap"
              >
                {(['All', 'Economy', 'Standard', 'Premium'] as const).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    aria-pressed={budget === tier}
                    onClick={() => setBudget(tier)}
                    className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 snap-start cursor-pointer transition-colors ${
                      budget === tier
                        ? 'bg-[#0B1F3A] text-white'
                        : 'bg-[#FAF8F4] text-[#374151] border border-[#0B1F3A]/12 hover:border-[#C9A24B] hover:text-[#0B1F3A]'
                    }`}
                  >
                    {tier === 'All' ? t('সব বাজেট', 'All Budgets') : tier}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span id="pkg-filter-duration" className="block text-xs font-semibold text-[#525B68] uppercase tracking-wider mb-2">
                {t('সময়কাল (Duration)', 'Duration')}
              </span>
              <div
                role="group"
                aria-labelledby="pkg-filter-duration"
                className="flex overflow-x-auto snap-carousel scrollbar-none gap-2 pb-1 sm:pb-0 sm:flex-wrap"
              >
                {[
                  { id: 'All', label: t('যেকোনো সময়', 'Any Duration') },
                  { id: 'short', label: t('৪–৫ দিন', '4–5 Days') },
                  { id: 'long', label: t('৬+ দিন', '6+ Days') },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={duration === opt.id}
                    onClick={() => setDuration(opt.id as 'All' | 'short' | 'long')}
                    className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 snap-start cursor-pointer transition-colors ${
                      duration === opt.id
                        ? 'bg-[#0B1F3A] text-white'
                        : 'bg-[#FAF8F4] text-[#374151] border border-[#0B1F3A]/12 hover:border-[#C9A24B] hover:text-[#0B1F3A]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Compare Bar */}
          {comparedPackages.length > 0 && (
            <div className="mb-10 rounded-2xl bg-navy-hero text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_14px_36px_rgba(11,31,58,0.16)]">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-2 text-sm font-bold text-[#C9A24B]">
                  <Scale className="w-4 h-4" />
                  {t(`তুলনার জন্য নির্বাচিত (${toBanglaDigits(comparedPackages.length)}/৩):`, `Selected to Compare (${comparedPackages.length}/3):`)}
                </span>
                <span className="text-xs sm:text-sm text-white/85">
                  {comparedPackages.map((p) => (isEn ? p.titleEn : p.titleBn)).join(' · ')}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setCompareOpen(true)}
                  className="btn-primary btn-sm"
                >
                  {t('পাশাপাশি তুলনা দেখুন', 'Compare Side by Side')}
                </button>
                <button
                  type="button"
                  onClick={() => setCompareSlugs([])}
                  className="btn-secondary-light btn-sm"
                >
                  {t('মুছুন', 'Clear')}
                </button>
              </div>
            </div>
          )}

          {filtered.length === 0 ? (
            <EmptyState
              icon="packages"
              titleBn="এই ফিল্টারে কোনো প্যাকেজ মেলেনি"
              titleEn="No Packages Match These Filters"
              descriptionBn="আপনার নির্বাচিত ক্যাটাগরি, বাজেট ও সময়কাল অনুযায়ী বর্তমানে কোনো রেডি প্যাকেজ নেই। তবে আমরা আপনার বাজেট অনুযায়ী কাস্টম ট্যুর বা ওমরাহ প্যাকেজ তৈরি করে দিতে পারি।"
              descriptionEn="No preset package matches this combination of category, budget, and duration. We can tailor a custom itinerary around your exact dates and budget."
              onReset={() => {
                setCategory('All');
                setBudget('All');
                setDuration('All');
              }}
              resetLabelBn="সব ফিল্টার রিসেট করুন"
              resetLabelEn="Reset All Filters"
              whatsappLabelBn="কাস্টম প্যাকেজের জন্য WhatsApp করুন"
              whatsappLabelEn="Request Custom Package on WhatsApp"
              whatsappMessageBn="আসসালামু আলাইকুম, আমার বাজেট ও তারিখ অনুযায়ী একটি কাস্টম ট্যুর/ওমরাহ প্যাকেজ জানতে চাই।"
              locationId="packages_empty_state"
            />
          ) : (
            <StaggerGroup
              key={`${category}-${budget}-${duration}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((pkg) => (
                <StaggerItem key={pkg.slug} className="h-full">
                  <PackageCard
                    pkg={pkg}
                    isCompared={compareSlugs.includes(pkg.slug)}
                    onToggleCompare={toggleCompare}
                  />
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>

      {/* Side-by-Side Comparison Modal (Focus Trapped + Escape Close) */}
      {compareOpen && comparedPackages.length > 0 && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={compareTitleId}
          onClick={() => setCompareOpen(false)}
          className="fixed inset-0 z-50 bg-[#071529]/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            ref={compareDialogRef}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90dvh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl my-8 border border-[#C9A24B]/30 focus:outline-none"
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#0B1F3A]/10">
              <h2 id={compareTitleId} className="heading-h3 text-[#0B1F3A]">
                {t('প্যাকেজ তুলনা (পাশাপাশি)', 'Side-by-Side Package Comparison')}
              </h2>
              <button
                type="button"
                onClick={() => setCompareOpen(false)}
                aria-label={t('প্যাকেজ তুলনা বন্ধ করুন', 'Close comparison')}
                className="w-11 h-11 rounded-xl hover:bg-[#FAF8F4] flex items-center justify-center text-[#525B68] hover:text-[#0B1F3A] cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[540px]">
                <thead>
                  <tr className="border-b border-[#0B1F3A]/10">
                    <th scope="col" className="py-3 pr-4 text-xs text-[#525B68] w-36">{t('বৈশিষ্ট্য', 'Feature')}</th>
                    {comparedPackages.map((p) => (
                      <th scope="col" key={p.slug} className="py-3 px-4 font-bold text-[#0B1F3A]">
                        {isEn ? p.titleEn : p.titleBn}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0B1F3A]/8 leading-[1.7]">
                  <tr>
                    <th scope="row" className="py-3 pr-4 text-xs font-semibold text-[#525B68]">{t('সময়কাল', 'Duration')}</th>
                    {comparedPackages.map((p) => (
                      <td key={p.slug} className="py-3 px-4">{isEn ? p.durationEn : p.durationBn}</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row" className="py-3 pr-4 text-xs font-semibold text-[#525B68]">{t('হোটেল মান', 'Hotel Tier')}</th>
                    {comparedPackages.map((p) => (
                      <td key={p.slug} className="py-3 px-4">{isEn ? p.hotelTierEn : p.hotelTierBn}</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row" className="py-3 pr-4 text-xs font-semibold text-[#525B68]">{t('খাবার', 'Meals')}</th>
                    {comparedPackages.map((p) => (
                      <td key={p.slug} className="py-3 px-4">{isEn ? p.mealsEn : p.mealsBn}</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row" className="py-3 pr-4 text-xs font-semibold text-[#525B68]">{t('ভিসা অন্তর্ভুক্ত?', 'Visa Included?')}</th>
                    {comparedPackages.map((p) => (
                      <td key={p.slug} className="py-3 px-4">
                        {p.visaIncluded ? (
                          <span className="inline-flex items-center gap-1.5 text-[#0F5132] font-semibold">
                            <Check className="w-4 h-4" aria-hidden="true" /> {t('হ্যাঁ', 'Yes')}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[#525B68]">
                            <Minus className="w-4 h-4" aria-hidden="true" /> {t('আলাদাভাবে যুক্ত করা যাবে', 'Optional Add-on')}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row" className="py-3 pr-4 text-xs font-semibold text-[#525B68]">{t('এয়ার টিকেট?', 'Flights Included?')}</th>
                    {comparedPackages.map((p) => (
                      <td key={p.slug} className="py-3 px-4">
                        {p.flightIncluded ? (
                          <span className="inline-flex items-center gap-1.5 text-[#0F5132] font-semibold">
                            <Check className="w-4 h-4" aria-hidden="true" /> {t('হ্যাঁ', 'Yes')}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[#525B68]">
                            <Minus className="w-4 h-4" aria-hidden="true" /> {t('আলাদাভাবে যুক্ত করা যাবে', 'Optional Add-on')}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row" className="py-3 pr-4 text-xs font-semibold text-[#525B68]">{t('মূল্য', 'Package Rate')}</th>
                    {comparedPackages.map((p) => (
                      <td key={p.slug} className="py-3 px-4 font-bold text-[#0B1F3A] tabular-nums">
                        {formatBDT(p.priceBDT, locale) || t('কনসাল্টেশন নিন', 'Request Quote')}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <CtaBanner defaultService="Tour Package" />
    </>
  );
}
