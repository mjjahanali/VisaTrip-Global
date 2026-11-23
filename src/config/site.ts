export interface SiteLicense {
  key: 'tradeLicense' | 'tin' | 'hab' | 'bmet' | 'iata';
  labelBn: string;
  labelEn: string;
  /** Leave empty ("") if not yet supplied. Empty entries are hidden automatically on the public UI. */
  number: string;
  issuingBodyBn: string;
  issuingBodyEn: string;
}

export interface SiteStat {
  id: string;
  /** Leave null if not verified yet — counters with null values are never fabricated and stay hidden. */
  value: number | null;
  suffix?: string;
  labelBn: string;
  labelEn: string;
}

export interface OfficialSourceLink {
  id: string;
  nameBn: string;
  nameEn: string;
  authorityBn: string;
  authorityEn: string;
  url: string;
  domain: string;
  /** Route/service/country tags used to show only relevant official sources on each visa info page */
  tags: string[];
}

export interface OfficePhotoSlot {
  id: string;
  slotLabelBn: string;
  slotLabelEn: string;
  captionBn: string;
  captionEn: string;
  /** Owner: place verified real photo under /public/images/office/ and set verifiedByOwner: true */
  src: string;
  verifiedByOwner: boolean;
}

export interface TeamMemberSlot {
  id: string;
  /** Owner: set verifiedByOwner: true once real name, role, and consented photo are confirmed */
  verifiedByOwner: boolean;
  nameBn: string;
  nameEn: string;
  roleBn: string;
  roleEn: string;
  specialtyBn: string;
  specialtyEn: string;
  bioBn: string;
  bioEn: string;
  /** Real consented portrait path under /public/images/team/ (optional — falls back to monogram if empty) */
  photoSrc: string;
}

const RESOLVED_SITE_URL = (
  import.meta.env?.VITE_SITE_URL || 'https://www.visatripglobal.com'
).replace(/\/$/, '');
const RESOLVED_WHATSAPP = (import.meta.env?.VITE_WHATSAPP_NUMBER || '8801771304219').replace(
  /\D/g,
  ''
);

