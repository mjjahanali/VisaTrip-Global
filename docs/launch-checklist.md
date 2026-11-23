# Visatrip Global — Pre-Launch QA Report & Production Launch Checklist

This document summarizes the automated QA verification results for **Visatrip Global** (`https://www.visatripglobal.com`) and provides the step-by-step go-live runbook covering **Domain + DNS, SSL, `www` Redirect, Environment Variables, Google Search Console, GA4, Meta Pixel, Google Business Profile, Social Profiles, Backups, Monitoring**, and **Remaining Real-Data TODOs**.

> **Re-run all automated checks anytime before deployment:**
> ```bash
> npm run build && npm run lint && npm run qa && npm run seo:audit && npm run a11y:audit && npm run perf:bundle
> ```

---

## 1. Automated QA Verification Summary

All automated checks below were executed against a production build (`npm run build` + `NODE_ENV=production`) via `npm run qa`, `npm run lint`, `npm run seo:audit`, `npm run a11y:audit`, and `npm run perf:bundle`:

| QA Area | Result | Verified Details |
| :--- | :---: | :--- |
| **All Routes Render (Bn + En + Admin)** | **PASS (95/95)** | Every Bangla (`/`), English (`/en`), service (8), destination (10), package (6), blog (6), utility, legal, and admin route returns HTTP `200` with unique `<title>`, `<meta name="description">`, `<link rel="canonical">`, and matching `<html lang="bn|en">`. |
| **TypeScript & ESLint** | **PASS (0/0)** | `tsc --noEmit` (0 errors) + `eslint src server.ts --max-warnings=0` (0 errors, 0 warnings), including `react-hooks/rules-of-hooks` and `react-hooks/exhaustive-deps`. |
| **Forms — Valid Submission** | **PASS** | `POST /api/inquiry` returns HTTP `201`, generates unique `VTG-*` Reference ID, persists lead, returns context-aware `https://wa.me/8801771304219?text=...` URL, and triggers email delivery. |
| **Forms — Invalid Input** | **PASS** | Short name, invalid phone, or malformed email returns HTTP `400` with clear Bangla validation copy (`নাম কমপক্ষে ২ অক্ষরের হতে হবে`). Client forms disable fields (`aria-busy="true"`) during submission and associate errors via `aria-describedby` + `role="alert"`. |
| **Forms — Spam Honeypot & Rate Limit** | **PASS** | Populating hidden `website_url` honeypot returns HTTP `200` (`VTG-RECEIVED`) without storing lead or sending email. Per-IP rate limit enforces max 10 requests / 15 min (HTTP `429`). |
| **Email Delivery (SMTP / Resend)** | **PASS** | Verified end-to-end live Nodemailer SMTP handshake (`AUTH PLAIN` + `DATA` + `250 OK`) triggered directly by `POST /api/inquiry`, capturing UTF-8 Bangla/English subject, Lead ID, recipient, and payload. Resend HTTP API path verified cleanly alongside graceful fallback when unset. |
| **WhatsApp & Call Links** | **PASS** | 100% of `wa.me` and `tel:` links across `src/` match verified number `8801771304219` / `+8801771304219` with properly encoded Bangla/English pre-filled messages. |
| **Application Tracker & Admin Auth** | **PASS** | `/api/track` returns `200` (valid), `404` (not found), `400` (missing params). `/api/leads` rejects unauthenticated requests (`401`) and returns persisted leads with valid `X-Admin-Password` (`200`). |
| **Schema / JSON-LD Validity** | **PASS (11/11)** | `Organization`/`TravelAgency`, `LocalBusiness`, `WebSite`, `Service`, `TouristTrip`, `BlogPosting`, `FAQPage`, `WebApplication`, `CollectionPage`, and localized `BreadcrumbList` validated with 0 issues (`npm run seo:audit`). |
| **Sitemap & Robots** | **PASS** | `/sitemap.xml` serves 92 bidirectional `<url>` entries (Bangla + English with `bn-BD`, `en`, `x-default` alternates) and excludes `noindex` routes (`/track-application`, `/admin/leads`). `/robots.txt` allows `/` and disallows `/admin` and `/api`. |
| **True 404 & 301 Redirects** | **PASS** | Unknown Bn/En routes return true HTTP `404` + `X-Robots-Tag: noindex, nofollow`. Trailing slashes, uppercase URLs, 23 legacy/shorthand rules (`/umrah`, `/hajj`, etc.), and apex → `www` return HTTP `301`. |
| **Security Headers** | **PASS (9/9)** | Production server emits `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `Cross-Origin-Opener-Policy: same-origin-allow-popups`, `X-Permitted-Cross-Domain-Policies: none`, `Strict-Transport-Security`, `Content-Security-Policy`, and suppresses `X-Powered-By`. |
| **WCAG 2.1 AA Accessibility** | **PASS (41/41)** | Contrast ratios (`>=4.5:1`), keyboard focus rings, skip link, focus traps, Escape handlers, ARIA tabs/accordions, form labels/errors, and reduced-motion verified (`npm run a11y:audit`). |
| **Environment Variables Documented** | **PASS (19/19)** | Every `process.env.*` and `import.meta.env.*` reference in `src/`, `server.ts`, and `vite.config.ts` is documented in `.env.example`. |
| **Production Bundle & ISR Caching** | **PASS** | Initial `/` JS: `234.12 kB` Brotli (9 chunks); CSS: `12.88 kB` Brotli; 38 lazy chunks (`186.77 kB` Brotli deferred); Brotli/Gzip compression + ISR `ETag`/`304` + `stale-while-revalidate` verified. |

---

## 2. Manual Real-Device, Cross-Browser & Lighthouse Verification (Run on Live HTTPS Staging/Prod)

Because headless Chromium/Lighthouse is not installed in the build container, run the final device & PageSpeed verification once deployed to HTTPS staging/production:

### 2.1 Responsive & Cross-Browser Matrix
Test at **360px, 390px, 768px, 1024px, and 1440px** on real devices or BrowserStack:
- [ ] **Chrome (Desktop + Android)**: Zero horizontal scroll, sticky mobile bottom bar clears footer (`env(safe-area-inset-bottom)`), tap targets `>= 44px`, Cookie Consent banner clears bottom bar, Toast notifications visible, console has 0 errors.
- [ ] **Safari (iOS 16+)**: Focusing form inputs does **not** auto-zoom (`16px` mobile inputs enforced), safe-area padding clears iPhone Home Indicator, keyboard sticky submit bar aligns via `visualViewport`, scroll-snap carousels swipe smoothly.
- [ ] **Samsung Internet (Android)**: `<meta name="color-scheme" content="light" />` prevents auto-dark inversion of cream cards and gold/navy contrast; WhatsApp links open native app cleanly.
- [ ] **Firefox (Desktop + Android)**: `scrollbar-width: none` hides carousel scrollbars, `Hind Siliguri` Bangla conjuncts (যুক্তাক্ষর) render cleanly without clipped vowel signs, focus rings visible on Tab navigation.

### 2.2 Lighthouse Mobile 90+ Check (PageSpeed Insights)
Run [PageSpeed Insights (Mobile)](https://pagespeed.web.dev/) on the live HTTPS domain and confirm **Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO >= 95** (`LCP < 2.5s`, `CLS < 0.1`, `INP < 200ms`) on all 4 core templates:
- [ ] **Home**: `https://www.visatripglobal.com/`
- [ ] **Service Page**: `https://www.visatripglobal.com/services/hajj-umrah`
- [ ] **Blog Post**: `https://www.visatripglobal.com/blog/dubai-tourist-visa-documents-bangladesh`
- [ ] **Tour Package Page**: `https://www.visatripglobal.com/tour-packages/dubai-4-nights`

