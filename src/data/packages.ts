import { siteImages } from '../config/images';

export type PackageCategory = 'International' | 'Umrah' | 'Domestic';
export type BudgetTier = 'Economy' | 'Standard' | 'Premium';

export interface TourPackageItem {
  slug: string;
  imageKey: keyof typeof siteImages;
  featuredOnHome: boolean;
  category: PackageCategory;
  budgetTier: BudgetTier;
  countrySlug: string;
  titleBn: string;
  titleEn: string;
  durationBn: string;
  durationEn: string;
  durationDays: number;
  /** TRUST RULE: Keep null until owner enters real verified BDT pricing. Null displays "কনসাল্টেশন নিন" gracefully. */
  priceBDT: number | null;
  summaryBn: string;
  summaryEn: string;
  hotelTierBn: string;
  hotelTierEn: string;
  visaIncluded: boolean;
  flightIncluded: boolean;
  mealsBn: string;
  mealsEn: string;
  inclusionsBn: string[];
  inclusionsEn: string[];
  exclusionsBn: string[];
  exclusionsEn: string[];
  itinerary: {
    day: number;
    titleBn: string;
    descBn: string;
    titleEn: string;
    descEn: string;
  }[];
  seo: {
    titleBn: string;
    descriptionBn: string;
    titleEn: string;
    descriptionEn: string;
  };
}

