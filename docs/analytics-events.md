# Visatrip Global — Analytics Events & Lead Generation Tracking Guide

This document defines every conversion and engagement event emitted by the Visatrip Global website (`www.visatripglobal.com`), how events flow into **Google Analytics 4 (GA4)**, **Google Tag Manager (`window.dataLayer`)**, and **Meta Pixel (`fbq`)**, and how to manage owner-confirmed trust claims such as response-time commitments.

---

## 1. Architecture Overview

All frontend tracking routes through a single typed dispatcher:

- **Dispatcher**: `src/lib/analytics.ts` → `trackAnalyticsEvent(eventName, params)`
- **Page & Service Context Resolver**: `src/lib/leadContext.ts` → `getPageLeadContext(pathname, locale)`

Every event automatically includes four normalized attribution fields — callers do not need to pass them manually (though callers can override `service` when a user interacts with a specific card or visa checker selection):

| Auto-Enriched Field | Type | Description | Example Values |
| :--- | :--- | :--- | :--- |
| `page_path` | `string` | Current pathname (`window.location.pathname`) | `/services/hajj-umrah`, `/destinations/dubai`, `/en/contact` |
| `page_type` | `string` | Normalized template category | `home`, `service_detail`, `services_overview`, `destination_detail`, `destinations`, `package_detail`, `packages`, `blog_detail`, `blog_list`, `visa_checker`, `track_application`, `about`, `contact`, `faq`, `licenses`, `success_stories`, `gallery`, `legal` |
| `service` | `string` | Context-aware service or destination label | `Hajj & Umrah`, `Work Permit`, `India Visa Processing`, `Dubai Visa`, `General Consultancy` |
| `locale` | `'bn' \| 'en'` | Active interface language | `bn`, `en` |

### Destination Pipelines

When `trackAnalyticsEvent(event, params)` fires:

1. **Google Tag Manager (`window.dataLayer`)**: Always pushes `{ event, ...enrichedParams }` so GTM triggers can match exact event names.
2. **Google Analytics 4 (`window.gtag`)**: Calls `window.gtag('event', event, enrichedParams)` if `gtag` is loaded.
3. **Meta Pixel (`window.fbq`)**:
   - `form_submit` → fires standard Meta `Lead` event (`content_name`, `content_category`, `form_type`).
   - `checklist_download` → fires standard Meta `Lead` event (`content_name: 'Checklist PDF'`, `checklist_id`).
   - `whatsapp_click` / `call_click` → fires standard Meta `Contact` event (`contact_channel: 'whatsapp' | 'phone'`, `service`, `location`).
   - All other events → fires `fbq('trackCustom', event, enrichedParams)`.

---

## 2. Complete Event Taxonomy

| Event Name | Trigger | Custom Parameters | Primary Conversion? |
| :--- | :--- | :--- | :--- |
| `cta_click` | Any primary/secondary consultation button, hero quick-search submit, or section CTA click | `cta_label`, `cta_location`, optional `service`, `destination` | Secondary |
| `form_start` | First focus/input inside any `InquiryForm` or `ChecklistModal` (fires **once** per form session) | `form_type`, `location` | Funnel Step |
| `form_submit` | Successful submission of `InquiryForm` or `ChecklistModal` | `form_type`, `status` (`'success'`), optional `country`, `has_optional_details` | **Primary Conversion (GA4 Key Event / Meta Lead)** |
| `whatsapp_click` | Click on any WhatsApp button (Hero, Navbar, Mobile Sticky Bar, Floating Button, Section Strip, CTA Banner, Contact Card, Post-Form Success, Tracker Result) | `location`, `prefilled_topic` | **Primary Conversion (GA4 Key Event / Meta Contact)** |
| `call_click` | Click on any `tel:` hotline link (`+880 1771-304219`) | `location` | **Primary Conversion (GA4 Key Event / Meta Contact)** |
| `lead_magnet_impression` | Exit-intent modal (desktop) or Scroll-depth checklist card (mobile/desktop) becomes visible | `trigger` (`'exit_intent'` \| `'scroll_depth'`), `checklist_id` | Funnel Step |
| `lead_magnet_click` | User clicks to open a Checklist PDF lead magnet from scroll prompt, section strip, or Visa Checker | `trigger`, `location`, `checklist_id` | Funnel Step |
| `checklist_download` | Printable A4 Checklist `.pdf` successfully generated and downloaded after submitting Name + WhatsApp | `checklist_id`, `trigger`, `file_format` (`'pdf'`) | **Primary Conversion (GA4 Key Event / Meta Lead)** |
| `scroll_depth` | Visitor reaches `25%`, `50%`, `75%`, or `90%` vertical scroll on a route (fires once per threshold per route) | `percent` (`25 \| 50 \| 75 \| 90`) | Engagement |