---

## 3. Domain, DNS, SSL & `www` Redirect

### 3.1 Domain & DNS Setup (`visatripglobal.com`)
- [ ] Point apex (`@` / `visatripglobal.com`) and `www` (`www.visatripglobal.com`) to your production host (e.g., Cloudflare proxied `A`/`AAAA` or `CNAME` record).
- [ ] Set DNS TTL to `300s` (5 minutes) 24 hours before cutover; raise to `Auto` / `3600s` after propagation stabilizes.
- [ ] Configure **Email Authentication DNS Records** for lead notifications (`noreply@visatripglobal.com` / `info@visatripglobal.com`):
  - [ ] **SPF (`TXT`)**: Include your mail provider (e.g., `v=spf1 include:_spf.resend.com ~all` or your SMTP host).
  - [ ] **DKIM (`CNAME` / `TXT`)**: Add the DKIM keys generated by Resend or your business email provider (Google Workspace / Zoho / cPanel).
  - [ ] **DMARC (`TXT` on `_dmarc.visatripglobal.com`)**: Start with `v=DMARC1; p=quarantine; rua=mailto:info@visatripglobal.com; adkim=r; aspf=r;` and move to `p=reject` after verifying delivery.

### 3.2 SSL / TLS Certificate
- [ ] Issue valid HTTPS certificate covering **both** `visatripglobal.com` and `www.visatripglobal.com` (Let's Encrypt / managed host SSL / Cloudflare Edge Certificate).
- [ ] If using Cloudflare, set SSL/TLS encryption mode to **Full (Strict)** and enable **Always Use HTTPS** + **Automatic HTTPS Rewrites**.
- [ ] Verify HSTS header is present on HTTPS responses (`Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`) and test grade **A / A+** on [SSL Labs](https://www.ssllabs.com/ssltest/).

### 3.3 Canonical `www` & HTTP → HTTPS 301 Redirects
- [ ] Configure edge redirect rules (Cloudflare / Nginx / Reverse Proxy) so all non-canonical variants issue a single-hop **301 Permanent Redirect**:
  - `http://visatripglobal.com/*` → `https://www.visatripglobal.com/*`
  - `https://visatripglobal.com/*` → `https://www.visatripglobal.com/*`
  - `http://www.visatripglobal.com/*` → `https://www.visatripglobal.com/*`
- [ ] Set `ENFORCE_WWW_REDIRECT="true"` in production `.env` as an application-level safety net if your host does not handle apex→www redirects at the edge.
- [ ] Confirm redirect chain with `curl -I https://visatripglobal.com/services/hajj-umrah` returns `HTTP/2 301` → `location: https://www.visatripglobal.com/services/hajj-umrah`.

---

## 4. Production Environment Variables (`.env`)

Copy `.env.example` to `.env` on the server (never commit `.env` to Git):

| Variable | Required? | Purpose |
| :--- | :---: | :--- |
| `NODE_ENV` | Yes | Must be `"production"` to enable Brotli/Gzip, ISR HTML caching, CSP, and HSTS. |
| `PORT` | Yes | Server port (`3000` default). |
| `APP_URL` | Yes | `"https://www.visatripglobal.com"` (used for SSR canonical, OG images, `sitemap.xml`, `robots.txt`). |
| `VITE_SITE_URL` | Yes | `"https://www.visatripglobal.com"` (baked into client bundle at `npm run build`). |
| `VITE_WHATSAPP_NUMBER` | Yes | `"8801771304219"` (international format without `+` or spaces). |
| `ENFORCE_WWW_REDIRECT` | Optional | `"true"` to redirect apex → `www` in Express (leave `"false"` if CDN already handles it). |
| `ADMIN_PASSWORD` | **Critical** | Strong 20+ char random passphrase protecting `/admin/leads`, `/api/leads`, and `/api/revalidate`. |
| `EMAIL_TO` | Recommended | Agency inbox receiving instant lead alerts (e.g., `info@visatripglobal.com`). |
| `EMAIL_FROM` | Recommended | Verified sender identity (e.g., `Visatrip Global <noreply@visatripglobal.com>`). |
| `RESEND_API_KEY` | Option A | Preferred transactional email delivery via Resend API. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE` | Option B | Nodemailer SMTP fallback if `RESEND_API_KEY` is blank. |
| `VITE_GA4_MEASUREMENT_ID` | Optional | GA4 Measurement ID (`G-XXXXXXXXXX`), loaded only after cookie consent. |
| `VITE_META_PIXEL_ID` | Optional | Meta Pixel numeric ID, loaded only after cookie consent. |
| `VITE_GSC_VERIFICATION` | Optional | Google Search Console HTML meta tag token (optional if DNS TXT verified). |
| `DISABLE_HMR` | Dev only | Leave `"false"` in production; `"true"` disables Vite file watcher in dev. |

- [ ] After setting any `VITE_*` variable, rebuild (`npm run build`) and restart the Node server (`npm run start`).
- [ ] Submit one live test inquiry via `/contact`, verify lead arrives in `EMAIL_TO` inbox (not Spam folder) and appears in `/admin/leads`.

---

## 5. Google Search Console (GSC)

> Detailed SEO audit table available in `/docs/seo-launch.md`.

- [ ] Add **Domain Property** `visatripglobal.com` in [Google Search Console](https://search.google.com/search-console) and verify via DNS `TXT` record.
- [ ] Submit `https://www.visatripglobal.com/sitemap.xml` under **Indexing → Sitemaps** and verify **92 discovered URLs** (Success).
- [ ] Verify `https://www.visatripglobal.com/robots.txt` is reachable and allows `/` while blocking `/admin` and `/api`.
- [ ] Run **URL Inspection → Test Live URL → Request Indexing** on `/`, `/en`, `/services/work-permit`, `/services/hajj-umrah`, `/services/india-visa`, `/services/tourist-visa`, `/services/student-consultancy`, `/service-areas`, `/visa-checker`, and `/contact`.
- [ ] Validate live URLs in [Google Rich Results Test](https://search.google.com/test/rich-results) across Home, Service, Package, Blog, and Visa Checker templates.

---

## 6. Google Analytics 4 (GA4)

> Event taxonomy documented in `/docs/analytics-events.md`.

- [ ] Create GA4 property (**Visatrip Global**, timezone `Asia/Dhaka`, currency `BDT`) and Web Data Stream for `https://www.visatripglobal.com`.
- [ ] Set `VITE_GA4_MEASUREMENT_ID` and rebuild.
- [ ] Confirm **consent gating**: open site in Incognito → verify `gtag.js` does **not** load before clicking **"সম্মতি দিন / Accept Analytics"** → click Accept → confirm `gtag.js` loads cleanly without blocking paint.
- [ ] Verify in **GA4 DebugView**: `cta_click`, `form_start`, `form_submit`, `whatsapp_click`, `call_click`, `checklist_download`, `scroll_depth`.
- [ ] Mark Key Events (Conversions): `form_submit`, `whatsapp_click`, `call_click`, `checklist_download`.
- [ ] Register Custom Dimensions: `service`, `page_path`, `locale`, `cta_location`.
- [ ] Link **GA4 ↔ Google Search Console** and filter internal Rohanpur office IP traffic.

---

## 7. Meta Pixel (Facebook & Instagram)

- [ ] Create Meta Pixel in [Meta Events Manager](https://business.facebook.com/events_manager) and copy the Pixel ID into `VITE_META_PIXEL_ID`, then rebuild.
- [ ] Verify domain ownership (`visatripglobal.com`) in **Meta Business Suite → Brand Safety → Domains** via DNS TXT record.
- [ ] Confirm **consent gating**: verify `fbevents.js` stays unloaded under "Essential Only" and activates immediately upon clicking "Accept Analytics".
- [ ] Test with **Meta Pixel Helper** extension:
  - `PageView` fires on page load after consent
  - Standard `Lead` fires on `form_submit` and `checklist_download`
  - Standard `Contact` fires on `whatsapp_click` and `call_click`
  - Custom events carry `service`, `page_path`, and `locale`
- [ ] Configure **Aggregated Event Measurement** priority: `Lead` (1) → `Contact` (2) → `PageView` (3).

---

## 8. Google Business Profile (GBP)

> Complete local SEO & GBP optimization guide in `/docs/gbp-setup-guide.md`.

- [ ] Create/claim and verify **Visatrip Global** at **Rohanpur, Gomastapur, Chapai Nawabganj, Bangladesh** (exact NAP match with website).
- [ ] Set Primary Category: **Travel agency**; Secondary Categories: **Visa and passport office**, **Tour operator**, **Hajj and Umrah agency** (where available), **Airline ticket agency**.
- [ ] Set Website URL to `https://www.visatripglobal.com` and Appointment/Consultation URL to `https://www.visatripglobal.com/contact`.
- [ ] Confirm phone number `+880 1771-304219` and business hours (`Sat–Thu 9:00 AM – 8:00 PM`, Friday closed).
- [ ] Copy exact verified map pin coordinates into `siteConfig.contact.geo` in `/src/config/site.ts`.
- [ ] Copy GBP **"Ask for reviews"** short link into `siteConfig.localSeo.gbpReviewUrl` in `/src/config/site.ts`, then print the **Office Review QR Standee** from `/admin/leads` (GBP QR tab).
- [ ] Upload real office signboard, consultation desk, and team photos + publish first 2 GBP posts (Umrah guidance & Work Permit scam-safety checklist).

---

## 9. Social Profile Link Updates

Update website URL, bio, phone, and address across every official channel so brand signals and NAP match 100%:
- [ ] **Facebook Page** (`https://www.facebook.com/visatripglobal/`): Set Website to `https://www.visatripglobal.com`, Phone to `+880 1771-304219`, Address to `Rohanpur, Gomastapur, Chapai Nawabganj`, and primary CTA button to **Send WhatsApp Message** or **Book Now** (`/contact`).
- [ ] **Instagram** (`https://www.instagram.com/visa.tripglobal/`): Add `https://www.visatripglobal.com` in bio link + update contact phone/WhatsApp action buttons.
- [ ] **LinkedIn Company Page** (`https://www.linkedin.com/company/visatripglobal/`): Set Website to `https://www.visatripglobal.com`, Industry to `Travel Arrangements`, Location to `Chapai Nawabganj, Rajshahi, Bangladesh`.
- [ ] **WhatsApp Business Profile** (`+880 1771-304219`): Add `https://www.visatripglobal.com`, exact Rohanpur office address, hours (`Sat–Thu 9:00 AM–8:00 PM`), and quick-reply links to `/visa-checker` and `/services/hajj-umrah`.

---

## 10. Backups & Disaster Recovery

- [ ] **Source Code**: Push production tag (e.g., `v1.0.0-launch`) to a private Git repository (GitHub/GitLab) with branch protection on `main`.
- [ ] **Lead Storage (`.data/leads.json`)**:
  - [ ] Schedule a daily automated backup (cron job / cloud snapshot) copying `.data/leads.json` to encrypted off-server storage (Google Drive / S3 / R2) with 30-day retention.
  - [ ] Weekly manual CSV export from `/admin/leads` → **Export CSV** saved to office records.
  - [ ] *Phase 2 Recommendation*: Swap `JsonFileLeadStore` in `/src/lib/leadStore.ts` to a managed PostgreSQL/Supabase adapter (zero changes required to API routes or UI).
- [ ] **Secrets Backup**: Store production `.env` securely in a password manager (1Password / Bitwarden) — never in Git or email drafts.
- [ ] **Restore Drill**: Test restoring `.data/leads.json` and rebuilding (`npm ci && npm run build && npm run start`) before announcing launch.

---

## 11. Monitoring & Ongoing Maintenance

- [ ] **Uptime Monitoring**: Configure [UptimeRobot](https://uptimerobot.com/) or [Better Stack](https://betterstack.com/) (free tier) to poll:
  - `https://www.visatripglobal.com/api/health` every **5 minutes** (assert HTTP `200` + `"status":"healthy"`).
  - `https://www.visatripglobal.com/` every **5 minutes** (assert HTTP `200` + keyword `Visatrip Global`).
  - Send instant alerts via Email + Telegram/WhatsApp webhook on downtime.
- [ ] **SSL Expiry Monitoring**: Enable SSL certificate expiry alerts (30 days / 7 days before expiry).
- [ ] **Server Process Supervision**: Run production Node server under `systemd`, `PM2`, or a managed PaaS container (Cloud Run / Railway / Render) with auto-restart on crash and log rotation.
- [ ] **Monthly Maintenance Cadence**:
  - Review visa checklists against official Embassy/IVAC/BMET/Nusuk portals and update `siteConfig.trust.visaInfoVerification.verifiedDate*` in `/src/config/site.ts`.
  - Refresh seasonal tour/Umrah package prices and departure dates, then run `npm run catalog:sync` and `POST /api/revalidate` (or redeploy).
  - Check Search Console **Core Web Vitals** and **Indexing** reports.

---

## 12. Remaining TODOs — Where Real Owner Data Is Still Missing

Per strict honesty & zero-fabrication rules, **no fake numbers, licenses, prices, photos, or reviews** were invented. Every item below gracefully hides or displays an honest consultation/sample label until the owner supplies real data:

### High Priority (Complete Before Public Ad Spend)
1. **Official Business Email** (`src/config/site.ts` → `siteConfig.contact.email: ''`)
   - Add verified business email (e.g., `info@visatripglobal.com`) and configure `EMAIL_TO` + `RESEND_API_KEY` or `SMTP_*` in `.env` so form alerts reach your inbox.
2. **Licenses & Government Registration Numbers** (`src/config/site.ts` → `siteConfig.licenses`)
   - Populate real numbers for **Trade License**, **TIN**, **HAB License** (for Hajj/Umrah), **BMET / RL** (if applicable for Work Permit), and **IATA / ATAB**. Empty licenses remain cleanly hidden.
3. **Real Office Photos (3 Slots)** (`src/config/site.ts` → `siteConfig.trust.officePhotos`, currently `verifiedByOwner: false`)
   - Place owner-taken photos under `/public/images/office/` (signboard/entrance, consultation desk, waiting area), set `src`, and toggle `verifiedByOwner: true`.
4. **Real Team Member Profiles (3 Slots)** (`src/config/site.ts` → `siteConfig.trust.teamMembers`, currently `verifiedByOwner: false`)
   - Add real Founder, Visa Lead, and Hajj/Ticketing Lead names (Bn + En) and consented portraits under `/public/images/team/`, then set `verifiedByOwner: true`.
5. **Exact Rohanpur Office Pin & GBP Review Link** (`src/config/site.ts` → `contact.geo` & `localSeo.gbpReviewUrl: ''`)
   - Replace approximate Rohanpur coordinates (`24.8194, 88.3168`) with the verified GBP entrance pin and paste your live `g.page/r/.../review` URL.
6. **Production `ADMIN_PASSWORD`** (`.env`)
   - Replace the dev default password with a strong secret before going live.

### Medium Priority (Complete Within First 2 Weeks)
7. **Seasonal Tour & Umrah Starting Prices** (`src/data/packages.ts` → all 6 packages currently have `priceBDT: null`)
   - Add real BDT starting prices (or leave `null` to keep displaying `"কনসাল্টেশন নিন"`). Once real BDT prices are added, `TouristTrip` + `Product`/`Offer` schema activates automatically. Run `npm run catalog:sync` after updating.
8. **Verified Client & Country Counts** (`src/config/site.ts` → `siteConfig.stats`: `clients` & `countries` are `null`)
   - Fill only real, auditable numbers; `null` stats remain automatically hidden on the homepage.
9. **Owner-Confirmed Response Time Claim** (`src/config/site.ts` → `leadGeneration.responseTimeClaim.ownerConfirmed: false`)
   - Toggle to `true` **only** if staff reliably reply within 2 hours during office hours (`Sat–Thu, 9:00 AM – 8:00 PM`).
10. **Real Client Testimonials** (`src/data/siteContent.ts` → `testimonialsData`)
    - Replace the 3 clearly marked sample cards with real, consented client reviews before enabling Schema.org `Review`/`AggregateRating`.
11. **Live Application Tracker Integration** (`server.ts` `/api/track` & `src/data/siteContent.ts` → `sampleTrackingRecords`)
    - Replace the 3 demo records (`VTG-2026-101`, `102`, `103` marked `isDemoSample: true`) with your live office spreadsheet/CRM/database lookup.
12. **Legal Policy Sign-Off** (`src/pages/LegalPage.tsx`)
    - Have the agency owner confirm exact refund timelines, non-refundable airline/Embassy clauses, and office terms on `/privacy-policy`, `/terms-and-conditions`, and `/refund-policy`.
