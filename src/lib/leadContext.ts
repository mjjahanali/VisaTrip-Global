import { buildWhatsAppLink } from '../config/site';
import {
  getServiceSummaryBySlug,
  getDestinationSummaryBySlug,
  getPackageSummaryBySlug,
  getBlogSummaryBySlug,
} from '../data/catalogSummary';

export type PageType =
  | 'home'
  | 'about'
  | 'services_list'
  | 'service_detail'
  | 'destinations_list'
  | 'destination_detail'
  | 'packages_list'
  | 'package_detail'
  | 'visa_checker'
  | 'track_application'
  | 'success_stories'
  | 'gallery'
  | 'blog_list'
  | 'blog_detail'
  | 'faq'
  | 'contact'
  | 'licenses'
  | 'legal'
  | 'admin'
  | 'other';

export interface LeadMagnetChecklist {
  id: string;
  serviceName: string;
  titleBn: string;
  titleEn: string;
  badgeBn: string;
  badgeEn: string;
  pdfTitleEn: string;
  documentsBn: string[];
  documentsEn: string[];
}

export interface PageLeadContext {
  cleanPath: string;
  pageType: PageType;
  serviceLabel: string;
  serviceDisplayBn: string;
  serviceDisplayEn: string;
  whatsappMessageBn: string;
  whatsappMessageEn: string;
  whatsappUrl: string;
  leadMagnet: LeadMagnetChecklist;
}

const MASTER_CHECKLIST: LeadMagnetChecklist = {
  id: 'master-visa-checklist',
  serviceName: 'Master Visa Checklist',
  titleBn: 'সম্পূর্ণ ভিসা ডকুমেন্ট চেকলিস্ট (PDF)',
  titleEn: 'Complete Visa Document Checklist (PDF)',
  badgeBn: 'ফ্রি চেকলিস্ট PDF',
  badgeEn: 'Free Checklist PDF',
  pdfTitleEn: 'Master Visa Document Checklist (Bangladesh)',
  documentsBn: [
    'মূল পাসপোর্ট (ন্যূনতম ৬ মাস মেয়াদ ও কমপক্ষে ২টি ফাঁকা পাতা)',
    'পূর্ববর্তী সকল পুরানো পাসপোর্ট (যদি থাকে)',
    'সাদা ব্যাকগ্রাউন্ডের সাম্প্রতিক রঙিন ছবি (Embassy সাইজ অনুযায়ী)',
    'জাতীয় পরিচয়পত্র (NID) / জন্ম নিবন্ধন কপি',
    'বিগত ৬ মাসের ব্যাংক স্টেটমেন্ট ও ব্যাংক সলভেন্সি সার্টিফিকেট',
    'চাকরিজীবী: NOC, অফিস আইডি ও স্যালারি স্লিপ | ব্যবসায়ী: ইংরেজি নোটারাইজড Trade License',
    'TIN সার্টিফিকেট ও সর্বশেষ আয়কর রিটার্ন কপি (প্রযোজ্য ক্ষেত্রে)',
    'হোটেল বুকিং, রিটার্ন ফ্লাইট Itinerary এবং কভার লেটার',
  ],
  documentsEn: [
    'Valid original passport (minimum 6 months validity and 2 blank pages)',
    'All previous/expired passports (if applicable)',
    'Recent white-background passport photos matching Embassy dimensions',
    'National ID (NID) card or Birth Certificate copy',
    'Last 6 months bank statement and bank solvency certificate',
    'Employed: NOC, Office ID & Pay Slips | Business: English Notarized Trade License',
    'TIN Certificate and latest Tax Return copy (where applicable)',
    'Hotel reservation, return flight itinerary, and signed cover letter',
  ],
};

