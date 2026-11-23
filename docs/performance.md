# Visatrip Global — Performance Optimization & Core Web Vitals Guide

This document records the architecture, production bundle report, measured **Before vs. After** asset metrics, caching & ISR revalidation headers, and verification checklist used to target **Lighthouse Mobile 90+**, **LCP < 2.5s**, **CLS < 0.1**, and **INP < 200ms** — especially for Bangladeshi visitors on 3G/4G mobile connections.

> **Architecture Note:** Visatrip Global runs on **React 19 + Vite 8 + Express (`server.ts`)** (the Vite SPA fallback specified in the brief when Next.js is unavailable). Every Next.js performance equivalent (`next/image`, `next/font`, `next/dynamic`, `next/script lazyOnload`, selective prefetch, static immutable headers, and ISR `revalidate` + `stale-while-revalidate`) is implemented natively with zero third-party bloat.

---

## 1. Core Web Vitals Targets & Budgets

| Metric | Target | Primary Enablers Implemented |
| :--- | :--- | :--- |
| **Lighthouse Mobile Performance** | **90+** | Non-blocking fonts, AVIF LCP preload, 51.5% smaller initial app+data JS, zero eager iframes, `lazyOnload` third-party scripts |
| **LCP (Largest Contentful Paint)** | **< 2.5s** | Art-directed hero AVIF preloads (`mobile-480w.avif` = 22 KB, `fetchpriority="high"`), H1 rendered visible on frame 1 (no `opacity: 0`), single hero DOM node on slide 0, Brotli HTML delivery |
| **CLS (Cumulative Layout Shift)** | **< 0.1** | Explicit `width`/`height` + `aspect-*` containers on every `<SafeImage>` and `<GoogleMapFacade>`, fixed navbar flow height (`56px`/`72px`), `font-display: swap`, intrinsic heights on `.cv-auto` sections |
| **INP (Interaction to Next Paint)** | **< 200ms** | Below-the-fold sections offloaded via `content-visibility: auto` + `React.lazy`, GPU-only `transform`/`opacity` transitions (`<= 380ms`), deferred idle widgets, `touch-action: manipulation` |

---

## 2. Measured Before vs. After Metrics

All figures below were measured directly from `npm run build` (`vite build`) and `npm run perf:bundle` (`scripts/bundle-report.mjs`) on the production `dist/` output.

### 2.1 Initial `/` Route Transfer Breakdown

| Metric | BEFORE Optimization | AFTER Optimization | Change |
| :--- | ---: | ---: | ---: |
| **App + Data JS on `/` (raw)** | 575.8 kB (`index` + `TrustSignals` + `site`) | **279.3 kB** (`index` + `site` + `catalogSummary`) | **-296.5 kB (-51.5%)** |
| **App + Data JS on `/` (gzip)** | 131.2 kB | **65.3 kB** (58.2 kB Brotli) | **-65.9 kB (-50.2% gzip / -55.6% br)** |
| **Total Initial `/` JS (raw, incl. React/Motion/Router/Icons)** | ~1,159.0 kB | **849.5 kB** | **-309.5 kB (-26.7%)** |
| **Total Initial `/` JS (gzip)** | 318.2 kB | **246.7 kB** | **-71.5 kB (-22.5%)** |
| **Total Initial `/` JS (Brotli — served in prod)** | *(uncompressed / gzip only)* | **226.1 kB** | **-92.1 kB (-28.9% vs baseline gzip)** |
| **`InquiryForm` Chunk (raw / gzip)** | 174.6 kB / 42.7 kB | **19.0 kB / 5.8 kB** (5.3 kB br) | **-155.6 kB (-89.1%)** |
| **Duplicate Raw Hero JPG in `dist/assets/`** | 861.45 kB (`hero_travel_skyline*.jpg`) | **0 kB** (removed; uses optimized 1280w JPG for OG) | **-861.45 kB (-100%)** |
| **Mobile Hero LCP Image Payload** | Unpreloaded `<picture>` | **22.4 kB** (`mobile-480w.avif`) / **30.6 kB** (`mobile-720w.avif`) preloaded with `fetchpriority="high"` | **-96% vs raw JPG** |
| **Eager Third-Party Iframes on Initial Load** | 3 Google Maps `<iframe>`s (Footer, Contact, About; ~500 KB JS/tiles each) | **0 iframes** (click-to-load `<GoogleMapFacade>`) | **-100% upfront 3P cost** |
| **Render-Blocking Font Stylesheets** | 1 blocking Google Fonts CSS (11 font weights) | **0 blocking stylesheets** (`rel="preload" as="style"` + `onload` swap, 8 weights) | **-100% font render-block** |
| **Lazy-Loaded Code Split Off `/` Critical Path** | 18 route chunks | **35 lazy chunks** (**604.3 kB raw / 149.4 kB Brotli**) | **+17 lazy boundaries** |

