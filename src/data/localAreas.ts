export interface LocalAreaPriorityService {
  slug: string;
  labelBn: string;
  labelEn: string;
  localNoteBn: string;
  localNoteEn: string;
}

export interface LocalAreaFaq {
  questionBn: string;
  answerBn: string;
  questionEn: string;
  answerEn: string;
}

export interface LocalAreaGuide {
  id: 'rohanpur' | 'gomastapur' | 'nawabganj' | 'shibganj' | 'rajshahi';
  nameBn: string;
  nameEn: string;
  badgeBn: string;
  badgeEn: string;
  travelAccessBn: string;
  travelAccessEn: string;
  headlineBn: string;
  headlineEn: string;
  introBn: string;
  introEn: string;
  corridorTitleBn: string;
  corridorTitleEn: string;
  corridorDetailBn: string;
  corridorDetailEn: string;
  priorityServices: LocalAreaPriorityService[];
  practicalTipsBn: string[];
  practicalTipsEn: string[];
  faqs: LocalAreaFaq[];
  whatsappMessageBn: string;
  whatsappMessageEn: string;
}

/**
 * 5 genuinely differentiated, locally grounded service area guides for Chapai Nawabganj
 * and Rajshahi division. Designed to provide real regional usefulness (transport routes,
 * IVAC Rajshahi, Sona Masjid Land Port, Shah Makhdum Airport, BMET safety) rather than
 * repetitive doorway-page templates.
 */
