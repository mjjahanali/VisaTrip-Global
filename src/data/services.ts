import { siteImages } from '../config/images';

export type ServiceIconName =
  | 'Briefcase'
  | 'Globe'
  | 'GraduationCap'
  | 'Landmark'
  | 'Stethoscope'
  | 'Plane'
  | 'Building2'
  | 'Compass';

export interface ServiceFaq {
  questionBn: string;
  answerBn: string;
  questionEn: string;
  answerEn: string;
}

export interface ServiceStep {
  titleBn: string;
  descBn: string;
  titleEn: string;
  descEn: string;
}

export interface ServiceItem {
  slug: string;
  icon: ServiceIconName;
  theme?: 'default' | 'hajj';
  imageKey: keyof typeof siteImages;
  titleBn: string;
  titleEn: string;
  shortDescBn: string;
  shortDescEn: string;
  heroHeadingBn: string;
  heroHeadingEn: string;
  heroSubBn: string;
  heroSubEn: string;
  overviewBn: string;
  overviewEn: string;
  eligibilityBn: string[];
  eligibilityEn: string[];
  documentsBn: string[];
  documentsEn: string[];
  steps: ServiceStep[];
  processingTimeBn: string;
  processingTimeEn: string;
  feeNoteBn: string;
  feeNoteEn: string;
  countriesBn?: string[];
  countriesEn?: string[];
  relatedServiceSlugs: string[];
  relatedBlogSlugs: string[];
  seo: {
    titleBn: string;
    descriptionBn: string;
    titleEn: string;
    descriptionEn: string;
    primaryKeyword: string;
  };
  faqs: ServiceFaq[];
}

