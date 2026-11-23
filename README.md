# Visatrip Global — Official Website

**প্রতিটি গন্তব্যে এক বিশ্বস্ত সহযোগী**  
Production-ready, mobile-first, SEO-optimized website for **Visatrip Global** (Rohanpur, Gomastapur, Chapai Nawabganj, Bangladesh).

---

## Key Features Included
- **Complete Sitemap (30+ routes)** in Bangla-English mixed default (`/`) and full English (`/en/*`) with `hreflang` and canonical URLs.
- **14-Section Homepage** tailored for high trust, mobile conversion, and clear local credibility.
- **All 8 Dedicated Service Pages**: Work Permit, Tourist Visa, Student Consultancy, Hajj & Umrah (Deep Green `#0F5132` + Gold theme with Economy/Standard/VIP comparison), India Visa Processing (Medical/Tourist tabs), Air Ticketing (flight enquiry form), Hotel Booking (hotel enquiry form), and Tour Packages.
- **10 Destination Guides** (`/destinations/[country]`).
- **Curated Tour & Umrah Packages** with filters and **Side-by-Side Comparison (up to 3 packages)**.
- **Interactive Tools**:
  - `/visa-checker` — Data-driven Visa Requirement Checker with checklist download and Embassy disclaimer.
  - `/track-application` — 4-step application tracker (`Received → Processing → Submitted → Done`).
- **6 Full SEO Blog Articles** (800+ words each with H2/H3 structure, FAQs, share links, and internal linking).
- **Lead Capture & Admin Panel**:
  - React Hook Form + Zod validated forms with honeypot spam trap and IP rate limiting.
  - Express `/api/inquiry` saves leads via swappable `LeadStorageAdapter` (`.data/leads.json` by default — ready to swap to Supabase/Postgres), sends optional email via Resend or Nodemailer, and generates a pre-filled WhatsApp fallback link.
  - Password-protected `/admin/leads` panel with status workflow (`New`, `Contacted`, `Processing`, `Done`) and CSV export.
- **Technical SEO**:
  - Dynamic `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/favicon.svg`, and `/public/redirects.json`.
  - Server-side per-route `<title>`, `<meta name="description">`, and `<link rel="canonical">` injection + client-side JSON-LD (`Organization`, `TravelAgency`, `LocalBusiness`, `WebSite`, `BreadcrumbList`, `FAQPage`, `Service`, `TouristTrip`/`Product`, `BlogPosting`).

---

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev
```
Open `http://localhost:3000`.

### Build & Production Start
```bash
npm run build
NODE_ENV=production npm start
```

---

## How to Edit Content
1. **Brand, Contact, Licenses, Stats & Social Links**: Edit one file — `/src/config/site.ts`. Empty license numbers and `null` stats hide automatically so no fake data ever displays.
2. **Services & FAQs**: Edit `/src/data/services.ts`.
3. **Add a Destination**: Append an entry to `destinationsData` in `/src/data/destinations.ts` — it automatically appears on `/destinations` and `/sitemap.xml`.
4. **Add a Tour Package**: Append an entry to `tourPackagesData` in `/src/data/packages.ts`.
5. **Add a Blog Post**: Append an entry to `blogPostsData` in `/src/data/blogs.ts`.
6. **Team, Testimonials & Gallery**: Edit `/src/data/siteContent.ts`.

---

## Deployment & Domain Connection
- **Node / Cloud Run / Render / Railway / VPS**:
  1. Set environment variables from `.env.example` (`APP_URL=https://www.visatripglobal.com`, `ADMIN_PASSWORD`, `RESEND_API_KEY` or `SMTP_*`, analytics IDs).
  2. Build command: `npm run build`
  3. Start command: `NODE_ENV=production npm start` (runs `server.ts` on `process.env.PORT || 3000`).
- **Domain Setup (`www.visatripglobal.com`)**:
  - Point `www` CNAME and root `A`/ALIAS DNS records to your hosting provider and enable automatic HTTPS/SSL.
- **Google Search Console & Analytics**:
  - Add `VITE_GSC_VERIFICATION` and `VITE_GA4_MEASUREMENT_ID` to your environment variables.
  - Submit `https://www.visatripglobal.com/sitemap.xml` inside Google Search Console.
  - Set up your Google Business Profile with identical NAP (`Visatrip Global`, `Rohanpur, Gomastapur, Chapai Nawabganj, Bangladesh`, `+880 1771-304219`).

---

## Launch Checklist
- [ ] Complete `/docs/content-todo.md` (email, real licenses, real prices, consented reviews).
- [ ] Change `ADMIN_PASSWORD` from default and test `/admin/leads`.
- [ ] Submit a test inquiry and verify email delivery + WhatsApp link.
- [ ] Verify `https://www.visatripglobal.com/sitemap.xml` and `/robots.txt`.
- [ ] Submit sitemap to Google Search Console and verify Google Business Profile.