### 2.2 Full Production Bundle Analysis Report (`npm run perf:bundle`)

#### Initial `/` Route Chunks (Loaded on First Visit)

| Chunk | Raw | Gzip | Brotli | Role |
| :--- | ---: | ---: | ---: | :--- |
| `vendor-react-*.js` | 395.41 kB | 118.99 kB | 107.68 kB | React 19 runtime (`immutable` 1yr cache) |
| `index-*.js` | 220.15 kB | 48.57 kB | 42.59 kB | App shell, Navbar, Footer, CinematicHero, above-fold HomePage |
| `vendor-motion-*.js` | 102.04 kB | 35.93 kB | 34.82 kB | Framer Motion `LazyMotion` (`domAnimation` subset) |
| `index-*.css` | 88.13 kB | 13.58 kB | 11.84 kB | Tailwind CSS v4 purged utility + design tokens |
| `vendor-router-*.js` | 37.62 kB | 13.38 kB | 12.97 kB | React Router v7 |
| `vendor-icons-*.js` | 33.24 kB | 11.95 kB | 11.36 kB | Tree-shaken Lucide icons |
| `site-*.js` | 28.52 kB | 8.63 kB | 8.05 kB | Single-source config (`src/config/site.ts`) |
| `data-catalog-summary-*.js` | 30.59 kB | 8.14 kB | 7.59 kB | Lightweight card/nav/SEO summaries (replaces 282 kB full detail files) |
| `LanguageContext-*.js` | 1.09 kB | 0.61 kB | 0.56 kB | Bangla/English routing context |
| `rolldown-runtime-*.js` | 0.89 kB | 0.50 kB | 0.47 kB | Vite 8 ESM helper |

#### Key Lazy-Loaded Chunks (0 Bytes on Initial `/`)

| Chunk | Raw | Gzip | Brotli | Loaded When |
| :--- | ---: | ---: | ---: | :--- |
| `services-*.js` | 109.80 kB | 26.92 kB | 24.84 kB | Navigating to `/services/:slug` |
| `blogs-*.js` | 65.24 kB | 14.56 kB | 14.40 kB | Navigating to `/blog` or `/blog/:slug` |
| `destinations-*.js` | 45.84 kB | 11.38 kB | 10.71 kB | Navigating to `/destinations/:country` |
| `ServiceDetailPage-*.js` | 52.84 kB | 11.34 kB | 10.54 kB | Navigating to `/services/:slug` (idle-prefetched on 4G) |
| `VisaCheckerPage-*.js` | 35.96 kB | 8.79 kB | 8.17 kB | Navigating to `/visa-checker` (idle-prefetched on 4G) |
| `HomeBelowFold-*.js` | 33.46 kB | 7.90 kB | 7.49 kB | Below-the-fold sections 8–13 on `/` |
| `packages-*.js` | 32.29 kB | 7.79 kB | 7.38 kB | Navigating to `/tour-packages*` |
| `InquiryForm-*.js` | 19.03 kB | 5.78 kB | 5.34 kB | CtaBanner, ContactPage, ConsultationModal |
| `ChecklistModal-*.js` | 13.52 kB | 4.79 kB | 4.47 kB | User clicks "Get Free Checklist PDF" |
| `CtaBanner-*.js` | 5.43 kB | 2.04 kB | 1.91 kB | Bottom CTA section |
| `ScrollDepthLeadMagnet-*.js` | 4.67 kB | 1.86 kB | 1.74 kB | Deferred 3.5s after load or first scroll |
| `ConsultationModal-*.js` | 3.37 kB | 1.49 kB | 1.41 kB | User clicks "Free Consultation" modal button |
| `GalleryLightbox-*.js` | 2.34 kB | 0.98 kB | 0.92 kB | User clicks a photo on `/gallery` |
| `ExitIntentModal-*.js` | 1.67 kB | 0.89 kB | 0.83 kB | Desktop only, deferred post-LCP |
| `HeroVideoLayer-*.js` | 0.70 kB | 0.42 kB | 0.39 kB | Desktop fine-pointer + fast 4G + video enabled |

> Run `npm run perf:bundle` after any production build (`npm run build`) to regenerate this exact chunk report.
> Run `npm run catalog:sync` whenever editing `src/data/services.ts`, `destinations.ts`, `packages.ts`, or `blogs.ts` to keep `src/data/catalogSummary.ts` in sync.