export const servicesData: ServiceItem[] = [
  {
    slug: 'work-permit',
    icon: 'Briefcase',
    imageKey: 'europe',
    titleBn: 'Work Permit',
    titleEn: 'Work Permit Consultancy',
    shortDescBn: 'সৌদি আরব, দুবাই, মালয়েশিয়া ও ইউরোপের বৈধ Work Permit প্রসেসিং ও সৎ পরামর্শ।',
    shortDescEn: 'Honest guidance and document preparation for verified Work Permit pathways across GCC, Asia, and Europe.',
    heroHeadingBn: 'বৈধ Work Permit-এর সঠিক গাইডলাইন ও নিরাপদ প্রসেসিং',
    heroHeadingEn: 'Verified Work Permit Guidance & Transparent Processing',
    heroSubBn:
      'দালাল বা মিথ্যা প্রতিশ্রুতি নয় — সঠিক ডকুমেন্ট, বৈধ চাহিদাপত্র যাচাই এবং প্রতিটি ধাপের স্বচ্ছ আপডেট নিয়ে কাজ করে Visatrip Global।',
    heroSubEn:
      'No false promises or middlemen — step-by-step documentation, demand verification guidance, and transparent updates at every stage.',
    overviewBn:
      'বিদেশে বৈধভাবে কর্মসংস্থানের জন্য Work Permit আবেদন একটি অত্যন্ত সংবেদনশীল প্রক্রিয়া। Visatrip Global চাঁপাইনবাবগঞ্জসহ সারা বাংলাদেশের আবেদনকারীদের পাসপোর্ট যাচাই, CV ও অভিজ্ঞতার সনদ প্রস্তুত, মেডিকেল ও পুলিশ ক্লিয়ারেন্স গাইডলাইন এবং Embassy Appointment সংক্রান্ত সঠিক তথ্য দিয়ে সহায়তা করে। প্রতিটি Work Permit-এর চূড়ান্ত অনুমোদন সংশ্লিষ্ট দেশের সরকার ও Embassy-র এখতিয়ারভুক্ত।',
    overviewEn:
      'Applying for an overseas Work Permit requires careful document verification and compliance. Visatrip Global assists applicants across Chapai Nawabganj and Bangladesh with passport readiness, CV & experience certificates, medical and police clearance guidance, and Embassy appointment preparation. Final visa approval always rests with the destination country authorities and Embassy.',
    eligibilityBn: [
      'বৈধ বাংলাদেশি পাসপোর্ট (ন্যূনতম ১ বছর মেয়াদ থাকা ভালো)',
      'বয়স সাধারণত ২১ থেকে ৪৫ বছরের মধ্যে (দেশ ও কাজের ধরন ভেদে ভিন্ন)',
      'সংশ্লিষ্ট কাজে দক্ষতা বা অভিজ্ঞতার প্রমাণপত্র (প্রযোজ্য ক্ষেত্রে)',
      'পুলিশ ক্লিয়ারেন্স ও অনুমোদিত মেডিকেল ফিটনেস সার্টিফিকেট',
      'অতীতে কোনো দেশে অবৈধ অবস্থান বা Deportation রেকর্ড না থাকা',
    ],
    eligibilityEn: [
      'Valid Bangladeshi passport (at least 1 year validity recommended)',
      'Applicant age typically between 21 and 45 years (varies by country and trade)',
      'Relevant trade skills or experience certificate where required',
      'Clean Police Clearance Certificate and approved Medical Fitness report',
      'No prior overstay or deportation record in the target country',
    ],
    documentsBn: [
      'মূল পাসপোর্ট ও রঙিন স্ক্যান কপি',
      'জাতীয় পরিচয়পত্র (NID) ও জন্ম নিবন্ধনের কপি',
      'সদ্য তোলা সাদা ব্যাকগ্রাউন্ডের পাসপোর্ট সাইজ ছবি',
      'পুলিশ ক্লিয়ারেন্স সার্টিফিকেট (অনলাইন ভেরিফায়েড)',
      'GAMCA / অনুমোদিত মেডিকেল সেন্টারের ফিটনেস রিপোর্ট',
      'শিক্ষাগত যোগ্যতা ও কাজের অভিজ্ঞতার সনদ (CV সহ)',
      'বৈধ Job Offer / Work Permit Approval Letter (প্রযোজ্য ক্ষেত্রে)',
    ],
    documentsEn: [
      'Original passport and clear color scan copy',
      'National ID (NID) and Birth Certificate copy',
      'Recent passport-size photographs on white background',
      'Online-verified Police Clearance Certificate',
      'Medical Fitness report from GAMCA / authorized center',
      'Updated CV with education and trade experience certificates',
      'Valid Job Offer / Work Permit Approval Letter (where applicable)',
    ],
    steps: [
      {
        titleBn: 'প্রাথমিক যাচাই ও ফ্রি কনসাল্টেশন',
        descBn: 'আপনার বয়স, দক্ষতা, পাসপোর্ট এবং পছন্দের দেশের বৈধ সুযোগ যাচাই করে বাস্তবসম্মত পরামর্শ দেওয়া হয়।',
        titleEn: 'Profile Check & Free Consultation',
        descEn: 'We evaluate your age, skills, passport validity, and eligible country pathways honestly.',
      },
      {
        titleBn: 'Document প্রস্তুতি ও ভেরিফিকেশন',
        descBn: 'পুলিশ ক্লিয়ারেন্স, মেডিকেল, CV এবং প্রয়োজনীয় সত্যায়ন ধাপে ধাপে সম্পন্ন করতে সহায়তা করা হয়।',
        titleEn: 'Document Preparation & Verification',
        descEn: 'Guided preparation of police clearance, medical test, CV, and attestations.',
      },
      {
        titleBn: 'Permit আবেদন ও Embassy Appointment',
        descBn: 'অনুমোদিত প্রক্রিয়ায় ফাইল জমা, Biometric ও Embassy সাবমিশনের তারিখ অনুযায়ী প্রস্তুত করা হয়।',
        titleEn: 'Permit Filing & Embassy Appointment',
        descEn: 'File compilation, Biometric booking, and Embassy submission guidance.',
      },
      {
        titleBn: 'BMET ক্লিয়ারেন্স ও ফ্লাইট প্রস্তুতি',
        descBn: 'ভিসা ইস্যু হওয়ার পর বৈধ BMET স্মার্ট কার্ড প্রক্রিয়া ও Air Ticket-এ সহায়তা করা হয়।',
        titleEn: 'BMET Clearance & Departure Readiness',
        descEn: 'Guidance on BMET smart card formalities and confirmed flight booking after visa issuance.',
      },
    ],
    processingTimeBn: 'দেশ ও ক্যাটাগরি ভেদে সাধারণত ৪৫ দিন থেকে ৬ মাস (Embassy ও সরকারি প্রক্রিয়া সাপেক্ষে)',
    processingTimeEn: 'Typically 45 days to 6 months depending on destination country and Embassy timelines',
    feeNoteBn: 'ফি জানতে কনসাল্টেশন নিন (দেশ ও কাজের ক্যাটাগরি অনুযায়ী লিখিত ফি শিডিউল ও রিসিট দেওয়া হয়)',
    feeNoteEn: 'Contact us for a transparent, written fee breakdown based on destination and category',
    countriesBn: ['সৌদি আরব', 'সংযুক্ত আরব আমিরাত (দুবাই)', 'মালয়েশিয়া', 'রোমানিয়া', 'পোল্যান্ড', 'মাল্টা', 'কাতার', 'ওমান'],
    countriesEn: ['Saudi Arabia', 'UAE (Dubai)', 'Malaysia', 'Romania', 'Poland', 'Malta', 'Qatar', 'Oman'],
    relatedServiceSlugs: ['air-ticketing', 'tourist-visa', 'student-consultancy'],
    relatedBlogSlugs: ['work-permit-scam-protection-7-ways', 'dubai-tourist-visa-documents-bangladesh'],
    seo: {
      titleBn: 'Work Permit এজেন্সি চাঁপাইনবাবগঞ্জ | Visatrip Global',
      descriptionBn: 'চাঁপাইনবাবগঞ্জ ও বাংলাদেশ থেকে সৌদি আরব, দুবাই, মালয়েশিয়া ও ইউরোপের বৈধ Work Permit পরামর্শ ও Document Guidance — Visatrip Global।',
      titleEn: 'Work Permit Agency in Chapai Nawabganj | Visatrip Global',
      descriptionEn: 'Trusted Work Permit consultancy in Chapai Nawabganj, Bangladesh for Saudi Arabia, UAE, Malaysia & Europe with honest guidance.',
      primaryKeyword: 'work permit agency in Chapai Nawabganj',
    },
    faqs: [
      {
        questionBn: 'আপনারা কি Work Permit ভিসা অনুমোদনের আগাম নিশ্চয়তা দেন?',
        answerBn: 'না। কোনো বৈধ এজেন্সি ভিসা অনুমোদনের আগাম নিশ্চয়তা দিতে পারে না, কারণ চূড়ান্ত সিদ্ধান্ত সংশ্লিষ্ট দেশের সরকার ও Embassy নিয়ে থাকে। আমরা সঠিক গাইডলাইন, কাগজপত্র যাচাই এবং আন্তরিক সহযোগিতা প্রদান করি।',
        questionEn: 'Can you promise assured Work Permit approval?',
        answerEn: 'No legitimate agency can promise assured visa approval because final decisions belong strictly to the destination country Embassy and authorities. We provide accurate documentation, honest advice, and dedicated support.',
      },
      {
        questionBn: 'কোন কোন দেশের Work Permit সম্পর্কে পরামর্শ পাওয়া যায়?',
        answerBn: 'সৌদি আরব, দুবাই (UAE), মালয়েশিয়া, রোমানিয়া, পোল্যান্ডসহ অনুমোদিত গন্তব্যগুলোর বর্তমান চাহিদা ও নিয়মকানুন সম্পর্কে আমরা আপডেট পরামর্শ দিই।',
        questionEn: 'Which countries do you cover for Work Permit guidance?',
        answerEn: 'We provide updated consultation for Saudi Arabia, UAE (Dubai), Malaysia, Romania, Poland, and other active destinations subject to current regulations.',
      },
      {
        questionBn: 'কাজের ধরন (Job Category) কী কী হতে পারে?',
        answerBn: 'কনস্ট্রাকশন, হসপিটালিটি ও হোটেল স্টাফ, ফ্যাক্টরি ওয়ার্কার, ওয়ে্যারহাউস, ড্রাইভিং, ক্লিনিং এবং টেকনিক্যাল ট্রেড (ইলেকট্রিশিয়ান, প্লাম্বার, ওয়েল্ডার) ইত্যাদি।',
        questionEn: 'What job categories are commonly available?',
        answerEn: 'Construction, hospitality & hotel staff, factory & warehouse operations, driving, facility cleaning, and skilled technical trades like electrician, plumber, and welder.',
      },
      {
        questionBn: 'পেমেন্ট কীভাবে করতে হয় এবং রিসিট কি দেওয়া হয়?',
        answerBn: 'প্রতিটি লেনদেনের বিপরীতে অফিসিয়াল Money Receipt দেওয়া হয়। নগদ, bKash, Nagad বা অফিসিয়াল ব্যাংক অ্যাকাউন্টে পেমেন্ট করা যায়। রিসিট ছাড়া কখনোই কাউকে টাকা দেবেন না।',
        questionEn: 'How are payments handled and do you issue receipts?',
        answerEn: 'Official money receipts are issued for every transaction. Payments can be made via Bank Transfer, bKash, or Nagad. Never pay anyone without a verified receipt.',
      },
      {
        questionBn: 'অভিজ্ঞতা না থাকলে কি Work Permit-এ আবেদন করা যায়?',
        answerBn: 'কিছু জেনারেল লেবার বা হেল্পার ক্যাটাগরিতে পূর্ব অভিজ্ঞতা বাধ্যতামূলক নয়, তবে টেকনিক্যাল ও ইউরোপীয় কাজের ক্ষেত্রে দক্ষতা ও অভিজ্ঞতা থাকলে সুযোগ অনেক ভালো হয়।',
        questionEn: 'Can applicants without prior experience apply?',
        answerEn: 'General helper categories may not require formal experience, while technical trades and European permits strongly favor documented skills.',
      },
      {
        questionBn: 'ভুয়া Work Permit বা প্রতারণা কীভাবে চিনব?',
        answerBn: 'অতিরিক্ত কম খরচে দ্রুত ইউরোপে পাঠানোর লোভ, রিসিট ছাড়া টাকা চাওয়া বা অফিসিয়াল পোর্টালে পারমিট যাচাই না করতে দেওয়া প্রতারণার লক্ষণ। প্রয়োজনে আমাদের অফিসে এসে কাগজপত্র যাচাই করতে পারেন।',
        questionEn: 'How can I spot a fake Work Permit offer?',
        answerEn: 'Unusually low fees for Europe, refusal to provide official receipts, or inability to verify permit numbers on government portals are red flags. You may consult our office to review documents.',
      },
      {
        questionBn: 'প্রাথমিক কনসাল্টেশনের জন্য কি কোনো ফি দিতে হবে?',
        answerBn: 'না, আমাদের প্রাথমিক কনসাল্টেশন এবং আপনার প্রোফাইল মূল্যায়ন সম্পূর্ণ ফ্রি।',
        questionEn: 'Is there any fee for the initial consultation?',
        answerEn: 'No, initial consultation and eligibility assessment are completely free.',
      },
      {
        questionBn: 'আমি চাঁপাইনবাবগঞ্জের বাইরে থাকি — অনলাইনে কি সেবা নিতে পারব?',
        answerBn: 'হ্যাঁ, WhatsApp ও ফোনের মাধ্যমে বাংলাদেশের যেকোনো জেলা থেকে প্রাথমিক পরামর্শ ও ডকুমেন্ট চেকিং সেবা নিতে পারবেন। মূল পাসপোর্ট জমা বা সরাসরি সাক্ষাতের জন্য রহনপুর অফিসে আসতে পারেন।',
        questionEn: 'I live outside Chapai Nawabganj — can I consult online?',
        answerEn: 'Yes, clients from any district in Bangladesh can consult and verify documents via WhatsApp and phone, and visit our Rohanpur office when original documents are needed.',
      },
    ],
  },
  {
    slug: 'tourist-visa',
    icon: 'Globe',
    imageKey: 'dubai',
    titleBn: 'Tourist Visa',
    titleEn: 'Tourist Visa Consultancy',
    shortDescBn: 'দুবাই, মালয়েশিয়া, থাইল্যান্ড, সিঙ্গাপুর, তুরস্ক ও ইউরোপের Tourist Visa ফাইল প্রসেসিং।',
    shortDescEn: 'Complete Tourist Visa file preparation for Dubai, Malaysia, Thailand, Singapore, Turkey, and Schengen Europe.',
    heroHeadingBn: 'নিশ্চিন্ত বিদেশ ভ্রমণ, নির্ভুল Tourist Visa প্রসেসিংয়ের সাথে',
    heroHeadingEn: 'Structured Tourist Visa Preparation for Stress-Free Travel',
    heroSubBn:
      'Bank Solvency গাইড, Travel Itinerary, Hotel Booking ও নির্ভুল Visa Application ফর্ম পূরণে পাশে আছে Visatrip Global।',
    heroSubEn:
      'Accurate application forms, Bank Solvency guidance, Travel Itinerary, and confirmed hotel booking support.',
    overviewBn:
      'অনেক সময় ছোটখাটো ডকুমেন্ট ত্রুটি বা অসম্পূর্ণ Travel Itinerary-র কারণে Tourist Visa রিজেক্ট হয়ে যায়। Visatrip Global আপনার প্রোফাইল (চাকরিজীবী, ব্যবসায়ী বা শিক্ষার্থী) অনুযায়ী প্রতিটি দেশের Embassy-র সর্বশেষ নিয়ম মেনে ফাইল সাজিয়ে দেয়। ভিসা অনুমোদনের চূড়ান্ত সিদ্ধান্ত সংশ্লিষ্ট Embassy নিয়ে থাকে।',
    overviewEn:
      'Small clerical errors or weak travel itineraries often lead to Tourist Visa refusals. Visatrip Global structures your application according to your profile (salaried, business owner, or student) and the latest Embassy requirements. Final visa issuance is decided exclusively by the Embassy.',
    eligibilityBn: [
      'ন্যূনতম ৬ মাস মেয়াদসহ বৈধ পাসপোর্ট এবং কমপক্ষে ২টি ফাঁকা পাতা',
      'নিয়মিত আয়ের প্রমাণ (চাকরির NOC ও Pay Slip বা ব্যবসার Trade License)',
      'সর্বশেষ ৬ মাসের ব্যাংক স্টেটমেন্ট ও Bank Solvency সার্টিফিকেট',
      'পরিষ্কার ভ্রমণ পরিকল্পনা (Itinerary ও Return Ticket বুকিং)',
    ],
    eligibilityEn: [
      'Valid passport with at least 6 months validity and 2 blank pages',
      'Proof of stable income (Job NOC & salary slips, or Business Trade License)',
      'Recent 6-month Bank Statement and Bank Solvency Certificate',
      'Clear travel plan including itinerary and return flight reservation',
    ],
    documentsBn: [
      'মূল পাসপোর্ট (পুরানো পাসপোর্ট থাকলে তাও সংযুক্ত করুন)',
      'সাদা ব্যাকগ্রাউন্ডের সাম্প্রতিক ছবি (Embassy সাইজ অনুযায়ী)',
      'বিগত ৬ মাসের ব্যাংক স্টেটমেন্ট ও ব্যাংক সলভেন্সি সার্টিফিকেট',
      'চাকরিজীবীদের জন্য NOC, অফিস আইডি কার্ড ও ভিজিটিং কার্ড',
      'ব্যবসায়ীদের জন্য নবায়নকৃত Trade License (ইংরেজি অনুবাদ ও নোটারিসহ) ও কোম্পানির প্যাড',
      'TIN সার্টিফিকেট ও আয়কর রিটার্ন কপি (প্রযোজ্য ক্ষেত্রে)',
      'হোটেল বুকিং, ফ্লাইট Itinerary এবং কভার লেটার',
    ],
    documentsEn: [
      'Original passport (plus previous passports if any)',
      'Recent white-background photographs per Embassy specifications',
      'Last 6 months Bank Statement & Bank Solvency Certificate',
      'Job NOC, employee ID card, and visiting card (for salaried applicants)',
      'Renewed Trade License (notarized English copy) and company letterhead (for business owners)',
      'TIN Certificate & Tax Return acknowledgement where applicable',
      'Hotel reservation, Flight Itinerary, and Cover Letter',
    ],
    steps: [
      {
        titleBn: 'প্রোফাইল ও ট্রাভেল হিস্ট্রি বিশ্লেষণ',
        descBn: 'আপনার পেশা, ব্যাংক স্টেটমেন্ট এবং পূর্ববর্তী ভ্রমণ ইতিহাস দেখে উপযুক্ত দেশ ও ভিসা কৌশল নির্ধারণ করা হয়।',
        titleEn: 'Profile & Travel History Review',
        descEn: 'We assess your occupation, bank history, and travel record to prepare a strong file.',
      },
      {
        titleBn: 'Document Checklist ও Solvency গাইডলাইন',
        descBn: 'কত টাকা ব্যালেন্স থাকা যুক্তিযুক্ত এবং কোন কাগজে নোটারি লাগবে তা স্পষ্টভাবে বুঝিয়ে দেওয়া হয়।',
        titleEn: 'Document Checklist & Solvency Guide',
        descEn: 'Clear instructions on bank solvency standards, notarization, and supporting proof.',
      },
      {
        titleBn: 'ফর্ম পূরণ, Itinerary ও সাবমিশন',
        descBn: 'কভার লেটার, হোটেল ও এয়ার টিকেট বুকিংসহ অনলাইন/ভিসা সেন্টার সাবমিশন সম্পন্ন করা হয়।',
        titleEn: 'Form Filing, Itinerary & Submission',
        descEn: 'Complete cover letter, booking reservations, and e-Visa / Visa Center submission.',
      },
      {
        titleBn: 'নিয়মিত ট্র্যাকিং ও পাসপোর্ট ডেলিভারি',
        descBn: 'আবেদনের প্রতিটি আপডেট WhatsApp-এ জানানো হয় এবং পাসপোর্ট সংগ্রহের পর নিরাপদে হস্তান্তর করা হয়।',
        titleEn: 'Tracking & Passport Delivery',
        descEn: 'Regular WhatsApp progress updates until passport collection and safe handover.',
      },
    ],
    processingTimeBn: 'ই-ভিসা (মালয়েশিয়া/দুবাই): ৪–১০ কর্মদিবস | স্টিকার ভিসা (থাইল্যান্ড/সিঙ্গাপুর/ইউরোপ): ৭–২৫ কর্মদিবস',
    processingTimeEn: 'e-Visa (Malaysia/Dubai): 4–10 working days | Sticker Visa (Thailand/Singapore/Europe): 7–25 working days',
    feeNoteBn: 'ফি জানতে কনসাল্টেশন নিন (Embassy ফি + সার্ভিস চার্জ আলাদাভাবে জানানো হয়)',
    feeNoteEn: 'Request a consultation for exact Embassy fees and transparent service charges',
    countriesBn: ['দুবাই (UAE)', 'মালয়েশিয়া', 'থাইল্যান্ড', 'সিঙ্গাপুর', 'তুরস্ক', 'শেনজেন ইউরোপ', 'মালদ্বীপ', 'নেপাল'],
    countriesEn: ['Dubai (UAE)', 'Malaysia', 'Thailand', 'Singapore', 'Turkey', 'Schengen Europe', 'Maldives', 'Nepal'],
    relatedServiceSlugs: ['tour-package', 'air-ticketing', 'hotel-booking'],
    relatedBlogSlugs: ['dubai-tourist-visa-documents-bangladesh', 'malaysia-travel-best-time-budget-guide'],
    seo: {
      titleBn: 'ট্যুরিস্ট ভিসা কনসালটেন্সি বাংলাদেশ | Visatrip Global',
      descriptionBn: 'বাংলাদেশ থেকে দুবাই, মালয়েশিয়া, থাইল্যান্ড, সিঙ্গাপুর ও ইউরোপের Tourist Visa ফাইল প্রসেসিং ও Bank Solvency গাইড — Visatrip Global।',
      titleEn: 'Tourist Visa Consultancy Bangladesh | Visatrip Global',
      descriptionEn: 'Professional Tourist Visa file preparation in Bangladesh for Dubai, Malaysia, Thailand, Singapore, Turkey & Europe.',
      primaryKeyword: 'tourist visa consultancy Bangladesh',
    },
    faqs: [
      {
        questionBn: 'নতুন (Fresh) পাসপোর্টে কি Tourist Visa পাওয়া সম্ভব?',
        answerBn: 'হ্যাঁ, সঠিক ব্যাংক স্টেটমেন্ট ও পেশার প্রমাণ থাকলে নতুন পাসপোর্টেও মালয়েশিয়া, থাইল্যান্ড, দুবাই বা নেপাল/মালদ্বীপ ভ্রমণ করা যায়। প্রথমে সহজ এশিয়ান দেশ ভ্রমণ করলে পরবর্তীতে ইউরোপের ভিসা সহজ হয়।',
        questionEn: 'Can I apply for a Tourist Visa with a fresh passport?',
        answerEn: 'Yes, applicants with strong occupation and bank documentation can apply for Asian destinations like Malaysia, Thailand, or Dubai on a fresh passport, building travel history for future European trips.',
      },
      {
        questionBn: 'ব্যাংক স্টেটমেন্টে ন্যূনতম কত টাকা থাকতে হয়?',
        answerBn: 'দেশ ভেদে এটি ভিন্ন হয়। সাধারণত এশিয়ান দেশের জন্য ন্যূনতম ৳1,50,000–৳2,00,000 এবং ইউরোপ বা তুরস্কের জন্য ৳5,00,000–৳8,00,000+ স্থিতিশীল ব্যালেন্স থাকা ভালো। হঠাৎ বড় অঙ্কের টাকা জমা না দেওয়াই উত্তম।',
        questionEn: 'How much bank balance is typically recommended?',
        answerEn: 'It varies by country. Asian visas typically look for stable balances of ৳1,50,000–৳2,00,000+, whereas Europe or Turkey generally expects ৳5,00,000–৳8,00,000+ with consistent transaction history.',
      },
      {
        questionBn: 'ভিসা হওয়ার আগে কি কনফার্ম এয়ার টিকেট কিনতে হবে?',
        answerBn: 'বেশিরভাগ দেশের জন্য ভিসা আবেদনে Flight Itinerary (রিজার্ভেশন) দিলেই চলে; আগে পুরো টাকা দিয়ে টিকেট কাটার দরকার হয় না। আমাদের অফিস থেকেই ভিসা-উপযোগী Itinerary তৈরি করে দেওয়া হয়।',
        questionEn: 'Do I need to buy a non-refundable flight ticket before visa approval?',
        answerEn: 'Most Embassies only require a verifiable flight itinerary reservation for application; purchasing the final ticket after approval is usually recommended.',
      },
      {
        questionBn: 'আপনারা কি পরিবার নিয়ে ভ্রমণের ফাইল একসাথে প্রসেস করেন?',
        answerBn: 'হ্যাঁ, স্বামী-স্ত্রী ও সন্তানদের ফ্যামিলি ফাইল একসাথে সাজিয়ে দেওয়া হয় এবং নিকাহনামা/জন্ম নিবন্ধন সংযুক্তির গাইডলাইন দেওয়া হয়।',
        questionEn: 'Do you process family Tourist Visa applications together?',
        answerEn: 'Yes, we organize joint family files with marriage certificates, birth certificates, and linked hotel/flight itineraries.',
      },
      {
        questionBn: 'ভিসা রিজেক্ট হলে কি Embassy ফি ফেরত পাওয়া যায়?',
        answerBn: 'না, কোনো Embassy ভিসা রিজেক্ট হলে তাদের সরকারি ভিসা ফি ফেরত দেয় না। তাই প্রথমবারেই নির্ভুল ফাইল জমা দেওয়া অত্যন্ত জরুরি।',
        questionEn: 'Are Embassy fees refundable if a visa is refused?',
        answerEn: 'No, Embassy application fees are non-refundable worldwide. Preparing a complete, accurate file on the first submission minimizes unnecessary risk.',
      },
      {
        questionBn: 'চাকরি না করলে বা গৃহিণী হলে কি আবেদন করা যাবে?',
        answerBn: 'হ্যাঁ, স্বামী বা পিতার স্পনসরশিপ লেটার, তাদের ব্যাংক স্টেটমেন্ট এবং সম্পর্কের প্রমাণপত্র (নিকাহনামা/জন্ম নিবন্ধন) দিয়ে আবেদন করা যায়।',
        questionEn: 'Can homemakers or dependents apply for a Tourist Visa?',
        answerEn: 'Yes, with a sponsorship letter, sponsor bank statement, and valid proof of relationship.',
      },
      {
        questionBn: 'কভার লেটার ও ট্রাভেল প্ল্যান কি আপনারাই লিখে দেবেন?',
        answerBn: 'হ্যাঁ, আমাদের কনসালটেন্টরা আপনার ভ্রমণের উদ্দেশ্য ও সময়সূচি অনুযায়ী প্রফেশনাল Cover Letter ও Day-by-Day Itinerary তৈরি করে দেন।',
        questionEn: 'Do you draft the Cover Letter and travel itinerary?',
        answerEn: 'Yes, our consultants draft tailored cover letters and structured day-by-day itineraries for every applicant.',
      },
      {
        questionBn: 'ভিসা প্রসেস চলাকালীন আপডেট কীভাবে পাব?',
        answerBn: 'ফাইল জমা, Biometric এবং পাসপোর্ট রেডি হওয়ার প্রতিটি ধাপ WhatsApp ও আমাদের ওয়েবসাইটের Track Application পেজের মাধ্যমে জানতে পারবেন।',
        questionEn: 'How will I receive application updates?',
        answerEn: 'You receive regular WhatsApp updates and can check status anytime on our Track Application page.',
      },
    ],
  },
  {
    slug: 'student-consultancy',
    icon: 'GraduationCap',
    imageKey: 'malaysia',
    titleBn: 'Student Consultancy',
    titleEn: 'Student Visa Consultancy',
    shortDescBn: 'উচ্চশিক্ষার জন্য বিশ্ববিদ্যালয় নির্বাচন, অফার লেটার, স্কলারশিপ ও Student Visa গাইডলাইন।',
    shortDescEn: 'University shortlisting, admission offer letters, scholarship guidance, and Student Visa file preparation.',
    heroHeadingBn: 'বিদেশে উচ্চশিক্ষার স্বপ্ন পূরণে নির্ভরযোগ্য Student Consultancy',
    heroHeadingEn: 'Honest Guidance for Studying Abroad & Student Visa Success',
    heroSubBn:
      'সঠিক দেশ, বিশ্ববিদ্যালয়, কোর্স ও ইনটেক নির্বাচন থেকে শুরু করে Bank Solvency ও Embassy Interview প্রস্তুতি — প্রতিটি ধাপে স্বচ্ছ সহায়তা।',
    heroSubEn:
      'From selecting the right Country, University, Course & Intake to Bank Solvency and Embassy Interview readiness.',
    overviewBn:
      'উচ্চশিক্ষার জন্য বিদেশে যেতে হলে শুধু ভর্তি নয়, বরং আপনার একাডেমিক রেজাল্ট, বাজেট ও ক্যারিয়ার লক্ষ্যের সাথে মানানসই বিশ্ববিদ্যালয় বেছে নেওয়া সবচেয়ে জরুরি। Visatrip Global বাংলাদেশি শিক্ষার্থীদের জন্য ফ্রি প্রোফাইল ইভ্যালুয়েশন, IELTS/ইংরেজি ভাষা গাইডলাইন, স্কলারশিপ তথ্য, SOP রিভিউ এবং Student Visa ডকুমেন্ট প্রস্তুতিতে আন্তরিকভাবে সহায়তা করে।',
    overviewEn:
      'Studying abroad is a major family investment. Visatrip Global guides Bangladeshi students through free academic profile evaluation, country and university shortlisting, scholarship applications, Statement of Purpose (SOP) review, Bank Solvency preparation, and Student Visa documentation.',
    eligibilityBn: [
      'HSC / A-Level (ব্যাচেলরের জন্য) অথবা স্নাতক ডিগ্রি (মাস্টার্সের জন্য)',
      'সংশ্লিষ্ট দেশের ও বিশ্ববিদ্যালয়ের ন্যূনতম GPA শর্ত পূরণ',
      'IELTS / PTE / Duolingo স্কোর (অথবা কিছু বিশ্ববিদ্যালয়ে MOI গ্রহণযোগ্য)',
      'পড়াশোনা ও থাকার খরচ বহনের উপযুক্ত স্পনসর ও Bank Solvency',
    ],
    eligibilityEn: [
      'HSC / A-Level for Bachelor programs or Bachelor degree for Master programs',
      'Meeting target university minimum GPA criteria',
      'IELTS / PTE / Duolingo score (or MOI where accepted)',
      'Eligible financial sponsor with verified Bank Solvency',
    ],
    documentsBn: [
      'সকল একাডেমিক সার্টিফিকেট ও মার্কশিট (SSC, HSC, Bachelor)',
      'বৈধ পাসপোর্ট ও পাসপোর্ট সাইজ ছবি',
      'IELTS / PTE / Duolingo বা MOI সার্টিফিকেট',
      'Statement of Purpose (SOP) এবং Academic CV',
      '২টি Recommendation Letter (মাস্টার্স ও স্কলারশিপের জন্য)',
      'স্পনসরের ৬ মাসের ব্যাংক স্টেটমেন্ট, Solvency ও আয়ের প্রমাণপত্র',
      'বিশ্ববিদ্যালয়ের Offer Letter ও টিউশন ফি পেমেন্ট রিসিট',
    ],
    documentsEn: [
      'All academic transcripts and certificates (SSC, HSC, Bachelor)',
      'Valid passport and photographs',
      'IELTS / PTE / Duolingo score report or MOI letter',
      'Statement of Purpose (SOP) and Academic CV',
      'Two Letters of Recommendation (for Master & scholarship tracks)',
      'Sponsor 6-month Bank Statement, Solvency & income source documents',
      'University Offer Letter & tuition deposit receipt',
    ],
    steps: [
      {
        titleBn: 'ফ্রি একাডেমিক প্রোফাইল ইভ্যালুয়েশন',
        descBn: 'আপনার রেজাল্ট, Study Gap, IELTS স্কোর ও বাজেট অনুযায়ী উপযুক্ত দেশ ও কোর্স বাছাই করা হয়।',
        titleEn: 'Free Academic Profile Evaluation',
        descEn: 'We review grades, study gap, language scores, and family budget to shortlist countries.',
      },
      {
        titleBn: 'বিশ্ববিদ্যালয় আবেদন ও স্কলারশিপ',
        descBn: 'নির্বাচিত বিশ্ববিদ্যালয়ে আবেদন, SOP রিভিউ এবং প্রযোজ্য স্কলারশিপের জন্য ফাইল জমা দেওয়া হয়।',
        titleEn: 'Admission & Scholarship Filing',
        descEn: 'University applications, SOP polishing, and merit scholarship submissions.',
      },
      {
        titleBn: 'Bank Solvency ও ভিসা ফাইল প্রস্তুতি',
        descBn: 'Embassy-র নিয়ম অনুযায়ী স্পনসরের ব্যাংক ডকুমেন্ট, Affidavit ও মেডিকেল চেকলিস্ট সাজানো হয়।',
        titleEn: 'Bank Solvency & Visa File Compilation',
        descEn: 'Structuring financial sponsor proof, affidavit, tuition transfer, and medical requirements.',
      },
      {
        titleBn: 'Pre-Departure ও আবাসন গাইডলাইন',
        descBn: 'ভিসা পাওয়ার পর স্টুডেন্ট এয়ার টিকেট, এয়ারপোর্ট পিকআপ ও শুরুর দিনগুলোর গাইডলাইন দেওয়া হয়।',
        titleEn: 'Pre-Departure & Accommodation Briefing',
        descEn: 'Student airfare support, packing checklist, and arrival guidance after visa approval.',
      },
    ],
    processingTimeBn: 'অফার লেটার: ২–৬ সপ্তাহ | Student Visa প্রসেসিং: ৩–১২ সপ্তাহ (দেশ ভেদে)',
    processingTimeEn: 'Offer Letter: 2–6 weeks | Student Visa Processing: 3–12 weeks depending on country',
    feeNoteBn: 'ফি জানতে কনসাল্টেশন নিন (প্রাথমিক প্রোফাইল ইভ্যালুয়েশন সম্পূর্ণ ফ্রি)',
    feeNoteEn: 'Initial profile evaluation is free; transparent service terms shared upfront',
    countriesBn: ['মালয়েশিয়া', 'যুক্তরাজ্য (UK)', 'অস্ট্রেলিয়া', 'কানাডা', 'জার্মানি ও ইউরোপ', 'তুরস্ক', 'চীন', 'ভারত'],
    countriesEn: ['Malaysia', 'United Kingdom', 'Australia', 'Canada', 'Germany & Europe', 'Turkey', 'China', 'India'],
    relatedServiceSlugs: ['air-ticketing', 'tourist-visa', 'hotel-booking'],
    relatedBlogSlugs: ['student-visa-bank-solvency-guide-bangladesh', 'malaysia-travel-best-time-budget-guide'],
    seo: {
      titleBn: 'স্টুডেন্ট ভিসা কনসালটেন্সি | Visatrip Global',
      descriptionBn: 'বাংলাদেশ থেকে বিদেশে উচ্চশিক্ষার বিশ্ববিদ্যালয় ভর্তি, স্কলারশিপ, IELTS ও Bank Solvency গাইড — Visatrip Global Student Consultancy।',
      titleEn: 'Student Visa Consultancy Bangladesh | Visatrip Global',
      descriptionEn: 'Honest study abroad consultancy in Bangladesh — university admission, scholarships, IELTS guidance, and Student Visa support.',
      primaryKeyword: 'student visa consultancy',
    },
    faqs: [
      {
        questionBn: 'IELTS ছাড়া কি বিদেশে পড়তে যাওয়া সম্ভব?',
        answerBn: 'মালয়েশিয়া, ইউরোপের কিছু বিশ্ববিদ্যালয় এবং ইংরেজি মিডিয়াম (MOI) শিক্ষার্থীদের জন্য কিছু প্রোগ্রামে IELTS ছাড়াও ভর্তি সম্ভব। তবে UK, অস্ট্রেলিয়া বা কানাডার জন্য ভালো IELTS/PTE স্কোর অত্যন্ত গুরুত্বপূর্ণ।',
        questionEn: 'Can I study abroad without IELTS?',
        answerEn: 'Some universities in Malaysia, China, or Europe accept Medium of Instruction (MOI) or internal English tests, though IELTS/PTE remains essential for UK, Australia, and Canada.',
      },
      {
        questionBn: 'Study Gap থাকলে কি আবেদন করা যাবে?',
        answerBn: 'যৌক্তিক কারণ এবং চাকরি বা কোর্সের প্রমাণপত্র থাকলে ২–৫ বছরের Study Gap নিয়েও অনেক বিশ্ববিদ্যালয়ে আবেদন করা যায়।',
        questionEn: 'Can students with a study gap apply?',
        answerEn: 'Yes, many universities accept a 2–5 year gap when properly explained with work or training documentation.',
      },
      {
        questionBn: 'Student Visa-র জন্য Bank Solvency কত দিন পুরানো হতে হয়?',
        answerBn: 'দেশ ভেদে এটি ভিন্ন হয় — যেমন UK-তে অন্তত ২৮ দিন, আর কানাডা/ইউরোপ/অস্ট্রেলিয়ায় ৩ থেকে ৬ মাসের স্থিতিশীল ব্যাংক স্টেটমেন্ট দেখা হয়।',
        questionEn: 'How long must funds mature for Student Visa Bank Solvency?',
        answerEn: 'Maturity requirements depend on the country — e.g., 28 consecutive days for UK and 3–6 months of consistent transaction history for Canada, Australia, or Europe.',
      },
      {
        questionBn: 'টিউশন ফি কি এজেন্সির অ্যাকাউন্টে দিতে হবে?',
        answerBn: 'না, টিউশন ফি সরাসরি শিক্ষার্থীর বা অভিভাবকের ব্যাংক স্টুডেন্ট ফাইলের মাধ্যমে বিশ্ববিদ্যালয়ের অফিসিয়াল ব্যাংক অ্যাকাউন্টে পাঠানোই সবচেয়ে নিরাপদ।',
        questionEn: 'Should tuition fees be paid to the agency?',
        answerEn: 'No. Tuition deposits should always be remitted directly to the university official bank account via an authorized student bank file.',
      },
      {
        questionBn: 'কোন ইনটেকে (Intake) আবেদন করা ভালো?',
        answerBn: 'প্রধান ইনটেক সাধারণত সেপ্টেম্বর/অক্টোবর এবং জানুয়ারি/ফেব্রুয়ারি। কিছু দেশে মে/জুলাই ইনটেকও রয়েছে। অন্তত ৪–৬ মাস আগে প্রস্তুতি শুরু করা ভালো।',
        questionEn: 'When are the major university intakes?',
        answerEn: 'Primary intakes are September/October and January/February, with May/July available in several countries. Starting 4–6 months ahead is ideal.',
      },
      {
        questionBn: 'স্কলারশিপ পাওয়ার সুযোগ কতটুকু?',
        answerBn: 'ভালো একাডেমিক রেজাল্ট ও IELTS স্কোর থাকলে ১০% থেকে ৫০% বা তার বেশি মেধাভিত্তিক (Merit) টিউশন ফি ওয়েভার পাওয়া সম্ভব।',
        questionEn: 'Are scholarships available for Bangladeshi students?',
        answerEn: 'Strong academic results and IELTS scores often qualify students for 10% to 50%+ merit tuition waivers.',
      },
      {
        questionBn: 'প্রোফাইল ইভ্যালুয়েশন করতে কী কী তথ্য লাগবে?',
        answerBn: 'আপনার SSC/HSC/স্নাতক রেজাল্ট, পাসের সাল, IELTS স্কোর (থাকলে) এবং পছন্দের দেশ ও বাজেট জানালেই আমরা ফ্রি মূল্যায়ন করে দেব।',
        questionEn: 'What information is needed for a free profile evaluation?',
        answerEn: 'Share your SSC/HSC/Bachelor GPA, passing year, English score (if taken), preferred country, and approximate budget.',
      },
      {
        questionBn: 'Embassy ইন্টারভিউয়ের জন্য কি প্রস্তুতি নেওয়া হয়?',
        answerBn: 'হ্যাঁ, যেসব দেশে Credibility বা Visa Interview আছে সেগুলোর জন্য আমরা মক ইন্টারভিউ সেশন ও প্রশ্নোত্তর অনুশীলন করাই।',
        questionEn: 'Do you help prepare for Embassy visa interviews?',
        answerEn: 'Yes, we conduct mock interview practice for destinations requiring credibility or Embassy interviews.',
      },
    ],
  },
  {
    slug: 'hajj-umrah',
    icon: 'Landmark',
    theme: 'hajj',
    imageKey: 'saudiArabia',
    titleBn: 'হজ্জ ও ওমরাহ',
    titleEn: 'Hajj & Umrah Packages',
    shortDescBn: 'নিশ্চিন্ত, শরিয়াহসম্মত ও শান্তিপূর্ণ হজ্জ এবং ওমরাহ প্যাকেজ, অভিজ্ঞ মুয়াল্লেম ও স্বচ্ছ শিডিউল।',
    shortDescEn: 'Peaceful, well-organized Hajj & Umrah packages from Rajshahi division & Bangladesh with transparent schedules.',
    heroHeadingBn: 'পবিত্র হজ্জ ও ওমরাহ সফর হোক নিশ্চিন্ত, সুশৃঙ্খল ও শান্তিপূর্ণ',
    heroHeadingEn: 'Peaceful & Transparent Hajj and Umrah Pilgrimage Guidance',
    heroSubBn:
      'মসজিদুল হারাম ও মসজিদে নববীর কাছাকাছি মানসম্মত হোটেল অপশন, অভিজ্ঞ মুয়াল্লেম, স্বচ্ছ Payment Schedule এবং প্রতিটি আমলের সহজ গাইডলাইন।',
    heroSubEn:
      'Quality hotels near Masjid al-Haram & Masjid an-Nabawi, experienced group leaders, clear payment schedules, and practical spiritual guidance.',
    overviewBn:
      'পবিত্র কাবা ও মদিনা শরীফ জিয়ারত প্রতিটি মুমিনের জীবনের শ্রেষ্ঠ স্বপ্ন। Visatrip Global চাঁপাইনবাবগঞ্জ, রাজশাহী বিভাগসহ সারা দেশের হজ্জ ও ওমরাহ যাত্রীদের জন্য নিষ্ঠা, আমানতদারিতা এবং পূর্ণ স্বচ্ছতার সাথে ভিসা, ফ্লাইট, হোটেল, যাতায়াত, জিয়ারাহ এবং প্রশিক্ষণের ব্যবস্থা করে থাকে। প্যাকেজের প্রতিটি শর্ত, হোটেলের দূরত্ব এবং পেমেন্ট কিস্তি আগে থেকেই লিখিতভাবে জানানো হয়।',
    overviewEn:
      'Performing Hajj or Umrah is a sacred lifelong aspiration. Visatrip Global serves pilgrims from Chapai Nawabganj, Rajshahi division, and across Bangladesh with dedicated care — covering Umrah visa processing, flights, hotel selection with clearly stated distance from Haram, local transport, Ziyarah tours, and pre-departure orientation.',
    eligibilityBn: [
      'ন্যূনতম ৬ মাস মেয়াদসহ বৈধ বাংলাদেশি ই-পাসপোর্ট / এমআরপি পাসপোর্ট',
      'জাতীয় পরিচয়পত্র (NID) বা ১৮ বছরের নিচে জন্ম নিবন্ধন',
      'সদ্য তোলা সাদা ব্যাকগ্রাউন্ডের ছবি',
      'সৌদি হজ্জ ও ওমরাহ মন্ত্রণালয়ের সর্বশেষ স্বাস্থ্য ও ভ্যাকসিন নীতিমালা অনুসরণ',
    ],
    eligibilityEn: [
      'Valid Bangladeshi passport with at least 6 months validity',
      'National ID (NID) or Birth Certificate for minors',
      'Recent white-background photographs',
      'Compliance with current Saudi Ministry of Hajj & Umrah health guidelines',
    ],
    documentsBn: [
      'মূল পাসপোর্ট (ন্যূনতম ৬ মাস মেয়াদ)',
      'এনআইডি (NID) / জন্ম নিবন্ধনের ফটোকপি',
      '২ কপি সাদা ব্যাকগ্রাউন্ডের পাসপোর্ট সাইজ ছবি',
      'হজ্জ প্রাক-নিবন্ধন সার্টিফিকেট (শুধু হজ্জ যাত্রীদের জন্য)',
      'মেনিনজাইটিস/প্রয়োজনীয় টিকা সনদ (সর্বশেষ নির্দেশনা অনুযায়ী)',
      'মাহরাম সংক্রান্ত কাগজপত্র (প্রযোজ্য ক্ষেত্রে)',
    ],
    documentsEn: [
      'Original passport (minimum 6 months validity)',
      'Copy of National ID (NID) or Birth Certificate',
      'Two recent white-background passport photos',
      'Hajj Pre-Registration certificate (for Hajj pilgrims)',
      'Required vaccination certificate per latest Saudi guidelines',
      'Mahram documentation where applicable',
    ],
    steps: [
      {
        titleBn: 'প্যাকেজ নির্বাচন ও লিখিত শর্তাবলি',
        descBn: 'Economy, Standard বা VIP প্যাকেজের হোটেল দূরত্ব, ফ্লাইট ও পেমেন্ট শিডিউল দেখে বুকিং নিশ্চিত করুন।',
        titleEn: 'Package Selection & Written Terms',
        descEn: 'Review Economy, Standard, or VIP hotel distances, flight details, and payment schedule upfront.',
      },
      {
        titleBn: 'ওমরাহ/হজ্জ ভিসা ও ফ্লাইট কনফার্মেশন',
        descBn: 'পাসপোর্ট ও বায়োমেট্রিক সম্পন্ন করে অনুমোদিত প্রক্রিয়ায় ভিসা ও এয়ার টিকেট ইস্যু করা হয়।',
        titleEn: 'Visa Processing & Flight Confirmation',
        descEn: 'Passport biometrics, Umrah/Hajj visa issuance, and confirmed round-trip flight tickets.',
      },
      {
        titleBn: 'সফরের আগে ওমরাহ প্রশিক্ষণ ও দোয়া গাইড',
        descBn: 'ইহরাম বাঁধা, তাওয়াফ, সাঈ ও মদিনা জিয়ারতের নিয়ম নিয়ে হাতে-কলমে ওরিয়েন্টেশন দেওয়া হয়।',
        titleEn: 'Pre-Departure Orientation & Dua Guide',
        descEn: 'Practical session on Ihram, Tawaf, Sa’i, and Madinah etiquette before departure.',
      },
      {
        titleBn: 'অভিজ্ঞ মুয়াল্লেমের সাথে নিরাপদ সফর',
        descBn: 'ঢাকা এয়ারপোর্ট থেকে মক্কা-মদিনা যাতায়াত, জিয়ারাহ এবং দেশে ফেরা পর্যন্ত সার্বক্ষণিক তত্ত্বাবধান।',
        titleEn: 'Guided Pilgrimage with Experienced Moallem',
        descEn: 'Full on-ground support from Dhaka departure through Makkah, Madinah, Ziyarah, and return.',
      },
    ],
    processingTimeBn: 'ওমরাহ ভিসা সাধারণত ৩–৭ কর্মদিবস | হজ্জ: সরকারি নিবন্ধন ও মৌসুমী সময়সূচি অনুযায়ী',
    processingTimeEn: 'Umrah Visa: typically 3–7 working days | Hajj: per official Ministry schedule',
    feeNoteBn: 'মৌসুম, এয়ারলাইনস ও হোটেল দূরত্ব ভেদে প্যাকেজ মূল্য নির্ধারিত হয় — বর্তমান শিডিউল জানতে যোগাযোগ করুন',
    feeNoteEn: 'Pricing depends on season, airline, and hotel distance from Haram — contact us for current schedules',
    relatedServiceSlugs: ['air-ticketing', 'hotel-booking', 'tourist-visa'],
    relatedBlogSlugs: ['umrah-jatra-10-important-things-to-know', 'dubai-tourist-visa-documents-bangladesh'],
    seo: {
      titleBn: 'হজ্জ ও ওমরাহ প্যাকেজ বাংলাদেশ | Visatrip Global',
      descriptionBn: 'চাঁপাইনবাবগঞ্জ ও রাজশাহী বিভাগ থেকে বিশ্বস্ত হজ্জ ও ওমরাহ প্যাকেজ — হারামের কাছে হোটেল, অভিজ্ঞ মুয়াল্লেম ও স্বচ্ছ পেমেন্ট শিডিউল | Visatrip Global।',
      titleEn: 'Hajj & Umrah Package Bangladesh | Visatrip Global',
      descriptionEn: 'Trusted Hajj and Umrah packages from Chapai Nawabganj & Rajshahi division with hotels near Haram and experienced Moallem guidance.',
      primaryKeyword: 'ওমরাহ প্যাকেজ',
    },
    faqs: [
      {
        questionBn: 'ওমরাহ প্যাকেজে হোটেল মসজিদুল হারাম থেকে কত দূরে থাকে?',
        answerBn: 'প্যাকেজ ক্যাটাগরি (Economy, Standard, VIP) অনুযায়ী হোটেলের দূরত্ব ভিন্ন হয় — VIP প্যাকেজে ০–২৫০ মিটার, Standard-এ ৩০০–৬০০ মিটার এবং Economy-তে শাটল/হাঁটা দূরত্বে থাকে। বুকিংয়ের আগেই হোটেলের নাম ও দূরত্ব জানানো হয়।',
        questionEn: 'How far are the hotels from Masjid al-Haram?',
        answerEn: 'Distance depends on tier: VIP (0–250m), Standard (300–600m), and Economy (walking or shuttle distance). Exact hotel options and distances are confirmed before booking.',
      },
      {
        questionBn: 'প্যাকেজের মধ্যে কি খাবার ও জিয়ারাহ অন্তর্ভুক্ত থাকে?',
        answerBn: 'প্যাকেজ ভেদে বাঙালি খাবারসহ বা খাবার ছাড়া উভয় অপশনই থাকে। মক্কা ও মদিনার ঐতিহাসিক স্থানসমূহে জিয়ারাহ প্রায় সব গ্রুপ প্যাকেজেই অন্তর্ভুক্ত থাকে।',
        questionEn: 'Are meals and Ziyarah tours included?',
        answerEn: 'Both meal-inclusive (Bangladeshi cuisine) and room-only options are available. Guided Ziyarah tours in Makkah and Madinah are included in our group packages.',
      },
      {
        questionBn: 'বয়স্ক মা-বাবার সাথে গেলে কি আলাদা যত্ন বা হুইলচেয়ার সাপোর্ট পাওয়া যায়?',
        answerBn: 'অবশ্যই। এয়ারপোর্টে হুইলচেয়ার রিকোয়েস্ট এবং মক্কা-মদিনায় বয়স্ক যাত্রীদের স্বাচ্ছন্দ্যের জন্য আমাদের গ্রুপ লিডার ও মুয়াল্লেম বিশেষ নজর রাখেন।',
        questionEn: 'Is wheelchair and elder care assistance available?',
        answerEn: 'Yes, we pre-arrange airline wheelchair assistance and our Moallem provides attentive support for senior pilgrims.',
      },
      {
        questionBn: 'কত দিনের ওমরাহ প্যাকেজ সাধারণত হয়?',
        answerBn: 'সাধারণত ১০ দিন, ১৪ দিন এবং ১৫ দিনের গ্রুপ ও কাস্টম ফ্যামিলি ওমরাহ প্যাকেজ পরিচালনা করা হয়।',
        questionEn: 'What durations are available for Umrah packages?',
        answerEn: 'Standard group and custom family Umrah packages are typically 10, 14, or 15 days.',
      },
      {
        questionBn: 'ফ্যামিলি নিয়ে আলাদা কাস্টম ওমরাহ প্যাকেজ করা যাবে কি?',
        answerBn: 'হ্যাঁ, আপনারা নিজেদের পছন্দমতো তারিখ, ফ্লাইট ও হোটেল বেছে নিয়ে কাস্টম ফ্যামিলি ওমরাহ প্যাকেজ নিতে পারবেন।',
        questionEn: 'Can we book a custom private Umrah package for our family?',
        answerEn: 'Yes, private family Umrah packages can be tailored to your preferred travel dates, airline, and hotel tier.',
      },
      {
        questionBn: 'হজ্জের প্রাক-নিবন্ধন (Pre-Registration) কীভাবে করতে হয়?',
        answerBn: 'বৈধ পাসপোর্ট/এনআইডি ও সরকারি নির্ধারিত ফি জমা দিয়ে হজ্জের প্রাক-নিবন্ধন সম্পন্ন করতে হয়। আমাদের অফিসে এসে পূর্ণ গাইডলাইন নিতে পারেন।',
        questionEn: 'How does Hajj pre-registration work?',
        answerEn: 'Hajj pre-registration requires valid NID/passport and government-mandated deposit via authorized channels. Our office guides you through every step.',
      },
      {
        questionBn: 'পেমেন্ট কি কিস্তিতে পরিশোধ করা যায়?',
        answerBn: 'হ্যাঁ, বুকিং কনফার্মেশন, ভিসা-টিকেট ইস্যু এবং ফ্লাইটের পূর্বে — এই ধাপগুলোতে স্বচ্ছ Payment Schedule অনুযায়ী পরিশোধ করা যায় এবং প্রতিটি কিস্তির রিসিট দেওয়া হয়।',
        questionEn: 'Is there a staged payment schedule?',
        answerEn: 'Yes, payments follow a transparent milestone schedule (booking, visa/ticket issuance, pre-departure) with official receipts at every step.',
      },
      {
        questionBn: 'রাজশাহী বিভাগ ও চাঁপাইনবাবগঞ্জ থেকে ঢাকা এয়ারপোর্ট যাওয়ার ব্যবস্থাপনা কেমন?',
        answerBn: 'গ্রুপ যাত্রীদের জন্য প্রয়োজনে সমন্বিত রিপোর্টিং টাইম ও এয়ারপোর্ট অ্যাসিস্ট্যান্স নির্দেশনা দেওয়া হয়, যাতে প্রথমবার ভ্রমণকারীরাও নিশ্চিন্ত থাকেন।',
        questionEn: 'How do pilgrims from Chapai Nawabganj & Rajshahi coordinate Dhaka departure?',
        answerEn: 'We provide clear reporting timelines, pre-departure briefing, and Dhaka airport coordination so first-time pilgrims travel with complete peace of mind.',
      },
    ],
  },
  {
    slug: 'india-visa',
    icon: 'Stethoscope',
    imageKey: 'india',
    titleBn: 'India Visa Processing',
    titleEn: 'India Visa Processing (Medical & Tourist)',
    shortDescBn: 'ভারতীয় মেডিকেল (রোগী ও অ্যাটেনডেন্ট) এবং ট্যুরিস্ট ভিসা আবেদন ও IVAC Appointment সহায়তা।',
    shortDescEn: 'Indian Medical Visa (patient + attendant) and Tourist Visa filing & IVAC Appointment assistance.',
    heroHeadingBn: 'ভারতীয় মেডিকেল ও ট্যুরিস্ট ভিসা প্রসেসিং — দ্রুত ও নির্ভুল গাইডলাইন',
    heroHeadingEn: 'India Medical & Tourist Visa Processing from Bangladesh',
    heroSubBn:
      'ভারতের শীর্ষ হাসপাতালের Invitation Letter, রোগী ও অ্যাটেনডেন্ট ডকুমেন্ট সাজানো এবং IVAC ফাইল প্রস্তুতিতে বিশ্বস্ত সহযোগিতা।',
    heroSubEn:
      'Hospital invitation coordination, patient & medical attendant documentation, and error-free IVAC application filing.',
    overviewBn:
      'চাঁপাইনবাবগঞ্জ ও রাজশাহী বিভাগ থেকে প্রতি বছর অসংখ্য মানুষ চিকিৎসা ও ভ্রমণের জন্য ভারত যান। বিশেষ করে মেডিকেল ভিসার ক্ষেত্রে সঠিক ডাক্তারি প্রেসক্রিপশন, হাসপাতালের Appointment/Invitation Letter এবং অ্যাটেনডেন্ট ডকুমেন্ট না থাকলে ফাইল জটিলতায় পড়ে। Visatrip Global নির্ভুলভাবে অনলাইন আবেদন, ডকুমেন্ট চেকলিস্ট ও IVAC-এ ফাইল জমার সঠিক নির্দেশনা দিয়ে সহযোগিতা করে। ভিসা অনুমোদনের ক্ষমতা সম্পূর্ণরূপে ভারতীয় হাইকমিশনের।',
    overviewEn:
      'Thousands of travelers from Chapai Nawabganj and Rajshahi visit India annually for specialized medical treatment and tourism. Visatrip Global assists with accurate online applications, Indian hospital appointment/invitation letters, medical attendant documentation, and IVAC submission preparation. Visa approval is solely at the discretion of the High Commission of India.',
    eligibilityBn: [
      'ন্যূনতম ৬ মাস মেয়াদসহ বৈধ বাংলাদেশি পাসপোর্ট',
      'মেডিকেল ভিসার জন্য বাংলাদেশের নিবন্ধিত চিকিৎসকের প্রেসক্রিপশন ও রিপোর্ট',
      'ভারতের অনুমোদিত হাসপাতালের Appointment / Invitation Letter (মেডিকেল ভিসার জন্য)',
      'সর্বশেষ ইউটিলিটি বিল (বিদ্যুৎ/গ্যাস/পানি) ও এনআইডি কপি',
    ],
    eligibilityEn: [
      'Valid Bangladeshi passport with minimum 6 months validity',
      'Registered Bangladeshi physician prescription & diagnostic reports (for Medical Visa)',
      'Indian hospital Appointment / Invitation Letter (for Medical Visa)',
      'Recent utility bill (electricity/gas/water) and National ID copy',
    ],
    documentsBn: [
      'মূল পাসপোর্ট (এবং পূর্ববর্তী সকল পুরানো পাসপোর্ট)',
      '২×২ ইঞ্চি সাদা ব্যাকগ্রাউন্ডের সাম্প্রতিক রঙিন ছবি',
      'জাতীয় পরিচয়পত্র (NID) বা জন্ম নিবন্ধন কপি',
      'সর্বশেষ মাসের ইউটিলিটি বিল (বিদ্যুৎ/পানি/গ্যাস/টেলিফোন)',
      'বিগত ৩–৬ মাসের ব্যাংক স্টেটমেন্ট অথবা ডলার এনডোর্সমেন্ট কপি',
      'পেশার প্রমাণপত্র (চাকরির NOC / Trade License / স্টুডেন্ট আইডি)',
      'মেডিকেল ভিসা: বাংলাদেশের ডাক্তারের রেফারেল, রিপোর্ট ও ভারতের হাসপাতালের Invitation Letter',
      'অ্যাটেনডেন্ট ভিসা: রোগীর সাথে সম্পর্কের প্রমাণপত্র ও রোগীর ভিসা/আবেদন কপি',
    ],
    documentsEn: [
      'Original passport (plus all previous expired passports)',
      'Recent 2×2 inch white-background color photograph',
      'National ID (NID) or Birth Certificate copy',
      'Recent utility bill copy (electricity/water/gas)',
      'Last 3–6 months Bank Statement or Dollar Endorsement',
      'Occupation proof (Job NOC / Trade License / Student ID)',
      'Medical Visa: Local doctor referral, diagnostic reports & Indian hospital Invitation Letter',
      'Medical Attendant Visa: Proof of relationship and patient visa/application details',
    ],
    steps: [
      {
        titleBn: 'কাগজপত্র ও হাসপাতাল ইনভিটেশন যাচাই',
        descBn: 'রোগীর রিপোর্ট দেখে প্রয়োজনে ভারতের হাসপাতালের (কলকাতা, ভেলোর, চেন্নাই, দিল্লি) ইনভিটেশন লেটার সংগ্রহে সহায়তা।',
        titleEn: 'Document & Hospital Invitation Review',
        descEn: 'Checking prescriptions and assisting with hospital invitation letters (Kolkata, Vellore, Chennai, Delhi).',
      },
      {
        titleBn: 'নির্ভুল অনলাইন ফর্ম পূরণ',
        descBn: 'পাসপোর্ট, পোর্ট অব এন্ট্রি (বেনাপোল/বাই এয়ার/সোনামসজিদ বা প্রযোজ্য পোর্ট) ও তথ্য নির্ভুলভাবে পূরণ।',
        titleEn: 'Error-Free Online Form Filing',
        descEn: 'Accurate entry of passport data, port of entry, and patient/attendant linkage.',
      },
      {
        titleBn: 'IVAC Appointment ও ফি গাইডলাইন',
        descBn: 'রাজশাহী বা নিকটস্থ IVAC সেন্টারে ফাইল জমা দেওয়ার সময়সূচি ও ডকুমেন্ট সাজিয়ে দেওয়া।',
        titleEn: 'IVAC Appointment & Submission Prep',
        descEn: 'Organizing your file sequence and appointment workflow for Rajshahi or nearest IVAC.',
      },
      {
        titleBn: 'ভিসা সংগ্রহ ও ট্রাভেল সাপোর্ট',
        descBn: 'ভিসা পাওয়ার পর এয়ার টিকেট, হোটেল বুকিং ও ট্রান্সপোর্ট গাইডলাইনে সহায়তা।',
        titleEn: 'Post-Visa Travel Support',
        descEn: 'Assistance with air tickets, hospital-area hotels, and transit guidance after approval.',
      },
    ],
    processingTimeBn: 'IVAC স্লট ও হাইকমিশনের বর্তমান নীতিমালা সাপেক্ষে (জরুরি মেডিকেল কেসে অগ্রাধিকারের নির্দেশনা দেওয়া হয়)',
    processingTimeEn: 'Subject to current IVAC slot availability and High Commission processing timelines',
    feeNoteBn: 'ফি জানতে কনসাল্টেশন নিন (সরকারি IVAC ফি ও সার্ভিস চার্জ আলাদাভাবে জানানো হয়)',
    feeNoteEn: 'Contact us for current IVAC government fee and transparent processing service charge',
    relatedServiceSlugs: ['air-ticketing', 'hotel-booking', 'tourist-visa'],
    relatedBlogSlugs: ['india-medical-visa-process-bangladesh-guide'],
    seo: {
      titleBn: 'ভারতীয় মেডিকেল ও ট্যুরিস্ট ভিসা | Visatrip Global',
      descriptionBn: 'বাংলাদেশ ও চাঁপাইনবাবগঞ্জ থেকে ভারতীয় মেডিকেল (রোগী ও অ্যাটেনডেন্ট) ও ট্যুরিস্ট ভিসা প্রসেসিং, হাসপাতাল ইনভিটেশন ও IVAC গাইড — Visatrip Global।',
      titleEn: 'India Medical & Tourist Visa Bangladesh | Visatrip Global',
      descriptionEn: 'Complete assistance for India Medical Visa (patient & attendant), hospital invitation letters, and Tourist Visa via IVAC from Bangladesh.',
      primaryKeyword: 'India medical visa from Bangladesh',
    },
    faqs: [
      {
        questionBn: 'একজন রোগীর সাথে কতজন Medical Attendant যেতে পারেন?',
        answerBn: 'সাধারণত একজন রোগীর সাথে সর্বোচ্চ ৩ জন পর্যন্ত পরিবারের নিকটাত্মীয় Medical Attendant ভিসার জন্য আবেদন করতে পারেন (হাইকমিশনের বর্তমান নিয়ম সাপেক্ষে)।',
        questionEn: 'How many Medical Attendants can accompany one patient?',
        answerEn: 'Usually up to 3 close family members may apply as Medical Attendants alongside a patient, subject to current High Commission guidelines.',
      },
      {
        questionBn: 'ভারতের হাসপাতালের Invitation Letter কীভাবে পাব?',
        answerBn: 'রোগীর পাসপোর্ট কপি, বাংলাদেশের ডাক্তারের প্রেসক্রিপশন ও রিপোর্ট পাঠালে আমরা সংশ্লিষ্ট হাসপাতাল (যেমন Apollo, CMC Vellore, Narayana, Medica ইত্যাদি) থেকে Appointment/Invitation Letter সংগ্রহে সহায়তা করি।',
        questionEn: 'How do I obtain an Indian hospital Invitation Letter?',
        answerEn: 'By submitting the patient passport copy and local doctor reports, we coordinate appointment/invitation letters from major hospitals like Apollo, CMC Vellore, Narayana, or Medica.',
      },
      {
        questionBn: 'চাঁপাইনবাবগঞ্জের বাসিন্দারা কোন IVAC সেন্টারে ফাইল জমা দেবেন?',
        answerBn: 'চাঁপাইনবাবগঞ্জ ও রাজশাহী বিভাগের আবেদনকারীরা সাধারণত রাজশাহী IVAC সেন্টারে আবেদন জমা দেন।',
        questionEn: 'Which IVAC center serves Chapai Nawabganj applicants?',
        answerEn: 'Applicants from Chapai Nawabganj and Rajshahi division typically submit at the Rajshahi IVAC center.',
      },
      {
        questionBn: 'পোর্ট অব এন্ট্রি (Port of Entry) কীভাবে নির্বাচন করব?',
        answerBn: 'আপনার ভ্রমণের ধরন অনুযায়ী By Air (কলকাতা/দিল্লি/চেন্নাই) অথবা অনুমোদিত স্থলবন্দর (বেনাপোল/হরিদাসপুর ইত্যাদি) বেছে নিতে হয়।',
        questionEn: 'How should I select the Port of Entry?',
        answerEn: 'Choose By Air or an authorized land port (such as Haridaspur/Benapole) matching your planned travel route.',
      },
      {
        questionBn: 'পুরানো পাসপোর্ট হারিয়ে গেলে কী করতে হবে?',
        answerBn: 'পুরানো পাসপোর্ট হারিয়ে গেলে নিকটস্থ থানায় সাধারণ ডায়েরি (GD) করে তার মূল কপি ও ইংরেজি অনুবাদ আবেদনের সাথে সংযুক্ত করতে হয়।',
        questionEn: 'What if an expired old passport is lost?',
        answerEn: 'You must file a General Diary (GD) at the local police station and submit the GD copy with English translation.',
      },
      {
        questionBn: 'ভিসা ফর্ম পূরণে সামান্য ভুল হলে কি ফাইল জমা নেওয়া হয়?',
        answerBn: 'নাম, জন্ম তারিখ, পাসপোর্ট নম্বর বা পিতার-মাতার নামে বানান ভুল থাকলে IVAC-এ ফাইল গ্রহণ করা হয় না বা ভিসা বিলম্বিত হয়। তাই জমা দেওয়ার আগে দুবার যাচাই করা জরুরি।',
        questionEn: 'What happens if there is a spelling mistake on the IVAC form?',
        answerEn: 'Mismatches in passport number, dates, or parent names can cause rejection at the counter or delays. Double-checking before submission prevents re-filing.',
      },
      {
        questionBn: 'ভারতে চিকিৎসা ও থাকার হোটেল বুকিংয়েও কি সাহায্য করেন?',
        answerBn: 'হ্যাঁ, কলকাতা, চেন্নাই, ভেলোর বা দিল্লির হাসপাতালের আশপাশে নিরাপদ ও সাশ্রয়ী হোটেল এবং ফ্লাইট টিকেট বুকিংয়ে আমরা সহায়তা করি।',
        questionEn: 'Do you also arrange flights and hotels near Indian hospitals?',
        answerEn: 'Yes, we assist with flight bookings and clean, convenient hotels near hospitals in Kolkata, Chennai, Vellore, and Delhi.',
      },
      {
        questionBn: 'জরুরি মেডিকেল ভিসার জন্য কি আলাদা ব্যবস্থা আছে?',
        answerBn: 'জীবন-সংশয়পূর্ণ বা জরুরি চিকিৎসার ক্ষেত্রে প্রমাণপত্রসহ Emergency Medical ক্যাটাগরির সঠিক প্রক্রিয়া অনুসরণে আমরা সর্বোচ্চ দ্রুত গাইডলাইন দিই।',
        questionEn: 'Is there guidance for urgent medical cases?',
        answerEn: 'Yes, for critical medical emergencies with supporting medical records, we guide families through priority emergency documentation promptly.',
      },
    ],
  },
  {
    slug: 'air-ticketing',
    icon: 'Plane',
    imageKey: 'hero',
    titleBn: 'Air Ticketing',
    titleEn: 'Air Ticketing (Domestic & International)',
    shortDescBn: 'দেশি ও আন্তর্জাতিক সকল রুটে নির্ভরযোগ্য Air Ticket, রি-ইস্যু ও ডেট চেঞ্জ সাপোর্ট।',
    shortDescEn: 'Domestic and international flight tickets with transparent fares, baggage clarity, and date-change support.',
    heroHeadingBn: 'দেশি ও আন্তর্জাতিক Air Ticket — স্বচ্ছ ভাড়া ও নির্ভরযোগ্য সাপোর্ট',
    heroHeadingEn: 'Domestic & International Air Ticketing with Reliable Support',
    heroSubBn:
      'ঢাকা-রাজশাহী-কক্সবাজার থেকে শুরু করে সৌদি আরব, দুবাই, মালয়েশিয়া, ভারত ও ইউরোপ — সকল রুটে আসল ভাড়া ও তাৎক্ষণিক ই-টিকেট।',
    heroSubEn:
      'Instant verified e-tickets for domestic Bangladesh routes and international flights to GCC, Asia, India, and Europe.',
    overviewBn:
      'অনলাইনে টিকেট কাটতে গিয়ে অনেকেই ব্যাগেজ নিয়ম, ট্রানজিট ভিসা বা ডেট চেঞ্জের জটিলতায় পড়েন। Visatrip Global চাঁপাইনবাবগঞ্জ ও সারা বাংলাদেশের যাত্রীদের জন্য Domestic এবং International সকল এয়ারলাইনসের (Biman, US-Bangla, Novoair, Saudia, Emirates, Qatar Airways, Air Arabia, Malaysia Airlines, IndiGo ইত্যাদি) নির্ভুল ভাড়া যাচাই, সুবিধাজনক ট্রানজিট রুট নির্বাচন এবং ভ্রমণ পরবর্তী সাপোর্ট নিশ্চিত করে।',
    overviewEn:
      'Booking flights without checking baggage allowances, transit rules, or refund penalties can be costly. Visatrip Global provides transparent domestic and international air ticketing across major carriers (Biman, US-Bangla, Saudia, Emirates, Qatar Airways, Malaysia Airlines, IndiGo, and more) with full post-booking assistance.',
    eligibilityBn: [
      'অভ্যন্তরীণ ফ্লাইটের জন্য জাতীয় পরিচয়পত্র (NID) বা পাসপোর্ট কপি',
      'আন্তর্জাতিক ফ্লাইটের জন্য বৈধ পাসপোর্ট ও গন্তব্যের ভিসা কপি',
      'ওয়ার্কার বা স্টুডেন্ট স্পেশাল ফেয়ারের জন্য প্রযোজ্য ভিসা/অফার লেটার',
    ],
    eligibilityEn: [
      'National ID (NID) or passport copy for domestic flights',
      'Valid passport and destination visa copy for international routes',
      'Work Permit or Student Visa copy for eligible special baggage fares',
    ],
    documentsBn: [
      'পাসপোর্টের তথ্য পাতার স্পষ্ট ছবি (আন্তর্জাতিক ফ্লাইট)',
      'ভিসা কপি (ট্রানজিট ও ব্যাগেজ নিয়ম যাচাইয়ের জন্য)',
      'যাত্রীর সচল মোবাইল নম্বর ও ইমেইল',
    ],
    documentsEn: [
      'Clear photo of passport bio page (international flights)',
      'Visa copy (to verify transit rules and eligible fares)',
      'Active mobile number and email address',
    ],
    steps: [
      {
        titleBn: 'রুট ও তারিখ জানান',
        descBn: 'নিচের ফর্মে বা WhatsApp-এ আপনার গন্তব্য, তারিখ ও যাত্রীর সংখ্যা জানান।',
        titleEn: 'Share Route & Dates',
        descEn: 'Submit origin, destination, dates, and passenger count via our enquiry form or WhatsApp.',
      },
      {
        titleBn: 'এয়ারলাইনস ও ব্যাগেজ তুলনা',
        descBn: 'একাধিক এয়ারলাইনসের আসল ভাড়া, ট্রানজিট সময় ও ব্যাগেজ অ্যালোয়েন্স যাচাই করে অপশন পাঠানো হয়।',
        titleEn: 'Compare Airlines & Baggage',
        descEn: 'We share live fare options with transparent baggage, transit time, and refund rules.',
      },
      {
        titleBn: 'পেমেন্ট ও তাৎক্ষণিক ই-টিকেট',
        descBn: 'নিশ্চিত করার পর অফিসিয়াল PNR নম্বরসহ ভেরিফায়েড ই-টিকেট PDF পাঠিয়ে দেওয়া হয়।',
        titleEn: 'Confirmation & Instant e-Ticket',
        descEn: 'Receive your verified e-ticket PDF with airline PNR immediately upon payment.',
      },
      {
        titleBn: 'ফ্লাইটের আগে রিমাইন্ডার ও সাপোর্ট',
        descBn: 'শিডিউল পরিবর্তন, ওয়েব চেক-ইন বা ডেট চেঞ্জ প্রয়োজনে সার্বক্ষণিক সহায়তা।',
        titleEn: 'Pre-Flight & Date-Change Support',
        descEn: 'Ongoing support for airline schedule changes, web check-in, or re-issuance.',
      },
    ],
    processingTimeBn: '১৫ মিনিট থেকে ২ ঘণ্টার মধ্যে ই-টিকেট ডেলিভারি',
    processingTimeEn: 'e-Ticket confirmation within 15 minutes to 2 hours',
    feeNoteBn: 'তাৎক্ষণিক এয়ারলাইনস লাইভ ভাড়া অনুযায়ী (কোনো Hidden Charge নেই)',
    feeNoteEn: 'Based on live airline fare with zero hidden charges',
    relatedServiceSlugs: ['hotel-booking', 'tourist-visa', 'hajj-umrah'],
    relatedBlogSlugs: ['malaysia-travel-best-time-budget-guide', 'umrah-jatra-10-important-things-to-know'],
    seo: {
      titleBn: 'এয়ার টিকেট চাঁপাইনবাবগঞ্জ ও বাংলাদেশ | Visatrip Global',
      descriptionBn: 'চাঁপাইনবাবগঞ্জ ও বাংলাদেশ থেকে দেশি ও আন্তর্জাতিক Air Ticket বুকিং — স্বচ্ছ ভাড়া, ব্যাগেজ গাইড ও তাৎক্ষণিক ই-টিকেট | Visatrip Global।',
      titleEn: 'Air Ticketing Chapai Nawabganj | Visatrip Global',
      descriptionEn: 'Book verified domestic and international air tickets from Chapai Nawabganj with honest fares, baggage clarity, and post-booking support.',
      primaryKeyword: 'air ticket Chapai Nawabganj',
    },
    faqs: [
      {
        questionBn: 'আমি কি PNR নম্বর দিয়ে এয়ারলাইনসের ওয়েবসাইটে টিকেট যাচাই করতে পারব?',
        answerBn: 'হ্যাঁ, আমরা প্রতিটি টিকেটের আসল Airline PNR নম্বর দিই, যা দিয়ে আপনি সরাসরি সংশ্লিষ্ট এয়ারলাইনসের ওয়েবসাইট বা অ্যাপে টিকেট যাচাই করতে পারবেন।',
        questionEn: 'Can I verify my ticket on the airline website using the PNR?',
        answerEn: 'Yes, every ticket comes with an authentic airline PNR verifiable directly on the carrier official website.',
      },
      {
        questionBn: 'স্টুডেন্ট বা প্রবাসী কর্মীদের জন্য কি অতিরিক্ত ব্যাগেজ অফার থাকে?',
        answerBn: 'কিছু আন্তর্জাতিক এয়ারলাইনসে Student Fare এবং Migrant Worker Fare-এ অতিরিক্ত ব্যাগেজ সুবিধা থাকে। পাসপোর্ট ও ভিসা দেখিয়ে আমাদের কাছে যাচাই করে নিতে পারেন।',
        questionEn: 'Do students or migrant workers get extra baggage fares?',
        answerEn: 'Selected airlines offer special extra-baggage fares for students and first-time overseas workers. Share your visa copy so we can check eligibility.',
      },
      {
        questionBn: 'ভিসা আবেদনের জন্য ডামি/ইটিনেরারি টিকেট বুকিং দেওয়া হয় কি?',
        answerBn: 'হ্যাঁ, যেসব Embassy ভিসার আগে Flight Itinerary চায়, আমরা নির্ভুল Itinerary রিজার্ভেশন তৈরি করে দিই।',
        questionEn: 'Do you provide flight itineraries for visa applications?',
        answerEn: 'Yes, we arrange proper verifiable flight itineraries required for Embassy visa submissions.',
      },
      {
        questionBn: 'টিকেটের তারিখ পরিবর্তন (Date Change) বা রিফান্ড করা যাবে কি?',
        answerBn: 'এয়ারলাইনসের ফেয়ার রুল অনুযায়ী ডেট চেঞ্জ বা রিফান্ড করা যায়। টিকেট কাটার আগেই রিফান্ডেবল নাকি নন-রিফান্ডেবল তা আমরা স্পষ্টভাবে জানিয়ে দিই।',
        questionEn: 'Can tickets be rescheduled or refunded?',
        answerEn: 'Rescheduling and refunds follow airline fare rules. We clearly explain refundability and change penalties before you confirm.',
      },
      {
        questionBn: 'রাজশাহী থেকে ঢাকা অভ্যন্তরীণ ফ্লাইটের টিকেট পাওয়া যায় কি?',
        answerBn: 'হ্যাঁ, রাজশাহী-ঢাকা, ঢাকা-কক্সবাজার, ঢাকা-সিলেট ও ঢাকা-চট্টগ্রামসহ বাংলাদেশের সকল অভ্যন্তরীণ রুটের টিকেট আমরা ইস্যু করি।',
        questionEn: 'Do you issue Rajshahi to Dhaka domestic flight tickets?',
        answerEn: 'Yes, we issue tickets for Rajshahi–Dhaka and all domestic routes across Bangladesh.',
      },
      {
        questionBn: 'হঠাৎ ফ্লাইট শিডিউল পরিবর্তন হলে আপনারা কি জানান?',
        answerBn: 'হ্যাঁ, এয়ারলাইনস থেকে কোনো সময় পরিবর্তনের নোটিফিকেশন এলে আমরা দ্রুত WhatsApp ও কলে জানিয়ে দিই।',
        questionEn: 'Do you notify passengers of airline schedule changes?',
        answerEn: 'Yes, we alert passengers promptly via WhatsApp and phone if an airline updates flight timing.',
      },
      {
        questionBn: 'কত আগে টিকেট কাটলে কম ভাড়ায় পাওয়া যায়?',
        answerBn: 'আন্তর্জাতিক ফ্লাইটের জন্য সাধারণত ভ্রমণের ৩–৬ সপ্তাহ আগে টিকেট কাটলে তুলনামূলক সাশ্রয়ী ভাড়া পাওয়া যায়।',
        questionEn: 'How early should I book for better international fares?',
        answerEn: 'Booking 3 to 6 weeks in advance typically secures more competitive international airfares.',
      },
      {
        questionBn: 'টিকেট কাটার পেমেন্ট কীভাবে করব?',
        answerBn: 'অফিসে সরাসরি, ব্যাংক ট্রান্সফার, bKash বা Nagad-এর মাধ্যমে অফিসিয়াল রিসিটসহ পেমেন্ট করতে পারবেন।',
        questionEn: 'What payment methods are accepted for air tickets?',
        answerEn: 'Payments are accepted in-office, via Bank Transfer, bKash, or Nagad with official receipts.',
      },
    ],
  },
  {
    slug: 'hotel-booking',
    icon: 'Building2',
    imageKey: 'singapore',
    titleBn: 'Hotel Booking',
    titleEn: 'Worldwide Hotel Booking',
    shortDescBn: 'মক্কা-মদিনা, দুবাই, মালয়েশিয়া, থাইল্যান্ড, ভারত ও দেশে নিরাপদ ও ভেরিফায়েড হোটেল বুকিং।',
    shortDescEn: 'Verified hotel bookings in Makkah, Madinah, Dubai, Malaysia, Thailand, India, and Bangladesh.',
    heroHeadingBn: 'দেশে ও বিদেশে নিরাপদ, যাচাইকৃত Hotel Booking সেবা',
    heroHeadingEn: 'Verified Domestic & International Hotel Reservations',
    heroSubBn:
      'পরিবার, চিকিৎসা, ব্যবসা বা ওমরাহ সফর — আপনার বাজেট ও লোকেশন অনুযায়ী সঠিক হোটেল নির্বাচন ও কনফার্ম ভাউচার।',
    heroSubEn:
      'Curated, confirmed hotel stays matched to your exact location, budget, and family comfort needs.',
    overviewBn:
      'অপরিচিত শহরে গিয়ে লোকেশন বা হোটেলের মান নিয়ে যেন কোনো বিড়ম্বনায় পড়তে না হয়, সেজন্য Visatrip Global ভেরিফায়েড হোটেল পার্টনারদের মাধ্যমে বাজেট থেকে ৫-তারকা মানের হোটেল বুকিং করে দেয়। বিশেষ করে মক্কা-মদিনায় হারামের দূরত্ব, ভারতের হাসপাতালের কাছাকাছি হোটেল এবং দুবাই-থাইল্যান্ড-মালয়েশিয়ার ফ্যামিলি হোটেল নির্বাচনে আমরা বিশেষ গুরুত্ব দিই।',
    overviewEn:
      'Arriving in a new city should feel calm and predictable. Visatrip Global books verified budget to 5-star hotels globally — prioritizing safe family locations, verified walking distance to Haram in Makkah/Madinah, proximity to hospitals in India, and visa-compliant hotel vouchers.',
    eligibilityBn: [
      'অতিথির নাম (পাসপোর্ট বা এনআইডি অনুযায়ী)',
      'চেক-ইন ও চেক-আউট তারিখ এবং রুমের ধরন',
      'প্রযোজ্য ক্ষেত্রে পাসপোর্ট কপি',
    ],
    eligibilityEn: [
      'Guest full name matching passport or NID',
      'Check-in/check-out dates and room configuration',
      'Passport copy for international reservations',
    ],
    documentsBn: [
      'অতিথির পাসপোর্ট বা এনআইডি কপি',
      'ভ্রমণের তারিখ ও শহর',
      'বিশেষ চাহিদা (ব্রেকফাস্ট, টুইন/ডাবল বেড, এয়ারপোর্ট পিকআপ)',
    ],
    documentsEn: [
      'Guest passport or NID copy',
      'Destination city and stay dates',
      'Preferences (breakfast, twin/double bed, airport transfer)',
    ],
    steps: [
      {
        titleBn: 'শহর, তারিখ ও বাজেট জানান',
        descBn: 'কোন এলাকা (যেমন হারামের কাছে বা হাসপাতালের পাশে) আপনার প্রয়োজন তা জানান।',
        titleEn: 'Share City, Dates & Budget',
        descEn: 'Tell us your preferred neighborhood (near Haram, hospital, or city center) and budget.',
      },
      {
        titleBn: 'যাচাইকৃত ২–৩টি হোটেল অপশন',
        descBn: 'রিভিউ, লোকেশন ম্যাপ ও ব্রেকফাস্ট সুবিধাসহ মানসম্মত হোটেল অপশন পাঠানো হয়।',
        titleEn: 'Curated Hotel Options',
        descEn: 'Receive 2–3 verified hotel choices with location clarity and meal inclusions.',
      },
      {
        titleBn: 'কনফার্ম ভাউচার ডেলিভারি',
        descBn: 'বুকিং নিশ্চিত হলে কনফার্মেশন নম্বরসহ অফিসিয়াল হোটেল ভাউচার PDF পাঠানো হয়।',
        titleEn: 'Confirmed Voucher Delivery',
        descEn: 'Receive official hotel confirmation voucher PDF ready for check-in or Embassy filing.',
      },
    ],
    processingTimeBn: '৩০ মিনিট থেকে ৩ ঘণ্টার মধ্যে কনফার্ম ভাউচার',
    processingTimeEn: 'Confirmed hotel voucher delivered within 30 minutes to 3 hours',
    feeNoteBn: 'শহর, হোটেল ক্যাটাগরি ও মৌসুম অনুযায়ী — সরাসরি কোটেশন নিন',
    feeNoteEn: 'Quoted transparently by city, star rating, and season',
    relatedServiceSlugs: ['air-ticketing', 'tour-package', 'hajj-umrah'],
    relatedBlogSlugs: ['malaysia-travel-best-time-budget-guide', 'india-medical-visa-process-bangladesh-guide'],
    seo: {
      titleBn: 'হোটেল বুকিং বাংলাদেশ ও বিদেশে | Visatrip Global',
      descriptionBn: 'মক্কা-মদিনা, দুবাই, মালয়েশিয়া, থাইল্যান্ড, ভারত ও বাংলাদেশে নিরাপদ Hotel Booking ও ভিসা-উপযোগী হোটেল ভাউচার — Visatrip Global।',
      titleEn: 'Hotel Booking Bangladesh & Worldwide | Visatrip Global',
      descriptionEn: 'Verified international and domestic hotel bookings from Bangladesh — Makkah, Madinah, Dubai, Malaysia, Thailand & India.',
      primaryKeyword: 'hotel booking Bangladesh',
    },
    faqs: [
      {
        questionBn: 'আন্তর্জাতিক কার্ড ছাড়াই কি বাংলাদেশি টাকায় বিদেশের হোটেল বুক করা যাবে?',
        answerBn: 'হ্যাঁ, আপনার ইন্টারন্যাশনাল ক্রেডিট কার্ড না থাকলেও আমাদের মাধ্যমে বাংলাদেশি টাকায় (BDT) বৈধভাবে বিদেশের হোটেল বুক করতে পারবেন।',
        questionEn: 'Can I book international hotels in BDT without an international credit card?',
        answerEn: 'Yes, you can pay locally in BDT and receive confirmed international hotel vouchers through our desk.',
      },
      {
        questionBn: 'ভিসা আবেদনের জন্য হোটেল বুকিং সাপোর্ট দেওয়া হয় কি?',
        answerBn: 'হ্যাঁ, শেনজেন, দুবাই, মালয়েশিয়া, থাইল্যান্ড ও অন্যান্য দেশের ভিসা ফাইলের জন্য ভেরিফায়েবল হোটেল রিজার্ভেশন দেওয়া হয়।',
        questionEn: 'Do you provide hotel reservations for visa applications?',
        answerEn: 'Yes, we provide Embassy-compliant hotel booking confirmations for tourist and medical visa files.',
      },
      {
        questionBn: 'হোটেলে চেক-ইনের সময় কোনো অতিরিক্ত ট্যাক্স দিতে হয় কি?',
        answerBn: 'দুবাই বা মালয়েশিয়ার মতো কিছু শহরে সরকারি ট্যুরিজম ট্যাক্স সরাসরি হোটেলে দিতে হয় — বুকিংয়ের আগেই আমরা তা স্পষ্ট করে বলে দিই।',
        questionEn: 'Are there any local city taxes payable at check-in?',
        answerEn: 'Cities like Dubai or Kuala Lumpur charge mandatory local tourism fees at check-in; we always disclose these upfront.',
      },
      {
        questionBn: 'কক্সবাজার, সিলেট বা সাজেক ভ্রমণের হোটেলও কি বুক করা যাবে?',
        answerBn: 'হ্যাঁ, দেশের ভেতরের জনপ্রিয় পর্যটন কেন্দ্রগুলোর ভালো রিসোর্ট ও হোটেলও আমাদের মাধ্যমে বুক করতে পারবেন।',
        questionEn: 'Do you book domestic resorts in Cox’s Bazar or Sylhet?',
        answerEn: 'Yes, we book verified hotels and resorts across Cox’s Bazar, Sylhet, Bandarban, and Sreemangal.',
      },
      {
        questionBn: 'বুকিং বাতিল বা তারিখ পরিবর্তনের নিয়ম কী?',
        answerBn: 'ফ্রি ক্যান্সেলেশন এবং নন-রিফান্ডেবল দুই ধরনের রেটই থাকে। বুকিং নিশ্চিত করার আগেই ক্যান্সেলেশন নীতিমালা লিখিতভাবে জানিয়ে দেওয়া হয়।',
        questionEn: 'What is the cancellation policy?',
        answerEn: 'Both refundable (free cancellation) and non-refundable rates are available; exact policies are stated before payment.',
      },
      {
        questionBn: 'হোটেলের সাথে এয়ারপোর্ট পিকআপ ব্যবস্থা কি পাওয়া যায়?',
        answerBn: 'হ্যাঁ, প্রয়োজনে প্রাইভেট বা শেয়ার্ড এয়ারপোর্ট ট্রান্সফারও হোটেল বুকিংয়ের সাথে যুক্ত করে দেওয়া যায়।',
        questionEn: 'Can airport pickup be added to a hotel booking?',
        answerEn: 'Yes, private or shared airport transfers can be arranged alongside your hotel reservation.',
      },
    ],
  },
  {
    slug: 'tour-package',
    icon: 'Compass',
    imageKey: 'thailand',
    titleBn: 'Tour Package',
    titleEn: 'Curated Tour Packages',
    shortDescBn: 'দুবাই, মালয়েশিয়া, থাইল্যান্ড, সিঙ্গাপুর, তুরস্ক ও দেশের ভেতরের কাস্টম ও গ্রুপ ট্যুর প্যাকেজ।',
    shortDescEn: 'Curated family, honeymoon, corporate, and group tour packages across Asia, Middle East, and Bangladesh.',
    heroHeadingBn: 'পরিকল্পিত ও আরামদায়ক Tour Package — পরিবার ও গ্রুপ ভ্রমণে নিশ্চিন্ততা',
    heroHeadingEn: 'Curated International & Domestic Tour Packages from Bangladesh',
    heroSubBn:
      'ভিসা, হোটেল, এয়ারপোর্ট ট্রান্সফার ও সাইটসিয়িং — সবকিছু সাজানো থাকবে স্বচ্ছ বাজেট ও দিনভিত্তিক Itinerary-তে।',
    heroSubEn:
      'Complete day-by-day itineraries covering hotels, airport transfers, sightseeing, and visa assistance with transparent pricing.',
    overviewBn:
      'পরিবার, হানিমুন, বন্ধু বা কর্পোরেট গ্রুপ নিয়ে ভ্রমণ তখনই উপভোগ্য হয় যখন প্রতিটি দিনের পরিকল্পনা আগে থেকেই সুশৃঙ্খল থাকে। Visatrip Global-এর ট্যুর প্যাকেজগুলোতে কী কী অন্তর্ভুক্ত (Inclusion) এবং কী অন্তর্ভুক্ত নয় (Exclusion) তা শুরু থেকেই পরিষ্কারভাবে উল্লেখ থাকে, যাতে ভ্রমণের মাঝে কোনো অপ্রত্যাশিত খরচ না হয়।',
    overviewEn:
      'Memorable holidays rely on clear planning and zero surprise costs. Visatrip Global curates family, honeymoon, and group tour packages with clear day-by-day itineraries, transparent inclusions and exclusions, verified hotels, and responsive WhatsApp travel support.',
    eligibilityBn: [
      'আন্তর্জাতিক ট্যুরের জন্য ন্যূনতম ৬ মাস মেয়াদসহ বৈধ পাসপোর্ট',
      'দেশের ভেতরের ট্যুরের জন্য এনআইডি কপি',
      'ন্যূনতম ২ জন থেকে শুরু করে বড় গ্রুপ বা কর্পোরেট টিম',
    ],
    eligibilityEn: [
      'Valid passport (6+ months validity) for international packages',
      'National ID copy for domestic Bangladesh tours',
      'Available for couples, families (2+), and corporate/friend groups',
    ],
    documentsBn: [
      'যাত্রীদের পাসপোর্ট কপি',
      'ভ্রমণের সম্ভাব্য তারিখ ও মোট যাত্রীর সংখ্যা',
      'ভিসা প্রসেসিং প্যাকেজে থাকলে সংশ্লিষ্ট দেশের ভিসা ডকুমেন্ট',
    ],
    documentsEn: [
      'Passport copies of all travelers',
      'Preferred travel window and traveler count',
      'Destination visa documents if visa processing is included',
    ],
    steps: [
      {
        titleBn: 'গন্তব্য ও বাজেট নির্বাচন',
        descBn: 'আপনার পছন্দের দেশ, দিনসংখ্যা এবং বাজেট অনুযায়ী রেডি বা কাস্টম প্যাকেজ বেছে নিন।',
        titleEn: 'Choose Destination & Budget',
        descEn: 'Pick from our curated packages or request a custom itinerary tailored to your budget.',
      },
      {
        titleBn: 'দিনভিত্তিক Itinerary ও লিখিত শর্ত',
        descBn: 'হোটেল, ব্রেকফাস্ট, ট্রান্সফার ও সাইটসিয়িং তালিকা বিস্তারিতভাবে যাচাই করুন।',
        titleEn: 'Review Day-by-Day Itinerary',
        descEn: 'Confirm exact hotels, transfers, meals, sightseeing, and exclusions before booking.',
      },
      {
        titleBn: 'ভিসা, ফ্লাইট ও হোটেল কনফার্মেশন',
        descBn: 'বুকিং নিশ্চিত হলে ধাপে ধাপে ভিসা, এয়ার টিকেট এবং হোটেল ভাউচার প্রস্তুত করা হয়।',
        titleEn: 'Visa, Flight & Hotel Confirmation',
        descEn: 'All visas, flight tickets, and hotel/transfer vouchers are issued seamlessly.',
      },
      {
        titleBn: 'সার্বক্ষণিক ট্রাভেল সাপোর্ট',
        descBn: 'ভ্রমণ শুরুর দিন থেকে দেশে ফেরা পর্যন্ত WhatsApp-এ আমাদের টিমের সাপোর্ট পাবেন।',
        titleEn: 'On-Trip WhatsApp Support',
        descEn: 'Dedicated WhatsApp support throughout your journey until safe return home.',
      },
    ],
    processingTimeBn: 'ভ্রমণের অন্তত ১৫–৩০ দিন আগে বুকিং করা উত্তম',
    processingTimeEn: 'Recommended to book at least 15–30 days prior to departure',
    feeNoteBn: 'প্যাকেজ, হোটেল স্ট্যান্ডার্ড ও এয়ারফেয়ার সাপেক্ষে — বিস্তারিত জানতে কনসাল্টেশন নিন',
    feeNoteEn: 'Depends on hotel tier, group size, and live airfare — request an exact quote',
    countriesBn: ['দুবাই', 'মালয়েশিয়া', 'থাইল্যান্ড', 'সিঙ্গাপুর', 'তুরস্ক', 'মালদ্বীপ', 'নেপাল', 'কক্সবাজার ও সিলেট'],
    countriesEn: ['Dubai', 'Malaysia', 'Thailand', 'Singapore', 'Turkey', 'Maldives', 'Nepal', 'Cox’s Bazar & Sylhet'],
    relatedServiceSlugs: ['tourist-visa', 'air-ticketing', 'hotel-booking'],
    relatedBlogSlugs: ['malaysia-travel-best-time-budget-guide', 'dubai-tourist-visa-documents-bangladesh'],
    seo: {
      titleBn: 'ট্যুর প্যাকেজ বাংলাদেশ | Visatrip Global',
      descriptionBn: 'বাংলাদেশ থেকে দুবাই, মালয়েশিয়া, থাইল্যান্ড, সিঙ্গাপুর, তুরস্ক ও দেশের ভেতরের ফ্যামিলি ও গ্রুপ Tour Package — Visatrip Global।',
      titleEn: 'Tour Packages from Bangladesh | Visatrip Global',
      descriptionEn: 'Curated international and domestic tour packages from Bangladesh — Dubai, Malaysia, Thailand, Singapore, Turkey & more.',
      primaryKeyword: 'ট্যুর প্যাকেজ বাংলাদেশ',
    },
    faqs: [
      {
        questionBn: 'ট্যুর প্যাকেজে কি এয়ার টিকেট ও ভিসা অন্তর্ভুক্ত থাকে?',
        answerBn: 'আমাদের ল্যান্ড প্যাকেজ (হোটেল + ট্রান্সফার + সাইটসিয়িং) এবং অল-ইনক্লুসিভ (ভিসা + এয়ার টিকেটসহ) দুই ধরনের অপশনই থাকে। প্রতিটি প্যাকেজের বিবরণে তা স্পষ্টভাবে লেখা থাকে।',
        questionEn: 'Are flights and visas included in tour packages?',
        answerEn: 'We offer both Land Packages (hotel, transfers, sightseeing) and All-Inclusive options (with flights & visa). Every package clearly lists inclusions and exclusions.',
      },
      {
        questionBn: 'মাত্র ২ জনের জন্য (হানিমুন/কাপল) কি কাস্টম প্যাকেজ নেওয়া যাবে?',
        answerBn: 'হ্যাঁ, মাত্র ২ জন থেকে শুরু করে যেকোনো ফ্যামিলি বা কাপলের জন্য প্রাইভেট কাস্টম ট্যুর প্যাকেজ তৈরি করা হয়।',
        questionEn: 'Can couples or families of 2 book a private custom tour?',
        answerEn: 'Yes, private custom itineraries can be arranged starting from 2 travelers.',
      },
      {
        questionBn: 'প্যাকেজের হোটেল বা সাইটসিয়িং কি নিজের পছন্দমতো পরিবর্তন করা যাবে?',
        answerBn: 'অবশ্যই। ৩-তারকা থেকে ৫-তারকা হোটেল এবং পছন্দের সাইটসিয়িং যুক্ত বা বাদ দিয়ে আপনার বাজেট অনুযায়ী প্যাকেজ কাস্টমাইজ করা যাবে।',
        questionEn: 'Can I customize the hotels or sightseeing stops?',
        answerEn: 'Yes, hotel ratings (3-star to 5-star) and daily sightseeing activities can be adjusted to match your budget and pace.',
      },
      {
        questionBn: 'বাচ্চাদের জন্য কি আলাদা ছাড় থাকে?',
        answerBn: 'বয়স এবং হোটেল-এয়ারলাইনস নীতিমালা অনুযায়ী শিশুদের (Infant/Child) জন্য বিশেষ ডিসকাউন্টেড রেট প্রযোজ্য হয়।',
        questionEn: 'Are child discounts available?',
        answerEn: 'Yes, infant and child pricing applies according to airline and hotel bedding policies.',
      },
      {
        questionBn: 'হালাল খাবারের ব্যবস্থা কি থাকে?',
        answerBn: 'বাংলাদেশি যাত্রীদের সুবিধা বিবেচনায় আমরা হালাল ফুড-বান্ধব হোটেল এবং রেস্টুরেন্ট গাইডলাইন প্রাধান্য দিই।',
        questionEn: 'Is halal food guidance provided on international tours?',
        answerEn: 'Yes, we prioritize halal-friendly hotels and guide travelers to trusted halal dining options.',
      },
      {
        questionBn: 'ট্যুর বুক করার জন্য কত টাকা অ্যাডভান্স দিতে হয়?',
        answerBn: 'ভিসা ও হোটেল বুকিং শুরু করার জন্য নির্ধারিত বুকিং অ্যাডভান্স এবং বাকি অংশ ভ্রমণের আগে স্বচ্ছ কিস্তিতে পরিশোধ করা যায়।',
        questionEn: 'How much advance payment is needed to book a tour?',
        answerEn: 'A transparent booking deposit starts processing, with the balance scheduled before departure — always with official receipts.',
      },
    ],
  },
];

