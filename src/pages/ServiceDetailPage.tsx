import { lazy, Suspense, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Check,
  FileDown,
  MessageCircle,
  Phone,
  Clock,
  Wallet,
  ArrowRight,
  Landmark,
  Plane,
  Building2,
  Stethoscope,
  Globe,
  GraduationCap,
  MapPin,
} from 'lucide-react';
import {
  getServiceBySlug,
  servicesData,
  hajjComparisonTiers,
  studentStudyMatrix,
  workPermitCategories,
} from '../data/services';
import { localAreasData, serviceLocalCallouts } from '../data/localAreas';
import { tourPackagesData } from '../data/packages';
import { blogPostsData } from '../data/blogs';
import { siteConfig, getLicenseByKey, toBanglaDigits } from '../config/site';
import {
  SeoHead,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
  trackAnalyticsEvent,
} from '../lib/seo';
import { getPageLeadContext } from '../lib/leadContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { GoldDivider } from '../components/GoldDivider';
import { SafeImage } from '../components/SafeImage';
import { FaqAccordion } from '../components/FaqAccordion';
import { InquiryForm } from '../components/InquiryForm';
import { SectionCtaStrip } from '../components/SectionCtaStrip';
import { CtaBanner } from '../components/CtaBanner';
import {
  LicenseStrip,
  HonestyPledgeBlock,
  ScamAwarenessBanner,
  PaymentReceiptNotice,
  TransparentFeeNote,
  VerifiedDateStamp,
  OfficialSourcesNote,
} from '../components/TrustSignals';
import { ServiceCard, PackageCard } from '../components/Cards';
import { NotFoundPage } from './NotFoundPage';

const ChecklistModal = lazy(() =>
  import('../components/ChecklistModal').then((mod) => ({ default: mod.ChecklistModal }))
);

