#!/usr/bin/env node
/**
 * Visatrip Global — Build-Time Responsive Image Optimization Pipeline
 *
 * Generates:
 *  - AVIF responsive variants (480w, 960w, 1440w)
 *  - WebP responsive variants (480w, 960w, 1440w)
 *  - Progressive JPEG fallback variants (640w, 1200w)
 *  - Mobile 4:5 art-direction portrait crops (480x600, 720x900) in AVIF & WebP
 *  - Ultra-compact 24px blurred WebP LQIP base64 placeholders (~350 bytes each)
 *  - Typed TypeScript manifest at src/config/imageManifest.generated.ts
 *
 * Usage: npm run images:build
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SOURCES_PATH = path.resolve(ROOT, 'src/config/imageSources.json');
const OUT_ROOT = path.resolve(ROOT, 'src/assets/optimized');
const MANIFEST_OUT = path.resolve(ROOT, 'src/config/imageManifest.generated.ts');

const DESKTOP_WIDTHS = [480, 960, 1440];
const JPEG_WIDTHS = [640, 1280];
const MOBILE_CROPS = [
  { width: 480, height: 600 },
  { width: 720, height: 900 },
];

function runConvert(args) {
  execFileSync('convert', args, { stdio: 'pipe' });
}

function getDimensions(filePath) {
  const out = execFileSync('identify', ['-format', '%w %h', filePath], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
  const [w, h] = out.split(/\s+/).map(Number);
  return { width: w || 1200, height: h || 800 };
}

function buildLqipDataUrl(filePath) {
  const buf = execFileSync(
    'convert',
    [
      filePath,
      '-strip',
      '-resize',
      '24x',
      '-blur',
      '0x1.5',
      '-quality',
      '55',
      'webp:-',
    ],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );
  return `data:image/webp;base64,${buf.toString('base64')}`;
}

function toPublicUrl(absPath) {
  return '/' + path.relative(ROOT, absPath).split(path.sep).join('/');
}

function main() {
  const sources = JSON.parse(fs.readFileSync(SOURCES_PATH, 'utf8'));
  fs.mkdirSync(OUT_ROOT, { recursive: true });

  const manifest = {};

  for (const [key, cfg] of Object.entries(sources)) {
    const absInput = path.resolve(ROOT, cfg.src.replace(/^\//, ''));
    if (!fs.existsSync(absInput)) {
      console.warn(`[images:build] Missing source for "${key}": ${absInput}`);
      continue;
    }

    const { width: origW, height: origH } = getDimensions(absInput);
    const outDir = path.join(OUT_ROOT, key);
    fs.mkdirSync(outDir, { recursive: true });

    const avifEntries = [];
    const webpEntries = [];
    const jpgEntries = [];

    // 1. Responsive landscape / standard variants (never upscale beyond original width)
    const targetWidths = Array.from(
      new Set(DESKTOP_WIDTHS.map((w) => Math.min(w, origW)))
    ).sort((a, b) => a - b);

    for (const w of targetWidths) {
      const avifPath = path.join(outDir, `${w}w.avif`);
      const webpPath = path.join(outDir, `${w}w.webp`);

      runConvert([
        absInput,
        '-auto-orient',
        '-strip',
        '-resize',
        `${w}x>`,
        '-quality',
        '52',
        avifPath,
      ]);

      runConvert([
        absInput,
        '-auto-orient',
        '-strip',
        '-resize',
        `${w}x>`,
        '-quality',
        '78',
        webpPath,
      ]);

      avifEntries.push(`${toPublicUrl(avifPath)} ${w}w`);
      webpEntries.push(`${toPublicUrl(webpPath)} ${w}w`);
    }

    // 2. Progressive JPEG fallbacks
    const targetJpgWidths = Array.from(
      new Set(JPEG_WIDTHS.map((w) => Math.min(w, origW)))
    ).sort((a, b) => a - b);

    let fallbackSrc = cfg.src;
    for (const w of targetJpgWidths) {
      const jpgPath = path.join(outDir, `${w}w.jpg`);
      runConvert([
        absInput,
        '-auto-orient',
        '-strip',
        '-interlace',
        'Plane',
        '-resize',
        `${w}x>`,
        '-quality',
        '82',
        jpgPath,
      ]);
      const url = toPublicUrl(jpgPath);
      jpgEntries.push(`${url} ${w}w`);
      fallbackSrc = url;
    }

    // 3. Mobile 4:5 art-direction portrait crops (focal-point aware)
    const mobileAvifEntries = [];
    const mobileWebpEntries = [];

    if (cfg.generateMobileCrop !== false) {
      const gravity = cfg.mobileGravity || 'Center';
      for (const crop of MOBILE_CROPS) {
        const mAvifPath = path.join(outDir, `mobile-${crop.width}w.avif`);
        const mWebpPath = path.join(outDir, `mobile-${crop.width}w.webp`);
        const geometry = `${crop.width}x${crop.height}^`;
        const extent = `${crop.width}x${crop.height}`;

        runConvert([
          absInput,
          '-auto-orient',
          '-strip',
          '-resize',
          geometry,
          '-gravity',
          gravity,
          '-extent',
          extent,
          '-quality',
          '52',
          mAvifPath,
        ]);

        runConvert([
          absInput,
          '-auto-orient',
          '-strip',
          '-resize',
          geometry,
          '-gravity',
          gravity,
          '-extent',
          extent,
          '-quality',
          '78',
          mWebpPath,
        ]);

        mobileAvifEntries.push(`${toPublicUrl(mAvifPath)} ${crop.width}w`);
        mobileWebpEntries.push(`${toPublicUrl(mWebpPath)} ${crop.width}w`);
      }
    }

    // 4. Compact blurred LQIP base64 placeholder
    const blurDataUrl = buildLqipDataUrl(absInput);

    manifest[key] = {
      src: fallbackSrc,
      originalSrc: cfg.src,
      avifSrcSet: avifEntries.join(', '),
      webpSrcSet: webpEntries.join(', '),
      jpgSrcSet: jpgEntries.join(', '),
      mobileAvifSrcSet: mobileAvifEntries.join(', '),
      mobileWebpSrcSet: mobileWebpEntries.join(', '),
      blurDataUrl,
      width: origW,
      height: origH,
      mobileWidth: 720,
      mobileHeight: 900,
      objectPosition: cfg.objectPosition || '50% 50%',
      mobileObjectPosition: cfg.mobileObjectPosition || '50% 50%',
      altBn: cfg.altBn,
      altEn: cfg.altEn,
    };

    console.log(
      `[images:build] Optimized "${key}" (${origW}x${origH}) -> AVIF/WebP/JPEG + 4:5 mobile crop + LQIP`
    );
  }

  const fileBanner = `/* eslint-disable */
// AUTO-GENERATED by scripts/optimize-images.mjs — DO NOT EDIT MANUALLY.
// Re-run "npm run images:build" after adding or replacing photos in src/assets/images/.

export interface OptimizedImageEntry {
  src: string;
  originalSrc: string;
  avifSrcSet: string;
  webpSrcSet: string;
  jpgSrcSet: string;
  mobileAvifSrcSet: string;
  mobileWebpSrcSet: string;
  blurDataUrl: string;
  width: number;
  height: number;
  mobileWidth: number;
  mobileHeight: number;
  objectPosition: string;
  mobileObjectPosition: string;
  altBn: string;
  altEn: string;
}

export const imageManifest = ${JSON.stringify(manifest, null, 2)} as const satisfies Record<string, OptimizedImageEntry>;

export type SiteImageKey = keyof typeof imageManifest;
`;

  fs.writeFileSync(MANIFEST_OUT, fileBanner, 'utf8');
  console.log(`\n[images:build] Wrote manifest -> ${path.relative(ROOT, MANIFEST_OUT)}`);
}

main();
