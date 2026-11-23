import { Link } from 'react-router-dom';
import { Home, MessageCircle, Compass } from 'lucide-react';
import { buildWhatsAppLink } from '../config/site';
import { SeoHead } from '../lib/seo';
import { useLanguage } from '../context/LanguageContext';

export function NotFoundPage() {
  const { locale, localizedPath, t } = useLanguage();

  return (
    <>
      <SeoHead
        title={t('পেজটি পাওয়া যায়নি (৪০৪) | Visatrip Global', 'Page Not Found (404) | Visatrip Global')}
        description={t('আপনি যে পেজটি খুঁজছেন তা পাওয়া যায়নি। Visatrip Global হোমপেজে ফিরে যান।', 'The requested page could not be found. Return to Visatrip Global home.')}
        canonicalPath="/404"
        locale={locale}
        noIndex
      />

      <section className="py-24 sm:py-32 bg-[#FAF8F4]">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#0B1F3A] text-[#C9A24B] flex items-center justify-center mx-auto mb-6 shadow-[0_12px_28px_rgba(11,31,58,0.18)]">
            <Compass className="w-7 h-7" />
          </div>
          <p className="font-editorial text-sm font-bold tracking-[0.12em] text-[#7D5D14] tabular-nums">{t('৪০৪', '404')}</p>
          <h1 className="heading-h2 mt-2 text-[#0B1F3A]">
            {t('দুঃখিত, আপনি যে পেজটি খুঁজছেন তা পাওয়া যায়নি', 'Sorry, This Page Could Not Be Found')}
          </h1>
          <p className="body-base mt-4 text-[#4B5563]">
            {t(
              'লিংকটি পরিবর্তিত হয়ে থাকতে পারে। নিচের অপশনগুলো থেকে আপনার প্রয়োজনীয় সার্ভিস বা পেজে সহজেই যেতে পারবেন।',
              'The page may have moved. Use the helpful links below or chat with us on WhatsApp.'
            )}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to={localizedPath('/')} className="btn-primary">
              <Home className="w-4 h-4" />
              {t('হোমপেজে ফিরুন', 'Back to Home')}
            </Link>
            <Link to={localizedPath('/services')} className="btn-secondary">
              {t('আমাদের সার্ভিসসমূহ', 'View Services')}
            </Link>
            <a
              href={buildWhatsAppLink(undefined, locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-navy"
            >
              <MessageCircle className="w-4 h-4 text-[#C9A24B]" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
