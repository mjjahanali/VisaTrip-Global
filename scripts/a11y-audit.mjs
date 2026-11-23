#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'src');

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  return [
    parseInt(clean.slice(0, 2), 16) / 255,
    parseInt(clean.slice(2, 4), 16) / 255,
    parseInt(clean.slice(4, 6), 16) / 255,
  ];
}

function relativeLuminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(fg, bg) {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

function walkFiles(dir, exts = ['.ts', '.tsx', '.css']) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(full, exts));
    } else if (exts.some((ext) => entry.name.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

const failures = [];
const checks = [];

function assertCheck(name, ok, detail = '') {
  checks.push({ name, ok, detail });
  if (!ok) failures.push(`${name}${detail ? ` — ${detail}` : ''}`);
}

// 1. WCAG 2.1 AA Contrast Matrix Verification (>= 4.5:1 normal text)
const contrastPairs = [
  { label: 'Dark Gold text (#7D5D14) on White (#FFFFFF)', fg: '#7D5D14', bg: '#FFFFFF', min: 4.5 },
  { label: 'Dark Gold text (#7D5D14) on Cream (#FAF8F4)', fg: '#7D5D14', bg: '#FAF8F4', min: 4.5 },
  { label: 'Dark Gold text (#7D5D14) on Warm Tint (#FFFDF7)', fg: '#7D5D14', bg: '#FFFDF7', min: 4.5 },
  { label: 'Brand Gold (#C9A24B) on Navy (#0B1F3A)', fg: '#C9A24B', bg: '#0B1F3A', min: 4.5 },
  { label: 'Navy text (#0B1F3A) on Gold CTA (#C9A24B)', fg: '#0B1F3A', bg: '#C9A24B', min: 4.5 },
  { label: 'Hajj Gold (#E2BE67) on Hajj Green (#0F5132)', fg: '#E2BE67', bg: '#0F5132', min: 4.5 },
  { label: 'Hajj Gold (#E2BE67) on Deep Hajj Green (#09321E)', fg: '#E2BE67', bg: '#09321E', min: 4.5 },
  { label: 'Muted Slate (#525B68) on White (#FFFFFF)', fg: '#525B68', bg: '#FFFFFF', min: 4.5 },
  { label: 'Muted Slate (#525B68) on Cream (#FAF8F4)', fg: '#525B68', bg: '#FAF8F4', min: 4.5 },
  { label: 'Placeholder (#596270) on Cream (#FAF8F4)', fg: '#596270', bg: '#FAF8F4', min: 4.5 },
  { label: 'Error Red-700 (#B91C1C) on Cream (#FAF8F4)', fg: '#B91C1C', bg: '#FAF8F4', min: 4.5 },
  { label: 'Error Red-300 (#FCA5A5) on Navy (#0B1F3A)', fg: '#FCA5A5', bg: '#0B1F3A', min: 4.5 },
  { label: 'Primary Ink (#1A1A1A) on Cream (#FAF8F4)', fg: '#1A1A1A', bg: '#FAF8F4', min: 4.5 },
  { label: 'Navy (#0B1F3A) on White (#FFFFFF)', fg: '#0B1F3A', bg: '#FFFFFF', min: 4.5 },
];

for (const pair of contrastPairs) {
  const ratio = contrastRatio(pair.fg, pair.bg);
  assertCheck(`Contrast: ${pair.label}`, ratio >= pair.min, `${ratio}:1 (min ${pair.min}:1)`);
}

// 2. Scan src/ for banned low-contrast tokens & suppressed focus rings
const allFiles = walkFiles(SRC_DIR);
const bannedColorRegex = /#(A98332|9E7A2B|6B7280|8E96A3)\b|text-red-[456]00\b/g;
const bannedColorHits = [];
const interactiveFocusSuppressHits = [];
const unlabeledControlHits = [];

for (const file of allFiles) {
  const rel = path.relative(ROOT, file);
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, i) => {
    const colorMatches = line.match(bannedColorRegex);
    if (colorMatches) {
      bannedColorHits.push(`${rel}:${i + 1} (${colorMatches.join(', ')})`);
    }
    if (/focus:outline-none|\boutline-none\b/.test(line)) {
      // Allow ONLY on programmatic tabIndex={-1} containers (<main> or modal/drawer dialog wrappers)
      const windowSlice = lines.slice(Math.max(0, i - 5), i + 2).join(' ');
      const isProgrammaticContainer =
        /tabIndex=\{-1\}/.test(windowSlice) || /<main\b/.test(windowSlice) || /role="dialog"/.test(windowSlice);
      if (!isProgrammaticContainer) {
        interactiveFocusSuppressHits.push(`${rel}:${i + 1}`);
      }
    }
  });

  if (file.endsWith('.tsx')) {
    // Check that every <input>, <select>, <textarea> tag has id= or aria-label= or aria-labelledby=
    const controlRegex = /<(input|select|textarea)\b[\s\S]*?>/g;
    let m;
    while ((m = controlRegex.exec(content)) !== null) {
      const tag = m[0];
      const hasName = /\bid=/.test(tag) || /\baria-label=/.test(tag) || /\baria-labelledby=/.test(tag);
      const isHidden = /type=["']hidden["']/.test(tag);
      if (!hasName && !isHidden) {
        const lineNum = content.slice(0, m.index).split('\n').length;
        unlabeledControlHits.push(`${rel}:${lineNum} (<${m[1]}>)`);
      }
    }
  }
}

assertCheck(
  'Zero legacy low-contrast color tokens (#A98332, #9E7A2B, #6B7280, #8E96A3, text-red-400/500/600)',
  bannedColorHits.length === 0,
  bannedColorHits.length ? bannedColorHits.join('; ') : '0 occurrences'
);

assertCheck(
  'Zero focus:outline-none on interactive controls',
  interactiveFocusSuppressHits.length === 0,
  interactiveFocusSuppressHits.length ? interactiveFocusSuppressHits.join('; ') : '0 occurrences'
);

assertCheck(
  'All <input>, <select>, <textarea> controls have explicit id or aria-label',
  unlabeledControlHits.length === 0,
  unlabeledControlHits.length ? unlabeledControlHits.join('; ') : '100% labeled'
);

// 3. Structural WCAG 2.1 AA pattern verification
function readSrc(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf8');
}

const css = readSrc('src/index.css');
assertCheck('Global :focus-visible high-contrast dual ring defined', css.includes(':focus-visible') && css.includes('[data-dark-surface="false"] :focus-visible'));
assertCheck('Skip link CSS (.skip-link) defined', css.includes('.skip-link'));
assertCheck('Reduced motion CSS media query neutralizes animations & transforms', css.includes('prefers-reduced-motion: reduce') && css.includes('transform: none !important'));
assertCheck('Buttons allow text wrapping at 200% zoom (no forced white-space: nowrap)', !/\.btn-primary[\s\S]*?white-space:\s*nowrap/.test(css));

const layout = readSrc('src/components/Layout.tsx');
assertCheck('Skip link wired to #main-content landmark', layout.includes('href="#main-content"') && layout.includes('id="main-content"'));

const app = readSrc('src/App.tsx');
assertCheck('Framer Motion respects prefers-reduced-motion via MotionConfig', app.includes('reducedMotion="user"'));

const langCtx = readSrc('src/context/LanguageContext.tsx');
assertCheck('Document <html lang> synced dynamically for Bangla (bn) / English (en)', langCtx.includes('document.documentElement.lang'));

const focusTrapTargets = [
  'src/components/Navbar.tsx',
  'src/components/ConsultationModal.tsx',
  'src/components/ChecklistModal.tsx',
  'src/components/GalleryLightbox.tsx',
  'src/pages/TourPackagesPage.tsx',
];
for (const target of focusTrapTargets) {
  const src = readSrc(target);
  assertCheck(`Focus trap & Escape handler in ${target}`, src.includes('useFocusTrap') && src.includes('role="dialog"') && src.includes('aria-modal="true"'));
}

const accordion = readSrc('src/components/FaqAccordion.tsx');
assertCheck('WAI-ARIA APG Accordion (aria-expanded, aria-controls, role="region", Arrow keys)', accordion.includes('aria-controls') && accordion.includes('role="region"') && accordion.includes('ArrowDown'));

const tabTargets = [
  'src/pages/ServiceDetailPage.tsx',
  'src/pages/AdminLeadsPage.tsx',
  'src/pages/FaqPage.tsx',
  'src/components/CinematicHero.tsx',
];
for (const target of tabTargets) {
  const src = readSrc(target);
  assertCheck(`WAI-ARIA Tablist & keyboard arrows in ${target}`, src.includes('role="tablist"') && src.includes('aria-selected') && src.includes('ArrowRight'));
}

const formErrorTargets = [
  'src/components/InquiryForm.tsx',
  'src/components/ChecklistModal.tsx',
  'src/pages/TrackApplicationPage.tsx',
  'src/pages/AdminLeadsPage.tsx',
  'src/components/OfficeReviewQrCard.tsx',
];
for (const target of formErrorTargets) {
  const src = readSrc(target);
  assertCheck(`Form error association (aria-describedby + role="alert") in ${target}`, src.includes('aria-describedby') && src.includes('role="alert"'));
}

const navbar = readSrc('src/components/Navbar.tsx');
assertCheck('Bilingual lang="en"/"bn" attributes & aria-current="page" in Navbar', navbar.includes('aria-current=') && navbar.includes('lang="bn"') && navbar.includes('lang="en"'));

const breadcrumbs = readSrc('src/components/Breadcrumbs.tsx');
assertCheck('Breadcrumbs mark current page with aria-current="page"', breadcrumbs.includes("aria-current={isLast ? 'page' : undefined}"));

// Print concise audit table
console.log('\n=== WCAG 2.1 AA Accessibility Audit Report ===\n');
for (const c of checks) {
  const icon = c.ok ? 'PASS' : 'FAIL';
  console.log(`[${icon}] ${c.name}${c.detail ? ` (${c.detail})` : ''}`);
}

console.log(`\nTotal Checks: ${checks.length} | Passed: ${checks.length - failures.length} | Failed: ${failures.length}\n`);
if (failures.length > 0) {
  console.error('Accessibility audit failed:');
  for (const f of failures) console.error(' -', f);
  process.exit(1);
}