export const localAreasData: LocalAreaGuide[] = [
  {
    id: 'rohanpur',
    nameBn: 'রহনপুর',
    nameEn: 'Rohanpur',
    badgeBn: 'আমাদের স্থায়ী হেড অফিস · ওয়াক-ইন ডেস্ক',
    badgeEn: 'Permanent Head Office · Walk-In Desk',
    travelAccessBn: 'রহনপুর পৌরসভা ও স্টেশন সংলগ্ন এলাকা · সরাসরি হেঁটে বা রিকশায় আসা যায়',
    travelAccessEn: 'Located in Rohanpur municipality · Direct walk-in access near Rohanpur station & market',
    headlineBn: 'রহনপুরে আমাদের স্থায়ী অফিসে সরাসরি ভিসা, ওমরাহ ও এয়ার টিকেট কনসাল্টেশন',
    headlineEn: 'Direct Walk-In Visa, Umrah & Air Ticketing Consultation in Rohanpur',
    introBn:
      'রহনপুর পৌরসভা ও পার্শ্ববর্তী এলাকার বাসিন্দাদের আর শুধু একটি ভিসা ফর্ম বা এয়ার টিকেটের জন্য চাঁপাইনবাবগঞ্জ শহর, রাজশাহী কিংবা ঢাকায় ছুটতে হয় না। রহনপুরে অবস্থিত Visatrip Global-এর স্থায়ী অফিসে বসেই পাসপোর্ট যাচাই, ব্যাংক স্টেটমেন্ট রিভিউ, ওমরাহ প্যাকেজ আলোচনা এবং তাৎক্ষণিক ডোমেস্টিক বা আন্তর্জাতিক এয়ার টিকেট বুকিং করতে পারবেন।',
    introEn:
      'Residents of Rohanpur municipality no longer need to travel to Rajshahi or Dhaka just to verify visa paperwork, plan an Umrah journey, or issue an air ticket. Walk directly into our permanent Rohanpur office for face-to-face passport checks, solvency reviews, and transparent written quotes.',
    corridorTitleBn: 'সরাসরি অফিস ভিজিট ও ডকুমেন্ট চেকিং সুবিধা',
    corridorTitleEn: 'In-Person Document Audit & Receipt Desk',
    corridorDetailBn:
      'শনিবার থেকে বৃহস্পতিবার সকাল ৯:০০টা থেকে রাত ৮:০০টা পর্যন্ত আপনি আপনার পাসপোর্ট, এনআইডি ও পুরনো কাগজপত্র সাথে নিয়ে সরাসরি ডেস্কে বসতে পারেন। প্রতিটি লেনদেনে তারিখসহ Visatrip Global-এর অফিসিয়াল মানি রিসিট হাতে-হাতে বুঝে নিতে পারবেন।',
    corridorDetailEn:
      'Open Saturday to Thursday, 9:00 AM – 8:00 PM. Bring your passport, NID, and bank or medical papers for a calm, obligation-free review and receive an itemized official money receipt for any confirmed booking.',
    priorityServices: [
      {
        slug: 'air-ticketing',
        labelBn: 'তাৎক্ষণিক এয়ার টিকেট বুকিং',
        labelEn: 'Same-Day Air Ticketing',
        localNoteBn: 'রাজশাহী–ঢাকা অভ্যন্তরীণ ফ্লাইটসহ সৌদি, দুবাই, মালয়েশিয়া ও ভারতের লাইভ ভাড়া যাচাই।',
        localNoteEn: 'Live fares for Rajshahi–Dhaka domestic flights and international routes with clear baggage rules.',
      },
      {
        slug: 'hajj-umrah',
        labelBn: 'পরিবারসহ ওমরাহ ও হজ্জ পরামর্শ',
        labelEn: 'Family Umrah & Hajj Planning',
        localNoteBn: 'মুরব্বিদের নিয়ে অফিসে বসেই মক্কা-মদিনার হোটেল দূরত্ব ও কিস্তির হিসাব বুঝে নেওয়ার সুযোগ।',
        localNoteEn: 'Sit down with senior family members to inspect Makkah & Madinah hotel distances and schedules in writing.',
      },
      {
        slug: 'india-visa',
        labelBn: 'ইন্ডিয়া মেডিকেল ও ট্যুরিস্ট ফাইল প্রস্তুতি',
        labelEn: 'India Medical & Tourist Filing',
        localNoteBn: 'কলকাতা বা ভেলোরের হাসপাতালের ইনভিটেশন লেটার ও IVAC ফর্ম নির্ভুলভাবে সাজানো।',
        localNoteEn: 'Hospital invitation coordination and error-free IVAC Rajshahi application preparation.',
      },
    ],
    practicalTipsBn: [
      'অফিসে আসার সময় মূল পাসপোর্ট, এনআইডি কপি ও প্রাসঙ্গিক ব্যাংক বা ডাক্তারি রিপোর্ট সাথে রাখলে প্রথম বৈঠকেই পূর্ণ ডকুমেন্ট চেকলিস্ট দেওয়া সম্ভব হয়।',
      'সন্ধ্যার ভিড় এড়াতে সকাল ৯:৩০ থেকে দুপুর ১:০০টার মধ্যে পরিবার নিয়ে কনসাল্টেশনে আসা সবচেয়ে সুবিধাজনক।',
      'আসার আগে +880 1771-304219 নম্বরে WhatsApp করে নির্দিষ্ট কনসালটেন্টের সময় নিশ্চিত করে নিতে পারেন।',
    ],
    practicalTipsEn: [
      'Bring your physical passport, NID copy, and any medical or bank records so we can deliver a complete document plan in one visit.',
      'Morning slots (9:30 AM – 1:00 PM) are quietest for families and senior Umrah pilgrims.',
      'Message +880 1771-304219 on WhatsApp ahead of time if you prefer a reserved desk slot.',
    ],
    faqs: [
      {
        questionBn: 'রহনপুর অফিসে গিয়ে প্রাথমিক ভিসা পরামর্শ নিতে কি কোনো ফি লাগে?',
        answerBn:
          'না। Visatrip Global-এর রহনপুর অফিসে প্রাথমিক ভিসা যোগ্যতা যাচাই, ডকুমেন্ট চেকলিস্ট ও ওমরাহ প্যাকেজ সম্পর্কে জানা সম্পূর্ণ ফ্রি — কোনো বাধ্যবাধকতা নেই।',
        questionEn: 'Is there any consultation fee for walking into the Rohanpur office?',
        answerEn:
          'No. Initial eligibility checks, document checklists, and package comparisons at our Rohanpur office are completely free with zero obligation.',
      },
      {
        questionBn: 'রহনপুর থেকে কি সরাসরি রাজশাহী বা ঢাকার ফ্লাইট টিকেট কাটা যায়?',
        answerBn:
          'হ্যাঁ, আমাদের রহনপুর ডেস্ক থেকেই Biman, US-Bangla, Novoair সহ সকল আন্তর্জাতিক এয়ারলাইনসের টিকেট ইস্যু করে প্রিন্ট কপি ও PDF সংগ্রহ করতে পারবেন।',
        questionEn: 'Can I book domestic Rajshahi–Dhaka and international flights at the Rohanpur office?',
        answerEn:
          'Yes. We issue both domestic and international tickets from our Rohanpur desk and hand over printed and PDF e-tickets with an official money receipt.',
      },
    ],
    whatsappMessageBn: 'আসসালামু আলাইকুম, আমি রহনপুর থেকে বলছি। Visatrip Global অফিসে সরাসরি দেখা করে কনসাল্টেশন নিতে চাই।',
    whatsappMessageEn: 'Assalamu Alaikum, I am in Rohanpur and would like to visit the Visatrip Global office for a consultation.',
  },
  {
    id: 'gomastapur',
    nameBn: 'গোমস্তাপুর',
    nameEn: 'Gomastapur',
    badgeBn: 'গোমস্তাপুর উপজেলার ৮টি ইউনিয়ন কাভারেজ',
    badgeEn: 'Serving All 8 Unions of Gomastapur Upazila',
    travelAccessBn: 'গোমস্তাপুর, বাঙ্গাবাড়ী, বোয়ালিয়া, চৌডালা, আলীনগর ও পার্বতীপুর থেকে ১০–২৫ মিনিট দূরত্ব',
    travelAccessEn: '10–25 minutes from Gomastapur Sadar, Bangabari, Boalia, Chowdala, Alinagar & Parbatipur',
    headlineBn: 'গোমস্তাপুর উপজেলার প্রবাসী কর্মী ও পরিবারগুলোর জন্য নিরাপদ Work Permit ও ওমরাহ সেবা',
    headlineEn: 'Safe Work Permit Verification & Family Umrah Guidance for Gomastapur Upazila',
    introBn:
      'গোমস্তাপুর উপজেলার চৌডালা, বাঙ্গাবাড়ী, বোয়ালিয়া, আলীনগর, পার্বতীপুর ও রাধানগর ইউনিয়নের বহু পরিবার বিদেশে কর্মসংস্থান, ওমরাহ এবং চিকিৎসার জন্য নির্ভরযোগ্য এজেন্সি খোঁজেন। দালালের মৌখিক প্রতিশ্রুতিতে যেন কোনো পরিবার ক্ষতিগ্রস্ত না হন, সেজন্য আমরা নিজ উপজেলাতেই সরাসরি যাচাইযোগ্য কাগজপত্র ও স্বচ্ছ খরচের মাধ্যমে সেবা দিই।',
    introEn:
      'Families across Bangabari, Boalia, Chowdala, Alinagar, Parbatipur, and Radhanagar unions in Gomastapur Upazila often face confusing verbal promises from informal brokers. We provide verifiable documentation checks, BMET awareness, and written fee breakdowns right inside Gomastapur.',
    corridorTitleBn: 'গোমস্তাপুরে Work Permit প্রতারণা প্রতিরোধ ও BMET যাচাই',
    corridorTitleEn: 'Protecting Gomastapur Job Seekers from Work Permit Fraud',
    corridorDetailBn:
      'বিদেশে কাজের অফার লেটার বা ভিসা কপি হাতে পেলে কোনো টাকা দেওয়ার আগে আমাদের রহনপুর অফিসে নিয়ে এসে সরকারি পোর্টাল (BMET / Ami Probashi ও সংশ্লিষ্ট দেশের ইমিগ্রেশন সাইট) অনুযায়ী প্রাথমিক যাচাই করার পদ্ধতি বুঝে নিন। আমরা কখনোই ট্যুরিস্ট ভিসায় বিদেশে গিয়ে কাজ করার পরামর্শ দিই না।',
    corridorDetailEn:
      'Before paying anyone for an overseas job offer, learn how to verify employer permits and BMET/Ami Probashi registration at our desk. We strictly oppose illegal tourist-to-work offers and never make false approval promises.',
    priorityServices: [
      {
        slug: 'work-permit',
        labelBn: 'নিরাপদ Work Permit কনসাল্টেশন',
        labelEn: 'Honest Work Permit Advisory',
        localNoteBn: 'দুবাই, সৌদি আরব, কাতার ও ইউরোপের বৈধ কাজের ভিসার ধাপ ও পুলিশ ক্লিয়ারেন্স গাইড।',
        localNoteEn: 'Transparent guidance on Gulf and European work permit steps, medicals, and police clearance.',
      },
      {
        slug: 'hajj-umrah',
        labelBn: 'গোমস্তাপুর ওমরাহ ও হজ্জ গ্রুপ',
        labelEn: 'Gomastapur Umrah & Hajj Support',
        localNoteBn: 'ইউনিয়ন পর্যায়ের পরিবারগুলোর জন্য সহজ বাংলা প্রশিক্ষণ ও প্রাক-প্রস্থান ওরিয়েন্টেশন।',
        localNoteEn: 'Clear Bangla orientation on Ihram, rituals, and verified Makkah-Madinah accommodations.',
      },
      {
        slug: 'tourist-visa',
        labelBn: 'দুবাই, মালয়েশিয়া ও থাইল্যান্ড ভিজিট ভিসা',
        labelEn: 'Dubai, Malaysia & Thailand Visit Visas',
        localNoteBn: 'প্রবাসী স্বজনদের কাছে বেড়াতে যাওয়ার জন্য সঠিক ইনভিটেশন ও ব্যাংক ফাইল প্রস্তুতি।',
        localNoteEn: 'Family visit and tourist visa documentation tailored for first-time international flyers.',
      },
    ],
    practicalTipsBn: [
      'গোমস্তাপুরের যেকোনো ইউনিয়ন থেকে আসার আগে WhatsApp-এ আপনার পাসপোর্টের ছবি পাঠিয়ে প্রয়োজনীয় কাগজপত্রের তালিকা নিলে একবারের ভিজিটেই কাজ শেষ করা যায়।',
      'Work Permit-এর জন্য পুলিশ ক্লিয়ারেন্স (Online Police Clearance) ও মেশিন রিডেবল/ই-পাসপোর্টের নামের বানান এনআইডির সাথে সঠিকভাবে মিলিয়ে নিন।',
      'প্রতিটি কিস্তি বা টিকেটের পেমেন্টে Visatrip Global-এর অফিসিয়াল মানি রিসিট সংগ্রহ করে সংরক্ষণ করুন।',
    ],
    practicalTipsEn: [
      'Send a quick WhatsApp message before leaving your union so you bring every required paper in a single trip.',
      'Ensure your e-Passport spelling matches your NID and Online Police Clearance before any work permit step.',
      'Keep every dated Visatrip Global money receipt safely for your family records.',
    ],
    faqs: [
      {
        questionBn: 'গোমস্তাপুরের অন্য এজেন্ট থেকে পাওয়া কাজের ভিসা কি আপনাদের অফিসে যাচাই করতে পারব?',
        answerBn:
          'আমরা আপনাকে সংশ্লিষ্ট দেশের সরকারি ইমিগ্রেশন ও BMET পোর্টালে কীভাবে ভিসা ও অফার লেটার যাচাই করতে হয়, তা সৎভাবে দেখিয়ে দিই।',
        questionEn: 'Can you help me check how to verify a work offer received in Gomastapur?',
        answerEn:
          'Yes — we guide applicants on how to check permits through official host-country immigration sites and BMET/Ami Probashi portals.',
      },
      {
        questionBn: 'গোমস্তাপুর থেকে ওমরাহর জন্য পাসপোর্ট কীভাবে তৈরি করব?',
        answerBn:
          'ই-পাসপোর্ট আবেদনের সঠিক তথ্য, পুলিশ ভেরিফিকেশন এবং পাসপোর্ট হাতে পাওয়ার পরের ওমরাহ ভিসা প্রক্রিয়া সম্পর্কে আমাদের অফিসে বিনামূল্যে গাইডলাইন পাবেন।',
        questionEn: 'Do you guide first-time Umrah pilgrims from Gomastapur on passport preparation?',
        answerEn:
          'Yes. We walk you through required passport validity (6+ months) and every step from Umrah booking to Dhaka Airport departure.',
      },
    ],
    whatsappMessageBn: 'আসসালামু আলাইকুম, আমি গোমস্তাপুর থেকে বলছি। Work Permit / ওমরাহ / ভিসা সম্পর্কে সৎ পরামর্শ চাই।',
    whatsappMessageEn: 'Assalamu Alaikum, I am from Gomastapur Upazila and would like honest guidance on Work Permit / Umrah / Visa.',
  },
  {
    id: 'nawabganj',
    nameBn: 'চাঁপাইনবাবগঞ্জ সদর (নবাবগঞ্জ)',
    nameEn: 'Nawabganj (Chapai Nawabganj Sadar)',
    badgeBn: 'জেলা সদর ও ব্যবসায়িক কেন্দ্র কাভারেজ',
    badgeEn: 'District Headquarters & Business Hub',
    travelAccessBn: 'নবাবগঞ্জ সদর থেকে রহনপুর সড়কপথে ~৪০–৫০ মিনিট · অথবা প্রথমে WhatsApp-এ ফ্রি ফাইল রিভিউ',
    travelAccessEn: '~40–50 min via road from Chapai Nawabganj Sadar to Rohanpur · Remote WhatsApp pre-check available',
    headlineBn: 'চাঁপাইনবাবগঞ্জ সদরের যাত্রীদের জন্য ওমরাহ প্যাকেজ, ইন্ডিয়া মেডিকেল ভিসা ও ট্যুরিস্ট ভিসা',
    headlineEn: 'Umrah Packages, India Medical Visas & Global Travel Support for Nawabganj',
    introBn:
      'চাঁপাইনবাবগঞ্জ সদর ও নবাবগঞ্জের ব্যবসায়ী, চাকরিজীবী, শিক্ষক ও পরিবারগুলোর মধ্যে প্রতিবছর ওমরাহ পালন, কলকাতা-ভেলোরে চিকিৎসা এবং দুবাই-থাইল্যান্ড-মালয়েশিয়া ভ্রমণের চাহিদা সবচেয়ে বেশি। রহনপুর অফিসে সরাসরি দেখা করার পাশাপাশি নবাবগঞ্জ সদরের ক্লায়েন্টরা প্রথমেই WhatsApp-এ ডকুমেন্ট ছবি পাঠিয়ে পুরো ফাইল প্রি-চেক করে নিতে পারেন।',
    introEn:
      'Entrepreneurs, professionals, mango traders, and families in Chapai Nawabganj Sadar rely on dependable support for Umrah, India medical treatment, and business or family tours. Pre-check your documents via WhatsApp first, then visit our Rohanpur office only when needed.',
    corridorTitleBn: 'চাঁপাইনবাবগঞ্জে ওমরাহ প্যাকেজ ও ব্যবসায়িক ভ্রমণের স্বচ্ছ সমাধান',
    corridorTitleEn: 'Transparent Umrah & Trade-License Visa Filing for Chapai Nawabganj',
    corridorDetailBn:
      'চাঁপাইনবাবগঞ্জের স্থানীয় ব্যবসায়ীদের (আম, চাল, কাপড় ও রপ্তানি ব্যবসা) ট্যুরিস্ট বা বিজনেস ভিসার জন্য আপডেটেড Trade License ইংরেজি অনুবাদ, TIN, এবং ৬ মাসের ব্যাংক স্টেটমেন্ট কীভাবে সাজাতে হয় — তা আমরা প্রতিটি দেশের Embassy নিয়ম অনুযায়ী যাচাই করে দিই।',
    corridorDetailEn:
      'For local business owners in Nawabganj, we verify English Trade License notarization, TIN certificates, and 6-month corporate/personal bank statements so Embassy tourist and business files stay clean and accurate.',
    priorityServices: [
      {
        slug: 'hajj-umrah',
        labelBn: 'চাঁপাইনবাবগঞ্জে ওমরাহ প্যাকেজ',
        labelEn: 'Umrah Packages in Chapai Nawabganj',
        localNoteBn: 'Economy, Standard ও VIP — মক্কা-মদিনার হোটেল দূরত্ব ও মুয়াল্লেমসহ স্বচ্ছ ১৪ দিনের ওমরাহ।',
        localNoteEn: 'Economy, Standard & VIP 14-day Umrah departures with written Haram hotel distance and Moallem.',
      },
      {
        slug: 'india-visa',
        labelBn: 'ইন্ডিয়া মেডিকেল ও অ্যাটেনডেন্ট ভিসা',
        labelEn: 'India Medical & Attendant Visa',
        localNoteBn: 'কলকাতা, ভেলোর CMC ও চেন্নাই হাসপাতালের Appointment Letter ও রাজশাহী IVAC ফাইলিং।',
        localNoteEn: 'Coordinated hospital invitations for Kolkata, Vellore CMC & Chennai plus Rajshahi IVAC filing.',
      },
      {
        slug: 'tourist-visa',
        labelBn: 'ব্যবসায়ী ও পরিবারের ট্যুরিস্ট ভিসা',
        labelEn: 'Business & Family Tourist Visas',
        localNoteBn: 'দুবাই, মালয়েশিয়া, থাইল্যান্ড, সিঙ্গাপুর ও তুরস্ক ভিসার জন্য নির্ভুল সলভেন্সি ও হোটেল ফাইল।',
        localNoteEn: 'Clean solvency, Trade License/NOC, and itinerary preparation for Dubai, Malaysia, Thailand & Turkey.',
      },
      {
        slug: 'tour-package',
        labelBn: 'কাস্টম ফ্যামিলি ও হানিমুন ট্যুর প্যাকেজ',
        labelEn: 'Family & Honeymoon Tour Packages',
        localNoteBn: 'সেন্টমার্টিন-কক্সবাজার থেকে শুরু করে দুবাই, ব্যাংকক ও মালদ্বীপের পরিচ্ছন্ন ট্যুর প্যাকেজ।',
        localNoteEn: 'Curated domestic and international packages with transparent inclusions and exclusions.',
      },
    ],
    practicalTipsBn: [
      'নবাবগঞ্জ সদরের ব্যবসায়ীরা Trade License নবায়ন (হালনাগাদ অর্থবছর) ও ইংরেজি নোটারি কপি প্রস্তুত রাখলে থাইল্যান্ড, সিঙ্গাপুর বা ইউরোপ ভিসা প্রসেসিং দ্রুত হয়।',
      'ভারতের মেডিকেল ভিসায় রোগীর সর্বশেষ বাংলাদেশি ডাক্তারের প্রেসক্রিপশন ও ডায়াগনস্টিক রিপোর্টের পরিষ্কার স্ক্যান WhatsApp-এ পাঠালে আমরা আগে থেকেই হাসপাতালের লেটার প্রসেস শুরু করতে পারি।',
      'ব্যাংক স্টেটমেন্ট তোলার আগে হঠাৎ বড় অঙ্কের টাকা জমা না দিয়ে স্বাভাবিক লেনদেন বজায় রাখুন — প্রয়োজনে আমাদের ফ্রি সলভেন্সি গাইড নিন।',
    ],
    practicalTipsEn: [
      'Keep your current fiscal-year Trade License and notarized English copy ready for Tourist Visa filings.',
      'Share clean scans of your Bangladeshi doctor prescriptions on WhatsApp so we can initiate Indian hospital letters before you travel.',
      'Avoid sudden unexplained large cash deposits right before printing a 6-month bank statement.',
    ],
    faqs: [
      {
        questionBn: 'চাঁপাইনবাবগঞ্জ সদর থেকে কি ওমরাহ প্যাকেজ বুক করতে বারবার রহনপুর যেতে হবে?',
        answerBn:
          'না। আপনি WhatsApp ও ফোনে প্যাকেজ, হোটেল ও খরচ চূড়ান্ত করে মাত্র ১ বার রহনপুর অফিসে এসে পাসপোর্ট জমা ও মানি রিসিট সংগ্রহ করতে পারবেন।',
        questionEn: 'Do Chapai Nawabganj Sadar residents need multiple trips to Rohanpur to book Umrah?',
        answerEn:
          'No. Finalize package tiers and hotel options over WhatsApp/phone, then visit our Rohanpur office once for passport handover and your official receipt.',
      },
      {
        questionBn: 'নবাবগঞ্জের শিক্ষার্থীদের জন্য কি বিদেশে উচ্চশিক্ষার প্রোফাইল মূল্যায়ন করা হয়?',
        answerBn:
          'হ্যাঁ, নবাবগঞ্জ সরকারি কলেজসহ জেলার সকল কলেজ ও বিশ্ববিদ্যালয় শিক্ষার্থীদের জন্য যুক্তরাজ্য, কানাডা, অস্ট্রেলিয়া, মালয়েশিয়া ও ইউরোপের ফ্রি প্রোফাইল ইভ্যালুয়েশন দেওয়া হয়।',
        questionEn: 'Do you evaluate study abroad profiles for students in Chapai Nawabganj Sadar?',
        answerEn:
          'Yes — we provide free academic and bank-solvency evaluations for HSC, Honours, and Masters students targeting the UK, Canada, Australia, Malaysia, and Europe.',
      },
    ],
    whatsappMessageBn: 'আসসালামু আলাইকুম, আমি চাঁপাইনবাবগঞ্জ সদর (নবাবগঞ্জ) থেকে বলছি। ওমরাহ প্যাকেজ / ভিসা সম্পর্কে জানতে চাই।',
    whatsappMessageEn: 'Assalamu Alaikum, I am from Chapai Nawabganj Sadar (Nawabganj) and would like to inquire about Umrah / Visa services.',
  },
  {
    id: 'shibganj',
    nameBn: 'শিবগঞ্জ',
    nameEn: 'Shibganj',
    badgeBn: 'সোনামসজিদ স্থলবন্দর ও শিবগঞ্জ উপজেলা',
    badgeEn: 'Sona Masjid Land Port & Shibganj Corridor',
    travelAccessBn: 'শিবগঞ্জ ও কানসাট থেকে রহনপুর সরাসরি সংযোগ · WhatsApp-এ ফ্রি প্রি-স্ক্রিনিং সুবিধা',
    travelAccessEn: 'Direct regional access from Shibganj & Kansat to Rohanpur · Free WhatsApp pre-screening first',
    headlineBn: 'শিবগঞ্জ ও সোনামসজিদ করিডোরের যাত্রীদের জন্য ইন্ডিয়া ভিসা, পোর্ট গাইড ও প্রবাসী সেবা',
    headlineEn: 'India Visa Port Guidance, Medical Travel & Worker Safety for Shibganj',
    introBn:
      'শিবগঞ্জ উপজেলা ও কানসাট-সোনামসজিদ এলাকার মানুষ সবচেয়ে বেশি যাতায়াত করেন সোনামসজিদ স্থলবন্দর হয়ে ভারতে চিকিৎসা ও ভ্রমণের জন্য এবং মধ্যপ্রাচ্য-মালয়েশিয়ায় কাজের উদ্দেশ্যে। সঠিক Port of Entry নির্বাচন, IVAC রাজশাহীর ফাইল প্রস্তুতি এবং নিরাপদ Work Permit পরামর্শে Visatrip Global শিবগঞ্জবাসীর নির্ভরযোগ্য সঙ্গী।',
    introEn:
      'Travelers from Shibganj, Kansat, and the Sona Masjid border belt frequently cross into India for medical care or travel abroad for skilled employment. We help Shibganj families select the right Indian Port of Entry, prepare error-free IVAC Rajshahi files, and avoid work permit scams.',
    corridorTitleBn: 'সোনামসজিদ স্থলবন্দর (Port of Entry) ও IVAC রাজশাহী নির্দেশনা',
    corridorTitleEn: 'Sona Masjid Land Port & IVAC Rajshahi Filing Support',
    corridorDetailBn:
      'ইন্ডিয়া মেডিকেল বা ট্যুরিস্ট ভিসা আবেদনে সোনামসজিদ/মাহদিপুর, হরিদাসপুর (বেনাপোল) নাকি বাই এয়ার (By Air) — কোন Port of Entry আপনার চিকিৎসার শহর (কলকাতা, ভেলোর বা চেন্নাই) ও বর্তমান নিয়ম অনুযায়ী সবচেয়ে উপযোগী, তা আবেদনের আগেই নির্ভুলভাবে নির্বাচন করে দেওয়া হয় যাতে বর্ডারে কোনো ভোগান্তি না হয়।',
    corridorDetailEn:
      'Choosing the right Port of Entry (By Air, Haridaspur/Benapole, or applicable land ports per current High Commission notices) avoids border rejection. We verify current IVAC Rajshahi port rules before submitting your form.',
    priorityServices: [
      {
        slug: 'india-visa',
        labelBn: 'ইন্ডিয়া মেডিকেল ও ট্যুরিস্ট ভিসা (IVAC রাজশাহী)',
        labelEn: 'India Medical & Tourist Visa (IVAC Rajshahi)',
        localNoteBn: 'রোগী ও অ্যাটেনডেন্টের ফর্ম, হাসপাতালের আমন্ত্রণপত্র এবং বর্ডার/এয়ার পোর্ট সঠিক নির্বাচন।',
        localNoteEn: 'Patient + attendant forms, Indian hospital invitations, and accurate Port of Entry selection.',
      },
      {
        slug: 'work-permit',
        labelBn: 'মধ্যপ্রাচ্য ও ইউরোপ Work Permit যাচাই',
        labelEn: 'Middle East & Europe Work Permit Advisory',
        localNoteBn: 'শিবগঞ্জের বিদেশগামী যুবকদের জন্য বৈধ রিক্রুটিং, BMET স্মার্ট কার্ড ও চুক্তিপত্র যাচাই গাইড।',
        localNoteEn: 'Honest guidance on legal recruiting, BMET Smart Cards, and contract checks before paying fees.',
      },
      {
        slug: 'hajj-umrah',
        labelBn: 'ওমরাহ ও হজ্জ প্যাকেজ পরামর্শ',
        labelEn: 'Umrah & Hajj Packages',
        localNoteBn: 'শিবগঞ্জ ও কানসাটের পরিবারগুলোর জন্য নির্ভরযোগ্য মুয়াল্লেম ও লিখিত হোটেল ও দূরত্বের বিবরণ।',
        localNoteEn: 'Reliable Moallem-led Umrah groups with written hotel distance disclosures.',
      },
    ],
    practicalTipsBn: [
      'ইন্ডিয়া ভিসার অনলাইন ফর্মে বর্তমান ঠিকানা অবশ্যই আপনার সর্বশেষ বিদ্যুৎ বা গ্যাস বিলের (Utility Bill) সাথে হুবহু মিলিয়ে লিখুন — ঠিকানায় অমিল হলে IVAC কাউন্টারে ফাইল ফেরত আসতে পারে।',
      'চিকিৎসার জন্য ভেলোর বা চেন্নাই যেতে চাইলে সোনামসজিদ/মালদা হয়ে ট্রেন নাকি ঢাকা–কলকাতা/চেন্নাই বাই এয়ার — কোনটি রোগীর জন্য আরামদায়ক তা আগে পরিকল্পনা করুন।',
      'শিবগঞ্জ থেকে রহনপুর আসার আগে WhatsApp-এ কাগজপত্রের ছবি দেখালে কোনো ডকুমেন্ট বাদ পড়ার ঝুঁকি থাকে না।',
    ],
    practicalTipsEn: [
      'Match your IVAC form present address verbatim with your recent electricity/utility bill to prevent counter rejections.',
      'For elderly patients visiting Vellore or Chennai, compare land-port rail connections vs Dhaka–Kolkata/Chennai flights before picking your Port of Entry.',
      'Pre-screen document photos on WhatsApp before visiting our desk so nothing is missed.',
    ],
    faqs: [
      {
        questionBn: 'শিবগঞ্জ থেকে ইন্ডিয়া মেডিকেল ভিসা করলে কি রাজশাহী IVAC-তে পাসপোর্ট জমা দিতে হয়?',
        answerBn:
          'সাধারণত চাঁপাইনবাবগঞ্জ জেলার (শিবগঞ্জসহ) আবেদনকারীরা রাজশাহী IVAC সেন্টারে আবেদন জমা দেন। আমরা আপনার সম্পূর্ণ ফাইল ও অনলাইন ফর্ম প্রস্তুত করে দিই যাতে জমা দেওয়ার দিন কোনো ত্রুটি না থাকে।',
        questionEn: 'Do Shibganj applicants submit India Medical Visa files at IVAC Rajshahi?',
        answerEn:
          'Typically yes — applicants from Chapai Nawabganj district (including Shibganj) file through IVAC Rajshahi. We prepare your complete file and hospital letter so submission is smooth.',
      },
      {
        questionBn: 'শিবগঞ্জ থেকে অনলাইনে এয়ার টিকেট বা হোটেল বুকিং করে WhatsApp-এ কপি নেওয়া যাবে?',
        answerBn:
          'হ্যাঁ, কলকাতা, চেন্নাই, দুবাই বা সৌদি আরবের ফ্লাইট টিকেট ও হোটেল ভাউচার যাচাই করে অফিশিয়াল মানি রিসিটসহ PDF কপি WhatsApp-এ পাঠানো হয়।',
        questionEn: 'Can Shibganj residents book verified flights and Kolkata/Chennai hotels via WhatsApp?',
        answerEn:
          'Yes — once payment is verified via Bank, bKash, or Nagad, we issue verified e-tickets, hotel vouchers, and your dated Visatrip Global money receipt.',
      },
    ],
    whatsappMessageBn: 'আসসালামু আলাইকুম, আমি শিবগঞ্জ থেকে বলছি। ইন্ডিয়া ভিসা / Work Permit / ওমরাহ সম্পর্কে জানতে চাই।',
    whatsappMessageEn: 'Assalamu Alaikum, I am from Shibganj and would like assistance with India Visa / Work Permit / Umrah.',
  },
  {
    id: 'rajshahi',
    nameBn: 'রাজশাহী',
    nameEn: 'Rajshahi',
    badgeBn: 'রাজশাহী বিভাগীয় শহর · শিক্ষার্থী ও ফ্লাইট হাব',
    badgeEn: 'Rajshahi Divisional Hub · Students & Aviation',
    travelAccessBn: 'রাজশাহী শহর থেকে সম্পূর্ণ রিমোট WhatsApp + ফোন কনসাল্টেশন · এবং রহনপুর অফিসে সরাসরি ভিজিট সুবিধা',
    travelAccessEn: 'Full remote WhatsApp & phone consultation across Rajshahi City · Direct office access in Rohanpur',
    headlineBn: 'রাজশাহীর শিক্ষার্থী, গবেষক ও ভ্রমণকারীদের জন্য স্টুডেন্ট ভিসা, এয়ার টিকেট ও ট্যুরিস্ট ভিসা',
    headlineEn: 'Student Consultancy, Air Ticketing & Global Visa Advisory for Rajshahi',
    introBn:
      'রাজশাহী বিশ্ববিদ্যালয় (RU), রুয়েট (RUET), রাজশাহী মেডিকেল কলেজ ও রাজশাহী কলেজের শিক্ষার্থী এবং শহরের পরিবারগুলোর জন্য উচ্চশিক্ষা কনসাল্টেন্সি, আন্তর্জাতিক ট্যুরিস্ট ভিসা, ওমরাহ এবং শাহ মখদুম বিমানবন্দর (RJH) সংযুক্ত এয়ার টিকেটিংয়ে Visatrip Global দিচ্ছে সম্পূর্ণ স্বচ্ছ ও নির্ভরযোগ্য সেবা।',
    introEn:
      'Students from the University of Rajshahi (RU), RUET, Rajshahi Medical College, and families across Rajshahi City trust Visatrip Global for candid Study Abroad guidance, Rajshahi (RJH) connecting international flight tickets, Tourist Visas, and organized Umrah packages.',
    corridorTitleBn: 'শাহ মখদুম বিমানবন্দর (RJH) কানেক্টিং ফ্লাইট ও উচ্চশিক্ষা ডকুমেন্টেশন',
    corridorTitleEn: 'Shah Makhdum Airport (RJH) Connections & Study Abroad File Readiness',
    corridorDetailBn:
      'রাজশাহী থেকে ঢাকা (RJH–DAC) অভ্যন্তরীণ ফ্লাইটের সাথে আন্তর্জাতিক ফ্লাইটের সঠিক ট্রানজিট সময় মিলিয়ে টিকেট বুকিং, এবং যুক্তরাজ্য, কানাডা, অস্ট্রেলিয়া, মালয়েশিয়া ও ইউরোপের জন্য SOP, একাডেমিক ট্রান্সক্রিপ্ট সত্যায়ন (MOFA) ও ব্যাংক সলভেন্সি গাইডলাইন — সবকিছুই পাচ্ছেন এক জায়গা থেকে।',
    corridorDetailEn:
      'We coordinate safe transit buffers between Rajshahi–Dhaka (RJH–DAC) flights and international departures, alongside honest university shortlisting, MOFA attestation checklists, and 28-day/6-month bank solvency planning for UK, Canada, Australia, Malaysia & Europe.',
    priorityServices: [
      {
        slug: 'student-consultancy',
        labelBn: 'রাজশাহী শিক্ষার্থীদের স্টুডেন্ট কনসালটেন্সি',
        labelEn: 'Study Abroad Consultancy for Rajshahi Students',
        localNoteBn: 'UK, Canada, Australia, Malaysia ও Europe-এর বিশ্ববিদ্যালয় নির্বাচন, অফার লেটার ও ভিসা ফাইলিং।',
        localNoteEn: 'University shortlisting, SOP structure, and embassy visa filing for UK, Canada, Australia, Malaysia & Europe.',
      },
      {
        slug: 'air-ticketing',
        labelBn: 'রাজশাহী (RJH) ও আন্তর্জাতিক এয়ার টিকেটিং',
        labelEn: 'Rajshahi (RJH) & International Air Ticketing',
        localNoteBn: 'স্টুডেন্ট এক্সট্রা ব্যাগেজ ফেয়ার, ফ্যামিলি রিটার্ন টিকেট এবং ডেট-চেঞ্জ সাপোর্ট।',
        localNoteEn: 'Student extra-baggage fares, domestic RJH–DAC connections, and clear refund/date-change policies.',
      },
      {
        slug: 'tourist-visa',
        labelBn: 'ট্যুরিস্ট ও কনফারেন্স ভিসা গাইড',
        labelEn: 'Tourist & Academic Conference Visas',
        localNoteBn: 'থাইল্যান্ড, মালয়েশিয়া, সিঙ্গাপুর, দুবাই, তুরস্ক ও শেনজেন/ইউরোপ ভিসার নির্ভুল ডকুমেন্ট চেক।',
        localNoteEn: 'Document checklists for Thailand, Malaysia, Singapore, Dubai, Turkey, and Schengen visits.',
      },
      {
        slug: 'hajj-umrah',
        labelBn: 'রাজশাহী বিভাগ ওমরাহ প্যাকেজ',
        labelEn: 'Umrah Packages for Rajshahi Division',
        localNoteBn: 'পরিবারের প্রবীণ সদস্যদের জন্য আরামদায়ক হোটেল ও স্বচ্ছ পেমেন্ট শিডিউল।',
        localNoteEn: 'Comfortable Haram-accessible hotels and milestone payment schedules for Rajshahi families.',
      },
    ],
    practicalTipsBn: [
      'বিদেশে উচ্চশিক্ষার জন্য ব্যাংক স্পনসরের (বাবা/মা) অ্যাকাউন্টে প্রয়োজনীয় তহবিল দেশের নিয়ম অনুযায়ী কমপক্ষে ২৮ দিন থেকে ৬ মাস আগেই পরিকল্পনা করুন — শেষ মুহূর্তের ফান্ড রিজেকশনের বড় কারণ।',
      'রাজশাহী–ঢাকা ফ্লাইট ও ঢাকা থেকে আন্তর্জাতিক ফ্লাইটের মাঝে পর্যাপ্ত ট্রানজিট সময় (কমপক্ষে ৫–৬ ঘণ্টা) রাখলে ফ্লাইট বিলম্বের ঝুঁকি এড়ানো যায়।',
      'রাজশাহী শহর থেকে WhatsApp-এ PDF ডকুমেন্ট পাঠিয়ে সম্পূর্ণ কনসাল্টেশন ও ফাইল চেক সম্পন্ন করতে পারবেন।',
    ],
    practicalTipsEn: [
      'Plan parent/sponsor bank funds 28 days to 6 months ahead (depending on UK, Australia, or Canada rules) — last-minute deposits are a leading refusal cause.',
      'Leave at least 5–6 hours of buffer between Rajshahi (RJH) domestic arrivals and international departures from Dhaka (DAC).',
      'Send PDF transcripts or passport copies securely via WhatsApp for a full remote evaluation without leaving Rajshahi City.',
    ],
    faqs: [
      {
        questionBn: 'রাজশাহী শহর থেকে কি সরাসরি অফিসে না গিয়েই স্টুডেন্ট বা ট্যুরিস্ট ভিসার পরামর্শ নেওয়া যাবে?',
        answerBn:
          'অবশ্যই। রাজশাহী শহর ও সারা বাংলাদেশের ক্লায়েন্টদের জন্য WhatsApp ও ফোনে পূর্ণ কনসাল্টেশন, PDF চেকলিস্ট এবং ডকুমেন্ট রিভিউ সুবিধা চালু আছে। প্রয়োজনে রহনপুর অফিসে সরাসরি দেখা করার সুযোগও রয়েছে।',
        questionEn: 'Can Rajshahi City students and families complete consultations remotely?',
        answerEn:
          'Yes. We support full consultations, PDF checklists, and document reviews via WhatsApp and phone across Rajshahi and nationwide, with optional walk-in meetings at our Rohanpur office.',
      },
      {
        questionBn: 'রাজশাহী শিক্ষার্থীদের জন্য কি স্টুডেন্ট এক্সট্রা ব্যাগেজ এয়ার টিকেট পাওয়া যায়?',
        answerBn:
          'হ্যাঁ, ভ্যালিড স্টুডেন্ট ভিসা ও ইউনিভার্সিটি অফার লেটার থাকলে নির্দিষ্ট আন্তর্জাতিক এয়ারলাইনসের Student Fare ও অতিরিক্ত ব্যাগেজ সুবিধা আমরা যাচাই করে বুকিং দিই।',
        questionEn: 'Do you arrange student extra-baggage air tickets for Rajshahi students flying abroad?',
        answerEn:
          'Yes — with a valid student visa and university offer letter, we check airline Student Fares that include extra baggage allowance and flexible date changes.',
      },
    ],
    whatsappMessageBn: 'আসসালামু আলাইকুম, আমি রাজশাহী থেকে বলছি। স্টুডেন্ট ভিসা / এয়ার টিকেট / ট্যুরিস্ট ভিসা সম্পর্কে জানতে চাই।',
    whatsappMessageEn: 'Assalamu Alaikum, I am from Rajshahi and would like guidance on Student Visa / Air Ticketing / Tourist Visa.',
  },
];