const UMRAH_CHECKLIST: LeadMagnetChecklist = {
  id: 'umrah-hajj-checklist',
  serviceName: 'Hajj & Umrah',
  titleBn: 'ওমরাহ ও হজ্জ প্রস্তুতি ও ডকুমেন্ট চেকলিস্ট (PDF)',
  titleEn: 'Umrah & Hajj Preparation & Document Checklist (PDF)',
  badgeBn: 'ফ্রি ওমরাহ গাইড PDF',
  badgeEn: 'Free Umrah Guide PDF',
  pdfTitleEn: 'Hajj & Umrah Preparation and Document Checklist',
  documentsBn: [
    'MRP বা e-Passport (ভ্রমণ তারিখ থেকে ন্যূনতম ৬ মাস মেয়াদ)',
    'সাদা ব্যাকগ্রাউন্ডের ২ কপি পাসপোর্ট সাইজ ছবি',
    'জাতীয় পরিচয়পত্র (NID) বা অপ্রাপ্তবয়স্কদের জন্ম নিবন্ধন',
    'মেনিনজাইটিস ও ইনফ্লুয়েঞ্জা ভ্যাকসিন সার্টিফিকেট (প্রযোজ্য ক্ষেত্রে)',
    'ইহরামের কাপড় (পুরুষ: ২ খণ্ড সেলাইবিহীন সাদা কাপড়, কোমরের বেল্ট)',
    'আরামদায়ক স্যান্ডেল, নিয়মিত ওষুধ ও প্রেসক্রিপশন (ইংরেজিতে)',
    'দোয়া বই, হালকা ব্যাগপ্যাক ও মোবাইল পাওয়ার ব্যাংক (হ্যান্ড লাগেজে)',
    'হজ্জ নিবন্ধনের ক্ষেত্রে NID ও ব্যাংক একাউন্ট তথ্য',
  ],
  documentsEn: [
    'Original MRP or e-Passport (minimum 6 months validity from travel date)',
    '2 recent passport-size photographs with white background',
    'National ID (NID) card or Birth Certificate for minors',
    'Meningitis & Influenza vaccination certificates (per current Saudi rules)',
    'Ihram garments (men: two unstitched white cloths + waist belt)',
    'Comfortable walking sandals and personal prescriptions in English',
    'Compact Dua booklet, lightweight daypack, and power bank (carry-on only)',
    'Pre-registration details & bank info for Hajj applicants',
  ],
};

const WORK_PERMIT_CHECKLIST: LeadMagnetChecklist = {
  id: 'work-permit-safety-checklist',
  serviceName: 'Work Permit',
  titleBn: 'Work Permit ডকুমেন্ট ও প্রতারণা সুরক্ষা চেকলিস্ট (PDF)',
  titleEn: 'Work Permit Document & Scam-Safety Checklist (PDF)',
  badgeBn: 'ফ্রি সুরক্ষা চেকলিস্ট PDF',
  badgeEn: 'Free Safety Checklist PDF',
  pdfTitleEn: 'Work Permit Documents & Verification Safety Checklist',
  documentsBn: [
    'বৈধ e-Passport / MRP (কমপক্ষে ১৮–২৪ মাস মেয়াদ)',
    'পুলিশ ক্লিয়ারেন্স সার্টিফিকেট (অনলাইন ভেরিফায়েড)',
    'শিক্ষাগত যোগ্যতা ও কারিগরি অভিজ্ঞতার সার্টিফিকেট (যদি থাকে)',
    'অনুমোদিত মেডিকেল সেন্টার (GAMCA / দেশভিত্তিক) ফিটনেস রিপোর্ট',
    'পাসপোর্ট সাইজ ছবি (সাদা ব্যাকগ্রাউন্ড) ও আপডেটেড CV',
    'BMET নিবন্ধন ও ফিঙ্গারপ্রিন্ট কনফার্মেশন',
    'সুরক্ষা যাচাই: অফিসিয়াল পোর্টালে জব অফার ও Work Permit নম্বর চেক করুন',
    'সুরক্ষা যাচাই: প্রতিটি পেমেন্টের বিপরীতে তারিখসহ অফিসিয়াল মানি রিসিট নিন',
  ],
  documentsEn: [
    'Valid e-Passport / MRP (ideally 18-24 months remaining validity)',
    'Police Clearance Certificate (online verifiable)',
    'Academic certificates and trade/experience letters (if applicable)',
    'Approved medical fitness report (GAMCA or destination-specific)',
    'White-background passport photos and updated CV',
    'BMET registration and biometric fingerprint confirmation',
    'Safety Check: Verify job offer and work permit number on official portal',
    'Safety Check: Collect an official dated Money Receipt for every payment',
  ],
};