export const hajjComparisonTiers = [
  {
    tier: 'Economy',
    labelBn: 'ইকোনমি ওমরাহ প্যাকেজ',
    labelEn: 'Economy Umrah Package',
    hotelDistanceBn: 'মসজিদুল হারাম থেকে ৬০০–১২০০ মিটার (শাটল বা হাঁটা দূরত্ব)',
    hotelDistanceEn: '600–1200m from Masjid al-Haram (shuttle or walking)',
    roomTypeBn: '৪ বেড শেয়ারিং (চাহিদা অনুযায়ী ২/৩ বেড আপগ্রেড)',
    roomTypeEn: 'Quad sharing (Double/Triple upgrade optional)',
    flightBn: 'ইকোনমি ক্লাস ট্রানজিট / ডাইরেক্ট (মৌসুম সাপেক্ষে)',
    flightEn: 'Economy Class transit or direct (seasonal)',
    mealsBn: 'ঐচ্ছিক বাঙালি খাবার প্যাকেজ',
    mealsEn: 'Optional Bangladeshi meal plan',
    ziyarahBn: 'মক্কা ও মদিনা গাইডেড জিয়ারাহ অন্তর্ভুক্ত',
    ziyarahEn: 'Guided Makkah & Madinah Ziyarah included',
    priceNoteBn: 'বর্তমান রেট জানতে যোগাযোগ করুন',
    priceNoteEn: 'Contact for current schedule & rate',
  },
  {
    tier: 'Standard',
    labelBn: 'স্ট্যান্ডার্ড ওমরাহ প্যাকেজ',
    labelEn: 'Standard Umrah Package',
    hotelDistanceBn: 'মসজিদুল হারাম থেকে ৩০০–৬০০ মিটার (সহজ হাঁটা দূরত্ব)',
    hotelDistanceEn: '300–600m from Masjid al-Haram (comfortable walk)',
    roomTypeBn: '৩ বা ২ বেড রুম (৩/৪-তারকা মানের হোটেল)',
    roomTypeEn: 'Triple or Double room (3–4 star standard hotel)',
    flightBn: 'সৌদিয়া / বিমান / কাতার বা সমমানের এয়ারলাইনস',
    flightEn: 'Saudia / Biman / Qatar or equivalent carrier',
    mealsBn: 'প্রতিদিন ব্রেকফাস্ট + ঐচ্ছিক বাঙালি খাবার',
    mealsEn: 'Daily breakfast + optional Bangladeshi meals',
    ziyarahBn: 'অভিজ্ঞ মুয়াল্লেমসহ মক্কা ও মদিনা পূর্ণ জিয়ারাহ',
    ziyarahEn: 'Full guided Ziyarah with experienced Moallem',
    priceNoteBn: 'বর্তমান রেট জানতে যোগাযোগ করুন',
    priceNoteEn: 'Contact for current schedule & rate',
  },
  {
    tier: 'VIP',
    labelBn: 'ভিআইপি ওমরাহ প্যাকেজ',
    labelEn: 'VIP Umrah Package',
    hotelDistanceBn: 'মসজিদুল হারামের একদম কাছে (০–২৫০ মিটার, ক্লক টাওয়ার বা সমমান এলাকা)',
    hotelDistanceEn: 'Steps from Masjid al-Haram (0–250m, Clock Tower / nearby)',
    roomTypeBn: 'প্রাইভেট ডাবল / ফ্যামিলি স্যুট (৫-তারকা হোটেল)',
    roomTypeEn: 'Private Double / Family Suite (5-star hotel)',
    flightBn: 'সরাসরি ফ্লাইট অগ্রাধিকার (Saudia / Biman)',
    flightEn: 'Direct flight priority (Saudia / Biman)',
    mealsBn: '৫-তারকা বুফে ব্রেকফাস্ট অন্তর্ভুক্ত',
    mealsEn: '5-star buffet breakfast included',
    ziyarahBn: 'প্রাইভেট এসি গাড়িতে জিয়ারাহ ও হারামাইন হাই-স্পিড ট্রেন অপশন',
    ziyarahEn: 'Private AC vehicle Ziyarah & Haramain high-speed train option',
    priceNoteBn: 'কাস্টম কোটেশনের জন্য যোগাযোগ করুন',
    priceNoteEn: 'Contact for bespoke quotation',
  },
];

