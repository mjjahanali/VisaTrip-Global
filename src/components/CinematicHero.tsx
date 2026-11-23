import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AnimatePresence,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import {
  ArrowRight,
  Check,
  MapPin,
  MessageCircle,
  Pause,
  Play,
  Search,
} from 'lucide-react';
import { siteConfig } from '../config/site';
import { heroSlides } from '../config/images';
import { serviceSummaries, destinationSummaries } from '../data/catalogSummary';
import { useLanguage } from '../context/LanguageContext';
import { getPageLeadContext } from '../lib/leadContext';
import { trackAnalyticsEvent } from '../lib/analytics';
import { SafeImage } from './SafeImage';
import { MOTION_EASE } from './MotionPrimitives';

const HeroVideoLayer = lazy(() =>
  import('./HeroVideoLayer').then((mod) => ({ default: mod.HeroVideoLayer }))
);

interface NetworkInformationLike extends EventTarget {
  saveData?: boolean;
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g' | string;
  downlink?: number;
}

interface ConnectionQuality {
  saveData: boolean;
  isSlowConnection: boolean;
  isDesktopFinePointer: boolean;
  isTabVisible: boolean;
}

function useHeroEnvironment(): ConnectionQuality {
  const [env, setEnv] = useState<ConnectionQuality>({
    saveData: false,
    isSlowConnection: false,
    isDesktopFinePointer: false,
    isTabVisible: true,
  });

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: NetworkInformationLike;
      mozConnection?: NetworkInformationLike;
      webkitConnection?: NetworkInformationLike;
    };
    const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
    const desktopMq = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');

    const readEnv = () => {
      const saveData = Boolean(conn?.saveData);
      const effectiveType = conn?.effectiveType || '4g';
      const downlink = typeof conn?.downlink === 'number' ? conn.downlink : 10;
      const isSlowConnection =
        saveData ||
        effectiveType === 'slow-2g' ||
        effectiveType === '2g' ||
        effectiveType === '3g' ||
        downlink < 2.2;

      setEnv({
        saveData,
        isSlowConnection,
        isDesktopFinePointer: desktopMq.matches,
        isTabVisible: document.visibilityState !== 'hidden',
      });
    };

    readEnv();

    const handleVisibility = () => readEnv();
    document.addEventListener('visibilitychange', handleVisibility);
    desktopMq.addEventListener?.('change', readEnv);
    conn?.addEventListener?.('change', readEnv);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      desktopMq.removeEventListener?.('change', readEnv);
      conn?.removeEventListener?.('change', readEnv);
    };
  }, []);

  return env;
}

