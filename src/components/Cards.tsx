import { Link } from 'react-router-dom';
import { ArrowRight, Check, Clock, Building2, Utensils, Plane, FileCheck } from 'lucide-react';
import type {
  ServiceSummary,
  DestinationSummary,
  PackageSummary,
} from '../data/catalogSummary';
import type { TestimonialItem } from '../data/siteContent';
import { formatBDT, toBanglaDigits } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { ServiceIcon } from './ServiceIcon';
import { SafeImage } from './SafeImage';

export function ServiceCard({ service, index }: { service: ServiceSummary; index?: number }) {
  const { isEn, localizedPath, t } = useLanguage();
  const isHajj = service.theme === 'hajj';

  return (
    <Link
      to={localizedPath(`/services/${service.slug}`)}
      className="group card-interactive flex flex-col justify-between p-6 h-full"
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-200 ${
              isHajj
                ? 'bg-[#0F5132]/10 text-[#0F5132] group-hover:bg-[#0F5132] group-hover:text-white'
                : 'bg-[#0B1F3A]/6 text-[#0B1F3A] group-hover:bg-[#0B1F3A] group-hover:text-[#C9A24B]'
            }`}
          >
            <ServiceIcon name={service.icon} className="w-5 h-5" />
          </div>
          {typeof index === 'number' && (
            <span className="font-editorial text-xs font-semibold text-[#7D5D14] tabular-nums">
              {isEn ? `0${index + 1}` : toBanglaDigits(`0${index + 1}`)}
            </span>
          )}
        </div>
        <h3 className="heading-h3 text-[#0B1F3A] group-hover:text-[#7D5D14] transition-colors">
          {isEn ? service.titleEn : service.titleBn}
        </h3>
        <p className="mt-2 text-sm leading-[1.75] text-[#525B68]">
          {isEn ? service.shortDescEn : service.shortDescBn}
        </p>
      </div>
      <div className="mt-6 pt-4 border-t border-[#0B1F3A]/8 flex items-center justify-between text-sm font-semibold text-[#0B1F3A] group-hover:text-[#7D5D14] transition-colors">
        <span>
          {t('বিস্তারিত দেখুন', 'View Details')}
          <span className="sr-only"> — {isEn ? service.titleEn : service.titleBn}</span>
        </span>
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </div>
    </Link>
  );
}

export function DestinationCard({ destination }: { destination: DestinationSummary }) {
  const { isEn, locale, localizedPath, t } = useLanguage();
  const formattedPrice = formatBDT(destination.startingPriceBDT, locale);

  return (
    <Link
      to={localizedPath(`/destinations/${destination.slug}`)}
      className="group card-interactive block overflow-hidden h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0B1F3A]">
        <SafeImage
          imageKey={destination.imageKey}
          destinationSlug={destination.slug}
          preset="destinationCard"
          className="w-full h-full object-cover card-img-zoom"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071529]/90 via-[#0B1F3A]/25 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-xs font-semibold text-[#C9A24B] tracking-wide">
            {isEn ? destination.regionEn : destination.regionBn}
          </p>
          <h3 className="text-lg font-bold leading-snug mt-0.5">
            {isEn ? destination.nameEn : destination.nameBn}
          </h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-[#4B5563] line-clamp-2 leading-[1.75]">
          {isEn ? destination.taglineEn : destination.taglineBn}
        </p>
        <div className="mt-4 pt-4 border-t border-[#0B1F3A]/8 flex items-center justify-between text-xs">
          {formattedPrice ? (
            <span className="font-semibold text-[#0B1F3A] tabular-nums">
              {t(`শুরু ${formattedPrice} থেকে`, `Starting from ${formattedPrice}`)}
            </span>
          ) : (
            <span className="text-[#525B68]">{t('ভিসা ও ভ্রমণ গাইড', 'Visa & Travel Guide')}</span>
          )}
          <span className="font-semibold text-[#7D5D14] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform duration-200">
            {t('দেখুন', 'Explore')}
            <span className="sr-only"> {isEn ? destination.nameEn : destination.nameBn}</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function PackageCard<T extends PackageSummary>({
  pkg,
  onBookClick,
  isCompared,
  onToggleCompare,
}: {
  pkg: T;
  onBookClick?: (pkg: T) => void;
  isCompared?: boolean;
  onToggleCompare?: (slug: string) => void;
}) {
  const { isEn, locale, localizedPath, t } = useLanguage();
  const priceText = formatBDT(pkg.priceBDT, locale);

  return (
    <article className="group card-interactive flex flex-col overflow-hidden h-full">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0B1F3A]">
        <SafeImage
          imageKey={pkg.imageKey}
          preset="packageCard"
          className="w-full h-full object-cover card-img-zoom"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071529]/85 via-[#0B1F3A]/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/95 font-medium">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#C9A24B]" aria-hidden="true" />
            {isEn ? pkg.durationEn : pkg.durationBn}
          </span>
          <span className="text-[#C9A24B] font-semibold">{pkg.category}</span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs text-[#525B68] mb-2">
            {pkg.budgetTier} <span aria-hidden="true">·</span> {isEn ? pkg.hotelTierEn : pkg.hotelTierBn}
          </p>
          <h3 className="heading-h3 text-[#0B1F3A]">
            <Link to={localizedPath(`/tour-packages/${pkg.slug}`)} className="hover:text-[#7D5D14] transition-colors">
              {isEn ? pkg.titleEn : pkg.titleBn}
            </Link>
          </h3>
          <p className="mt-2 text-sm text-[#4B5563] leading-[1.75]">
            {isEn ? pkg.summaryEn : pkg.summaryBn}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#525B68]">
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#7D5D14]" aria-hidden="true" />
              {t('হোটেল', 'Hotel')}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-[#7D5D14]" aria-hidden="true" />
              {t('ব্রেকফাস্ট', 'Breakfast')}
            </span>
            {pkg.flightIncluded && (
              <span className="inline-flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5 text-[#7D5D14]" aria-hidden="true" />
                {t('ফ্লাইট', 'Flights')}
              </span>
            )}
            {pkg.visaIncluded && (
              <span className="inline-flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-[#7D5D14]" aria-hidden="true" />
                {t('ভিসা', 'Visa')}
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#0B1F3A]/8">
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-xs text-[#525B68]">{t('প্যাকেজ মূল্য', 'Package Rate')}</span>
            <span className="text-base font-bold text-[#0B1F3A] tabular-nums">
              {priceText || t('কনসাল্টেশন নিন', 'Request Quote')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {onBookClick ? (
              <button
                type="button"
                onClick={() => onBookClick(pkg)}
                className="flex-1 btn-primary btn-sm"
              >
                <span lang={!isEn ? 'en' : undefined}>Book Now</span>
              </button>
            ) : (
              <Link
                to={localizedPath(`/tour-packages/${pkg.slug}#book`)}
                className="flex-1 btn-primary btn-sm"
              >
                <span lang={!isEn ? 'en' : undefined}>Book Now</span>
                <span className="sr-only"> — {isEn ? pkg.titleEn : pkg.titleBn}</span>
              </Link>
            )}
            <Link
              to={localizedPath(`/tour-packages/${pkg.slug}`)}
              className="btn-secondary btn-sm"
            >
              {t('বিস্তারিত', 'Details')}
              <span className="sr-only"> — {isEn ? pkg.titleEn : pkg.titleBn}</span>
            </Link>
          </div>
          {onToggleCompare && (
            <button
              type="button"
              aria-pressed={Boolean(isCompared)}
              onClick={() => onToggleCompare(pkg.slug)}
              className={`mt-3 w-full min-h-[44px] text-xs font-semibold rounded-xl border transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer ${
                isCompared
                  ? 'border-[#C9A24B] bg-[#C9A24B]/12 text-[#0B1F3A]'
                  : 'border-[#0B1F3A]/12 text-[#525B68] hover:border-[#C9A24B] hover:text-[#0B1F3A]'
              }`}
            >
              {isCompared && <Check className="w-3.5 h-3.5 text-[#7D5D14]" aria-hidden="true" />}
              {isCompared
                ? t('তুলনায় যুক্ত হয়েছে', 'Added to Compare')
                : t('তুলনা করুন (সর্বোচ্চ ৩টি)', 'Compare (up to 3)')}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export function TestimonialCard({ item }: { item: TestimonialItem }) {
  const { isEn } = useLanguage();
  return (
    <article className="card-surface p-6 sm:p-8 flex flex-col justify-between h-full">
      <div>
        <div className="text-xs font-medium text-[#7D5D14] mb-4">
          <span>{isEn ? item.serviceEn : item.serviceBn}</span>
          <span className="text-[#525B68]/60" aria-hidden="true"> · </span>
          <span className="text-[#525B68]">{isEn ? item.locationEn : item.locationBn}</span>
        </div>
        <p className="body-base text-[#1A1A1A]">
          “{isEn ? item.quoteEn : item.quoteBn}”
        </p>
      </div>
      <div className="mt-6 pt-4 border-t border-[#0B1F3A]/8">
        <div className="text-sm font-bold text-[#0B1F3A]">
          {isEn ? item.nameEn : item.nameBn}
        </div>
      </div>
    </article>
  );
}
