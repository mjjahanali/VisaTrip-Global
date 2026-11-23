import type { SiteImageKey } from '../config/images';
import { siteImages } from '../config/images';
import { withBasePath } from '../lib/assetUrl';

interface HeroVideoLayerProps {
  posterImageKey: SiteImageKey;
  webmSrc?: string;
  mp4Src?: string;
  onError: () => void;
}

/**
 * Dynamically imported muted looping hero video layer.
 * Mounted ONLY on desktop fine-pointer devices with fast 4G/broadband connections
 * when `siteConfig.hero.video.enabled === true`.
 */
export function HeroVideoLayer({
  posterImageKey,
  webmSrc,
  mp4Src,
  onError,
}: HeroVideoLayerProps) {
  const posterImage = siteImages[posterImageKey] || siteImages.hero;

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={withBasePath(posterImage.src)}
      onError={onError}
      className="relative z-10 w-full h-full object-cover"
    >
      {webmSrc && <source src={withBasePath(webmSrc)} type="video/webm" />}
      {mp4Src && <source src={withBasePath(mp4Src)} type="video/mp4" />}
    </video>
  );
}
