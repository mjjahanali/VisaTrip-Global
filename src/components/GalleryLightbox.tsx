import { useId } from 'react';
import { X } from 'lucide-react';
import type { GalleryItem } from '../data/siteContent';
import { useLanguage } from '../context/LanguageContext';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { SafeImage } from './SafeImage';

interface GalleryLightboxProps {
  item: GalleryItem;
  onClose: () => void;
}

/**
 * Dynamically imported accessible lightbox modal for GalleryPage.
 * Loaded on demand only when a visitor taps a photo.
 */
export function GalleryLightbox({ item, onClose }: GalleryLightboxProps) {
  const { isEn, t } = useLanguage();
  const titleId = useId();
  const dialogRef = useFocusTrap<HTMLDivElement>({
    active: true,
    onEscape: onClose,
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#071529]/85 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[92dvh] overflow-y-auto shadow-2xl border border-[#C9A24B]/30 focus:outline-none"
      >
        <div className="relative aspect-[16/10] bg-[#0B1F3A]" data-dark-surface="true">
          <SafeImage
            imageKey={item.imageKey}
            preset="lightbox"
            priority
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={t('ছবি প্রিভিউ বন্ধ করুন', 'Close photo preview')}
            className="absolute top-4 right-4 w-11 h-11 rounded-xl bg-[#0B1F3A]/90 text-white hover:bg-[#0B1F3A] flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#7D5D14]">
            {item.category}
          </p>
          <h2 id={titleId} className="heading-h3 mt-1 text-[#0B1F3A]">
            {isEn ? item.titleEn : item.titleBn}
          </h2>
          <p className="mt-2 text-sm text-[#4B5563] leading-[1.75]">
            {isEn ? item.captionEn : item.captionBn}
          </p>
        </div>
      </div>
    </div>
  );
}