export function CinematicHero() {
  const { isEn, locale, localizedPath, t } = useLanguage();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const env = useHeroEnvironment();

  const heroRef = useRef<HTMLElement | null>(null);
  const [selectedService, setSelectedService] = useState('tourist-visa');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  // Desktop-only GPU parallax (strictly 0px transform on mobile/tablet & reduced motion)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const enableDesktopParallax = env.isDesktopFinePointer && !prefersReducedMotion;

  // Optional 6-second muted looping video — automatically disabled on slow connections, Save-Data, mobile (<1024 desktop fine pointer), or reduced motion
  const videoCfg = siteConfig.hero.video;
  const shouldRenderVideo =
    videoCfg.enabled &&
    !videoFailed &&
    Boolean(videoCfg.mp4Src || videoCfg.webmSrc) &&
    env.isDesktopFinePointer &&
    !env.saveData &&
    !env.isSlowConnection &&
    !prefersReducedMotion;

  // Optional 5-second destination slideshow — automatically disabled on Save-Data / slow network or reduced motion unless manually navigated
  const slideshowEnabled = siteConfig.hero.enableSlideshow && !shouldRenderVideo;
  const shouldAutoAdvance =
    slideshowEnabled &&
    !isPaused &&
    !prefersReducedMotion &&
    !env.saveData &&
    !env.isSlowConnection &&
    env.isTabVisible;

  useEffect(() => {
    if (!shouldAutoAdvance || heroSlides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, siteConfig.hero.slideIntervalMs || 5000);
    return () => window.clearInterval(timer);
  }, [shouldAutoAdvance]);

  const currentSlide = heroSlides[activeSlide] || heroSlides[0];

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    trackAnalyticsEvent('cta_click', {
      cta_label: 'Hero Quick Search',
      cta_location: 'hero_quick_search',
      service: selectedService || 'general',
      country: selectedCountry || undefined,
    });
    if (selectedCountry && selectedService === 'tourist-visa') {
      navigate(localizedPath(`/destinations/${selectedCountry}`));
      return;
    }
    if (selectedService) {
      navigate(localizedPath(`/services/${selectedService}`));
      return;
    }
    if (selectedCountry) {
      navigate(localizedPath(`/destinations/${selectedCountry}`));
    }
  };

  const heroWaCtx = getPageLeadContext('/', locale);

  return (
    <section
      ref={heroRef}
      className="relative bg-navy-hero text-white overflow-hidden min-h-[600px] sm:min-h-[640px] lg:min-h-[700px] flex items-center"
    >
      {/* Background Media Layer (Desktop-only GPU Parallax; static on mobile/tablet) */}
      <m.div
        style={enableDesktopParallax ? { y: parallaxY } : undefined}
        className={`absolute inset-x-0 will-change-transform ${
          enableDesktopParallax ? '-top-[8%] -bottom-[14%]' : 'inset-y-0'
        }`}
        aria-hidden="true"
      >
        {shouldRenderVideo ? (
          <div className="relative w-full h-full bg-[#071529]">
            <SafeImage
              imageKey={videoCfg.posterImageKey}
              preset="hero"
              priority
              wrapperClassName="absolute inset-0"
              className="w-full h-full object-cover"
            />
            <Suspense fallback={null}>
              <HeroVideoLayer
                posterImageKey={videoCfg.posterImageKey}
                webmSrc={videoCfg.webmSrc}
                mp4Src={videoCfg.mp4Src}
                onError={() => setVideoFailed(true)}
              />
            </Suspense>
          </div>
        ) : (
          <div className="relative w-full h-full bg-[#071529]">
            {/* Single LCP hero image on initial paint; extra slides mount only when activeSlide > 0 */}
            <SafeImage
              imageKey={heroSlides[0].imageKey}
              preset="hero"
              priority
              wrapperClassName="absolute inset-0"
              className="w-full h-full object-cover"
            />

            {/* 5-second cross-fade destination slideshow (overlay slides only when activeSlide > 0) */}
            <AnimatePresence initial={false}>
              {activeSlide > 0 && (
                <m.div
                  key={currentSlide.imageKey}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.38,
                    ease: MOTION_EASE,
                  }}
                  className="absolute inset-0"
                >
                  <SafeImage
                    imageKey={currentSlide.imageKey}
                    preset="hero"
                    disableBlurPlaceholder
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover"
                  />
                </m.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </m.div>

      {/* Measured Multi-Layer Deep Navy Contrast Scrim (>= 4.5:1 WCAG AA legibility across all slides) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#061326]/82 via-[#0B1F3A]/72 to-[#061326]/92 lg:bg-gradient-to-r lg:from-[#061326]/95 lg:via-[#0B1F3A]/80 lg:to-[#0B1F3A]/28"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061326]/85 via-transparent to-[#061326]/35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(62% 55% at 80% 30%, rgba(201, 162, 75, 0.12) 0%, rgba(11, 31, 58, 0) 70%)',
        }}
      />

      {/* Foreground Hero Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 pt-16 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-24">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          {/* Immediately visible on frame 1 (initial={false}) so H1 never blocks LCP */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-[1px] w-8 bg-[#C9A24B]" aria-hidden="true" />
              <p className="text-xs sm:text-[13px] font-semibold tracking-[0.08em] uppercase text-[#C9A24B]">
                {t(
                  'বিশ্বস্ত ট্রাভেল ও ভিসা কনসালটেন্সি · চাঁপাইনবাবগঞ্জ',
                  'TRUSTED TRAVEL & VISA AGENCY · CHAPAI NAWABGANJ'
                )}
              </p>
            </div>

            <h1 className="heading-h1 text-white [text-wrap:balance]">
              {t(
                'আপনার বিদেশ যাত্রা শুরু হোক বিশ্বাসের সাথে',
                'Begin Your International Journey with Honesty & Trust'
              )}
            </h1>

            <p className="body-lead mt-6 text-white/90 max-w-2xl">
              {t(
                'Work Permit, Visa, Hajj & Umrah, Air Ticket, Hotel, Tour — সবকিছু এক ছাদের নিচে, এক বিশ্বস্ত সহযোগীর হাতে।',
                'Work Permit, Tourist & Student Visa, Hajj & Umrah, India Medical Visa, Air Tickets, Hotels & Tours — all under one dependable roof.'
              )}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#consultation"
                onClick={() =>
                  trackAnalyticsEvent('cta_click', {
                    cta_label: 'Get Free Consultation',
                    cta_location: 'home_hero',
                  })
                }
                className="btn-primary"
              >
                {t('ফ্রি কনসাল্টেশন নিন', 'Get Free Consultation')}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={heroWaCtx.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackAnalyticsEvent('whatsapp_click', {
                    location: 'home_hero',
                    prefilled_topic: heroWaCtx.serviceLabel,
                  })
                }
                className="btn-secondary-light"
              >
                <MessageCircle className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />
                {t('WhatsApp-এ মেসেজ করুন', 'Message on WhatsApp')}
              </a>
            </div>
          </div>

          {/* Editorial Destination Caption & Slideshow Switcher */}
          {slideshowEnabled && heroSlides.length > 1 && (
            <div className="lg:text-right shrink-0 lg:max-w-[280px]">
              <div className="inline-flex lg:justify-end items-center gap-1.5 text-xs font-semibold text-[#C9A24B]">
                <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{isEn ? currentSlide.locationEn : currentSlide.locationBn}</span>
              </div>
              <p className="mt-1 text-xs text-white/75 leading-relaxed">
                {isEn ? currentSlide.captionEn : currentSlide.captionBn}
              </p>

              <div className="mt-3 flex items-center lg:justify-end gap-2">
                <div
                  role="tablist"
                  aria-label={t('হিরো ডেস্টিনেশন স্লাইড', 'Hero destination slides')}
                  className="flex items-center gap-1.5"
                >
                  {heroSlides.map((slide, idx) => {
                    const isActive = idx === activeSlide;
                    return (
                      <button
                        key={slide.imageKey}
                        id={`hero-slide-tab-${idx}`}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        tabIndex={isActive ? 0 : -1}
                        aria-label={`${isEn ? slide.locationEn : slide.locationBn} (${idx + 1}/${heroSlides.length})`}
                        onClick={() => setActiveSlide(idx)}
                        onKeyDown={(e) => {
                          let nextIdx: number | null = null;
                          if (e.key === 'ArrowRight') nextIdx = (idx + 1) % heroSlides.length;
                          else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + heroSlides.length) % heroSlides.length;
                          else if (e.key === 'Home') nextIdx = 0;
                          else if (e.key === 'End') nextIdx = heroSlides.length - 1;
                          if (nextIdx !== null) {
                            e.preventDefault();
                            setActiveSlide(nextIdx);
                            document.getElementById(`hero-slide-tab-${nextIdx}`)?.focus();
                          }
                        }}
                        className="group min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                      >
                        <span className="relative block w-7 h-[3px] rounded-full bg-white/35 overflow-hidden group-hover:bg-white/60 transition-colors duration-200">
                          <span
                            className={`absolute inset-0 rounded-full bg-[#C9A24B] origin-left transition-transform duration-300 ${
                              isActive ? 'scale-x-100' : 'scale-x-0'
                            }`}
                          />
                        </span>
                      </button>
                    );
                  })}
                </div>

                {!env.saveData && !env.isSlowConnection && !prefersReducedMotion && (
                  <button
                    type="button"
                    onClick={() => setIsPaused((p) => !p)}
                    aria-label={
                      isPaused
                        ? t('স্লাইডশো চালু করুন', 'Play destination slideshow')
                        : t('স্লাইডশো বিরতি দিন', 'Pause destination slideshow')
                    }
                    aria-pressed={isPaused}
                    className="w-11 h-11 rounded-xl border border-white/25 bg-[#071529]/65 text-white/90 hover:text-white hover:border-[#C9A24B]/60 inline-flex items-center justify-center transition-colors duration-200 cursor-pointer"
                  >
                    {isPaused ? (
                      <Play className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : (
                      <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Search Box (renders immediately without opacity:0 delay for instant interaction) */}
        <form
          onSubmit={handleQuickSearch}
          data-dark-surface="false"
          aria-label={t('দ্রুত সার্ভিস ও দেশ খুঁজুন', 'Quick service and destination finder')}
          className="mt-10 sm:mt-12 bg-white text-[#1A1A1A] rounded-2xl p-4 sm:p-6 shadow-[0_24px_60px_rgba(4,12,24,0.36)] border border-[#C9A24B]/30 grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
        >
          <div className="md:col-span-5">
            <label htmlFor="hero-service" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
              {t('কোন সার্ভিস খুঁজছেন?', 'Select Service')}
            </label>
            <select
              id="hero-service"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full min-h-[48px] px-4 rounded-xl border border-[#0B1F3A]/20 text-base sm:text-sm text-[#1A1A1A] bg-[#FAF8F4] focus:bg-white focus:border-[#0B1F3A] transition-colors"
            >
              {serviceSummaries.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {isEn ? s.titleEn : s.titleBn}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-4">
            <label htmlFor="hero-country" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
              {t('পছন্দের দেশ (ঐচ্ছিক)', 'Destination Country (Optional)')}
            </label>
            <select
              id="hero-country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full min-h-[48px] px-4 rounded-xl border border-[#0B1F3A]/20 text-base sm:text-sm text-[#1A1A1A] bg-[#FAF8F4] focus:bg-white focus:border-[#0B1F3A] transition-colors"
            >
              <option value="">{t('সকল দেশ', 'All Countries')}</option>
              {destinationSummaries.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {isEn ? d.nameEn : d.nameBn}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <button type="submit" className="btn-navy w-full">
              <Search className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />
              {t('বিস্তারিত জানুন', 'Explore Now')}
            </button>
          </div>
        </form>

        {/* Under-Hero Promises */}
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs sm:text-sm text-white/85">
          <span className="inline-flex items-center gap-2">
            <Check className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />
            {t('স্বচ্ছ ফি ও মানি রিসিট', 'Transparent Fees & Receipts')}
          </span>
          <span className="inline-flex items-center gap-2">
            <Check className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />
            {t('সৎ ও বাস্তব পরামর্শ', 'Honest Guidance')}
          </span>
          <span className="inline-flex items-center gap-2">
            <Check className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />
            {t('প্রতিটি ধাপে আপডেট', 'Step-by-Step Updates')}
          </span>
        </div>
      </div>
    </section>
  );
}
