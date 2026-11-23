import { useState } from 'react';
import { Search, CheckCircle2, Clock, MessageCircle, AlertCircle, Loader2 } from 'lucide-react';
import type { ApplicationTrackRecord } from '../data/siteContent';
import { buildWhatsAppLink } from '../config/site';
import { SeoHead, buildBreadcrumbSchema, trackAnalyticsEvent } from '../lib/seo';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HeroCtaRow } from '../components/HeroCtaRow';
import { CtaBanner } from '../components/CtaBanner';
import { ListSkeleton } from '../components/Skeletons';

const STEPS = [
  { step: 1, bn: 'ফাইল গৃহীত (Received)', en: 'Received' },
  { step: 2, bn: 'প্রসেসিং চলছে (Processing)', en: 'Processing' },
  { step: 3, bn: 'Embassy / IVAC জমা (Submitted)', en: 'Submitted' },
  { step: 4, bn: 'সম্পন্ন / প্রস্তুত (Done)', en: 'Done' },
];

export function TrackApplicationPage() {
  const { isEn, locale, t } = useLanguage();
  const { showToast } = useToast();
  const [appId, setAppId] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [record, setRecord] = useState<ApplicationTrackRecord | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setRecord(null);

    if (!appId.trim() || phone.trim().length < 4) {
      setError(
        t(
          'অনুগ্রহ করে সঠিক Application ID এবং মোবাইল নম্বর লিখুন।',
          'Please enter both a valid Application ID and your mobile number.'
        )
      );
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch(
        `/api/track?applicationId=${encodeURIComponent(appId.trim())}&phone=${encodeURIComponent(phone.trim())}`
      );
      const data = await resp.json();
      if (!resp.ok || !data.ok) {
        setError(data.error || t('কোনো রেকর্ড পাওয়া যায়নি।', 'No matching application found.'));
      } else {
        setRecord(data.record);
        showToast({
          variant: 'success',
          durationMs: 3600,
          title: t('আবেদনের তথ্য পাওয়া গেছে', 'Application Status Loaded'),
          description: `${data.record.applicationId} — ${isEn ? data.record.serviceEn : data.record.serviceBn}`,
        });
      }
    } catch {
      const msg = t('নেটওয়ার্ক সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।', 'Network error. Please try again.');
      setError(msg);
      showToast({
        variant: 'error',
        title: t('সংযোগ ব্যর্থ হয়েছে', 'Connection Error'),
        description: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  const tryDemo = (sampleId: string) => {
    setAppId(sampleId);
    setPhone('01771304219');
  };

  return (
    <>
      <SeoHead
        title={t('আবেদনের অগ্রগতি যাচাই করুন | Visatrip Global', 'Track Your Visa Application | Visatrip Global')}
        description={t(
          'আপনার Application ID ও মোবাইল নম্বর দিয়ে Visatrip Global-এ জমাকৃত ভিসা বা ট্রাভেল ফাইলের বর্তমান স্ট্যাটাস জানুন।',
          'Check the real-time stage of your visa or travel application at Visatrip Global.'
        )}
        canonicalPath="/track-application"
        locale={locale}
        robotsContent="noindex, follow"
        schemas={[
          buildBreadcrumbSchema(
            [
              { name: t('হোম', 'Home'), path: '/' },
              { name: t('আবেদন ট্র্যাক করুন', 'Track Application'), path: '/track-application' },
            ],
            locale
          ),
        ]}
      />

      <section className="bg-navy-hero text-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Breadcrumbs
            light
            items={[
              { label: t('হোম', 'Home'), to: '/' },
              { label: t('Track Your Application', 'Track Your Application') },
            ]}
          />
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[#C9A24B]" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#C9A24B]">
              {t('লাইভ ফাইল স্ট্যাটাস', 'Live File Tracker')}
            </p>
          </div>
          <h1 className="heading-h1 text-white max-w-3xl">
            {t('আপনার আবেদনের বর্তমান অবস্থা জানুন', 'Track Your Application Status')}
          </h1>
          <p className="body-lead mt-6 text-white/85 max-w-2xl">
            {t(
              'অফিস থেকে প্রাপ্ত Application ID এবং নিবন্ধিত মোবাইল নম্বর দিয়ে আপনার ফাইলের বর্তমান ধাপ দেখুন।',
              'Enter the Application ID provided by our office and your registered mobile number.'
            )}
          </p>
          <HeroCtaRow
            primaryHref="#track-form"
            primaryLabelBn="স্ট্যাটাস চেক করুন"
            primaryLabelEn="Check File Status"
            locationId="track_application_hero"
            showCallLink
          />
        </div>
      </section>

      <section id="track-form" className="py-16 sm:py-24 bg-[#FAF8F4] scroll-mt-24">
        <div className="max-w-[840px] mx-auto px-4 sm:px-6 space-y-8">
          <form onSubmit={handleLookup} aria-busy={loading} className="card-surface p-6 sm:p-8 space-y-6" noValidate>
            <fieldset disabled={loading} className="grid grid-cols-1 sm:grid-cols-2 gap-4 disabled:opacity-75 transition-opacity">
              <div>
                <label htmlFor="track-id" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
                  {t('Application ID *', 'Application ID *')}
                </label>
                <input
                  id="track-id"
                  name="applicationId"
                  type="text"
                  inputMode="text"
                  autoCapitalize="characters"
                  autoCorrect="off"
                  autoComplete="off"
                  spellCheck={false}
                  enterKeyHint="next"
                  required
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'track-form-error' : undefined}
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                  placeholder="VTG-2026-101"
                  className="w-full min-h-[48px] px-4 rounded-xl border border-[#0B1F3A]/20 bg-[#FAF8F4] focus:bg-white focus:border-[#0B1F3A] text-base sm:text-sm uppercase tabular-nums placeholder:text-[#596270] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="track-phone" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
                  {t('নিবন্ধিত মোবাইল নম্বর *', 'Registered Mobile Number *')}
                </label>
                <input
                  id="track-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  enterKeyHint="search"
                  required
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'track-form-error' : undefined}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XX-XXXXXX"
                  className="w-full min-h-[48px] px-4 rounded-xl border border-[#0B1F3A]/20 bg-[#FAF8F4] focus:bg-white focus:border-[#0B1F3A] text-base sm:text-sm tabular-nums placeholder:text-[#596270] transition-colors"
                />
              </div>
            </fieldset>

            {error && (
              <div
                id="track-form-error"
                role="alert"
                className="flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700 font-medium"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              ) : (
                <Search className="w-4 h-4" aria-hidden="true" />
              )}
              {loading ? t('তথ্য খোঁজা হচ্ছে...', 'Checking status...') : t('স্ট্যাটাস দেখুন', 'Check Status')}
            </button>

            {/* Sample Demo IDs for Testing (44px touch height) */}
            <div className="pt-4 border-t border-[#0B1F3A]/8 text-xs text-[#525B68] flex flex-wrap items-center gap-2">
              <span className="w-full sm:w-auto">{t('নমুনা টেস্ট করতে ক্লিক করুন:', 'Try sample IDs:')}</span>
              {['VTG-2026-101', 'VTG-2026-102', 'VTG-2026-103'].map((sample) => (
                <button
                  key={sample}
                  type="button"
                  disabled={loading}
                  onClick={() => tryDemo(sample)}
                  className="min-h-[44px] px-3.5 rounded-xl bg-[#FAF8F4] border border-[#0B1F3A]/15 text-[#0B1F3A] font-semibold hover:border-[#C9A24B] cursor-pointer tabular-nums transition-colors disabled:opacity-60"
                >
                  {sample}
                </button>
              ))}
            </div>
          </form>

          <div aria-live="polite">
            {loading && <ListSkeleton variant="timeline" />}
            {!loading && record && (
              <div className="card-surface border-[#C9A24B]/50 p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-[#0B1F3A]/10">
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-[#7D5D14] tabular-nums">
                      {record.applicationId} · {isEn ? record.countryEn : record.countryBn}
                    </p>
                    <h2 className="heading-h3 text-[#0B1F3A] mt-1">
                      {isEn ? record.serviceEn : record.serviceBn}
                    </h2>
                    <p className="text-xs text-[#525B68] mt-1">
                      {t('আবেদনকারী:', 'Applicant:')} {record.applicantInitials} ·{' '}
                      {t('সর্বশেষ আপডেট:', 'Updated:')} {record.updatedAt}
                    </p>
                  </div>
                  {record.isDemoSample && (
                    <span className="text-xs font-medium text-[#525B68]">
                      {t('নমুনা ট্র্যাকিং ডেটা', 'Sample Demo Data')}
                    </span>
                  )}
                </div>

                {/* 4-Step Progress Bar */}
                <ol
                  aria-label={t('আবেদনের ধাপসমূহ', 'Application progress stages')}
                  className="grid grid-cols-1 sm:grid-cols-4 gap-4"
                >
                  {STEPS.map((st) => {
                    const completed = record.currentStep >= st.step;
                    const active = record.currentStep === st.step;
                    return (
                      <li
                        key={st.step}
                        aria-current={active ? 'step' : undefined}
                        className={`rounded-xl p-4 border ${
                          active
                            ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                            : completed
                            ? 'bg-[#0F5132]/8 text-[#0F5132] border-[#0F5132]/25'
                            : 'bg-[#FAF8F4] text-[#525B68] border-[#0B1F3A]/10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-editorial text-sm font-bold tabular-nums">0{st.step}</span>
                          {completed ? (
                            <CheckCircle2
                              className={`w-4 h-4 ${active ? 'text-[#C9A24B]' : 'text-[#0F5132]'}`}
                              aria-hidden="true"
                            />
                          ) : (
                            <Clock className="w-4 h-4 opacity-60" aria-hidden="true" />
                          )}
                        </div>
                        <div className="text-xs sm:text-sm font-semibold leading-snug">
                          {isEn ? st.en : st.bn}
                        </div>
                      </li>
                    );
                  })}
                </ol>

                <div className="rounded-xl bg-[#FAF8F4] p-5 border border-[#0B1F3A]/8 text-sm text-[#374151] leading-[1.75]">
                  <strong className="text-[#0B1F3A]">{t('কনসালটেন্ট নোট:', 'Latest Update Note:')}</strong>{' '}
                  {isEn ? record.noteEn : record.noteBn}
                </div>

                <a
                  href={buildWhatsAppLink(
                    `আসসালামু আলাইকুম, আমার Application ID: ${record.applicationId} সম্পর্কে আপডেট জানতে চাই।`,
                    locale
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackAnalyticsEvent('whatsapp_click', {
                      location: 'track_application_result',
                      prefilled_topic: record.applicationId,
                    })
                  }
                  className="btn-navy btn-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />
                  {t('এই ফাইল নিয়ে WhatsApp-এ কথা বলুন', 'Ask About This File on WhatsApp')}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