---

## 3. Implemented Performance Techniques

### 3.1 Font Subsetting, Weight Trimming & Non-Blocking Preload
- **Trimmed weights** in `index.html` from 11 weights down to the 8 actively used weights (`Hind Siliguri: 400,600,700`, `Playfair Display: 600,700`, `Plus Jakarta Sans: 400,600,700`).
- **Automatic Unicode subsetting**: Google Fonts CSS2 serves Bengali and Latin subsets separately via `unicode-range`, so English visitors never download Bengali glyph ranges and vice versa.
- **Zero render-blocking**: Loaded with `<link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">` + `<noscript>` fallback, `display=swap`, and `preconnect` / `dns-prefetch` to `fonts.googleapis.com` and `fonts.gstatic.com`.

### 3.2 Responsive Image Pipeline & LCP Preload
- Every visual uses `<SafeImage>` (`src/components/SafeImage.tsx`) powered by `scripts/optimize-images.mjs` + `src/config/imageManifest.generated.ts`:
  - Serves **AVIF → WebP → JPEG** via `<picture>` with responsive `srcSet` and explicit `sizes` presets (`hero`, `destinationCard`, `packageCard`, `blogCard`, `galleryCard`, `editorial`, `lightbox`).
  - **Mobile art-direction crops** (`mobile-480w.avif` / `mobile-720w.avif` at 4:5 portrait) prevent cropping off landmarks on 360px–412px phones while cutting hero payload to **22–31 KB**.
  - **Exact-match LCP preloads** injected post-build by `vite.config.ts` (`inject-hero-lcp-preload`) so `<link rel="preload" as="image" type="image/avif" fetchpriority="high">` matches `<SafeImage>` URLs character-for-character (zero double downloads).
  - **LQIP WebP blur placeholders** + explicit `width`/`height` lock layout dimensions to **0 CLS**.
  - **Instant hero paint**: Above-the-fold H1, CTA row, and quick-search bar render at `opacity: 1` on frame 1; secondary slideshow images only mount when `activeSlide > 0`.

### 3.3 Dynamic Imports (`React.lazy`) & Data Decoupling
- **Catalog Summary Decoupling (`src/data/catalogSummary.ts`)**: `HomePage`, `Navbar`, `Footer`, `CinematicHero`, `InquiryForm`, and `leadContext.ts` read lightweight summaries (30.6 kB raw / 7.6 kB Brotli) instead of statically bundling 282 kB of full service articles, itineraries, and blog posts.
- **Lazy Heavy & Below-the-Fold Components**:
  - `HomeBelowFold` (sections 8–13 of `/`)
  - `CtaBanner` (inquiry form banner)
  - `ChecklistModal` (PDF checklist generator modal)
  - `ConsultationModal` (modal inquiry form)
  - `HeroVideoLayer` (desktop-only looping hero video)
  - `GalleryLightbox` (gallery photo modal)
  - `ScrollDepthLeadMagnet` & `ExitIntentModal` (deferred until 3.5s post-load or first scroll)
  - All 19 secondary page routes (`src/App.tsx` + `src/lib/prefetchRoutes.ts`).

### 3.4 Interactive Facades (Maps, YouTube & Facebook)
- **`<GoogleMapFacade>` (`src/components/GoogleMapFacade.tsx`)**: Replaces eager Google Maps `<iframe>`s in `Footer`, `ContactPage`, and `AboutPage` (`TeamAndOfficeSlots`). Displays a branded Navy/Gold Rohanpur office map card with coordinates, direct Google Maps directions link, and a 1-tap **"Load Interactive Map"** button that mounts the iframe only on user click.
- **`<MediaEmbedFacade>` (`src/components/MediaEmbedFacade.tsx`)**: Click-to-load facade for YouTube (`youtube-nocookie.com`) and Facebook video embeds. Used on `HomeBelowFold` for client video stories — zero third-party player JS/cookies loaded before click.

### 3.5 Third-Party Scripts (`lazyOnload` Strategy)
- `initOptionalAnalyticsScripts()` in `src/lib/seo.ts` defers **GA4 (`gtag.js`)** and **Meta Pixel (`fbevents.js`)** until after `window.load` + `requestIdleCallback` (2500ms timeout) or first user interaction (`pointerdown`/`keydown`/`scroll`). Zero main-thread contention during FCP/LCP/TBT.

### 3.6 Selective Network-Aware Route Prefetching
- `src/lib/prefetchRoutes.ts` prefetches **only the 4 highest-conversion routes** (`/services`, `/services/:slug`, `/visa-checker`, `/contact`) staggered during browser idle after `window.load`.
- Strictly aborts prefetching when `navigator.connection.saveData === true`, `effectiveType` is `slow-2g` or `2g`, or `downlink < 1.2 Mbps`.
- Desktop Navbar links trigger single-route hover/focus prefetching via `prefetchRouteByPath()`.

