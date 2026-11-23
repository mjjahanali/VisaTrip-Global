import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { m, useReducedMotion } from 'motion/react';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import { siteConfig } from '../config/site';
import { getPageLeadContext } from '../lib/leadContext';
import { initOptionalAnalyticsScripts } from '../lib/seo';
import { trackAnalyticsEvent } from '../lib/analytics';
import { CONSENT_CHANGE_EVENT, hasAnalyticsConsent } from '../lib/consent';
import { scheduleKeyRoutesPrefetch } from '../lib/prefetchRoutes';
import { useLanguage } from '../context/LanguageContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { RouteProgressBar } from './RouteProgressBar';
import { OfflineNotice } from './OfflineNotice';
import { CookieConsentBanner } from './CookieConsentBanner';
import { MOTION_EASE, PageTransition } from './MotionPrimitives';

// Lazy-load non-critical lead modals & scroll magnet so mobile Slow 3G initial JS stays minimal
const ExitIntentModal = lazy(() =>
  import('./ExitIntentModal').then((mod) => ({ default: mod.ExitIntentModal }))
);
const ScrollDepthLeadMagnet = lazy(() =>
  import('./ScrollDepthLeadMagnet').then((mod) => ({ default: mod.ScrollDepthLeadMagnet }))
);
const ConsultationModal = lazy(() =>
  import('./ConsultationModal').then((mod) => ({ default: mod.ConsultationModal }))
);

interface LayoutProps {
  children: React.ReactNode;
  onOpenConsultationOverride?: () => void;
}

