import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { servicesData } from '../src/data/services.ts';
import { destinationsData } from '../src/data/destinations.ts';
import { tourPackagesData } from '../src/data/packages.ts';
import { blogPostsData } from '../src/data/blogs.ts';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');

function normalizeBasePath(raw) {
  if (!raw || raw === '/') return '/';
  const trimmed = String(raw).trim().replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

const rootCnamePath = path.join(ROOT, 'CNAME');
const detectedRootCname = fs.existsSync(rootCnamePath)
  ? fs.readFileSync(rootCnamePath, 'utf8').trim()
  : '';
const customDomain = (process.env.GH_PAGES_CNAME || detectedRootCname || '').trim();
const basePath = normalizeBasePath(
  process.env.VITE_BASE_PATH || (customDomain ? '/' : '/')
);
const siteUrl = (
  process.env.VITE_SITE_URL ||
  (customDomain ? `https://${customDomain}` : 'https://www.visatripglobal.com')
).replace(/\/+$/, '');
const pathSegmentsToKeep = basePath === '/' ? 0 : basePath.split('/').filter(Boolean).length;

console.log(`\n[gh-pages] Building static bundle...`);
console.log(`[gh-pages] Base path : ${basePath} (pathSegmentsToKeep=${pathSegmentsToKeep})`);
console.log(`[gh-pages] Site URL  : ${siteUrl}`);
if (customDomain) {
  console.log(`[gh-pages] CNAME     : ${customDomain}`);
}

// 1. Run Vite production build in static-site mode
const viteBin = path.join(ROOT, 'node_modules', '.bin', 'vite');
execFileSync(viteBin, ['build'], {
  cwd: ROOT,
  stdio: 'inherit',
  env: {
    ...process.env,
    VITE_BASE_PATH: basePath,
    VITE_SITE_URL: siteUrl,
    VITE_STATIC_SITE: process.env.VITE_STATIC_SITE ?? 'true',
  },
});

if (!fs.existsSync(DIST)) {
  throw new Error('dist/ directory was not created by Vite build.');
}

// 2. Write .nojekyll so GitHub Pages serves static files directly without Jekyll processing
fs.writeFileSync(path.join(DIST, '.nojekyll'), '', 'utf8');

// 3. Write GitHub Pages SPA 404.html redirector (restored cleanly in src/main.tsx)
const spa404Html = `<!doctype html>
<html lang="bn">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Visatrip Global</title>
    <script>
      (function () {
        var pathSegmentsToKeep = ${pathSegmentsToKeep};
        var l = window.location;
        l.replace(
          l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
          l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
          l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
          (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
          l.hash
        );
      })();
    </script>
  </head>
  <body></body>
</html>
`;
fs.writeFileSync(path.join(DIST, '404.html'), spa404Html, 'utf8');

// 4. Generate static bidirectional sitemap.xml (Bangla + English, excluding noindex routes)
const staticPaths = [
  '/',
  '/about',
  '/services',
  '/destinations',
  '/tour-packages',
  '/success-stories',
  '/gallery',
  '/blog',
  '/faq',
  '/contact',
  '/service-areas',
  '/licenses',
  '/privacy-policy',
  '/terms-and-conditions',
  '/refund-policy',
];

const dynamicPaths = [
  ...servicesData.map((s) => `/services/${s.slug}`),
  ...destinationsData.map((d) => `/destinations/${d.slug}`),
  ...tourPackagesData.map((p) => `/tour-packages/${p.slug}`),
  ...blogPostsData.map((b) => `/blog/${b.slug}`),
];

const allPaths = [...staticPaths, ...dynamicPaths];
const today = new Date().toISOString().split('T')[0];

const urlEntries = allPaths
  .flatMap((p) => {
    const bnUrl = `${siteUrl}${p}`;
    const enPath = p === '/' ? '/en' : `/en${p}`;
    const enUrl = `${siteUrl}${enPath}`;
    const priority =
      p === '/'
        ? '1.0'
        : p.startsWith('/services/')
        ? '0.9'
        : p.startsWith('/destinations/') || p.startsWith('/tour-packages/')
        ? '0.8'
        : p.includes('policy') || p.includes('terms')
        ? '0.4'
        : '0.7';

    const hreflangBlock = `    <xhtml:link rel="alternate" hreflang="bn-BD" href="${bnUrl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${bnUrl}" />`;

    return [
      `  <url>
    <loc>${bnUrl}</loc>
${hreflangBlock}
    <lastmod>${today}</lastmod>
    <priority>${priority}</priority>
  </url>`,
      `  <url>
    <loc>${enUrl}</loc>
${hreflangBlock}
    <lastmod>${today}</lastmod>
    <priority>${priority}</priority>
  </url>`,
    ];
  })
  .join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>
`;
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemapXml, 'utf8');

// 5. Update dist/robots.txt with active siteUrl
const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: ${siteUrl}/sitemap.xml
`;
fs.writeFileSync(path.join(DIST, 'robots.txt'), robotsTxt, 'utf8');

// 6. Rewrite dist/manifest.webmanifest paths to honor basePath
const manifestPath = path.join(DIST, 'manifest.webmanifest');
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.start_url = basePath;
  manifest.scope = basePath;
  if (Array.isArray(manifest.icons)) {
    manifest.icons = manifest.icons.map((icon) => ({
      ...icon,
      src: icon.src.startsWith('http')
        ? icon.src
        : `${basePath}${icon.src.replace(/^\/+/, '')}`,
    }));
  }
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

// 7. Rewrite root-relative favicon/manifest links & OG image origin inside dist/index.html
const distIndexPath = path.join(DIST, 'index.html');
if (fs.existsSync(distIndexPath)) {
  let html = fs.readFileSync(distIndexPath, 'utf8');
  if (basePath !== '/') {
    html = html
      .replaceAll('href="/favicon.ico', `href="${basePath}favicon.ico`)
      .replaceAll('href="/favicon.svg', `href="${basePath}favicon.svg`)
      .replaceAll('href="/favicon-48x48.png', `href="${basePath}favicon-48x48.png`)
      .replaceAll('href="/favicon-32x32.png', `href="${basePath}favicon-32x32.png`)
      .replaceAll('href="/favicon-16x16.png', `href="${basePath}favicon-16x16.png`)
      .replaceAll('href="/apple-touch-icon.png', `href="${basePath}apple-touch-icon.png`)
      .replaceAll('href="/manifest.webmanifest"', `href="${basePath}manifest.webmanifest"`);
  }
  if (siteUrl !== 'https://www.visatripglobal.com') {
    html = html.replaceAll('https://www.visatripglobal.com/', `${siteUrl}/`);
  }
  fs.writeFileSync(distIndexPath, html, 'utf8');
}

// 8. Optional Custom Domain CNAME
if (customDomain) {
  fs.writeFileSync(path.join(DIST, 'CNAME'), `${customDomain}\n`, 'utf8');
}

// 9. Verify required GitHub Pages artifacts
const requiredArtifacts = [
  'index.html',
  '404.html',
  '.nojekyll',
  'sitemap.xml',
  'robots.txt',
  'favicon.ico',
  'favicon.svg',
  'favicon-32x32.png',
  'favicon-48x48.png',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'manifest.webmanifest',
  'src/assets/optimized/hero/1376w.avif',
];

const missing = requiredArtifacts.filter((rel) => !fs.existsSync(path.join(DIST, rel)));
if (missing.length > 0) {
  throw new Error(`[gh-pages] Missing required artifacts in dist/: ${missing.join(', ')}`);
}

console.log(`[gh-pages] Static build ready in dist/ (${allPaths.length * 2} sitemap URLs, SPA 404.html, .nojekyll).`);