export const tourPackagesData: TourPackageItem[] = [
  {
    slug: 'dubai-abu-dhabi-family-tour-5d',
    imageKey: 'dubai',
    featuredOnHome: true,
    category: 'International',
    budgetTier: 'Standard',
    countrySlug: 'dubai',
    titleBn: 'দুবাই ও আবুধাবি ফ্যামিলি ট্যুর প্যাকেজ',
    titleEn: 'Dubai & Abu Dhabi Family Discovery',
    durationBn: '৪ রাত / ৫ দিন',
    durationEn: '4 Nights / 5 Days',
    durationDays: 5,
    priceBDT: null,
    summaryBn: 'বুর্জ খলিফা, ডেজার্ট সাফারি, ধাউ ক্রুজ এবং আবুধাবি গ্র্যান্ড মসজিদসহ পরিপূর্ণ ফ্যামিলি ট্যুর।',
    summaryEn: 'Complete family holiday featuring Dubai City Tour, Desert Safari, Dhow Cruise, and Abu Dhabi Mosque.',
    hotelTierBn: '৩/৪-তারকা যাচাইকৃত হোটেল (ব্রেকফাস্টসহ)',
    hotelTierEn: 'Verified 3/4-Star Hotel with Daily Breakfast',
    visaIncluded: false,
    flightIncluded: false,
    mealsBn: 'প্রতিদিন ব্রেকফাস্ট + ২ ডিনার (সাফারি ও ক্রুজ)',
    mealsEn: 'Daily Breakfast + 2 Dinners (Safari & Cruise)',
    inclusionsBn: [
      '৪ রাত মানসম্মত হোটেলে থাকা ও প্রতিদিন বুফে ব্রেকফাস্ট',
      'দুবাই এয়ারপোর্ট থেকে পিকআপ ও ড্রপ (প্রাইভেট/শেয়ার্ড)',
      'হাফ-ডে দুবাই সিটি ট্যুর (পাম জুমেইরাহ, বুর্জ আল আরব ফটো স্টপ)',
      'ডেজার্ট সাফারি, ডুন ব্যাশিং ও বারবিকিউ ডিনার',
      'দুবাই মেরিনা/ক্রিক ধাউ ক্রুজ ডিনার',
      'আবুধাবি ফুল-ডে সিটি ট্যুর ও শেখ জায়েদ গ্র্যান্ড মসজিদ',
    ],
    inclusionsEn: [
      '4 nights verified hotel stay with daily buffet breakfast',
      'Return Dubai airport transfers',
      'Half-day Dubai City Tour with iconic landmarks',
      'Desert Safari with dune bashing and BBQ dinner',
      'Dubai Marina/Creek Dhow Cruise dinner',
      'Full-day Abu Dhabi City Tour & Sheikh Zayed Grand Mosque',
    ],
    exclusionsBn: [
      'আন্তর্জাতিক রিটার্ন এয়ার টিকেট (চাহিদা অনুযায়ী যুক্ত করা যাবে)',
      'UAE ট্যুরিস্ট ভিসা ফি (আলাদাভাবে প্রসেস করা হয়)',
      'দুবাই হোটেল ট্যুরিজম দিরহাম ফি ও ব্যক্তিগত খরচ',
    ],
    exclusionsEn: [
      'International return airfare (can be bundled on request)',
      'UAE Tourist Visa fee (processed separately)',
      'Tourism Dirham fee at hotel & personal expenses',
    ],
    itinerary: [
      {
        day: 1,
        titleBn: 'দুবাই আগমন ও সন্ধ্যায় ধাউ ক্রুজ ডিনার',
        descBn: 'দুবাই এয়ারপোর্টে রিসিভ করে হোটেলে চেক-ইন। সন্ধ্যায় দুবাই মেরিনা বা ক্রিক ধাউ ক্রুজে মনোরম ডিনার।',
        titleEn: 'Arrival in Dubai & Evening Dhow Cruise',
        descEn: 'Airport reception and hotel check-in, followed by a relaxing evening Dhow Cruise with dinner.',
      },
      {
        day: 2,
        titleBn: 'দুবাই সিটি ট্যুর ও বুর্জ খলিফা এলাকা ভ্রমণ',
        descBn: 'সকালে গাইডেড দুবাই সিটি ট্যুর, পাম জুমেইরাহ ও দুবাই ফ্রেম। বিকেলে দুবাই মল ও ফাউন্টেন শো।',
        titleEn: 'Dubai City Tour & Burj Khalifa District',
        descEn: 'Morning guided tour of Palm Jumeirah and Dubai landmarks; evening at Dubai Mall and Fountain Show.',
      },
      {
        day: 3,
        titleBn: 'বিকেলে রোমাঞ্চকর ডেজার্ট সাফারি',
        descBn: 'সকালে বিশ্রাম বা শপিং। বিকেলে ৪×৪ ল্যান্ড ক্রুজারে ডেজার্ট সাফারি, সূর্যাস্ত ও বারবিকিউ ডিনার।',
        titleEn: 'Afternoon Desert Safari & BBQ Dinner',
        descEn: 'Leisure morning followed by 4x4 dune bashing, desert sunset views, and BBQ dinner.',
      },
      {
        day: 4,
        titleBn: 'আবুধাবি সিটি ট্যুর ও শেখ জায়েদ মসজিদ',
        descBn: 'সকালে আবুধাবি যাত্রা, ঐতিহাসিক শেখ জায়েদ গ্র্যান্ড মসজিদ পরিদর্শন ও সন্ধ্যায় দুবাই প্রত্যাবর্তন।',
        titleEn: 'Abu Dhabi City Tour & Grand Mosque',
        descEn: 'Full-day excursion to Abu Dhabi including Sheikh Zayed Grand Mosque and Corniche.',
      },
      {
        day: 5,
        titleBn: 'হোটেল চেক-আউট ও দেশে প্রত্যাবর্তন',
        descBn: 'সকালের নাস্তা শেষে এয়ারপোর্ট ট্রান্সফার ও ঢাকার উদ্দেশে ফ্লাইট।',
        titleEn: 'Departure Transfer to Airport',
        descEn: 'Breakfast, hotel check-out, and timely transfer to Dubai International Airport.',
      },
    ],
    seo: {
      titleBn: '৫ দিনের দুবাই ও আবুধাবি ট্যুর প্যাকেজ | Visatrip Global',
      descriptionBn: 'বাংলাদেশ থেকে ৪ রাত ৫ দিনের দুবাই ও আবুধাবি ফ্যামিলি ট্যুর প্যাকেজ — হোটেল, ডেজার্ট সাফারি, ধাউ ক্রুজ ও স্বচ্ছ Itinerary | Visatrip Global।',
      titleEn: '5-Day Dubai & Abu Dhabi Tour Package | Visatrip Global',
      descriptionEn: '4 Nights / 5 Days Dubai & Abu Dhabi family package from Bangladesh with Desert Safari, Dhow Cruise, and curated hotels.',
    },
  },
  {
    slug: 'malaysia-singapore-combo-tour-7d',
    imageKey: 'malaysia',
    featuredOnHome: true,
    category: 'International',
    budgetTier: 'Standard',
    countrySlug: 'malaysia',
    titleBn: 'মালয়েশিয়া ও সিঙ্গাপুর কম্বো ট্যুর প্যাকেজ',
    titleEn: 'Malaysia & Singapore Twin-City Tour',
    durationBn: '৬ রাত / ৭ দিন',
    durationEn: '6 Nights / 7 Days',
    durationDays: 7,
    priceBDT: null,
    summaryBn: 'কুয়ালালামপুর, গেন্টিং হাইল্যান্ডস, সিঙ্গাপুর মেরিনা বে ও সেন্তোসা দ্বীপ এক সফরে।',
    summaryEn: 'Explore Kuala Lumpur, Genting Highlands, Singapore Marina Bay, and Sentosa Island in one smooth trip.',
    hotelTierBn: '৩/৪-তারকা সেন্ট্রাল হোটেল (ব্রেকফাস্টসহ)',
    hotelTierEn: '3/4-Star Central City Hotels with Breakfast',
    visaIncluded: false,
    flightIncluded: false,
    mealsBn: 'প্রতিদিন হোটেল ব্রেকফাস্ট',
    mealsEn: 'Daily Hotel Breakfast',
    inclusionsBn: [
      'কুয়ালালামপুরে ৩ রাত + সিঙ্গাপুরে ৩ রাত মানসম্মত হোটেল',
      'প্রতিদিন ব্রেকফাস্ট এবং সকল এয়ারপোর্ট ট্রান্সফার',
      'কুয়ালালামপুর সিটি ট্যুর ও গেন্টিং হাইল্যান্ডস কেবল কারসহ ডে-ট্রিপ',
      'কুয়ালালামপুর থেকে সিঙ্গাপুর লাক্সারি এসি কোচ টিকেট',
      'সিঙ্গাপুর সিটি ট্যুর ও সেন্তোসা আইল্যান্ড এক্সকারশন',
    ],
    inclusionsEn: [
      '3 nights in Kuala Lumpur + 3 nights in Singapore',
      'Daily breakfast and airport transfers',
      'Kuala Lumpur City Tour & Genting Highlands with cable car',
      'Luxury AC coach transfer from Kuala Lumpur to Singapore',
      'Singapore City Tour & Sentosa Island visit',
    ],
    exclusionsBn: [
      'আন্তর্জাতিক এয়ার টিকেট এবং ভিসা ফি (আলাদাভাবে যুক্ত করা যায়)',
      'দুপুর ও রাতের খাবার এবং ব্যক্তিগত শপিং',
      'মালয়েশিয়া ট্যুরিজম ট্যাক্স (হোটেলে প্রদেয়)',
    ],
    exclusionsEn: [
      'International flights & visa fees (available as add-on)',
      'Lunch, dinner, and personal expenses',
      'Malaysia Tourism Tax payable at check-in',
    ],
    itinerary: [
      {
        day: 1,
        titleBn: 'কুয়ালালামপুর আগমন',
        descBn: 'এয়ারপোর্ট থেকে হোটেলে চেক-ইন এবং সন্ধ্যায় বুকিত বিনতাং বা কেএলসিসি এলাকায় ফ্রি সময়।',
        titleEn: 'Arrival in Kuala Lumpur',
        descEn: 'Airport pickup, hotel check-in, and leisure evening near Bukit Bintang or KLCC.',
      },
      {
        day: 2,
        titleBn: 'কুয়ালালামপুর সিটি ট্যুর',
        descBn: 'পেট্রোনাস টুইন টাওয়ার ফটো স্টপ, কিং’স প্যালেস, ইন্ডিপেন্ডেন্স স্কয়ার ও চকোলেট গ্যালারি।',
        titleEn: 'Kuala Lumpur City Tour',
        descEn: 'Visit Petronas Twin Towers photo stop, King’s Palace, Independence Square, and local highlights.',
      },
      {
        day: 3,
        titleBn: 'বাতু কেভস ও গেন্টিং হাইল্যান্ডস',
        descBn: 'বাতু কেভস দর্শন এবং কেবল কারে চড়ে মনোরম গেন্টিং হাইল্যান্ডস ভ্রমণ।',
        titleEn: 'Batu Caves & Genting Highlands',
        descEn: 'Explore Batu Caves and enjoy the scenic Awana SkyWay cable car to Genting Highlands.',
      },
      {
        day: 4,
        titleBn: 'কুয়ালালামপুর থেকে সিঙ্গাপুর যাত্রা',
        descBn: 'আরামদায়ক লাক্সারি কোচে সিঙ্গাপুর পৌঁছানো ও হোটেলে চেক-ইন।',
        titleEn: 'Overland Coach to Singapore',
        descEn: 'Comfortable luxury coach transfer to Singapore and hotel check-in.',
      },
      {
        day: 5,
        titleBn: 'সিঙ্গাপুর সিটি ট্যুর',
        descBn: 'মার্লায়ন পার্ক, মেরিনা বে, চায়নাটাউন ও অর্চার্ড রোড পরিদর্শন।',
        titleEn: 'Singapore City Discovery',
        descEn: 'Guided tour of Merlion Park, Marina Bay, Civic District, and Marina waterfront.',
      },
      {
        day: 6,
        titleBn: 'সেন্তোসা আইল্যান্ড ও গার্ডেনস বাই দ্য বে',
        descBn: 'সারা দিন সেন্তোসা দ্বীপ উপভোগ এবং সন্ধ্যায় মেরিনা বে লাইট শো।',
        titleEn: 'Sentosa Island & Gardens by the Bay',
        descEn: 'Enjoy Sentosa attractions and evening illuminated gardens at Marina Bay.',
      },
      {
        day: 7,
        titleBn: 'দেশে প্রত্যাবর্তন',
        descBn: 'চাংগি এয়ারপোর্টে ট্রান্সফার ও ঢাকার ফ্লাইট।',
        titleEn: 'Return Flight Home',
        descEn: 'Breakfast and departure transfer to Singapore Changi Airport.',
      },
    ],
    seo: {
      titleBn: '৭ দিনের মালয়েশিয়া-সিঙ্গাপুর ট্যুর | Visatrip Global',
      descriptionBn: 'বাংলাদেশ থেকে ৬ রাত ৭ দিনের মালয়েশিয়া ও সিঙ্গাপুর কম্বো ট্যুর প্যাকেজ — কুয়ালালামপুর, গেন্টিং ও সেন্তোসা | Visatrip Global।',
      titleEn: '7-Day Malaysia & Singapore Tour | Visatrip Global',
      descriptionEn: '6 Nights / 7 Days Malaysia and Singapore combo tour from Bangladesh covering Kuala Lumpur, Genting Highlands, and Sentosa.',
    },
  },
  {
    slug: 'thailand-bangkok-pattaya-getaway-5d',
    imageKey: 'thailand',
    featuredOnHome: true,
    category: 'International',
    budgetTier: 'Economy',
    countrySlug: 'thailand',
    titleBn: 'ব্যাংকক ও পাতায়া ফ্যামিলি ট্যুর প্যাকেজ',
    titleEn: 'Bangkok & Pattaya Coastal Escape',
    durationBn: '৪ রাত / ৫ দিন',
    durationEn: '4 Nights / 5 Days',
    durationDays: 5,
    priceBDT: null,
    summaryBn: 'পাতায়া কোরাল আইল্যান্ড স্পিডবোট ট্যুর ও ব্যাংকক সিটি এক্সপ্লোর — প্রথমবার বিদেশ ভ্রমণের আদর্শ প্যাকেজ।',
    summaryEn: 'Pattaya Coral Island speedboat excursion paired with Bangkok shopping and cultural highlights.',
    hotelTierBn: '৩-তারকা সেন্ট্রাল হোটেল (ব্রেকফাস্টসহ)',
    hotelTierEn: '3-Star Central Hotels with Breakfast',
    visaIncluded: false,
    flightIncluded: false,
    mealsBn: 'প্রতিদিন ব্রেকফাস্ট + কোরাল আইল্যান্ড লাঞ্চ',
    mealsEn: 'Daily Breakfast + Coral Island Lunch',
    inclusionsBn: [
      'পাতায়ায় ২ রাত ও ব্যাংককে ২ রাত মানসম্মত হোটেল',
      'ব্যাংকক এয়ারপোর্ট–পাতায়া–ব্যাংকক–এয়ারপোর্ট ট্রান্সফার',
      'কোরাল আইল্যান্ড স্পিডবোট ট্যুর ও দুপুরের খাবার',
      'ব্যাংকক হাফ-ডে সিটি ট্যুর',
    ],
    inclusionsEn: [
      '2 nights in Pattaya + 2 nights in Bangkok',
      'All airport and inter-city AC transfers',
      'Coral Island speedboat tour with lunch',
      'Bangkok half-day city tour',
    ],
    exclusionsBn: [
      'এয়ার টিকেট ও থাইল্যান্ড ভিসা ফি (আলাদাভাবে যুক্ত করা যায়)',
      'ব্যক্তিগত খরচ ও ঐচ্ছিক অ্যাডভেঞ্চার রাইড',
    ],
    exclusionsEn: [
      'Airfare and Thailand visa fee (available separately)',
      'Personal shopping and optional water sports',
    ],
    itinerary: [
      {
        day: 1,
        titleBn: 'ব্যাংকক আগমন ও পাতায়া যাত্রা',
        descBn: 'ব্যাংকক এয়ারপোর্ট থেকে সরাসরি পাতায়া হোটেলে ট্রান্সফার ও সন্ধ্যায় সমুদ্রসৈকত উপভোগ।',
        titleEn: 'Arrive Bangkok & Transfer to Pattaya',
        descEn: 'Meet at Bangkok Airport and drive directly to Pattaya for a relaxed coastal evening.',
      },
      {
        day: 2,
        titleBn: 'কোরাল আইল্যান্ড (Koh Larn) স্পিডবোট ট্যুর',
        descBn: 'সকালে স্পিডবোটে কোরাল আইল্যান্ড ভ্রমণ, স্বচ্ছ সমুদ্রে সময় কাটানো ও দুপুরের খাবার।',
        titleEn: 'Coral Island Speedboat Excursion',
        descEn: 'Full morning speedboat trip to Coral Island with beach leisure and lunch.',
      },
      {
        day: 3,
        titleBn: 'পাতায়া থেকে ব্যাংকক ও সিটি ট্যুর',
        descBn: 'সকালে ব্যাংকক ফিরে এসে সিটি ট্যুর এবং হোটেলে চেক-ইন।',
        titleEn: 'Return to Bangkok & City Tour',
        descEn: 'Check out from Pattaya, enjoy a guided Bangkok city tour, and check into your city hotel.',
      },
      {
        day: 4,
        titleBn: 'ব্যাংককে ফ্রি শপিং বা সাফারি ওয়ার্ল্ড (ঐচ্ছিক)',
        descBn: 'পরিবার নিয়ে সাফারি ওয়ার্ল্ড ভ্রমণ অথবা প্রাতুনাম/এমবিকে মলে শপিং।',
        titleEn: 'Bangkok Leisure, Shopping or Optional Safari World',
        descEn: 'Free day for shopping at Pratunam/MBK or optional family visit to Safari World.',
      },
      {
        day: 5,
        titleBn: 'ব্যাংকক থেকে ঢাকায় প্রত্যাবর্তন',
        descBn: 'সকালের নাস্তা শেষে এয়ারপোর্ট ট্রান্সফার।',
        titleEn: 'Departure from Bangkok',
        descEn: 'Hotel check-out and airport transfer for your flight back to Dhaka.',
      },
    ],
    seo: {
      titleBn: '৫ দিনের ব্যাংকক ও পাতায়া ট্যুর | Visatrip Global',
      descriptionBn: 'বাংলাদেশ থেকে ৪ রাত ৫ দিনের ব্যাংকক ও পাতায়া কোরাল আইল্যান্ড ট্যুর প্যাকেজ — সাশ্রয়ী ও নিরাপদ ফ্যামিলি ভ্রমণ | Visatrip Global।',
      titleEn: '5-Day Bangkok & Pattaya Tour | Visatrip Global',
      descriptionEn: '4 Nights / 5 Days Bangkok and Pattaya Coral Island package from Bangladesh with verified hotels and transfers.',
    },
  },
  {
    slug: 'umrah-standard-group-package-14d',
    imageKey: 'saudiArabia',
    featuredOnHome: true,
    category: 'Umrah',
    budgetTier: 'Standard',
    countrySlug: 'saudi-arabia',
    titleBn: 'স্ট্যান্ডার্ড ওমরাহ গ্রুপ প্যাকেজ (মক্কা ও মদিনা)',
    titleEn: 'Standard Umrah Group Package (Makkah & Madinah)',
    durationBn: '১৪ দিন (মক্কা ও মদিনা)',
    durationEn: '14 Days (Makkah & Madinah)',
    durationDays: 14,
    priceBDT: null,
    summaryBn: 'হারামের হাঁটা দূরত্বে মানসম্মত হোটেল, ওমরাহ ভিসা, রিটার্ন ফ্লাইট, জিয়ারাহ ও অভিজ্ঞ মুয়াল্লেম।',
    summaryEn: 'Walking-distance hotels near Haram, Umrah visa, return flights, Ziyarah, and experienced Moallem guidance.',
    hotelTierBn: 'হারাম থেকে ৩০০–৬০০ মিটার (মানসম্মত ৩/৪-তারকা হোটেল)',
    hotelTierEn: '300–600m from Haram (Quality 3/4-Star Hotel)',
    visaIncluded: true,
    flightIncluded: true,
    mealsBn: 'প্যাকেজ অপশন অনুযায়ী ব্রেকফাস্ট / বাঙালি খাবার',
    mealsEn: 'Breakfast / Bangladeshi meal options per tier',
    inclusionsBn: [
      'সৌদি ওমরাহ ভিসা ও স্বাস্থ্য বিমা',
      'ঢাকা–জেদ্দা/মদিনা রিটার্ন ইকোনমি এয়ার টিকেট',
      'মক্কা ও মদিনায় হারামের হাঁটা দূরত্বে মানসম্মত হোটেল',
      'জেদ্দা–মক্কা–মদিনা–জেদ্দা এসি বাস ট্রান্সপোর্ট',
      'অভিজ্ঞ আলেম/মুয়াল্লেমের তত্ত্বাবধানে মক্কা ও মদিনা জিয়ারাহ',
      'সফরের পূর্বে ওমরাহ প্রশিক্ষণ ও বাংলা দোয়া গাইডবুক',
    ],
    inclusionsEn: [
      'Saudi Umrah Visa and mandatory travel health insurance',
      'Dhaka–Jeddah/Madinah return economy flights',
      'Walking-distance quality hotels in Makkah & Madinah',
      'AC coach transfers across Jeddah, Makkah, and Madinah',
      'Guided Makkah & Madinah Ziyarah with experienced Moallem',
      'Pre-departure orientation session & Bangla Dua booklet',
    ],
    exclusionsBn: [
      'ব্যক্তিগত খরচ, লন্ড্রি ও অতিরিক্ত লাগেজ চার্জ',
      'প্যাকেজের বাইরে অতিরিক্ত প্রাইভেট ট্রান্সপোর্ট',
    ],
    exclusionsEn: [
      'Personal expenses, laundry, and excess baggage fees',
      'Private transport outside the group schedule',
    ],
    itinerary: [
      {
        day: 1,
        titleBn: 'ঢাকা থেকে জেদ্দা যাত্রা ও প্রথম ওমরাহ পালন',
        descBn: 'ইহরাম বেঁধে ঢাকা থেকে ফ্লাইট। জেদ্দা পৌঁছে এসি বাসে মক্কায় আগমন, হোটেলে বিশ্রাম ও মুয়াল্লেমের সাথে ওমরাহ আদায়।',
        titleEn: 'Departure from Dhaka & First Umrah in Makkah',
        descEn: 'Fly from Dhaka in Ihram, transfer from Jeddah to Makkah, check in, and perform guided Umrah.',
      },
      {
        day: 2,
        titleBn: 'মক্কায় ইবাদত ও তাওয়াফ (দিন ২–৭)',
        descBn: 'মসজিদুল হারামে পাঁচ ওয়াক্ত নামাজ, নফল তাওয়াফ এবং মক্কার ঐতিহাসিক স্থান (আরাফাত, মিনা, জাবালে নূর, জাবালে সাওর) জিয়ারাহ।',
        titleEn: 'Makkah Worship & Historical Ziyarah (Days 2–7)',
        descEn: 'Daily prayers at Masjid al-Haram plus guided Ziyarah to Arafat, Mina, Jabal al-Nour, and Jabal Thawr.',
      },
      {
        day: 8,
        titleBn: 'মক্কা থেকে পবিত্র মদিনা শরীফ যাত্রা',
        descBn: 'এসি বাসে (অথবা ঐচ্ছিক হারামাইন ট্রেনে) মদিনা শরীফ আগমন ও মসজিদে নববীতে সালাম পেশ।',
        titleEn: 'Journey to Madinah Munawwarah',
        descEn: 'Travel comfortably to Madinah and settle near Masjid an-Nabawi.',
      },
      {
        day: 9,
        titleBn: 'মদিনায় ইবাদত, রিয়াজুল জান্নাহ ও জিয়ারাহ (দিন ৯–১৩)',
        descBn: 'মসজিদে কুবা, উহুদ প্রান্তর, মসজিদে কিবলাতাইন জিয়ারাহ এবং নুসুক অ্যাপের মাধ্যমে রিয়াজুল জান্নাহর Appointment গাইডলাইন।',
        titleEn: 'Madinah Worship & Ziyarah (Days 9–13)',
        descEn: 'Visit Masjid Quba, Mount Uhud, Masjid Qiblatain, plus Nusuk appointment guidance for Rawdah.',
      },
      {
        day: 14,
        titleBn: 'মদিনা/জেদ্দা থেকে দেশে প্রত্যাবর্তন',
        descBn: 'হোটেল চেক-আউট, এয়ারপোর্ট ট্রান্সফার এবং নিরাপদে বাংলাদেশে প্রত্যাবর্তন।',
        titleEn: 'Safe Return to Bangladesh',
        descEn: 'Check out and board your return flight home to Dhaka.',
      },
    ],
    seo: {
      titleBn: '১৪ দিনের স্ট্যান্ডার্ড ওমরাহ প্যাকেজ | Visatrip Global',
      descriptionBn: 'চাঁপাইনবাবগঞ্জ ও রাজশাহী বিভাগ থেকে ১৪ দিনের স্ট্যান্ডার্ড ওমরাহ গ্রুপ প্যাকেজ — হারামের কাছে হোটেল, জিয়ারাহ ও অভিজ্ঞ মুয়াল্লেম | Visatrip Global।',
      titleEn: '14-Day Standard Umrah Package | Visatrip Global',
      descriptionEn: 'Complete 14-day Umrah package from Bangladesh with walking-distance Haram hotels, flights, visa, and experienced Moallem.',
    },
  },
  {
    slug: 'turkey-istanbul-cappadocia-heritage-7d',
    imageKey: 'turkey',
    featuredOnHome: false,
    category: 'International',
    budgetTier: 'Premium',
    countrySlug: 'turkey',
    titleBn: 'তুরস্ক: ইস্তাম্বুল ও ক্যাপাডোসিয়া হেরিটেজ ট্যুর',
    titleEn: 'Turkey: Istanbul & Cappadocia Heritage',
    durationBn: '৬ রাত / ৭ দিন',
    durationEn: '6 Nights / 7 Days',
    durationDays: 7,
    priceBDT: null,
    summaryBn: 'উসমানীয় ঐতিহ্যের ইস্তাম্বুল, বসফরাস ক্রুজ এবং ক্যাপাডোসিয়ার জাদুকরী উপত্যকা ভ্রমণ।',
    summaryEn: 'Discover Istanbul’s Ottoman landmarks, Bosphorus views, and Cappadocia’s iconic valleys.',
    hotelTierBn: '৪-তারকা বুটিক ও কেভ-স্টাইল হোটেল',
    hotelTierEn: '4-Star Boutique & Cappadocia Cave-Style Hotel',
    visaIncluded: false,
    flightIncluded: false,
    mealsBn: 'প্রতিদিন ব্রেকফাস্ট + ২ লাঞ্চ (ক্যাপাডোসিয়া)',
    mealsEn: 'Daily Breakfast + 2 Lunches in Cappadocia',
    inclusionsBn: [
      'ইস্তাম্বুলে ৪ রাত ও ক্যাপাডোসিয়ায় ২ রাত ৪-তারকা হোটেল',
      'ইস্তাম্বুল–ক্যাপাডোসিয়া অভ্যন্তরীণ রিটার্ন ফ্লাইট',
      'বসফরাস ক্রুজ ও ওল্ড সিটি হেরিটেজ ট্যুর',
      'ক্যাপাডোসিয়া রেড ও গ্রিন ট্যুর গাইডসহ',
    ],
    inclusionsEn: [
      '4 nights in Istanbul + 2 nights in Cappadocia (4-star hotels)',
      'Domestic return flights between Istanbul and Cappadocia',
      'Bosphorus Cruise & Old City Heritage Tour',
      'Guided Cappadocia valley tours',
    ],
    exclusionsBn: [
      'আন্তর্জাতিক এয়ার টিকেট ও তুরস্ক ভিসা ফি',
      'হট এয়ার বেলুন রাইড (ঐচ্ছিক বুকিং)',
    ],
    exclusionsEn: [
      'International flights & Turkey visa fee',
      'Optional Hot Air Balloon ride',
    ],
    itinerary: [
      {
        day: 1,
        titleBn: 'ইস্তাম্বুল আগমন',
        descBn: 'এয়ারপোর্ট পিকআপ ও সুলতানাহমেত/তাকসিম এলাকার হোটেলে চেক-ইন।',
        titleEn: 'Arrive in Istanbul',
        descEn: 'Airport pickup and transfer to your hotel near Sultanahmet or Taksim.',
      },
      {
        day: 2,
        titleBn: 'ইস্তাম্বুল ওল্ড সিটি ট্যুর',
        descBn: 'ব্লু মস্ক, আয়া সোফিয়া, হিপ্পোড্রোম ও গ্র্যান্ড বাজার।',
        titleEn: 'Istanbul Old City Heritage',
        descEn: 'Guided visit to Blue Mosque, Hagia Sophia, Hippodrome, and Grand Bazaar.',
      },
      {
        day: 3,
        titleBn: 'বসফরাস ক্রুজ ও এশীয় অংশ ভ্রমণ',
        descBn: 'ইউরোপ ও এশিয়ার মাঝের বসফরাস প্রণালীতে নৌভ্রমণ।',
        titleEn: 'Bosphorus Cruise & Asian Side',
        descEn: 'Scenic boat cruise between Europe and Asia with afternoon spice bazaar.',
      },
      {
        day: 4,
        titleBn: 'ক্যাপাডোসিয়া ফ্লাইট ও ভ্যালি ভ্রমণ',
        descBn: 'অভ্যন্তরীণ ফ্লাইটে ক্যাপাডোসিয়া আগমন ও ডেভরেন্ট ভ্যালি পরিদর্শন।',
        titleEn: 'Fly to Cappadocia & Valley Views',
        descEn: 'Domestic flight to Cappadocia followed by iconic rock-formation valleys.',
      },
      {
        day: 5,
        titleBn: 'ক্যাপাডোসিয়া পূর্ণ-দিবস ট্যুর',
        descBn: 'ভোরে ঐচ্ছিক হট এয়ার বেলুন দর্শন এবং গোরেমে ওপেন এয়ার মিউজিয়াম।',
        titleEn: 'Full-Day Cappadocia Discovery',
        descEn: 'Optional sunrise hot air balloon experience plus Goreme and Uchisar Castle.',
      },
      {
        day: 6,
        titleBn: 'ইস্তাম্বুলে প্রত্যাবর্তন ও শপিং',
        descBn: 'ইস্তাম্বুলে ফিরে ফ্রি শপিং ও তুর্কি খাবারের স্বাদ।',
        titleEn: 'Return to Istanbul & Leisure',
        descEn: 'Fly back to Istanbul for shopping and relaxed dining.',
      },
      {
        day: 7,
        titleBn: 'দেশে প্রত্যাবর্তন',
        descBn: 'এয়ারপোর্ট ট্রান্সফার ও ঢাকার ফ্লাইট।',
        titleEn: 'Departure Transfer',
        descEn: 'Transfer to Istanbul Airport for your flight home.',
      },
    ],
    seo: {
      titleBn: '৭ দিনের তুরস্ক ইস্তাম্বুল ট্যুর | Visatrip Global',
      descriptionBn: 'বাংলাদেশ থেকে ৬ রাত ৭ দিনের তুরস্ক ইস্তাম্বুল ও ক্যাপাডোসিয়া হেরিটেজ ট্যুর প্যাকেজ — Visatrip Global।',
      titleEn: '7-Day Istanbul & Cappadocia Tour | Visatrip Global',
      descriptionEn: '6 Nights / 7 Days Istanbul and Cappadocia tour package from Bangladesh with domestic flights and boutique hotels.',
    },
  },
  {
    slug: 'coxs-bazar-sylhet-family-tour-4d',
    imageKey: 'office',
    featuredOnHome: false,
    category: 'Domestic',
    budgetTier: 'Economy',
    countrySlug: 'india',
    titleBn: 'কক্সবাজার অথবা সিলেট ফ্যামিলি রিসোর্ট ট্যুর (বাংলাদেশ)',
    titleEn: 'Cox’s Bazar or Sylhet Family Resort Getaway',
    durationBn: '৩ রাত / ৪ দিন',
    durationEn: '3 Nights / 4 Days',
    durationDays: 4,
    priceBDT: null,
    summaryBn: 'পরিবার বা কর্পোরেট গ্রুপের জন্য নিরাপদ হোটেল, এয়ার/এসি কোচ টিকেট ও স্থানীয় সাইটসিয়িং।',
    summaryEn: 'Relaxed domestic holiday with verified resorts, domestic flights/AC transfers, and local sightseeing.',
    hotelTierBn: '৩/৪-তারকা যাচাইকৃত রিসোর্ট ও হোটেল',
    hotelTierEn: 'Verified 3/4-Star Resort & Hotel',
    visaIncluded: false,
    flightIncluded: false,
    mealsBn: 'প্রতিদিন ব্রেকফাস্ট',
    mealsEn: 'Daily Breakfast',
    inclusionsBn: [
      '৩ রাত মানসম্মত হোটেল বা রিসোর্ট (ব্রেকফাস্টসহ)',
      'স্থানীয় সাইটসিয়িং (ইনানী-মেরিন ড্রাইভ অথবা রাতারগুল-সাদাপাথর)',
      'স্টেশন/এয়ারপোর্ট পিকআপ ও ড্রপ',
    ],
    inclusionsEn: [
      '3 nights verified resort/hotel with breakfast',
      'Local sightseeing (Marine Drive & Inani or Ratargul & Sada Pathor)',
      'Airport/station pickup & drop-off',
    ],
    exclusionsBn: [
      'ঢাকা/রাজশাহী থেকে যাতায়াত টিকেট (চাহিদা অনুযায়ী যুক্ত করা যাবে)',
      'দুপুর ও রাতের খাবার',
    ],
    exclusionsEn: [
      'Inter-city air or AC bus tickets (can be added on request)',
      'Lunch and dinner',
    ],
    itinerary: [
      {
        day: 1,
        titleBn: 'আগমন ও রিসোর্ট চেক-ইন',
        descBn: 'রিসোর্টে চেক-ইন ও বিকেলে সমুদ্রসৈকত বা চা বাগানে অবসর সময়।',
        titleEn: 'Arrival & Resort Check-In',
        descEn: 'Check in and enjoy a calm evening by the sea or tea gardens.',
      },
      {
        day: 2,
        titleBn: 'পূর্ণ-দিবস সাইটসিয়িং',
        descBn: 'মেরিন ড্রাইভ, হিমছড়ি ও ইনানী বিচ (অথবা সিলেটে সাদাপাথর ও রাতারগুল)।',
        titleEn: 'Full-Day Local Sightseeing',
        descEn: 'Scenic Marine Drive & Inani Beach (or Sada Pathor & Ratargul in Sylhet).',
      },
      {
        day: 3,
        titleBn: 'বিশ্রাম ও স্থানীয় শপিং',
        descBn: 'পরিবারের সাথে নিরিবিলি সময় কাটানো ও স্থানীয় ঐতিহ্যবাহী কেনাকাটা।',
        titleEn: 'Leisure & Local Markets',
        descEn: 'Relaxed day at the resort and local souvenir markets.',
      },
      {
        day: 4,
        titleBn: 'চেক-আউট ও প্রত্যাবর্তন',
        descBn: 'সকালের নাস্তা শেষে নিরাপদে বাড়ির পথে যাত্রা।',
        titleEn: 'Check-out & Return',
        descEn: 'Breakfast, check-out, and return journey.',
      },
    ],
    seo: {
      titleBn: 'কক্সবাজার ও সিলেট ফ্যামিলি ট্যুর | Visatrip Global',
      descriptionBn: 'বাংলাদেশের ভেতরে কক্সবাজার ও সিলেটের সাশ্রয়ী ও নিরাপদ ফ্যামিলি ট্যুর প্যাকেজ — Visatrip Global।',
      titleEn: 'Cox’s Bazar & Sylhet Family Tour | Visatrip Global',
      descriptionEn: 'Curated 4-day Cox’s Bazar and Sylhet family resort packages booked with transparent local support.',
    },
  },
];

export function getPackageBySlug(slug: string): TourPackageItem | undefined {
  return tourPackagesData.find((p) => p.slug === slug);
}
