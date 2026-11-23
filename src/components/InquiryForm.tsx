import { useEffect, useId, useRef, useState } from 'react';
import {
  CheckCircle2,
  MessageCircle,
  Loader2,
  AlertCircle,
  ChevronDown,
  Send,
  ShieldCheck,
  Lock,
  Clock,
  Plus,
  Minus,
  Phone,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { serviceSummaries, destinationSummaries } from '../data/catalogSummary';
import { siteConfig, buildWhatsAppLink } from '../config/site';
import { getPageLeadContext } from '../lib/leadContext';
import { trackAnalyticsEvent } from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { useMobileKeyboard } from '../hooks/useMobileKeyboard';
import { getApiUrl, getStaticFormEndpoint, isStaticSiteMode } from '../lib/assetUrl';
import { SecureFormBadge } from './TrustSignals';

interface InquiryValues {
  name: string;
  phone: string;
  service: string;
  country: string;
  message: string;
  website_url: string;
}

interface InquiryErrors {
  name?: string;
  phone?: string;
}

interface InquiryFormProps {
  defaultService?: string;
  defaultCountry?: string;
  formType?: string;
  compact?: boolean;
  darkSurface?: boolean;
  submitLabel?: string;
  extraFields?: Record<string, string>;
  onSuccess?: (leadId: string) => void;
  /** Render the submit button inside a sticky modal footer instead of floating above keyboard */
  stickyInsideModal?: boolean;
}

export function InquiryForm({
  defaultService,
  defaultCountry = '',
  formType = 'consultation',
  compact = false,
  darkSurface = false,
  submitLabel,
  extraFields,
  onSuccess,
  stickyInsideModal = false,
}: InquiryFormProps) {
  const { isEn, locale, t } = useLanguage();
  const { showToast } = useToast();
  const location = useLocation();
  const uid = useId();
  const formRef = useRef<HTMLFormElement | null>(null);
  const hasTrackedStartRef = useRef(false);

  const pageCtx = getPageLeadContext(location.pathname, locale);
  const resolvedDefaultService =
    defaultService ||
    (pageCtx.pageType === 'service_detail' ? pageCtx.serviceDisplayEn : 'General Consultation');

  const [values, setValues] = useState<InquiryValues>({
    name: '',
    phone: '',
    service: resolvedDefaultService,
    country: defaultCountry,
    message: '',
    website_url: '',
  });
  const [showOptional, setShowOptional] = useState(false);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    leadId: string;
    whatsappUrl: string;
    applicantName: string;
    serviceName: string;
  } | null>(null);
  const [formFocused, setFormFocused] = useState(false);

  // Keep context service/country synced when route changes
  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      service: defaultService || resolvedDefaultService,
      country: defaultCountry || prev.country,
    }));
  }, [defaultService, defaultCountry, resolvedDefaultService]);

  const { isMobileViewport, keyboardOffset } = useMobileKeyboard(formFocused);

  const trackFormStartOnce = () => {
    if (hasTrackedStartRef.current) return;
    hasTrackedStartRef.current = true;
    trackAnalyticsEvent('form_start', {
      form_type: formType,
      service: values.service || pageCtx.serviceLabel,
    });
  };

  const validate = (v: InquiryValues): InquiryErrors => {
    const next: InquiryErrors = {};
    if (v.name.trim().length < 2) {
      next.name = t(
        'অনুগ্রহ করে আপনার নাম লিখুন (কমপক্ষে ২ অক্ষর)',
        'Please enter your name (at least 2 characters)'
      );
    }
    const cleanPhone = v.phone.trim();
    if (cleanPhone.length < 10 || cleanPhone.length > 20) {
      next.phone = t(
        'সঠিক ১১ সংখ্যার মোবাইল / WhatsApp নম্বর লিখুন',
        'Please enter a valid 11-digit mobile or WhatsApp number'
      );
    }
    return next;
  };

  const handleFieldChange = (field: keyof InquiryValues, nextVal: string) => {
    trackFormStartOnce();
    setValues((prev) => ({ ...prev, [field]: nextVal }));
    if (errors[field as keyof InquiryErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstInvalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }

    setIsSubmitting(true);
    setFormFocused(false);
    const params = new URLSearchParams(location.search);
    const activeService = values.service.trim() || resolvedDefaultService;
    const hasOptionalDetails = Boolean(
      showOptional || values.country.trim() || values.message.trim()
    );

    try {
      const submittedName = values.name.trim();
      const submittedPhone = values.phone.trim();
      const submittedMessage = values.message.trim();
      const payload = {
        ...values,
        service: activeService,
        name: submittedName,
        phone: submittedPhone,
        message: submittedMessage,
        sourcePage: location.pathname,
        formType,
        utmSource: params.get('utm_source') || '',
        utmMedium: params.get('utm_medium') || '',
        utmCampaign: params.get('utm_campaign') || '',
        extra: extraFields,
      };
      const directWaUrl = buildWhatsAppLink(
        `আসসালামু আলাইকুম, আমি ${submittedName} (${submittedPhone})। সার্ভিস: ${activeService}${
          values.country ? `, দেশ: ${values.country}` : ''
        }। ${submittedMessage || pageCtx.whatsappMessageBn}`,
        locale
      );

      // Static hosting mode (e.g. GitHub Pages) without a Node/Express backend
      if (isStaticSiteMode()) {
        // Silently absorb honeypot spam
        if (values.website_url.trim()) {
          setResult({
            leadId: 'VTG-RECEIVED',
            whatsappUrl: pageCtx.whatsappUrl,
            applicantName: submittedName,
            serviceName: activeService,
          });
          return;
        }

        const staticEndpoint = getStaticFormEndpoint();
        let leadId = `VTG-${Date.now().toString(36).toUpperCase().slice(-6)}`;
        if (staticEndpoint) {
          const resp = await fetch(staticEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!resp.ok) {
            throw new Error('Static form endpoint unavailable');
          }
        } else {
          leadId = 'WHATSAPP-DIRECT';
        }

        trackAnalyticsEvent('form_submit', {
          form_type: staticEndpoint ? formType : `${formType}_whatsapp_direct`,
          service: activeService,
          country: values.country || undefined,
          has_optional_details: hasOptionalDetails,
          lead_id: leadId,
        });

        setResult({
          leadId,
          whatsappUrl: directWaUrl,
          applicantName: submittedName,
          serviceName: activeService,
        });
        showToast({
          variant: 'success',
          title: staticEndpoint
            ? t('কনসাল্টেশন অনুরোধ সফলভাবে গৃহীত হয়েছে', 'Consultation Request Received')
            : t('সরাসরি WhatsApp-এ পাঠানোর জন্য প্রস্তুত', 'Ready to Send on WhatsApp'),
          description: staticEndpoint
            ? t(
                `রেফারেন্স আইডি: ${leadId}। তাৎক্ষণিক কথা বলতে নিচের WhatsApp বাটন ব্যবহার করুন।`,
                `Reference ID: ${leadId}. Use WhatsApp below for immediate assistance.`
              )
            : t(
                'নিচের WhatsApp বাটনে ক্লিক করে আপনার তথ্য সরাসরি আমাদের টিমকে পাঠান।',
                'Tap the WhatsApp button below to send your details directly to our consultant.'
              ),
        });
        setValues({
          name: '',
          phone: '',
          service: resolvedDefaultService,
          country: defaultCountry,
          message: '',
          website_url: '',
        });
        setShowOptional(false);
        hasTrackedStartRef.current = false;
        setErrors({});
        onSuccess?.(leadId);
        return;
      }

      const response = await fetch(getApiUrl('/api/inquiry'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        const errMsg =
          data.error ||
          t(
            'দুঃখিত, ফর্ম জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে সরাসরি WhatsApp-এ যোগাযোগ করুন।',
            'Unable to submit right now. Please message us directly on WhatsApp.'
          );
        setServerError(errMsg);
        showToast({
          variant: 'error',
          title: t('ফর্ম জমা দেওয়া যায়নি', 'Submission Failed'),
          description: errMsg,
        });
        return;
      }

      trackAnalyticsEvent('form_submit', {
        form_type: formType,
        service: activeService,
        country: values.country || undefined,
        has_optional_details: hasOptionalDetails,
        lead_id: data.leadId,
      });

      setResult({
        leadId: data.leadId,
        whatsappUrl: data.whatsappUrl || pageCtx.whatsappUrl,
        applicantName: submittedName,
        serviceName: activeService,
      });
      showToast({
        variant: 'success',
        title: t('কনসাল্টেশন অনুরোধ সফলভাবে গৃহীত হয়েছে', 'Consultation Request Received'),
        description: t(
          `রেফারেন্স আইডি: ${data.leadId}। তাৎক্ষণিক কথা বলতে নিচের WhatsApp বাটন ব্যবহার করুন।`,
          `Reference ID: ${data.leadId}. Use WhatsApp below for immediate assistance.`
        ),
      });
      setValues({
        name: '',
        phone: '',
        service: resolvedDefaultService,
        country: defaultCountry,
        message: '',
        website_url: '',
      });
      setShowOptional(false);
      hasTrackedStartRef.current = false;
      setErrors({});
      onSuccess?.(data.leadId);
    } catch {
      const submittedName = values.name.trim();
      const fallbackWa = buildWhatsAppLink(
        `আসসালামু আলাইকুম, আমি ${submittedName} (${values.phone.trim()})। সার্ভিস: ${activeService}${
          values.country ? `, দেশ: ${values.country}` : ''
        }। ${values.message.trim() || pageCtx.whatsappMessageBn}`,
        locale
      );
      trackAnalyticsEvent('form_submit', {
        form_type: `${formType}_whatsapp_fallback`,
        service: activeService,
        has_optional_details: hasOptionalDetails,
      });
      setResult({
        leadId: 'WHATSAPP-DIRECT',
        whatsappUrl: fallbackWa,
        applicantName: submittedName,
        serviceName: activeService,
      });
      showToast({
        variant: 'info',
        title: t('সরাসরি WhatsApp-এ পাঠানোর জন্য প্রস্তুত', 'Ready to Send on WhatsApp'),
        description: t(
          'নিচের WhatsApp বাটনে ক্লিক করে আপনার তথ্য সরাসরি আমাদের টিমকে পাঠান।',
          'Tap the WhatsApp button below to send your details directly to our consultant.'
        ),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBlurCapture = (e: React.FocusEvent<HTMLFormElement>) => {
    const nextTarget = e.relatedTarget as Node | null;
    if (!nextTarget || !formRef.current?.contains(nextTarget)) {
      window.setTimeout(() => {
        if (!formRef.current?.contains(document.activeElement)) {
          setFormFocused(false);
        }
      }, 120);
    }
  };

  const dismissKeyboard = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setFormFocused(false);
  };

  if (result) {
    const nextSteps = [
      {
        numBn: '১',
        numEn: '1',
        titleBn: 'কনসালটেন্ট রিভিউ ও কল',
        titleEn: 'Consultant Review & Callback',
        descBn: 'আমাদের অভিজ্ঞ টিম আপনার অনুরোধ দেখে আপনার নম্বরে কল অথবা WhatsApp-এ যোগাযোগ করবেন।',
        descEn: 'Our consultant will review your inquiry and reach out via phone or WhatsApp.',
      },
      {
        numBn: '২',
        numEn: '2',
        titleBn: 'ফ্রি ডকুমেন্ট চেকলিস্ট ও স্বচ্ছ খরচের বিবরণ',
        titleEn: 'Free Document Checklist & Transparent Fee Breakdown',
        descBn: 'কোনো বাধ্যবাধকতা ছাড়াই প্রয়োজনীয় কাগজপত্র, প্রক্রিয়ার সময় ও খরচের স্পষ্ট ধারণা পাবেন।',
        descEn: 'Receive a clear document checklist, realistic timeline, and transparent fee breakdown with zero obligation.',
      },
      {
        numBn: '৩',
        numEn: '3',
        titleBn: 'অনলাইন বা সরাসরি রহনপুর অফিসে ফাইল প্রস্তুতি',
        titleEn: 'Online or In-Office File Preparation',
        descBn: 'চাইলে WhatsApp-এ অথবা আমাদের রহনপুর, চাঁপাইনবাবগঞ্জ অফিসে এসে ধাপে ধাপে আবেদন সম্পন্ন করুন।',
        descEn: 'Proceed remotely via WhatsApp or visit our Rohanpur, Chapai Nawabganj office.',
      },
    ];

    return (
      <div
        role="status"
        aria-live="polite"
        className={`rounded-2xl p-5 sm:p-7 border space-y-5 ${
          darkSurface
            ? 'bg-white/10 border-[#C9A24B]/55 text-white'
            : 'bg-[#FAF8F4] border-[#0F5132]/30 text-[#0B1F3A]'
        }`}
      >
        <div className="flex items-start gap-3.5">
          <span
            aria-hidden="true"
            className={`w-11 h-11 rounded-xl shrink-0 flex items-center justify-center ${
              darkSurface ? 'bg-[#C9A24B]/20 text-[#E2BE67]' : 'bg-[#0F5132]/12 text-[#0F5132]'
            }`}
          >
            <CheckCircle2 className="w-6 h-6" />
          </span>
          <div className="min-w-0">
            <p
              className={`text-xs font-semibold tracking-wider uppercase ${
                darkSurface ? 'text-[#E2BE67]' : 'text-[#0F5132]'
              }`}
            >
              {t('অনুরোধ সফলভাবে গৃহীত হয়েছে', 'Request Successfully Received')}
            </p>
            <p className="font-bold text-base sm:text-lg mt-0.5 leading-snug">
              {t(
                `ধন্যবাদ${result.applicantName ? `, ${result.applicantName}` : ''}! আপনার কনসাল্টেশন নথিভুক্ত হয়েছে।`,
                `Thank you${result.applicantName ? `, ${result.applicantName}` : ''}! Your consultation request is logged.`
              )}
            </p>
            <p
              className={`mt-1.5 text-xs sm:text-sm tabular-nums ${
                darkSurface ? 'text-white/80' : 'text-[#525B68]'
              }`}
            >
              {t('রেফারেন্স আইডি:', 'Reference ID:')}{' '}
              <strong className={darkSurface ? 'text-white' : 'text-[#0B1F3A]'}>
                {result.leadId}
              </strong>{' '}
              · {result.serviceName}
            </p>
          </div>
        </div>

        {/* Next-Step Guidance */}
        <div
          className={`rounded-xl p-4 sm:p-5 border ${
            darkSurface
              ? 'bg-[#071529]/55 border-white/12'
              : 'bg-white border-[#0B1F3A]/10'
          }`}
        >
          <p
            className={`text-xs font-bold uppercase tracking-wider mb-3 ${
              darkSurface ? 'text-[#E2BE67]' : 'text-[#7D5D14]'
            }`}
          >
            {t('পরবর্তী ধাপসমূহ', 'What Happens Next')}
          </p>
          <ol className="space-y-3">
            {nextSteps.map((step) => (
              <li key={step.numEn} className="flex items-start gap-3 text-xs sm:text-sm">
                <span
                  aria-hidden="true"
                  className={`w-6 h-6 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold mt-0.5 ${
                    darkSurface
                      ? 'bg-[#C9A24B] text-[#0B1F3A]'
                      : 'bg-[#0B1F3A] text-[#C9A24B]'
                  }`}
                >
                  {isEn ? step.numEn : step.numBn}
                </span>
                <div className="min-w-0 leading-[1.68]">
                  <p className={`font-bold ${darkSurface ? 'text-white' : 'text-[#0B1F3A]'}`}>
                    {t(step.titleBn, step.titleEn)}
                  </p>
                  <p className={darkSurface ? 'text-white/80' : 'text-[#4B5563]'}>
                    {t(step.descBn, step.descEn)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Immediate Actions */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
          <a
            href={result.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackAnalyticsEvent('whatsapp_click', {
                location: 'form_success',
                form_type: formType,
              })
            }
            className="btn-primary btn-sm w-full sm:w-auto"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            {t('WhatsApp-এ তাৎক্ষণিক পাঠান', 'Send Now on WhatsApp')}
          </a>

          <a
            href={siteConfig.contact.phoneHref}
            onClick={() =>
              trackAnalyticsEvent('call_click', {
                location: 'form_success',
                form_type: formType,
              })
            }
            className={`${darkSurface ? 'btn-secondary-light' : 'btn-secondary'} btn-sm w-full sm:w-auto tabular-nums`}
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            {siteConfig.contact.phoneDisplay}
          </a>

          <button
            type="button"
            onClick={() => setResult(null)}
            className={`min-h-[44px] px-2 text-xs sm:text-sm font-semibold underline cursor-pointer ${
              darkSurface ? 'text-white/85 hover:text-white' : 'text-[#525B68] hover:text-[#0B1F3A]'
            }`}
          >
            {t('নতুন আরেকটি অনুরোধ পাঠান', 'Submit another inquiry')}
          </button>
        </div>
      </div>
    );
  }

  const labelClass = `block text-xs font-semibold mb-2 ${
    darkSurface ? 'text-white/95' : 'text-[#0B1F3A]'
  }`;
  // Strict 16px (text-base) on mobile to prevent iOS Safari zoom on input focus
  const inputClass = `w-full min-h-[48px] px-4 py-3 rounded-xl text-base sm:text-sm border transition-colors ${
    darkSurface
      ? 'bg-white/10 border-white/25 text-white placeholder:text-white/70 focus:border-[#E2BE67]'
      : 'bg-[#FAF8F4] border-[#0B1F3A]/20 text-[#1A1A1A] placeholder:text-[#596270] focus:bg-white focus:border-[#0B1F3A]'
  }`;
  const errorTextClass = darkSurface
    ? 'mt-1.5 text-xs font-medium text-red-300'
    : 'mt-1.5 text-xs font-medium text-red-700';
  const nameErrorId = `${uid}-name-error`;
  const phoneErrorId = `${uid}-phone-error`;

  const ctaText = submitLabel || t('ফ্রি কনসাল্টেশন নিন', 'Request Free Consultation');
  const activeButtonText = isSubmitting
    ? t('অনুরোধ পাঠানো হচ্ছে...', 'Submitting request...')
    : ctaText;
  const showKeyboardBar = isMobileViewport && formFocused && !stickyInsideModal;
  const responseClaim = siteConfig.leadGeneration.responseTimeClaim;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onFocusCapture={() => {
        setFormFocused(true);
        trackFormStartOnce();
      }}
      onBlurCapture={handleBlurCapture}
      aria-busy={isSubmitting}
      className="space-y-4"
      noValidate
    >
      {/* Honeypot anti-spam field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input
          id={`${uid}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website_url}
          onChange={(e) => handleFieldChange('website_url', e.target.value)}
        />
      </div>

      <fieldset disabled={isSubmitting} className="space-y-4 disabled:opacity-75 transition-opacity">
      {/* Step 1: Minimal Friction Core Fields (Name + WhatsApp Number Only) */}
      <div className={compact ? 'space-y-4' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
        <div>
          <label htmlFor={`${uid}-name`} className={labelClass}>
            {t('আপনার নাম *', 'Full Name *')}
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            inputMode="text"
            autoComplete="name"
            enterKeyHint="next"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? nameErrorId : undefined}
            placeholder={t('যেমন: মো. রফিকুল ইসলাম', 'e.g. Md. Rafiqul Islam')}
            value={values.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            className={inputClass}
          />
          {errors.name && (
            <p id={nameErrorId} role="alert" className={errorTextClass}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${uid}-phone`} className={labelClass}>
            {t('WhatsApp / মোবাইল নম্বর *', 'WhatsApp / Mobile Number *')}
          </label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint={showOptional ? 'next' : 'send'}
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? phoneErrorId : undefined}
            placeholder="017XX-XXXXXX"
            value={values.phone}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            className={`${inputClass} tabular-nums`}
          />
          {errors.phone && (
            <p id={phoneErrorId} role="alert" className={errorTextClass}>
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Progressive Disclosure Trigger for Optional Details */}
      <div>
        <button
          type="button"
          onClick={() => {
            trackFormStartOnce();
            setShowOptional((prev) => !prev);
          }}
          aria-expanded={showOptional}
          aria-controls={`${uid}-optional-fields`}
          className={`min-h-[44px] w-full flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl border border-dashed text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
            darkSurface
              ? 'border-white/25 text-white/85 hover:border-[#C9A24B] hover:text-white bg-white/[0.03]'
              : 'border-[#0B1F3A]/20 text-[#374151] hover:border-[#C9A24B] hover:text-[#0B1F3A] bg-[#FAF8F4]/70'
          }`}
        >
          <span className="inline-flex items-center gap-2 text-left">
            {showOptional ? (
              <Minus className="w-4 h-4 text-[#C9A24B] shrink-0" aria-hidden="true" />
            ) : (
              <Plus className="w-4 h-4 text-[#C9A24B] shrink-0" aria-hidden="true" />
            )}
            <span>
              {showOptional
                ? t('অতিরিক্ত তথ্য লুকান', 'Hide optional details')
                : t(
                    'সার্ভিস, দেশ বা প্রশ্ন যোগ করুন (ঐচ্ছিক)',
                    'Add service, destination or note (optional)'
                  )}
            </span>
          </span>
          {!showOptional && values.service && values.service !== 'General Consultation' && (
            <span
              className={`text-xs font-semibold truncate max-w-[140px] ${
                darkSurface ? 'text-[#C9A24B]' : 'text-[#7D5D14]'
              }`}
            >
              {values.service}
            </span>
          )}
        </button>

        {showOptional && (
          <div id={`${uid}-optional-fields`} className="mt-4 space-y-4">
            <div className={compact ? 'space-y-4' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
              <div>
                <label htmlFor={`${uid}-service`} className={labelClass}>
                  {t('সার্ভিস নির্বাচন (ঐচ্ছিক)', 'Service (Optional)')}
                </label>
                <select
                  id={`${uid}-service`}
                  name="service"
                  value={values.service}
                  onChange={(e) => handleFieldChange('service', e.target.value)}
                  className={inputClass}
                >
                  <option value="General Consultation" className="text-[#1A1A1A]">
                    {t('সাধারণ পরামর্শ / নিশ্চিত নই', 'General Consultation / Not sure yet')}
                  </option>
                  {serviceSummaries.map((s) => (
                    <option key={s.slug} value={s.titleEn} className="text-[#1A1A1A]">
                      {isEn ? s.titleEn : s.titleBn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor={`${uid}-country`} className={labelClass}>
                  {t('পছন্দের দেশ / গন্তব্য (ঐচ্ছিক)', 'Destination Country (Optional)')}
                </label>
                <select
                  id={`${uid}-country`}
                  name="country"
                  autoComplete="country-name"
                  value={values.country}
                  onChange={(e) => handleFieldChange('country', e.target.value)}
                  className={inputClass}
                >
                  <option value="" className="text-[#1A1A1A]">
                    {t('দেশ নির্বাচন করুন (ঐচ্ছিক)', 'Choose country (optional)')}
                  </option>
                  {destinationSummaries.map((d) => (
                    <option key={d.slug} value={d.nameEn} className="text-[#1A1A1A]">
                      {isEn ? d.nameEn : d.nameBn}
                    </option>
                  ))}
                  <option value="Other" className="text-[#1A1A1A]">
                    {t('অন্যান্য দেশ', 'Other Country')}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor={`${uid}-message`} className={labelClass}>
                {t('সংক্ষিপ্ত প্রশ্ন বা বিবরণ (ঐচ্ছিক)', 'Short Message (Optional)')}
              </label>
              <textarea
                id={`${uid}-message`}
                name="message"
                rows={compact ? 2 : 3}
                enterKeyHint="send"
                placeholder={t(
                  'সম্ভাব্য ভ্রমণের তারিখ, যাত্রী সংখ্যা বা আপনার প্রশ্ন লিখুন...',
                  'Share approximate dates, number of travelers, or your question...'
                )}
                value={values.message}
                onChange={(e) => handleFieldChange('message', e.target.value)}
                className={`${inputClass} min-h-[84px]`}
              />
            </div>
          </div>
        )}
      </div>

      </fieldset>

      {serverError && (
        <div role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 p-4 text-xs text-red-700 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Standard inline submit button (or pinned sticky bottom bar inside modal sheets) */}
      <div
        className={
          stickyInsideModal
            ? 'sticky bottom-0 -mx-5 sm:-mx-8 px-5 sm:px-8 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] bg-white/95 backdrop-blur-sm border-t border-[#0B1F3A]/10'
            : ''
        }
      >
        <button type="submit" disabled={isSubmitting} className="w-full btn-primary">
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
          <span>{activeButtonText}</span>
        </button>
      </div>

      {/* Verified Trust Cues Near Form */}
      <div
        className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs ${
          darkSurface ? 'text-white/90' : 'text-[#374151]'
        }`}
      >
        <span className="inline-flex items-center gap-1.5 font-medium">
          <ShieldCheck className={`w-3.5 h-3.5 shrink-0 ${darkSurface ? 'text-[#C9A24B]' : 'text-[#7D5D14]'}`} aria-hidden="true" />
          {t('ফ্রি কনসাল্টেশন, কোনো বাধ্যবাধকতা নেই', 'Free consultation, no obligation')}
        </span>
        <span className="inline-flex items-center gap-1.5 font-medium">
          <Lock className={`w-3.5 h-3.5 shrink-0 ${darkSurface ? 'text-[#C9A24B]' : 'text-[#7D5D14]'}`} aria-hidden="true" />
          {t('আপনার তথ্য সুরক্ষিত', 'Your information is kept private')}
        </span>
        {responseClaim.ownerConfirmed && (
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Clock className={`w-3.5 h-3.5 shrink-0 ${darkSurface ? 'text-[#C9A24B]' : 'text-[#7D5D14]'}`} aria-hidden="true" />
            {t(responseClaim.textBn, responseClaim.textEn)}
          </span>
        )}
      </div>

      <SecureFormBadge darkSurface={darkSurface} />

      <p className={`text-xs leading-[1.65] ${darkSurface ? 'text-white/80' : 'text-[#525B68]'}`}>
        {t(
          'ভিসার চূড়ান্ত সিদ্ধান্ত সংশ্লিষ্ট Embassy-র; আমরা সৎ ডকুমেন্টেশন ও স্বচ্ছ পরামর্শে সহায়তা করি।',
          'Final visa decisions belong strictly to the respective Embassy; we provide honest documentation guidance.'
        )}
      </p>

      {/* Mobile Keyboard-Aware Sticky Submit Bar (docks right above soft keyboard while typing) */}
      {showKeyboardBar && (
        <div
          style={{ bottom: `${keyboardOffset}px` }}
          className="lg:hidden fixed inset-x-0 z-50 bg-[#0B1F3A]/96 backdrop-blur-md border-t border-[#C9A24B]/40 px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-[0_-10px_28px_rgba(4,12,24,0.32)] flex items-center gap-2"
        >
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={dismissKeyboard}
            aria-label={t('কিবোর্ড বন্ধ করুন', 'Dismiss keyboard')}
            className="w-12 h-12 rounded-xl border border-white/20 bg-white/8 text-white inline-flex items-center justify-center shrink-0 cursor-pointer"
          >
            <ChevronDown className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            onMouseDown={(e) => e.preventDefault()}
            className="flex-1 btn-primary min-h-[48px]"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="w-4 h-4" aria-hidden="true" />
            )}
            <span>{activeButtonText}</span>
          </button>
        </div>
      )}
    </form>
  );
}