const INDIA_VISA_CHECKLIST: LeadMagnetChecklist = {
  id: 'india-visa-checklist',
  serviceName: 'India Visa Processing',
  titleBn: 'ইন্ডিয়া মেডিকেল ও ট্যুরিস্ট ভিসা চেকলিস্ট (PDF)',
  titleEn: 'India Medical & Tourist Visa Checklist (PDF)',
  badgeBn: 'ফ্রি IVAC চেকলিস্ট PDF',
  badgeEn: 'Free IVAC Checklist PDF',
  pdfTitleEn: 'India Medical & Tourist Visa (IVAC) Document Checklist',
  documentsBn: [
    'মূল পাসপোর্ট (ন্যূনতম ৬ মাস মেয়াদ) এবং পূর্ববর্তী সকল পুরানো পাসপোর্ট',
    '২×২ ইঞ্চি সাদা ব্যাকগ্রাউন্ড ছবি ও অনলাইন IVAC আবেদন ফর্ম',
    'জাতীয় পরিচয়পত্র (NID) ও সাম্প্রতিক ইউটিলিটি বিলের কপি (বিদ্যুৎ/গ্যাস)',
    'ব্যাংক স্টেটমেন্ট (কমপক্ষে ৬ মাস) বা ডলার এনডোর্সমেন্ট',
    'পেশাগত প্রমাণপত্র: চাকরিজীবী NOC / ব্যবসায়ী Trade License / ছাত্র আইডি',
    'মেডিকেল ভিসা: বাংলাদেশের ডাক্তারের রেফারেল ও প্রেসক্রিপশন',
    'মেডিকেল ভিসা: ভারতের হাসপাতালের Appointment / Invitation Letter',
    'মেডিকেল অ্যাটেনডেন্ট ভিসা: রোগীর সাথে সম্পর্কের প্রমাণপত্র',
  ],
  documentsEn: [
    'Original passport (min 6 months validity) plus all previous passports',
    '2x2 inch white-background photo and completed online IVAC form',
    'National ID (NID) copy and recent utility bill (electricity/gas/water)',
    'Last 6 months bank statement or USD endorsement copy',
    'Occupation proof: Employer NOC / Business Trade License / Student ID',
    'Medical Visa: Local doctor referral letter and clinical diagnosis reports',
    'Medical Visa: Indian hospital appointment / invitation letter',
    'Medical Attendant Visa: Proof of relationship with the patient',
  ],
};

const STUDENT_CHECKLIST: LeadMagnetChecklist = {
  id: 'student-visa-checklist',
  serviceName: 'Student Consultancy',
  titleBn: 'বিদেশে উচ্চশিক্ষা ও ব্যাংক সলভেন্সি চেকলিস্ট (PDF)',
  titleEn: 'Study Abroad & Bank Solvency Checklist (PDF)',
  badgeBn: 'ফ্রি স্টুডেন্ট গাইড PDF',
  badgeEn: 'Free Student Guide PDF',
  pdfTitleEn: 'Study Abroad Admission & Student Visa Checklist',
  documentsBn: [
    'বৈধ পাসপোর্ট ও সাদা ব্যাকগ্রাউন্ড পাসপোর্ট ছবি',
    'SSC, HSC, Bachelor/Masters মার্কশিট ও সার্টিফিকেট (সত্যায়িত)',
    'IELTS / PTE / Duolingo / MOI সার্টিফিকেট',
    'Statement of Purpose (SOP), একাডেমিক CV ও ২টি রেফারেন্স লেটার (LOR)',
    'বিশ্ববিদ্যালয়ের Offer Letter এবং টিউশন ফি পেমেন্ট রিসিট',
    'স্পন্সরের ৬ মাসের ব্যাংক স্টেটমেন্ট ও ব্যাংক সলভেন্সি সার্টিফিকেট',
    'স্পন্সরের আয়ের উৎস (Trade License / চাকরির সনদ / TIN / ট্যাক্স রিটার্ন)',
    'সম্পর্কের প্রমাণপত্র (Affidavit of Financial Support) ও মেডিকেল রিপোর্ট',
  ],
  documentsEn: [
    'Valid passport and white-background passport photographs',
    'SSC, HSC, and Bachelor/Masters transcripts and certificates',
    'IELTS / PTE / Duolingo / Medium of Instruction (MOI) certificate',
    'Statement of Purpose (SOP), Academic CV, and 2 Recommendation Letters',
    'University Offer Letter / CAS / COE and tuition deposit receipt',
    'Sponsor last 6 months bank statement and solvency certificate',
    'Sponsor income proof (Trade License, employment letter, TIN & Tax Return)',
    'Affidavit of Financial Support and approved medical report',
  ],
};

