import { lazy, Suspense, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, Clock, ShieldAlert, FileDown, ArrowRight, Wallet } from 'lucide-react';
import { visaRequirementsData } from '../data/visaRequirements';
import {
  SeoHead,
  buildBreadcrumbSchema,
  buildWebApplicationSchema,
  trackAnalyticsEvent,
} from '../lib/seo';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HeroCtaRow } from '../components/HeroCtaRow';
import { CtaBanner } from '../components/CtaBanner';
import {
  LicenseStrip,
  VerifiedDateStamp,
  TransparentFeeNote,
  PaymentReceiptNotice,
  OfficialSourcesNote,
} from '../components/TrustSignals';

const ChecklistModal = lazy(() =>
  import('../components/ChecklistModal').then((mod) => ({ default: mod.ChecklistModal }))
);

export function VisaCheckerPage() {
  const { isEn, locale, localizedPath, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialCountry = searchParams.get('country') || 'dubai';

  const countries = useMemo(() => {
    const map = new Map<string, { slug: string; bn: string; en: string }>();
    visaRequirementsData.forEach((r) => {
      if (!map.has(r.countrySlug)) {
        map.set(r.countrySlug, { slug: r.countrySlug, bn: r.countryBn, en: r.countryEn });
      }
    });
    return Array.from(map.values());
  }, []);

  const [countrySlug, setCountrySlug] = useState(
    countries.some((c) => c.slug === initialCountry) ? initialCountry : countries[0].slug
  );

  const availableTypes = useMemo(
    () => visaRequirementsData.filter((r) => r.countrySlug === countrySlug),
    [countrySlug]
  );

  const [selectedVisaType, setSelectedVisaType] = useState<string>(availableTypes[0]?.visaType || 'Tourist');

  const activeRule =
    availableTypes.find((r) => r.visaType === selectedVisaType) || availableTypes[0];

  const [checklistOpen, setChecklistOpen] = useState(false);

  const handleCountryChange = (nextSlug: string) => {
    setCountrySlug(nextSlug);
    const matching = visaRequirementsData.filter((r) => r.countrySlug === nextSlug);
    if (matching.length > 0 && !matching.some((m) => m.visaType === selectedVisaType)) {
      setSelectedVisaType(matching[0].visaType);
    }
  };

  return (
    <>
      <SeoHead
        title={t('ভিসা ডকুমেন্ট চেকার বাংলাদেশ | Visatrip Global', 'Free Visa Requirement Checker | Visatrip Global')}
        description={t(
          'দেশ ও ভিসার ধরন বেছে নিয়ে বাংলাদেশ থেকে প্রয়োজনীয় ডকুমেন্ট, ব্যাংক সলভেন্সি ও সম্ভাব্য প্রসেসিং সময় জানুন ফ্রি।',
          'Select destination country and visa type to view required documents, solvency tips, and processing times from Bangladesh.'
        )}
        canonicalPath="/visa-checker"
        locale={locale}
        schemas={[
          buildBreadcrumbSchema(
            [
              { name: t('হোম', 'Home'), path: '/' },
              { name: t('Visa Requirement Checker', 'Visa Requirement Checker'), path: '/visa-checker' },
            ],
            locale
          ),
          buildWebApplicationSchema({
            name: t('Visatrip Global Visa Requirement Checker', 'Visatrip Global Visa Requirement Checker'),
            description: t(
              'বাংলাদেশি যাত্রীদের জন্য ফ্রি ভিসা ডকুমেন্ট চেকলিস্ট ও প্রসেসিং সময় যাচাই টুল।',
              'Free interactive visa document checklist and processing time checker for Bangladeshi travelers.'
            ),
            path: '/visa-checker',
            locale,
          }),
        ]}
      />

      <section className="bg-navy-hero text-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Breadcrumbs
            light
            items={[
              { label: t('হোম', 'Home'), to: '/' },
              { label: t('Visa Requirement Checker', 'Visa Requirement Checker') },
            ]}
          />
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[#C9A24B]" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#C9A24B]">
              {t('ইন্টারেক্টিভ চেকলিস্ট টুল', 'Interactive Visa Tool')}
            </p>
          </div>
          <h1 className="heading-h1 text-white max-w-3xl">
            {t('ফ্রি Visa Requirement Checker', 'Free Visa Requirement Checker')}
          </h1>
          <p className="body-lead mt-6 text-white/85 max-w-2xl">
            {t(
              'আপনার পছন্দের দেশ ও ভিসার ধরন বেছে নিন — তাৎক্ষণিক ডকুমেন্ট চেকলিস্ট ও সম্ভাব্য প্রসেসিং সময় দেখুন।',
              'Choose your destination country and visa category to inspect core required documents and estimated timelines.'
            )}
          </p>
          <div className="mt-5">
            <VerifiedDateStamp light />
          </div>
          <HeroCtaRow
            primaryHref="#visa-checker-tool"
            primaryLabelBn="চেকলিস্ট দেখুন"
            primaryLabelEn="Check Requirements Now"
            locationId="visa_checker_hero"
          />
        </div>
      </section>

      <section id="visa-checker-tool" className="py-16 sm:py-24 bg-[#FAF8F4] scroll-mt-24">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 space-y-8">
          <LicenseStrip variant="white" />
          {/* Interactive Selector Box */}
          <div className="card-surface border-[#C9A24B]/45 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="vc-country" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
                {t('১. দেশ নির্বাচন করুন', '1. Select Country')}
              </label>
              <select
                id="vc-country"
                value={countrySlug}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full min-h-[48px] px-4 rounded-xl border border-[#0B1F3A]/12 bg-[#FAF8F4] focus:bg-white focus:border-[#C9A24B] text-base sm:text-sm font-medium text-[#0B1F3A] transition-colors"
              >
                {countries.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {isEn ? c.en : c.bn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span id="vc-type-label" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
                {t('২. ভিসার ধরন বেছে নিন', '2. Select Visa Type')}
              </span>
              <div role="group" aria-labelledby="vc-type-label" className="flex flex-wrap gap-2">
                {availableTypes.map((rule) => (
                  <button
                    key={rule.visaType}
                    type="button"
                    aria-pressed={activeRule.visaType === rule.visaType}
                    onClick={() => setSelectedVisaType(rule.visaType)}
                    className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                      activeRule.visaType === rule.visaType
                        ? 'bg-[#0B1F3A] text-white'
                        : 'bg-[#FAF8F4] border border-[#0B1F3A]/15 text-[#374151] hover:border-[#C9A24B]'
                    }`}
                  >
                    {isEn ? rule.visaTypeEn : rule.visaTypeBn}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div aria-live="polite">
            {activeRule && (
              <div className="card-surface p-6 sm:p-8 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#0B1F3A]/10">
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-[#7D5D14]">
                      {isEn ? activeRule.countryEn : activeRule.countryBn}
                    </p>
                    <h2 className="heading-h2 text-[#0B1F3A] mt-1">
                      {isEn ? activeRule.visaTypeEn : activeRule.visaTypeBn}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      trackAnalyticsEvent('lead_magnet_click', {
                        trigger: 'inline_visa_checker',
                        location: 'visa_checker_result',
                        checklist_id: `visa-checker-${activeRule.countrySlug}-${activeRule.visaType.toLowerCase()}`,
                        service: `${activeRule.countryEn} ${activeRule.visaType}`,
                      });
                      setChecklistOpen(true);
                    }}
                    className="btn-secondary btn-sm shrink-0"
                  >
                    <FileDown className="w-4 h-4 text-[#7D5D14]" aria-hidden="true" />
                    {t('চেকলিস্ট PDF ডাউনলোড করুন', 'Download Checklist PDF')}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="rounded-xl bg-[#FAF8F4] p-5 border border-[#0B1F3A]/8">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7D5D14]">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      {t('সম্ভাব্য প্রসেসিং সময় ও মেয়াদ', 'Estimated Time & Validity')}
                    </div>
                    <p className="mt-2 text-sm font-bold text-[#0B1F3A] leading-[1.7]">
                      {isEn ? activeRule.estimatedTimeEn : activeRule.estimatedTimeBn}
                    </p>
                    <p className="mt-1 text-xs text-[#525B68] leading-[1.6]">
                      {isEn ? activeRule.validityEn : activeRule.validityBn}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#FAF8F4] p-5 border border-[#0B1F3A]/8">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7D5D14]">
                      <Wallet className="w-4 h-4" aria-hidden="true" />
                      {t('আর্থিক ও বিশেষ নোট', 'Financial / Solvency Note')}
                    </div>
                    <p className="mt-2 text-sm font-medium text-[#0B1F3A] leading-[1.7]">
                      {isEn ? activeRule.solvencyNoteEn : activeRule.solvencyNoteBn}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="heading-h3 text-[#0B1F3A] mb-4">
                    {t('প্রয়োজনীয় ডকুমেন্টের তালিকা', 'Required Documents')}
                  </h3>
                  <ul className="space-y-3">
                    {(isEn ? activeRule.documentsEn : activeRule.documentsBn).map((doc) => (
                      <li key={doc} className="flex items-start gap-3 text-[15px] text-[#374151] leading-[1.75]">
                        <Check className="w-4 h-4 text-[#7D5D14] shrink-0 mt-1.5" aria-hidden="true" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mandatory Disclaimer + Transparent Fee & Receipt Policy */}
                <div className="space-y-3">
                  <div className="rounded-xl bg-[#FFFDF7] border border-[#C9A24B]/50 p-5 flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-[#7D5D14] shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="space-y-1.5">
                      <p className="text-xs sm:text-sm text-[#4B5563] leading-[1.75]">
                        <strong className="text-[#0B1F3A]">{t('গুরুত্বপূর্ণ ডিসক্লেইমার:', 'Important Disclaimer:')}</strong>{' '}
                        {t(
                          'এটি সাধারণ গাইডলাইন। Embassy-র নিয়ম পরিবর্তন হতে পারে। চূড়ান্ত ভিসা অনুমোদন সম্পূর্ণরূপে সংশ্লিষ্ট দেশের Embassy বা ইমিগ্রেশন কর্তৃপক্ষের এখতিয়ারভুক্ত।',
                          'This is a general guideline. Embassy regulations may change at any time, and final visa approval belongs strictly to the Embassy or immigration authority.'
                        )}
                      </p>
                      <VerifiedDateStamp />
                    </div>
                  </div>
                  <TransparentFeeNote variant="inline" />
                  <PaymentReceiptNotice variant="inline" />
                </div>

              <OfficialSourcesNote
                tags={[activeRule.countrySlug, activeRule.serviceSlug, 'visa-checker']}
                variant="light"
              />

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#consultation"
                  onClick={() =>
                    trackAnalyticsEvent('cta_click', {
                      cta_label: 'Consult Free for This Visa',
                      cta_location: 'visa_checker_result',
                      service: `${activeRule.countryEn} ${activeRule.visaType}`,
                    })
                  }
                  className="btn-primary"
                >
                  {t('এই ভিসার জন্য ফ্রি কনসাল্টেশন নিন', 'Consult Free for This Visa')}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  to={localizedPath(`/services/${activeRule.serviceSlug}`)}
                  onClick={() =>
                    trackAnalyticsEvent('cta_click', {
                      cta_label: 'View Full Service Guide',
                      cta_location: 'visa_checker_result',
                      service: activeRule.serviceSlug,
                    })
                  }
                  className="btn-secondary"
                >
                  {t('সংশ্লিষ্ট সার্ভিস পেজ দেখুন', 'View Full Service Guide')}
                </Link>
              </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <CtaBanner defaultCountry={activeRule?.countryEn} />

      {activeRule && checklistOpen && (
        <Suspense fallback={null}>
          <ChecklistModal
            open={checklistOpen}
            onClose={() => setChecklistOpen(false)}
            title={`${isEn ? activeRule.countryEn : activeRule.countryBn} — ${
              isEn ? activeRule.visaTypeEn : activeRule.visaTypeBn
            }`}
            serviceName={`${activeRule.countryEn} ${activeRule.visaType}`}
            documents={isEn ? activeRule.documentsEn : activeRule.documentsBn}
            documentsEn={activeRule.documentsEn}
            pdfTitleEn={`${activeRule.countryEn} ${activeRule.visaTypeEn} Document Checklist`}
            checklistId={`visa-checker-${activeRule.countrySlug}-${activeRule.visaType.toLowerCase()}`}
          />
        </Suspense>
      )}
    </>
  );
}
