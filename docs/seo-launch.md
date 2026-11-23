# Visatrip Global — Technical SEO Audit & Launch Checklist

This document records the complete technical SEO audit and remediation performed across all Bangla (`/`) and English (`/en`) routes of **Visatrip Global** (`https://www.visatripglobal.com`), followed by the production launch checklists for **Google Search Console (GSC)**, **Google Analytics 4 (GA4)**, and **Google Business Profile (GBP)**.

> Run `npm run seo:audit` at any time after editing content in `/src/data/*.ts`, `/src/config/site.ts`, `/server.ts`, or `/public/redirects.json` to re-verify zero technical SEO regressions.

---

## 1. Technical SEO Audit Table (All Pages & Infrastructure)

| Page / Area | Issue Found | Fix Implemented | Status |
| :--- | :--- | :--- | :--- |
| **Root HTML (`/index.html`) & Home (`/`, `/en`)** | Default `<title>` was 90 chars (`>60`) and `<meta name="description">` was 195 chars (`>160`); missing `og:locale:alternate`. | Trimmed `<title>` to 53 chars (Bn) / 57 chars (En), `<meta name="description">` to 143 chars (Bn) / 149 chars (En), synced OG/Twitter tags, and added `og:locale:alternate`. | Fixed |
| **Services Overview & 8 Service Pages (`/services/*`, `/en/services/*`)** | Several service titles exceeded 60 chars (up to 71 chars); `work-permit`, `tourist-visa`, and `hotel-booking` shared identical Bn/En titles; `BreadcrumbList` & `Service` JSON-LD lacked `/en` URL localization. | Shortened all 8 Bn & En titles (`<=57` chars) with genuinely distinct Bn vs En phrasing; localized `BreadcrumbList` & `Service` schema URLs; added `CollectionPage` schema on `/services`. | Fixed |
| **Destinations Overview & 10 Country Pages (`/destinations/*`, `/en/destinations/*`)** | Destination titles exceeded 60 chars and duplicated Bn/En titles; `/destinations` skipped `h1 -> h3` before the country cards; missing `CollectionPage` schema. | Trimmed all 10 Bn & En titles (`<=56` chars) with distinct Bn/En copy; inserted accessible `<h2 className="sr-only">` before card grid; added localized `BreadcrumbList` & `CollectionPage` schema. | Fixed |
| **Tour Packages & 6 Package Pages (`/tour-packages/*`, `/en/tour-packages/*`)** | Package titles exceeded 60 chars; `/tour-packages` skipped `h1 -> h3`; `Product` schema on consultation-priced (`priceBDT: null`) packages omitted `offers`, triggering Google Rich Results errors. | Shortened all 6 Bn & En titles (`<=55` chars); added `<h2 className="sr-only">` heading; fixed `buildTourPackageSchema()` to emit valid `TouristTrip` (with `itinerary` `ItemList`) when price is `null` and `['TouristTrip', 'Product']` + `Offer` only when a real BDT price is set. | Fixed |
| **Blog Listing & 6 Articles (`/blog/*`, `/en/blog/*`)** | Blog titles exceeded 60 chars; `BlogPosting` JSON-LD lacked `inLanguage`, `mainEntityOfPage`, `author.url`, and `publisher.@id`. | Trimmed all 6 Bn & En titles (`<=58` chars) with distinct Bn/En wording; upgraded `BlogPosting` JSON-LD for full Google Article Rich Results compliance; added `CollectionPage` on `/blog`. | Fixed |
| **Visa Requirement Checker (`/visa-checker`, `/en/visa-checker`)** | Bangla title exceeded 60 chars; lacked `WebApplication` JSON-LD schema and localized breadcrumbs. | Trimmed titles (`<=56` chars); added `buildWebApplicationSchema()` (`TravelApplication`, free `Offer` `0 BDT`) and localized `BreadcrumbList`. | Fixed |
| **Track Application Utility (`/track-application`, `/en/track-application`)** | Utility lookup page was indexable and included in `sitemap.xml`, risking thin-content index bloat; Bangla title exceeded 60 chars. | Added `<meta name="robots" content="noindex, follow">` + HTTP `X-Robots-Tag: noindex, follow`, removed `hreflang` alternates, excluded from `sitemap.xml`, kept crawlable in `robots.txt` so Googlebot observes `noindex`. | Fixed |
| **Private Admin Dashboard (`/admin/leads`)** | Needed strict server-side `X-Robots-Tag: noindex, nofollow` in addition to `robots.txt` disallow. | Enforced both `Disallow: /admin` in `robots.txt` and `X-Robots-Tag: noindex, nofollow` + meta `noindex, nofollow` in SSR & client. | Fixed |
| **About, Contact, FAQ, Gallery, Licenses, Success Stories, Legal Pages** | Legal Bangla titles exceeded 60 chars; `/gallery` and `/licenses` lacked contextual in-body internal links (footer-only discovery); missing localized `BreadcrumbList` & `CollectionPage` on `/gallery`. | Trimmed Legal titles (`<=45` chars); added contextual in-body links to `/gallery` and `/licenses` from `/about` (zero orphan pages); localized `BreadcrumbList` across all pages; added `CollectionPage` on `/gallery`. | Fixed |
| **Global Heading Hierarchy & Anchor Accessibility (`Footer`, `Cards`, `InquiryForm`)** | `Footer` used `<h3>` column titles causing `h1 -> h3` skips on pages without `<h2>`; `InquiryForm` success state used `<h4>`; short card anchors (`বিস্তারিত দেখুন`, `দেখুন`) lacked target context. | Converted Footer column titles to `<h2>` (identical styling) and InquiryForm success heading to `<h3>`; appended `<span className="sr-only">` destination/service/package names to short card anchors. | Fixed |
| **SSR Head Tags, Canonical & Bilingual `hreflang` (`/server.ts`, `/src/lib/seo.ts`)** | Initial SSR HTML lacked route-specific `<html lang>`, `canonical`, bidirectional `hreflang` (`bn-BD`, `en`, `x-default`), `og:url`, `og:image`, and `og:locale:alternate`; unknown routes returned soft-404 `200 OK`. | Implemented `applyServerRouteSeo()` across all routes in dev & production; injected exact per-route OG images, canonical, and bidirectional `hreflang`; returned true HTTP `404` + `noindex, nofollow` on unknown URLs. | Fixed |
| **Sitemap, Robots & 301 Redirects (`/sitemap.xml`, `/robots.txt`, `/public/redirects.json`)** | `sitemap.xml` only listed Bangla `<loc>` entries (not bidirectional `/en` entries) and included `/track-application`; trailing slashes and uppercase URLs were not normalized; limited legacy redirects. | Generated 90 bidirectional `<url>` entries (45 Bangla + 45 English) with `bn-BD`, `en`, and `x-default` `xhtml:link` alternates (excluding `noindex` routes); added clean-URL 301 middleware (trailing slash + lowercase); expanded 301 redirects to 20 legacy/shorthand paths. | Fixed |
| **Images, Mixed Content & Structured Data (`Organization`, `LocalBusiness`, `WebSite`)** | `Organization` lacked `image`/`priceRange`; `WebSite` lacked `@id`; verified all `imageManifest` alt texts and scanned for `http://` mixed content. | Enriched `Organization`/`TravelAgency`, `LocalBusiness` (optimized office image), and `WebSite` schemas; verified 100% bilingual `alt` coverage and zero `http://` mixed content across `src/`. | Fixed |