export const studentStudyMatrix = [
  {
    countryBn: 'মালয়েশিয়া',
    countryEn: 'Malaysia',
    universities: 'UM, UPM, Taylor’s, Sunway, APU, INTI',
    courses: 'CSE, Business, Engineering, Hospitality, Data Science',
    intakes: 'Jan / Feb, May, Sep / Oct',
    language: 'IELTS 5.5–6.0 বা কিছু ক্ষেত্রে MOI / Internal Test',
  },
  {
    countryBn: 'যুক্তরাজ্য (UK)',
    countryEn: 'United Kingdom',
    universities: 'University of Hertfordshire, Coventry, Greenwich, Portsmouth',
    courses: 'MBA, Computing, Public Health, Law, Finance',
    intakes: 'January, May, September',
    language: 'IELTS 6.0–6.5 / UKVI IELTS / PTE',
  },
  {
    countryBn: 'জার্মানি ও ইউরোপ',
    countryEn: 'Germany & Europe',
    universities: 'Public & Private Universities in Germany, Hungary, Finland, Poland',
    courses: 'Mechanical/IT Engineering, Management, Economics',
    intakes: 'Winter (Sep/Oct), Summer (Mar/Apr)',
    language: 'IELTS 6.0–6.5 (English-taught tracks)',
  },
  {
    countryBn: 'অস্ট্রেলিয়া ও কানাডা',
    countryEn: 'Australia & Canada',
    universities: 'Deakin, La Trobe, Memorial, University of Regina & Partner Colleges',
    courses: 'Nursing, IT, Accounting, Engineering, Supply Chain',
    intakes: 'Feb / July (AU) · Jan / May / Sep (CA)',
    language: 'IELTS 6.0–6.5 / PTE Academic',
  },
];

