import { getPageLeadContext } from './leadContext';
import { hasAnalyticsConsent } from './consent';

export type AnalyticsEventName =
  | 'cta_click'
  | 'form_start'
  | 'form_submit'
  | 'whatsapp_click'
  | 'call_click'
  | 'lead_magnet_impression'
  | 'lead_magnet_click'
  | 'checklist_download'
  | 'scroll_depth';

export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Unified conversion event tracker (GA4 + Meta Pixel + GTM dataLayer).
 * Strictly honors cookie consent — no tracking events fire unless analytics consent is granted.
 */
export function trackAnalyticsEvent(
  eventName: AnalyticsEventName,
  metadata: AnalyticsPayload = {}
): void {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;

  try {
    const pathname = window.location.pathname || '/';
    const locale: 'bn' | 'en' = pathname.startsWith('/en') ? 'en' : 'bn';
    const ctx = getPageLeadContext(pathname, locale);

    const enriched: Record<string, string | number | boolean> = {
      page_path: pathname,
      page_type: ctx.pageType,
      service: ctx.serviceLabel,
      locale,
    };

    for (const [key, val] of Object.entries(metadata)) {
      if (val !== undefined && val !== '') {
        enriched[key] = val;
      }
    }

    // 1. Push to GTM / GA4 dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...enriched,
    });

    // 2. Send to GA4 gtag if active
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, enriched);
    }

    // 3. Send to Meta Pixel if active (maps key conversions to standard Meta events too)
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', eventName, enriched);
      if (eventName === 'form_submit' || eventName === 'checklist_download') {
        window.fbq('track', 'Lead', {
          content_name: String(enriched.service),
          content_category: eventName,
        });
      } else if (eventName === 'whatsapp_click' || eventName === 'call_click') {
        window.fbq('track', 'Contact', {
          content_name: String(enriched.service),
          content_category: eventName,
        });
      }
    }
  } catch {
    // Analytics must never interrupt navigation or form submission
  }
}
