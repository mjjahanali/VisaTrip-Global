import { siteImages } from '../config/images';
import { extendedDestinationsData } from './destinationsExtended';

export interface DestinationItem {
  slug: string;
  imageKey: keyof typeof siteImages;
  featuredOnHome: boolean;
  nameBn: string;
  nameEn: string;
  regionBn: string;
  regionEn: string;
  taglineBn: string;
  taglineEn: string;
  /** Keep null until owner sets verified real starting price. Null hides "Starting from" cleanly per legal/trust rules. */
  startingPriceBDT: number | null;
  availableServices: string[];
  bestTimeBn: string;
  bestTimeEn: string;
  processingTimeBn: string;
  processingTimeEn: string;
  overviewBn: string;
  overviewEn: string;
  highlightsBn: string[];
  highlightsEn: string[];
  documentsSummaryBn: string[];
  documentsSummaryEn: string[];
  seo: {
    titleBn: string;
    descriptionBn: string;
    titleEn: string;
    descriptionEn: string;
    primaryKeyword: string;
  };
  faqs: { questionBn: string; answerBn: string; questionEn: string; answerEn: string }[];
}

const coreDestinationsData: DestinationItem[] = [
  {
    slug: 'dubai',
    imageKey: 'dubai',
    featuredOnHome: true,
    nameBn: 'দুবাই (UAE)',
    nameEn: 'Dubai (UAE)',
    regionBn: 'মধ্যপ্রাচ্য',
    regionEn: 'Middle East',
    taglineBn: 'আধুনিক স্থাপত্য, ফ্যামিলি ট্যুর ও ক্যারিয়ারের জনপ্রিয় গন্তব্য',
    taglineEn: 'Iconic skyline, family holidays, and global business hub',
    startingPriceBDT: null,
    availableServices: ['tourist-visa', 'work-permit', 'tour-package', 'air-ticketing', 'hotel-booking'],
    bestTimeBn: 'নভেম্বর থেকে মার্চ (আরামদায়ক আবহাওয়া)',
    bestTimeEn: 'November to March (pleasant winter weather)',
    processingTimeBn: 'ই-ভিসা সাধারণত ৪–১০ কর্মদিবস (ইমিগ্রেশন সাপেক্ষে)',
    processingTimeEn: 'e-Visa typically 4–10 working days (subject to immigration)',
    overviewBn:
      'বাংলাদেশি পর্যটক ও কর্মজীবীদের অন্যতম পছন্দের গন্তব্য সংযুক্ত আরব আমিরাত ও দুবাই। বুর্জ খলিফা, ডেজার্ট সাফারি, দুবাই ফ্রেম ও আবুধাবি শেখ জায়েদ গ্র্যান্ড মসজিদ দেখতে প্রতি বছর অসংখ্য পরিবার দুবাই ভ্রমণ করেন। Visatrip Global থেকে দুবাই Tourist Visa গাইডলাইন, Air Ticket, হোটেল ও কাস্টম ট্যুর প্যাকেজ একসাথে পেতে পারেন।',
    overviewEn:
      'Dubai and the UAE remain one of the most popular destinations for Bangladeshi families, business travelers, and professionals. From Burj Khalifa and Desert Safari to Abu Dhabi’s Sheikh Zayed Grand Mosque, Visatrip Global supports visa preparation, flights, hotels, and curated Dubai tours.',
    highlightsBn: [
      'বুর্জ খলিফা ও দুবাই মল ফাউন্টেন শো',
      'ডেজার্ট সাফারি ও বারবিকিউ ডিনার',
      'দুবাই মেরিনা ধাউ ক্রুজ ও পাম জুমেইরাহ',
      'আবুধাবি সিটি ট্যুর ও শেখ জায়েদ গ্র্যান্ড মসজিদ',
    ],
    highlightsEn: [
      'Burj Khalifa & Dubai Mall Fountain Show',
      'Desert Safari with BBQ Dinner',
      'Dubai Marina Dhow Cruise & Palm Jumeirah',
      'Abu Dhabi City Tour & Sheikh Zayed Grand Mosque',
    ],
    documentsSummaryBn: [
      'ন্যূনতম ৬ মাস মেয়াদসহ বৈধ পাসপোর্ট',
      'সাদা ব্যাকগ্রাউন্ডের রঙিন ছবি',
      'ব্যাংক স্টেটমেন্ট ও পেশার প্রমাণপত্র (NOC / Trade License)',
      'রিটার্ন ফ্লাইট Itinerary ও হোটেল বুকিং',
    ],
    documentsSummaryEn: [
      'Valid passport with 6+ months validity',
      'White-background color photograph',
      'Bank statement and occupation proof (NOC / Trade License)',
      'Return flight itinerary and hotel booking',
    ],
    seo: {
      titleBn: 'দুবাই ভিসা ও ট্যুর প্যাকেজ | Visatrip Global',
      descriptionBn: 'বাংলাদেশ থেকে দুবাই Tourist Visa ডকুমেন্ট, Air Ticket ও Dubai Tour Package — সৎ পরামর্শ ও স্বচ্ছ ফি | Visatrip Global।',
      titleEn: 'Dubai Visa & Tour Package Bangladesh | Visatrip Global',
      descriptionEn: 'Dubai Tourist Visa guidance, flights, hotels, and family tour packages from Bangladesh with Visatrip Global.',
      primaryKeyword: 'Dubai tour package from Bangladesh',
    },
    faqs: [
      {
        questionBn: 'বাংলাদেশিদের জন্য দুবাই ট্যুরিস্ট ভিসা কত দিনের হয়?',
        answerBn: 'সাধারণত ৩০ দিন ও ৬০ দিনের সিঙ্গেল বা মাল্টিপল এন্ট্রি ট্যুরিস্ট ভিসার অপশন থাকে (সর্বশেষ UAE ইমিগ্রেশন নিয়ম সাপেক্ষে)।',
        questionEn: 'What durations are available for Dubai Tourist Visa?',
        answerEn: 'Typically 30-day and 60-day tourist visa options exist, subject to current UAE immigration rules.',
      },
      {
        questionBn: 'দুবাই ট্যুরের জন্য কত দিন সময় নেওয়া ভালো?',
        answerBn: 'দুবাই ও আবুধাবির মূল দর্শনীয় স্থানগুলো স্বাচ্ছন্দ্যে ঘোরার জন্য ৪ রাত ৫ দিন অথবা ৫ রাত ৬ দিন সবচেয়ে ভালো।',
        questionEn: 'How many days are ideal for a Dubai trip?',
        answerEn: '4 Nights / 5 Days or 5 Nights / 6 Days is ideal to comfortably enjoy Dubai and an Abu Dhabi day trip.',
      },
    ],
  },
  {
    slug: 'saudi-arabia',
    imageKey: 'saudiArabia',
    featuredOnHome: true,
    nameBn: 'সৌদি আরব (মক্কা ও মদিনা)',
    nameEn: 'Saudi Arabia (Makkah & Madinah)',
    regionBn: 'মধ্যপ্রাচ্য',
    regionEn: 'Middle East',
    taglineBn: 'পবিত্র হজ্জ, ওমরাহ এবং বৈধ কর্মসংস্থানের প্রধান গন্তব্য',
    taglineEn: 'Sacred Hajj & Umrah pilgrimage and verified employment pathways',
    startingPriceBDT: null,
    availableServices: ['hajj-umrah', 'work-permit', 'air-ticketing', 'hotel-booking'],
    bestTimeBn: 'ওমরাহ: বছরজুড়ে (অক্টোবর–মার্চ আবহাওয়া সবচেয়ে আরামদায়ক)',
    bestTimeEn: 'Umrah year-round (October–March offers the mildest weather)',
    processingTimeBn: 'ওমরাহ ভিসা ৩–৭ কর্মদিবস | Work Permit প্রসেস সাপেক্ষে',
    processingTimeEn: 'Umrah Visa 3–7 working days | Work Permit per demand process',
    overviewBn:
      'পবিত্র মক্কা ও মদিনা শরীফে হজ্জ এবং ওমরাহ পালনের পাশাপাশি বাংলাদেশি কর্মীদের সবচেয়ে বড় শ্রমবাজার সৌদি আরব। Visatrip Global থেকে শরিয়াহসম্মত ওমরাহ ও হজ্জ প্যাকেজ, হারামের কাছাকাছি হোটেল বুকিং, সৌদিয়া/বিমান এয়ার টিকেট এবং বৈধ Work Permit পরামর্শ নিতে পারবেন।',
    overviewEn:
      'Home to the Two Holy Mosques in Makkah and Madinah as well as the largest overseas workforce hub for Bangladeshis, Saudi Arabia is central to our services — offering Hajj & Umrah packages, Haram-area hotels, direct flights, and Work Permit guidance.',
    highlightsBn: [
      'মসজিদুল হারাম (মক্কা) ও মসজিদে নববী (মদিনা) জিয়ারত',
      'মক্কা ও মদিনার ঐতিহাসিক স্থানসমূহে গাইডেড জিয়ারাহ',
      'জেদ্দা-মক্কা-মদিনা আরামদায়ক এসি ট্রান্সপোর্ট ও হাই-স্পিড ট্রেন অপশন',
      'বৈধ সৌদি ওয়ার্ক ভিসা ডকুমেন্টেশন ও মেডিকেল গাইডলাইন',
    ],
    highlightsEn: [
      'Spiritual stay near Masjid al-Haram & Masjid an-Nabawi',
      'Guided historical Ziyarah across Makkah & Madinah',
      'Comfortable AC transfers & Haramain High-Speed Rail options',
      'Verified Saudi Work Permit & GAMCA medical guidance',
    ],
    documentsSummaryBn: [
      'ন্যূনতম ৬ মাস মেয়াদসহ বৈধ পাসপোর্ট',
      'জাতীয় পরিচয়পত্র (NID) ও ছবি',
      'প্রযোজ্য টিকা ও স্বাস্থ্য সনদ',
      'Work Permit-এর ক্ষেত্রে পুলিশ ক্লিয়ারেন্স ও GAMCA মেডিকেল',
    ],
    documentsSummaryEn: [
      'Valid passport (6+ months validity)',
      'National ID (NID) and recent photographs',
      'Required vaccination & health certificates',
      'Police Clearance & GAMCA medical for Work Permits',
    ],
    seo: {
      titleBn: 'সৌদি আরব হজ্জ, ওমরাহ ও ওয়ার্ক ভিসা | Visatrip Global',
      descriptionBn: 'বাংলাদেশ ও রাজশাহী বিভাগ থেকে সৌদি আরবের হজ্জ, ওমরাহ প্যাকেজ, হারামের কাছে হোটেল ও Work Permit পরামর্শ — Visatrip Global।',
      titleEn: 'Saudi Arabia Umrah, Hajj & Work Visa | Visatrip Global',
      descriptionEn: 'Trusted Saudi Arabia Umrah packages, Hajj guidance, Makkah-Madinah hotels, and Work Permit support from Bangladesh.',
      primaryKeyword: 'umrah package Rajshahi division',
    },
    faqs: [
      {
        questionBn: 'ওমরাহ ভিসায় গিয়ে কি মক্কা-মদিনার বাইরে জেদ্দা বা তায়েফ ঘোরা যায়?',
        answerBn: 'সৌদি ওমরাহ ভিসার আওতায় নির্ধারিত সময়ের মধ্যে মক্কা, মদিনা, জেদ্দা ও তায়েফের ঐতিহাসিক স্থান ভ্রমণ করা যায়।',
        questionEn: 'Can Umrah pilgrims visit Jeddah or Taif alongside Makkah and Madinah?',
        answerEn: 'Yes, within the validity of the Saudi Umrah visa, travelers can visit Makkah, Madinah, Jeddah, and Taif.',
      },
      {
        questionBn: 'সৌদি আরবে সরাসরি ফ্লাইট কোন কোন এয়ারলাইনসের আছে?',
        answerBn: 'ঢাকা থেকে জেদ্দা, মদিনা ও রিয়াদে Saudia এবং Biman Bangladesh Airlines-এর সরাসরি ফ্লাইট পরিচালিত হয়।',
        questionEn: 'Which airlines operate direct flights from Dhaka to Saudi Arabia?',
        answerEn: 'Saudia and Biman Bangladesh Airlines operate direct flights from Dhaka to Jeddah, Madinah, and Riyadh.',
      },
    ],
  },
  {
    slug: 'malaysia',
    imageKey: 'malaysia',
    featuredOnHome: true,
    nameBn: 'মালয়েশিয়া',
    nameEn: 'Malaysia',
    regionBn: 'দক্ষিণ-পূর্ব এশিয়া',
    regionEn: 'Southeast Asia',
    taglineBn: 'ফ্যামিলি ট্যুর, উচ্চশিক্ষা ও সাশ্রয়ী আন্তর্জাতিক ভ্রমণের অন্যতম জনপ্রিয় গন্তব্য',
    taglineEn: 'Family-friendly tourism, quality universities, and halal-friendly travel',
    startingPriceBDT: null,
    availableServices: ['tourist-visa', 'student-consultancy', 'tour-package', 'work-permit', 'air-ticketing', 'hotel-booking'],
    bestTimeBn: 'ডিসেম্বর থেকে এপ্রিল এবং জুন থেকে আগস্ট',
    bestTimeEn: 'December to April & June to August',
    processingTimeBn: 'e-Visa সাধারণত ৪–৭ কর্মদিবস',
    processingTimeEn: 'e-Visa typically 4–7 working days',
    overviewBn:
      'বাংলাদেশি পর্যটক ও শিক্ষার্থীদের জন্য মালয়েশিয়া অত্যন্ত নিরাপদ ও হালাল-বান্ধব একটি দেশ। কুয়ালালামপুরের পেট্রোনাস টুইন টাওয়ার, গেন্টিং হাইল্যান্ডস এবং ল্যাংকাউই দ্বীপ যেমন ভ্রমণকারীদের মন কাড়ে, তেমনি আন্তর্জাতিক স্বীকৃত বিশ্ববিদ্যালয়গুলো শিক্ষার্থীদের কাছে অত্যন্ত জনপ্রিয়।',
    overviewEn:
      'Malaysia is one of the safest, most halal-friendly destinations for Bangladeshi families and university students — combining Kuala Lumpur’s iconic skyline, Genting Highlands, Langkawi beaches, and globally ranked universities.',
    highlightsBn: [
      'পেট্রোনাস টুইন টাওয়ার ও কেএলসিসি পার্ক',
      'গেন্টিং হাইল্যান্ডস কেবল কার ও বাতু কেভস',
      'ল্যাংকাউই দ্বীপ ও পেনাং হেরিটেজ',
      'আন্তর্জাতিক স্বীকৃত বিশ্ববিদ্যালয়ে উচ্চশিক্ষার সুযোগ',
    ],
    highlightsEn: [
      'Petronas Twin Towers & KLCC Park',
      'Genting Highlands Cable Car & Batu Caves',
      'Langkawi Island & Penang Heritage',
      'Globally recognized affordable universities',
    ],
    documentsSummaryBn: [
      'বৈধ পাসপোর্ট (৬+ মাস মেয়াদ) ও সাদা ব্যাকগ্রাউন্ড ছবি',
      '৬ মাসের ব্যাংক স্টেটমেন্ট ও সলভেন্সি',
      'পেশার প্রমাণপত্র (NOC / Trade License / স্টুডেন্ট আইডি)',
      'রিটার্ন ফ্লাইট ও হোটেল বুকিং',
    ],
    documentsSummaryEn: [
      'Valid passport (6+ months) & white-background photo',
      '6-month Bank Statement & Solvency',
      'Occupation proof (NOC / Trade License / Student ID)',
      'Return flight & hotel booking',
    ],
    seo: {
      titleBn: 'মালয়েশিয়া ভিসা, স্টাডি ও ট্যুর | Visatrip Global',
      descriptionBn: 'বাংলাদেশ থেকে মালয়েশিয়া e-Visa, Student Visa এবং কুয়ালালামপুর-ল্যাংকাউই Tour Package গাইড ও বুকিং — Visatrip Global।',
      titleEn: 'Malaysia Visa, Study & Tour Packages | Visatrip Global',
      descriptionEn: 'Malaysia e-Visa processing, university admissions, flights, and Kuala Lumpur–Langkawi tour packages from Bangladesh.',
      primaryKeyword: 'Malaysia tourist visa Bangladesh',
    },
    faqs: [
      {
        questionBn: 'মালয়েশিয়ার e-Visa পেতে কত দিন লাগে?',
        answerBn: 'সঠিক কাগজপত্রসহ জমা দিলে সাধারণত ৪ থেকে ৭ কর্মদিবসের মধ্যে মালয়েশিয়া e-Visa প্রসেস হয়ে থাকে (ইমিগ্রেশন সাপেক্ষে)।',
        questionEn: 'How long does Malaysia e-Visa processing take?',
        answerEn: 'Usually 4 to 7 working days when submitted with complete documents, subject to Malaysian Immigration.',
      },
      {
        questionBn: 'মালয়েশিয়া ও সিঙ্গাপুর কি এক ট্রিপে ঘোরা যায়?',
        answerBn: 'হ্যাঁ, আমাদের মালয়েশিয়া-সিঙ্গাপুর কম্বো প্যাকেজে ৬ রাত ৭ দিনে দুটি দেশ স্বাচ্ছন্দ্যে ভ্রমণ করা যায়।',
        questionEn: 'Can I combine Malaysia and Singapore in one trip?',
        answerEn: 'Yes, our 6 Nights / 7 Days Malaysia–Singapore combo itinerary covers both destinations seamlessly.',
      },
    ],
  },
  {
    slug: 'thailand',
    imageKey: 'thailand',
    featuredOnHome: true,
    nameBn: 'থাইল্যান্ড',
    nameEn: 'Thailand',
    regionBn: 'দক্ষিণ-পূর্ব এশিয়া',
    regionEn: 'Southeast Asia',
    taglineBn: 'ব্যাংকক, পাতায়া, ফুকেট ও ক্রাবির মনোরম সমুদ্র ও ফ্যামিলি ভ্রমণ',
    taglineEn: 'Bangkok city life, Pattaya coral islands, Phuket & Krabi beaches',
    startingPriceBDT: null,
    availableServices: ['tourist-visa', 'tour-package', 'air-ticketing', 'hotel-booking'],
    bestTimeBn: 'নভেম্বর থেকে মার্চ',
    bestTimeEn: 'November to March',
    processingTimeBn: 'ভিসা প্রসেসিং সাধারণত ৭–১৫ কর্মদিবস',
    processingTimeEn: 'Visa processing typically 7–15 working days',
    overviewBn:
      'হানিমুন, ফ্যামিলি ভ্রমণ এবং মেডিকেল চেকআপের জন্য বাংলাদেশিদের অত্যন্ত জনপ্রিয় গন্তব্য থাইল্যান্ড। ব্যাংককের শপিং ও রিভার ক্রুজ, পাতায়ার কোরাল আইল্যান্ড এবং ফুকেট-ক্রাবির নীল জলরাশি যেকোনো ভ্রমণপ্রেমীকে মুগ্ধ করে।',
    overviewEn:
      'Thailand is a favorite among Bangladeshi families, honeymooners, and medical travelers — offering Bangkok’s vibrant culture, Pattaya’s Coral Island, and the emerald limestone bays of Phuket and Krabi.',
    highlightsBn: [
      'ব্যাংকক সাফারি ওয়ার্ল্ড ও চাও ফ্রায়া ডিনার ক্রুজ',
      'পাতায়া কোরাল আইল্যান্ড স্পিডবোট ট্যুর',
      'ফুকেট ফি-ফি আইল্যান্ড ও ক্রাবি ফোর-আইল্যান্ড ট্যুর',
      'চিকিৎসার জন্য বামরুনগ্রাদ/ব্যাংকক হাসপাতাল ট্রাভেল সাপোর্ট',
    ],
    highlightsEn: [
      'Bangkok Safari World & Chao Phraya Dinner Cruise',
      'Pattaya Coral Island Speedboat Tour',
      'Phuket Phi Phi Island & Krabi 4-Island Tour',
      'Travel support for Bangkok medical visits',
    ],
    documentsSummaryBn: [
      'বৈধ পাসপোর্ট ও ২ কপি সাদা ব্যাকগ্রাউন্ড ছবি',
      '৬ মাসের ব্যাংক স্টেটমেন্ট (ব্যক্তিগত ন্যূনতম ৳60,000+ ব্যালেন্স) ও সলভেন্সি',
      'চাকরির NOC বা ইংরেজি অনুবাদকৃত Trade License',
      'এয়ার টিকেট বুকিং ও হোটেল কনফার্মেশন',
    ],
    documentsSummaryEn: [
      'Valid passport & 2 white-background photographs',
      '6-month Bank Statement & Solvency Certificate',
      'Job NOC or notarized English Trade License',
      'Flight booking & hotel confirmation',
    ],
    seo: {
      titleBn: 'থাইল্যান্ড ট্যুরিস্ট ভিসা ও ট্যুর | Visatrip Global',
      descriptionBn: 'বাংলাদেশ থেকে ব্যাংকক-পাতায়া-ফুকেট Thailand Tourist Visa প্রসেসিং, ফ্লাইট ও ট্যুর প্যাকেজ — Visatrip Global।',
      titleEn: 'Thailand Visa & Tour Packages | Visatrip Global',
      descriptionEn: 'Thailand Tourist Visa support and Bangkok, Pattaya, Phuket & Krabi tour packages from Bangladesh.',
      primaryKeyword: 'Thailand tour package Bangladesh',
    },
    faqs: [
      {
        questionBn: 'থাইল্যান্ড ট্যুরিস্ট ভিসার জন্য কি Embassy-তে সরাসরি যেতে হয়?',
        answerBn: 'বর্তমানে থাইল্যান্ডের ই-ভিসা/অনুমোদিত ভিসা সেন্টার প্রক্রিয়ায় আবেদন করা হয়। সর্বশেষ নির্দেশনা অনুযায়ী আমরা পুরো ফাইল সাজিয়ে দিই।',
        questionEn: 'Do I need to visit the Thai Embassy in person?',
        answerEn: 'Thailand uses e-Visa / authorized submission channels. We prepare and guide your complete file per current rules.',
      },
    ],
  },
  {
    slug: 'singapore',
    imageKey: 'singapore',
    featuredOnHome: true,
    nameBn: 'সিঙ্গাপুর',
    nameEn: 'Singapore',
    regionBn: 'দক্ষিণ-পূর্ব এশিয়া',
    regionEn: 'Southeast Asia',
    taglineBn: 'পরিচ্ছন্ন আধুনিক শহর, সেন্তোসা দ্বীপ ও আধুনিক চিকিৎসা ও ভ্রমণ',
    taglineEn: 'Modern skyline, Sentosa Island, family attractions & medical care',
    startingPriceBDT: null,
    availableServices: ['tourist-visa', 'tour-package', 'air-ticketing', 'hotel-booking'],
    bestTimeBn: 'ফেব্রুয়ারি থেকে এপ্রিল এবং জুলাই থেকে সেপ্টেম্বর',
    bestTimeEn: 'February to April & July to September',
    processingTimeBn: 'সাধারণত ৫–১০ কর্মদিবস (LOI ও অনুমোদিত এজেন্ট প্রক্রিয়া সাপেক্ষে)',
    processingTimeEn: 'Typically 5–10 working days (subject to LOI & ICA processing)',
    overviewBn:
      'মেরিনা বে স্যান্ডস, গার্ডেনস বাই দ্য বে, ইউনিভার্সাল স্টুডিওস এবং সেন্তোসা দ্বীপের জন্য সিঙ্গাপুর পরিবারসহ ভ্রমণের এক অসাধারণ গন্তব্য। বাংলাদেশিদের জন্য সিঙ্গাপুর ভিসার ক্ষেত্রে Letter of Introduction (LOI) ও সঠিক ব্যাংক ডকুমেন্ট অত্যন্ত জরুরি।',
    overviewEn:
      'With Marina Bay Sands, Gardens by the Bay, Universal Studios, and Sentosa Island, Singapore is an unmatched family destination. Visatrip Global assists Bangladeshi travelers with LOI guidance, visa file compilation, hotels, and flights.',
    highlightsBn: [
      'মেরিনা বে স্যান্ডস ও মার্লায়ন পার্ক',
      'গার্ডেনস বাই দ্য বে ও ক্লাউড ফরেস্ট',
      'সেন্তোসা আইল্যান্ড ও ইউনিভার্সাল স্টুডিওস',
      'জুয়েল চাঙ্গি এয়ারপোর্ট ও নাইট সাফারি',
    ],
    highlightsEn: [
      'Marina Bay Sands & Merlion Park',
      'Gardens by the Bay & Cloud Forest',
      'Sentosa Island & Universal Studios',
      'Jewel Changi & Singapore Night Safari',
    ],
    documentsSummaryBn: [
      'বৈধ পাসপোর্ট ও ম্যাট-ফিনিশ সাদা ব্যাকগ্রাউন্ড ছবি',
      'ফর্ম 14A এবং V39A (LOI)',
      '৬ মাসের ব্যাংক স্টেটমেন্ট ও পেশার প্রমাণপত্র',
      'হোটেল বুকিং ও রিটার্ন টিকেট Itinerary',
    ],
    documentsSummaryEn: [
      'Valid passport & matte white-background photo',
      'Form 14A and V39A (Letter of Introduction)',
      '6-month Bank Statement & occupation proof',
      'Hotel booking & return flight itinerary',
    ],
    seo: {
      titleBn: 'সিঙ্গাপুর ভিসা ও ট্যুর প্যাকেজ | Visatrip Global',
      descriptionBn: 'বাংলাদেশ থেকে সিঙ্গাপুর Tourist Visa গাইডলাইন, হোটেল বুকিং ও মালয়েশিয়া-সিঙ্গাপুর ট্যুর প্যাকেজ — Visatrip Global।',
      titleEn: 'Singapore Visa & Tour Package | Visatrip Global',
      descriptionEn: 'Singapore Tourist Visa file preparation, LOI guidance, hotels, and family tour packages from Bangladesh.',
      primaryKeyword: 'Singapore visa from Bangladesh',
    },
    faqs: [
      {
        questionBn: 'সিঙ্গাপুর ভিসায় LOI (Letter of Introduction) কী?',
        answerBn: 'সিঙ্গাপুরের নাগরিক বা পার্মানেন্ট রেসিডেন্ট (PR) অথবা অনুমোদিত পার্টনারের পক্ষ থেকে প্রদত্ত পরিচিতি পত্র (Form V39A) ভিসা আবেদনে প্রয়োজন হয়।',
        questionEn: 'What is a Singapore Letter of Introduction (LOI)?',
        answerEn: 'Form V39A is an introduction letter signed by a Singapore Citizen/PR or authorized partner required for visa submission.',
      },
    ],
  },
  {
    slug: 'turkey',
    imageKey: 'turkey',
    featuredOnHome: true,
    nameBn: 'তুরস্ক',
    nameEn: 'Turkey',
    regionBn: 'ইউরোপ ও এশিয়া',
    regionEn: 'Eurasia',
    taglineBn: 'ইস্তাম্বুলের ঐতিহ্য, ক্যাপাডোসিয়া ও বসফরাসের অনন্য সৌন্দর্য',
    taglineEn: 'Istanbul Ottoman heritage, Cappadocia valleys, and Bosphorus cruises',
    startingPriceBDT: null,
    availableServices: ['tourist-visa', 'student-consultancy', 'tour-package', 'air-ticketing', 'hotel-booking'],
    bestTimeBn: 'এপ্রিল থেকে জুন এবং সেপ্টেম্বর থেকে নভেম্বর',
    bestTimeEn: 'April to June & September to November',
    processingTimeBn: 'স্টিকার ভিসা: ১৫–২৫ কর্মদিবস | শর্তসাপেক্ষ e-Visa: ১–৩ দিন',
    processingTimeEn: 'Sticker Visa: 15–25 working days | Conditional e-Visa: 1–3 days',
    overviewBn:
      'ইসলামী ঐতিহ্য ও ইউরোপীয় স্থাপত্যের অপূর্ব মেলবন্ধন তুরস্ক। ইস্তাম্বুলের ব্লু মস্ক, আয়া সোফিয়া, বসফরাস ক্রুজ এবং ক্যাপাডোসিয়ার হট এয়ার বেলুন বাংলাদেশি ভ্রমণকারীদের কাছে স্বপ্নের মতো। ভ্যালিড US/UK/Schengen ভিসা থাকলে বাংলাদেশিরা তুরস্কের e-Visa-ও নিতে পারেন।',
    overviewEn:
      'Bridging Islamic heritage and European architecture, Turkey enchants travelers with Istanbul’s Blue Mosque, Hagia Sophia, Bosphorus cruises, and Cappadocia. Bangladeshi citizens holding valid US, UK, or Schengen visas may also qualify for Turkish e-Visa.',
    highlightsBn: [
      'ইস্তাম্বুল: ব্লু মস্ক, আয়া সোফিয়া ও তোপকাপি প্যালেস',
      'বসফরাস প্রণালীতে সূর্যাস্ত ক্রুজ',
      'ক্যাপাডোসিয়া ভ্যালি ও হট এয়ার বেলুন অভিজ্ঞতা',
      'বুরসা ও আন্টালিয়া প্রকৃতি ভ্রমণ',
    ],
    highlightsEn: [
      'Istanbul: Blue Mosque, Hagia Sophia & Topkapi Palace',
      'Bosphorus Strait Sunset Cruise',
      'Cappadocia Valleys & Hot Air Balloon views',
      'Bursa & Antalya scenic excursions',
    ],
    documentsSummaryBn: [
      'বৈধ পাসপোর্ট ও বায়োমেট্রিক ছবি',
      '৬ মাসের ব্যাংক স্টেটমেন্ট ও সলভেন্সি সার্টিফিকেট',
      'ট্রাভেল হেলথ ইনস্যুরেন্স ও হোটেল-ফ্লাইট বুকিং',
      'পেশার প্রমাণপত্র ও TIN/আয়কর রিটার্ন',
    ],
    documentsSummaryEn: [
      'Valid passport & biometric photographs',
      '6-month Bank Statement & Solvency Certificate',
      'Travel Health Insurance & hotel/flight reservations',
      'Occupation proof & TIN/Tax documents',
    ],
    seo: {
      titleBn: 'তুরস্ক ভিসা ও ইস্তাম্বুল ট্যুর | Visatrip Global',
      descriptionBn: 'বাংলাদেশ থেকে তুরস্ক ট্যুরিস্ট ভিসা, ইস্তাম্বুল ও ক্যাপাডোসিয়া ট্যুর প্যাকেজ এবং ফ্লাইট সাপোর্ট — Visatrip Global।',
      titleEn: 'Turkey Visa & Tour Package Bangladesh | Visatrip Global',
      descriptionEn: 'Turkey sticker & e-Visa preparation and curated Istanbul–Cappadocia tour packages from Bangladesh.',
      primaryKeyword: 'Turkey tour package Bangladesh',
    },
    faqs: [
      {
        questionBn: 'কারা তুরস্কের e-Visa পাওয়ার যোগ্য?',
        answerBn: 'যাদের বৈধ US, UK, Ireland অথবা Schengen ভিসা/রেসিডেন্স পারমিট রয়েছে তারা শর্তসাপেক্ষে তুরস্কের e-Visa আবেদন করতে পারেন। অন্যদের স্টিকার ভিসা নিতে হয়।',
        questionEn: 'Who qualifies for a Turkish e-Visa from Bangladesh?',
        answerEn: 'Bangladeshi passport holders with a valid US, UK, Ireland, or Schengen visa/residence permit may apply for conditional e-Visa; others apply for a sticker visa.',
      },
    ],
  },
  {
    slug: 'europe',
    imageKey: 'europe',
    featuredOnHome: true,
    nameBn: 'ইউরোপ (Schengen)',
    nameEn: 'Europe (Schengen & EU)',
    regionBn: 'ইউরোপ',
    regionEn: 'Europe',
    taglineBn: 'উচ্চশিক্ষা, শেনজেন ট্যুরিস্ট ভিসা ও বৈধ ইউরোপীয় Work Permit পরামর্শ',
    taglineEn: 'Schengen Tourist Visas, European Universities & verified Work Permit pathways',
    startingPriceBDT: null,
    availableServices: ['tourist-visa', 'student-consultancy', 'work-permit', 'air-ticketing', 'hotel-booking'],
    bestTimeBn: 'মে থেকে সেপ্টেম্বর (ট্যুরিজম) · সেপ্টেম্বর ও ফেব্রুয়ারি (স্টুডেন্ট ইনটেক)',
    bestTimeEn: 'May–September (Tourism) · Sep & Feb (University Intakes)',
    processingTimeBn: 'শেনজেন ট্যুরিস্ট: ১৫–৪৫ দিন | স্টুডেন্ট/Work Permit: ২–৬ মাস',
    processingTimeEn: 'Schengen Tourist: 15–45 days | Student/Work Permit: 2–6 months',
    overviewBn:
      'ইউরোপের ফ্রান্স, ইতালি, জার্মানি, সুইজারল্যান্ড, রোমানিয়া বা পোল্যান্ডে ভ্রমণ, উচ্চশিক্ষা কিংবা বৈধ কর্মসংস্থানের জন্য নিখুঁত ফাইল প্রসেসিং ও সৎ পরামর্শ অপরিহার্য। Visatrip Global ইউরোপের ভিসার ক্ষেত্রে কোনো মিথ্যা আশ্বাস না দিয়ে সঠিক ডকুমেন্টেশন, ট্রাভেল ইনস্যুরেন্স ও VFS/Embassy Appointment গাইডলাইন দেয়।',
    overviewEn:
      'Whether planning a Schengen holiday to France, Italy, or Switzerland, pursuing higher education in Germany/Hungary, or evaluating verified Work Permits in Romania/Poland, Visatrip Global delivers thorough documentation and honest advice without false promises.',
    highlightsBn: [
      'শেনজেন ভিসার জন্য নিখুঁত Cover Letter, Itinerary ও Travel Insurance',
      'জার্মানি, হাঙ্গেরি, ফিনল্যান্ড ও পোল্যান্ডে উচ্চশিক্ষার পরামর্শ',
      'ইউরোপীয় Work Permit যাচাই ও প্রতারণা থেকে সুরক্ষা গাইডলাইন',
      'VFS Global ও Embassy ফাইল অর্গানাইজেশন',
    ],
    highlightsEn: [
      'Precision Schengen Cover Letters, Itineraries & Travel Insurance',
      'University admission support for Germany, Hungary, Finland & Poland',
      'Work Permit verification and anti-scam guidance',
      'Complete VFS Global & Embassy file organization',
    ],
    documentsSummaryBn: [
      'বৈধ পাসপোর্ট ও পূর্ববর্তী ট্রাভেল হিস্ট্রি কপি',
      '৬ মাসের ব্যক্তিগত ও বিজনেস ব্যাংক স্টেটমেন্ট এবং সলভেন্সি',
      'ন্যূনতম €30,000 কাভারেজসহ Schengen Travel Insurance',
      'সম্পদের প্রমাণপত্র, TIN, আয়কর রিটার্ন ও পেশার ডকুমেন্ট',
    ],
    documentsSummaryEn: [
      'Valid passport & prior travel history copies',
      '6-month personal/business Bank Statement & Solvency',
      'Schengen Travel Medical Insurance (€30,000 minimum coverage)',
      'Asset ties, TIN, Tax Return, and employment/business proof',
    ],
    seo: {
      titleBn: 'ইউরোপ শেনজেন ভিসা ও Work Permit | Visatrip Global',
      descriptionBn: 'বাংলাদেশ থেকে ইউরোপ শেনজেন ট্যুরিস্ট ভিসা, স্টুডেন্ট কনসালটেন্সি এবং রোমানিয়া-পোল্যান্ড Work Permit সঠিক গাইডলাইন — Visatrip Global।',
      titleEn: 'Europe Schengen Visa & Work Permit | Visatrip Global',
      descriptionEn: 'Honest consultation for Europe Schengen Tourist Visas, European university admissions, and verified Work Permits from Bangladesh.',
      primaryKeyword: 'Europe visa consultancy Bangladesh',
    },
    faqs: [
      {
        questionBn: 'ইউরোপের Work Permit নিয়ে প্রতারণা এড়াতে কী করব?',
        answerBn: 'কখনোই আনভেরিফায়েড এজেন্টকে পাসপোর্ট বা টাকা দেবেন না। সরকারি পোর্টালে পারমিট যাচাই, অফিসিয়াল রিসিট এবং BMET প্রক্রিয়া সম্পর্কে নিশ্চিত হয়ে তবেই সিদ্ধান্ত নিন।',
        questionEn: 'How can I stay safe from Europe Work Permit scams?',
        answerEn: 'Never hand money to unverified agents without official receipts. Always verify permits on official government portals and follow BMET guidelines.',
      },
    ],
  },
  {
    slug: 'india',
    imageKey: 'india',
    featuredOnHome: true,
    nameBn: 'ভারত (India)',
    nameEn: 'India',
    regionBn: 'দক্ষিণ এশিয়া',
    regionEn: 'South Asia',
    taglineBn: 'উন্নত চিকিৎসা (কলকাতা, ভেলোর, চেন্নাই, দিল্লি) ও ঐতিহাসিক ভ্রমণ',
    taglineEn: 'Trusted medical care (Kolkata, Vellore, Chennai, Delhi) & heritage travel',
    startingPriceBDT: null,
    availableServices: ['india-visa', 'air-ticketing', 'hotel-booking', 'tour-package'],
    bestTimeBn: 'চিকিৎসা: বছরজুড়ে · ভ্রমণ: অক্টোবর থেকে মার্চ',
    bestTimeEn: 'Medical: Year-round · Tourism: October to March',
    processingTimeBn: 'IVAC স্লট ও হাইকমিশনের বর্তমান প্রক্রিয়া সাপেক্ষে',
    processingTimeEn: 'Subject to current IVAC slot and High Commission timelines',
    overviewBn:
      'চাঁপাইনবাবগঞ্জ ও রাজশাহীর নিকটতম প্রতিবেশী দেশ ভারত — উন্নত চিকিৎসা ও পারিবারিক ভ্রমণের জন্য সবচেয়ে বেশি ব্যবহৃত গন্তব্য। আমরা রোগী ও অ্যাটেনডেন্টদের মেডিকেল ভিসা, হাসপাতাল ইনভিটেশন লেটার, ট্যুরিস্ট ভিসা, এয়ার টিকেট এবং হাসপাতালের কাছে নিরাপদ হোটেল বুকিংয়ে সার্বিক সহযোগিতা করি।',
    overviewEn:
      'As Bangladesh’s closest neighbor, India is the primary destination for specialized medical care and cultural holidays for Chapai Nawabganj and Rajshahi residents. We assist with Medical & Attendant Visas, hospital invitation letters, Tourist Visas, flights, and hospital-area hotels.',
    highlightsBn: [
      'কলকাতা, ভেলোর (CMC), চেন্নাই (Apollo) ও দিল্লি হাসপাতালের ইনভিটেশন সহায়তা',
      'রোগী ও সর্বোচ্চ ৩ জন অ্যাটেনডেন্টের ফাইল প্রসেসিং',
      'দার্জিলিং, সিকিম, কাশ্মীর, আগ্রা-দিল্লি ও আজমের শরীফ ভ্রমণ গাইড',
      'রাজশাহী IVAC কেন্দ্রিক নির্ভুল ডকুমেন্ট সাজানো',
    ],
    highlightsEn: [
      'Hospital invitation assistance for Kolkata, Vellore (CMC), Chennai & Delhi',
      'Complete patient & attendant file preparation',
      'Darjeeling, Sikkim, Kashmir, Agra-Delhi & Ajmer Sharif travel support',
      'Rajshahi IVAC focused accurate document preparation',
    ],
    documentsSummaryBn: [
      'বৈধ পাসপোর্ট (পুরানো পাসপোর্টসহ) ও ২×২ ছবি',
      'এনআইডি, ইউটিলিটি বিল ও ব্যাংক স্টেটমেন্ট/ডলার এনডোর্সমেন্ট',
      'মেডিকেল ভিসা: ডাক্তারি প্রেসক্রিপশন, রিপোর্ট ও ভারতের হাসপাতালের ইনভিটেশন লেটার',
      'পেশার প্রমাণপত্র (NOC / Trade License / Student ID)',
    ],
    documentsSummaryEn: [
      'Valid passport (with old passports) & 2×2 photo',
      'NID, recent utility bill, and Bank Statement/Dollar Endorsement',
      'Medical Visa: Doctor prescription, reports & Indian hospital invitation',
      'Occupation proof (NOC / Trade License / Student ID)',
    ],
    seo: {
      titleBn: 'ভারতীয় মেডিকেল ও ট্যুরিস্ট ভিসা গাইড | Visatrip Global',
      descriptionBn: 'বাংলাদেশ ও চাঁপাইনবাবগঞ্জ থেকে ভারতীয় মেডিকেল ও ট্যুরিস্ট ভিসা, হাসপাতালের ইনভিটেশন লেটার ও হোটেল বুকিং — Visatrip Global।',
      titleEn: 'India Medical & Tourist Visa Guide | Visatrip Global',
      descriptionEn: 'Reliable India Medical Visa (patient & attendant), hospital invitation coordination, and Tourist Visa processing from Bangladesh.',
      primaryKeyword: 'ভারতীয় মেডিকেল ভিসা',
    },
    faqs: [
      {
        questionBn: 'চিকিৎসার জন্য ভারতের কোন শহরগুলোতে বেশি রোগী যান?',
        answerBn: 'কলকাতা, ভেলোর (CMC), চেন্নাই (Apollo, MIOT), ব্যাঙ্গালোর (Narayana) এবং দিল্লি (Max, Medanta, Fortis) বাংলাদেশি রোগীদের প্রধান পছন্দ।',
        questionEn: 'Which Indian cities are most visited for medical treatment?',
        answerEn: 'Kolkata, Vellore (CMC), Chennai (Apollo, MIOT), Bangalore (Narayana), and Delhi (Max, Medanta, Fortis).',
      },
    ],
  },
  {
    slug: 'maldives',
    imageKey: 'thailand',
    featuredOnHome: false,
    nameBn: 'মালদ্বীপ',
    nameEn: 'Maldives',
    regionBn: 'দক্ষিণ এশিয়া',
    regionEn: 'South Asia',
    taglineBn: 'নীল সমুদ্র, হানিমুন রিসোর্ট ও সহজ ভ্রমণ প্রক্রিয়া',
    taglineEn: 'Turquoise lagoons, honeymoon resorts & straightforward entry',
    startingPriceBDT: null,
    availableServices: ['tour-package', 'air-ticketing', 'hotel-booking'],
    bestTimeBn: 'নভেম্বর থেকে এপ্রিল',
    bestTimeEn: 'November to April',
    processingTimeBn: 'ট্যুরিস্ট অন-অ্যারাইভাল ভিসা (IMUGA ফর্ম ও কনফার্ম হোটেলসহ)',
    processingTimeEn: 'Tourist Visa on Arrival (requires IMUGA declaration & confirmed hotel)',
    overviewBn:
      'বাংলাদেশি হানিমুন কাপল এবং পরিবারদের জন্য মালদ্বীপ এক স্বপ্নময় গন্তব্য। কনফার্ম হোটেল/রিসোর্ট বুকিং, রিটার্ন টিকেট এবং অনলাইন IMUGA ডিক্লারেশনসহ আমরা পূর্ণাঙ্গ মালদ্বীপ ভ্রমণ প্যাকেজ সাজিয়ে দিই।',
    overviewEn:
      'An idyllic escape for Bangladeshi honeymooners and families. Visatrip Global arranges direct flights, Maafushi or private resort stays, speedboat transfers, and mandatory IMUGA travel declarations.',
    highlightsBn: [
      'মাফুশি আইল্যান্ড ও প্রাইভেট ওয়াটার ভিলা রিসোর্ট',
      'স্নোরকেলিং, স্যান্ডব্যাংক ট্যুর ও ডলফিন ক্রুজ',
      'ঢাকা থেকে মালে সরাসরি ও ট্রানজিট ফ্লাইট অপশন',
    ],
    highlightsEn: [
      'Maafushi Island & private water-villa resorts',
      'Snorkeling, sandbank picnics & dolphin cruises',
      'Direct & transit flight options from Dhaka to Malé',
    ],
    documentsSummaryBn: [
      'বৈধ পাসপোর্ট (৬+ মাস মেয়াদ)',
      'কনফার্ম রিটার্ন এয়ার টিকেট ও হোটেল ভাউচার',
      'IMUGA অনলাইন ট্রাভেলার ডিক্লারেশন',
    ],
    documentsSummaryEn: [
      'Valid passport (6+ months)',
      'Confirmed return flight & hotel voucher',
      'Completed IMUGA traveler declaration',
    ],
    seo: {
      titleBn: 'মালদ্বীপ ট্যুর প্যাকেজ বাংলাদেশ | Visatrip Global',
      descriptionBn: 'বাংলাদেশ থেকে মালদ্বীপ হানিমুন ও ফ্যামিলি ট্যুর প্যাকেজ, রিসোর্ট বুকিং ও এয়ার টিকেট — Visatrip Global।',
      titleEn: 'Maldives Tour Packages Bangladesh | Visatrip Global',
      descriptionEn: 'Curated Maldives honeymoon and family packages with flights, verified island hotels, and IMUGA support.',
      primaryKeyword: 'Maldives tour package Bangladesh',
    },
    faqs: [
      {
        questionBn: 'মালদ্বীপে কি বাংলাদেশিদের আগে থেকে ট্যুরিস্ট ভিসা নিতে হয়?',
        answerBn: 'না, বৈধ পাসপোর্ট, কনফার্ম হোটেল, রিটার্ন টিকেট এবং IMUGA ফর্ম পূরণ থাকলে মালদ্বীপে ৩০ দিনের ফ্রি অন-অ্যারাইভাল ট্যুরিস্ট ভিসা পাওয়া যায়।',
        questionEn: 'Do Bangladeshis need a prior Tourist Visa for Maldives?',
        answerEn: 'No, Bangladeshi tourists receive a free 30-day Visa on Arrival with a confirmed hotel, return ticket, and IMUGA declaration.',
      },
    ],
  },
  {
    slug: 'nepal',
    imageKey: 'europe',
    featuredOnHome: false,
    nameBn: 'নেপাল',
    nameEn: 'Nepal',
    regionBn: 'দক্ষিণ এশিয়া',
    regionEn: 'South Asia',
    taglineBn: 'হিমালয় কন্যা কাঠমান্ডু, পোখারা ও নাগরকোটের সাশ্রয়ী ভ্রমণ',
    taglineEn: 'Himalayan views across Kathmandu, Pokhara & Nagarkot on a friendly budget',
    startingPriceBDT: null,
    availableServices: ['tour-package', 'air-ticketing', 'hotel-booking'],
    bestTimeBn: 'অক্টোবর থেকে মে',
    bestTimeEn: 'October to May',
    processingTimeBn: 'বাংলাদেশিদের জন্য অন-অ্যারাইভাল ট্যুরিস্ট ভিসা সুবিধা',
    processingTimeEn: 'On-arrival Tourist Visa facility for Bangladeshi citizens',
    overviewBn:
      'প্রথমবারের মতো বিদেশ ভ্রমণের জন্য নেপাল বাংলাদেশিদের সবচেয়ে সাশ্রয়ী ও সুন্দর গন্তব্য। কাঠমান্ডু, পোখারার ফেওয়া লেক এবং নাগরকোটের সূর্যোদয় উপভোগ করতে আমাদের সাশ্রয়ী নেপাল ট্যুর প্যাকেজ বেছে নিতে পারেন।',
    overviewEn:
      'Nepal is one of the most accessible and scenic first-time international destinations for Bangladeshis — featuring Kathmandu heritage sites, Pokhara’s Phewa Lake, and Himalayan sunrises at Nagarkot.',
    highlightsBn: [
      'নাগরকোট থেকে হিমালয়ের সূর্যোদয় দর্শন',
      'পোখারা ফেওয়া লেক, সারাংকোট ও ডেভিস ফলস',
      'কাঠমান্ডু সিটি ট্যুর ও শপিং',
    ],
    highlightsEn: [
      'Himalayan sunrise from Nagarkot',
      'Pokhara Phewa Lake, Sarangkot & Devi’s Falls',
      'Kathmandu cultural sightseeing & shopping',
    ],
    documentsSummaryBn: [
      'বৈধ পাসপোর্ট (ন্যূনতম ৬ মাস মেয়াদ)',
      'রিটার্ন ফ্লাইট টিকেট ও কনফার্ম হোটেল বুকিং',
      'পাসপোর্ট সাইজ ছবি',
    ],
    documentsSummaryEn: [
      'Valid passport (6+ months validity)',
      'Return flight ticket & confirmed hotel booking',
      'Passport-size photographs',
    ],
    seo: {
      titleBn: 'নেপাল ট্যুর প্যাকেজ বাংলাদেশ | Visatrip Global',
      descriptionBn: 'বাংলাদেশ থেকে কাঠমান্ডু, পোখারা ও নাগরকোট নেপাল ট্যুর প্যাকেজ ও ফ্লাইট বুকিং — Visatrip Global।',
      titleEn: 'Nepal Tour Package from Bangladesh | Visatrip Global',
      descriptionEn: 'Affordable Kathmandu, Pokhara & Nagarkot Nepal tour packages with flights and verified hotels from Bangladesh.',
      primaryKeyword: 'Nepal tour package Bangladesh',
    },
    faqs: [
      {
        questionBn: 'নেপাল ভ্রমণে কি আগে ভিসা লাগাতে হয়?',
        answerBn: 'বাংলাদেশি পাসপোর্টধারীরা বছরে প্রথম ভ্রমণে নেপালের ত্রিভুবন এয়ারপোর্টে ফ্রি অন-অ্যারাইভাল ট্যুরিস্ট ভিসা পেয়ে থাকেন।',
        questionEn: 'Is a prior visa needed for Nepal?',
        answerEn: 'Bangladeshi passport holders get a free on-arrival tourist visa at Kathmandu airport on their first visit of the calendar year.',
      },
    ],
  },
];

export const destinationsData: DestinationItem[] = [
  ...coreDestinationsData,
  ...extendedDestinationsData,
];

export function getDestinationBySlug(slug: string): DestinationItem | undefined {
  return destinationsData.find((d) => d.slug === slug);
}