export const workPermitCategories = [
  {
    categoryBn: 'কনস্ট্রাকশন ও সিভিল ট্রেড',
    categoryEn: 'Construction & Civil Trades',
    rolesBn: 'ম্যাসন, স্টিল ফিক্সার, শাটারিং কার্পেন্টার, পেইন্টার, হেল্পার',
    rolesEn: 'Mason, Steel Fixer, Shuttering Carpenter, Painter, General Helper',
    countriesBn: 'সৌদি আরব, দুবাই, রোমানিয়া, পোল্যান্ড',
    countriesEn: 'Saudi Arabia, UAE, Romania, Poland',
    salaryPlaceholderBn: 'চাহিদাপত্র ও দক্ষতা অনুযায়ী (অফিসে যাচাই করুন)',
    salaryPlaceholderEn: 'Per verified employer demand letter (verify in office)',
  },
  {
    categoryBn: 'হসপিটালিটি ও ফ্যাসিলিটি সার্ভিস',
    categoryEn: 'Hospitality & Facility Services',
    rolesBn: 'হোটেল হাউসকিপিং, কিচেন হেল্পার, ওয়েটার, ক্লিনিং সুপারভাইজার',
    rolesEn: 'Hotel Housekeeping, Kitchen Helper, Waiter, Cleaning Staff',
    countriesBn: 'দুবাই, কাতার, সৌদি আরব, মালয়েশিয়া, ইউরোপ',
    countriesEn: 'UAE, Qatar, Saudi Arabia, Malaysia, Europe',
    salaryPlaceholderBn: 'চাহিদাপত্র ও দক্ষতা অনুযায়ী (অফিসে যাচাই করুন)',
    salaryPlaceholderEn: 'Per verified employer demand letter (verify in office)',
  },
  {
    categoryBn: 'ফ্যাক্টরি ও ওয়ে্যারহাউস অপারেশন',
    categoryEn: 'Factory & Warehouse Operations',
    rolesBn: 'প্যাকেজিং অপারেটর, ফর্কলিফট, লজিস্টিকস হেল্পার, প্রোডাকশন ওয়ার্কার',
    rolesEn: 'Packaging Operator, Forklift, Logistics Helper, Production Worker',
    countriesBn: 'মালয়েশিয়া, রোমানিয়া, পোল্যান্ড, সৌদি আরব',
    countriesEn: 'Malaysia, Romania, Poland, Saudi Arabia',
    salaryPlaceholderBn: 'চাহিদাপত্র ও দক্ষতা অনুযায়ী (অফিসে যাচাই করুন)',
    salaryPlaceholderEn: 'Per verified employer demand letter (verify in office)',
  },
  {
    categoryBn: 'টেকনিক্যাল ও ড্রাইভিং',
    categoryEn: 'Technical Trades & Driving',
    rolesBn: 'ইলেকট্রিশিয়ান, এসি টেকনিশিয়ান, প্লাম্বার, ওয়েল্ডার, লাইট/হেভি ড্রাইভার',
    rolesEn: 'Electrician, AC Technician, Plumber, Welder, Light/Heavy Driver',
    countriesBn: 'সৌদি আরব, সংযুক্ত আরব আমিরাত, ওমান, ইউরোপ',
    countriesEn: 'Saudi Arabia, UAE, Oman, Europe',
    salaryPlaceholderBn: 'চাহিদাপত্র ও দক্ষতা অনুযায়ী (অফিসে যাচাই করুন)',
    salaryPlaceholderEn: 'Per verified employer demand letter (verify in office)',
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesData.find((s) => s.slug === slug);
}
