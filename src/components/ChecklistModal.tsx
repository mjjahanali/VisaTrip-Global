import { useEffect, useId, useRef, useState } from 'react';
import {
  X,
  FileDown,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Lock,
  MessageCircle,
  Clock,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { getPageLeadContext } from '../lib/leadContext';
import { downloadChecklistPdf } from '../lib/checklistPdf';
import { trackAnalyticsEvent } from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { getApiUrl, getStaticFormEndpoint, isStaticSiteMode, stripBasePath } from '../lib/assetUrl';
import { SecureFormBadge } from './TrustSignals';

interface ChecklistModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  serviceName: string;
  documents: string[];
  /** Optional English checklist items for crisp printable A4 PDF output */
  documentsEn?: string[];
  /** Optional PDF title (ASCII/English) */
  pdfTitleEn?: string;
  /** Lead magnet trigger source for analytics attribution */
  trigger?: 'inline' | 'exit_intent' | 'scroll_depth';
  checklistId?: string;
}

export function ChecklistModal({
  open,
  onClose,
  title,
  serviceName,
  documents,
  documentsEn,
  pdfTitleEn,
  trigger = 'inline',
  checklistId,
}: ChecklistModalProps) {
  const { locale, t } = useLanguage();
  const { showToast } = useToast();
  const location = useLocation();
  const uid = useId();
  const hasStartedRef = useRef(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; phone?: string }>({});
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const dialogRef = useFocusTrap<HTMLDivElement>({
    active: open,
    onEscape: onClose,
  });

  const pageCtx = getPageLeadContext(location.pathname, locale);
  const resolvedChecklistId =
    checklistId || `${serviceName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-checklist`;

  useEffect(() => {
    if (!open) return;
    hasStartedRef.current = false;
  }, [open]);

  if (!open) return null;

  const trackStartOnce = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    trackAnalyticsEvent('form_start', {
      form_type: `checklist_${trigger}`,
      service: serviceName,
      checklist_id: resolvedChecklistId,
    });
  };

  const triggerPdfDownload = () => {
    const itemsForPdf =
      documentsEn && documentsEn.length > 0
        ? documentsEn
        : documents.some((d) => /[A-Za-z]{4,}/.test(d))
        ? documents
        : pageCtx.leadMagnet.documentsEn;

    downloadChecklistPdf({
      fileSlug: resolvedChecklistId,
      titleEn: pdfTitleEn || `${serviceName} Document Checklist`,
      serviceName,
      itemsEn: itemsForPdf,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: { name?: string; phone?: string } = {};
    if (name.trim().length < 2) {
      nextErrors.name = t('অনুগ্রহ করে আপনার নাম লিখুন।', 'Please enter your name.');
    }
    if (phone.trim().length < 10) {
      nextErrors.phone = t(
        'অনুগ্রহ করে সঠিক ১১ সংখ্যার WhatsApp / মোবাইল নম্বর লিখুন।',
        'Please enter a valid mobile number.'
      );
    }
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      const firstId = nextErrors.name ? `${uid}-name` : `${uid}-phone`;
      document.getElementById(firstId)?.focus();
      return;
    }

    setFieldErrors({});
    setLoading(true);
    try {
      const leadPayload = {
        name: name.trim(),
        phone: phone.trim(),
        service: serviceName,
        message: `Downloaded PDF checklist (${trigger}): ${title}`,
        sourcePage: stripBasePath(window.location.pathname),
        formType: `checklist_${trigger}`,
      };
      const staticEndpoint = getStaticFormEndpoint();
      if (!isStaticSiteMode()) {
        await fetch(getApiUrl('/api/inquiry'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadPayload),
        });
      } else if (staticEndpoint) {
        await fetch(staticEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(leadPayload),
        });
      }
    } catch {
      // Download should still succeed even if network hiccups
    } finally {
      setLoading(false);
      try {
        sessionStorage.setItem('vtg_lead_magnet_converted', '1');
      } catch {
        // Ignore storage errors
      }
      trackAnalyticsEvent('form_submit', {
        form_type: `checklist_${trigger}`,
        service: serviceName,
        checklist_id: resolvedChecklistId,
      });
      trackAnalyticsEvent('checklist_download', {
        trigger,
        service: serviceName,
        checklist_id: resolvedChecklistId,
      });
      triggerPdfDownload();
      setDownloaded(true);
      showToast({
        variant: 'success',
        title: t('PDF চেকলিস্ট ডাউনলোড শুরু হয়েছে', 'Checklist PDF Download Started'),
        description: t(
          'ডকুমেন্ট সাজাতে কোনো প্রশ্ন থাকলে WhatsApp-এ ফ্রি যাচাই করুন।',
          'Message us on WhatsApp anytime for a free document review.'
        ),
      });
    }
  };

  const responseClaim = siteConfig.leadGeneration.responseTimeClaim;
  const titleId = `${uid}-title`;
  const nameErrorId = `${uid}-name-error`;
  const phoneErrorId = `${uid}-phone-error`;

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
        className="bg-white rounded-t-3xl sm:rounded-2xl max-w-md w-full max-h-[90dvh] overflow-y-auto overscroll-contain p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:p-8 relative shadow-2xl border border-[#C9A24B]/35 focus:outline-none"
      >
        <div className="sm:hidden pb-2 flex justify-center">
          <span className="w-10 h-1 rounded-full bg-[#0B1F3A]/15" aria-hidden="true" />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label={t('চেকলিস্ট মোডাল বন্ধ করুন', 'Close checklist modal')}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-11 h-11 rounded-xl hover:bg-[#FAF8F4] flex items-center justify-center text-[#525B68] hover:text-[#0B1F3A] cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {downloaded ? (
          <div role="status" aria-live="polite" className="text-center py-4 space-y-4">
            <CheckCircle2 className="w-10 h-10 text-[#0F5132] mx-auto" aria-hidden="true" />
            <h2 id={titleId} className="heading-h3 text-[#0B1F3A]">
              {t('আপনার চেকলিস্ট PDF ডাউনলোড শুরু হয়েছে!', 'Your Checklist PDF Download Has Started!')}
            </h2>
            <p className="text-sm text-[#4B5563] leading-[1.75]">
              {t(
                'ডকুমেন্ট সাজাতে কোনো প্রশ্ন থাকলে সরাসরি আমাদের WhatsApp-এ ফ্রি যাচাই করে নিন।',
                'Reach out on WhatsApp if you want a consultant to review your documents for free.'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a
                href={pageCtx.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackAnalyticsEvent('whatsapp_click', {
                    location: 'checklist_success',
                    service: serviceName,
                  })
                }
                className="btn-primary btn-sm w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                {t('WhatsApp-এ যাচাই করুন', 'Verify on WhatsApp')}
              </a>
              <button
                type="button"
                onClick={triggerPdfDownload}
                className="btn-secondary btn-sm w-full sm:w-auto"
              >
                <FileDown className="w-4 h-4" aria-hidden="true" />
                {t('আবার ডাউনলোড করুন', 'Download Again')}
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-xs font-semibold tracking-wider uppercase text-[#7D5D14] mb-1">
              {t('বিনামূল্যে ডাউনলোড · PDF চেকলিস্ট', 'Free Printable PDF Checklist')}
            </p>
            <h2 id={titleId} className="heading-h3 text-[#0B1F3A] pr-10">
              {title}
            </h2>
            <p className="mt-2 text-sm text-[#4B5563] leading-[1.75]">
              {t(
                'শুধুমাত্র আপনার নাম ও WhatsApp নম্বর দিয়ে সম্পূর্ণ প্রিন্টযোগ্য ডকুমেন্ট চেকলিস্ট PDF তাৎক্ষণিক ডাউনলোড করুন।',
                'Enter your name and WhatsApp number to download the printable PDF checklist immediately.'
              )}
            </p>

            <form
              onSubmit={handleSubmit}
              onFocusCapture={trackStartOnce}
              aria-busy={loading}
              className="mt-5 space-y-4"
              noValidate
            >
              <fieldset disabled={loading} className="space-y-4 disabled:opacity-75 transition-opacity">
              <div>
                <label
                  htmlFor={`${uid}-name`}
                  className="block text-xs font-semibold text-[#0B1F3A] mb-2"
                >
                  {t('আপনার নাম *', 'Your Name *')}
                </label>
                <input
                  id={`${uid}-name`}
                  name="name"
                  type="text"
                  inputMode="text"
                  autoComplete="name"
                  enterKeyHint="next"
                  required
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? nameErrorId : undefined}
                  value={name}
                  onChange={(e) => {
                    trackStartOnce();
                    setName(e.target.value);
                    if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder={t('আপনার পূর্ণ নাম', 'Your full name')}
                  className="w-full min-h-[48px] px-4 rounded-xl border border-[#0B1F3A]/15 bg-[#FAF8F4] focus:bg-white text-base sm:text-sm placeholder:text-[#596270] focus:border-[#0B1F3A] transition-colors"
                />
                {fieldErrors.name && (
                  <p id={nameErrorId} role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                    {fieldErrors.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor={`${uid}-phone`}
                  className="block text-xs font-semibold text-[#0B1F3A] mb-2"
                >
                  {t('WhatsApp / মোবাইল নম্বর *', 'WhatsApp / Mobile Number *')}
                </label>
                <input
                  id={`${uid}-phone`}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  enterKeyHint="done"
                  required
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={fieldErrors.phone ? phoneErrorId : undefined}
                  value={phone}
                  onChange={(e) => {
                    trackStartOnce();
                    setPhone(e.target.value);
                    if (fieldErrors.phone) setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  placeholder="017XX-XXXXXX"
                  className="w-full min-h-[48px] px-4 rounded-xl border border-[#0B1F3A]/15 bg-[#FAF8F4] focus:bg-white text-base sm:text-sm tabular-nums placeholder:text-[#596270] focus:border-[#0B1F3A] transition-colors"
                />
                {fieldErrors.phone && (
                  <p id={phoneErrorId} role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                    {fieldErrors.phone}
                  </p>
                )}
              </div>
              </fieldset>
              <div className="sticky bottom-0 pt-2 bg-white">
                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <FileDown className="w-4 h-4" aria-hidden="true" />
                  )}
                  {loading
                    ? t('চেকলিস্ট প্রস্তুত হচ্ছে...', 'Preparing PDF...')
                    : t('ফ্রি PDF চেকলিস্ট ডাউনলোড করুন', 'Download Free Checklist PDF')}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#4B5563] pt-1">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#7D5D14] shrink-0" aria-hidden="true" />
                  {t('ফ্রি কনসাল্টেশন, কোনো বাধ্যবাধকতা নেই', 'Free consultation, no obligation')}
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <Lock className="w-3.5 h-3.5 text-[#7D5D14] shrink-0" aria-hidden="true" />
                  {t('আপনার তথ্য সুরক্ষিত', 'Your information is kept private')}
                </span>
                {responseClaim.ownerConfirmed && (
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#7D5D14] shrink-0" aria-hidden="true" />
                    {t(responseClaim.textBn, responseClaim.textEn)}
                  </span>
                )}
              </div>

              <SecureFormBadge />
            </form>
          </>
        )}
      </div>
    </div>
  );
}
