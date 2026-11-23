import { siteConfig } from '../config/site';
import { SeoHead, buildBreadcrumbSchema } from '../lib/seo';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HeroCtaRow } from '../components/HeroCtaRow';
import { CtaBanner } from '../components/CtaBanner';

type LegalDocType = 'privacy' | 'terms' | 'refund';

export function LegalPage({ type }: { type: LegalDocType }) {
  const { locale, t } = useLanguage();

  const meta = {
    privacy: {
      path: '/privacy-policy',
      titleBn: 'গোপনীয়তা নীতিমালা | Visatrip Global',
      titleEn: 'Privacy Policy | Visatrip Global',
      descBn: 'Visatrip Global-এ আপনার ব্যক্তিগত তথ্য, পাসপোর্ট ডকুমেন্ট ও যোগাযোগের নিরাপত্তা সংক্রান্ত নীতিমালা।',
      descEn: 'How Visatrip Global collects, protects, and uses client contact details and travel documents.',
      headingBn: 'গোপনীয়তা নীতিমালা (Privacy Policy)',
      headingEn: 'Privacy Policy',
    },
    terms: {
      path: '/terms-and-conditions',
      titleBn: 'সেবার শর্তাবলি | Visatrip Global',
      titleEn: 'Terms & Conditions | Visatrip Global',
      descBn: 'Visatrip Global-এর ভিসা কনসালটেন্সি, ওমরাহ, এয়ার টিকেট ও ট্যুর প্যাকেজ সেবার শর্তাবলি।',
      descEn: 'Terms and conditions governing visa consultancy, Umrah, air ticketing, and tour bookings at Visatrip Global.',
      headingBn: 'সেবার শর্তাবলি (Terms & Conditions)',
      headingEn: 'Terms & Conditions',
    },
    refund: {
      path: '/refund-policy',
      titleBn: 'রিফান্ড ও বাতিলকরণ নীতিমালা | Visatrip Global',
      titleEn: 'Refund & Cancellation Policy | Visatrip Global',
      descBn: 'ভিসা ফি, এয়ার টিকেট, হোটেল ও ট্যুর প্যাকেজের রিফান্ড এবং ক্যান্সেলেশন নিয়মাবলি — Visatrip Global।',
      descEn: 'Clear refund and cancellation rules for visa fees, airline tickets, hotel bookings, and tour packages.',
      headingBn: 'রিফান্ড ও ক্যান্সেলেশন নীতিমালা (Refund Policy)',
      headingEn: 'Refund & Cancellation Policy',
    },
  }[type];

  return (
    <>
      <SeoHead
        title={t(meta.titleBn, meta.titleEn)}
        description={t(meta.descBn, meta.descEn)}
        canonicalPath={meta.path}
        locale={locale}
        schemas={[
          buildBreadcrumbSchema(
            [
              { name: t('হোম', 'Home'), path: '/' },
              { name: t(meta.headingBn, meta.headingEn), path: meta.path },
            ],
            locale
          ),
        ]}
      />

      <section className="bg-navy-hero text-white py-16 sm:py-20">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <Breadcrumbs
            light
            items={[
              { label: t('হোম', 'Home'), to: '/' },
              { label: t(meta.headingBn, meta.headingEn) },
            ]}
          />
          <h1 className="heading-h1 text-white">{t(meta.headingBn, meta.headingEn)}</h1>
          <p className="mt-3 text-xs text-white/75 tracking-wide">
            {t('Visatrip Global · সর্বশেষ হালনাগাদ: ২০২৬', 'Visatrip Global · Last Updated: 2026')}
          </p>
          <HeroCtaRow
            primaryLabelBn="কোনো প্রশ্ন থাকলে জানুন"
            primaryLabelEn="Ask a Policy Question"
            locationId={`legal_${type}_hero`}
          />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="card-surface p-6 sm:p-10 space-y-6 text-[15.5px] leading-[1.85] text-[#374151]">
            {type === 'privacy' && (
              <>
                <h2 className="heading-h3 text-[#0B1F3A]">১. আমরা কী তথ্য সংগ্রহ করি</h2>
                <p>
                  Visatrip Global ({siteConfig.websiteDisplay}) আপনার কনসাল্টেশন, ভিসা প্রসেসিং, এয়ার টিকেট বা হোটেল বুকিংয়ের জন্য প্রয়োজনীয় নাম, মোবাইল/WhatsApp নম্বর, ইমেইল, পাসপোর্ট তথ্য এবং সংশ্লিষ্ট ডকুমেন্ট সংগ্রহ করে।
                </p>
                <h2 className="heading-h3 text-[#0B1F3A]">২. তথ্যের ব্যবহার ও সুরক্ষা</h2>
                <p>
                  আপনার ব্যক্তিগত তথ্য শুধুমাত্র নির্ধারিত ভিসা আবেদন, এয়ারলাইনস/হোটেল রিজার্ভেশন এবং আবেদনের আপডেট জানানোর কাজে ব্যবহৃত হয়। আমরা কখনোই ক্লায়েন্টের তথ্য তৃতীয় পক্ষের মার্কেটিং কোম্পানির কাছে বিক্রি বা শেয়ার করি না।
                </p>
                <h2 className="heading-h3 text-[#0B1F3A]">৩. ক্লায়েন্ট ছবি ও রিভিউ সম্মতি (Consent)</h2>
                <p>
                  কোনো ক্লায়েন্টের ছবি, ভিসা কপি বা রিভিউ তাদের স্পষ্ট লিখিত সম্মতি ব্যতীত ওয়েবসাইট বা সোশ্যাল মিডিয়ায় প্রকাশ করা হয় না।
                </p>
                <h2 className="heading-h3 text-[#0B1F3A]">৪. যোগাযোগ</h2>
                <p>
                  গোপনীয়তা সংক্রান্ত যেকোনো প্রশ্ন বা তথ্য মুছে ফেলার অনুরোধের জন্য আমাদের রহনপুর অফিসে অথবা {siteConfig.contact.phoneDisplay} নম্বরে যোগাযোগ করুন।
                </p>
              </>
            )}

            {type === 'terms' && (
              <>
                <h2 className="heading-h3 text-[#0B1F3A]">১. সেবার পরিধি ও Embassy-র এখতিয়ার</h2>
                <p>
                  Visatrip Global একটি পেশাদার ট্রাভেল ও ভিসা কনসালটেন্সি প্রতিষ্ঠান। আমরা ডকুমেন্ট প্রস্তুতি, ফর্ম পূরণ, ফ্লাইট-হোটেল বুকিং ও পরামর্শ সেবা প্রদান করি। প্রতিটি ভিসা বা Work Permit অনুমোদন, বিলম্ব কিংবা বাতিলের চূড়ান্ত ক্ষমতা সম্পূর্ণরূপে সংশ্লিষ্ট দেশের Embassy বা ইমিগ্রেশন কর্তৃপক্ষের। Visatrip Global কখনোই ভিসা অনুমোদনের আগাম নিশ্চয়তা প্রদান করে না।
                </p>
                <h2 className="heading-h3 text-[#0B1F3A]">২. আবেদনকারীর দায়িত্ব</h2>
                <p>
                  আবেদনকারী কর্তৃক প্রদত্ত সকল তথ্য, পাসপোর্ট, ব্যাংক স্টেটমেন্ট, মেডিকেল রিপোর্ট এবং পেশার প্রমাণপত্র অবশ্যই সত্য ও বৈধ হতে হবে। কোনো জাল বা অসত্য কাগজপত্রের দায়ভার আবেদনকারীর।
                </p>
                <h2 className="heading-h3 text-[#0B1F3A]">৩. ফি ও পেমেন্ট</h2>
                <p>
                  সকল সরকারি ফি, এয়ারলাইনস ভাড়া ও সার্ভিস চার্জ বুকিংয়ের পূর্বে জানানো হয়। প্রতিটি লেনদেনের জন্য অফিসিয়াল মানি রিসিট সংগ্রহ করা বাধ্যতামূলক।
                </p>
                <h2 className="heading-h3 text-[#0B1F3A]">৪. প্রযোজ্য আইন</h2>
                <p>
                  এই শর্তাবলি বাংলাদেশের প্রচলিত আইন অনুযায়ী পরিচালিত হবে।
                </p>
              </>
            )}

            {type === 'refund' && (
              <>
                <h2 className="heading-h3 text-[#0B1F3A]">১. Embassy ও সরকারি ভিসা ফি</h2>
                <p>
                  যেকোনো দেশের Embassy, IVAC বা ইমিগ্রেশন পোর্টালে জমাকৃত সরকারি ভিসা ফি আন্তর্জাতিক নিয়ম অনুযায়ী সম্পূর্ণ অ-ফেরতযোগ্য (Non-refundable), ভিসা অনুমোদিত হোক বা রিজেক্ট হোক।
                </p>
                <h2 className="heading-h3 text-[#0B1F3A]">২. এয়ার টিকেট ও হোটেল বুকিং রিফান্ড</h2>
                <p>
                  এয়ার টিকেট ও হোটেল বাতিলের ক্ষেত্রে সংশ্লিষ্ট এয়ারলাইনস বা হোটেলের ফেয়ার রুল ও ক্যান্সেলেশন পেনাল্টি প্রযোজ্য হবে। রিফান্ডযোগ্য টিকেটের অর্থ এয়ারলাইনস থেকে রিফান্ড প্রক্রিয়া সম্পন্ন হওয়ার পর (সাধারণত ৭–২১ কর্মদিবস) গ্রাহককে পরিশোধ করা হয়।
                </p>
                <h2 className="heading-h3 text-[#0B1F3A]">৩. ওমরাহ ও ট্যুর প্যাকেজ বাতিলকরণ</h2>
                <p>
                  ভিসা বা ফ্লাইট ইস্যুর পূর্বে বুকিং বাতিল করলে প্রকৃত ব্যয় বাদ দিয়ে অবশিষ্ট অর্থ ফেরত দেওয়া হয়। ভিসা, এয়ার টিকেট বা নন-রিফান্ডেবল হোটেল ইস্যু হয়ে যাওয়ার পর সংশ্লিষ্ট অংশের ব্যয় ফেরতযোগ্য নয়।
                </p>
                <h2 className="heading-h3 text-[#0B1F3A]">৪. রিফান্ড অনুরোধের প্রক্রিয়া</h2>
                <p>
                  রিফান্ডের জন্য মূল মানি রিসিটসহ আমাদের রহনপুর অফিসে অথবা {siteConfig.contact.phoneDisplay} হটলাইনে যোগাযোগ করুন।
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