---

## 3. Location Naming Conventions (`location` / `cta_location`)

Every placement sends a deterministic identifier so you can compare conversion rates across positions (Above the Fold vs. Mid-Page vs. Sticky Mobile Bar):

### Global Chrome
- `navbar_desktop_whatsapp`, `navbar_mobile_drawer_whatsapp`
- `navbar_desktop_call`, `navbar_mobile_drawer_call`
- `floating_whatsapp_desktop`
- `mobile_sticky_bar` (WhatsApp & Call)
- `cta_banner` (bottom-of-page conversion section)

### Above-the-Fold Heroes
- `home_hero_primary`, `home_hero_whatsapp`, `home_hero_quick_search`
- `service_detail_hero`
- `destination_detail_hero`
- `package_detail_hero`
- `blog_detail_hero`
- `about_hero`, `services_overview_hero`, `destinations_hero`, `packages_hero`, `visa_checker_hero`, `track_application_hero`, `success_stories_hero`, `gallery_hero`, `blog_list_hero`, `faq_hero`, `contact_hero`, `licenses_hero`, `legal_privacy_hero`, `legal_terms_hero`, `legal_refund_hero`

### Post-Section Conversion Strips
- Home: `home_after_services`, `home_after_india_visa`, `home_after_scam_awareness`, `home_how_it_works`, `home_hajj_banner`
- Service Detail: `service_detail_after_documents`, `service_detail_sidebar`
- Destination Detail: `destination_detail_after_documents`
- Package Detail: `package_detail_after_inclusions`
- Blog Detail: `blog_detail_after_article`
- About / Services Overview: `about_after_values`, `services_overview_after_grid`
- Tools / Contact: `visa_checker_result`, `track_application_result`, `contact_card`, `contact_card_button`

### Lead Magnets
- `exit_intent` (Desktop only: triggers after ≥12s dwell when cursor exits top viewport, capped once per session)
- `scroll_depth` (Mobile + Desktop: triggers after ≥10s dwell and ≥55% page scroll, suppressed on `/admin/*`, suppressed while mobile keyboard is open, capped once per session)

---

## 4. Context-Aware WhatsApp Messages

Every WhatsApp CTA automatically builds a page-specific pre-filled greeting via `getPageLeadContext()` in `src/lib/leadContext.ts`:

| Page / Route | Pre-Filled Bangla Message (Example) |
| :--- | :--- |
| `/services/hajj-umrah` | `আসসালামু আলাইকুম, আমি ওমরাহ ও হজ্জ প্যাকেজ সম্পর্কে জানতে চাই।` |
| `/services/work-permit` | `আসসালামু আলাইকুম, আমি বৈধ ওয়ার্ক পারমিট ভিসা ও প্রক্রিয়া সম্পর্কে জানতে চাই।` |
| `/services/india-visa` | `আসসালামু আলাইকুম, আমি ইন্ডিয়া মেডিকেল / ট্যুরিস্ট ভিসা ও IVAC ফাইল প্রসেসিং সম্পর্কে জানতে চাই।` |
| `/services/student-consultancy` | `আসসালামু আলাইকুম, আমি বিদেশে উচ্চশিক্ষা ও স্টুডেন্ট ভিসা কনসালটেন্সি সম্পর্কে জানতে চাই।` |
| `/services/tourist-visa` | `আসসালামু আলাইকুম, আমি ট্যুরিস্ট ভিসা ও প্রয়োজনীয় ডকুমেন্টস সম্পর্কে জানতে চাই।` |
| `/services/air-ticketing` | `আসসালামু আলাইকুম, আমি এয়ার টিকেট বুকিং ও বর্তমান ভাড়া সম্পর্কে জানতে চাই।` |
| `/services/hotel-booking` | `আসসালামু আলাইকুম, আমি আন্তর্জাতিক হোটেল বুকিং ও কনফার্মড ভাউচার সম্পর্কে জানতে চাই।` |
| `/services/tour-package` | `আসসালামু আলাইকুম, আমি ফ্যামিলি / গ্রুপ ট্যুর প্যাকেজ সম্পর্কে জানতে চাই।` |
| `/destinations/:slug` | `আসসালামু আলাইকুম, আমি <Country> ভিসা ও প্রয়োজনীয় ডকুমেন্টস সম্পর্কে জানতে চাই।` |
| `/tour-packages/:slug` | `আসসালামু আলাইকুম, আমি "<Package Title>" প্যাকেজটির বিস্তারিত ও বুকিং সম্পর্কে জানতে চাই।` |
| `/blog/:slug` | `আসসালামু আলাইকুম, আমি "<Article Title>" গাইডটি পড়েছি এবং এ বিষয়ে ফ্রি পরামর্শ নিতে চাই।` |

