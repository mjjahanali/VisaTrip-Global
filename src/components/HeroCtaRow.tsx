import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { siteConfig, buildWhatsAppLink } from '../config/site';
import { getPageLeadContext } from '../lib/leadContext';
import { trackAnalyticsEvent } from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';

interface HeroCtaRowProps {
  primaryHref?: string;
  primaryLabelBn?: string;
  primaryLabelEn?: string;
  whatsappLabelBn?: string;
  whatsappLabelEn?: string;
  whatsappMessage?: string;
  locationId: string;
  showCallLink?: boolean;
}

/**
 * Standard above-the-fold Hero CTA bar for inner pages:
 * 1 primary gold consultation button + 1 context-aware WhatsApp button + optional direct call link.
 */
export function HeroCtaRow({
  primaryHref = '#consultation',
  primaryLabelBn = 'ফ্রি কনসাল্টেশন নিন',
  primaryLabelEn = 'Get Free Consultation',
  whatsappLabelBn = 'WhatsApp-এ কথা বলুন',
  whatsappLabelEn = 'Chat on WhatsApp',
  whatsappMessage,
  locationId,
  showCallLink = false,
}: HeroCtaRowProps) {
  const { locale, t } = useLanguage();
  const { pathname } = useLocation();
  const ctx = getPageLeadContext(pathname, locale);
  const waHref = whatsappMessage ? buildWhatsAppLink(whatsappMessage, locale) : ctx.whatsappUrl;

  return (
    <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-4">
      <a
        href={primaryHref}
        onClick={() =>
          trackAnalyticsEvent('cta_click', {
            cta_label: primaryLabelEn,
            cta_location: locationId,
          })
        }
        className="btn-primary"
      >
        <span>{t(primaryLabelBn, primaryLabelEn)}</span>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </a>

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
        className="btn-secondary-light"
      >
        <MessageCircle className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />
        <span>{t(whatsappLabelBn, whatsappLabelEn)}</span>
      </a>

      {showCallLink && (
        <a
          href={siteConfig.contact.phoneHref}
          onClick={() => trackAnalyticsEvent('call_click', { location: locationId })}
          className="min-h-[44px] px-3 inline-flex items-center justify-center gap-2 text-sm font-semibold text-white/90 hover:text-[#C9A24B] transition-colors tabular-nums"
        >
          <Phone className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />
          <span>{siteConfig.contact.phoneDisplay}</span>
        </a>
      )}
    </div>
  );
}
