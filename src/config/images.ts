import {
  imageManifest,
  type OptimizedImageEntry,
  type SiteImageKey,
} from './imageManifest.generated';

export type ManagedImage = OptimizedImageEntry;
export type { SiteImageKey };

export const siteImages: Record<SiteImageKey, ManagedImage> = imageManifest;

export type ImagePreset =
  | 'hero'
  | 'detailHero'
  | 'destinationCard'
  | 'packageCard'
  | 'blogCard'
  | 'galleryCard'
  | 'editorial'
  | 'detailFeature'
  | 'lightbox';

export interface ImagePresetConfig {
  /** Standardized Tailwind aspect ratio class for the card/slot container */
  aspectClass: string;
  /** Responsive HTML sizes attribute matching the layout grid */
  sizes: string;
  /** Whether to serve the 4:5 focal-point mobile art-direction crop below 640px */
  useMobileCrop: boolean;
}

/**
 * Single source of truth for card aspect ratios, responsive image sizes,
 * and mobile art-direction cropping across the entire Visatrip Global site.
 */
export const IMAGE_PRESETS: Record<ImagePreset, ImagePresetConfig> = {
  hero: {
    aspectClass: '',
    sizes: '100vw',
    useMobileCrop: true,
  },
  detailHero: {
    aspectClass: '',
    sizes: '100vw',
    useMobileCrop: true,
  },
  destinationCard: {
    aspectClass: 'aspect-[4/3]',
    sizes: '(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 285px',
    useMobileCrop: false,
  },
  packageCard: {
    aspectClass: 'aspect-[16/10]',
    sizes: '(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 384px',
    useMobileCrop: false,
  },
  blogCard: {
    aspectClass: 'aspect-[16/9]',
    sizes: '(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 384px',
    useMobileCrop: false,
  },
  galleryCard: {
    aspectClass: 'aspect-[4/3]',
    sizes: '(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 384px',
    useMobileCrop: false,
  },
  editorial: {
    aspectClass: 'aspect-[4/3]',
    sizes: '(max-width: 1023px) 94vw, 560px',
    useMobileCrop: false,
  },
  detailFeature: {
    aspectClass: 'aspect-[16/10]',
    sizes: '(max-width: 1023px) 94vw, 760px',
    useMobileCrop: false,
  },
  lightbox: {
    aspectClass: 'aspect-[16/10]',
    sizes: '92vw',
    useMobileCrop: false,
  },
};

export interface HeroSlide {
  imageKey: SiteImageKey;
  locationBn: string;
  locationEn: string;
  captionBn: string;
  captionEn: string;
}

/**
 * Curated 16:9 widescreen hero slides for the optional 5-second cross-fade slideshow.
 * Every image has a matching 4:5 focal-point mobile art-direction crop.
 */
export const heroSlides: HeroSlide[] = [
  {
    imageKey: 'hero',
    locationBn: 'আন্তর্জাতিক ডিপার্চার',
    locationEn: 'Global Departures',
    captionBn: 'ভিসা, এয়ার টিকেট ও সম্পূর্ণ ভ্রমণ গাইডেন্স',
    captionEn: 'Visas, Air Ticketing & End-to-End Guidance',
  },
  {
    imageKey: 'heroDubai',
    locationBn: 'দুবাই, ইউএই',
    locationEn: 'Dubai, UAE',
    captionBn: 'দুবাই ট্যুরিস্ট ভিসা ও পারিবারিক ট্যুর প্যাকেজ',
    captionEn: 'Dubai Tourist Visa & Curated Family Tours',
  },
  {
    imageKey: 'saudiArabia',
    locationBn: 'পবিত্র মক্কা, সৌদি আরব',
    locationEn: 'Makkah, Saudi Arabia',
    captionBn: 'হজ্জ ও ওমরাহ কাফেলা — হারাম শরীফের সন্নিকটে হোটেল',
    captionEn: 'Guided Hajj & Umrah with Haram-Proximity Hotels',
  },
  {
    imageKey: 'heroIstanbul',
    locationBn: 'ইস্তাম্বুল, তুরস্ক',
    locationEn: 'Istanbul, Turkey',
    captionBn: 'তুরস্ক ও ইউরোপ ভিসা প্রসেসিং এবং হেরিটেজ ট্যুর',
    captionEn: 'Turkey & Europe Visa Support & Heritage Tours',
  },
  {
    imageKey: 'heroMalaysia',
    locationBn: 'কুয়ালালামপুর, মালয়েশিয়া',
    locationEn: 'Kuala Lumpur, Malaysia',
    captionBn: 'মালয়েশিয়া ই-ভিসা, স্টুডেন্ট কনসালটেন্সি ও হানিমুন ট্যুর',
    captionEn: 'Malaysia eVisa, Student Consultancy & Tours',
  },
];