export function Layout({ children }: LayoutProps) {
  const { locale, t } = useLanguage();
  const location = useLocation();
  const prefersReduced = useReducedMotion();
  const [consultOpen, setConsultOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [idleWidgetsReady, setIdleWidgetsReady] = useState(false);

  const pageCtx = getPageLeadContext(location.pathname, locale);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  useEffect(() => {
    if (hasAnalyticsConsent()) {
      initOptionalAnalyticsScripts();
    }
    const handleConsentChange = () => {
      if (hasAnalyticsConsent()) {
        initOptionalAnalyticsScripts();
      }
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);

    scheduleKeyRoutesPrefetch();

    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener?.('change', sync);

    // Defer mounting scroll-depth & exit-intent lead magnets until after initial load/LCP
    const mountIdleWidgets = () => setIdleWidgetsReady(true);
    const idleTimer = window.setTimeout(mountIdleWidgets, 3500);
    window.addEventListener('scroll', mountIdleWidgets, { once: true, passive: true });

    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
      mq.removeEventListener?.('change', sync);
      window.clearTimeout(idleTimer);
      window.removeEventListener('scroll', mountIdleWidgets);
    };
  }, []);

  const openConsultModal = (ctaLocation: string) => {
    trackAnalyticsEvent('cta_click', {
      cta_label: 'Open Free Consultation Modal',
      cta_location: ctaLocation,
    });
    setConsultOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#1A1A1A] overflow-x-clip">
      <RouteProgressBar />

      <a href="#main-content" className="skip-link">
        {t('মূল কনটেন্টে যান', 'Skip to main content')}
      </a>

      <Navbar onOpenConsultation={() => openConsultModal('navbar')} />

      <OfflineNotice />

      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <PageTransition routeKey={location.pathname}>{children}</PageTransition>
      </main>

      <Footer />

      {/* Desktop Floating WhatsApp Button with Context-Aware Pre-Filled Message */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-40" data-dark-surface="true">
        {!prefersReduced && (
          <m.span
            aria-hidden="true"
            initial={{ scale: 1, opacity: 0.42 }}
            animate={{ scale: [1, 1.18], opacity: [0.42, 0] }}
            transition={{
              duration: 0.38,
              ease: MOTION_EASE,
              repeat: Infinity,
              repeatDelay: 2.8,
            }}
            className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#E2BE67]"
          />
        )}
        <a
          href={pageCtx.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackAnalyticsEvent('whatsapp_click', {
              location: 'floating_button',
              prefilled_topic: pageCtx.serviceLabel,
            })
          }
          aria-label={t('WhatsApp-এ যোগাযোগ করুন (নতুন ট্যাবে খুলবে)', 'Chat on WhatsApp (opens in new tab)')}
          className="relative inline-flex items-center gap-2.5 min-h-[48px] px-4 py-2.5 rounded-full bg-[#0F5132] text-white text-sm font-semibold shadow-[0_10px_28px_rgba(15,81,50,0.32)] hover:bg-[#0A3822] hover:-translate-y-0.5 transition-transform duration-200 border border-[#E2BE67]/60"
        >
          <MessageCircle className="w-5 h-5 text-[#E2BE67]" aria-hidden="true" />
          <span lang="en">WhatsApp</span>
        </a>
      </div>

      {/* Mobile Safe-Area Sticky Bottom Bar (52px tap targets + context-aware WhatsApp) */}
      <nav
        aria-label={t('দ্রুত যোগাযোগ বার', 'Quick contact actions')}
        data-dark-surface="true"
        className={`vtg-mobile-bottom-bar lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0B1F3A]/98 backdrop-blur-md border-t border-[#C9A24B]/35 pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_24px_rgba(7,21,41,0.22)] transition-transform duration-200 ease-out ${
          consultOpen ? 'translate-y-full pointer-events-none' : 'translate-y-0'
        }`}
      >
        <div className="grid grid-cols-3 min-h-[52px]">
          <a
            href={siteConfig.contact.phoneHref}
            onClick={() => trackAnalyticsEvent('call_click', { location: 'mobile_bottom_bar' })}
            className="min-h-[52px] flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-white active:bg-white/10 border-r border-white/10 px-2 py-1.5 text-center"
          >
            <Phone className="w-4 h-4 text-[#C9A24B] shrink-0" aria-hidden="true" />
            <span className="leading-[1.45]">{t('কল করুন', 'Call')}</span>
          </a>
          <a
            href={pageCtx.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackAnalyticsEvent('whatsapp_click', {
                location: 'mobile_bottom_bar',
                prefilled_topic: pageCtx.serviceLabel,
              })
            }
            aria-label={t('WhatsApp-এ মেসেজ করুন', 'Chat on WhatsApp')}
            className="min-h-[52px] flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-white active:bg-white/10 border-r border-white/10 px-2 py-1.5 text-center"
          >
            <MessageCircle className="w-4 h-4 text-[#C9A24B] shrink-0" aria-hidden="true" />
            <span lang="en" className="leading-[1.45]">WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => openConsultModal('mobile_bottom_bar')}
            className="min-h-[52px] flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold bg-[#C9A24B] text-[#0B1F3A] active:bg-[#D6B25E] cursor-pointer px-2 py-1.5 text-center"
          >
            <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="leading-[1.45]">{t('কনসাল্টেশন', 'Consult')}</span>
          </button>
        </div>
      </nav>

      {/* Scroll-Depth Lead Magnet & Scroll Milestone Tracking (deferred until post-LCP idle/scroll) */}
      {idleWidgetsReady && (
        <Suspense fallback={null}>
          <ScrollDepthLeadMagnet suppress={consultOpen} />
        </Suspense>
      )}

      {/* Desktop Exit-Intent Lead Magnet (deferred until post-LCP idle) */}
      {idleWidgetsReady && isDesktop && (
        <Suspense fallback={null}>
          <ExitIntentModal />
        </Suspense>
      )}

      <CookieConsentBanner suppress={consultOpen} />

      {consultOpen && (
        <Suspense fallback={null}>
          <ConsultationModal
            open={consultOpen}
            onClose={() => setConsultOpen(false)}
            defaultService={
              pageCtx.pageType === 'service_detail' ? pageCtx.serviceDisplayEn : undefined
            }
          />
        </Suspense>
      )}
    </div>
  );
}
