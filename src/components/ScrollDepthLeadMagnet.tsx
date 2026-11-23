import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FileDown, X } from 'lucide-react';
import { getPageLeadContext } from '../lib/leadContext';
import { trackAnalyticsEvent } from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';
import { ChecklistModal } from './ChecklistModal';

const SCROLL_MILESTONES = [25, 50, 75, 90] as const;

/**
 * Tracks 25/50/75/90% scroll depth milestones per route and displays a subtle,
 * dismissible scroll-depth Checklist PDF prompt after >= 10s dwell + 55% scroll.
 * Respects mobile keyboard focus, session caps, and never fires on arrival.
 */
export function ScrollDepthLeadMagnet({ suppress }: { suppress?: boolean }) {
  const { locale, t } = useLanguage();
  const { pathname } = useLocation();
  const ctx = getPageLeadContext(pathname, locale);

  const [bannerVisible, setBannerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const reachedMilestonesRef = useRef<Set<number>>(new Set());

  // Reset per-page scroll milestones when route changes
  useEffect(() => {
    reachedMilestonesRef.current = new Set();
    setBannerVisible(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === 'undefined' || ctx.pageType === 'admin') return;

    let dwellReady = false;
    const dwellTimer = window.setTimeout(() => {
      dwellReady = true;
    }, 10000);

    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        const doc = document.documentElement;
        const scrollable = Math.max(doc.scrollHeight - window.innerHeight, 1);
        const pct = Math.min(100, Math.round((window.scrollY / scrollable) * 100));

        for (const m of SCROLL_MILESTONES) {
          if (pct >= m && !reachedMilestonesRef.current.has(m)) {
            reachedMilestonesRef.current.add(m);
            trackAnalyticsEvent('scroll_depth', { depth_percent: m });
          }
        }

        if (
          dwellReady &&
          pct >= 55 &&
          !suppress &&
          !document.body.classList.contains('vtg-keyboard-open') &&
          sessionStorage.getItem('vtg_scroll_magnet_dismissed') !== '1' &&
          sessionStorage.getItem('vtg_lead_magnet_converted') !== '1'
        ) {
          setBannerVisible((prev) => {
            if (!prev) {
              trackAnalyticsEvent('lead_magnet_impression', {
                trigger: 'scroll_depth',
                checklist_id: ctx.leadMagnet.id,
              });
            }
            return true;
          });
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearTimeout(dwellTimer);
      window.removeEventListener('scroll', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [ctx.pageType, ctx.leadMagnet.id, suppress]);

  const handleDismiss = () => {
    setBannerVisible(false);
    try {
      sessionStorage.setItem('vtg_scroll_magnet_dismissed', '1');
    } catch {
      // Ignore storage errors
    }
  };

  const handleOpenModal = () => {
    setBannerVisible(false);
    try {
      sessionStorage.setItem('vtg_scroll_magnet_dismissed', '1');
    } catch {
      // Ignore storage errors
    }
    trackAnalyticsEvent('lead_magnet_click', {
      trigger: 'scroll_depth',
      checklist_id: ctx.leadMagnet.id,
    });
    setModalOpen(true);
  };

  return (
    <>
      {bannerVisible && !suppress && (
        <aside
          data-dark-surface="true"
          aria-label={t('ফ্রি চেকলিস্ট PDF ডাউনলোড', 'Free Checklist PDF Download')}
          className="fixed z-30 left-3 right-3 bottom-[calc(4.1rem+env(safe-area-inset-bottom))] lg:left-6 lg:right-auto lg:bottom-6 lg:w-[348px] bg-[#0B1F3A] text-white rounded-2xl border border-[#C9A24B]/55 shadow-[0_18px_44px_rgba(4,12,24,0.34)] p-4 flex items-start gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-[#C9A24B]/18 border border-[#C9A24B]/40 text-[#C9A24B] flex items-center justify-center shrink-0 mt-0.5">
            <FileDown className="w-5 h-5" aria-hidden="true" />
          </div>

          <div className="min-w-0 flex-1 pr-7">
            <p className="text-xs leading-[1.55] font-semibold tracking-wider uppercase text-[#C9A24B]">
              {t(ctx.leadMagnet.badgeBn, ctx.leadMagnet.badgeEn)}
            </p>
            <p className="mt-0.5 text-xs sm:text-sm font-semibold text-white leading-[1.45]">
              {t(ctx.leadMagnet.titleBn, ctx.leadMagnet.titleEn)}
            </p>
            <button
              type="button"
              onClick={handleOpenModal}
              className="mt-2.5 min-h-[44px] px-4 rounded-xl bg-[#C9A24B] hover:bg-[#D6B25E] text-[#0B1F3A] text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <FileDown className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('ফ্রি PDF নিন', 'Get Free PDF')}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label={t('বন্ধ করুন', 'Dismiss checklist offer')}
            className="absolute top-1.5 right-1.5 w-11 h-11 rounded-xl text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </aside>
      )}

      <ChecklistModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t(ctx.leadMagnet.titleBn, ctx.leadMagnet.titleEn)}
        serviceName={ctx.leadMagnet.serviceName}
        documents={ctx.leadMagnet.documentsBn}
        documentsEn={ctx.leadMagnet.documentsEn}
        pdfTitleEn={ctx.leadMagnet.pdfTitleEn}
        trigger="scroll_depth"
        checklistId={ctx.leadMagnet.id}
      />
    </>
  );
}
