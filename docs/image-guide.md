# Visatrip Global — Owner Photography & Image Production Guide

> **Purpose:** This guide lists the exact real photographs (and optional 6-second hero video) the **Visatrip Global** team should supply to replace launch placeholder imagery, along with exact pixel dimensions, aspect ratios, mobile crop safe-zones, privacy rules, and how to run the automatic AVIF/WebP optimization pipeline.

---

## 1. Why Real Photos Matter (And What Never to Use)

Bangladeshi travelers—especially first-time applicants from Chapai Nawabganj and Rajshahi division—decide within **5 seconds** whether a travel agency is genuine or a fly-by-night broker.

### Strictly Avoid Cheap Stock Imagery
Do **not** upload any of the following to the website or Facebook campaigns:
- **Fake smiling call-center models** wearing headsets in Western offices (visitors immediately recognize stock photos and lose trust).
- **Clipart / Photoshopped airplanes** flying out of globes, passports floating in clouds, or gold "100% GUARANTEED VISA" starburst stickers.
- **Over-saturated HDR tourist flyers** downloaded from random WhatsApp forwards or Google Images (risks copyright takedowns and looks cheap).
- **Watermarked images** (Shutterstock, Getty, Dreamstime, iStock) or low-resolution Facebook screenshots (`< 800px` wide).
- **AI-generated fake staff portraits** — always use real photos of your actual Rohanpur office and real team members.

### What Builds Immediate Trust Instead
- Clean, well-lit daylight photos of your **real Rohanpur office exterior signboard and interior consultation desk**.
- Real **passport/visa handover moments** with consenting clients (with all personal passport/NID numbers blurred!).
- Real **Hajj & Umrah pre-departure briefing sessions** and group departures at Dhaka airport.
- Crisp, natural twilight or golden-hour **architectural destination photography** (either taken by your tour leaders or properly licensed editorial photography from Unsplash/Pexels/Adobe Stock with clean natural color grading—no neon filters).

---

## 2. Exact Photo Supply Checklist (Sizes, Aspect Ratios & Counts)

| Slot / Section | Image Key(s) | Count Needed | Aspect Ratio | Minimum Master Size (px) | Framing & Mobile Crop Safe Zone |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Homepage Hero Slides** (5s cross-fade slideshow) | `hero`, `heroDubai`, `heroIstanbul`, `heroMalaysia`, `saudiArabia` | **4–5 photos** | **16:9** (landscape) | **2400 × 1350** (min 1600 × 900) | Place the primary landmark (e.g., Burj Khalifa, Twin Towers, Kaaba, Airport Gate) slightly **right of center**. Leave calm atmospheric sky/water on the **left 45%** so the white headline stays effortless to read. Avoid busy bright details in the bottom-left corner. |
| **Destination Cards & Pages** | `dubai`, `saudiArabia`, `malaysia`, `thailand`, `singapore`, `turkey`, `europe`, `india` | **8 photos** (1 per country) | **4:3** (landscape) | **1600 × 1200** (min 1200 × 900) | Center the iconic landmark in the **upper-middle 65%** of the frame. The bottom 25% carries a subtle navy gradient + destination title. |
| **Tour Package Cards** | Package-specific photos (or dedicated destination shots) | **6–8 photos** (1 per package) | **16:10** (wide card) | **1600 × 1000** (min 1280 × 800) | Shoot horizontally showing the hotel, beach, landmark, or Makkah view with natural horizon level. Keep bottom 20% uncluttered for duration/category labels. |
| **Rohanpur Office & Consultation Desk** | `office` + gallery photos | **3–4 photos** | **4:3** (landscape) | **1600 × 1200** | 1× clean exterior signboard shot (morning/late afternoon sun, no parked motorcycles blocking the sign), 1× tidy interior desk with Visatrip Global branding, 1× counselor explaining documents to a client (back/side angle). |
| **Leadership & Team Portraits** | Optional additions for `/about` | **3–5 portraits** | **1:1** or **4:5** | **1000 × 1000** or **1000 × 1250** | Natural window lighting against a clean light wall or subtle office background. Neutral business attire. Eyes in the upper third of the frame. |
| **Blog Guide Covers** | Per article in `src/data/blogs.ts` | **5–8 photos** (1 per post) | **16:9** (editorial wide) | **1600 × 900** | Clean documentary/travel photography matching the topic (e.g., Kolkata hospital/India landmark for India Medical Visa, Makkah for Umrah guide). No text burned into the image. |
| **Gallery & Success Stories** | Visa handovers, airport send-offs, Umrah briefings | **9–12 photos** | **4:3** (landscape) | **1600 × 1200** | Shoot **horizontally (landscape)** — never vertical TikTok crops for gallery grids. Natural lighting, sharp focus, genuine expressions. |

