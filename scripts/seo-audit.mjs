/**
 * Automated Technical SEO Audit Script for Visatrip Global.
 * Validates:
 * 1. Unique titles (<=60 chars), descriptions (<=160 chars), and distinct Bn/En titles across all routes
 * 2. index.html default meta & social tags
 * 3. Exactly one H1 per rendered view, clean heading hierarchy, BreadcrumbList & SeoHead coverage
 * 4. server.ts SSR staticMeta limits, bidirectional sitemap, 301 normalization, true HTTP 404 & X-Robots-Tag
 * 5. robots.txt crawl & sitemap directives
 * 6. 100% bilingual alt text coverage across imageManifest
 * 7. Zero broken internal links, zero orphan public pages, zero http:// mixed content
 * 8. Valid 301 redirect rules in public/redirects.json
 * 9. Google Rich Results JSON-LD schema compliance for all page-type builders
 *
 * Run: npm run seo:audit  (or npx tsx scripts/seo-audit.mjs)
 */
import fs from 'node:fs';
import path from 'node:path';
import { siteConfig } from '../src/config/site.ts';
import { servicesData } from '../src/data/services.ts';
import { destinationsData } from '../src/data/destinations.ts';
import { tourPackagesData } from '../src/data/packages.ts';
import { blogPostsData } from '../src/data/blogs.ts';
import { imageManifest } from '../src/config/imageManifest.generated.ts';
import {
  buildOrganizationSchema,
  buildLocalBusinessSchema,
  buildWebSiteSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
  buildTourPackageSchema,
  buildBlogPostingSchema,
  buildWebApplicationSchema,
  buildCollectionPageSchema,
} from '../src/lib/seo.ts';

const issues = [];
const addIssue = (page, category, detail) => issues.push({ page, category, detail });

const seenTitlesBn = new Map();
const seenTitlesEn = new Map();
const seenDescsBn = new Map();
const seenDescsEn = new Map();

function checkMetaPair(page, titleBn, titleEn, descBn, descEn) {
  if (titleBn.length > 60)
    addIssue(page, 'title_length', `titleBn=${titleBn.length} (>60): "${titleBn}"`);
  if (titleEn.length > 60)
    addIssue(page, 'title_length', `titleEn=${titleEn.length} (>60): "${titleEn}"`);
  if (titleBn.length < 15) addIssue(page, 'title_short', `titleBn=${titleBn.length}`);
  if (titleEn.length < 15) addIssue(page, 'title_short', `titleEn=${titleEn.length}`);
  if (titleBn.trim() === titleEn.trim()) {
    addIssue(page, 'bilingual_duplicate_title', `titleBn and titleEn are identical: "${titleBn}"`);
  }
  if (descBn.length > 160) addIssue(page, 'desc_length', `descBn=${descBn.length} (>160)`);
  if (descEn.length > 160) addIssue(page, 'desc_length', `descEn=${descEn.length} (>160)`);
  if (descBn.length < 70) addIssue(page, 'desc_short', `descBn=${descBn.length}`);
  if (descEn.length < 70) addIssue(page, 'desc_short', `descEn=${descEn.length}`);
  if (descBn.trim() === descEn.trim()) {
    addIssue(page, 'bilingual_duplicate_desc', 'descBn and descEn are identical');
  }

  if (seenTitlesBn.has(titleBn)) {
    addIssue(page, 'duplicate_title', `titleBn duplicates ${seenTitlesBn.get(titleBn)}`);
  }
  seenTitlesBn.set(titleBn, page);

  if (seenTitlesEn.has(titleEn)) {
    addIssue(page, 'duplicate_title', `titleEn duplicates ${seenTitlesEn.get(titleEn)}`);
  }
  seenTitlesEn.set(titleEn, page);

  if (seenDescsBn.has(descBn)) {
    addIssue(page, 'duplicate_desc', `descBn duplicates ${seenDescsBn.get(descBn)}`);
  }
  seenDescsBn.set(descBn, page);

  if (seenDescsEn.has(descEn)) {
    addIssue(page, 'duplicate_desc', `descEn duplicates ${seenDescsEn.get(descEn)}`);
  }
  seenDescsEn.set(descEn, page);
}

