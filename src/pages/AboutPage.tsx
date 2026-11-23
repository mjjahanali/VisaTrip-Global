import { Link } from 'react-router-dom';
import { ShieldCheck, HeartHandshake, Eye, Compass, ArrowRight } from 'lucide-react';
import { SeoHead, buildBreadcrumbSchema, buildLocalBusinessSchema } from '../lib/seo';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SafeImage } from '../components/SafeImage';
import { SectionHeader } from '../components/SectionHeader';
import { GoldDivider } from '../components/GoldDivider';
import { CtaBanner } from '../components/CtaBanner';
import { HeroCtaRow } from '../components/HeroCtaRow';
import { SectionCtaStrip } from '../components/SectionCtaStrip';
import {
  LicenseStrip,
  HonestyPledgeBlock,
  TeamAndOfficeSlots,
  PaymentReceiptNotice,
  TransparentFeeNote,
} from '../components/TrustSignals';
import { StaggerGroup, StaggerItem } from '../components/MotionPrimitives';

export function AboutPage() {
  const { isEn, locale, localizedPath, t } = useLanguage();

  const breadcrumbs = [
    { label: t('হোম', 'Home'), to: '/' },
    { label: t('আমাদের সম্পর্কে', 'About Us') },
  ];

  const values = [
    {
      icon: ShieldCheck,
      titleBn: 'সততা ও বাস্তব পরামর্শ',
      descBn: 'ভিসা অনুমোদনের মিথ্যা আশ্বাস নয়; প্রতিটি আবেদনের বাস্তব সম্ভাবনা ও ঝুঁকি খোলাখুলি জানাই।',
      titleEn: 'Honest Guidance First',
      descEn: 'Zero fake approval promises — we clearly explain both eligibility strengths and real Embassy rules.',
    },
    {
      icon: Eye,
      titleBn: 'পূর্ণ আর্থিক স্বচ্ছতা',
      descBn: 'সরকারি ফি, এয়ারফেয়ার এবং সার্ভিস চার্জ আলাদাভাবে জানানো হয় এবং প্রতিটি পেমেন্টে মানি রিসিট দেওয়া হয়।',
      titleEn: 'Complete Financial Clarity',
      descEn: 'Government fees, airfares, and service charges are itemized upfront with official receipts.',
    },
    {
      icon: HeartHandshake,
      titleBn: 'প্রথমবার যাত্রীর পাশে থাকা',
      descBn: 'গ্রাম বা মফস্বলের প্রথমবার বিদেশগামী মানুষ যেন ভীত না হন, সেজন্য সহজ বাংলায় প্রতিটি ধাপ বুঝিয়ে দিই।',
      titleEn: 'Care for First-Time Travelers',
      descEn: 'Calm, respectful guidance in clear Bangla so first-time flyers and senior pilgrims feel confident.',
    },
    {
      icon: Compass,
      titleBn: 'এক ছাদের নিচে ৮টি সেবা',
      descBn: 'Work Permit থেকে শুরু করে হজ্জ-ওমরাহ, ভারত মেডিকেল ভিসা ও ফ্লাইট-হোটেল সবকিছুর সমন্বিত সাপোর্ট।',
      titleEn: '8 Integrated Services',
      descEn: 'Coordinated visa, Umrah, study abroad, medical travel, air ticketing, hotel, and tour support.',
    },
  ];

  return (
    <>
      <SeoHead
        title={t('আমাদের সম্পর্কে | Visatrip Global চাঁপাইনবাবগঞ্জ', 'About Visatrip Global | Trusted Travel Agency Bangladesh')}
        description={t(
          'Visatrip Global — চাঁপাইনবাবগঞ্জের বিশ্বস্ত ট্রাভেল ও ভিসা কনসালটেন্সি। আমাদের গল্প, মিশন, মূল্যবোধ এবং অভিজ্ঞ টিম সম্পর্কে জানুন।',
          'Discover Visatrip Global’s story, mission, transparent values, and consultancy team in Chapai Nawabganj, Bangladesh.'
        )}
        canonicalPath="/about"
        locale={locale}
        schemas={[
          buildBreadcrumbSchema(
            [
              { name: t('হোম', 'Home'), path: '/' },
              { name: t('আমাদের সম্পর্কে', 'About Us'), path: '/about' },
            ],
            locale
          ),
          buildLocalBusinessSchema(),
        ]}
      />

      {/* Hero */}
      <section className="bg-navy-hero text-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Breadcrumbs items={breadcrumbs} light />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="h-[1px] w-8 bg-[#C9A24B]" aria-hidden="true" />
                <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#C9A24B]">
                  {t('আমাদের পরিচয় · চাঁপাইনবাবগঞ্জ, বাংলাদেশ', 'Our Identity · Chapai Nawabganj, Bangladesh')}
                </p>
              </div>
              <h1 className="heading-h1 text-white">
                {t('প্রতিটি গন্তব্যে এক বিশ্বস্ত সহযোগী', 'Your Trusted Companion to Every Destination')}
              </h1>
              <p className="body-lead mt-6 text-white/85">
                {t(
                  'চাঁপাইনবাবগঞ্জ ও রাজশাহী বিভাগের সাধারণ মানুষ, শিক্ষার্থী, রোগী ও প্রবাসী কর্মীরা যেন ঢাকা বা অচেনা দালালের ওপর নির্ভর না করে নিজ এলাকা থেকেই মানসম্মত ও স্বচ্ছ ভিসা-ট্রাভেল সেবা পান — সেই লক্ষ্য নিয়েই Visatrip Global-এর যাত্রা।',
                  'Visatrip Global was established so families, students, medical travelers, pilgrims, and skilled workers across Chapai Nawabganj, Rajshahi division, and Bangladesh can access honest, dependable, well-structured travel and visa consultancy without relying on unverified middlemen.'
                )}
              </p>
              <HeroCtaRow locationId="about_hero" showCallLink />
            </div>
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#C9A24B]/35 aspect-[4/3] shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <SafeImage imageKey="office" preset="editorial" priority className="w-full h-full object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071529]/50 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consistent License & Office Verification Strip */}
      <section className="bg-white border-b border-[#0B1F3A]/8 py-4">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <LicenseStrip variant="light" />
        </div>
      </section>

      {/* Story, Mission & Vision (Off-white #FAF8F4) */}
      <section className="py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <SectionHeader
            kicker={t('আমাদের উদ্দেশ্য', 'Purpose & Direction')}
            title={t('সততা ও দায়িত্ববোধ থেকে গড়ে ওঠা একটি প্রতিষ্ঠান', 'Founded on Clarity, Integrity & Care')}
            className="mb-12"
          />

          <StaggerGroup className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StaggerItem className="card-surface p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#7D5D14] mb-2">
                {t('আমাদের গল্প', 'Our Story')}
              </p>
              <h2 className="heading-h3 text-[#0B1F3A]">
                {t('প্রতারণামুক্ত বিদেশ যাত্রার অঙ্গীকার', 'Built to End Confusion & Fraud')}
              </h2>
              <p className="mt-4 text-sm text-[#4B5563] leading-[1.75]">
                {t(
                  'বিদেশে কাজ, চিকিৎসা, ওমরাহ বা উচ্চশিক্ষার স্বপ্ন নিয়ে অনেকেই অস্পষ্ট তথ্য ও দালালের খপ্পরে পড়ে ক্ষতিগ্রস্ত হন। Visatrip Global রহনপুর, গোমস্তাপুরে স্থায়ী অফিস ও ডিজিটাল সাপোর্টের মাধ্যমে প্রতিটি যাত্রীকে সঠিক কাগজপত্র ও বাস্তব তথ্য দিয়ে সাহায্য করে।',
                  'Too many Bangladeshi families face stress or financial loss due to unclear visa information. Operating from our permanent office in Rohanpur, Gomastapur with nationwide WhatsApp support, Visatrip Global brings structure and honesty to every file.'
                )}
              </p>
            </StaggerItem>

            <StaggerItem className="card-surface p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#7D5D14] mb-2">
                {t('আমাদের লক্ষ্য (Mission)', 'Our Mission')}
              </p>
              <h2 className="heading-h3 text-[#0B1F3A]">
                {t('সহজ, নিরাপদ ও স্বচ্ছ ভিসা-ট্রাভেল সেবা', 'Clear, Safe & Accountable Travel Support')}
              </h2>
              <p className="mt-4 text-sm text-[#4B5563] leading-[1.75]">
                {t(
                  'প্রতিটি আবেদনকারীকে ধাপে ধাপে ডকুমেন্ট গাইডলাইন, লিখিত খরচ, নিয়মিত WhatsApp আপডেট এবং সৎ পরামর্শ প্রদান করা — যাতে প্রথমবার ভ্রমণকারীরাও নিশ্চিন্তে বিদেশ যাত্রা করতে পারেন।',
                  'To provide step-by-step document preparation, itemized fees, proactive WhatsApp tracking, and candid advice so every traveler proceeds with confidence.'
                )}
              </p>
            </StaggerItem>

            <StaggerItem className="card-surface p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#7D5D14] mb-2">
                {t('আমাদের ভিশন (Vision)', 'Our Vision')}
              </p>
              <h2 className="heading-h3 text-[#0B1F3A]">
                {t('রাজশাহী বিভাগ ও বাংলাদেশের বিশ্বস্ত ভ্রমণ সহযোগী', 'A Trusted Regional Travel Partner in Bangladesh')}
              </h2>
              <p className="mt-4 text-sm text-[#4B5563] leading-[1.75]">
                {t(
                  'নৈতিক ব্যবসায়িক চর্চা ও নিরবচ্ছিন্ন সেবার মাধ্যমে চাঁপাইনবাবগঞ্জ, রাজশাহী বিভাগ এবং সারা বাংলাদেশে প্রিমিয়াম ও নির্ভরযোগ্য ট্রাভেল কনসালটেন্সি হিসেবে মানুষের আস্থা ধরে রাখা।',
                  'To stand as the benchmark for ethical, client-first travel and visa consultancy across Rajshahi division and Bangladesh.'
                )}
              </p>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

      {/* Core Values (White) */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <SectionHeader
            kicker={t('আমাদের মূল্যবোধ', 'Our Core Values')}
            title={t('যে ৪টি নীতিতে আমরা কাজ করি', 'Four Principles Behind Every File')}
            subtitle={t(
              'আমাদের প্রতিটি পরামর্শ, ডকুমেন্ট চেকিং ও বুকিং এই চারটি নীতির ওপর প্রতিষ্ঠিত।',
              'Every consultation, document review, and itinerary follows these four unwavering standards.'
            )}
          />
          <StaggerGroup className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <StaggerItem key={v.titleEn} className="rounded-2xl bg-[#FAF8F4] p-6 border border-[#0B1F3A]/8">
                  <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] text-[#C9A24B] flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="heading-h3 text-[#0B1F3A]">{isEn ? v.titleEn : v.titleBn}</h3>
                  <p className="mt-2 text-sm text-[#4B5563] leading-[1.75]">
                    {isEn ? v.descEn : v.descBn}
                  </p>
                </StaggerItem>
              );
            })}
          </StaggerGroup>

          <div className="mt-12">
            <HonestyPledgeBlock variant="light" />
          </div>

          <div className="mt-10">
            <SectionCtaStrip
              variant="light"
              locationId="about_after_values"
              headingBn="আপনার ভিসা বা ওমরাহ পরিকল্পনা নিয়ে সরাসরি কথা বলুন"
              headingEn="Talk Directly with Our Consultancy Desk"
              subtextBn="রহনপুর অফিসে সরাসরি দেখা করতে অথবা WhatsApp-এ ফ্রি পরামর্শ নিতে এখনই যোগাযোগ করুন।"
              subtextEn="Visit our Rohanpur office or reach out on WhatsApp for free, obligation-free guidance."
            />
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Real Team & Office Photo Slots + Financial Transparency (Off-white #FAF8F4) */}
      <section className="py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
          <TeamAndOfficeSlots />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PaymentReceiptNotice />
            <TransparentFeeNote />
          </div>

          <div className="card-surface p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm text-[#4B5563]">
              {t(
                'আমাদের অফিস, মক্কা-মদিনা ও জনপ্রিয় গন্তব্যের ফটো গ্যালারি এবং লাইসেন্স যাচাইকরণ তথ্য দেখুন।',
                'Explore our office & destination photo gallery and agency verification details.'
              )}
            </p>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link to={localizedPath('/service-areas')} className="btn-secondary btn-sm">
                {t('আমাদের সার্ভিস এরিয়া', 'Service Areas')}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link to={localizedPath('/gallery')} className="btn-secondary btn-sm">
                {t('ফটো গ্যালারি দেখুন', 'View Photo Gallery')}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link to={localizedPath('/licenses')} className="btn-secondary btn-sm">
                {t('লাইসেন্স যাচাইকরণ', 'Agency Licenses')}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
