import { ShieldCheck, FileCheck2, MapPin, ShieldAlert } from 'lucide-react';
import { siteConfig, getActiveLicenses } from '../config/site';
import { SeoHead, buildBreadcrumbSchema } from '../lib/seo';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HeroCtaRow } from '../components/HeroCtaRow';
import { CtaBanner } from '../components/CtaBanner';
import {
  LicenseStrip,
  HonestyPledgeBlock,
  PaymentReceiptNotice,
  TransparentFeeNote,
  OfficialSourcesNote,
} from '../components/TrustSignals';

export function LicensesPage() {
  const { isEn, locale, t } = useLanguage();
  const activeLicenses = getActiveLicenses();

  return (
    <>
      <SeoHead
        title={t('লাইসেন্স, নিবন্ধন ও যাচাইকরণ | Visatrip Global', 'Licenses & Agency Credentials | Visatrip Global')}
        description={t(
          'Visatrip Global-এর Trade License, TIN, HAB ও BMET নিবন্ধন যাচাইকরণ এবং নিরাপদ লেনদেনের স্বচ্ছ নীতিমালা।',
          'Verify Visatrip Global’s business credentials, physical office address, and transparent payment receipt standards.'
        )}
        canonicalPath="/licenses"
        locale={locale}
        schemas={[
          buildBreadcrumbSchema(
            [
              { name: t('হোম', 'Home'), path: '/' },
              { name: t('লাইসেন্স ও সার্টিফিকেট', 'Licenses & Certificates'), path: '/licenses' },
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
              { label: t('লাইসেন্স ও সার্টিফিকেট', 'Licenses & Certificates') },
            ]}
          />
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[#C9A24B]" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#C9A24B]">
              {t('প্রাতিষ্ঠানিক বৈধতা ও স্বচ্ছতা', 'Agency Verification')}
            </p>
          </div>
          <h1 className="heading-h1 text-white max-w-3xl">
            {t('লাইসেন্স, নিবন্ধন ও প্রাতিষ্ঠানিক স্বচ্ছতা', 'Licenses, Registrations & Transparency')}
          </h1>
          <p className="body-lead mt-6 text-white/85 max-w-2xl">
            {t(
              'ভিসা বা ওমরাহ লেনদেনের আগে যেকোনো প্রতিষ্ঠানের স্থায়ী ঠিকানা ও বৈধ নিবন্ধন যাচাই করা আপনার অধিকার।',
              'Verifying an agency’s physical office and official registrations before making any payment is your right.'
            )}
          </p>
          <HeroCtaRow locationId="licenses_hero" showCallLink />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 space-y-8">
          <LicenseStrip variant="white" showLink={false} />

          {/* Active Licenses Grid (renders ONLY real provided numbers) */}
          {activeLicenses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {activeLicenses.map((lic) => (
                <div key={lic.key} className="card-surface border-[#C9A24B]/45 p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7D5D14]">
                    <FileCheck2 className="w-4 h-4" />
                    {isEn ? lic.issuingBodyEn : lic.issuingBodyBn}
                  </div>
                  <h2 className="heading-h3 mt-2 text-[#0B1F3A]">
                    {isEn ? lic.labelEn : lic.labelBn}
                  </h2>
                  <p className="mt-2 text-xl font-bold text-[#0F5132] tabular-nums">{lic.number}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="card-surface border-[#C9A24B]/45 p-6 sm:p-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] text-[#C9A24B] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="heading-h3 text-[#0B1F3A]">
                    {t('সরাসরি অফিসে নিবন্ধন ও কাগজপত্র যাচাই করুন', 'Inspect Official Registration Documents In-Office')}
                  </h2>
                  <p className="mt-2 text-sm text-[#4B5563] leading-[1.75]">
                    {t(
                      'আমরা কখনোই ওয়েবসাইটে অপ্রমাণিত বা আনুমানিক লাইসেন্স নম্বর প্রদর্শন করি না। আমাদের Trade License, TIN এবং সংশ্লিষ্ট নিবন্ধন কাগজপত্র রহনপুর অফিসে সর্বদা প্রদর্শিত থাকে — যেকোনো গ্রাহক সরাসরি এসে তা যাচাই করতে পারবেন।',
                      'We never publish unverified or placeholder registration numbers. Our official business registration documents are openly available for direct inspection at our Rohanpur office.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Verification Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-surface p-6 sm:p-8 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#0B1F3A] text-[#C9A24B] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="heading-h3 text-[#0B1F3A]">
                {t('স্থায়ী ও যাচাইযোগ্য অফিস ঠিকানা', 'Permanent Verifiable Office')}
              </h3>
              <p className="text-sm text-[#4B5563] leading-[1.75]">
                {t(siteConfig.contact.officeAddressBn, siteConfig.contact.officeAddressEn)} ·{' '}
                {t(siteConfig.contact.officeHoursBn, siteConfig.contact.officeHoursEn)}
              </p>
            </div>

            <div className="card-surface p-6 sm:p-8 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#0B1F3A] text-[#C9A24B] flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="heading-h3 text-[#0B1F3A]">
                {t('প্রতিটি লেনদেনে লিখিত Money Receipt', 'Official Money Receipts Policy')}
              </h3>
              <p className="text-sm text-[#4B5563] leading-[1.75]">
                {t(
                  'Visatrip Global-এ নগদ, bKash, Nagad বা Bank Transfer যেকোনো পেমেন্টের বিপরীতে তারিখ ও বিবরণসহ অফিসিয়াল মানি রিসিট দেওয়া হয়। রিসিট ছাড়া কারো ব্যক্তিগত নম্বরে টাকা দেবেন না।',
                  'Every payment made to Visatrip Global receives a dated, itemized official money receipt. Never send funds without written verification.'
                )}
              </p>
            </div>
          </div>

          {/* Transparent Fee & Receipt Policies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PaymentReceiptNotice />
            <TransparentFeeNote />
          </div>

          {/* "সততার অঙ্গীকার" Promise Block */}
          <HonestyPledgeBlock variant="white" />

          {/* Official Government & Embassy Verification Links */}
          <OfficialSourcesNote tags={['general', 'work-permit', 'hajj-umrah', 'india-visa']} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
