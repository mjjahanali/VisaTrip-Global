import { lazy, Suspense, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowRight, Check, Share2, Copy, MessageCircle } from 'lucide-react';
import { getBlogBySlug, blogPostsData } from '../data/blogs';
import { servicesData } from '../data/services';
import { siteConfig } from '../config/site';
import { siteImages } from '../config/images';
import { SeoHead, buildBreadcrumbSchema, buildBlogPostingSchema, buildFaqSchema, trackAnalyticsEvent } from '../lib/seo';
import { getPageLeadContext } from '../lib/leadContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { GoldDivider } from '../components/GoldDivider';
import { SafeImage } from '../components/SafeImage';
import { FaqAccordion } from '../components/FaqAccordion';
import { InquiryForm } from '../components/InquiryForm';
import { SectionCtaStrip } from '../components/SectionCtaStrip';
import { CtaBanner } from '../components/CtaBanner';
import { VerifiedDateStamp, OfficialSourcesNote } from '../components/TrustSignals';
import { NotFoundPage } from './NotFoundPage';

const ChecklistModal = lazy(() =>
  import('../components/ChecklistModal').then((mod) => ({ default: mod.ChecklistModal }))
);

export function BlogDetailPage() {
  const { slug = '' } = useParams();
  const { pathname } = useLocation();
  const { isEn, locale, localizedPath, t } = useLanguage();
  const post = getBlogBySlug(slug);
  const [copied, setCopied] = useState(false);
  const [checklistOpen, setChecklistOpen] = useState(false);
  const pageCtx = getPageLeadContext(pathname, locale);

  if (!post) {
    return <NotFoundPage />;
  }

  const shareUrl = `${siteConfig.domain}/blog/${post.slug}`;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const faqEntries = post.faqs.map((f) => ({
    question: f.questionBn,
    answer: f.answerBn,
  }));

  const relatedPosts = blogPostsData.filter((b) => b.slug !== post.slug).slice(0, 3);
  const relatedServices = servicesData.filter((s) => post.relatedServiceSlugs.includes(s.slug));

  return (
    <>
      <SeoHead
        title={isEn ? post.seo.titleEn : post.seo.titleBn}
        description={isEn ? post.seo.descriptionEn : post.seo.descriptionBn}
        canonicalPath={`/blog/${post.slug}`}
        locale={locale}
        ogType="article"
        ogImage={siteImages[post.imageKey].src}
        schemas={[
          buildBreadcrumbSchema(
            [
              { name: t('হোম', 'Home'), path: '/' },
              { name: t('ব্লগ ও গাইড', 'Blog'), path: '/blog' },
              { name: isEn ? post.titleEn : post.titleBn, path: `/blog/${post.slug}` },
            ],
            locale
          ),
          buildBlogPostingSchema({
            headline: isEn ? post.titleEn : post.titleBn,
            description: isEn ? post.excerptEn : post.excerptBn,
            path: `/blog/${post.slug}`,
            image: siteImages[post.imageKey].src,
            datePublished: post.publishedAt,
            authorName: isEn ? post.author.nameEn : post.author.nameBn,
            locale,
          }),
          ...(faqEntries.length > 0 ? [buildFaqSchema(faqEntries)] : []),
        ]}
      />

      <article className="py-12 sm:py-16 bg-[#FAF8F4]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { label: t('হোম', 'Home'), to: '/' },
              { label: t('ব্লগ', 'Blog'), to: '/blog' },
              { label: isEn ? post.categoryEn : post.categoryBn },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8">
              {/* Article Header */}
              <header className="mb-8">
                <div className="text-xs sm:text-sm text-[#525B68] flex flex-wrap items-center gap-2 mb-4">
                  <span className="font-semibold text-[#7D5D14] uppercase tracking-wider">
                    {isEn ? post.categoryEn : post.categoryBn}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{post.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>{isEn ? post.readingTimeEn : post.readingTimeBn}</span>
                </div>

                <h1 className="heading-h1 text-[#0B1F3A]">
                  {isEn ? post.titleEn : post.titleBn}
                </h1>

                <p className="body-lead mt-4 text-[#4B5563]">
                  {isEn ? post.excerptEn : post.excerptBn}
                </p>

                <div className="mt-4">
                  <VerifiedDateStamp />
                </div>

                {/* Above-the-fold Consultation & WhatsApp CTA */}
                <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                  <a
                    href="#blog-inquiry"
                    onClick={() =>
                      trackAnalyticsEvent('cta_click', {
                        cta_label: 'Get Free Guidance on This Topic',
                        cta_location: 'blog_detail_hero',
                        service: post.categoryEn,
                      })
                    }
                    className="btn-primary btn-sm"
                  >
                    <span>{t('এই বিষয়ে ফ্রি কনসাল্টেশন নিন', 'Get Free Guidance')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={pageCtx.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackAnalyticsEvent('whatsapp_click', {
                        location: 'blog_detail_hero',
                        prefilled_topic: post.slug,
                      })
                    }
                    className="btn-secondary btn-sm"
                  >
                    <MessageCircle className="w-4 h-4 text-[#C9A24B]" />
                    <span>{t('WhatsApp-এ সরাসরি প্রশ্ন করুন', 'Ask on WhatsApp')}</span>
                  </a>
                </div>

                {/* Share Controls */}
                <div className="mt-6 pt-4 border-t border-[#0B1F3A]/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-[#525B68]">{post.tags.join(' · ')}</div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`${post.titleBn} — ${shareUrl}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] px-4 rounded-xl bg-white border border-[#0B1F3A]/12 text-xs font-semibold text-[#0B1F3A] hover:border-[#C9A24B] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5 text-[#C9A24B]" />
                      {t('শেয়ার', 'Share')}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="min-h-[44px] px-4 rounded-xl bg-white border border-[#0B1F3A]/12 text-xs font-semibold text-[#0B1F3A] hover:border-[#C9A24B] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[#0F5132]" /> : <Copy className="w-3.5 h-3.5 text-[#C9A24B]" />}
                      {copied ? t('কপি হয়েছে', 'Copied') : t('লিংক কপি', 'Copy Link')}
                    </button>
                  </div>
                </div>
              </header>

              {/* Hero Image */}
              <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-8 border border-[#0B1F3A]/10 shadow-[0_12px_32px_rgba(11,31,58,0.08)]">
                <SafeImage imageKey={post.imageKey} preset="detailFeature" priority className="w-full h-full object-cover" />
              </div>

              {/* Structured Sections */}
              <div className="card-surface p-6 sm:p-10 space-y-10">
                {post.sections.map((sec) => (
                  <section key={sec.h2} className="space-y-4">
                    <h2 className="heading-h2 text-[#0B1F3A]">{sec.h2}</h2>
                    {sec.paragraphs.map((p) => (
                      <p key={p.slice(0, 40)} className="text-[15.5px] leading-[1.85] text-[#2D3748]">
                        {p}
                      </p>
                    ))}
                    {sec.h3Groups && (
                      <div className="space-y-4 pt-2">
                        {sec.h3Groups.map((g) => (
                          <div key={g.h3} className="rounded-xl bg-[#FAF8F4] p-5 sm:p-6 border border-[#0B1F3A]/8">
                            <h3 className="heading-h3 text-[#0B1F3A]">{g.h3}</h3>
                            <p className="mt-2 text-[15px] leading-[1.8] text-[#374151]">{g.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {sec.bullets && (
                      <ul className="space-y-3 pt-2">
                        {sec.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-[15px] leading-[1.8] text-[#2D3748]">
                            <Check className="w-4 h-4 text-[#C9A24B] shrink-0 mt-1.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {sec.internalLink && (
                      <div className="pt-2">
                        <Link
                          to={localizedPath(sec.internalLink.to)}
                          className="inline-flex items-center gap-2 text-sm font-bold text-[#7D5D14] hover:text-[#0B1F3A] transition-colors"
                        >
                          {sec.internalLink.label}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* End-of-Post FAQ Section */}
              {faqEntries.length > 0 && (
                <div className="mt-12">
                  <h2 className="heading-h2 text-[#0B1F3A] mb-6">
                    {t('এই বিষয়ে সচরাচর জিজ্ঞাসা (FAQ)', 'Frequently Asked Questions')}
                  </h2>
                  <FaqAccordion items={faqEntries} />
                </div>
              )}

              {/* Official Government & Embassy Information Sources ("তথ্যের উৎস") */}
              <div className="mt-8">
                <OfficialSourcesNote tags={[...post.relatedServiceSlugs, 'general']} />
              </div>

              {/* Post-Article Lead Magnet & WhatsApp Strip */}
              <div className="mt-10">
                <SectionCtaStrip
                  headingBn="এই গাইডের ডকুমেন্ট চেকলিস্ট PDF সংরক্ষণ করুন"
                  headingEn="Save the Printable Document Checklist PDF"
                  subtextBn="ফ্রি প্রিন্টযোগ্য A4 চেকলিস্ট ডাউনলোড করুন অথবা আমাদের কনসালটেন্টের সাথে WhatsApp-এ সরাসরি কথা বলুন।"
                  subtextEn="Download the free printable A4 checklist or message our consultant directly on WhatsApp."
                  locationId="blog_detail_after_article"
                  onDownloadChecklist={() => setChecklistOpen(true)}
                  checklistLabelBn="ফ্রি চেকলিস্ট PDF নিন"
                  checklistLabelEn="Get Free Checklist PDF"
                />
              </div>

              {/* Author Box */}
              <div className="mt-12 card-surface p-6 sm:p-8 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] text-[#C9A24B] font-editorial font-bold text-lg flex items-center justify-center shrink-0">
                  VG
                </div>
                <div>
                  <div className="text-base font-bold text-[#0B1F3A]">
                    {isEn ? post.author.nameEn : post.author.nameBn}
                  </div>
                  <div className="text-xs text-[#7D5D14] font-semibold mt-0.5">
                    {isEn ? post.author.roleEn : post.author.roleBn}
                  </div>
                  <p className="mt-2 text-sm text-[#4B5563] leading-[1.75]">
                    {isEn ? post.author.bioEn : post.author.bioBn}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div id="blog-inquiry" className="card-surface border-[#C9A24B]/45 p-6 sm:p-8 shadow-[0_14px_36px_rgba(11,31,58,0.08)] scroll-mt-28">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#7D5D14] mb-1">
                  {t('বিশেষজ্ঞের পরামর্শ নিন', 'Ask Our Consultants')}
                </p>
                <h2 className="heading-h3 text-[#0B1F3A] mb-6">
                  {t('এই বিষয়ে ফ্রি কনসাল্টেশন নিন', 'Get Free Guidance on This Topic')}
                </h2>
                <InquiryForm compact formType={`blog_${post.slug}`} />
              </div>

              {relatedServices.length > 0 && (
                <div className="card-surface p-6">
                  <h3 className="text-sm font-bold text-[#0B1F3A] mb-4">
                    {t('সম্পর্কিত সার্ভিসসমূহ', 'Related Services')}
                  </h3>
                  <ul className="space-y-3 text-sm">
                    {relatedServices.map((s) => (
                      <li key={s.slug}>
                        <Link
                          to={localizedPath(`/services/${s.slug}`)}
                          className="text-[#4B5563] hover:text-[#7D5D14] font-medium inline-flex items-center gap-2 transition-colors"
                        >
                          <ArrowRight className="w-3.5 h-3.5 text-[#C9A24B]" />
                          {isEn ? s.titleEn : s.titleBn}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </article>

      <GoldDivider />

      {/* Related Posts (White) */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="heading-h2 text-[#0B1F3A] mb-10">
            {t('আরও গুরুত্বপূর্ণ গাইড পড়ুন', 'More Travel & Visa Guides')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.slug}
                to={localizedPath(`/blog/${rel.slug}`)}
                className="card-interactive p-6 block"
              >
                <p className="text-xs text-[#7D5D14] font-semibold">
                  {isEn ? rel.categoryEn : rel.categoryBn} · {isEn ? rel.readingTimeEn : rel.readingTimeBn}
                </p>
                <h3 className="heading-h3 mt-2 text-[#0B1F3A]">
                  {isEn ? rel.titleEn : rel.titleBn}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />

      {checklistOpen && (
        <Suspense fallback={null}>
          <ChecklistModal
            open={checklistOpen}
            onClose={() => setChecklistOpen(false)}
            title={isEn ? pageCtx.leadMagnet.titleEn : pageCtx.leadMagnet.titleBn}
            serviceName={pageCtx.leadMagnet.serviceName}
            documents={isEn ? pageCtx.leadMagnet.documentsEn : pageCtx.leadMagnet.documentsBn}
            documentsEn={pageCtx.leadMagnet.documentsEn}
            pdfTitleEn={pageCtx.leadMagnet.titleEn}
            checklistId={pageCtx.leadMagnet.id}
          />
        </Suspense>
      )}
    </>
  );
}