### 3.7 CSS & Rendering Optimizations
- Tailwind CSS v4 automatically purges all unused utility classes (`11.84 kB` Brotli total CSS).
- Below-the-fold sections apply `.cv-auto` (`content-visibility: auto; contain-intrinsic-size: auto 560px;`) so mobile browsers skip layout/paint work for offscreen sections until scrolled near, improving initial render and INP without causing CLS.

---

## 4. Production Compression, Cache Headers & ISR Revalidation (`server.ts`)

### 4.1 On-the-Fly Brotli & Gzip Compression
- Production text assets (`.html`, `.js`, `.css`, `.svg`, `.json`, `.xml`, `.txt`, `.webmanifest`) are served with **Brotli (`Content-Encoding: br`)** when supported by the client, falling back to **Gzip (`Content-Encoding: gzip`)**, with `Vary: Accept-Encoding`.

### 4.2 Static Asset Cache Headers
| Asset Path | `Cache-Control` Header |
| :--- | :--- |
| `/assets/*` (hashed Vite JS/CSS bundles) | `public, max-age=31536000, immutable` |
| `/src/assets/optimized/*` (AVIF/WebP/JPG responsive images) | `public, max-age=31536000, immutable` |
| `/favicon.svg`, `/manifest.webmanifest`, `/robots.txt` | `public, max-age=86400, stale-while-revalidate=604800` |
| `/api/*` and `/admin/*` | `no-store` |

### 4.3 ISR-Style HTML Caching & On-Demand Revalidation
- Public HTML routes are cached in-memory with SHA-256 `ETag` (`304 Not Modified` support) and `X-Cache-Status: HIT | STALE | MISS`:
  - **Homepage (`/`) & Tour Packages (`/tour-packages*`)**: `s-maxage=300` (5-minute fresh TTL) + `stale-while-revalidate=86400` (24-hour background refresh).
  - **Services, Destinations, Blog, Visa Checker, About, FAQ, Contact, Licenses**: `s-maxage=3600` (1-hour fresh TTL) + `stale-while-revalidate=86400`.
- **On-Demand Revalidation Endpoint**:
  ```bash
  # Revalidate a single page after content update
  curl -X POST https://www.visatripglobal.com/api/revalidate \
    -H "Content-Type: application/json" \
    -H "x-admin-password: $ADMIN_PASSWORD" \
    -d '{"path":"/tour-packages"}'

  # Revalidate all cached public HTML pages
  curl -X POST https://www.visatripglobal.com/api/revalidate \
    -H "Content-Type: application/json" \
    -H "x-admin-password: $ADMIN_PASSWORD" \
    -d '{}'
  ```

---

## 5. Lighthouse Mobile Verification Checklist

Run against a production build (`npm run build && NODE_ENV=production npm start`) in Chrome Incognito with **Lighthouse Mobile (Simulated Slow 4G, 4x CPU throttle)**:

1. **Verify Production Headers**:
   ```bash
   curl -sI -H "Accept-Encoding: br" http://localhost:3000/ | grep -iE "content-encoding|cache-control|etag|x-cache-status"
   ```
   Expected: `Content-Encoding: br`, `Cache-Control: public, max-age=60, s-maxage=300, stale-while-revalidate=86400`, `ETag`, `X-Cache-Status: MISS` (1st hit) → `HIT` (2nd hit).
2. **Verify Immutable Static Assets**:
   ```bash
   curl -sI http://localhost:3000/src/assets/optimized/hero/mobile-480w.avif | grep -iE "content-type|cache-control"
   ```
   Expected: `Content-Type: image/avif`, `Cache-Control: public, max-age=31536000, immutable`.
3. **Verify Zero Eager Third-Party Calls**:
   - Open DevTools Network tab on `/` → confirm **0 requests** to `maps.google.com`, `maps.googleapis.com`, `youtube.com`, or `connect.facebook.net` before interaction.
4. **Verify Single LCP Hero Fetch**:
   - In DevTools Network (Img filter, 390px mobile viewport), confirm `mobile-480w.avif` or `mobile-720w.avif` loads **once** with `High` priority and `22–31 kB` transfer size.
5. **Confirm Core Web Vitals Targets**:
   - Mobile Performance score **>= 90**
   - LCP **< 2.5s**
   - CLS **< 0.1** (target `0.00`)
   - TBT **< 200ms** / INP **< 200ms**