const SERVICE_WHATSAPP_MESSAGES: Record<string, { bn: string; en: string }> = {
  'hajj-umrah': {
    bn: 'আসসালামু আলাইকুম, আমি ওমরাহ ও হজ্জ প্যাকেজ সম্পর্কে জানতে চাই।',
    en: 'Assalamu Alaikum, I would like to know about your Umrah and Hajj packages.',
  },
  'work-permit': {
    bn: 'আসসালামু আলাইকুম, আমি Work Permit ভিসা ও নিরাপদ প্রক্রিয়া সম্পর্কে জানতে চাই।',
    en: 'Assalamu Alaikum, I would like to inquire about Work Permit services and verification.',
  },
  'tourist-visa': {
    bn: 'আসসালামু আলাইকুম, আমি ট্যুরিস্ট ভিসা প্রসেসিং সম্পর্কে জানতে চাই।',
    en: 'Assalamu Alaikum, I would like to inquire about Tourist Visa processing.',
  },
  'student-consultancy': {
    bn: 'আসসালামু আলাইকুম, আমি বিদেশে উচ্চশিক্ষা (Student Visa) কনসালটেন্সি সম্পর্কে জানতে চাই।',
    en: 'Assalamu Alaikum, I would like a free profile evaluation for Study Abroad / Student Visa.',
  },
  'india-visa': {
    bn: 'আসসালামু আলাইকুম, আমি ইন্ডিয়া মেডিকেল / ট্যুরিস্ট ভিসা প্রসেসিং সম্পর্কে জানতে চাই।',
    en: 'Assalamu Alaikum, I need assistance with India Medical / Tourist Visa processing.',
  },
  'air-ticketing': {
    bn: 'আসসালামু আলাইকুম, আমি এয়ার টিকেটের ভাড়া ও ফ্লাইট বুকিং সম্পর্কে জানতে চাই।',
    en: 'Assalamu Alaikum, I would like to check air ticket fares and flight booking options.',
  },
  'hotel-booking': {
    bn: 'আসসালামু আলাইকুম, আমি হোটেল বুকিং সম্পর্কে জানতে চাই।',
    en: 'Assalamu Alaikum, I would like help with hotel booking.',
  },
  'tour-package': {
    bn: 'আসসালামু আলাইকুম, আমি ট্যুর প্যাকেজ সম্পর্কে জানতে চাই।',
    en: 'Assalamu Alaikum, I would like to know about your Tour Packages.',
  },
};

export function normalizeRoutePath(pathname: string): string {
  const withoutEn = pathname.replace(/^\/en(\/|$)/, '/') || '/';
  return withoutEn.length > 1 && withoutEn.endsWith('/') ? withoutEn.slice(0, -1) : withoutEn;
}