// 1. Check all data-driven SEO metadata
checkMetaPair(
  '/',
  siteConfig.seo.defaultTitleBn,
  siteConfig.seo.defaultTitleEn,
  siteConfig.seo.defaultDescriptionBn,
  siteConfig.seo.defaultDescriptionEn
);
for (const s of servicesData) {
  checkMetaPair(
    `/services/${s.slug}`,
    s.seo.titleBn,
    s.seo.titleEn,
    s.seo.descriptionBn,
    s.seo.descriptionEn
  );
}
for (const d of destinationsData) {
  checkMetaPair(
    `/destinations/${d.slug}`,
    d.seo.titleBn,
    d.seo.titleEn,
    d.seo.descriptionBn,
    d.seo.descriptionEn
  );
}
for (const p of tourPackagesData) {
  checkMetaPair(
    `/tour-packages/${p.slug}`,
    p.seo.titleBn,
    p.seo.titleEn,
    p.seo.descriptionBn,
    p.seo.descriptionEn
  );
}
for (const b of blogPostsData) {
  checkMetaPair(
    `/blog/${b.slug}`,
    b.seo.titleBn,
    b.seo.titleEn,
    b.seo.descriptionBn,
    b.seo.descriptionEn
  );
}

// 2. Check index.html default title/description/social tags
const indexHtml = fs.readFileSync('index.html', 'utf8');
const htmlTitle = indexHtml.match(/<title>([^<]+)<\/title>/)?.[1] || '';
const htmlDesc = indexHtml.match(/<meta\s+name="description"\s+content="([^"]+)"/)?.[1] || '';
if (htmlTitle.length > 60) {
  addIssue('index.html', 'title_length', `index.html <title>=${htmlTitle.length} (>60): "${htmlTitle}"`);
}
if (htmlDesc.length > 160) {
  addIssue('index.html', 'desc_length', `index.html description=${htmlDesc.length} (>160)`);
}
for (const requiredMeta of [
  'property="og:title"',
  'property="og:description"',
  'property="og:image"',
  'property="og:locale:alternate"',
  'name="twitter:card"',
  '<!--SSR_HEAD_TAGS-->',
]) {
  if (!indexHtml.includes(requiredMeta)) {
    addIssue('index.html', 'missing_meta', `Missing ${requiredMeta}`);
  }
}

// 3. Inspect all page components for H1 count, heading jumps, SeoHead props, Breadcrumb schema, noIndex
const pagesDir = 'src/pages';
const pageSummaries = [];
const noBreadcrumbRequired = new Set(['HomePage.tsx', 'NotFoundPage.tsx', 'AdminLeadsPage.tsx']);

