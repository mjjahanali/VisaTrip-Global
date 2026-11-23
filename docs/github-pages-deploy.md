# GitHub Pages Deployment Guide — Visatrip Global

This project is pre-configured for **one-push automated deployment to GitHub Pages** via GitHub Actions (`.github/workflows/deploy-gh-pages.yml`).

It works automatically in **both** modes:
- **Project site:** `https://<username>.github.io/<repo-name>/` (base path auto-detected from repository name)
- **Custom domain:** `https://www.visatripglobal.com/` (automatically switches base path to `/` and writes `CNAME`)

---

## 1. Quick Deploy Steps (5 Minutes)

### Step A — Push This Project to GitHub
Either click **Export / Save to GitHub** in AI Studio, **or** push from your local machine:

```bash
git init -b main
git add .
git commit -m "Prepare Visatrip Global for GitHub Pages"
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### Step B — Enable GitHub Pages (GitHub Actions Source)
1. Open your GitHub repository → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Open the **Actions** tab — the **Deploy Visatrip Global to GitHub Pages** workflow runs automatically on every push to `main` (or click **Run workflow** manually).
4. Once green (~1–2 minutes), your live URL appears directly under the `deploy` job.

---

## 2. Optional: Connect Your Custom Domain (`www.visatripglobal.com`)

1. In your GitHub repo, go to **Settings → Secrets and variables → Actions → Variables** and add:
   - `CUSTOM_DOMAIN` = `www.visatripglobal.com`
2. At your DNS provider, add:
   - `CNAME` record for `www` → `<your-username>.github.io`
   - `A` records for apex (`@`) → GitHub Pages IPs (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`)
3. In **Settings → Pages**, enter `www.visatripglobal.com` and enable **Enforce HTTPS**.
4. Re-run the workflow — it automatically sets `VITE_BASE_PATH=/`, `VITE_SITE_URL=https://www.visatripglobal.com`, and generates `dist/CNAME` + `dist/sitemap.xml`.

---

## 3. Forms, Lead Capture & Analytics on GitHub Pages

Because GitHub Pages serves static files (no Node.js/Express server):
- **Inquiry & Consultation Forms** work out of the box with **WhatsApp Direct** (pre-filled message with applicant name, phone, selected service & destination).
- **PDF Checklist Downloads** work 100% client-side with zero backend required.
- **Application Tracker (`/track-application`)** works locally for sample IDs (`VTG-2026-101`–`103`).
- **Optional Email Form Capture (Zero Server):** Add a Repository Variable in **Settings → Actions → Variables**:
  - `VITE_FORM_ENDPOINT` = your Formspree (`https://formspree.io/f/xxxxxx`) or Web3Forms endpoint.
- **Optional External Express API:** If you later host `server.ts` on Render / Railway / Cloud Run, set:
  - `VITE_API_BASE_URL` = `https://api.visatripglobal.com`
- **Optional Analytics & Search Console Variables:**
  - `VITE_GA4_MEASUREMENT_ID`
  - `VITE_META_PIXEL_ID`
  - `VITE_GSC_VERIFICATION`

---

## 4. Local Preview of the GitHub Pages Build

```bash
# Test subpath build (like username.github.io/visatrip-global/)
VITE_BASE_PATH="/visatrip-global/" VITE_SITE_URL="https://username.github.io/visatrip-global" npm run build:gh-pages
npm run preview

# Test custom-domain root build (like www.visatripglobal.com)
VITE_BASE_PATH="/" VITE_SITE_URL="https://www.visatripglobal.com" GH_PAGES_CNAME="www.visatripglobal.com" npm run build:gh-pages
npm run preview
```
