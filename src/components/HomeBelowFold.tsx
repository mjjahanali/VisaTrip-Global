import { Link } from 'react-router-dom';
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Globe,
  Landmark,
  ExternalLink,
  MapPin,
  Navigation,
} from 'lucide-react';
import { siteConfig, getLicenseByKey, toBanglaDigits } from '../config/site';
import {
  scamAwarenessTips,
  homepageFaqs,
  testimonialsData,
} from '../data/siteContent';
import { localAreasData } from '../data/localAreas';
import { trackAnalyticsEvent } from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';
import { SafeImage } from './SafeImage';
import { SectionHeader } from './SectionHeader';
import { GoldDivider } from './GoldDivider';
import { TestimonialCard } from './Cards';
import { FaqAccordion } from './FaqAccordion';
import { SectionCtaStrip } from './SectionCtaStrip';
import {
  LicenseStrip,
  PaymentReceiptNotice,
  TransparentFeeNote,
} from './TrustSignals';
import { MediaEmbedFacade } from './MediaEmbedFacade';
import { GoogleMapFacade } from './GoogleMapFacade';
import { FadeUp, StaggerGroup, StaggerItem } from './MotionPrimitives';
import { MobileSnapCarousel } from './MobileSnapCarousel';

const partnerAirlines = [
  'Biman Bangladesh',
  'US-Bangla Airlines',
  'Saudia',
  'Emirates',
  'Qatar Airways',
  'Malaysia Airlines',
  'Singapore Airlines',
  'IndiGo',
];

interface HomeBelowFoldProps {
  onOpenChecklist: () => void;
}

/**
 * Dynamically imported lower sections of HomePage (sections 8–13):
 * Hajj & Umrah Banner, India Visa Processing, Testimonials + Media Facade,
 * Licenses & Partners, Scam Awareness, and FAQ Preview.
 *
 * Keeps initial `/` JS lean for mobile Slow 3G LCP while streaming smoothly
 * below the fold with `content-visibility: auto`.
 */
