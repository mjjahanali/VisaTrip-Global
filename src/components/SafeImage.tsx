import { useEffect, useRef, useState } from 'react';
import { Compass } from 'lucide-react';
import {
  IMAGE_PRESETS,
  siteImages,
  type ImagePreset,
  type SiteImageKey,
} from '../config/images';
import { useLanguage } from '../context/LanguageContext';
import { withBasePath, withBaseSrcSet } from '../lib/assetUrl';
import { destinationPhotoMap } from '../data/destinationPhotoMap';

export interface SafeImageProps {
  imageKey: SiteImageKey;
  /** Optional destination slug to load a country-specific landmark photo when available */
  destinationSlug?: string;
  /** Standardized card/slot preset controlling responsive sizes and mobile art-direction crops */
  preset?: ImagePreset;
  /** Override the HTML sizes attribute if needed */
  sizes?: string;
  /** Explicitly opt into or out of the 4:5 mobile art-direction crop */
  artDirectionMobile?: boolean;
  /** Classes applied to the <img> element (e.g., object-cover, card-img-zoom, opacity-30) */
  className?: string;
  /** Classes applied to the outer wrapper (defaults to absolute-ready full fill) */
  wrapperClassName?: string;
  /** Set true for LCP / above-the-fold images */
  priority?: boolean;
  altOverride?: string;
  /** Disable LQIP blur backdrop when parent manages its own fade/layering */
  disableBlurPlaceholder?: boolean;
}

export function SafeImage({
  imageKey,
  destinationSlug,
  preset,
  sizes: sizesProp,
  artDirectionMobile,
  className = '',
  wrapperClassName = '',
  priority = false,
  altOverride,
  disableBlurPlaceholder = false,
}: SafeImageProps) {
  const { isEn } = useLanguage();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const customLandmark = destinationSlug ? destinationPhotoMap[destinationSlug] : undefined;
  const img = siteImages[imageKey] || siteImages.hero;
  const presetCfg = preset ? IMAGE_PRESETS[preset] : undefined;
  const resolvedSizes = sizesProp || presetCfg?.sizes || '100vw';
  const useMobileCrop =
    typeof artDirectionMobile === 'boolean'
      ? artDirectionMobile
      : Boolean(presetCfg?.useMobileCrop);

  const alt =
    altOverride ||
    (customLandmark
      ? isEn
        ? customLandmark.altEn
        : customLandmark.altBn
      : isEn
        ? img.altEn
        : img.altBn);

  // Avoid flashing placeholder when image is already in browser memory cache
  useEffect(() => {
    setErrored(false);
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [imageKey, destinationSlug]);

  if (errored) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1F3A] to-[#153159] text-[#FAF8F4] p-6 text-center w-full h-full ${wrapperClassName}`}
      >
        <Compass className="w-8 h-8 text-[#C9A24B] mb-2" aria-hidden="true" />
        <span className="text-xs opacity-80 max-w-[220px]">{alt}</span>
      </div>
    );
  }

  if (customLandmark) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#0B1F3A] ${wrapperClassName}`}>
        {!disableBlurPlaceholder && customLandmark.blurDataUrl && (
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 bg-cover bg-center scale-110 blur-md transition-opacity duration-[240ms] ${
              loaded ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              backgroundImage: `url("${customLandmark.blurDataUrl}")`,
              backgroundPosition: '50% 50%',
            }}
          />
        )}

        <picture className="block w-full h-full">
          <source type="image/webp" srcSet={withBasePath(customLandmark.webp)} />
          <img
            ref={imgRef}
            src={withBasePath(customLandmark.jpg)}
            alt={alt}
            width={960}
            height={720}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : 'auto'}
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            className={`block w-full h-full object-cover object-center transition-opacity duration-[240ms] ${
              loaded || priority ? 'opacity-100' : 'opacity-0'
            } ${className}`}
          />
        </picture>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#0B1F3A] ${wrapperClassName}`}>
      {/* Instant inline LQIP blur placeholder — fades out cleanly once decoded */}
      {!disableBlurPlaceholder && img.blurDataUrl && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-cover bg-center scale-110 blur-md transition-opacity duration-[240ms] ${
            loaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: `url("${img.blurDataUrl}")`,
            backgroundPosition: img.objectPosition,
          }}
        />
      )}

      <picture className="block w-full h-full">
        {/* Mobile art-direction 4:5 focal-point crop (below 640px) */}
        {useMobileCrop && img.mobileAvifSrcSet && (
          <source
            media="(max-width: 639px)"
            type="image/avif"
            srcSet={withBaseSrcSet(img.mobileAvifSrcSet)}
            sizes={resolvedSizes}
          />
        )}
        {useMobileCrop && img.mobileWebpSrcSet && (
          <source
            media="(max-width: 639px)"
            type="image/webp"
            srcSet={withBaseSrcSet(img.mobileWebpSrcSet)}
            sizes={resolvedSizes}
          />
        )}

        {/* Modern AVIF & WebP responsive sources */}
        {img.avifSrcSet && (
          <source
            type="image/avif"
            srcSet={withBaseSrcSet(img.avifSrcSet)}
            sizes={resolvedSizes}
          />
        )}
        {img.webpSrcSet && (
          <source
            type="image/webp"
            srcSet={withBaseSrcSet(img.webpSrcSet)}
            sizes={resolvedSizes}
          />
        )}

        {/* Progressive JPEG fallback */}
        <img
          ref={imgRef}
          src={withBasePath(img.src)}
          srcSet={withBaseSrcSet(img.jpgSrcSet) || undefined}
          sizes={resolvedSizes}
          alt={alt}
          width={img.width}
          height={img.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          style={{ objectPosition: img.objectPosition }}
          className={`block w-full h-full object-cover transition-opacity duration-[240ms] ${
            loaded || priority ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        />
      </picture>
    </div>
  );
}