export function ServiceDetailPage() {
  const { slug = '' } = useParams();
  const { isEn, locale, localizedPath, t } = useLanguage();
  const service = getServiceBySlug(slug);

  const [checklistOpen, setChecklistOpen] = useState(false);
  const [indiaTab, setIndiaTab] = useState<'medical' | 'tourist'>('medical');

  // Air Ticketing custom enquiry state
  const [flightForm, setFlightForm] = useState({
    scope: 'International',
    tripType: 'Round-trip',
    from: 'Dhaka (DAC)',
    to: '',
    date: '',
    passengers: '1',
    cabin: 'Economy',
  });

  // Hotel Booking custom enquiry state
  const [hotelForm, setHotelForm] = useState({
    city: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    budget: 'Standard (3–4 Star)',
  });

  // Student Profile Evaluation extra fields
  const [studentEval, setStudentEval] = useState({
    education: 'HSC / A-Level',
    gpa: '',
    english: 'IELTS / Planning',
    intake: 'September / Fall',
  });

  if (!service) {
    return <NotFoundPage />;
  }

  const isHajj = service.theme === 'hajj';
  const heroBg = isHajj ? 'bg-hajj-hero' : 'bg-navy-hero';
  const pageCtx = getPageLeadContext(`/services/${service.slug}`, locale);
  const habLicense = getLicenseByKey('hab');
  const bmetLicense = getLicenseByKey('bmet');

  const documents = isEn ? service.documentsEn : service.documentsBn;
  const eligibility = isEn ? service.eligibilityEn : service.eligibilityBn;
  const faqEntries = service.faqs.map((f) => ({
    question: isEn ? f.questionEn : f.questionBn,
    answer: isEn ? f.answerEn : f.answerBn,
  }));

  const relatedServices = servicesData.filter((s) => service.relatedServiceSlugs.includes(s.slug));
  const relatedBlogs = blogPostsData.filter((b) => service.relatedBlogSlugs.includes(b.slug));
  const localCallout = serviceLocalCallouts[service.slug];
  const featuredAreas = localCallout
    ? localAreasData.filter((a) => localCallout.featuredAreaIds.includes(a.id))
    : [];

  const extraFieldsForForm: Record<string, string> | undefined =
    service.slug === 'air-ticketing'
      ? {
          Scope: flightForm.scope,
          TripType: flightForm.tripType,
          From: flightForm.from,
          To: flightForm.to,
          TravelDate: flightForm.date,
          Passengers: flightForm.passengers,
          CabinClass: flightForm.cabin,
        }
      : service.slug === 'hotel-booking'
      ? {
          City: hotelForm.city,
          CheckIn: hotelForm.checkIn,
          CheckOut: hotelForm.checkOut,
          Guests: hotelForm.guests,
          BudgetTier: hotelForm.budget,
        }
      : service.slug === 'student-consultancy'
      ? {
          EducationLevel: studentEval.education,
          GPA: studentEval.gpa,
          EnglishTest: studentEval.english,
          TargetIntake: studentEval.intake,
        }
      : undefined;

  const inputClass =
    'w-full min-h-[48px] px-4 rounded-xl border border-[#0B1F3A]/12 text-base sm:text-sm text-[#1A1A1A] bg-[#FAF8F4] focus:bg-white focus:border-[#C9A24B] transition-colors';

  return (
    <>
      <SeoHead
        title={isEn ? service.seo.titleEn : service.seo.titleBn}
        description={isEn ? service.seo.descriptionEn : service.seo.descriptionBn}
        canonicalPath={`/services/${service.slug}`}
        locale={locale}
        schemas={[
          buildBreadcrumbSchema(
            [
              { name: t('হোম', 'Home'), path: '/' },
              { name: t('সার্ভিসসমূহ', 'Services'), path: '/services' },
              { name: isEn ? service.titleEn : service.titleBn, path: `/services/${service.slug}` },
            ],
            locale
          ),
          buildServiceSchema({
            name: isEn ? service.titleEn : service.titleBn,
            description: isEn ? service.seo.descriptionEn : service.seo.descriptionBn,
            path: `/services/${service.slug}`,
            locale,
          }),
          buildFaqSchema(faqEntries),
        ]}
      />

      {/* 1. HERO BANNER */}
      <section className={`relative ${heroBg} text-white overflow-hidden`}>
        <div className="absolute inset-0">
          <SafeImage imageKey={service.imageKey} preset="detailHero" priority className="w-full h-full object-cover opacity-30" />
          <div
            className={`pointer-events-none absolute inset-0 ${
              isHajj
                ? 'bg-gradient-to-r from-[#09321E]/95 via-[#0F5132]/86 to-[#0F5132]/58'
                : 'bg-gradient-to-r from-[#071529]/95 via-[#0B1F3A]/86 to-[#0B1F3A]/58'
            }`}
          />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <Breadcrumbs
            light
            items={[
              { label: t('হোম', 'Home'), to: '/' },
              { label: t('সার্ভিস', 'Services'), to: '/services' },
              { label: isEn ? service.titleEn : service.titleBn },
            ]}
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className={`h-[1px] w-8 ${isHajj ? 'bg-[#E2BE67]' : 'bg-[#C9A24B]'}`} aria-hidden="true" />
              <p className={`text-xs font-semibold tracking-[0.08em] uppercase ${isHajj ? 'text-[#E2BE67]' : 'text-[#C9A24B]'}`}>
                {isEn ? service.titleEn : service.titleBn} · Visatrip Global
              </p>
            </div>
            <h1 className="heading-h1 text-white">
              {isEn ? service.heroHeadingEn : service.heroHeadingBn}
            </h1>
            <p className="body-lead mt-6 text-white/90">
              {isEn ? service.heroSubEn : service.heroSubBn}
            </p>

            {/* Mandatory License Slot Display when provided */}
            {isHajj && habLicense && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#09321E]/85 border border-[#E2BE67]/50 px-4 py-2 text-xs sm:text-sm font-semibold text-[#E2BE67] tabular-nums">
                <Landmark className="w-4 h-4" aria-hidden="true" />
                HAB License No: {habLicense.number}
              </div>
            )}
            {service.slug === 'work-permit' && bmetLicense && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 border border-[#C9A24B]/50 px-4 py-2 text-xs sm:text-sm font-semibold text-[#C9A24B] tabular-nums">
                BMET / RL No: {bmetLicense.number}
              </div>
            )}

            {/* Verified Date Stamp on Visa / Permit / Hajj Information Pages */}
            {['work-permit', 'tourist-visa', 'student-consultancy', 'hajj-umrah', 'india-visa'].includes(
              service.slug
            ) && (
              <div className="mt-5">
                <VerifiedDateStamp light />
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#service-inquiry"
                onClick={() =>
                  trackAnalyticsEvent('cta_click', {
                    cta_label: 'Get Free Consultation',
                    cta_location: `service_hero_${service.slug}`,
                  })
                }
                className="btn-primary"
              >
                {t('ফ্রি কনসাল্টেশন নিন', 'Get Free Consultation')}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={pageCtx.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackAnalyticsEvent('whatsapp_click', {
                    location: `service_hero_${service.slug}`,
                    prefilled_topic: service.slug,
                  })
                }
                className="btn-secondary-light"
              >
                <MessageCircle className={`w-4 h-4 ${isHajj ? 'text-[#E2BE67]' : 'text-[#C9A24B]'}`} aria-hidden="true" />
                {t('WhatsApp-এ কথা বলুন', 'Chat on WhatsApp')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN TWO-COLUMN LAYOUT WITH STICKY DESKTOP INQUIRY SIDEBAR */}
      <section className="py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
          <LicenseStrip variant={isHajj ? 'hajj' : 'white'} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT CONTENT COLUMN */}
            <div className="lg:col-span-8 space-y-12">
              {/* WORK PERMIT & HAJJ/UMRAH: DEDICATED SCAM-AWARENESS BANNER */}
              {service.slug === 'work-permit' && <ScamAwarenessBanner topic="work-permit" />}
              {service.slug === 'hajj-umrah' && <ScamAwarenessBanner topic="hajj-umrah" />}

              {/* 2. OVERVIEW */}
              <div>
                <h2 className="heading-h2 text-[#0B1F3A]">
                  {t('সার্ভিস পরিচিতি', 'Service Overview')}
                </h2>
                <p className="body-base mt-4 text-[#4B5563]">
                  {isEn ? service.overviewEn : service.overviewBn}
                </p>
              </div>

              {/* INDIA VISA: Medical vs Tourist Tabs (WAI-ARIA Tablist + Arrow Keys) */}
              {service.slug === 'india-visa' && (
                <div className="card-surface p-6 sm:p-8">
                  <div
                    role="tablist"
                    aria-label={t('ভারতীয় ভিসার ধরন', 'India Visa Categories')}
                    className="flex flex-wrap items-center gap-1 p-1 bg-[#FAF8F4] rounded-xl w-fit mb-6 border border-[#0B1F3A]/8"
                  >
                    <button
                      id="india-tab-medical"
                      type="button"
                      role="tab"
                      aria-selected={indiaTab === 'medical'}
                      aria-controls="india-panel-medical"
                      tabIndex={indiaTab === 'medical' ? 0 : -1}
                      onClick={() => setIndiaTab('medical')}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                          e.preventDefault();
                          setIndiaTab('tourist');
                          document.getElementById('india-tab-tourist')?.focus();
                        }
                      }}
                      className={`min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer ${
                        indiaTab === 'medical'
                          ? 'bg-[#0B1F3A] text-white'
                          : 'text-[#374151] hover:text-[#0B1F3A]'
                      }`}
                    >
                      <Stethoscope
                        className={`w-4 h-4 ${indiaTab === 'medical' ? 'text-[#C9A24B]' : 'text-[#7D5D14]'}`}
                        aria-hidden="true"
                      />
                      {t('মেডিকেল ভিসা (Medical)', 'Medical Visa')}
                    </button>
                    <button
                      id="india-tab-tourist"
                      type="button"
                      role="tab"
                      aria-selected={indiaTab === 'tourist'}
                      aria-controls="india-panel-tourist"
                      tabIndex={indiaTab === 'tourist' ? 0 : -1}
                      onClick={() => setIndiaTab('tourist')}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                          e.preventDefault();
                          setIndiaTab('medical');
                          document.getElementById('india-tab-medical')?.focus();
                        }
                      }}
                      className={`min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer ${
                        indiaTab === 'tourist'
                          ? 'bg-[#0B1F3A] text-white'
                          : 'text-[#374151] hover:text-[#0B1F3A]'
                      }`}
                    >
                      <Globe
                        className={`w-4 h-4 ${indiaTab === 'tourist' ? 'text-[#C9A24B]' : 'text-[#7D5D14]'}`}
                        aria-hidden="true"
                      />
                      {t('ট্যুরিস্ট ভিসা (Tourist)', 'Tourist Visa')}
                    </button>
                  </div>

                  {indiaTab === 'medical' ? (
                    <div
                      id="india-panel-medical"
                      role="tabpanel"
                      aria-labelledby="india-tab-medical"
                      className="space-y-4 text-sm text-[#4B5563]"
                    >
                      <h3 className="heading-h3 text-[#0B1F3A]">
                        {t('রোগী ও Medical Attendant-এর জন্য বিশেষ নির্দেশনা', 'Patient & Medical Attendant Documentation')}
                      </h3>
                      <p className="leading-[1.75]">
                        {t(
                          'ভারতের অনুমোদিত হাসপাতাল (কলকাতা, ভেলোর CMC, চেন্নাই Apollo, দিল্লি Max/Fortis ইত্যাদি) থেকে রোগী ও সর্বোচ্চ ৩ জন অ্যাটেনডেন্টের নাম-পাসপোর্ট নম্বরসহ Invitation/Appointment Letter প্রয়োজন। আমরা আপনার ডাক্তারি রিপোর্ট দেখে ইনভিটেশন লেটার সংগ্রহে সাহায্য করি।',
                          'An official Appointment/Invitation Letter listing patient and up to 3 attendant passport numbers from a recognized Indian hospital is required. We coordinate hospital letters based on your doctor reports.'
                        )}
                      </p>
                      <p className="text-xs text-[#525B68] leading-[1.7]">
                        {t(
                          'IVAC সেন্টার: চাঁপাইনবাবগঞ্জ ও রাজশাহী বিভাগের আবেদনকারীদের জন্য রাজশাহী IVAC কেন্দ্রিক সম্পূর্ণ ফাইল প্রস্তুতি সাপোর্ট।',
                          'IVAC Support: Full file compilation tailored for Rajshahi IVAC and nearby centers.'
                        )}
                      </p>
                    </div>
                  ) : (
                    <div
                      id="india-panel-tourist"
                      role="tabpanel"
                      aria-labelledby="india-tab-tourist"
                      className="space-y-4 text-sm text-[#4B5563]"
                    >
                      <h3 className="heading-h3 text-[#0B1F3A]">
                        {t('ভারতীয় ট্যুরিস্ট ভিসা ও IVAC Appointment গাইড', 'India Tourist Visa & IVAC Filing Guide')}
                      </h3>
                      <p className="leading-[1.75]">
                        {t(
                          'সঠিক বর্তমান ঠিকানা (ইউটিলিটি বিলের সাথে মিল রেখে), পেশার প্রমাণপত্র (NOC/Trade License/Student ID), ৩–৬ মাসের ব্যাংক স্টেটমেন্ট বা ডলার এনডোর্সমেন্ট এবং উপযুক্ত Port of Entry নির্বাচন করে নির্ভুল ফাইল প্রস্তুত করা হয়।',
                          'Accurate present address matching your utility bill, occupation proof, bank statement or dollar endorsement, and appropriate Port of Entry setup.'
                        )}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* HAJJ & UMRAH: Economy / Standard / VIP Comparison Table + Dua Guide */}
              {service.slug === 'hajj-umrah' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="heading-h2 text-[#0F5132] mb-6">
                      {t('ওমরাহ প্যাকেজ তুলনা (Economy · Standard · VIP)', 'Umrah Package Comparison (Economy · Standard · VIP)')}
                    </h2>
                    <div className="overflow-x-auto card-surface border-[#0F5132]/15">
                      <table className="w-full text-left text-sm min-w-[600px]">
                        <thead className="bg-[#0F5132] text-white text-xs">
                          <tr>
                            <th className="p-4">{t('ক্যাটাগরি', 'Tier')}</th>
                            <th className="p-4">{t('হারাম থেকে দূরত্ব', 'Distance to Haram')}</th>
                            <th className="p-4">{t('রুম ও ফ্লাইট', 'Room & Flight')}</th>
                            <th className="p-4">{t('খাবার ও জিয়ারাহ', 'Meals & Ziyarah')}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#0F5132]/10 leading-[1.7]">
                          {hajjComparisonTiers.map((row) => (
                            <tr key={row.tier} className="align-top">
                              <td className="p-4 font-bold text-[#0F5132]">
                                {isEn ? row.labelEn : row.labelBn}
                                <div className="text-xs font-normal text-[#7D5D14] mt-1">
                                  {isEn ? row.priceNoteEn : row.priceNoteBn}
                                </div>
                              </td>
                              <td className="p-4 text-[#4B5563]">
                                {isEn ? row.hotelDistanceEn : row.hotelDistanceBn}
                              </td>
                              <td className="p-4 text-[#4B5563]">
                                <div>{isEn ? row.roomTypeEn : row.roomTypeBn}</div>
                                <div className="text-xs text-[#525B68] mt-1">
                                  {isEn ? row.flightEn : row.flightBn}
                                </div>
                              </td>
                              <td className="p-4 text-[#4B5563]">
                                <div>{isEn ? row.mealsEn : row.mealsBn}</div>
                                <div className="text-xs text-[#0F5132] mt-1">
                                  {isEn ? row.ziyarahEn : row.ziyarahBn}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Moallem, Payment Schedule & Dua Guide */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="rounded-2xl bg-[#0F5132]/[0.06] p-6 border border-[#0F5132]/15">
                      <h3 className="heading-h3 text-[#0F5132]">
                        {t('মুয়াল্লেম, প্রস্থান ও Payment Schedule', 'Moallem, Departure & Payment Schedule')}
                      </h3>
                      <ul className="mt-4 space-y-2.5 text-sm text-[#374151] leading-[1.75]">
                        <li>• {t('অভিজ্ঞ আলেম/মুয়াল্লেমের সার্বক্ষণিক তত্ত্বাবধান ও বাংলা প্রশিক্ষণ।', 'Experienced Moallem guidance and Bangla pre-departure workshop.')}</li>
                        <li>• {t('১ম ধাপ: বুকিং কনফার্মেশন ও পাসপোর্ট জমা (অফিসিয়াল রিসিটসহ)।', 'Stage 1: Booking deposit & passport intake with official receipt.')}</li>
                        <li>• {t('২য় ধাপ: ভিসা ও এয়ার টিকেট ইস্যুর সময় নির্ধারিত কিস্তি।', 'Stage 2: Scheduled installment upon visa & ticket issuance.')}</li>
                        <li>• {t('৩য় ধাপ: ফ্লাইটের পূর্বে চূড়ান্ত পেমেন্ট ও ট্রাভেল কিট হস্তান্তর।', 'Stage 3: Final balance before departure & travel kit handover.')}</li>
                      </ul>
                    </div>

                    <div className="card-surface border-[#C9A24B]/45 p-6">
                      <h3 className="heading-h3 text-[#0F5132]">
                        {t('ওমরাহ আমল ও দোয়া গাইডলাইন', 'Umrah Rituals & Dua Essentials')}
                      </h3>
                      <ul className="mt-4 space-y-2.5 text-sm text-[#4B5563] leading-[1.75]">
                        <li>{t('১.', '1.')} {t('মিকাত থেকে ইহরাম ও তালবিয়াহ (লাব্বাইক আল্লাহুম্মা লাব্বাইক)', 'Ihram & Talbiyah from Miqat')}</li>
                        <li>{t('২.', '2.')} {t('মসজিদুল হারামে ৭ চক্কর তাওয়াফ ও মাকামে ইবরাহিমে ২ রাকাত নামাজ', '7 circuits of Tawaf & 2 Rakaat behind Maqam Ibrahim')}</li>
                        <li>{t('৩.', '3.')} {t('জমজম পানি পান ও সাফা-মারওয়া ৭ চক্কর সাঈ', 'Drinking Zamzam & 7 laps of Sa’i between Safa and Marwah')}</li>
                        <li>{t('৪.', '4.')} {t('হলক (মাথা মুণ্ডানো) বা কসর (চুল ছাঁটা) এবং মদিনা জিয়ারাহ', 'Halq/Taqsir and peaceful Ziyarah in Madinah Munawwarah')}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* WORK PERMIT: Job Categories & Countries Table */}
              {service.slug === 'work-permit' && (
                <div>
                  <h2 className="heading-h2 text-[#0B1F3A] mb-6">
                    {t('সাধারণ Job Category ও গন্তব্য দেশসমূহ', 'Common Job Categories & Destination Countries')}
                  </h2>
                  <div className="overflow-x-auto card-surface">
                    <table className="w-full text-left text-sm min-w-[580px]">
                      <thead className="bg-[#0B1F3A] text-white text-xs">
                        <tr>
                          <th className="p-4">{t('ক্যাটাগরি', 'Category')}</th>
                          <th className="p-4">{t('কাজের ধরন', 'Typical Roles')}</th>
                          <th className="p-4">{t('দেশসমূহ', 'Countries')}</th>
                          <th className="p-4">{t('বেতন কাঠামো', 'Salary Range')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#0B1F3A]/8 leading-[1.7]">
                        {workPermitCategories.map((cat) => (
                          <tr key={cat.categoryEn} className="align-top">
                            <td className="p-4 font-bold text-[#0B1F3A]">
                              {isEn ? cat.categoryEn : cat.categoryBn}
                            </td>
                            <td className="p-4 text-[#4B5563]">{isEn ? cat.rolesEn : cat.rolesBn}</td>
                            <td className="p-4 text-[#4B5563]">
                              {isEn ? cat.countriesEn : cat.countriesBn}
                            </td>
                            <td className="p-4 text-xs text-[#525B68]">
                              {isEn ? cat.salaryPlaceholderEn : cat.salaryPlaceholderBn}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* STUDENT CONSULTANCY: Matrix + Profile Evaluation */}
              {service.slug === 'student-consultancy' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="heading-h2 text-[#0B1F3A] mb-6">
                      {t('দেশ → বিশ্ববিদ্যালয় → কোর্স ও ইনটেক কাঠামো', 'Country → University → Course & Intake Guide')}
                    </h2>
                    <div className="overflow-x-auto card-surface">
                      <table className="w-full text-left text-sm min-w-[620px]">
                        <thead className="bg-[#0B1F3A] text-white text-xs">
                          <tr>
                            <th className="p-4">{t('দেশ', 'Country')}</th>
                            <th className="p-4">{t('জনপ্রিয় বিশ্ববিদ্যালয়', 'Sample Universities')}</th>
                            <th className="p-4">{t('জনপ্রিয় কোর্স', 'Popular Courses')}</th>
                            <th className="p-4">{t('ইনটেক ও ভাষা শর্ত', 'Intakes & IELTS')}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#0B1F3A]/8 leading-[1.7]">
                          {studentStudyMatrix.map((row) => (
                            <tr key={row.countryEn} className="align-top">
                              <td className="p-4 font-bold text-[#0B1F3A]">
                                {isEn ? row.countryEn : row.countryBn}
                              </td>
                              <td className="p-4 text-[#4B5563]">{row.universities}</td>
                              <td className="p-4 text-[#4B5563]">{row.courses}</td>
                              <td className="p-4 text-xs text-[#4B5563]">
                                <div className="font-semibold text-[#0B1F3A]">{row.intakes}</div>
                                <div className="mt-1 text-[#525B68]">{row.language}</div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Quick Student Profile Pre-Fill Card */}
                  <div className="card-surface border-[#C9A24B]/45 p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <GraduationCap className="w-5 h-5 text-[#7D5D14]" aria-hidden="true" />
                      <h3 className="heading-h3 text-[#0B1F3A]">
                        {t('ফ্রি একাডেমিক প্রোফাইল ইভ্যালুয়েশন তথ্য', 'Free Academic Profile Evaluation Details')}
                      </h3>
                    </div>
                    <p className="text-sm text-[#525B68] mb-6 leading-[1.7]">
                      {t(
                        'আপনার একাডেমিক তথ্য এখানে সেট করুন — পাশের/নিচের কনসাল্টেশন ফর্ম জমা দিলে এগুলো স্বয়ংক্রিয়ভাবে যুক্ত হয়ে যাবে।',
                        'Enter your academic details here — they attach automatically when you submit the consultation form.'
                      )}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="student-eval-education" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
                          {t('সর্বশেষ ডিগ্রি', 'Last Qualification')}
                        </label>
                        <select
                          id="student-eval-education"
                          value={studentEval.education}
                          onChange={(e) => setStudentEval({ ...studentEval, education: e.target.value })}
                          className={inputClass}
                        >
                          <option>HSC / A-Level</option>
                          <option>Bachelor / Honours</option>
                          <option>Diploma Engineering</option>
                          <option>Masters</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="student-eval-gpa" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
                          {t('GPA / CGPA', 'GPA / CGPA')}
                        </label>
                        <input
                          id="student-eval-gpa"
                          type="text"
                          inputMode="decimal"
                          value={studentEval.gpa}
                          onChange={(e) => setStudentEval({ ...studentEval, gpa: e.target.value })}
                          placeholder="e.g. HSC 4.50 / CGPA 3.30"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="student-eval-english" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
                          {t('IELTS / PTE স্কোর', 'IELTS / English Score')}
                        </label>
                        <input
                          id="student-eval-english"
                          type="text"
                          value={studentEval.english}
                          onChange={(e) => setStudentEval({ ...studentEval, english: e.target.value })}
                          placeholder="e.g. IELTS 6.0 / Not yet"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="student-eval-intake" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
                          {t('লক্ষ্য ইনটেক', 'Preferred Intake')}
                        </label>
                        <select
                          id="student-eval-intake"
                          value={studentEval.intake}
                          onChange={(e) => setStudentEval({ ...studentEval, intake: e.target.value })}
                          className={inputClass}
                        >
                          <option>January / Spring</option>
                          <option>May / Summer</option>
                          <option>September / Fall</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* AIR TICKETING: Dedicated Flight Enquiry Form */}
              {service.slug === 'air-ticketing' && (
                <div className="card-surface border-[#C9A24B]/45 p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Plane className="w-5 h-5 text-[#7D5D14]" aria-hidden="true" />
                    <h2 className="heading-h3 text-[#0B1F3A]">
                      {t('ফ্লাইট ও ভাড়া যাচাই ফর্ম (Air Ticket Enquiry)', 'Flight Fare Enquiry Details')}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="flight-scope" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
                        {t('রুট ধরন', 'Route Scope')}
                      </label>
                      <select
                        id="flight-scope"
                        value={flightForm.scope}
                        onChange={(e) => setFlightForm({ ...flightForm, scope: e.target.value })}
                        className={inputClass}
                      >
                        <option value="International">{t('আন্তর্জাতিক (International)', 'International')}</option>
                        <option value="Domestic">{t('অভ্যন্তরীণ (Domestic)', 'Domestic')}</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="flight-trip-type" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
                        {t('ট্রিপ ধরন', 'Trip Type')}
                      </label>
                      <select
                        id="flight-trip-type"
                        value={flightForm.tripType}
                        onChange={(e) => setFlightForm({ ...flightForm, tripType: e.target.value })}
                        className={inputClass}
                      >
                        <option value="Round-trip">{t('রিটার্ন (Round-trip)', 'Round-trip')}</option>
                        <option value="One-way">{t('ওয়ান-ওয়ে (One-way)', 'One-way')}</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="flight-cabin" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
                        {t('ক্লাস', 'Cabin Class')}
                      </label>
                      <select
                        id="flight-cabin"
                        value={flightForm.cabin}
                        onChange={(e) => setFlightForm({ ...flightForm, cabin: e.target.value })}
                        className={inputClass}
                      >
                        <option>Economy</option>
                        <option>Premium Economy</option>
                        <option>Business</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="flight-from" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
                        {t('যাত্রা শুরু (From)', 'From')}
                      </label>
                      <input
                        id="flight-from"
                        type="text"
                        value={flightForm.from}
                        onChange={(e) => setFlightForm({ ...flightForm, from: e.target.value })}
                        placeholder="Dhaka (DAC) / Rajshahi (RJH)"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="flight-to" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
                        {t('গন্তব্য (To)', 'To')}
                      </label>
                      <input
                        id="flight-to"
                        type="text"
                        value={flightForm.to}
                        onChange={(e) => setFlightForm({ ...flightForm, to: e.target.value })}
                        placeholder="Jeddah / Dubai / Kuala Lumpur / Kolkata"
                        className={inputClass}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="flight-date" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
                          {t('তারিখ', 'Date')}
                        </label>
                        <input
                          id="flight-date"
                          type="date"
                          value={flightForm.date}
                          onChange={(e) => setFlightForm({ ...flightForm, date: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="flight-passengers" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
                          {t('যাত্রী', 'Passengers')}
                        </label>
                        <input
                          id="flight-passengers"
                          type="number"
                          inputMode="numeric"
                          min="1"
                          max="20"
                          value={flightForm.passengers}
                          onChange={(e) => setFlightForm({ ...flightForm, passengers: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-[#525B68] leading-[1.7]">
                    {t(
                      'উপরের তথ্য পূরণ করে পাশের কনসাল্টেশন ফর্মে আপনার নাম ও মোবাইল নম্বর দিন — আমরা লাইভ এয়ারলাইনস ভাড়া ও ব্যাগেজ বিস্তারিত পাঠাব।',
                      'Fill your route above and submit your name & mobile in the inquiry box for live fares and baggage options.'
                    )}
                  </p>
                </div>
              )}

              {/* HOTEL BOOKING: Dedicated Hotel Enquiry Form */}
              {service.slug === 'hotel-booking' && (
                <div className="card-surface border-[#C9A24B]/45 p-6 sm:p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-[#7D5D14]" aria-hidden="true" />
                    <h2 className="heading-h3 text-[#0B1F3A]">
                      {t('হোটেল বুকিং তথ্য (Hotel Request)', 'Hotel Reservation Details')}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="hotel-city" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
                        {t('শহর / এলাকা', 'City / Area')}
                      </label>
                      <input
                        id="hotel-city"
                        type="text"
                        value={hotelForm.city}
                        onChange={(e) => setHotelForm({ ...hotelForm, city: e.target.value })}
                        placeholder="Makkah / Dubai / Kolkata / Cox's Bazar"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="hotel-checkin" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
                        {t('চেক-ইন তারিখ', 'Check-In')}
                      </label>
                      <input
                        id="hotel-checkin"
                        type="date"
                        value={hotelForm.checkIn}
                        onChange={(e) => setHotelForm({ ...hotelForm, checkIn: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="hotel-checkout" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
                        {t('চেক-আউট তারিখ', 'Check-Out')}
                      </label>
                      <input
                        id="hotel-checkout"
                        type="date"
                        value={hotelForm.checkOut}
                        onChange={(e) => setHotelForm({ ...hotelForm, checkOut: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="hotel-guests" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
                        {t('অতিথি সংখ্যা', 'Guests')}
                      </label>
                      <input
                        id="hotel-guests"
                        type="number"
                        inputMode="numeric"
                        min="1"
                        max="20"
                        value={hotelForm.guests}
                        onChange={(e) => setHotelForm({ ...hotelForm, guests: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="hotel-budget" className="block text-xs font-semibold text-[#0B1F3A] mb-2">
                        {t('বাজেট / মান', 'Budget / Hotel Tier')}
                      </label>
                      <select
                        id="hotel-budget"
                        value={hotelForm.budget}
                        onChange={(e) => setHotelForm({ ...hotelForm, budget: e.target.value })}
                        className={inputClass}
                      >
                        <option>Budget Clean (2–3 Star)</option>
                        <option>Standard (3–4 Star)</option>
                        <option>Luxury (5 Star / Haram Front)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* TOUR PACKAGE: Featured Packages Preview */}
              {service.slug === 'tour-package' && (
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <h2 className="heading-h2 text-[#0B1F3A]">
                      {t('জনপ্রিয় ট্যুর প্যাকেজসমূহ', 'Popular Tour Packages')}
                    </h2>
                    <Link to={localizedPath('/tour-packages')} className="btn-secondary btn-sm shrink-0">
                      {t('ফিল্টার ও তুলনা করুন', 'Filter & Compare')}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {tourPackagesData.slice(0, 4).map((pkg) => (
                      <PackageCard key={pkg.slug} pkg={pkg} />
                    ))}
                  </div>
                </div>
              )}

              {/* 3. ELIGIBILITY */}
              <div>
                <h2 className="heading-h2 text-[#0B1F3A]">
                  {t('কারা আবেদন করতে পারবেন (Eligibility)', 'Eligibility Criteria')}
                </h2>
                <ul className="mt-6 space-y-3 card-surface p-6 sm:p-8">
                  {eligibility.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] text-[#374151] leading-[1.75]">
                      <Check className="w-4 h-4 text-[#7D5D14] shrink-0 mt-1.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4. REQUIRED DOCUMENTS CHECKLIST */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h2 className="heading-h2 text-[#0B1F3A]">
                    {t('প্রয়োজনীয় ডকুমেন্ট চেকলিস্ট', 'Required Documents Checklist')}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setChecklistOpen(true)}
                    className="btn-secondary btn-sm shrink-0"
                  >
                    <FileDown className="w-4 h-4 text-[#7D5D14]" aria-hidden="true" />
                    <span lang={!isEn ? 'en' : undefined}>Download Checklist</span>
                  </button>
                </div>

                <div className="card-surface p-6 sm:p-8">
                  <ul className="space-y-4">
                    {documents.map((doc, idx) => (
                      <li key={doc} className="flex items-start gap-3 text-[15px] text-[#374151] leading-[1.75]">
                        <span className="w-7 h-7 rounded-lg bg-[#FAF8F4] border border-[#0B1F3A]/10 text-xs font-bold text-[#0B1F3A] flex items-center justify-center shrink-0 tabular-nums mt-0.5">
                          {isEn ? idx + 1 : toBanglaDigits(idx + 1)}
                        </span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 pt-4 border-t border-[#0B1F3A]/8 text-xs text-[#525B68] leading-[1.7]">
                    {t(
                      'বিঃদ্রঃ এটি একটি সাধারণ চেকলিস্ট। Embassy বা সংশ্লিষ্ট কর্তৃপক্ষের নিয়ম অনুযায়ী অতিরিক্ত কাগজপত্র প্রয়োজন হতে পারে।',
                      'Note: This is a general checklist. Additional documents may be requested per current Embassy regulations.'
                    )}
                  </p>
                </div>

                <div className="mt-6">
                  <SectionCtaStrip
                    variant={isHajj ? 'hajj' : 'white'}
                    locationId={`service_after_documents_${service.slug}`}
                    primaryHref="#service-inquiry"
                    headingBn={
                      isHajj
                        ? 'ওমরাহ বা হজ্জ প্যাকেজের তারিখ ও খরচ জানতে চান?'
                        : `${service.titleBn}-এর ডকুমেন্ট ফ্রি যাচাই করুন`
                    }
                    headingEn={
                      isHajj
                        ? 'Check Upcoming Umrah & Hajj Dates and Packages'
                        : `Verify Your ${service.titleEn} Documents for Free`
                    }
                    subtextBn="প্রিন্টযোগ্য PDF চেকলিস্ট ডাউনলোড করুন অথবা সরাসরি WhatsApp-এ পরামর্শ নিন।"
                    subtextEn="Download the printable PDF checklist or message our desk on WhatsApp."
                    onDownloadChecklist={() => setChecklistOpen(true)}
                    checklistLabelBn="PDF চেকলিস্ট ডাউনলোড"
                    checklistLabelEn="Download Checklist PDF"
                  />
                </div>
              </div>

              {/* 5. PROCESS TIMELINE */}
              <div>
                <h2 className="heading-h2 text-[#0B1F3A] mb-6">
                  {t('আবেদন ও প্রসেসিং ধাপসমূহ', 'Step-by-Step Process Timeline')}
                </h2>
                <div className="space-y-4">
                  {service.steps.map((step, idx) => (
                    <div
                      key={step.titleEn}
                      className="card-surface p-6 flex items-start gap-4"
                    >
                      <div
                        className={`w-11 h-11 rounded-xl font-editorial font-bold text-base flex items-center justify-center shrink-0 tabular-nums ${
                          isHajj ? 'bg-[#0F5132] text-[#E2BE67]' : 'bg-[#0B1F3A] text-[#C9A24B]'
                        }`}
                      >
                        {isEn ? `0${idx + 1}` : toBanglaDigits(`0${idx + 1}`)}
                      </div>
                      <div>
                        <h3 className="heading-h3 text-[#0B1F3A]">
                          {isEn ? step.titleEn : step.titleBn}
                        </h3>
                        <p className="mt-2 text-sm text-[#4B5563] leading-[1.75]">
                          {isEn ? step.descEn : step.descBn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. PROCESSING TIME + FEE RANGE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="card-surface p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#7D5D14] mb-2">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    {t('সম্ভাব্য প্রসেসিং সময়', 'Estimated Processing Time')}
                  </div>
                  <p className="text-sm font-semibold text-[#0B1F3A] leading-[1.75]">
                    {isEn ? service.processingTimeEn : service.processingTimeBn}
                  </p>
                </div>

                <div className="card-surface p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#7D5D14] mb-2">
                    <Wallet className="w-4 h-4" aria-hidden="true" />
                    {t('ফি ও চার্জ কাঠামো', 'Fee Structure')}
                  </div>
                  <p className="text-sm font-semibold text-[#0B1F3A] leading-[1.75]">
                    {isEn ? service.feeNoteEn : service.feeNoteBn}
                  </p>
                </div>
              </div>

              {/* TRANSPARENT FEE & PAYMENT RECEIPT POLICY */}
              <div className="space-y-3">
                <TransparentFeeNote variant="inline" />
                <PaymentReceiptNotice variant="inline" />
              </div>

              {/* OFFICIAL EMBASSY & GOVERNMENT INFORMATION SOURCES ("তথ্যের উৎস") */}
              {['work-permit', 'tourist-visa', 'student-consultancy', 'hajj-umrah', 'india-visa'].includes(
                service.slug
              ) && <OfficialSourcesNote tags={[service.slug, 'general']} />}

              {/* "সততার অঙ্গীকার" PROMISE BLOCK */}
              <HonestyPledgeBlock variant={isHajj ? 'hajj' : 'white'} compact />

              {/* NATURAL LOCATION-AWARE REGIONAL GUIDANCE (Chapai Nawabganj, Rajshahi & Bangladesh) */}
              {localCallout && (
                <div
                  className={`rounded-2xl p-6 sm:p-8 border space-y-4 ${
                    isHajj
                      ? 'bg-[#0F5132]/[0.05] border-[#0F5132]/20'
                      : 'bg-white border-[#0B1F3A]/10'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#7D5D14]">
                    <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{isEn ? localCallout.kickerEn : localCallout.kickerBn}</span>
                  </div>
                  <h2 className="heading-h3 text-[#0B1F3A]">
                    {isEn ? localCallout.headingEn : localCallout.headingBn}
                  </h2>
                  <p className="text-sm text-[#4B5563] leading-[1.75]">
                    {isEn ? localCallout.bodyEn : localCallout.bodyBn}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {featuredAreas.map((area) => (
                      <Link
                        key={area.id}
                        to={`${localizedPath('/service-areas')}#${area.id}`}
                        className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#FAF8F4] hover:border-[#C9A24B] border border-[#0B1F3A]/10 text-xs font-semibold text-[#0B1F3A] inline-flex items-center gap-1.5 transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#7D5D14]" aria-hidden="true" />
                        <span>{isEn ? area.nameEn : area.nameBn}</span>
                      </Link>
                    ))}
                  </div>
                  <address className="not-italic pt-3 border-t border-[#0B1F3A]/8 text-xs text-[#525B68] flex flex-wrap items-center justify-between gap-2">
                    <span>
                      <strong className="text-[#0B1F3A]">{siteConfig.brandName}</strong> ·{' '}
                      {t(siteConfig.contact.officeAddressBn, siteConfig.contact.officeAddressEn)} ·{' '}
                      <span className="tabular-nums">{siteConfig.contact.phoneDisplay}</span>
                    </span>
                    <a
                      href={siteConfig.contact.mapDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#7D5D14] hover:underline"
                    >
                      {t('অফিস ম্যাপ ও দিকনির্দেশনা →', 'Office Directions →')}
                    </a>
                  </address>
                </div>
              )}

              {/* 7. COUNTRY-WISE OPTIONS */}
              {service.countriesBn && service.countriesBn.length > 0 && (
                <div>
                  <h2 className="heading-h2 text-[#0B1F3A] mb-6">
                    {t('প্রধান দেশসমূহ', 'Supported Countries & Destinations')}
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {(isEn ? service.countriesEn || service.countriesBn : service.countriesBn).map((c) => (
                      <Link
                        key={c}
                        to={localizedPath('/destinations')}
                        className="px-4 py-2.5 rounded-xl bg-white border border-[#0B1F3A]/10 text-sm font-semibold text-[#0B1F3A] hover:border-[#C9A24B] hover:text-[#7D5D14] transition-colors"
                      >
                        {c}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. SERVICE FAQs */}
              <div>
                <h2 className="heading-h2 text-[#0B1F3A] mb-6">
                  {t('সচরাচর জিজ্ঞাসা (FAQ)', 'Frequently Asked Questions')}
                </h2>
                <FaqAccordion items={faqEntries} />
              </div>

              <GoldDivider className="py-2" />

              {/* 10. RELATED SERVICES & BLOG POSTS */}
              <div className="space-y-10">
                <div>
                  <h2 className="heading-h3 text-[#0B1F3A] mb-6">
                    {t('সম্পর্কিত অন্যান্য সার্ভিস', 'Related Services')}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {relatedServices.map((rel) => (
                      <ServiceCard key={rel.slug} service={rel} />
                    ))}
                  </div>
                </div>

                {relatedBlogs.length > 0 && (
                  <div>
                    <h2 className="heading-h3 text-[#0B1F3A] mb-6">
                      {t('সম্পর্কিত গাইড ও ব্লগ', 'Related Guides & Articles')}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {relatedBlogs.map((blog) => (
                        <Link
                          key={blog.slug}
                          to={localizedPath(`/blog/${blog.slug}`)}
                          className="card-interactive p-6 block"
                        >
                          <p className="text-xs text-[#7D5D14] font-semibold">
                            {isEn ? blog.categoryEn : blog.categoryBn} ·{' '}
                            {isEn ? blog.readingTimeEn : blog.readingTimeBn}
                          </p>
                          <h3 className="mt-2 text-base font-bold text-[#0B1F3A] leading-snug">
                            {isEn ? blog.titleEn : blog.titleBn}
                          </h3>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 9. STICKY SIDE INQUIRY FORM */}
            <aside id="service-inquiry" className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div className="card-surface border-[#C9A24B]/45 p-6 sm:p-8 shadow-[0_14px_36px_rgba(11,31,58,0.08)]">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#7D5D14] mb-1">
                  {t('বিনামূল্যে পরামর্শ', 'Free Consultation')}
                </p>
                <h2 className="heading-h3 text-[#0B1F3A] mb-6">
                  {isEn ? `Inquire About ${service.titleEn}` : `${service.titleBn} সম্পর্কে জানতে ফর্ম পূরণ করুন`}
                </h2>
                <InquiryForm
                  defaultService={service.titleEn}
                  compact
                  formType={`service_${service.slug}`}
                  extraFields={extraFieldsForForm}
                />
              </div>

              <div className={`${heroBg} text-white rounded-2xl p-6 space-y-4 shadow-[0_14px_36px_rgba(11,31,58,0.16)]`}>
                <p className="text-sm font-bold">
                  {t('সরাসরি কথা বলতে চান?', 'Prefer Calling or WhatsApp?')}
                </p>
                <a
                  href={siteConfig.contact.phoneHref}
                  onClick={() => trackAnalyticsEvent('call_click', { location: `service_sidebar_${service.slug}` })}
                  className="btn-secondary-light btn-sm w-full tabular-nums"
                >
                  <Phone className={`w-4 h-4 ${isHajj ? 'text-[#E2BE67]' : 'text-[#C9A24B]'}`} aria-hidden="true" />
                  {siteConfig.contact.phoneDisplay}
                </a>
                <a
                  href={pageCtx.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackAnalyticsEvent('whatsapp_click', {
                      location: `service_sidebar_${service.slug}`,
                      prefilled_topic: service.slug,
                    })
                  }
                  className="btn-primary btn-sm w-full"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Support
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CtaBanner
        defaultService={service.titleEn}
        theme={isHajj ? 'hajj' : 'navy'}
        headingBn={
          isHajj
            ? 'পবিত্র ওমরাহ বা হজ্জ সফরের জন্য আজই বুকিং পরামর্শ নিন'
            : `${service.titleBn} নিয়ে ফ্রি বিশেষজ্ঞ পরামর্শ নিন`
        }
        headingEn={
          isHajj
            ? 'Plan Your Sacred Umrah or Hajj Journey with Us'
            : `Get Free Expert Guidance on ${service.titleEn}`
        }
      />

      {checklistOpen && (
        <Suspense fallback={null}>
          <ChecklistModal
            open={checklistOpen}
            onClose={() => setChecklistOpen(false)}
            title={isEn ? `${service.titleEn} — Document Checklist` : `${service.titleBn} — ডকুমেন্ট চেকলিস্ট (PDF)`}
            serviceName={service.titleEn}
            documents={documents}
            documentsEn={service.documentsEn}
            pdfTitleEn={`${service.titleEn} Document Checklist`}
            trigger="inline"
            checklistId={`${service.slug}-checklist`}
          />
        </Suspense>
      )}
    </>
  );
}