export interface ServiceLocalCallout {
  kickerBn: string;
  kickerEn: string;
  headingBn: string;
  headingEn: string;
  bodyBn: string;
  bodyEn: string;
  featuredAreaIds: LocalAreaGuide['id'][];
}

/**
 * Natural, location-aware copy blocks surfaced on individual service pages
 * (zero keyword stuffing — genuinely explains how Chapai Nawabganj, Rajshahi division,
 * and nationwide Bangladesh clients use each service).
 */
export const serviceLocalCallouts: Record<string, ServiceLocalCallout> = {
  'hajj-umrah': {
    kickerBn: 'স্থানীয় ওমরাহ ও হজ্জ সহায়তা · চাঁপাইনবাবগঞ্জ ও রাজশাহী বিভাগ',
    kickerEn: 'Local Umrah & Hajj Support · Chapai Nawabganj & Rajshahi',
    headingBn: 'চাঁপাইনবাবগঞ্জে ওমরাহ প্যাকেজ ও হজ্জ গাইডলাইন — নিজ এলাকার বিশ্বস্ত অফিস থেকে',
    headingEn: 'Trusted Umrah & Hajj Guidance in Chapai Nawabganj & Rajshahi Division',
    bodyBn:
      'রহনপুর, গোমস্তাপুর, চাঁপাইনবাবগঞ্জ সদর, শিবগঞ্জ ও রাজশাহীর পরিবারগুলোর জন্য আমাদের স্থায়ী অফিসে বসেই ওমরাহ প্যাকেজ, মক্কা-মদিনার হোটেল দূরত্ব এবং কিস্তি কাঠামো লিখিতভাবে যাচাই করার সুবিধা রয়েছে। ঢাকার বিমানবন্দর প্রস্থান থেকে শুরু করে মক্কা-মদিনা জিয়ারাহ পর্যন্ত প্রতিটি ধাপে সহজ বাংলা গাইডলাইন দেওয়া হয়।',
    bodyEn:
      'Families from Rohanpur, Gomastapur, Nawabganj, Shibganj, and Rajshahi can sit down at our permanent office to review written Makkah-Madinah hotel distances and milestone schedules, or coordinate smoothly from anywhere in Bangladesh via WhatsApp.',
    featuredAreaIds: ['rohanpur', 'gomastapur', 'nawabganj', 'rajshahi'],
  },
  'india-visa': {
    kickerBn: 'রাজশাহী IVAC ও সোনামসজিদ করিডোর সহায়তা',
    kickerEn: 'Rajshahi IVAC & Sona Masjid Corridor Assistance',
    headingBn: 'চাঁপাইনবাবগঞ্জ, শিবগঞ্জ ও রাজশাহী থেকে ইন্ডিয়া মেডিকেল ও ট্যুরিস্ট ভিসা প্রস্তুতি',
    headingEn: 'India Medical & Tourist Visa Preparation Across Chapai Nawabganj & Rajshahi',
    bodyBn:
      'কলকাতা, ভেলোর (CMC) ও চেন্নাইয়ে চিকিৎসার জন্য রোগী ও অ্যাটেনডেন্টের ফাইল, হাসপাতালের ইনভিটেশন লেটার এবং সঠিক Port of Entry (সোনামসজিদ/হরিদাসপুর/বাই এয়ার) নির্ধারণে চাঁপাইনবাবগঞ্জ, শিবগঞ্জ ও রাজশাহীর পরিবারগুলোকে আমরা সম্পূর্ণ ডকুমেন্ট সহায়তা দিই।',
    bodyEn:
      'We assist patients and families from Chapai Nawabganj, Shibganj, Gomastapur, and Rajshahi with Indian hospital invitation letters, error-free IVAC Rajshahi forms, and accurate Port of Entry selection.',
    featuredAreaIds: ['shibganj', 'nawabganj', 'rohanpur', 'rajshahi'],
  },
  'work-permit': {
    kickerBn: 'নিরাপদ অভিবাসন ও প্রতারণা প্রতিরোধ · চাঁপাইনবাবগঞ্জ',
    kickerEn: 'Safe Migration Support · Chapai Nawabganj & Bangladesh',
    headingBn: 'চাঁপাইনবাবগঞ্জ, গোমস্তাপুর ও শিবগঞ্জ থেকে নিরাপদ Work Permit কনসাল্টেশন',
    headingEn: 'Honest Work Permit Advisory for Gomastapur, Shibganj & Chapai Nawabganj',
    bodyBn:
      'বিদেশে কাজের নামে দালালের প্রতারণা এড়াতে রহনপুর, গোমস্তাপুর ও শিবগঞ্জের কর্মপ্রত্যাশীদের জন্য আমাদের স্থায়ী অফিসে BMET/আমি প্রবাসী প্রক্রিয়া, বৈধ ডকুমেন্ট চেকলিস্ট এবং স্বচ্ছ ফি কাঠামো খোলাখুলি বুঝিয়ে দেওয়া হয়।',
    bodyEn:
      'To protect job seekers across Gomastapur, Shibganj, Nawabganj, and Bangladesh from informal broker scams, we walk through official BMET/Ami Probashi verification, legal paperwork, and written fees at our Rohanpur office.',
    featuredAreaIds: ['gomastapur', 'shibganj', 'rohanpur', 'nawabganj'],
  },
  'student-consultancy': {
    kickerBn: 'রাজশাহী বিভাগ ও চাঁপাইনবাবগঞ্জ উচ্চশিক্ষা ডেস্ক',
    kickerEn: 'Rajshahi Division & Chapai Nawabganj Study Abroad Desk',
    headingBn: 'রাজশাহী, চাঁপাইনবাবগঞ্জ ও সারা বাংলাদেশের শিক্ষার্থীদের জন্য ফ্রি প্রোফাইল রিভিউ',
    headingEn: 'Free Study Abroad Profile Evaluation for Rajshahi & Chapai Nawabganj Students',
    bodyBn:
      'রাজশাহী বিশ্ববিদ্যালয়, রুয়েট, নবাবগঞ্জ সরকারি কলেজ এবং জেলার কলেজ-বিশ্ববিদ্যালয়ের শিক্ষার্থীরা ঢাকা না গিয়েই WhatsApp বা আমাদের রহনপুর অফিস থেকে UK, Canada, Australia, Malaysia ও Europe-এর বিশ্ববিদ্যালয় শর্টলিস্ট ও ব্যাংক সলভেন্সি গাইডলাইন নিতে পারবেন।',
    bodyEn:
      'Students from Rajshahi (RU, RUET, RMC) and Chapai Nawabganj can complete honest university shortlisting, SOP reviews, and bank solvency planning remotely via WhatsApp or in person at our Rohanpur desk.',
    featuredAreaIds: ['rajshahi', 'nawabganj', 'rohanpur', 'gomastapur'],
  },
  'air-ticketing': {
    kickerBn: 'রাজশাহী (RJH) ও ঢাকা (DAC) এয়ার টিকেট ডেস্ক',
    kickerEn: 'Rajshahi (RJH) & Dhaka (DAC) Air Ticketing Desk',
    headingBn: 'চাঁপাইনবাবগঞ্জ ও রাজশাহী থেকে দেশি-আন্তর্জাতিক এয়ার টিকেট বুকিং',
    headingEn: 'Domestic & International Air Ticketing from Chapai Nawabganj & Rajshahi',
    bodyBn:
      'রাজশাহীর শাহ মখদুম বিমানবন্দর (RJH) থেকে ঢাকা ফ্লাইট এবং সৌদি আরব, দুবাই, মালয়েশিয়া, ভারত ও ইউরোপের আন্তর্জাতিক এয়ার টিকেট — সরাসরি রহনপুর অফিস বা WhatsApp-এর মাধ্যমে অফিসিয়াল মানি রিসিটসহ ইস্যু করুন।',
    bodyEn:
      'Book Rajshahi–Dhaka domestic flights and international tickets to Saudi Arabia, Dubai, Malaysia, India, and Europe from our Rohanpur office or via WhatsApp with verified e-tickets and official receipts.',
    featuredAreaIds: ['rohanpur', 'rajshahi', 'nawabganj', 'shibganj'],
  },
  'tourist-visa': {
    kickerBn: 'চাঁপাইনবাবগঞ্জ ও রাজশাহী বিভাগ ভিসা ডেস্ক',
    kickerEn: 'Chapai Nawabganj & Rajshahi Visa Desk',
    headingBn: 'চাঁপাইনবাবগঞ্জ ও রাজশাহী থেকে দুবাই, মালয়েশিয়া, থাইল্যান্ড ও সিঙ্গাপুর ভিজিট ভিসা',
    headingEn: 'Dubai, Malaysia, Thailand & Singapore Tourist Visas from Chapai Nawabganj',
    bodyBn:
      'ব্যবসায়ী, চাকরিজীবী ও পরিবারের প্রথমবার বিদেশ ভ্রমণের জন্য Trade License, NOC, ব্যাংক স্টেটমেন্ট এবং হোটেল-ফ্লাইট ইটিনারারি নির্ভুলভাবে সাজিয়ে দেওয়া হয় — সরাসরি রহনপুর অফিসে অথবা WhatsApp-এ।',
    bodyEn:
      'Whether you are a business owner in Nawabganj, a family in Gomastapur, or a traveler in Rajshahi, we prepare clean Trade License/NOC, bank statement, and itinerary files for top global tourist destinations.',
    featuredAreaIds: ['nawabganj', 'rajshahi', 'rohanpur', 'gomastapur'],
  },
  'hotel-booking': {
    kickerBn: 'যাচাইকৃত হোটেল বুকিং · চাঁপাইনবাবগঞ্জ ও সারা বাংলাদেশ',
    kickerEn: 'Verified Hotel Booking · Chapai Nawabganj & Bangladesh',
    headingBn: 'মক্কা-মদিনা, কলকাতা, দুবাই ও কক্সবাজারের নিরাপদ হোটেল বুকিং',
    headingEn: 'Confirmed Hotel Reservations for Pilgrims, Patients & Families',
    bodyBn:
      'চিকিৎসার জন্য কলকাতা-ভেলোরে হাসপাতালের কাছাকাছি হোটেল কিংবা ওমরাহয় হারাম শরীফের নিকটবর্তী হোটেল — বুকিংয়ের আগেই প্রকৃত দূরত্ব ও চেক-ইন নীতিমালা যাচাই করে লিখিত কনফার্মেশন ভাউচার দেওয়া হয়।',
    bodyEn:
      'From hospital-adjacent stays in Kolkata and Vellore for Chapai Nawabganj medical travelers to Haram-accessible hotels in Makkah and Madinah, every booking includes a verifiable voucher.',
    featuredAreaIds: ['rohanpur', 'nawabganj', 'shibganj', 'rajshahi'],
  },
  'tour-package': {
    kickerBn: 'পরিবারবান্ধব ট্যুর প্যাকেজ · চাঁপাইনবাবগঞ্জ ও রাজশাহী বিভাগ',
    kickerEn: 'Family-Friendly Tour Packages · Chapai Nawabganj & Rajshahi',
    headingBn: 'চাঁপাইনবাবগঞ্জ ও রাজশাহী থেকে আন্তর্জাতিক ও দেশীয় কাস্টম ট্যুর প্যাকেজ',
    headingEn: 'Custom International & Domestic Tour Packages from Chapai Nawabganj',
    bodyBn:
      'পরিবার, হানিমুন বা কর্পোরেট গ্রুপের জন্য দুবাই, থাইল্যান্ড, মালয়েশিয়া, সিঙ্গাপুর, মালদ্বীপ ও কক্সবাজারের ট্যুর প্যাকেজ — প্যাকেজে কী কী থাকছে তার স্পষ্ট বিবরণ ও দিনভিত্তিক সূচিসহ আমাদের রহনপুর ডেস্ক থেকে পরিকল্পনা করুন।',
    bodyEn:
      'Plan stress-free family, honeymoon, or group tours to Dubai, Thailand, Malaysia, Singapore, Maldives, and Cox’s Bazar with itemized inclusions from our Rohanpur office or online.',
    featuredAreaIds: ['nawabganj', 'rajshahi', 'rohanpur', 'gomastapur'],
  },
};
