import { useState } from 'react';
import { MapPin, ExternalLink, Navigation, Phone, Clock } from 'lucide-react';
import { siteConfig } from '../config/site';
import { trackAnalyticsEvent } from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';

interface GoogleMapFacadeProps {
  /** Compact mode for Footer, spacious mode for Contact, About & Service Areas pages */
  variant?: 'compact' | 'card';
  /** Dark surface (Footer) vs light surface (Contact / About / Service Areas) */
  tone?: 'dark' | 'light';
  /** Explicit container height class (prevents CLS before/after iframe mount) */
  heightClass?: string;
  title?: string;
}

/**
 * Interactive Google Maps Facade with Exact NAP & Turn-by-Turn Directions.
 *
 * Prevents ~450-600 KB of third-party Google Maps JavaScript, map tiles, and
 * tracking cookies from loading on initial page load or scroll. The real
 * interactive Google Maps iframe mounts ONLY when the visitor clicks
 * "Load Interactive Map", while keeping exact NAP + coordinates + Directions
 * immediately usable for local visitors and mobile users.
 */
export function GoogleMapFacade({
  variant = 'card',
  tone = 'light',
  heightClass = 'min-h-[16rem]',
  title = 'Visatrip Global — Rohanpur, Gomastapur, Chapai Nawabganj, Bangladesh Map',
}: GoogleMapFacadeProps) {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  const { latitude, longitude } = siteConfig.contact.geo;

  if (loaded) {
    return (
      <div className={`relative w-full h-72 ${heightClass} bg-[#0B1F3A]`}>
        <iframe
          title={title}
          src={siteConfig.contact.mapEmbedUrl}
          loading="eager"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full min-h-[260px] border-0"
        />
      </div>
    );
  }

  return (
    <div
      data-dark-surface="true"
      className={`relative w-full ${heightClass} flex flex-col justify-between p-4 sm:p-5 bg-[#0B1F3A] text-white ${
        tone === 'dark' ? '' : ''
      }`}
    >
      {/* Subtle architectural map grid pattern (pure CSS, zero network cost) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(201,162,75,0.28) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,162,75,0.28) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#071529]/80 via-[#0B1F3A]/60 to-[#0B1F3A]/95"
      />

      {/* Top location metadata (Exact NAP + synced GeoCoordinates) */}
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5 min-w-0">
          <span className="w-9 h-9 rounded-xl bg-[#C9A24B]/18 border border-[#C9A24B]/45 text-[#C9A24B] flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-xs leading-[1.55] font-semibold uppercase tracking-[0.08em] text-[#C9A24B]">
              {siteConfig.brandName} · {t('অফিস ম্যাপ', 'Google Maps')}
            </p>
            <p
              className={`font-semibold text-white leading-snug mt-0.5 ${
                variant === 'compact' ? 'text-xs line-clamp-2' : 'text-sm'
              }`}
            >
              {t(siteConfig.contact.officeAddressBn, siteConfig.contact.officeAddressEn)}
            </p>
            {variant === 'card' && (
              <div className="mt-1.5 space-y-1 text-xs text-white/75 tabular-nums">
                <p>
                  {latitude.toFixed(4)}° N, {longitude.toFixed(4)}° E · {t('রাজশাহী বিভাগ', 'Rajshahi Division')}
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs leading-[1.55] text-white/80">
                  <span className="inline-flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#C9A24B]" aria-hidden="true" />
                    {siteConfig.contact.phoneDisplay}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#C9A24B]" aria-hidden="true" />
                    {t(siteConfig.contact.officeHoursBn, siteConfig.contact.officeHoursEn)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons (all >= 44px tap targets) */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 pt-3">
        <button
          type="button"
          onClick={() => {
            setLoaded(true);
            trackAnalyticsEvent('cta_click', {
              cta_label: 'Load Interactive Office Map',
              cta_location: `map_facade_${variant}`,
            });
          }}
          className="min-h-[44px] px-4 rounded-xl bg-[#C9A24B] hover:bg-[#D6B25E] text-[#0B1F3A] text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Navigation className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{t('ইন্টারঅ্যাক্টিভ ম্যাপ লোড করুন', 'Load Interactive Map')}</span>
        </button>
        <a
          href={siteConfig.contact.mapDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackAnalyticsEvent('cta_click', {
              cta_label: 'Get Google Maps Directions',
              cta_location: `map_facade_${variant}`,
            })
          }
          className="min-h-[44px] px-3.5 rounded-xl bg-white/10 hover:bg-white/18 border border-white/15 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
        >
          <span>{t('রাস্তা ও দিকনির্দেশনা', 'Get Directions')}</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
