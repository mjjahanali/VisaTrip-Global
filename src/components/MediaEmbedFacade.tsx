import { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import type { SiteImageKey } from '../config/images';
import { SafeImage } from './SafeImage';
import { useLanguage } from '../context/LanguageContext';

interface MediaEmbedFacadeProps {
  provider: 'youtube' | 'facebook';
  /** YouTube 11-char video ID (when provider="youtube") */
  youtubeId?: string;
  /** Public Facebook video or page URL (when provider="facebook") */
  facebookUrl?: string;
  /** Accessible title for the iframe */
  title: string;
  /** Optional local optimized poster key */
  posterImageKey?: SiteImageKey;
  /** Optional fallback external URL when embed is unavailable */
  fallbackHref?: string;
  aspectClass?: string;
}

/**
 * Click-to-Load Facade for YouTube and Facebook embeds.
 *
 * Defers 500 KB - 1.2 MB of third-party player JavaScript, fonts, and tracking
 * pixels until the visitor explicitly clicks Play. Zero layout shift via
 * locked aspect ratio.
 */
export function MediaEmbedFacade({
  provider,
  youtubeId,
  facebookUrl,
  title,
  posterImageKey = 'office',
  fallbackHref,
  aspectClass = 'aspect-video',
}: MediaEmbedFacadeProps) {
  const { t } = useLanguage();
  const [activated, setActivated] = useState(false);

  const canEmbed =
    (provider === 'youtube' && Boolean(youtubeId)) ||
    (provider === 'facebook' && Boolean(facebookUrl));

  const embedSrc =
    provider === 'youtube' && youtubeId
      ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?autoplay=1&rel=0`
      : provider === 'facebook' && facebookUrl
      ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(facebookUrl)}&show_text=false&autoplay=true`
      : '';

  if (activated && embedSrc) {
    return (
      <div className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden bg-[#071529]`}>
        <iframe
          title={title}
          src={embedSrc}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    );
  }

  return (
    <div
      className={`group relative w-full ${aspectClass} rounded-2xl overflow-hidden bg-[#0B1F3A] border border-[#0B1F3A]/12`}
    >
      <SafeImage
        imageKey={posterImageKey}
        preset="galleryCard"
        className="w-full h-full object-cover opacity-80 group-hover:scale-[1.03] transition-transform duration-300"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071529]/90 via-[#0B1F3A]/45 to-[#071529]/25" />

      <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
        {canEmbed ? (
          <button
            type="button"
            onClick={() => setActivated(true)}
            aria-label={t(`ভিডিও চালু করুন: ${title}`, `Play video: ${title}`)}
            className="w-16 h-16 rounded-2xl bg-[#C9A24B] hover:bg-[#D6B25E] text-[#0B1F3A] shadow-[0_14px_34px_rgba(0,0,0,0.35)] flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer"
          >
            <Play className="w-7 h-7 fill-current ml-0.5" aria-hidden="true" />
          </button>
        ) : (
          <a
            href={fallbackHref || '#'}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={title}
            className="min-h-[48px] px-5 rounded-xl bg-[#C9A24B] hover:bg-[#D6B25E] text-[#0B1F3A] text-sm font-bold inline-flex items-center gap-2 shadow-[0_14px_34px_rgba(0,0,0,0.35)] transition-colors"
          >
            <Play className="w-4 h-4 fill-current" aria-hidden="true" />
            <span>{t('অফিসিয়াল পেজে ভিডিও দেখুন', 'Watch on Official Page')}</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        )}
        <p className="mt-3 text-xs sm:text-sm font-semibold text-white max-w-sm leading-snug">
          {title}
        </p>
        <p className="mt-1 text-xs leading-[1.55] text-white/75">
          {provider === 'youtube'
            ? t('ক্লিক করলেই YouTube প্লেয়ার লোড হবে (ডেটা সাশ্রয়ী)', 'Click to load privacy-enhanced YouTube player')
            : t('অফিসিয়াল Facebook ভিডিও · ডেটা সাশ্রয়ী প্রিভিউ', 'Official Facebook Video · Data-saving preview')}
        </p>
      </div>
    </div>
  );
}