---

## 5. Connecting GA4, GTM, and Meta Pixel

1. Add your tracking tags in `index.html` (or inject via Google Tag Manager):
   - **GA4**: Standard `gtag.js` snippet with your `G-XXXXXXXXXX` Measurement ID.
   - **Meta Pixel**: Standard `fbevents.js` snippet with your Pixel ID.
2. In **GA4 Admin → Events → Mark as Key Event**, toggle ON:
   - `form_submit`
   - `whatsapp_click`
   - `call_click`
   - `checklist_download`
3. In **GA4 Admin → Custom Definitions → Custom Dimensions**, register the following event-scoped dimensions so you can break down leads by service and placement:
   - `service`
   - `page_type`
   - `location`
   - `cta_location`
   - `form_type`
   - `checklist_id`
   - `prefilled_topic`
   - `trigger`

---

## 6. Owner-Confirmed Response-Time Claim Toggle

To avoid publishing unverified claims, the `"সাধারণত ২ ঘণ্টার মধ্যে রিপ্লাই (অফিস সময়ে)"` / `"Typically replies within 2 hours during office hours"` reassurance note is **disabled by default**.

Once the agency owner confirms the team can consistently meet this SLA during office hours (`Sat–Thu, 9 AM – 8 PM`), enable it in **one place** inside `src/config/site.ts`:

```ts
leadGeneration: {
  responseTimeClaim: {
    ownerConfirmed: true, // Change from false -> true only after owner confirms SLA
    textBn: 'সাধারণত ২ ঘণ্টার মধ্যে রিপ্লাই (অফিস সময়ে)',
    textEn: 'Typically replies within 2 hours during office hours',
  },
},
```

Setting `ownerConfirmed: true` automatically displays the verified response-time note near `InquiryForm` and `ChecklistModal`.

---

## 7. QA & Verification Checklist

Open Chrome DevTools Console on any page and inspect `window.dataLayer` while performing these steps:

1. **Above-the-Fold CTA**: Click the primary gold CTA in any Hero → verify `{ event: 'cta_click', cta_location: '*_hero', page_type, service }`.
2. **Form Funnel**:
   - Focus the Name or WhatsApp input in `InquiryForm` → verify `form_start` fires **exactly once**.
   - Submit Name + WhatsApp (without opening optional fields) → verify `form_submit` fires with `has_optional_details: false`.
   - Click `+ সার্ভিস, দেশ বা প্রশ্ন যোগ করুন (ঐচ্ছিক)` → verify progressive fields expand smoothly without layout jump.
3. **Context-Aware WhatsApp**: Navigate to `/services/hajj-umrah`, click the floating WhatsApp button → verify the opened `wa.me` URL contains the encoded Umrah message and `dataLayer` logs `whatsapp_click` with `service: 'Hajj & Umrah'`.
4. **Call Click**: Tap `+880 1771-304219` in Navbar, Mobile Sticky Bar, or Contact page → verify `call_click` logs with `location`.
5. **Scroll Depth & Scroll Lead Magnet**: Scroll down a service page after ≥10 seconds → verify `scroll_depth` fires at `25`, `50`, `75`, `90`, and the dismissible PDF prompt logs `lead_magnet_impression` (`trigger: 'scroll_depth'`).
6. **Checklist PDF Download**: Submit Name + WhatsApp inside `ChecklistModal` → verify a real `.pdf` file downloads cleanly and `checklist_download` + `form_submit` both fire.
7. **Exit Intent (Desktop)**: Dwell ≥12 seconds on desktop, then move cursor rapidly above the top browser edge → verify Exit-Intent modal appears once per session with the current page's relevant checklist PDF and logs `lead_magnet_impression` (`trigger: 'exit_intent'`).
