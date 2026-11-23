import { ArrowRight, FileDown, MessageCircle, Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { siteConfig, buildWhatsAppLink } from '../config/site';
import { getPageLeadContext } from '../lib/leadContext';
import { trackAnalyticsEvent } from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';

interface SectionCtaStripProps {
  /** Short editorial heading */
  headingBn: string;
  headingEn: string;
  /** Optional 1-line reassuring subtext */
  subtextBn?: string;
  subtextEn?: string;
  /** Anchor target for the primary button (defaults to #consultation) */
  primaryHref?: string;
  primaryLabelBn?: string;
  primaryLabelEn?: string;
  /** Analytics location identifier (e.g. 'after_services', 'after_itinerary') */
  locationId: string;
  /** Optional override for WhatsApp pre-filled message */
  whatsappMessage?: string;
  /** Optional callback to open the Checklist PDF modal instead of/in addition to anchor */
  onDownloadChecklist?: () => void;
  checklistLabelBn?: string;
  checklistLabelEn?: string;
  /** Surface styling to preserve alternating white / off-white section rhythm */
  variant?: 'light' | 'white' | 'hajj';
}

/**
 * Refined post-section conversion bar placed after major proof/content blocks.
 * Maintains premium Navy + Gold editorial restraint (zero pill clutter, >= 44px tap targets).
 */
export function SectionCtaStrip({
  headingBn,
  headingEn,
  subtextBn,
  subtextEn,
  primaryHref = '#consultation',
  primaryLabelBn = 'ফ্রি কনসাল্টেশন নিন',
  primaryLabelEn = 'Get Free Consultation',
  locationId,
  whatsappMessage,
  onDownloadChecklist,
  checklistLabelBn = 'ফ্রি চেকলিস্ট PDF',
  checklistLabelEn = 'Free Checklist PDF',
  variant = 'white',
}: SectionCtaStripProps) {
  const { locale, t } = useLanguage();
  const { pathname } = useLocation();
  const ctx = getPageLeadContext(pathname, locale);

  const waHref = whatsappMessage ? buildWhatsAppLink(whatsappMessage, locale) : ctx.whatsappUrl;

  const boxClasses =
    variant === 'hajj'
      ? 'bg-[#0F5132] text-white border-[#C9A24B]/40'
      : variant === 'light'
      ? 'bg-[#FAF8F4] text-[#0B1F3A] border-[#0B1F3A]/10'
      : 'bg-white text-[#0B1F3A] border-[#C9A24B]/35 shadow-[0_8px_28px_rgba(11,31,58,0.05)]';

  const isDark = variant === 'hajj';

  return (
    <div
      data-dark-surface={isDark ? 'true' : undefined}
      className={`rounded-2xl border p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-5 ${boxClasses}`}
    >
      <div className="min-w-0 max-w-2xl">
        <h3 className={`heading-h3 ${isDark ? 'text-white' : 'text-[#0B1F3A]'}`}>
          {t(headingBn, headingEn)}
        </h3>
        {(subtextBn || subtextEn) && (
          <p className={`mt-1.5 text-sm leading-[1.7] ${isDark ? 'text-white/85' : 'text-[#525B68]'}`}>
            {t(subtextBn || '', subtextEn || '')}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 shrink-0">
        {onDownloadChecklist ? (
          <button
            type="button"
            onClick={() => {
              trackAnalyticsEvent('lead_magnet_click', {
                trigger: 'inline_section_cta',
                location: locationId,
                checklist_id: ctx.leadMagnet.id,
              });
              onDownloadChecklist();
            }}
            className="btn-primary btn-sm"
          >
            <FileDown className="w-4 h-4" aria-hidden="true" />
            <span>{t(checklistLabelBn, checklistLabelEn)}</span>
          </button>
        ) : (
          <a
            href={primaryHref}
            onClick={() =>
              trackAnalyticsEvent('cta_click', {
                cta_label: primaryLabelEn,
                cta_location: locationId,
              })
            }
            className="btn-primary btn-sm"
          >
            <span>{t(primaryLabelBn, primaryLabelEn)}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        )}

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackAnalyticsEvent('whatsapp_click', {
              location: locationId,
              prefilled_topic: ctx.serviceLabel,
            })
          }
          className={isDark ? 'btn-secondary-light btn-sm' : 'btn-secondary btn-sm'}
        >
          <MessageCircle className={`w-4 h-4 ${isDark ? 'text-[#E2BE67]' : 'text-[#7D5D14]'}`} aria-hidden="true" />
          <span>{t('WhatsApp-এ জিজ্ঞাসা করুন', 'Ask on WhatsApp')}</span>
        </a>

        <a
          href={siteConfig.contact.phoneHref}
          onClick={() =>
            trackAnalyticsEvent('call_click', {
              location: locationId,
            })
          }
          className={`min-h-[44px] px-3 inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold tabular-nums transition-colors ${
            isDark
              ? 'text-white/90 hover:text-[#E2BE67]'
              : 'text-[#0B1F3A] hover:text-[#7D5D14]'
          }`}
        >
          <Phone className={`w-4 h-4 ${isDark ? 'text-[#E2BE67]' : 'text-[#7D5D14]'}`} aria-hidden="true" />
          <span>{siteConfig.contact.phoneDisplay}</span>
        </a>
      </div>
    </div>
  );
}