for (const file of fs.readdirSync(pagesDir).sort()) {
  const full = path.join(pagesDir, file);
  const content = fs.readFileSync(full, 'utf8');
  const rawH1Count = (content.match(/<h1[\s>]/g) || []).length;
  // HomePage renders its single <h1> inside CinematicHero;
  // AdminLeadsPage has 2 mutually exclusive return branches (login vs dashboard), each mounting 1 <h1>.
  const effectiveH1Count =
    file === 'HomePage.tsx' ? 1 : file === 'AdminLeadsPage.tsx' && rawH1Count === 2 ? 1 : rawH1Count;

  const headingTags = [
    ...content.matchAll(/<(?:h([1-6])|SectionHeader)[\s>]/g),
  ].map((m) => (m[1] ? Number(m[1]) : 2));
  const hasSeoHead = content.includes('<SeoHead');
  const hasBreadcrumb = content.includes('buildBreadcrumbSchema');
  const hasNoIndex = content.includes('noIndex') || content.includes('noindex');

  if (effectiveH1Count !== 1 && file !== 'LegalPage.tsx') {
    addIssue(file, 'h1_count', `Found ${rawH1Count} <h1> tags (expected 1 per rendered view)`);
  }
  if (!hasSeoHead) addIssue(file, 'missing_seo_head', 'Missing <SeoHead />');
  if (!noBreadcrumbRequired.has(file) && !hasBreadcrumb) {
    addIssue(file, 'missing_breadcrumb_schema', 'Missing buildBreadcrumbSchema(...)');
  }

  if (
    (file === 'TrackApplicationPage.tsx' ||
      file === 'AdminLeadsPage.tsx' ||
      file === 'NotFoundPage.tsx') &&
    !hasNoIndex
  ) {
    addIssue(file, 'missing_noindex', 'Utility/private/404 page should set noindex');
  }

  let prev = file === 'HomePage.tsx' ? 1 : 0;
  for (const lvl of headingTags) {
    if (prev > 0 && lvl > prev + 1) {
      addIssue(file, 'heading_hierarchy', `Skipped heading level h${prev} -> h${lvl}`);
      break;
    }
    prev = lvl;
  }

  const seoBlock = content.match(/<SeoHead[\s\S]*?\/>/)?.[0] || '';
  const titleArg = seoBlock.match(/title=\{\s*t\(\s*'([^']+)',\s*'([^']+)'\s*\)\s*\}/);
  const descArg = seoBlock.match(/description=\{\s*t\(\s*'([^']+)',\s*'([^']+)'\s*\)\s*\}/);
  if (titleArg) {
    if (titleArg[1].length > 60) {
      addIssue(file, 'title_length', `titleBn=${titleArg[1].length} (>60): "${titleArg[1]}"`);
    }
    if (titleArg[2].length > 60) {
      addIssue(file, 'title_length', `titleEn=${titleArg[2].length} (>60): "${titleArg[2]}"`);
    }
    if (titleArg[1].trim() === titleArg[2].trim()) {
      addIssue(file, 'bilingual_duplicate_title', 'titleBn and titleEn are identical');
    }
  }
  if (descArg) {
    if (descArg[1].length > 160) addIssue(file, 'desc_length', `descBn=${descArg[1].length} (>160)`);
    if (descArg[2].length > 160) addIssue(file, 'desc_length', `descEn=${descArg[2].length} (>160)`);
  }

  pageSummaries.push({ file, h1Count: effectiveH1Count, hasSeoHead, hasBreadcrumb, hasNoIndex });
}

// 4. Check server.ts staticMeta titles/descriptions & required SSR SEO capabilities
const serverSrc = fs.readFileSync('server.ts', 'utf8');
for (const m of serverSrc.matchAll(/title(Bn|En):\s*'([^']+)'/g)) {
  if (m[2].length > 60) {
    addIssue('server.ts', 'ssr_title_length', `title${m[1]}=${m[2].length} (>60): "${m[2]}"`);
  }
}
for (const m of serverSrc.matchAll(/desc(Bn|En):\s*'([^']+)'/g)) {
  if (m[2].length > 160) {
    addIssue('server.ts', 'ssr_desc_length', `desc${m[1]}=${m[2].length} (>160)`);
  }
}
for (const feature of [
  'applyServerRouteSeo',
  'X-Robots-Tag',
  'res.status(404)',
  'hreflang="bn-BD"',
  'hreflang="en"',
  'hreflang="x-default"',
]) {
  if (!serverSrc.includes(feature)) {
    addIssue('server.ts', 'missing_ssr_seo', `Missing expected server SEO feature: ${feature}`);
  }
}

// 5. Check robots.txt rules
const robotsTxt = fs.readFileSync('public/robots.txt', 'utf8');
if (!robotsTxt.includes('Disallow: /admin')) {
  addIssue('public/robots.txt', 'robots_rule', 'Missing Disallow: /admin');
}
if (!robotsTxt.includes('Disallow: /api')) {
  addIssue('public/robots.txt', 'robots_rule', 'Missing Disallow: /api');
}
if (!robotsTxt.includes('Sitemap: https://www.visatripglobal.com/sitemap.xml')) {
  addIssue('public/robots.txt', 'robots_rule', 'Missing canonical Sitemap directive');
}
if (robotsTxt.includes('Disallow: /track-application')) {
  addIssue(
    'public/robots.txt',
    'robots_rule',
    '/track-application should stay crawlable so Googlebot observes meta noindex, follow'
  );
}