export function HomeBelowFold({ onOpenChecklist }: HomeBelowFoldProps) {
  const { isEn, localizedPath, t } = useLanguage();
  const habLicense = getLicenseByKey('hab');

  const faqEntries = homepageFaqs.map((f) => ({
    question: isEn ? f.questionEn : f.questionBn,
    answer: isEn ? f.answerEn : f.answerBn,
  }));

  return (
    <>
      {/* 8. HAJJ & UMRAH BANNER (Deep Green #0F5132 + Subtle Gold Atmospheric Gradient) */}
      <section className="cv-auto py-16 sm:py-24 bg-hajj-hero text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <FadeUp className="lg:col-span-7 flex flex-col justify-between space-y-8">
              <div>
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="h-[1px] w-8 bg-[#E2BE67]" aria-hidden="true" />
                  <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#E2BE67]">
                    {t('হজ্জ ও ওমরাহ বিভাগ · চাঁপাইনবাবগঞ্জ ও রাজশাহী বিভাগ', 'Hajj & Umrah Division · Rajshahi & Bangladesh')}
                  </p>
                </div>
                <h2 className="heading-h2 text-white">
                  {t('পবিত্র সফর হোক নিশ্চিন্ত ও শান্তিপূর্ণ', 'Perform Hajj & Umrah with Peace of Mind')}
                </h2>
                <p className="body-base mt-4 text-white/90">
                  {t(
                    'বুকিংয়ের আগেই হোটেলের প্রকৃত দূরত্ব, ফ্লাইট শিডিউল এবং স্বচ্ছ Payment Schedule লিখিতভাবে জানিয়ে দিই — যাতে আপনার পুরো মনোযোগ থাকে শুধু ইবাদতে।',
                    'Exact hotel walking distance from Haram, flight schedule, and milestone payments are shared in writing before booking so you focus purely on worship.'
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {[
                  t('Haram-এর কাছে যাচাইকৃত Hotel অপশন', 'Verified Hotel Options Near Haram'),
                  t('অভিজ্ঞ মুয়াল্লেম ও গ্রুপ গাইড', 'Experienced Moallem & Group Guide'),
                  t('স্বচ্ছ Payment Schedule ও মানি রিসিট', 'Transparent Payment Schedule & Receipts'),
                  t('দোয়া, ইহরাম ও আমলের পূর্ণ গাইডলাইন', 'Pre-Departure Dua & Ihram Orientation'),
                ].map((hl) => (
                  <div
                    key={hl}
                    className="flex items-start gap-3 rounded-xl bg-white/[0.07] border border-white/15 px-4 py-4"
                  >
                    <Check className="w-4 h-4 text-[#E2BE67] shrink-0 mt-1" aria-hidden="true" />
                    <span className="leading-[1.6]">{hl}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-[#09321E]/90 border border-[#E2BE67]/40 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-[#E2BE67]">
                    {t('আসন্ন ওমরাহ গ্রুপ শিডিউল', 'Upcoming Umrah Group Schedule')}
                  </div>
                  <div className="text-xs sm:text-sm text-white/90 mt-1 leading-[1.7]">
                    {t(
                      'Economy, Standard ও VIP — ১৪ দিনের আসন্ন গ্রুপের তারিখ ও আসন জানতে যোগাযোগ করুন।',
                      'Economy, Standard & VIP — contact us for upcoming 14-day departure dates and seat availability.'
                    )}
                  </div>
                  {habLicense && (
                    <div className="mt-2 text-xs text-[#E2BE67] font-semibold tabular-nums">
                      HAB License No: {habLicense.number}
                    </div>
                  )}
                </div>
                <Link
                  to={localizedPath('/services/hajj-umrah')}
                  onClick={() =>
                    trackAnalyticsEvent('cta_click', {
                      cta_label: 'View Umrah Packages',
                      cta_location: 'home_hajj_banner',
                      service: 'hajj-umrah',
                    })
                  }
                  className="btn-primary btn-sm shrink-0"
                >
                  <Landmark className="w-4 h-4" aria-hidden="true" />
                  {t('প্যাকেজ তুলনা দেখুন', 'View Umrah Packages')}
                </Link>
              </div>
            </FadeUp>

            <FadeUp delay={0.08} className="lg:col-span-5">
              <div className="group relative aspect-[4/3] lg:h-full rounded-2xl overflow-hidden border border-[#C9A24B]/35 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <SafeImage
                  imageKey="saudiArabia"
                  preset="editorial"
                  className="w-full h-full object-cover card-img-zoom"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09321E]/60 via-transparent to-transparent" />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 9. INDIA VISA SECTION (White) */}
      <section className="cv-auto py-16 sm:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <FadeUp>
            <SectionHeader
              kicker={t('ভারতীয় ভিসা প্রসেসিং · রাজশাহী IVAC সাপোর্ট', 'India Visa Processing · Rajshahi IVAC Guidance')}
              title={t('ভারতীয় মেডিকেল ও ট্যুরিস্ট ভিসা — নির্ভুল ডকুমেন্ট সাপোর্ট', 'India Medical & Tourist Visa Assistance')}
              subtitle={t(
                'চিকিৎসা বা ভ্রমণ — যে উদ্দেশ্যেই ভারত যান, ফর্ম পূরণ থেকে হাসপাতালের ইনভিটেশন লেটার পর্যন্ত প্রতিটি ধাপে পাশে আছে Visatrip Global।',
                'From hospital invitation letters for patients and attendants to error-free IVAC tourist filings.'
              )}
            />
          </FadeUp>

          <StaggerGroup className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Medical Visa Column */}
            <StaggerItem>
              <div className="card-interactive h-full rounded-2xl bg-[#FAF8F4] p-6 sm:p-8 border border-[#0B1F3A]/8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] text-[#C9A24B] flex items-center justify-center shrink-0">
                      <Stethoscope className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="heading-h3 text-[#0B1F3A]">
                        {t('ভারতীয় মেডিকেল ভিসা (রোগী ও অ্যাটেনডেন্ট)', 'India Medical & Attendant Visa')}
                      </h3>
                      <p className="text-xs text-[#525B68] mt-1">
                        {t('কলকাতা · ভেলোর (CMC) · চেন্নাই · দিল্লি', 'Kolkata · Vellore (CMC) · Chennai · Delhi')}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm text-[#4B5563] leading-[1.75]">
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#7D5D14] shrink-0 mt-1" aria-hidden="true" />
                      <span>{t('ভারতের হাসপাতালের Appointment / Invitation Letter সংগ্রহে সহায়তা', 'Indian hospital Appointment / Invitation Letter coordination')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#7D5D14] shrink-0 mt-1" aria-hidden="true" />
                      <span>{t('রোগী এবং সর্বোচ্চ ৩ জন অ্যাটেনডেন্টের ফাইল সাজানো', 'Patient + up to 3 Medical Attendant files prepared together')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#7D5D14] shrink-0 mt-1" aria-hidden="true" />
                      <span>{t('প্রেসক্রিপশন, ইউটিলিটি বিল, এনআইডি ও ব্যাংক স্টেটমেন্ট চেকিং', 'Prescription, utility bill, NID & bank/dollar verification')}</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-4 border-t border-[#0B1F3A]/8 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-[#525B68]">
                    {t('সময়: IVAC স্লট ও হাইকমিশন সাপেক্ষে', 'Time: Subject to IVAC & High Commission')}
                  </span>
                  <Link to={localizedPath('/services/india-visa')} className="btn-navy btn-sm">
                    {t('আবেদন প্রক্রিয়া দেখুন', 'Apply Now')}
                    <ArrowRight className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </StaggerItem>

            {/* Tourist Visa Column */}
            <StaggerItem>
              <div className="card-interactive h-full rounded-2xl bg-[#FAF8F4] p-6 sm:p-8 border border-[#0B1F3A]/8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] text-[#C9A24B] flex items-center justify-center shrink-0">
                      <Globe className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="heading-h3 text-[#0B1F3A]">
                        {t('ভারতীয় ট্যুরিস্ট ভিসা', 'India Tourist Visa')}
                      </h3>
                      <p className="text-xs text-[#525B68] mt-1">
                        {t('দার্জিলিং · কাশ্মীর · সিকিম · আগ্রা ও দিল্লি', 'Darjeeling · Kashmir · Sikkim · Agra & Delhi')}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm text-[#4B5563] leading-[1.75]">
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#7D5D14] shrink-0 mt-1" aria-hidden="true" />
                      <span>{t('নির্ভুল অনলাইন ফর্ম পূরণ ও সঠিক Port of Entry নির্বাচন', 'Error-free online filing & proper Port of Entry selection')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#7D5D14] shrink-0 mt-1" aria-hidden="true" />
                      <span>{t('পেশার প্রমাণপত্র (NOC/Trade License) ও ব্যাংক স্টেটমেন্ট গাইডলাইন', 'Occupation proof (NOC/Trade License) & bank statement guide')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#7D5D14] shrink-0 mt-1" aria-hidden="true" />
                      <span>{t('ভিসা পরবর্তী ফ্লাইট টিকেট ও নিরাপদ হোটেল বুকিং সাপোর্ট', 'Post-visa flight tickets & verified hotel reservations')}</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-4 border-t border-[#0B1F3A]/8 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-[#525B68]">
                    {t('সময়: IVAC স্লট ও হাইকমিশন সাপেক্ষে', 'Time: Subject to IVAC & High Commission')}
                  </span>
                  <Link to={localizedPath('/services/india-visa')} className="btn-navy btn-sm">
                    {t('আবেদন প্রক্রিয়া দেখুন', 'Apply Now')}
                    <ArrowRight className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          </StaggerGroup>

          <div className="mt-10">
            <SectionCtaStrip
              variant="light"
              locationId="home_after_india_visa"
              headingBn="ইন্ডিয়া মেডিকেল বা ট্যুরিস্ট ভিসার ফাইল যাচাই করতে চান?"
              headingEn="Need Help Checking Your India Medical or Tourist Visa File?"
              subtextBn="হাসপাতালের ইনভিটেশন লেটার ও IVAC ডকুমেন্ট নিয়ে সরাসরি WhatsApp-এ কথা বলুন।"
              subtextEn="Message us on WhatsApp for hospital invitation coordination and IVAC checklists."
              whatsappMessage="আসসালামু আলাইকুম, আমি ইন্ডিয়া মেডিকেল / ট্যুরিস্ট ভিসা প্রসেসিং সম্পর্কে জানতে চাই।"
            />
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* 10. TESTIMONIALS (Off-white #FAF8F4) */}
      <section className="cv-auto py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <SectionHeader
              kicker={t('ক্লায়েন্ট অভিজ্ঞতা', 'Client Feedback')}
              title={t('আমাদের যাত্রীদের অভিজ্ঞতা ও মতামত', 'What Travelers Share About Us')}
              subtitle={t(
                'ভিসা ফাইলিং, মেডিকেল ট্রাভেল ও ওমরাহ সফরে আমাদের স্বচ্ছ সেবার অভিজ্ঞতা।',
                'Clear guidance and respectful communication across visa filing, medical travel, and Umrah.'
              )}
            />
            <Link
              to={localizedPath('/success-stories')}
              className="btn-secondary btn-sm shrink-0 self-start sm:self-end"
            >
              {t('সাফল্যের গল্প দেখুন', 'Success Stories')}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </FadeUp>

          <MobileSnapCarousel
            ariaLabel={t('ক্লায়েন্টদের অভিজ্ঞতা', 'Client Testimonials')}
            desktopGridClass="md:grid-cols-3 sm:gap-6"
            mobileCardClass="w-[86vw] max-w-[340px]"
            items={testimonialsData.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          />

          <p className="mt-4 text-xs text-[#525B68]">
            {t(
              '* উপরের অভিজ্ঞতাগুলো নমুনা ফরম্যাট — সরাসরি যাচাইকৃত ক্লায়েন্ট রিভিউ ও ভিডিও আমাদের অফিসিয়াল ফেসবুক পেজে প্রকাশিত হয়।',
              '* Entries above illustrate our feedback format — verified client reviews and video stories are published on our official Facebook page.'
            )}
          </p>

          {/* Click-to-Load Facebook Video Facade + Verified Social Reviews */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <MediaEmbedFacade
              provider="facebook"
              posterImageKey="office"
              fallbackHref={siteConfig.social.facebook}
              title={t(
                'সম্মতিপ্রাপ্ত হজ্জ-ওমরাহ ও ভিসা যাত্রীদের ভিডিও অভিজ্ঞতা',
                'Consented Pilgrim & Traveler Video Stories'
              )}
              aspectClass="aspect-[16/9]"
            />

            <div className="card-surface p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div>
                <p className="text-xs font-semibold tracking-wider uppercase text-[#7D5D14]">
                  {t('ভেরিফায়েড সোশ্যাল রিভিউ', 'Verified Social Reviews')}
                </p>
                <h3 className="heading-h3 mt-2 text-[#0B1F3A]">
                  {t('Facebook ও Google রিভিউ যাচাই করুন', 'Read Reviews on Facebook & Google')}
                </h3>
                <p className="mt-3 text-sm text-[#4B5563] leading-[1.75]">
                  {t(
                    'আমরা কখনোই ভুয়া রেটিং বা স্টক রিভিউ বানাই না — সরাসরি আমাদের অফিসিয়াল ফেসবুক পেজ ও গুগল প্রোফাইলে ক্লায়েন্টদের মতামত ও ফটো যাচাই করুন।',
                    'We never fabricate star ratings or stock testimonials — verify authentic feedback and traveler stories directly on our official Facebook page.'
                  )}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-navy btn-sm"
                >
                  <span>{t('অফিসিয়াল Facebook পেজ দেখুন', 'Open Official Facebook Page')}</span>
                  <ExternalLink className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />
                </a>
                <a
                  href={siteConfig.contact.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary btn-sm"
                >
                  <span>{t('Google Maps প্রোফাইল', 'Google Maps Profile')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. LICENSES & PARTNERS (White) */}
      <section className="cv-auto py-16 sm:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <SectionHeader
              kicker={t('বৈধতা ও প্রাতিষ্ঠানিক স্বচ্ছতা', 'Credentials & Airline Network')}
              title={t('নিবন্ধন, এয়ারলাইনস পার্টনার ও যাচাইযোগ্য অফিস', 'Verifiable Office & Global Airline Network')}
              subtitle={t(
                'স্থায়ী অফিস, অফিসিয়াল মানি রিসিট এবং বিশ্বের শীর্ষ আন্তর্জাতিক এয়ারলাইনসের টিকেটিং সাপোর্ট।',
                'A permanent office, official money receipts, and ticketing across major international carriers.'
              )}
            />
            <Link
              to={localizedPath('/licenses')}
              className="btn-secondary btn-sm shrink-0 self-start sm:self-end"
            >
              <ShieldCheck className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />
              {t('লাইসেন্স ও যাচাইকরণ', 'Licenses & Verification')}
            </Link>
          </div>

          <LicenseStrip variant="light" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PaymentReceiptNotice />
            <TransparentFeeNote />
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-[#525B68] mb-4">
              {t('যে সকল প্রধান এয়ারলাইনসের টিকেট আমাদের ডেস্কে ইস্যু করা হয়', 'Major Airlines Ticketed Through Our Desk')}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {partnerAirlines.map((airline) => (
                <div
                  key={airline}
                  className="rounded-xl bg-[#FAF8F4] border border-[#0B1F3A]/8 px-3 py-4 text-center text-xs font-semibold text-[#0B1F3A] flex items-center justify-center"
                >
                  {airline}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* 12. SCAM AWARENESS (Off-white #FAF8F4) */}
      <section className="cv-auto py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="card-surface border-[#C9A24B]/45 p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <SectionHeader
                kicker={t('জনসচেতনতা ও নিরাপদ অভিবাসন', 'Traveler Safety & Anti-Fraud Notice')}
                title={t('Visa ও Work Permit-এ প্রতারণা থেকে সাবধান', 'Stay Protected from Visa & Work Permit Scams')}
                subtitle={t(
                  'যেকোনো এজেন্সি বা দালালকে টাকা দেওয়ার আগে নিচের ৪টি বিষয় অবশ্যই যাচাই করুন।',
                  'Always verify these four safeguards before handing over money or your passport.'
                )}
              />
              <Link
                to={localizedPath('/blog/work-permit-scam-protection-7-ways')}
                className="btn-secondary btn-sm shrink-0 self-start lg:self-end"
              >
                {t('পূর্ণ সচেতনতা গাইড পড়ুন', 'Read Safety Guide')}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {scamAwarenessTips.map((tip, idx) => (
                <StaggerItem key={tip.titleEn} className="rounded-xl bg-[#FAF8F4] p-6 border border-[#0B1F3A]/8">
                  <span className="font-editorial text-base font-bold text-[#7D5D14] tabular-nums">
                    {isEn ? `0${idx + 1}` : toBanglaDigits(`0${idx + 1}`)}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-[#0B1F3A] leading-snug">
                    {isEn ? tip.titleEn : tip.titleBn}
                  </h3>
                  <p className="mt-2 text-sm text-[#4B5563] leading-[1.75]">
                    {isEn ? tip.descEn : tip.descBn}
                  </p>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <div className="mt-8">
              <SectionCtaStrip
                variant="light"
                locationId="home_after_scam_awareness"
                headingBn="আবেদনের আগে সম্পূর্ণ ভিসা ডকুমেন্ট চেকলিস্ট PDF ফ্রি সংগ্রহ করুন"
                headingEn="Download Our Free Printable Visa Document Checklist PDF"
                subtextBn="সঠিক কাগজপত্র আগে থেকেই সাজিয়ে রাখুন — কোনো এজেন্সিকে টাকা দেওয়ার আগে যাচাই করুন।"
                subtextEn="Prepare every required paper upfront and verify your profile before paying any fees."
                onDownloadChecklist={onOpenChecklist}
                checklistLabelBn="ফ্রি চেকলিস্ট PDF নিন"
                checklistLabelEn="Get Free Checklist PDF"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 12B. LOCAL PRESENCE — CHAPAI NAWABGANJ, RAJSHAHI DIVISION & BANGLADESH (White) */}
      <section className="cv-auto py-16 sm:py-24 bg-white border-b border-[#0B1F3A]/8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <SectionHeader
              kicker={t('স্থানীয় অফিস ও সার্ভিস এরিয়া', 'Local Office & Regional Coverage')}
              title={t(
                'চাঁপাইনবাবগঞ্জ, রাজশাহী বিভাগ ও সারা বাংলাদেশে আমাদের সেবা',
                'Trusted Locally in Chapai Nawabganj & Across Rajshahi Division'
              )}
              subtitle={t(
                'চাঁপাইনবাবগঞ্জে ওমরাহ প্যাকেজ, ইন্ডিয়া মেডিকেল ভিসা, নিরাপদ Work Permit ও স্টুডেন্ট কনসালটেন্সি — রহনপুর অফিসে সরাসরি দেখা করুন অথবা WhatsApp-এ শুরু করুন।',
                'From Umrah packages and India Medical Visas in Chapai Nawabganj to Study Abroad support in Rajshahi — visit our permanent Rohanpur office or start on WhatsApp.'
              )}
            />
            <Link
              to={localizedPath('/service-areas')}
              className="btn-secondary btn-sm shrink-0 self-start sm:self-end"
            >
              <span>{t('সব ৫টি এলাকার গাইড দেখুন', 'Explore All 5 Area Guides')}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* 5 Unique Local Area Jump Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {localAreasData.map((area, idx) => (
                <Link
                  key={area.id}
                  to={`${localizedPath('/service-areas')}#${area.id}`}
                  className={`card-interactive rounded-2xl bg-[#FAF8F4] border border-[#0B1F3A]/10 p-5 flex flex-col justify-between gap-3 hover:border-[#C9A24B] ${
                    idx === 4 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#7D5D14]">
                      <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{isEn ? area.badgeEn : area.badgeBn}</span>
                    </div>
                    <h3 className="mt-1.5 text-base font-bold text-[#0B1F3A]">
                      {isEn ? area.nameEn : area.nameBn}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#4B5563] leading-[1.7] line-clamp-2">
                      {isEn ? area.travelAccessEn : area.travelAccessBn}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1F3A]">
                    <span>{t(`${area.nameBn} গাইড পড়ুন`, `Read ${area.nameEn} Guide`)}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#7D5D14]" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>

            {/* Embedded Office Map + Exact NAP Card */}
            <div className="lg:col-span-5 card-surface overflow-hidden flex flex-col">
              <GoogleMapFacade
                variant="card"
                tone="light"
                heightClass="min-h-[16rem] lg:flex-1 lg:min-h-[260px]"
                title="Visatrip Global — Rohanpur, Gomastapur, Chapai Nawabganj, Bangladesh Office Map"
              />
              <div className="p-5 bg-white border-t border-[#0B1F3A]/8 space-y-3">
                <address className="not-italic text-xs sm:text-sm text-[#374151] leading-[1.7]">
                  <span className="font-bold text-[#0B1F3A]">{siteConfig.brandName}</span>
                  <span className="mx-1.5 text-[#7D5D14]" aria-hidden="true">·</span>
                  <span>{t(siteConfig.contact.officeAddressBn, siteConfig.contact.officeAddressEn)}</span>
                </address>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-[#4B5563] tabular-nums font-semibold">
                    {siteConfig.contact.phoneDisplay}
                  </span>
                  <a
                    href={siteConfig.contact.mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-[#7D5D14] hover:underline"
                  >
                    <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t('গুগল ম্যাপ দিকনির্দেশনা', 'Get Directions')}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FAQ PREVIEW (White) */}
      <section className="cv-auto py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <SectionHeader
              kicker={t('সচরাচর জিজ্ঞাসা', 'Frequently Asked Questions')}
              title={t('আপনার মনে যে প্রশ্নগুলো আসতে পারে', 'Honest Answers Before You Apply')}
            />
            <Link
              to={localizedPath('/faq')}
              className="btn-secondary btn-sm shrink-0 self-start sm:self-end"
            >
              {t('সকল প্রশ্ন দেখুন', 'View All FAQs')}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <FadeUp>
            <FaqAccordion items={faqEntries} />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
