import { servicesData } from '../data/services';
import { SeoHead, buildBreadcrumbSchema, buildCollectionPageSchema } from '../lib/seo';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SectionHeader } from '../components/SectionHeader';
import { ServiceCard } from '../components/Cards';
import { CtaBanner } from '../components/CtaBanner';
import { HeroCtaRow } from '../components/HeroCtaRow';
import { SectionCtaStrip } from '../components/SectionCtaStrip';
import { StaggerGroup, StaggerItem } from '../components/MotionPrimitives';

export function ServicesOverviewPage() {
  const { locale, t } = useLanguage();

  return (
    <>
      <SeoHead
        title={t('আমাদের ৮টি ট্রাভেল ও ভিসা সার্ভিস | Visatrip Global', 'All 8 Travel & Visa Services | Visatrip Global')}
        description={t(
          'Work Permit, Tourist Visa, Student Consultancy, Hajj & Umrah, India Visa, Air Ticketing, Hotel Booking ও Tour Package — Visatrip Global।',
          'Explore all 8 services at Visatrip Global: Work Permit, Tourist Visa, Student Consultancy, Hajj & Umrah, India Visa, Air Ticketing, Hotel Booking & Tours.'
        )}
        canonicalPath="/services"
        locale={locale}
        schemas={[
          buildBreadcrumbSchema(
            [
              { name: t('হোম', 'Home'), path: '/' },
              { name: t('সার্ভিসসমূহ', 'Services'), path: '/services' },
            ],
            locale
          ),
          buildCollectionPageSchema({
            name: t('আমাদের ৮টি ট্রাভেল ও ভিসা সার্ভিস', 'All 8 Travel & Visa Services'),
            description: t(
              'Visatrip Global-এর ৮টি প্রধান ভিসা, ওমরাহ, টিকেটিং ও ট্যুর সেবা।',
              'Complete directory of Visatrip Global visa, Umrah, ticketing, and tour services.'
            ),
            path: '/services',
            locale,
            items: servicesData.map((s) => ({
              name: locale === 'en' ? s.titleEn : s.titleBn,
              path: `/services/${s.slug}`,
            })),
          }),
        ]}
      />

      <section className="bg-navy-hero text-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Breadcrumbs
            light
            items={[
              { label: t('হোম', 'Home'), to: '/' },
              { label: t('আমাদের সার্ভিসসমূহ', 'Services') },
            ]}
          />
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[#C9A24B]" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#C9A24B]">
              {t('সকল সার্ভিস · Visatrip Global', 'Complete Portfolio · Visatrip Global')}
            </p>
          </div>
          <h1 className="heading-h1 text-white max-w-3xl">
            {t('বিদেশ যাত্রার ৮টি প্রয়োজনীয় সেবা, এক বিশ্বস্ত প্রতিষ্ঠানে', '8 Complete Travel & Visa Services Under One Roof')}
          </h1>
          <p className="body-lead mt-6 text-white/85 max-w-2xl">
            {t(
              'কাজ, ভ্রমণ, উচ্চশিক্ষা, চিকিৎসা কিংবা পবিত্র ওমরাহ — প্রতিটি সেবার বিস্তারিত ডকুমেন্ট চেকলিস্ট, ধাপ ও FAQ দেখতে নিচের যেকোনো সার্ভিসে ক্লিক করুন।',
              'Click any service below to explore full eligibility criteria, document checklists, step-by-step timelines, and honest FAQs.'
            )}
          </p>
          <HeroCtaRow locationId="services_overview_hero" showCallLink />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <SectionHeader
            kicker={t('সেবা তালিকা', 'Service Directory')}
            title={t('আপনার প্রয়োজন অনুযায়ী সার্ভিস বেছে নিন', 'Choose the Service Tailored to Your Journey')}
            className="mb-12"
          />

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((srv, idx) => (
              <StaggerItem key={srv.slug} className="h-full">
                <ServiceCard service={srv} index={idx} />
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="mt-10">
            <SectionCtaStrip
              variant="white"
              locationId="services_after_directory"
              headingBn="আপনার প্রয়োজন অনুযায়ী সঠিক সার্ভিস বেছে নিতে সাহায্য লাগবে?"
              headingEn="Need Help Choosing the Right Service?"
              subtextBn="আপনার লক্ষ্য জানালে আমাদের টিম সবচেয়ে সহজ ও বৈধ প্রক্রিয়া জানিয়ে দেবে।"
              subtextEn="Tell us your travel goal and our team will map out the cleanest legal pathway."
            />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