export const siteConfig = {
  brandName: 'Visatrip Global',
  taglineBn: 'প্রতিটি গন্তব্যে এক বিশ্বস্ত সহযোগী',
  taglineEn: 'Your Trusted Companion to Every Destination',
  domain: RESOLVED_SITE_URL,
  websiteDisplay: RESOLVED_SITE_URL.replace(/^https?:\/\//, ''),
  defaultLocale: 'bn' as const,

  contact: {
    phoneDisplay: '+880 1771-304219',
    phoneHref: 'tel:+8801771304219',
    whatsappNumber: RESOLVED_WHATSAPP,
    whatsappBaseUrl: `https://wa.me/${RESOLVED_WHATSAPP}`,
    defaultWhatsAppMessageBn:
      'আসসালামু আলাইকুম, আমি Visatrip Global থেকে সার্ভিস সম্পর্কে জানতে চাই।',
    defaultWhatsAppMessageEn:
      'Assalamu Alaikum, I would like to inquire about travel and visa services from Visatrip Global.',
    /** Owner: replace with your verified official email address (e.g., info@visatripglobal.com). Leave "" to hide email row cleanly. */
    email: '',
    emailPlaceholderNote: '[email]',
    officeAddressBn: 'রহনপুর, গোমস্তাপুর, চাঁপাইনবাবগঞ্জ, বাংলাদেশ',
    officeAddressEn: 'Rohanpur, Gomastapur, Chapai Nawabganj, Bangladesh',
    officeShortAddressBn: 'রহনপুর, গোমস্তাপুর, চাঁপাইনবাবগঞ্জ',
    officeShortAddressEn: 'Rohanpur, Gomastapur, Chapai Nawabganj',
    districtBn: 'চাঁপাইনবাবগঞ্জ',
    divisionBn: 'রাজশাহী বিভাগ',
    officeHoursBn: 'শনি – বৃহস্পতি, সকাল ৯:০০ – রাত ৮:০০',
    officeHoursEn: 'Sat – Thu, 9:00 AM – 8:00 PM',
    openingHoursSchema: 'Sa-Th 09:00-20:00',
    /** Approximate coordinates for Rohanpur, Gomastapur, Chapai Nawabganj — update with exact office pin when GBP is live. */
    geo: {
      latitude: 24.8194,
      longitude: 88.3168,
    },
    mapEmbedUrl:
      'https://www.google.com/maps?q=Rohanpur,+Gomastapur,+Chapai+Nawabganj,+Bangladesh&output=embed',
    mapDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Rohanpur,+Gomastapur,+Chapai+Nawabganj,+Bangladesh',
  },

  /**
   * LOCAL SEO SINGLE SOURCE OF TRUTH (NAP, Geo, AreaServed & GBP Review Link)
   * Every LocalBusiness/TravelAgency schema block, footer, contact page, and
   * local landing section pulls strictly from this configuration for 100% NAP consistency.
   */
  localSeo: {
    /** Exact structured areaServed list for Schema.org & local SEO signals */
    areaServed: [
      { name: 'Chapai Nawabganj', type: 'AdministrativeArea' as const },
      { name: 'Gomastapur', type: 'AdministrativeArea' as const },
      { name: 'Rohanpur', type: 'City' as const },
      { name: 'Nawabganj', type: 'City' as const },
      { name: 'Shibganj', type: 'AdministrativeArea' as const },
      { name: 'Rajshahi', type: 'AdministrativeArea' as const },
      { name: 'Bangladesh', type: 'Country' as const },
    ],
    /**
     * Owner: paste your verified Google Business Profile "Ask for reviews" short link here
     * (e.g. "https://g.page/r/XXXXXXXXXXXX/review"). Leave "" until GBP is verified.
     */
    gbpReviewUrl: '',
  },

  social: {
    facebook: 'https://www.facebook.com/visatripglobal/',
    instagram: 'https://www.instagram.com/visa.tripglobal/',
    linkedin: 'https://www.linkedin.com/company/visatripglobal/',
  },

  /**
   * LEAD GENERATION TRUTH RULE:
   * Set `responseTimeClaim.ownerConfirmed = true` ONLY after the agency owner confirms
   * they can reliably reply within this window during business hours.
   * When `false`, no response-time promise is displayed near forms.
   */
  leadGeneration: {
    responseTimeClaim: {
      ownerConfirmed: false,
      textBn: 'সাধারণত ২ ঘণ্টার মধ্যে রিপ্লাই (অফিস সময়ে)',
      textEn: 'Typically replies within 2 hours during office hours',
    },
  },

  /**
   * CINEMATIC HERO MEDIA SETTINGS
   * - Slideshow rotates across curated destination photography every 5 seconds (auto-paused on Save-Data / 2G / reduced motion).
   * - Optional 6-second muted looping video: supply real MP4/WebM files in /public/media/ and set `video.enabled = true`.
   *   Video is automatically disabled on slow connections, mobile Data-Saver, mobile viewports (<768px), and reduced motion.
   */
  hero: {
    enableSlideshow: true,
    slideIntervalMs: 5000,
    video: {
      enabled: false,
      mp4Src: '/media/hero-reel-6s.mp4',
      webmSrc: '/media/hero-reel-6s.webm',
      posterImageKey: 'hero' as const,
      durationSeconds: 6,
    },
  },

  /**
   * TRUST RULE: Never invent license numbers.
   * Enter real registration numbers here once confirmed. Empty strings are automatically omitted from public badges.
   */
  licenses: [
    {
      key: 'tradeLicense',
      labelBn: 'Trade License নম্বর',
      labelEn: 'Trade License No.',
      number: '',
      issuingBodyBn: 'পৌরসভা / সিটি কর্পোরেশন, বাংলাদেশ',
      issuingBodyEn: 'Municipality / Local Authority, Bangladesh',
    },
    {
      key: 'tin',
      labelBn: 'TIN সার্টিফিকেট',
      labelEn: 'TIN Certificate',
      number: '',
      issuingBodyBn: 'জাতীয় রাজস্ব বোর্ড (NBR)',
      issuingBodyEn: 'National Board of Revenue (NBR)',
    },
    {
      key: 'hab',
      labelBn: 'HAB (হজ্জ এজেন্সিজ অ্যাসোসিয়েশন) লাইসেন্স',
      labelEn: 'HAB License No.',
      number: '',
      issuingBodyBn: 'ধর্ম বিষয়ক মন্ত্রণালয় / HAAB',
      issuingBodyEn: 'Ministry of Religious Affairs / HAAB',
    },
    {
      key: 'bmet',
      labelBn: 'BMET / Recruiting License (RL)',
      labelEn: 'BMET / Recruiting License (RL)',
      number: '',
      issuingBodyBn: 'জনশক্তি কর্মসংস্থান ও প্রশিক্ষণ ব্যুরো (BMET)',
      issuingBodyEn: 'Bureau of Manpower, Employment and Training (BMET)',
    },
    {
      key: 'iata',
      labelBn: 'IATA / ATAB সদস্যপদ',
      labelEn: 'IATA / ATAB Membership',
      number: '',
      issuingBodyBn: 'International Air Transport Association / ATAB',
      issuingBodyEn: 'International Air Transport Association / ATAB',
    },
  ] as SiteLicense[],

  /**
   * TRUST & VERIFICATION SYSTEM (SINGLE SOURCE OF TRUTH)
   * Every trust signal rendered on the website pulls strictly from this object.
   * Set any `enabled: false` or leave date/photo strings empty to hide that claim cleanly.
   */
  trust: {
    /** Consistent license strip fallback when individual license numbers are not yet published online */
    licenseStrip: {
      enabled: true,
      headingVerifiedBn: 'যাচাইকৃত নিবন্ধন তথ্য',
      headingVerifiedEn: 'Verified Registrations',
      inOfficeNoticeBn:
        'স্থায়ী অফিস: রহনপুর, গোমস্তাপুর, চাঁপাইনবাবগঞ্জ — আমাদের সকল নিবন্ধন কাগজপত্র সরাসরি অফিসে যাচাইযোগ্য।',
      inOfficeNoticeEn:
        'Permanent Office: Rohanpur, Gomastapur, Chapai Nawabganj — official registration papers are open for direct in-office inspection.',
    },

    /** "সততার অঙ্গীকার" — Brand Honesty Pledge Block */
    honestyPledge: {
      enabled: true,
      kickerBn: 'সততার অঙ্গীকার',
      kickerEn: 'Our Honesty Pledge',
      titleBn: 'ভিসা ও বিদেশ যাত্রায় আমাদের ৪টি লিখিত অঙ্গীকার',
      titleEn: 'Four Written Commitments We Stand By',
      quoteBn:
        'আমরা কখনোই ভিসা নিশ্চিত হওয়ার মিথ্যা আশ্বাস দিই না। চূড়ান্ত সিদ্ধান্ত সংশ্লিষ্ট দেশের Embassy-র — আমরা সঠিক ডকুমেন্ট প্রস্তুতি, স্বচ্ছ হিসাব এবং আন্তরিক প্রচেষ্টার সাথে আপনার পাশে থাকি।',
      quoteEn:
        'We never make false promises of assured visa approval. Final decisions belong strictly to the Embassy — we provide honest eligibility reviews, clean documentation, written fees, and our best effort.',
      commitments: [
        {
          id: 'no-false-guarantee',
          titleBn: 'কোনো মিথ্যা ভিসা আশ্বাস নয়',
          descBn: 'প্রোফাইলে দুর্বলতা থাকলে আবেদনের আগেই স্পষ্টভাবে জানিয়ে দিই — অযথা টাকা নষ্ট করতে দিই না।',
          titleEn: 'Zero False Approval Promises',
          descEn: 'If a file has gaps, we say so upfront before you spend Embassy fees.',
        },
        {
          id: 'itemized-fees',
          titleBn: 'সরকারি ফি ও সার্ভিস চার্জ আলাদা হিসাব',
          descBn: 'Embassy/IVAC ফি, এয়ারফেয়ার এবং আমাদের কনসালটেন্সি চার্জ শুরুতেই লিখিতভাবে জানানো হয়।',
          titleEn: 'Written, Itemized Fee Breakdown',
          descEn: 'Official Embassy/IVAC fees and our service charges are disclosed separately in writing.',
        },
        {
          id: 'money-receipt',
          titleBn: 'প্রতিটি লেনদেনে অফিসিয়াল মানি রিসিট',
          descBn: 'অফিসে নগদ, bKash, Nagad বা Bank Transfer — যেকোনো পেমেন্টেই তারিখসহ লিখিত রিসিট দেওয়া হয়।',
          titleEn: 'Official Money Receipt Every Time',
          descEn: 'Every in-office, Bank, bKash, or Nagad payment receives a dated official receipt.',
        },
        {
          id: 'permanent-office',
          titleBn: 'সরাসরি দেখা করার স্থায়ী অফিস',
          descBn: 'কোনো গোপন বা শুধু ফেসবুক-ভিত্তিক এজেন্সি নয় — রহনপুর, গোমস্তাপুরে আমাদের স্থায়ী অফিসে সরাসরি আসুন।',
          titleEn: 'Permanent Walk-In Office',
          descEn: 'Never social-media-only — inspect our procedures in person at our Rohanpur office.',
        },
      ],
    },

    /** Dedicated Scam-Awareness Banners for high-risk Work Permit & Hajj/Umrah categories */
    scamAwareness: {
      workPermit: {
        enabled: true,
        kickerBn: 'Work Permit প্রতারণা প্রতিরোধ সতর্কতা',
        kickerEn: 'Work Permit Scam-Awareness Notice',
        titleBn: 'Work Permit-এ টাকা বা পাসপোর্ট দেওয়ার আগে ৪টি বিষয় যাচাই করুন',
        titleEn: 'Verify These 4 Safeguards Before Paying for Any Work Permit',
        bodyBn:
          'বিদেশে চাকরির নামে ভুয়া অফার লেটার, ট্যুরিস্ট ভিসায় কাজের প্রলোভন ও দালালের মৌখিক প্রতিশ্রুতি থেকে নিজেকে সুরক্ষিত রাখুন। Visatrip Global কখনোই ভিসা অনুমোদনের আগাম প্রতিশ্রুতি দেয় না।',
        bodyEn:
          'Protect yourself from fake job offer letters, working illegally on tourist visas, and verbal promises from unverified middlemen. Visatrip Global never promises assured approval.',
        checkpoints: [
          {
            bn: 'চূড়ান্ত ভিসা ও Work Permit অনুমোদন শুধুমাত্র বিদেশের সরকার ও Embassy-র এখতিয়ারভুক্ত।',
            en: 'Only foreign ministries and Embassies can approve a Work Permit or employment visa.',
          },
          {
            bn: 'সরকারি পোর্টাল (BMET / Ami Probashi) এবং নিয়োগকারী দেশের ইমিগ্রেশন ওয়েবসাইটে পারমিট যাচাই করুন।',
            en: 'Verify recruiting clearance and job permits via official BMET / Ami Probashi and host-country portals.',
          },
          {
            bn: 'ট্যুরিস্ট বা ভিজিট ভিসায় বিদেশে গিয়ে কাজ করা বেআইনি — এমন প্রস্তাবে কখনোই রাজি হবেন না।',
            en: 'Never accept offers claiming you can enter on a tourist visa and convert to a work permit later.',
          },
          {
            bn: 'অফিসিয়াল মানি রিসিট ছাড়া কারো ব্যক্তিগত মোবাইল বা ব্যাংক অ্যাকাউন্টে কোনো টাকা দেবেন না।',
            en: 'Never pay cash or transfer money to personal accounts without a dated official money receipt.',
          },
        ],
        officialVerifyLinks: [
          { labelBn: 'BMET সরকারি পোর্টাল', labelEn: 'BMET Official Portal', url: 'https://www.bmet.gov.bd/' },
          { labelBn: 'আমি প্রবাসী (Ami Probashi)', labelEn: 'Ami Probashi Portal', url: 'https://www.amiprobashi.com/' },
        ],
      },
      hajjUmrah: {
        enabled: true,
        kickerBn: 'হজ্জ ও ওমরাহ যাত্রী সুরক্ষা সতর্কতা',
        kickerEn: 'Hajj & Umrah Pilgrim Safety Notice',
        titleBn: 'ওমরাহ বা হজ্জ বুকিংয়ের আগে প্রতারণা এড়াতে যেসব বিষয় যাচাই করবেন',
        titleEn: 'Essential Checks Before Booking Your Hajj or Umrah Package',
        bodyBn:
          'অস্বাভাবিক সস্তা প্যাকেজের বিজ্ঞাপনে প্রলুব্ধ না হয়ে বুকিংয়ের আগেই হোটেলের প্রকৃত দূরত্ব, এয়ারলাইনস, প্যাকেজে অন্তর্ভুক্ত সেবাসমূহ এবং সরকারি নিবন্ধন লিখিতভাবে যাচাই করে নিন।',
        bodyEn:
          'Be cautious of unrealistically cheap package ads. Always confirm hotel walking distance from Haram, flight itinerary, itemized inclusions, and official government registration in writing before paying.',
        checkpoints: [
          {
            bn: 'মক্কা ও মদিনার হোটেলের নাম এবং হারাম শরীফ থেকে প্রকৃত মিটার দূরত্ব লিখিতভাবে জেনে নিন।',
            en: 'Confirm the exact Makkah & Madinah hotel names and verified distance from Haram in writing.',
          },
          {
            bn: 'হজ্জের জন্য বাংলাদেশ সরকারের ধর্ম বিষয়ক মন্ত্রণালয়ের পোর্টাল (hajj.gov.bd)-এ এজেন্সি ও প্রাক-নিবন্ধন যাচাই করুন।',
            en: 'Verify Hajj agency status and pre-registration directly on the official Bangladesh Hajj Portal (hajj.gov.bd).',
          },
          {
            bn: 'ওমরাহ ভিসা ও রওজা শরীফ (রিয়াজুল জান্নাহ) পারমিটের জন্য সৌদি অফিসিয়াল Nusuk প্ল্যাটফর্মের নিয়ম অনুসরণ করুন।',
            en: 'Follow official Saudi Nusuk guidelines for Umrah visa validity and Rawdah permit booking.',
          },
          {
            bn: 'প্রতিটি কিস্তির পেমেন্টে Visatrip Global-এর অফিসিয়াল মানি রিসিট এবং পেমেন্ট শিডিউল সংগ্রহ করুন।',
            en: 'Collect a dated official money receipt and written payment schedule for every installment.',
          },
        ],
        officialVerifyLinks: [
          { labelBn: 'বাংলাদেশ হজ্জ পোর্টাল (hajj.gov.bd)', labelEn: 'Bangladesh Hajj Portal (hajj.gov.bd)', url: 'https://www.hajj.gov.bd/' },
          { labelBn: 'সৌদি নুসুক পোর্টাল (nusuk.sa)', labelEn: 'Official Saudi Nusuk (nusuk.sa)', url: 'https://www.nusuk.sa/' },
        ],
      },
    },

    /** Payment Receipt Policy Notice */
    paymentReceiptPolicy: {
      enabled: true,
      titleBn: 'অফিসিয়াল পেমেন্ট ও মানি রিসিট নীতিমালা',
      titleEn: 'Official Payment & Money Receipt Policy',
      bodyBn:
        'Visatrip Global-এ নগদ, bKash, Nagad বা Bank Transfer যেভাবেই পেমেন্ট করুন, তারিখ, টাকার পরিমাণ ও সেবার বিবরণসহ অফিসিয়াল মানি রিসিট অবশ্যই সংগ্রহ করুন। মানি রিসিট ছাড়া কারো ব্যক্তিগত নম্বরে টাকা দেবেন না।',
      bodyEn:
        'For every payment via Cash (in-office), bKash, Nagad, or Bank Transfer, always collect an itemized, dated Visatrip Global official money receipt. Never send money to unverified personal numbers without written verification.',
      shortBn: 'প্রতিটি পেমেন্টে অফিসিয়াল মানি রিসিট সংগ্রহ বাধ্যতামূলক — রিসিট ছাড়া কোনো ব্যক্তিগত নম্বরে টাকা দেবেন না।',
      shortEn: 'Official money receipts are issued for every payment — never pay unverified personal numbers.',
    },

    /** Transparent Fee Note */
    transparentFeeNote: {
      enabled: true,
      titleBn: 'স্বচ্ছ ফি ও চার্জ নীতিমালা (কোনো গোপন খরচ নেই)',
      titleEn: 'Transparent Fee Policy (Zero Hidden Charges)',
      bodyBn:
        'সকল সরকারি/Embassy/IVAC ফি, এয়ারলাইনস বা হোটেলের প্রকৃত ভাড়া এবং Visatrip Global-এর কনসালটেন্সি/প্রসেসিং চার্জ ফাইল জমা দেওয়ার আগেই আলাদাভাবে লিখিত কোটেশনে জানানো হয়। সরকারি ভিসা ফি Embassy-র নিয়ম অনুযায়ী অ-ফেরতযোগ্য।',
      bodyEn:
        'Official Embassy/IVAC government fees, actual airline/hotel fares, and Visatrip Global consultancy charges are itemized separately in writing before filing. Government visa fees are non-refundable per Embassy rules.',
    },

    /** Secure-Form Badge displayed near InquiryForm & ChecklistModal */
    secureFormBadge: {
      enabled: true,
      labelBn: 'সুরক্ষিত ও এনক্রিপ্টেড ফর্ম (HTTPS)',
      labelEn: 'Secure & Encrypted Form (HTTPS)',
      subBn: 'আপনার নাম ও নম্বর শুধুমাত্র কনসাল্টেশনের জন্য ব্যবহৃত হয় — কোনো তৃতীয় পক্ষের সাথে শেয়ার করা হয় না।',
      subEn: 'Your contact details are used strictly for consultation and never sold or shared with third parties.',
    },

    /**
     * "Verified on [date]" stamp for Visa Requirement Checker, Visa Service pages, and Destination Visa guides.
     * Leave `verifiedDateIso: ""` to hide the stamp completely.
     * Update this date each time visa checklists are reviewed against official Embassy portals.
     */
    visaInfoVerification: {
      enabled: true,
      verifiedDateIso: '2026-11-22',
      verifiedDateBn: '২২ নভেম্বর ২০২৬',
      verifiedDateEn: 'November 22, 2026',
      noteBn: 'ভিসা গাইডলাইন ও ডকুমেন্ট তালিকা সর্বশেষ যাচাই',
      noteEn: 'Visa guidance verified on',
    },

    /**
     * "তথ্যের উৎস" — Official Embassy & Government Reference Portals.
     * Shown dynamically on visa info pages based on matching `tags`.
     */
    officialSources: [
      {
        id: 'ivac-bd',
        nameBn: 'IVAC বাংলাদেশ (Indian Visa Application Centre)',
        nameEn: 'IVAC Bangladesh (Indian Visa Application Centre)',
        authorityBn: 'ভারতীয় ভিসা আবেদন কেন্দ্র',
        authorityEn: 'Official Indian Visa Portal',
        url: 'https://www.ivacbd.com/',
        domain: 'ivacbd.com',
        tags: ['india-visa', 'india', 'visa-checker'],
      },
      {
        id: 'hci-dhaka',
        nameBn: 'ভারতীয় হাইকমিশন, ঢাকা',
        nameEn: 'High Commission of India, Dhaka',
        authorityBn: 'সরকারি কনস্যুলার ও মেডিকেল ভিসা নির্দেশনা',
        authorityEn: 'Consular & Medical Visa Rules',
        url: 'https://www.hcidhaka.gov.in/',
        domain: 'hcidhaka.gov.in',
        tags: ['india-visa', 'india'],
      },
      {
        id: 'bmet-bd',
        nameBn: 'জনশক্তি কর্মসংস্থান ও প্রশিক্ষণ ব্যুরো (BMET)',
        nameEn: 'Bureau of Manpower, Employment & Training (BMET)',
        authorityBn: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার',
        authorityEn: 'Government of Bangladesh',
        url: 'https://www.bmet.gov.bd/',
        domain: 'bmet.gov.bd',
        tags: ['work-permit', 'visa-checker', 'general'],
      },
      {
        id: 'ami-probashi',
        nameBn: 'আমি প্রবাসী (Ami Probashi)',
        nameEn: 'Ami Probashi Official Portal',
        authorityBn: 'বিএমইটি রেজিস্ট্রেশন ও ক্লিয়ারেন্স যাচাই',
        authorityEn: 'BMET Registration & Clearance',
        url: 'https://www.amiprobashi.com/',
        domain: 'amiprobashi.com',
        tags: ['work-permit'],
      },
      {
        id: 'hajj-gov-bd',
        nameBn: 'বাংলাদেশ হজ্জ পোর্টাল',
        nameEn: 'Bangladesh National Hajj Portal',
        authorityBn: 'ধর্ম বিষয়ক মন্ত্রণালয়, বাংলাদেশ',
        authorityEn: 'Ministry of Religious Affairs, Bangladesh',
        url: 'https://www.hajj.gov.bd/',
        domain: 'hajj.gov.bd',
        tags: ['hajj-umrah', 'saudi-arabia', 'visa-checker'],
      },
      {
        id: 'saudi-nusuk',
        nameBn: 'সৌদি অফিসিয়াল নুসুক (Nusuk)',
        nameEn: 'Official Saudi Nusuk Platform',
        authorityBn: 'সৌদি হজ্জ ও ওমরাহ মন্ত্রণালয়',
        authorityEn: 'Saudi Ministry of Hajj & Umrah',
        url: 'https://www.nusuk.sa/',
        domain: 'nusuk.sa',
        tags: ['hajj-umrah', 'saudi-arabia'],
      },
      {
        id: 'uae-icp',
        nameBn: 'UAE ICP (ফেডারেল ইমিগ্রেশন অথরিটি)',
        nameEn: 'UAE Federal Authority for Identity & Citizenship (ICP)',
        authorityBn: 'সংযুক্ত আরব আমিরাত সরকার',
        authorityEn: 'UAE Government Official Portal',
        url: 'https://icp.gov.ae/en/',
        domain: 'icp.gov.ae',
        tags: ['dubai', 'tourist-visa', 'work-permit', 'visa-checker'],
      },
      {
        id: 'malaysia-imi',
        nameBn: 'মালয়েশিয়া ইমিগ্রেশন ডিপার্টমেন্ট (IMI)',
        nameEn: 'Immigration Department of Malaysia',
        authorityBn: 'মালয়েশিয়া সরকার (eVISA / MDAC)',
        authorityEn: 'Government of Malaysia',
        url: 'https://www.imi.gov.my/',
        domain: 'imi.gov.my',
        tags: ['malaysia', 'tourist-visa', 'student-consultancy', 'visa-checker'],
      },
      {
        id: 'thailand-evisa',
        nameBn: 'থাইল্যান্ড অফিসিয়াল e-Visa পোর্টাল',
        nameEn: 'Official Thai e-Visa Portal',
        authorityBn: 'রয়্যাল থাই পররাষ্ট্র মন্ত্রণালয়',
        authorityEn: 'Ministry of Foreign Affairs of Thailand',
        url: 'https://www.thaievisa.go.th/',
        domain: 'thaievisa.go.th',
        tags: ['thailand', 'tourist-visa', 'visa-checker'],
      },
      {
        id: 'singapore-ica',
        nameBn: 'সিঙ্গাপুর ইমিগ্রেশন অ্যান্ড চেকপয়েন্টস অথরিটি (ICA)',
        nameEn: 'Immigration & Checkpoints Authority (ICA), Singapore',
        authorityBn: 'সিঙ্গাপুর সরকার',
        authorityEn: 'Government of Singapore',
        url: 'https://www.ica.gov.sg/',
        domain: 'ica.gov.sg',
        tags: ['singapore', 'tourist-visa', 'visa-checker'],
      },
      {
        id: 'turkey-evisa',
        nameBn: 'তুরস্ক ই-ভিসা ও কনস্যুলার পোর্টাল',
        nameEn: 'Republic of Türkiye e-Visa Portal',
        authorityBn: 'তুরস্ক পররাষ্ট্র মন্ত্রণালয়',
        authorityEn: 'Ministry of Foreign Affairs, Türkiye',
        url: 'https://www.evisa.gov.tr/en/',
        domain: 'evisa.gov.tr',
        tags: ['turkey', 'tourist-visa'],
      },
      {
        id: 'uk-gov',
        nameBn: 'UK Visas and Immigration (GOV.UK)',
        nameEn: 'UK Visas and Immigration (GOV.UK)',
        authorityBn: 'যুক্তরাজ্য সরকার',
        authorityEn: 'Government of the United Kingdom',
        url: 'https://www.gov.uk/browse/visas-immigration',
        domain: 'gov.uk',
        tags: ['uk', 'student-consultancy', 'tourist-visa', 'visa-checker'],
      },
      {
        id: 'ircc-canada',
        nameBn: 'IRCC কানাডা ইমিগ্রেশন (Canada.ca)',
        nameEn: 'Immigration, Refugees and Citizenship Canada (IRCC)',
        authorityBn: 'কানাডা সরকার',
        authorityEn: 'Government of Canada',
        url: 'https://www.canada.ca/en/services/immigration-citizenship.html',
        domain: 'canada.ca',
        tags: ['canada', 'student-consultancy', 'tourist-visa', 'visa-checker'],
      },
      {
        id: 'australia-immi',
        nameBn: 'অস্ট্রেলিয়া হোম অ্যাফেয়ার্স (Immi)',
        nameEn: 'Department of Home Affairs, Australia',
        authorityBn: 'অস্ট্রেলিয়া সরকার',
        authorityEn: 'Australian Government',
        url: 'https://immi.homeaffairs.gov.au/',
        domain: 'immi.homeaffairs.gov.au',
        tags: ['australia', 'student-consultancy', 'tourist-visa', 'visa-checker'],
      },
      {
        id: 'eu-schengen',
        nameBn: 'ইউরোপীয় কমিশন — শেনজেন ভিসা তথ্য',
        nameEn: 'European Commission — Schengen Visa Information',
        authorityBn: 'ইউরোপীয় ইউনিয়ন অফিসিয়াল পোর্টাল',
        authorityEn: 'European Union Official Portal',
        url: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en',
        domain: 'home-affairs.ec.europa.eu',
        tags: ['europe', 'tourist-visa', 'work-permit', 'student-consultancy'],
      },
      {
        id: 'mofa-bd',
        nameBn: 'পররাষ্ট্র মন্ত্রণালয়, বাংলাদেশ (MOFA)',
        nameEn: 'Ministry of Foreign Affairs, Bangladesh (MOFA)',
        authorityBn: 'ডকুমেন্ট সত্যায়ন ও কনস্যুলার সেবা',
        authorityEn: 'Attestation & Consular Services',
        url: 'https://mofa.gov.bd/',
        domain: 'mofa.gov.bd',
        tags: ['general', 'work-permit', 'student-consultancy', 'tourist-visa'],
      },
    ] as OfficialSourceLink[],

    /**
     * REAL OFFICE PHOTO SLOTS
     * TRUST RULE: Never label stock imagery as "our real Rohanpur office."
     * Add real owner-taken photos under /public/images/office/, set `src`, and toggle `verifiedByOwner: true`.
     * Unverified slots never invent photos — they display a clean physical-office verification card instead.
     */
    officePhotos: [
      {
        id: 'office-exterior',
        slotLabelBn: 'অফিস সাইনবোর্ড ও মূল প্রবেশদ্বার',
        slotLabelEn: 'Office Signboard & Main Entrance',
        captionBn: 'রহনপুর, গোমস্তাপুর, চাঁপাইনবাবগঞ্জ — Visatrip Global স্থায়ী অফিস।',
        captionEn: 'Visatrip Global permanent office in Rohanpur, Gomastapur, Chapai Nawabganj.',
        src: '',
        verifiedByOwner: false,
      },
      {
        id: 'office-desk',
        slotLabelBn: 'কনসাল্টেশন ডেস্ক ও ডকুমেন্ট চেকিং এরিয়া',
        slotLabelEn: 'Consultation Desk & Document Review Area',
        captionBn: 'সরাসরি ফাইল পর্যালোচনা ও ফ্রি কনসাল্টেশন ডেস্ক।',
        captionEn: 'Walk-in document review and free consultation desk.',
        src: '',
        verifiedByOwner: false,
      },
      {
        id: 'office-waiting',
        slotLabelBn: 'যাত্রী ও পরিবারের বসার ব্যবস্থা',
        slotLabelEn: 'Client & Family Waiting Lounge',
        captionBn: 'প্রথমবার ভ্রমণকারী ও প্রবীণ যাত্রীদের জন্য শান্তিপূর্ণ পরিবেশ।',
        captionEn: 'Calm seating area for families and first-time travelers.',
        src: '',
        verifiedByOwner: false,
      },
    ] as OfficePhotoSlot[],

    /**
     * REAL TEAM MEMBER SLOTS
     * TRUST RULE: Never display fake names or placeholder brackets like "[Founder Name]" on the live site.
     * Populate real consultant names, roles, and consented portraits below and set `verifiedByOwner: true`.
     * Until verified, the About page displays Visatrip Global's verified service desks without inventing individuals.
     */
    teamMembers: [
      {
        id: 'founder',
        verifiedByOwner: false,
        nameBn: '',
        nameEn: '',
        roleBn: 'প্রতিষ্ঠাতা ও ব্যবস্থাপনা পরিচালক',
        roleEn: 'Founder & Managing Director',
        specialtyBn: 'Work Permit ও কৌশলগত পরামর্শ',
        specialtyEn: 'Work Permit & Strategic Advisory',
        bioBn: 'চাঁপাইনবাবগঞ্জ ও রাজশাহী বিভাগের যাত্রীদের জন্য স্বচ্ছ ও নিরাপদ বিদেশ যাত্রা সেবা নিশ্চিত করছেন।',
        bioEn: 'Leading transparent, fraud-free travel and visa consultancy for Chapai Nawabganj and Bangladesh.',
        photoSrc: '',
      },
      {
        id: 'visa-lead',
        verifiedByOwner: false,
        nameBn: '',
        nameEn: '',
        roleBn: 'ভিসা ও ডকুমেন্টেশন প্রধান',
        roleEn: 'Head of Visa & Documentation',
        specialtyBn: 'Tourist, Student ও India Visa',
        specialtyEn: 'Tourist, Student & India Visa',
        bioBn: 'Tourist, Student এবং India Medical Visa-র নির্ভুল ফাইল প্রস্তুতি ও সলভেন্সি যাচাই তত্ত্বাবধান করেন।',
        bioEn: 'Oversees Tourist, Student, and India Medical Visa file preparation and document checks.',
        photoSrc: '',
      },
      {
        id: 'hajj-ticketing',
        verifiedByOwner: false,
        nameBn: '',
        nameEn: '',
        roleBn: 'হজ্জ, ওমরাহ ও এয়ার টিকেটিং সমন্বয়কারী',
        roleEn: 'Hajj, Umrah & Air Ticketing Lead',
        specialtyBn: 'Hajj & Umrah · Air Ticketing',
        specialtyEn: 'Hajj & Umrah · Air Ticketing',
        bioBn: 'ওমরাহ গ্রুপ সমন্বয়, হোটেল বুকিং এবং দেশি-আন্তর্জাতিক এয়ার টিকেট সাপোর্ট পরিচালনা করেন।',
        bioEn: 'Coordinates Umrah pilgrimage groups, verified hotels, and domestic/international ticketing.',
        photoSrc: '',
      },
    ] as TeamMemberSlot[],
  },

  /**
   * TRUST RULE: Never invent client or country counts.
   * Fill `satisfiedClients` and `countriesServed` with verified numbers. Null values are automatically hidden on the homepage.
   */
  stats: [
    {
      id: 'clients',
      value: null,
      suffix: '+',
      labelBn: 'সন্তুষ্ট ক্লায়েন্ট',
      labelEn: 'Satisfied Clients',
    },
    {
      id: 'countries',
      value: null,
      suffix: '+',
      labelBn: 'দেশের ভিসা সেবা',
      labelEn: 'Countries Visa Support',
    },
    {
      id: 'services',
      value: 8,
      suffix: '',
      labelBn: 'প্রয়োজনীয় ট্রাভেল সেবা',
      labelEn: 'Complete Travel Services',
    },
    {
      id: 'support',
      value: 7,
      suffix: ' দিন',
      labelBn: 'WhatsApp সাপোর্ট',
      labelEn: 'Days WhatsApp Support',
    },
  ] as SiteStat[],

  paymentMethods: [
    { name: 'bKash', labelBn: 'বিকাশ (bKash)', type: 'MFS' },
    { name: 'Nagad', labelBn: 'নগদ (Nagad)', type: 'MFS' },
    { name: 'Bank Transfer', labelBn: 'ব্যাংক ট্রান্সফার (Bank Transfer)', type: 'Bank' },
  ],

  seo: {
    defaultTitleBn: 'Visatrip Global — প্রতিটি গন্তব্যে এক বিশ্বস্ত সহযোগী',
    defaultTitleEn: 'Visatrip Global — Trusted Travel & Visa Agency Bangladesh',
    defaultDescriptionBn:
      'চাঁপাইনবাবগঞ্জের বিশ্বস্ত ট্রাভেল এজেন্সি — Work Permit, Tourist Visa, Student Visa, Hajj & Umrah, India Visa, Air Ticket ও Tour Package।',
    defaultDescriptionEn:
      'Visatrip Global in Chapai Nawabganj offers honest consultation for Work Permit, Tourist Visa, Student Visa, Hajj & Umrah, India Visa & Air Ticketing.',
    primaryKeywords: [
      'work permit agency in Chapai Nawabganj',
      'tourist visa consultancy Bangladesh',
      'student visa consultancy',
      'ওমরাহ প্যাকেজ',
      'হজ্জ প্যাকেজ',
      'umrah package Rajshahi division',
      'India medical visa from Bangladesh',
      'ভারতীয় মেডিকেল ভিসা',
      'air ticket Chapai Nawabganj',
      'hotel booking Bangladesh',
      'Dubai tour package from Bangladesh',
      'ওয়ার্ক পারমিট এজেন্সি',
      'ট্যুর প্যাকেজ বাংলাদেশ',
      'স্টুডেন্ট ভিসা কনসালটেন্সি',
    ],
  },

  analytics: {
    ga4Id: import.meta.env?.VITE_GA4_MEASUREMENT_ID || '',
    metaPixelId: import.meta.env?.VITE_META_PIXEL_ID || '',
    gscVerification: import.meta.env?.VITE_GSC_VERIFICATION || '',
  },

  copyrightBn: '© ২০২৬ Visatrip Global. সর্বস্বত্ব সংরক্ষিত।',
  copyrightEn: '© 2026 Visatrip Global. All rights reserved.',
};

const BANGLA_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBanglaDigits(input: string | number): string {
  return String(input).replace(/\d/g, (d) => BANGLA_DIGITS[Number(d)] ?? d);
}

/**
 * Site-wide numeral rule:
 * - Bangla digits (০–৯) in Bangla body text, steps, dates, and counts.
 * - English digits (0–9) in prices (৳) and phone numbers only.
 */
export function formatBDT(amount: number | null | undefined, _locale: 'bn' | 'en' = 'bn'): string | null {
  if (amount === null || amount === undefined || Number.isNaN(amount) || amount <= 0) {
    return null;
  }
  const formatted = new Intl.NumberFormat('en-IN').format(amount);
  return `৳${formatted}`;
}

export function buildWhatsAppLink(customMessage?: string, locale: 'bn' | 'en' = 'bn'): string {
  const text =
    customMessage ||
    (locale === 'en'
      ? siteConfig.contact.defaultWhatsAppMessageEn
      : siteConfig.contact.defaultWhatsAppMessageBn);
  return `${siteConfig.contact.whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
}

export function getActiveLicenses(): SiteLicense[] {
  return siteConfig.licenses.filter((lic) => lic.number.trim().length > 0);
}

export function getLicenseByKey(key: SiteLicense['key']): SiteLicense | undefined {
  const found = siteConfig.licenses.find((l) => l.key === key);
  return found && found.number.trim().length > 0 ? found : undefined;
}

export function getVerifiedTeamMembers(): TeamMemberSlot[] {
  return siteConfig.trust.teamMembers.filter(
    (m) => m.verifiedByOwner && m.nameEn.trim().length > 0 && m.nameBn.trim().length > 0
  );
}

export function getVerifiedOfficePhotos(): OfficePhotoSlot[] {
  return siteConfig.trust.officePhotos.filter(
    (p) => p.verifiedByOwner && p.src.trim().length > 0
  );
}

export function getOfficialSourcesByTags(tags: string[]): OfficialSourceLink[] {
  const matched = siteConfig.trust.officialSources.filter((src) =>
    src.tags.some((tag) => tags.includes(tag))
  );
  if (matched.length > 0) return matched;
  return siteConfig.trust.officialSources.filter((src) => src.tags.includes('general'));
}
