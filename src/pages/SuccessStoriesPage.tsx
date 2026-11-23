import { ExternalLink } from 'lucide-react';
import { testimonialsData } from '../data/siteContent';
import { siteConfig } from '../config/site';
import { SeoHead, buildBreadcrumbSchema } from '../lib/seo';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HeroCtaRow } from '../components/HeroCtaRow';
import { SectionHeader } from '../components/SectionHeader';
import { TestimonialCard } from '../components/Cards';
import { CtaBanner } from '../components/CtaBanner';
import { StaggerGroup, StaggerItem } from '../components/MotionPrimitives';

export function SuccessStoriesPage() {
  const { locale, t } = useLanguage();

  return (
    <>
      <SeoHead
        title={t('সাফল্যের গল্প ও ক্লায়েন্ট মতামত | Visatrip Global', 'Client Stories & Feedback | Visatrip Global')}
        description={t(
          'Visatrip Global-এর সাথে ভিসা, ওমরাহ, ভারত মেডিকেল ভিসা ও ভ্রমণের বাস্তব অভিজ্ঞতা ও স্বচ্ছ সেবার গল্প।',
          'Read client experiences and feedback on Visatrip Global’s honest visa, Umrah, and travel services.'
        )}
        canonicalPath="/success-stories"
        locale={locale}
        schemas={[
          buildBreadcrumbSchema(
            [
              { name: t('হোম', 'Home'), path: '/' },
              { name: t('সাফল্যের গল্প', 'Success Stories'), path: '/success-stories' },
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
              { label: t('সাফল্যের গল্প', 'Success Stories') },
            ]}
          />
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[#C9A24B]" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#C9A24B]">
              {t('ক্লায়েন্ট অভিজ্ঞতা ও আস্থা', 'Verified Client Trust')}
            </p>
          </div>
          <h1 className="heading-h1 text-white max-w-3xl">
            {t('ক্লায়েন্ট অভিজ্ঞতা ও সাফল্যের গল্প', 'Traveler Stories & Honest Feedback')}
          </h1>
          <p className="body-lead mt-6 text-white/85 max-w-2xl">
            {t(
              'আমরা কখনোই ভুয়া রিভিউ বা বানোয়াট ভিসা কপি প্রকাশ করি না। শুধুমাত্র ক্লায়েন্টদের লিখিত সম্মতি সাপেক্ষে আসল অভিজ্ঞতা এখানে যুক্ত করা হয়।',
              'We never publish fabricated reviews or unconsented visa copies. Authentic client stories are published here strictly with traveler permission.'
            )}
          </p>
          <HeroCtaRow locationId="success_stories_hero" />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
          <SectionHeader
            kicker={t('যাত্রীদের মতামত', 'Traveler Feedback')}
            title={t('ভিসা, ওমরাহ ও ভ্রমণ অভিজ্ঞতার ঝলক', 'Stories Across Visas, Medical Travel & Umrah')}
          />

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialsData.map((item) => (
              <StaggerItem key={item.id} className="h-full">
                <TestimonialCard item={item} />
              </StaggerItem>
            ))}
          </StaggerGroup>

          <p className="text-xs text-[#525B68] leading-[1.7]">
            {t(
              '* উপরের কার্ডগুলো নমুনা ফরম্যাট হিসেবে প্রদর্শিত — সম্মতিপ্রাপ্ত ক্লায়েন্টদের সরাসরি মন্তব্য ও ভিডিও আমাদের অফিসিয়াল ফেসবুক পেজে প্রকাশিত হয়।',
              '* Entries above illustrate our feedback format — authentic consented client stories and videos are published directly on our official Facebook page.'
            )}
          </p>

          <div className="card-surface p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 className="heading-h3 text-[#0B1F3A]">
                {t('আমাদের অফিসিয়াল Facebook পেজে নিয়মিত আপডেট দেখুন', 'Follow Live Updates on Our Official Facebook Page')}
              </h2>
              <p className="mt-2 text-sm text-[#4B5563] leading-[1.75]">
                {t(
                  'ওমরাহ গ্রুপ, ভিসা আপডেট এবং যাত্রীদের সরাসরি মন্তব্য আমাদের অফিসিয়াল ফেসবুক পেজে পাবেন।',
                  'See real-time Umrah group departures and traveler feedback directly on Facebook.'
                )}
              </p>
            </div>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-navy btn-sm shrink-0"
            >
              Facebook Page
              <ExternalLink className="w-4 h-4 text-[#C9A24B]" />
            </a>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
