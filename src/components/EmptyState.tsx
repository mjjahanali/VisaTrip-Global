import { Compass, FileSearch, MessageCircle, PackageSearch, RotateCcw, SearchX } from 'lucide-react';
import { buildWhatsAppLink } from '../config/site';
import { trackAnalyticsEvent } from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';

export type EmptyStateIcon = 'packages' | 'search' | 'destinations' | 'files';

interface EmptyStateProps {
  icon?: EmptyStateIcon;
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  descriptionEn: string;
  resetLabelBn?: string;
  resetLabelEn?: string;
  onReset?: () => void;
  showWhatsAppCta?: boolean;
  whatsappLabelBn?: string;
  whatsappLabelEn?: string;
  whatsappMessageBn?: string;
  locationId?: string;
}

export function EmptyState({
  icon = 'search',
  titleBn,
  titleEn,
  descriptionBn,
  descriptionEn,
  resetLabelBn = 'সব ফিল্টার রিসেট করুন',
  resetLabelEn = 'Reset All Filters',
  onReset,
  showWhatsAppCta = true,
  whatsappLabelBn = 'কাস্টম সহায়তার জন্য WhatsApp করুন',
  whatsappLabelEn = 'Ask for Custom Help on WhatsApp',
  whatsappMessageBn = 'আসসালামু আলাইকুম, আমার পছন্দের ক্যাটাগরির তথ্য খুঁজছিলাম। কাস্টম পরামর্শ নিতে চাই।',
  locationId = 'empty_state',
}: EmptyStateProps) {
  const { locale, t } = useLanguage();

  const IconComp =
    icon === 'packages'
      ? PackageSearch
      : icon === 'destinations'
      ? Compass
      : icon === 'files'
      ? FileSearch
      : SearchX;

  return (
    <div
      role="status"
      aria-live="polite"
      className="card-surface p-8 sm:p-12 text-center max-w-2xl mx-auto"
    >
      <div
        aria-hidden="true"
        className="w-14 h-14 mx-auto rounded-2xl bg-[#FAF8F4] border border-[#C9A24B]/35 text-[#7D5D14] flex items-center justify-center mb-5"
      >
        <IconComp className="w-7 h-7" />
      </div>

      <p className="heading-h3 text-[#0B1F3A]">{t(titleBn, titleEn)}</p>
      <p className="mt-2.5 text-sm text-[#4B5563] leading-[1.75] max-w-lg mx-auto">
        {t(descriptionBn, descriptionEn)}
      </p>

      {(onReset || showWhatsAppCta) && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="btn-navy btn-sm w-full sm:w-auto"
            >
              <RotateCcw className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />
              {t(resetLabelBn, resetLabelEn)}
            </button>
          )}
          {showWhatsAppCta && (
            <a
              href={buildWhatsAppLink(whatsappMessageBn, locale)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackAnalyticsEvent('whatsapp_click', {
                  location: locationId,
                  prefilled_topic: 'custom_request_from_empty_state',
                })
              }
              className="btn-secondary btn-sm w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4 text-[#0F5132]" aria-hidden="true" />
              {t(whatsappLabelBn, whatsappLabelEn)}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
