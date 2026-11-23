import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { toBanglaDigits } from '../config/site';
import { useLanguage } from '../context/LanguageContext';

interface MobileSnapCarouselProps {
  items: React.ReactNode[];
  /** Desktop/tablet grid classes applied from `sm:` upward */
  desktopGridClass: string;
  /** Accessible label for the carousel track */
  ariaLabel: string;
  /** Card width class on mobile (< 640px). Defaults to 84vw so the next card peeks clearly. */
  mobileCardClass?: string;
}

/**
 * Mobile-first CSS Scroll-Snap carousel (< 640px) that transitions cleanly into
 * a multi-column grid from `sm:` upward. Zero drag JS overhead — native 60fps touch physics.
 */
export function MobileSnapCarousel({
  items,
  desktopGridClass,
  ariaLabel,
  mobileCardClass = 'w-[84vw] max-w-[330px]',
}: MobileSnapCarouselProps) {
  const { isEn, t } = useLanguage();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        const firstCard = el.firstElementChild as HTMLElement | null;
        if (!firstCard) return;
        const step = firstCard.offsetWidth + 16; // card width + gap-4 (16px)
        const idx = Math.round(el.scrollLeft / Math.max(step, 1));
        setActiveIndex(Math.min(Math.max(idx, 0), items.length - 1));
      });
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [items.length]);

  const scrollToIndex = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const target = el.children[index] as HTMLElement | undefined;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }
  };

  return (
    <div>
      {/* Mobile swipe hint */}
      {items.length > 1 && (
        <div className="sm:hidden flex items-center justify-between mb-3 text-xs text-[#525B68]">
          <span className="tabular-nums font-medium">
            {isEn
              ? `${activeIndex + 1} / ${items.length}`
              : `${toBanglaDigits(activeIndex + 1)} / ${toBanglaDigits(items.length)}`}
          </span>
          <span className="inline-flex items-center gap-1 font-medium text-[#7D5D14]">
            {t('বামে সোয়াইপ করুন', 'Swipe to browse')}
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </div>
      )}

      {/* Horizontal Scroll-Snap Track on mobile (< 640px), Multi-column Grid on sm:+ */}
      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        className={`flex gap-4 overflow-x-auto snap-carousel scrollbar-none -mx-4 px-4 pb-2 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:grid ${desktopGridClass}`}
      >
        {items.map((node, idx) => (
          <div
            key={idx}
            className={`${mobileCardClass} shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink h-auto`}
          >
            {node}
          </div>
        ))}
      </div>

      {/* Mobile snap progress controls (every tap target >= 44x44px, single-row safe at 360px) */}
      {items.length > 1 && items.length <= 6 && (
        <div
          className="sm:hidden mt-3 flex items-center justify-center"
          role="tablist"
          aria-label={ariaLabel}
        >
          {items.map((_, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`${ariaLabel} ${idx + 1}`}
                onClick={() => scrollToIndex(idx)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              >
                <span
                  className={`block h-1.5 rounded-full transition-transform duration-200 ${
                    isActive ? 'w-6 bg-[#0B1F3A]' : 'w-2 bg-[#0B1F3A]/20'
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}

      {items.length > 6 && (
        <div className="sm:hidden mt-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
            disabled={activeIndex === 0}
            aria-label={t('পূর্ববর্তী কার্ড', 'Previous item')}
            className="w-11 h-11 rounded-xl border border-[#0B1F3A]/15 bg-white text-[#0B1F3A] disabled:opacity-35 flex items-center justify-center shrink-0 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 rotate-180" aria-hidden="true" />
          </button>
          <div className="flex-1 h-1.5 rounded-full bg-[#0B1F3A]/12 overflow-hidden" aria-hidden="true">
            <div
              className="h-full rounded-full bg-[#C9A24B] transition-transform duration-200 origin-left"
              style={{ transform: `scaleX(${(activeIndex + 1) / items.length})` }}
            />
          </div>
          <button
            type="button"
            onClick={() => scrollToIndex(Math.min(activeIndex + 1, items.length - 1))}
            disabled={activeIndex >= items.length - 1}
            aria-label={t('পরবর্তী কার্ড', 'Next item')}
            className="w-11 h-11 rounded-xl border border-[#0B1F3A]/15 bg-white text-[#0B1F3A] disabled:opacity-35 flex items-center justify-center shrink-0 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