export function getPageLeadContext(pathname: string, locale: 'bn' | 'en' = 'bn'): PageLeadContext {
  const cleanPath = normalizeRoutePath(pathname);

  const finalize = (partial: Omit<PageLeadContext, 'cleanPath' | 'whatsappUrl'>): PageLeadContext => ({
    cleanPath,
    ...partial,
    whatsappUrl: buildWhatsAppLink(
      locale === 'en' ? partial.whatsappMessageEn : partial.whatsappMessageBn,
      locale
    ),
  });

  if (cleanPath === '/') {
    return finalize({
      pageType: 'home',
      serviceLabel: 'general',
      serviceDisplayBn: 'সাধারণ কনসাল্টেশন',
      serviceDisplayEn: 'General Consultation',
      whatsappMessageBn:
        'আসসালামু আলাইকুম, আমি Visatrip Global থেকে ভিসা বা ট্রাভেল সার্ভিস সম্পর্কে ফ্রি পরামর্শ চাই।',
      whatsappMessageEn:
        'Assalamu Alaikum, I would like a free travel or visa consultation from Visatrip Global.',
      leadMagnet: MASTER_CHECKLIST,
    });
  }

  if (cleanPath.startsWith('/services/')) {
    const slug = cleanPath.replace('/services/', '');
    const service = getServiceSummaryBySlug(slug);
    const msg = SERVICE_WHATSAPP_MESSAGES[slug];
    const checklist =
      slug === 'hajj-umrah'
        ? UMRAH_CHECKLIST
        : slug === 'work-permit'
        ? WORK_PERMIT_CHECKLIST
        : slug === 'india-visa'
        ? INDIA_VISA_CHECKLIST
        : slug === 'student-consultancy'
        ? STUDENT_CHECKLIST
        : service
        ? {
            ...MASTER_CHECKLIST,
            id: `${slug}-checklist`,
            serviceName: service.titleEn,
            titleBn: `${service.titleBn} — ডকুমেন্ট চেকলিস্ট (PDF)`,
            titleEn: `${service.titleEn} — Document Checklist (PDF)`,
            pdfTitleEn: `${service.titleEn} Document Checklist`,
            documentsBn: service.documentsBn,
            documentsEn: service.documentsEn,
          }
        : MASTER_CHECKLIST;

    return finalize({
      pageType: 'service_detail',
      serviceLabel: slug,
      serviceDisplayBn: service?.titleBn || slug,
      serviceDisplayEn: service?.titleEn || slug,
      whatsappMessageBn:
        msg?.bn || `আসসালামু আলাইকুম, আমি ${service?.titleBn || 'আপনাদের সার্ভিস'} সম্পর্কে জানতে চাই।`,
      whatsappMessageEn:
        msg?.en || `Assalamu Alaikum, I would like to inquire about ${service?.titleEn || 'your services'}.`,
      leadMagnet: checklist,
    });
  }

  if (cleanPath.startsWith('/destinations/')) {
    const slug = cleanPath.replace('/destinations/', '');
    const dest = getDestinationSummaryBySlug(slug);
    const checklist: LeadMagnetChecklist = dest
      ? {
          id: `destination-${dest.slug}-checklist`,
          serviceName: `${dest.nameEn} Visa`,
          titleBn: `${dest.nameBn} ভিসা ডকুমেন্ট চেকলিস্ট (PDF)`,
          titleEn: `${dest.nameEn} Visa Document Checklist (PDF)`,
          badgeBn: 'ফ্রি ভিসা চেকলিস্ট PDF',
          badgeEn: 'Free Visa Checklist PDF',
          pdfTitleEn: `${dest.nameEn} Visa Document Checklist (from Bangladesh)`,
          documentsBn: dest.documentsSummaryBn,
          documentsEn: dest.documentsSummaryEn,
        }
      : MASTER_CHECKLIST;

    return finalize({
      pageType: 'destination_detail',
      serviceLabel: `destination_${slug}`,
      serviceDisplayBn: dest?.nameBn || slug,
      serviceDisplayEn: dest?.nameEn || slug,
      whatsappMessageBn: dest
        ? `আসসালামু আলাইকুম, আমি ${dest.nameBn} ভিসা ও ভ্রমণ প্যাকেজ সম্পর্কে জানতে চাই।`
        : 'আসসালামু আলাইকুম, আমি বিদেশে ভিসা ও ভ্রমণ সম্পর্কে জানতে চাই।',
      whatsappMessageEn: dest
        ? `Assalamu Alaikum, I would like to inquire about ${dest.nameEn} visa and travel packages.`
        : 'Assalamu Alaikum, I would like to inquire about international visa and travel options.',
      leadMagnet: checklist,
    });
  }

  if (cleanPath.startsWith('/tour-packages/')) {
    const slug = cleanPath.replace('/tour-packages/', '');
    const pkg = getPackageSummaryBySlug(slug);
    const isUmrah = pkg?.category === 'Umrah';
    return finalize({
      pageType: 'package_detail',
      serviceLabel: isUmrah ? 'hajj-umrah' : `package_${slug}`,
      serviceDisplayBn: pkg?.titleBn || 'ট্যুর প্যাকেজ',
      serviceDisplayEn: pkg?.titleEn || 'Tour Package',
      whatsappMessageBn: pkg
        ? isUmrah
          ? `আসসালামু আলাইকুম, আমি ওমরাহ প্যাকেজ (${pkg.titleBn}) সম্পর্কে জানতে চাই।`
          : `আসসালামু আলাইকুম, আমি "${pkg.titleBn}" ট্যুর প্যাকেজ সম্পর্কে জানতে চাই।`
        : 'আসসালামু আলাইকুম, আমি ট্যুর প্যাকেজ সম্পর্কে জানতে চাই।',
      whatsappMessageEn: pkg
        ? `Assalamu Alaikum, I would like to inquire about the "${pkg.titleEn}" package.`
        : 'Assalamu Alaikum, I would like to inquire about your tour packages.',
      leadMagnet: isUmrah ? UMRAH_CHECKLIST : MASTER_CHECKLIST,
    });
  }

  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '');
    const post = getBlogSummaryBySlug(slug);
    const lowerSlug = slug.toLowerCase();
    const checklist = lowerSlug.includes('umrah')
      ? UMRAH_CHECKLIST
      : lowerSlug.includes('india')
      ? INDIA_VISA_CHECKLIST
      : lowerSlug.includes('work')
      ? WORK_PERMIT_CHECKLIST
      : lowerSlug.includes('student')
      ? STUDENT_CHECKLIST
      : MASTER_CHECKLIST;

    return finalize({
      pageType: 'blog_detail',
      serviceLabel: `blog_${slug}`,
      serviceDisplayBn: post?.categoryBn || 'ভিসা গাইড',
      serviceDisplayEn: post?.categoryEn || 'Travel Guide',
      whatsappMessageBn: post
        ? `আসসালামু আলাইকুম, আমি "${post.titleBn}" গাইডটি পড়েছি — এ বিষয়ে ফ্রি পরামর্শ চাই।`
        : 'আসসালামু আলাইকুম, আমি আপনাদের ভিসা গাইড সম্পর্কে জানতে চাই।',
      whatsappMessageEn: post
        ? `Assalamu Alaikum, I read your guide "${post.titleEn}" and would like a free consultation.`
        : 'Assalamu Alaikum, I have a question about one of your travel guides.',
      leadMagnet: checklist,
    });
  }

  const staticMap: Record<
    string,
    Omit<PageLeadContext, 'cleanPath' | 'whatsappUrl'>
  > = {
    '/services': {
      pageType: 'services_list',
      serviceLabel: 'all_services',
      serviceDisplayBn: 'সকল সার্ভিস',
      serviceDisplayEn: 'All Services',
      whatsappMessageBn: 'আসসালামু আলাইকুম, আমি Visatrip Global-এর সার্ভিসসমূহ সম্পর্কে জানতে চাই।',
      whatsappMessageEn: 'Assalamu Alaikum, I would like to learn about Visatrip Global services.',
      leadMagnet: MASTER_CHECKLIST,
    },
    '/destinations': {
      pageType: 'destinations_list',
      serviceLabel: 'destinations',
      serviceDisplayBn: 'ডেস্টিনেশন ও ভিসা',
      serviceDisplayEn: 'Destinations & Visas',
      whatsappMessageBn: 'আসসালামু আলাইকুম, আমি পছন্দের দেশের ভিসা ও ভ্রমণ সম্পর্কে জানতে চাই।',
      whatsappMessageEn: 'Assalamu Alaikum, I would like visa and travel guidance for my destination.',
      leadMagnet: MASTER_CHECKLIST,
    },
    '/tour-packages': {
      pageType: 'packages_list',
      serviceLabel: 'tour-package',
      serviceDisplayBn: 'ট্যুর ও ওমরাহ প্যাকেজ',
      serviceDisplayEn: 'Tour & Umrah Packages',
      whatsappMessageBn: 'আসসালামু আলাইকুম, আমি ট্যুর এবং ওমরাহ প্যাকেজ সম্পর্কে জানতে চাই।',
      whatsappMessageEn: 'Assalamu Alaikum, I would like to inquire about your Tour and Umrah packages.',
      leadMagnet: MASTER_CHECKLIST,
    },
    '/about': {
      pageType: 'about',
      serviceLabel: 'about',
      serviceDisplayBn: 'এজেন্সি পরিচিতি',
      serviceDisplayEn: 'About Visatrip Global',
      whatsappMessageBn: 'আসসালামু আলাইকুম, আমি Visatrip Global-এর সাথে কথা বলতে ও ফ্রি পরামর্শ নিতে চাই।',
      whatsappMessageEn: 'Assalamu Alaikum, I would like to speak with Visatrip Global for a free consultation.',
      leadMagnet: MASTER_CHECKLIST,
    },
    '/contact': {
      pageType: 'contact',
      serviceLabel: 'contact',
      serviceDisplayBn: 'অফিস ও যোগাযোগ',
      serviceDisplayEn: 'Contact & Office',
      whatsappMessageBn: 'আসসালামু আলাইকুম, আমি Visatrip Global-এর রহনপুর অফিস বা ফ্রি কনসাল্টেশন সম্পর্কে জানতে চাই।',
      whatsappMessageEn: 'Assalamu Alaikum, I would like to book a consultation or visit your Rohanpur office.',
      leadMagnet: MASTER_CHECKLIST,
    },
    '/faq': {
      pageType: 'faq',
      serviceLabel: 'faq',
      serviceDisplayBn: 'প্রশ্ন ও উত্তর',
      serviceDisplayEn: 'FAQ Support',
      whatsappMessageBn: 'আসসালামু আলাইকুম, ভিসা বা ওমরাহ বিষয়ে আমার একটি প্রশ্ন আছে।',
      whatsappMessageEn: 'Assalamu Alaikum, I have a question regarding visas or Umrah packages.',
      leadMagnet: MASTER_CHECKLIST,
    },
    '/licenses': {
      pageType: 'licenses',
      serviceLabel: 'licenses',
      serviceDisplayBn: 'লাইসেন্স ও যাচাইকরণ',
      serviceDisplayEn: 'Licenses & Verification',
      whatsappMessageBn: 'আসসালামু আলাইকুম, আমি Visatrip Global-এর নিবন্ধন ও অফিস ভিজিট সম্পর্কে জানতে চাই।',
      whatsappMessageEn: 'Assalamu Alaikum, I would like to verify agency credentials and schedule an office visit.',
      leadMagnet: MASTER_CHECKLIST,
    },
    '/success-stories': {
      pageType: 'success_stories',
      serviceLabel: 'success_stories',
      serviceDisplayBn: 'ক্লায়েন্ট অভিজ্ঞতা',
      serviceDisplayEn: 'Success Stories',
      whatsappMessageBn: 'আসসালামু আলাইকুম, আমি আপনাদের সার্ভিস নিয়ে আমার ভ্রমণ শুরু করতে চাই।',
      whatsappMessageEn: 'Assalamu Alaikum, I would like to start my travel or visa consultation with Visatrip Global.',
      leadMagnet: MASTER_CHECKLIST,
    },
    '/gallery': {
      pageType: 'gallery',
      serviceLabel: 'gallery',
      serviceDisplayBn: 'ফটো গ্যালারি',
      serviceDisplayEn: 'Photo Gallery',
      whatsappMessageBn: 'আসসালামু আলাইকুম, আমি ভ্রমণ প্যাকেজ ও ভিসা সার্ভিস সম্পর্কে জানতে চাই।',
      whatsappMessageEn: 'Assalamu Alaikum, I would like to inquire about your travel packages and visa services.',
      leadMagnet: MASTER_CHECKLIST,
    },
    '/blog': {
      pageType: 'blog_list',
      serviceLabel: 'blog',
      serviceDisplayBn: 'ব্লগ ও ভিসা গাইড',
      serviceDisplayEn: 'Blog & Guides',
      whatsappMessageBn: 'আসসালামু আলাইকুম, আমি ভিসা ডকুমেন্ট ও প্রস্তুতি সম্পর্কে পরামর্শ চাই।',
      whatsappMessageEn: 'Assalamu Alaikum, I would like visa document guidance from Visatrip Global.',
      leadMagnet: MASTER_CHECKLIST,
    },
  };

  if (staticMap[cleanPath]) {
    return finalize(staticMap[cleanPath]);
  }

  if (
    cleanPath === '/privacy-policy' ||
    cleanPath === '/terms-and-conditions' ||
    cleanPath === '/refund-policy'
  ) {
    return finalize({
      pageType: 'legal',
      serviceLabel: 'legal',
      serviceDisplayBn: 'নীতিমালা',
      serviceDisplayEn: 'Policies',
      whatsappMessageBn: 'আসসালামু আলাইকুম, আমি Visatrip Global-এর নীতিমালা ও সার্ভিস সম্পর্কে জানতে চাই।',
      whatsappMessageEn: 'Assalamu Alaikum, I have a question regarding Visatrip Global policies and services.',
      leadMagnet: MASTER_CHECKLIST,
    });
  }

  return finalize({
    pageType: cleanPath.startsWith('/admin') ? 'admin' : 'other',
    serviceLabel: 'general',
    serviceDisplayBn: 'সাধারণ পরামর্শ',
    serviceDisplayEn: 'General Consultation',
    whatsappMessageBn: 'আসসালামু আলাইকুম, আমি Visatrip Global থেকে সার্ভিস সম্পর্কে জানতে চাই।',
    whatsappMessageEn: 'Assalamu Alaikum, I would like to inquire about Visatrip Global services.',
    leadMagnet: MASTER_CHECKLIST,
  });
}
