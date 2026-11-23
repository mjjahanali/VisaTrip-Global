# Visatrip Global — Owner Content & Real Data Checklist

Per legal and trust standards, **no fake license numbers, client counts, prices, or fabricated reviews** have been added. Complete the items below before public launch:

## 1. Edit `/src/config/site.ts` (Master Config)
- [ ] **Official Email**: Add your verified business email (e.g., `info@visatripglobal.com`) in `siteConfig.contact.email`.
- [ ] **Exact Office Coordinates**: Confirm Google Business Profile latitude/longitude for Rohanpur, Gomastapur, Chapai Nawabganj.
- [ ] **Licenses & Registrations** (`siteConfig.licenses`):
  - [ ] Trade License Number
  - [ ] TIN Certificate Number
  - [ ] HAB License Number (mandatory display on Hajj & Umrah sections once entered)
  - [ ] BMET / Recruiting License (RL) Number (displayed on Work Permit page once entered)
  - [ ] IATA / ATAB Membership (if applicable)
- [ ] **Verified Stats** (`siteConfig.stats`):
  - [ ] `clients`: Enter verified satisfied client count (currently `null` so it hides gracefully)
  - [ ] `countries`: Enter verified countries served count (currently `null` so it hides gracefully)

## 2. Edit `/src/data/packages.ts` & `/src/data/destinations.ts`
- [ ] Replace `priceBDT: null` with real seasonal starting prices in BDT once confirmed (or leave `null` to show `"কনসাল্টেশন নিন"`).
- [ ] Add exact upcoming Umrah group departure dates and airline names in `/src/data/services.ts` and `/src/data/packages.ts`.

## 3. Edit `/src/data/siteContent.ts`
- [ ] **Team Members** (`teamMembersData`): Replace placeholder names with real founder and consultant names, designations, and consented portraits.
- [ ] **Testimonials** (`testimonialsData`): Replace the 3 clearly marked sample cards with real, verified client reviews (with written client consent). Only after real reviews exist should Schema.org `Review`/`AggregateRating` be enabled.
- [ ] **Gallery** (`galleryItemsData`): Add authentic office photos and consented client travel photos.
- [ ] **Application Tracker** (`sampleTrackingRecords` / `/api/track`): Connect `/api/track` to your live CRM/Google Sheet/Database and remove demo records (`VTG-2026-101`–`103`).

## 4. Environment Variables (`.env`)
- [ ] Set a strong `ADMIN_PASSWORD` for `/admin/leads`.
- [ ] Configure `RESEND_API_KEY` OR `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` and `EMAIL_TO` for instant lead email alerts.
- [ ] Add `VITE_GA4_MEASUREMENT_ID`, `VITE_META_PIXEL_ID`, and `VITE_GSC_VERIFICATION` when ready.

## 5. Legal Review
- [ ] Review `/privacy-policy`, `/terms-and-conditions`, and `/refund-policy` in `/src/pages/LegalPage.tsx` and adjust any agency-specific refund deadlines or clauses.
