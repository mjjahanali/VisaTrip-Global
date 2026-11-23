import { useId } from 'react';
import { X } from 'lucide-react';
import { InquiryForm } from './InquiryForm';
import { useLanguage } from '../context/LanguageContext';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface ConsultationModalProps {
  open: boolean;
  onClose: () => void;
  defaultService?: string;
  defaultCountry?: string;
}

export function ConsultationModal({
  open,
  onClose,
  defaultService,
  defaultCountry,
}: ConsultationModalProps) {
  const { t } = useLanguage();
  const titleId = useId();
  const dialogRef = useFocusTrap<HTMLDivElement>({
    active: open,
    onEscape: onClose,
  });

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#071529]/70 backdrop-blur-xs flex items-end sm:items-center justify-center sm:p-4"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-t-3xl sm:rounded-2xl max-w-lg w-full max-h-[92dvh] flex flex-col relative shadow-2xl border border-[#C9A24B]/35 overflow-hidden focus:outline-none"
      >
        {/* Mobile grab indicator */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center shrink-0">
          <span className="w-10 h-1 rounded-full bg-[#0B1F3A]/15" aria-hidden="true" />
        </div>

        <div className="overflow-y-auto overscroll-contain px-5 pt-4 pb-2 sm:px-8 sm:pt-7 sm:pb-6">
          <button
            type="button"
            onClick={onClose}
            aria-label={t('কনসাল্টেশন ফর্ম বন্ধ করুন', 'Close consultation modal')}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-11 h-11 rounded-xl hover:bg-[#FAF8F4] flex items-center justify-center text-[#525B68] hover:text-[#0B1F3A] cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          <p className="text-xs font-semibold tracking-wider uppercase text-[#7D5D14] mb-1">
            {t('সম্পূর্ণ ফ্রি পরামর্শ', 'Free Initial Consultation')}
          </p>
          <h2 id={titleId} className="heading-h3 text-[#0B1F3A] pr-10">
            {t('ফ্রি কনসাল্টেশন বুক করুন', 'Request a Free Consultation')}
          </h2>
          <p className="mt-2 text-sm text-[#4B5563] mb-5 leading-[1.75]">
            {t(
              'আপনার তথ্য দিন — আমাদের কনসালটেন্ট সৎ ও সঠিক গাইডলাইনসহ দ্রুত যোগাযোগ করবেন।',
              'Share your details and our consultant will contact you promptly with clear guidance.'
            )}
          </p>

          <InquiryForm
            defaultService={defaultService}
            defaultCountry={defaultCountry}
            compact
            stickyInsideModal
            formType="consultation_modal"
          />
        </div>
      </div>
    </div>
  );
}
