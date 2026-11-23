import { lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { siteConfig, toBanglaDigits } from '../config/site';
import {
  serviceSummaries,
  destinationSummaries,
  packageSummaries,
} from '../data/catalogSummary';
import {
  whyChooseUsPoints,
  howItWorksSteps,
  homepageFaqs,
} from '../data/siteContent';
import { SeoHead, buildFaqSchema, buildLocalBusinessSchema } from '../lib/seo';
import { getPageLeadContext } from '../lib/leadContext';
import { trackAnalyticsEvent } from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';
import { CinematicHero } from '../components/CinematicHero';
import { SectionHeader } from '../components/SectionHeader';
import { GoldDivider } from '../components/GoldDivider';
import { StatCounter } from '../components/StatCounter';
import { ServiceCard, DestinationCard, PackageCard } from '../components/Cards';
import { SectionCtaStrip } from '../components/SectionCtaStrip';
import { LicenseStrip, HonestyPledgeBlock } from '../components/TrustSignals';
import { FadeUp, StaggerGroup, StaggerItem } from '../components/MotionPrimitives';
import { MobileSnapCarousel } from '../components/MobileSnapCarousel';
import { HomeSectionSkeleton } from '../components/Skeletons';

// Dynamically import below-the-fold sections (8–14) & on-demand ChecklistModal
const HomeBelowFold = lazy(() =>
  import('../components/HomeBelowFold').then((mod) => ({ default: mod.HomeBelowFold }))
);
const CtaBanner = lazy(() =>
  import('../components/CtaBanner').then((mod) => ({ default: mod.CtaBanner }))
);
const ChecklistModal = lazy(() =>
  import('../components/ChecklistModal').then((mod) => ({ default: mod.ChecklistModal }))
);

export function HomePage() {
  const { isEn, locale, localizedPath, t } = useLanguage();
  const [checklistOpen, setChecklistOpen] = useState(false);
  const pageCtx = getPageLeadContext('/', locale);

  const visibleStats = siteConfig.stats.filter((s) => s.value !== null);
  const featuredDestinations = destinationSummaries.filter((d) => d.featuredOnHome);
  const featuredPackages = packageSummaries.filter((p) => p.featuredOnHome);

  const faqEntries = homepageFaqs.map((f) => ({
    question: isEn ? f.questionEn : f.questionBn,
    answer: isEn ? f.answerEn : f.answerBn,
  }));

  return (
    <>
      <SeoHead
        title={t(siteConfig.seo.defaultTitleBn, siteConfig.seo.defaultTitleEn)}
        description={t(siteConfig.seo.defaultDescriptionBn, siteConfig.seo.defaultDescriptionEn)}
        canonicalPath="/"
        locale={locale}
        schemas={[buildLocalBusinessSchema(), buildFaqSchema(faqEntries)]}
      />

      {/* 1. CINEMATIC HERO SECTION */}
      <CinematicHero />

      {/* 2. TRUST STRIP (Animated Counters — strictly hides empty/null numbers) */}
      {visibleStats.length > 0 && (
        <section className="bg-white border-b border-[#0B1F3A]/8">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4">
            <div
              className={`grid grid-cols-2 ${
                visibleStats.length >= 4
                  ? 'lg:grid-cols-4'
                  : visibleStats.length === 3
                  ? 'lg:grid-cols-3'
                  : 'lg:grid-cols-2 max-w-2xl mx-auto'
              } divide-x divide-[#0B1F3A]/8`}
            >
              {visibleStats.map((stat) => (
                <StatCounter
                  key={stat.id}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={isEn ? stat.labelEn : stat.labelBn}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2B. CONSISTENT LICENSE & VERIFICATION STRIP (strictly config-driven) */}
      <section className="bg-white border-b border-[#0B1F3A]/8 py-4">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <LicenseStrip variant="light" />
        </div>
      </section>

      {/* 3. OUR SERVICES (Off-white #FAF8F4) */}
      <section className="py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <SectionHeader
              kicker={t('আমাদের সেবাসমূহ', 'Our Core Services')}
              title={t('বিদেশ যাত্রার প্রতিটি ধাপে, আমরা আছি', 'Every Step of Your Journey, Under One Roof')}
              subtitle={t(
                'ভিসা আবেদন, হজ্জ-ওমরাহ, উচ্চশিক্ষা কিংবা ফ্লাইট-হোটেল — প্রতিটি সেবায় সঠিক গাইডলাইন ও স্বচ্ছ প্রক্রিয়া।',
                'From visa file preparation and Hajj & Umrah to university admissions, flights, and tours.'
              )}
            />
            <Link
              to={localizedPath('/services')}
              className="btn-secondary btn-sm shrink-0 self-start sm:self-end"
            >
              {t('সকল সার্ভিস দেখুন', 'All Services')}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </FadeUp>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceSummaries.map((srv, idx) => (
              <StaggerItem key={srv.slug} className="h-full">
                <ServiceCard service={srv} index={idx} />
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="mt-10">
            <SectionCtaStrip
              variant="white"
              locationId="home_after_services"
              headingBn="আপনার জন্য কোন ভিসা বা সার্ভিসটি সঠিক বুঝতে পারছেন না?"
              headingEn="Not Sure Which Visa or Service Fits Your Plan?"
              subtextBn="১ মিনিটে আমাদের কনসালটেন্টের সাথে বিনা খরচে কথা বলে সঠিক দিকনির্দেশনা নিন।"
              subtextEn="Speak with a consultant at zero cost to find the right pathway before applying."
            />
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US (White) */}
      <section className="cv-auto py-16 sm:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <FadeUp className="lg:col-span-5 space-y-8">
              <SectionHeader
                kicker={t('কেন Visatrip Global?', 'Why Choose Visatrip Global')}
                title={t('বিশ্বাস, সততা ও স্বচ্ছতাই আমাদের মূল শক্তি', 'Built on Honesty, Clarity & Accountability')}
                subtitle={t(
                  'প্রথমবার বিদেশ যাত্রা করা মানুষ যেন বিভ্রান্ত বা প্রতারিত না হন — সেই দায়িত্ববোধ থেকেই আমাদের প্রতিটি কনসাল্টেশন।',
                  'We designed our consultancy so first-time travelers and families never feel confused or misled.'
                )}
              />

              <blockquote className="rounded-2xl bg-[#FAF8F4] border border-[#C9A24B]/60 p-6 sm:p-8 shadow-[0_6px_24px_rgba(11,31,58,0.04)]">
                <p className="text-base sm:text-[17px] font-semibold text-[#0B1F3A] leading-[1.75]">
                  “{t(
                    'আমরা ভিসা অনুমোদনের মিথ্যা প্রতিশ্রুতি দিই না। আমরা সঠিক দিকনির্দেশনা, সততা এবং আন্তরিক প্রচেষ্টার সাথে আপনার পাশে থাকি।',
                    'We never make false promises of assured visa approval. We deliver honest guidance, thorough documentation, and our best effort.'
                  )}”
                </p>
                <footer className="mt-4 pt-4 border-t border-[#C9A24B]/25 text-xs font-semibold text-[#7D5D14] tracking-wide">
                  Visatrip Global · {t('প্রতিটি গন্তব্যে এক বিশ্বস্ত সহযোগী', 'Your Trusted Companion')}
                </footer>
              </blockquote>
            </FadeUp>

            <StaggerGroup className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyChooseUsPoints.map((pt) => (
                <StaggerItem
                  key={pt.number}
                  className="rounded-2xl bg-[#FAF8F4] p-6 border border-[#0B1F3A]/8 transition-colors hover:border-[#C9A24B]/60"
                >
                  <span className="font-editorial text-lg font-bold text-[#7D5D14] tabular-nums">
                    {isEn ? pt.number : toBanglaDigits(pt.number)}
                  </span>
                  <h3 className="heading-h3 mt-2 text-[#0B1F3A]">
                    {isEn ? pt.titleEn : pt.titleBn}
                  </h3>
                  <p className="mt-2 text-sm text-[#4B5563] leading-[1.75]">
                    {isEn ? pt.descEn : pt.descBn}
                  </p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          {/* "সততার অঙ্গীকার" Promise Block */}
          <FadeUp className="mt-12">
            <HonestyPledgeBlock variant="light" />
          </FadeUp>
        </div>
      </section>

      <GoldDivider />

      {/* 5. HOW IT WORKS (Off-white #FAF8F4) */}
      <section className="cv-auto py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <FadeUp>
            <SectionHeader
              align="center"
              kicker={t('কাজের প্রক্রিয়া', 'How It Works')}
              title={t('মাত্র ৪টি সহজ ধাপে আপনার ফাইল প্রসেসিং', '4 Clear Steps from Consultation to Departure')}
              subtitle={t(
                'কোনো গোপন শর্ত বা বিভ্রান্তি নেই — প্রতিটি ধাপ আপনি স্পষ্টভাবে জানতে পারবেন।',
                'No guesswork or hidden conditions — every milestone is explained clearly from day one.'
              )}
            />
          </FadeUp>

          <StaggerGroup className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((st) => (
              <StaggerItem
                key={st.step}
                className="card-surface p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#0B1F3A] text-[#C9A24B] font-editorial font-bold text-base flex items-center justify-center tabular-nums">
                    {isEn ? st.step : toBanglaDigits(st.step)}
                  </div>
                  <h3 className="heading-h3 mt-6 text-[#0B1F3A]">
                    {isEn ? st.titleEn : st.titleBn}
                  </h3>
                  <p className="mt-2 text-sm text-[#4B5563] leading-[1.75]">
                    {isEn ? st.descEn : st.descBn}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="mt-12 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-4">
              <a
                href="#consultation"
                onClick={() =>
                  trackAnalyticsEvent('cta_click', {
                    cta_label: 'Start with Free Consultation',
                    cta_location: 'home_how_it_works',
                  })
                }
                className="btn-primary"
              >
                {t('ফ্রি কনসাল্টেশন দিয়ে শুরু করুন', 'Start with Free Consultation')}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <Link
                to={localizedPath('/visa-checker')}
                onClick={() =>
                  trackAnalyticsEvent('cta_click', {
                    cta_label: 'Try Visa Requirement Checker',
                    cta_location: 'home_how_it_works',
                  })
                }
                className="btn-secondary"
              >
                {t('Visa Requirement Checker দেখুন', 'Try Visa Requirement Checker')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. POPULAR DESTINATIONS (White) */}
      <section className="cv-auto py-16 sm:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <SectionHeader
              kicker={t('জনপ্রিয় ডেস্টিনেশন', 'Popular Destinations')}
              title={t('বাংলাদেশি যাত্রীদের পছন্দের গন্তব্যসমূহ', 'Top Travel & Visa Destinations from Bangladesh')}
              subtitle={t(
                'ভিসা ডকুমেন্ট, ভ্রমণের সেরা সময় এবং প্যাকেজ তথ্য জানতে আপনার পছন্দের দেশ বেছে নিন।',
                'Select a country to inspect visa documents, best travel seasons, and tour options.'
              )}
            />
            <Link
              to={localizedPath('/destinations')}
              className="btn-secondary btn-sm shrink-0 self-start sm:self-end"
            >
              {t('সকল ডেস্টিনেশন দেখুন', 'View All Destinations')}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </FadeUp>

          <MobileSnapCarousel
            ariaLabel={t('জনপ্রিয় ডেস্টিনেশনসমূহ', 'Popular Destinations')}
            desktopGridClass="sm:grid-cols-2 lg:grid-cols-4 sm:gap-6"
            mobileCardClass="w-[82vw] max-w-[320px]"
            items={featuredDestinations.map((dest) => (
              <DestinationCard key={dest.slug} destination={dest} />
            ))}
          />
        </div>
      </section>

      <GoldDivider />

      {/* 7. FEATURED TOUR PACKAGES (Off-white #FAF8F4) */}
      <section className="cv-auto py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <SectionHeader
              kicker={t('ট্যুর ও ওমরাহ প্যাকেজ', 'Featured Packages')}
              title={t('জনপ্রিয় ট্যুর ও ওমরাহ প্যাকেজসমূহ', 'Curated Tour & Umrah Packages')}
              subtitle={t(
                'প্যাকেজে কী কী থাকছে তার স্পষ্ট বিবরণ ও দিনভিত্তিক ভ্রমণ সূচিসহ পরিবার, হানিমুন ও গ্রুপ প্যাকেজ।',
                'Transparent day-by-day itineraries with verified hotels and clear inclusions.'
              )}
            />
            <Link
              to={localizedPath('/tour-packages')}
              className="btn-secondary btn-sm shrink-0 self-start sm:self-end"
            >
              {t('সকল প্যাকেজ ও তুলনা দেখুন', 'Compare All Packages')}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </FadeUp>

          <MobileSnapCarousel
            ariaLabel={t('জনপ্রিয় ট্যুর ও ওমরাহ প্যাকেজসমূহ', 'Featured Tour & Umrah Packages')}
            desktopGridClass="sm:grid-cols-2 lg:grid-cols-4 sm:gap-6"
            mobileCardClass="w-[84vw] max-w-[330px]"
            items={featuredPackages.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          />
        </div>
      </section>

      {/* 8–13. BELOW-THE-FOLD SECTIONS (Dynamically Imported) */}
      <Suspense fallback={<HomeSectionSkeleton />}>
        <HomeBelowFold onOpenChecklist={() => setChecklistOpen(true)} />
      </Suspense>

      {/* 14. FINAL CTA BANNER (Dynamically Imported) */}
      <Suspense fallback={<div id="consultation" className="min-h-[420px] bg-navy-hero" />}>
        <CtaBanner />
      </Suspense>

      {checklistOpen && (
        <Suspense fallback={null}>
          <ChecklistModal
            open={checklistOpen}
            onClose={() => setChecklistOpen(false)}
            title={t(pageCtx.leadMagnet.titleBn, pageCtx.leadMagnet.titleEn)}
            serviceName={pageCtx.leadMagnet.serviceName}
            documents={pageCtx.leadMagnet.documentsBn}
            documentsEn={pageCtx.leadMagnet.documentsEn}
            pdfTitleEn={pageCtx.leadMagnet.pdfTitleEn}
            trigger="inline"
            checklistId={pageCtx.leadMagnet.id}
          />
        </Suspense>
      )}
    </>
  );
}