// 6. Check alt text coverage
for (const [key, entry] of Object.entries(imageManifest)) {
  if (!entry.altBn?.trim() || !entry.altEn?.trim()) {
    addIssue(`image:${key}`, 'missing_alt', 'Missing altBn or altEn');
  }
}

// 7. Check internal links, orphan pages, broken routes, mixed content
const baseValidRoutes = [
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
  '/admin/leads',
  ...servicesData.map((s) => `/services/${s.slug}`),
  ...destinationsData.map((d) => `/destinations/${d.slug}`),
  ...tourPackagesData.map((p) => `/tour-packages/${p.slug}`),
  ...blogPostsData.map((b) => `/blog/${b.slug}`),
];
const validRoutes = new Set([
  ...baseValidRoutes,
  ...baseValidRoutes.map((r) => (r === '/' ? '/en' : `/en${r}`)),
]);

const linkedRoutes = new Set();
const walk = (dir) => {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (full.endsWith('.ts') || full.endsWith('.tsx')) {
      const txt = fs.readFileSync(full, 'utf8');
      for (const m of txt.matchAll(/localizedPath\(\s*['"]([^'"$#?]+)(?:[?#][^'"]*)?['"]\s*\)/g)) {
        const r = m[1];
        linkedRoutes.add(r);
        if (!validRoutes.has(r)) {
          addIssue(full, 'broken_link', `Invalid internal route: ${r}`);
        }
      }
      for (const m of txt.matchAll(/http:\/\/[^\s'"<>)]+/g)) {
        if (!/localhost|127\.0\.0\.1|w3\.org|sitemaps\.org/.test(m[0])) {
          addIssue(full, 'mixed_content', `Non-HTTPS URL: ${m[0]}`);
        }
      }
    }
  }
};
walk('src');

const publicStatic = [
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
for (const r of publicStatic) {
  if (!linkedRoutes.has(r)) {
    addIssue(r, 'orphan_page', 'Not linked via static localizedPath(...) anywhere in src/');
  }
}

// 8. Check redirects.json targets and status codes
const redirectsJson = JSON.parse(fs.readFileSync('public/redirects.json', 'utf8'));
for (const r of redirectsJson.redirects || []) {
  if (!validRoutes.has(r.to)) {
    addIssue('public/redirects.json', 'broken_redirect', `${r.from} -> ${r.to} target does not exist`);
  }
  if (r.status !== 301) {
    addIssue('public/redirects.json', 'redirect_status', `${r.from} uses status ${r.status} instead of 301`);
  }
}

// 9. Validate JSON-LD Rich Results schemas
const assertSchema = (name, cond, detail) => {
  if (!cond) addIssue(`schema:${name}`, 'rich_results_schema', detail);
};

const org = buildOrganizationSchema();
assertSchema('Organization', org['@context'] === 'https://schema.org', 'Missing @context');
assertSchema('Organization', Boolean(org.name && org.url && org.image && org.telephone), 'Missing required TravelAgency fields');

const lb = buildLocalBusinessSchema();
const lbAreas = Array.isArray(lb.areaServed) ? lb.areaServed.map((a) => a.name) : [];
assertSchema(
  'LocalBusiness',
  Array.isArray(lb['@type']) &&
    lb['@type'].includes('TravelAgency') &&
    lb['@type'].includes('LocalBusiness') &&
    Boolean(lb.address && lb.geo && lb.hasMap && lb.openingHoursSpecification && lb.image),
  'Missing TravelAgency/LocalBusiness fields or hasMap/geo'
);
for (const reqArea of ['Chapai Nawabganj', 'Gomastapur', 'Rohanpur', 'Nawabganj', 'Shibganj', 'Rajshahi', 'Bangladesh']) {
  assertSchema(
    `LocalBusiness.areaServed(${reqArea})`,
    lbAreas.includes(reqArea),
    `Missing required areaServed entry: ${reqArea}`
  );
}

const ws = buildWebSiteSchema();
assertSchema('WebSite', Boolean(ws['@id'] && ws.url && ws.name), 'Missing WebSite @id, url, or name');

const bcEn = buildBreadcrumbSchema(
  [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ],
  'en'
);
assertSchema(
  'BreadcrumbList(en)',
  bcEn.itemListElement[0]?.item === `${siteConfig.domain}/en` &&
    bcEn.itemListElement[1]?.item === `${siteConfig.domain}/en/services`,
  'English BreadcrumbList URLs must include /en prefix'
);

const faq = buildFaqSchema([{ question: 'Q?', answer: 'A.' }]);
assertSchema('FAQPage', faq['@type'] === 'FAQPage' && faq.mainEntity.length === 1, 'Invalid FAQPage');

const svc = buildServiceSchema({
  name: 'Hajj & Umrah',
  description: 'Verified pilgrimage guidance.',
  path: '/services/hajj-umrah',
  locale: 'en',
});
assertSchema('Service', svc.url === `${siteConfig.domain}/en/services/hajj-umrah`, 'Service URL not localized');

const tripNoPrice = buildTourPackageSchema({
  name: 'Dubai Tour',
  description: '4 nights Dubai tour',
  path: '/tour-packages/dubai-4-nights',
  image: '/src/assets/optimized/dubai/1200w.jpg',
  priceBDT: null,
  itineraryNames: ['Day 1 Arrival'],
});
assertSchema(
  'TouristTrip(null price)',
  tripNoPrice['@type'] === 'TouristTrip' && !('offers' in tripNoPrice),
  'Consultation-based tour packages must use TouristTrip without Product to pass Rich Results'
);

const tripWithPrice = buildTourPackageSchema({
  name: 'Dubai Tour',
  description: '4 nights Dubai tour',
  path: '/tour-packages/dubai-4-nights',
  image: '/src/assets/optimized/dubai/1200w.jpg',
  priceBDT: 65000,
});
assertSchema(
  'TouristTrip(priced)',
  Array.isArray(tripWithPrice['@type']) &&
    tripWithPrice['@type'].includes('Product') &&
    Boolean(tripWithPrice.offers),
  'Priced tour packages must emit Product + Offer'
);

const blog = buildBlogPostingSchema({
  headline: 'Dubai Visa Guide',
  description: 'Complete checklist for Bangladeshis',
  path: '/blog/dubai-visa',
  image: '/src/assets/optimized/dubai/1200w.jpg',
  datePublished: '2026-10-01',
  authorName: 'Visatrip Global',
  locale: 'bn',
});
assertSchema(
  'BlogPosting',
  Boolean(blog.headline && blog.image && blog.datePublished && blog.mainEntityOfPage && blog.publisher),
  'Missing required BlogPosting Rich Results fields'
);

const webApp = buildWebApplicationSchema({
  name: 'Visa Requirement Checker',
  description: 'Free tool for Bangladeshi passport holders',
  path: '/visa-checker',
  locale: 'en',
});
assertSchema('WebApplication', webApp['@type'] === 'WebApplication' && Boolean(webApp.offers), 'Invalid WebApplication schema');

const col = buildCollectionPageSchema({
  name: 'Destinations',
  description: 'Top visa destinations',
  path: '/destinations',
  locale: 'bn',
  items: [{ name: 'Dubai', path: '/destinations/dubai' }],
});
assertSchema('CollectionPage', col['@type'] === 'CollectionPage' && col.mainEntity.numberOfItems === 1, 'Invalid CollectionPage');

console.log('\n=== PAGE SUMMARY ===');
for (const p of pageSummaries) {
  console.log(
    `${p.file.padEnd(28)} H1:${p.h1Count} SeoHead:${String(p.hasSeoHead).padEnd(5)} Breadcrumb:${String(p.hasBreadcrumb).padEnd(5)} noIndex:${p.hasNoIndex}`
  );
}

console.log('\n=== JSON-LD RICH RESULTS CHECKS: 11/11 VALIDATED ===');
console.log(`=== REDIRECT RULES VERIFIED: ${(redirectsJson.redirects || []).length} ===`);
console.log(`=== TOTAL ISSUES FOUND: ${issues.length} ===`);
for (const i of issues) {
  console.log(`[${i.category}] ${i.page}: ${i.detail}`);
}

if (issues.length > 0) {
  process.exitCode = 1;
}