---

## 2. Google Search Console (GSC) Launch Checklist

1. **Verify Domain Property**
   - In [Google Search Console](https://search.google.com/search-console), add a **Domain property** for `visatripglobal.com` (covers `https://www.visatripglobal.com`, apex, and any subdomains).
   - Preferred method: add the Google DNS `TXT` record at your domain registrar.
   - Alternative URL-prefix method: copy the verification token and set `VITE_GSC_VERIFICATION="<token>"` in your production `.env` (automatically rendered as `<meta name="google-site-verification" ...>` by `SeoHead`).
2. **Submit Bilingual Sitemap**
   - Go to **Indexing → Sitemaps** and submit:
     `https://www.visatripglobal.com/sitemap.xml`
   - Confirm status shows **Success** and **90 discovered URLs** (45 Bangla `/` routes + 45 English `/en` routes).
   - Confirm `/track-application` and `/admin/leads` do **not** appear in `sitemap.xml`.
3. **Verify `robots.txt` & Crawlability**
   - Open `https://www.visatripglobal.com/robots.txt` (and test inside GSC **Settings → robots.txt**):
     - `Allow: /`
     - `Disallow: /admin`
     - `Disallow: /api`
     - `Sitemap: https://www.visatripglobal.com/sitemap.xml`
   - Confirm `/track-application` is **not** blocked in `robots.txt` so Googlebot can crawl and honor its `noindex, follow` meta + `X-Robots-Tag` header.
4. **Inspect Top Money Pages & Request Indexing**
   - Run **URL Inspection → Test Live URL → Request Indexing** on:
     - `/` and `/en`
     - `/services/work-permit`
     - `/services/hajj-umrah`
     - `/services/india-visa`
     - `/services/tourist-visa`
     - `/services/student-consultancy`
     - `/services/air-ticketing`
     - `/visa-checker`
     - `/contact`
   - Verify the **User-declared canonical** matches **Google-selected canonical** on both Bangla and English variants.
5. **Validate Structured Data with Google Rich Results Test**
   - Test one live URL of each template at [Rich Results Test](https://search.google.com/test/rich-results):
     - Home (`/`) → `Organization`/`TravelAgency`, `LocalBusiness`, `WebSite`, `FAQPage`
     - Service (`/services/hajj-umrah` & `/en/services/hajj-umrah`) → `Service`, `BreadcrumbList`, `FAQPage`
     - Tour Package (`/tour-packages/dubai-4-nights`) → `TouristTrip`, `BreadcrumbList` (zero invalid `Product` warnings)
     - Blog Post (`/blog/dubai-tourist-visa-documents-bangladesh`) → `BlogPosting`, `BreadcrumbList`
     - Visa Checker (`/visa-checker`) → `WebApplication`, `BreadcrumbList`
     - Listing (`/destinations`, `/services`, `/tour-packages`, `/blog`) → `CollectionPage`, `BreadcrumbList`
6. **Verify Redirects & True 404 Handling**
   - Confirm `https://www.visatripglobal.com/umrah` returns `301` → `/services/hajj-umrah`.
   - Confirm `https://www.visatripglobal.com/services/` and `/Services` return `301` → `/services`.
   - Confirm a non-existent URL (e.g., `/this-page-does-not-exist`) returns HTTP **404** (never soft-404 `200 OK`) with `X-Robots-Tag: noindex, nofollow`.
   - Configure apex-to-www redirect (`https://visatripglobal.com/*` → `301` `https://www.visatripglobal.com/*`) and HTTP-to-HTTPS redirect at your DNS/CDN edge (e.g., Cloudflare Page Rule / Redirect Rule).
7. **Post-Launch Weekly Monitoring (First 30 Days)**
   - Check **Indexing → Pages**: ensure zero unexpected `Duplicate without user-selected canonical` or `Crawled - currently not indexed` spikes.
   - Check **Core Web Vitals** (Mobile): verify LCP `< 2.5s`, CLS `< 0.1`, INP `< 200ms`.
   - Check **International / Performance by Page**: confirm Bangla queries match `/` URLs and English queries match `/en` URLs.

---

## 3. Google Analytics 4 (GA4) Launch Checklist

1. **Create GA4 Property & Web Data Stream**
   - Create a GA4 property for **Visatrip Global** (`Asia/Dhaka` timezone, `BDT` currency).
   - Create a Web Data Stream for `https://www.visatripglobal.com` and copy the Measurement ID (`G-XXXXXXXXXX`).
2. **Configure Environment Variable**
   - Set `VITE_GA4_MEASUREMENT_ID="G-XXXXXXXXXX"` in your production `.env` and rebuild (`npm run build`).
   - Confirm GA4 loads via `lazyOnload` (`initOptionalAnalyticsScripts()` in `src/lib/seo.ts`) after `window.load` + idle/first interaction so mobile LCP is untouched.
3. **Verify Custom Events in GA4 DebugView**
   - Open your site with the GA4 DebugView Chrome extension (or `?gtm_debug=x`) and trigger each lead flow to confirm events fire (see `/docs/analytics-events.md` for full payload schema):
     - `cta_click`
     - `form_start`
     - `form_submit`
     - `whatsapp_click`
     - `call_click`
     - `checklist_download`
4. **Mark Key Events (Conversions)**
   - In **GA4 Admin → Data display → Events**, toggle **Mark as key event** on:
     - `form_submit`
     - `whatsapp_click`
     - `call_click`
     - `checklist_download`
5. **Register Custom Dimensions**
   - In **GA4 Admin → Custom definitions → Create custom dimension**, register Event-scoped dimensions matching our event parameters:
     - `service` (identifies which of the 8 services generated the lead)
     - `page_path` (tracks exact converting landing page)
     - `locale` (`bn` vs `en` conversion split)
     - `cta_location` (`hero`, `section_cta`, `sticky_bar`, `floating_whatsapp`, `exit_intent`, `scroll_magnet`)
6. **Link GA4 ↔ Google Search Console & Exclude Internal Traffic**
   - In **GA4 Admin → Product Links → Search Console Links**, link your verified `visatripglobal.com` property to see Bangla/English organic search queries next to lead conversions.
   - Add your Rohanpur office static IP (if applicable) under **Data Streams → Configure tag settings → Define internal traffic** so staff testing does not skew lead metrics.

---

## 4. Google Business Profile (GBP) Launch Checklist

> **Truth & NAP Policy:** Every field below matches `/src/config/site.ts` and our `LocalBusiness` JSON-LD schema verbatim. Do not invent street numbers, license numbers, or reviews.

1. **Claim / Create & Verify Profile**
   - Business Name: **Visatrip Global** (exact brand name — do not stuff keywords into the title).
   - Address (NAP exact match): **Rohanpur, Gomastapur, Chapai Nawabganj, Bangladesh**
     - Place the map pin accurately on your physical office entrance in Rohanpur, then copy the exact verified latitude/longitude back into `siteConfig.contact.geo` in `/src/config/site.ts`.
   - Phone: **+880 1771-304219**
   - Website: `https://www.visatripglobal.com`
   - Complete Google's verification (video walkthrough of your permanent office signboard + desk is standard in Bangladesh).
2. **Categories & Business Hours**
   - **Primary Category:** `Travel agency`
   - **Secondary Categories:** `Visa and passport office`, `Tour operator`
   - **Hours:** Saturday – Thursday, `9:00 AM – 8:00 PM` | Friday: `Closed` (matches `openingHoursSchema: 'Sa-Th 09:00-20:00'`).
   - **Service Areas:** Chapai Nawabganj District, Gomastapur, Rohanpur, Rajshahi Division, Bangladesh.
3. **Business Description (Bilingual, Honest & Compliant)**
   - Mention your permanent office in Rohanpur, Gomastapur, Chapai Nawabganj and your 8 core services (Work Permit, Tourist Visa, Student Consultancy, Hajj & Umrah, India Medical & Tourist Visa, Air Ticketing, Hotel Booking, Tour Packages).
   - Never claim "100% guaranteed visa" — highlight transparent written fees and official money receipts.
4. **Add All 8 Services in GBP Services Tab**
   - Add individual service items matching your website URLs and descriptions:
     1. Work Permit Consultation
     2. Tourist Visa Processing
     3. Student Consultancy
     4. Hajj & Umrah Guidance
     5. India Visa Processing (Medical & Tourist)
     6. Air Ticketing (Domestic & International)
     7. Hotel Booking
     8. Tour Packages
5. **Upload Real, Verified Office Photos (Zero Stock Imagery)**
   - Follow `/docs/image-guide.md` and upload genuine smartphone/DSLR photos of:
     - Exterior signboard showing **Visatrip Global** clearly from the road.
     - Consultation desk & client waiting area.
     - Consented team photo (once ready).
   - Also place those verified photos in `/public/images/office/` and toggle `verifiedByOwner: true` in `/src/config/site.ts`.
6. **Publish Accurate Q&A & WhatsApp Link**
   - Enable GBP Messaging / Website appointment URL (`https://www.visatripglobal.com/contact`).
   - Pre-populate 3–5 genuine Q&As that local clients ask (office hours, India medical visa document checklist, whether consultations are free, official money receipt policy).
7. **Authentic Review Collection Workflow**
   - Copy your official **Ask for reviews** short link from GBP Dashboard.
   - Share it respectfully via WhatsApp **only** with genuine walk-in or visa clients after completing their service.
   - Reply politely in Bangla/English to every review within 48 hours. Never buy or fabricate reviews.
8. **Sync Social Profiles & Local Citations**
   - Ensure identical Name, Address, Phone (`+880 1771-304219`), and website URL (`https://www.visatripglobal.com`) across:
     - Facebook: `https://www.facebook.com/visatripglobal/`
     - Instagram: `https://www.instagram.com/visa.tripglobal/`
     - LinkedIn: `https://www.linkedin.com/company/visatripglobal/`
   - Once official license numbers (Trade License, TIN, HAB, BMET, IATA/ATAB) and official email are confirmed, enter them in `/src/config/site.ts` so the website license strip, footer, and JSON-LD stay 100% synchronized.