**Total Recommended Real Photo Pack for Full Launch:** **30–40 curated, high-resolution original/licensed photographs** (start with the **13 core slots** already wired in `src/config/imageSources.json`, then expand Gallery & Team photos).

---

## 3. Optional 6-Second Hero Video Specification

The homepage hero already supports a muted looping background video (`siteConfig.hero.video` in `src/config/site.ts`), **automatically disabled** on:
- Mobile Data-Saver (`navigator.connection.saveData`)
- Slow mobile connections (`slow-2g`, `2g`, `3g`, or downlink `< 2.2 Mbps`)
- Mobile & tablet touch viewports (`< 1024px`)
- Users with `prefers-reduced-motion` enabled

If you supply a real video reel, follow these exact specs so page load stays fast:
1. **Duration:** **6 seconds** (seamless slow aerial or gentle twilight movement—no jarring jump cuts or flashing text).
2. **Resolution:** `1280 × 720` (720p) or `1920 × 1080` (1080p) at `24fps` or `30fps`.
3. **Audio:** **Strip the audio track completely** (`-an`) to save ~25% file size.
4. **Target File Size:** **Under 2.5 MB** for MP4 (H.264, `CRF 26`, `+faststart`) and **under 1.8 MB** for WebM (VP9).
5. **Where to Place Files:**
   - `/public/media/hero-reel-6s.mp4`
   - `/public/media/hero-reel-6s.webm`
   - Then set `hero.video.enabled = true` in `src/config/site.ts`.
6. **Poster Image:** Automatically uses the optimized `hero` image (`posterImageKey: 'hero'`) with instant LQIP blur so visitors never see a blank dark box.

Example `ffmpeg` compression command for a 6-second hero video:
```bash
# MP4 (H.264, muted, web fast-start)
ffmpeg -i raw-clip.mp4 -t 6 -an -vf "scale=1280:-2" -c:v libx264 -crf 26 -preset slow -movflags +faststart public/media/hero-reel-6s.mp4

# WebM (VP9, muted, smaller footprint)
ffmpeg -i raw-clip.mp4 -t 6 -an -vf "scale=1280:-2" -c:v libvpx-vp9 -crf 34 -b:v 0 public/media/hero-reel-6s.webm
```

---

## 4. How the Automated Image Pipeline Works

Every image rendered through `<SafeImage />` automatically serves:
- **AVIF** (`480w`, `960w`, `1440w`) — smallest modern format (typically 45–65% smaller than JPEG)
- **WebP** (`480w`, `960w`, `1440w`) — universal fast fallback
- **Progressive JPEG** (`640w`, `1280w`) — legacy browser fallback
- **Mobile 4:5 Art-Direction Crops** (`mobile-480w`, `mobile-720w` in AVIF & WebP) — focal-point cropped specifically for narrow smartphone screens below `640px`
- **Instant Base64 Blur Placeholders (LQIP)** — ~150–400 byte blurred preview embedded directly in the manifest so images never jump or flash blank boxes

### Updating or Replacing a Photo (3 Steps)
1. **Drop your high-res master photo** (`.jpg` or `.png`, minimum width `1600px`) into `/src/assets/images/` using lowercase descriptive filenames (e.g., `office_rohanpur_desk.jpg`).
2. **Update the path & focal gravity** in `/src/config/imageSources.json`:
   - `mobileGravity`: `"Center"`, `"East"` (right-weighted landmark), `"West"` (left-weighted), or `"North"` (portraits).
   - `objectPosition`: CSS focal coordinates (e.g., `"50% 40%"` or `"75% 45%"`).
   - Always fill both `altBn` (Bangla) and `altEn` (English) descriptive alt text for SEO & accessibility.
3. **Run the pipeline command:**
   ```bash
   npm run images:build
   ```
   This regenerates all AVIF/WebP/JPEG responsive sizes, mobile crops, blur placeholders, and updates `/src/config/imageManifest.generated.ts`.

---

## 5. Practical Smartphone Photography & Privacy Rules (For Office Staff)

- **Clean the lens** with a soft microfiber cloth before every shot (oily phone lenses create hazy glare).
- **Use daylight near windows**, not harsh overhead fluorescent tubes or direct phone flash.
- **Hold the phone horizontally (landscape)** for all office, gallery, destination, and handover photos.
- **Keep desks clutter-free**: remove tea cups, loose wires, random receipts, and tangled chargers before shooting the consultation desk.
- **Mandatory Client Privacy & Data Protection:**
  - Always get **verbal or written permission** before publishing a client's photo.
  - **ALWAYS blur or cover** Passport Numbers, MRZ barcode lines at the bottom of passport pages, NID numbers, Visa reference QR codes, phone numbers, and bank account details before uploading any handover or visa-success photo.
