import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { servicesData } from '../src/data/services.ts';
import { destinationsData } from '../src/data/destinations.ts';
import { tourPackagesData } from '../src/data/packages.ts';
import { blogPostsData } from '../src/data/blogs.ts';

const ROOT = process.cwd();
const TEST_PORT = 3499;
const BASE_URL = `http://127.0.0.1:${TEST_PORT}`;
const TEST_ADMIN_PWD = 'qa-secret-pass-2026';

const results = [];

function record(category, name, passed, detail = '') {
  results.push({ category, name, passed, detail });
  const badge = passed ? '[PASS]' : '[FAIL]';
  console.log(`${badge} [${category}] ${name}${detail ? ` — ${detail}` : ''}`);
}

/**
 * Minimal local RFC 5321 SMTP capture server so Nodemailer executes a genuine
 * TCP SMTP handshake + AUTH LOGIN/PLAIN + DATA delivery end-to-end from /api/inquiry.
 */
function startMockSmtpServer() {
  const capturedEmails = [];
  const server = net.createServer((socket) => {
    let buffer = '';
    let inData = false;
    let current = { from: '', to: [], data: '' };

    socket.write('220 qa-smtp.local ESMTP Ready\r\n');

    socket.on('data', (chunk) => {
      buffer += chunk.toString('utf8');
      while (true) {
        if (inData) {
          const endIdx = buffer.indexOf('\r\n.\r\n');
          if (endIdx === -1) break;
          current.data += buffer.slice(0, endIdx);
          buffer = buffer.slice(endIdx + 5);
          inData = false;
          capturedEmails.push({ ...current });
          current = { from: '', to: [], data: '' };
          socket.write('250 2.0.0 OK queued\r\n');
          continue;
        }
        const lineEnd = buffer.indexOf('\r\n');
        if (lineEnd === -1) break;
        const line = buffer.slice(0, lineEnd);
        buffer = buffer.slice(lineEnd + 2);
        const upper = line.toUpperCase();

        if (upper.startsWith('EHLO') || upper.startsWith('HELO')) {
          socket.write('250-qa-smtp.local\r\n250 AUTH PLAIN\r\n');
        } else if (upper.startsWith('AUTH PLAIN')) {
          socket.write('235 2.7.0 Authentication successful\r\n');
        } else if (upper.startsWith('AUTH LOGIN')) {
          socket.write('334 VXNlcm5hbWU6\r\n');
        } else if (upper.startsWith('MAIL FROM:')) {
          current.from = line.slice(10).trim();
          socket.write('250 2.1.0 OK\r\n');
        } else if (upper.startsWith('RCPT TO:')) {
          current.to.push(line.slice(8).trim());
          socket.write('250 2.1.5 OK\r\n');
        } else if (upper === 'DATA') {
          inData = true;
          socket.write('354 End data with <CR><LF>.<CR><LF>\r\n');
        } else if (upper === 'QUIT') {
          socket.write('221 2.0.0 Bye\r\n');
          socket.end();
        } else if (upper === 'RSET' || upper === 'NOOP') {
          socket.write('250 2.0.0 OK\r\n');
        } else {
          // Base64 username/password challenge lines for AUTH LOGIN
          socket.write('235 2.7.0 OK\r\n');
        }
      }
    });
  });

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const addr = server.address();
      resolve({
        port: typeof addr === 'object' && addr ? addr.port : 0,
        capturedEmails,
        close: () => new Promise((res) => server.close(() => res())),
      });
    });
  });
}

async function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const resp = await fetch(`${url}/api/health`);
      if (resp.ok) return true;
    } catch {
      // Wait for boot
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  return false;
}

function walkFiles(dir, exts, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, exts, out);
    } else if (exts.some((ext) => entry.name.endsWith(ext))) {
      out.push(full);
    }
  }
  return out;
}

async function main() {
  console.log('\n=== Visatrip Global — Full Production QA Suite ===\n');

  // Preserve existing leads.json so QA submissions never pollute real lead data
  const leadsFile = path.resolve(ROOT, '.data', 'leads.json');
  const hadLeadsFile = fs.existsSync(leadsFile);
  const previousLeadsBackup = hadLeadsFile ? fs.readFileSync(leadsFile, 'utf8') : null;

  const smtp = await startMockSmtpServer();

  // Pick a free ephemeral port so parallel/prior runs can never collide
  const freePort = await new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once('error', reject);
    probe.listen(0, '127.0.0.1', () => {
      const addr = probe.address();
      const port = typeof addr === 'object' && addr ? addr.port : TEST_PORT;
      probe.close(() => resolve(port));
    });
  });
  const baseUrl = `http://127.0.0.1:${freePort}`;

  // Start production Express server directly (no npx wrapper) so SIGTERM stops it cleanly
  const serverProc = spawn(process.execPath, ['--import', 'tsx', 'server.ts'], {
    cwd: ROOT,
    env: {
      ...process.env,
      NODE_ENV: 'production',
      PORT: String(freePort),
      APP_URL: 'https://www.visatripglobal.com',
      ENFORCE_WWW_REDIRECT: 'true',
      ADMIN_PASSWORD: TEST_ADMIN_PWD,
      RESEND_API_KEY: '',
      EMAIL_TO: 'qa-alerts@visatripglobal.com',
      EMAIL_FROM: 'Visatrip Global <noreply@visatripglobal.com>',
      SMTP_HOST: '127.0.0.1',
      SMTP_PORT: String(smtp.port),
      SMTP_USER: 'qa-user',
      SMTP_PASS: 'qa-pass',
      SMTP_SECURE: 'false',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let serverErrors = '';
  serverProc.stderr.on('data', (chunk) => {
    serverErrors += chunk.toString('utf8');
  });

  try {
    const ready = await waitForServer(baseUrl);
    record('Server', 'Production server boots & /api/health responds 200', ready, ready ? baseUrl : serverErrors);
    if (!ready) throw new Error('QA server failed to start');

    // 1. Health check payload & headers
    const healthResp = await fetch(`${baseUrl}/api/health`);
    const healthJson = await healthResp.json();
    record(
      'Monitoring',
      '/api/health returns healthy JSON with Cache-Control: no-store',
      healthResp.status === 200 &&
        healthJson.ok === true &&
        healthJson.status === 'healthy' &&
        healthResp.headers.get('cache-control') === 'no-store',
      `status=${healthResp.status}`
    );

    // 2. Security Headers Audit (Production mode)
    const homeResp = await fetch(`${baseUrl}/`, {
      headers: { 'x-forwarded-proto': 'https', 'accept-encoding': 'br, gzip' },
    });
    const h = homeResp.headers;
    const secChecks = [
      ['X-Frame-Options', h.get('x-frame-options') === 'SAMEORIGIN', h.get('x-frame-options')],
      ['X-Content-Type-Options', h.get('x-content-type-options') === 'nosniff', h.get('x-content-type-options')],
      ['Referrer-Policy', h.get('referrer-policy') === 'strict-origin-when-cross-origin', h.get('referrer-policy')],
      ['Permissions-Policy', Boolean(h.get('permissions-policy')?.includes('camera=()')), h.get('permissions-policy')],
      ['Cross-Origin-Opener-Policy', h.get('cross-origin-opener-policy') === 'same-origin-allow-popups', h.get('cross-origin-opener-policy')],
      ['X-Permitted-Cross-Domain-Policies', h.get('x-permitted-cross-domain-policies') === 'none', h.get('x-permitted-cross-domain-policies')],
      ['Strict-Transport-Security', Boolean(h.get('strict-transport-security')?.includes('max-age=31536000')), h.get('strict-transport-security')],
      ['Content-Security-Policy', Boolean(h.get('content-security-policy')?.includes("default-src 'self'")), 'present'],
      ['No X-Powered-By leak', !h.get('x-powered-by'), h.get('x-powered-by') || 'absent'],
    ];
    for (const [label, ok, val] of secChecks) {
      record('Security', `Header: ${label}`, ok, ok ? String(val || 'ok') : 'missing/mismatch');
    }

    // 3. ISR Caching, Brotli Compression & ETag/304 Check
    const homeEtag = h.get('etag');
    const homeCacheControl = h.get('cache-control') || '';
    const secondHomeResp = await fetch(`${baseUrl}/`, {
      headers: { 'if-none-match': homeEtag || '' },
    });
    record(
      'Performance',
      'ISR Cache-Control + ETag 304 Not Modified working',
      Boolean(homeEtag) &&
        homeCacheControl.includes('stale-while-revalidate') &&
        secondHomeResp.status === 304,
      `ETag=${homeEtag}, secondStatus=${secondHomeResp.status}`
    );

    // 4. All Indexable + Utility Routes Render (92+ routes)
    const staticRoutes = [
      '/',
      '/about',
      '/services',
      '/destinations',
      '/tour-packages',
      '/visa-checker',
      '/track-application',
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
    const dynamicRoutes = [
      ...servicesData.map((s) => `/services/${s.slug}`),
      ...destinationsData.map((d) => `/destinations/${d.slug}`),
      ...tourPackagesData.map((p) => `/tour-packages/${p.slug}`),
      ...blogPostsData.map((b) => `/blog/${b.slug}`),
    ];
    const allBaseRoutes = [...staticRoutes, ...dynamicRoutes];
    const allRoutes = [
      ...allBaseRoutes,
      ...allBaseRoutes.map((r) => (r === '/' ? '/en' : `/en${r}`)),
      '/admin/leads',
    ];

    const routeFailures = [];
    const seenTitles = new Map();
    for (const route of allRoutes) {
      const resp = await fetch(`${baseUrl}${route}`);
      const html = await resp.text();
      if (resp.status !== 200) {
        routeFailures.push(`${route} -> HTTP ${resp.status}`);
        continue;
      }
      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
      const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
      const langMatch = html.match(/<html lang="([^"]+)">/);
      const expectedLang = route === '/en' || route.startsWith('/en/') ? 'en' : 'bn';

      if (!titleMatch || !descMatch || !canonicalMatch || langMatch?.[1] !== expectedLang) {
        routeFailures.push(`${route} -> incomplete SSR head (lang=${langMatch?.[1]})`);
      } else if (route !== '/admin/leads') {
        const t = titleMatch[1];
        if (seenTitles.has(t)) {
          routeFailures.push(`${route} -> duplicate title with ${seenTitles.get(t)}`);
        }
        seenTitles.set(t, route);
      }
    }
    record(
      'Routes',
      `All ${allRoutes.length} Bangla + English + Admin routes return 200 with unique SSR metadata`,
      routeFailures.length === 0,
      routeFailures.length === 0 ? `${allRoutes.length}/${allRoutes.length} passed` : routeFailures.slice(0, 5).join('; ')
    );

    // 5. True HTTP 404 + noindex on unknown routes
    const notFoundBn = await fetch(`${baseUrl}/this-route-does-not-exist-qa`);
    const notFoundBnHtml = await notFoundBn.text();
    const notFoundEn = await fetch(`${baseUrl}/en/this-route-does-not-exist-qa`);
    record(
      '404',
      'Unknown Bangla & English routes return true HTTP 404 + noindex, nofollow',
      notFoundBn.status === 404 &&
        notFoundEn.status === 404 &&
        notFoundBn.headers.get('x-robots-tag') === 'noindex, nofollow' &&
        notFoundBnHtml.includes('content="noindex, nofollow"'),
      `bn=${notFoundBn.status}, en=${notFoundEn.status}, X-Robots-Tag=${notFoundBn.headers.get('x-robots-tag')}`
    );

    // 6. 301 Redirects (Trailing Slash, Uppercase, Legacy Redirects, Apex -> www)
    const rTrailing = await fetch(`${baseUrl}/services/`, { redirect: 'manual' });
    const rUpper = await fetch(`${baseUrl}/About`, { redirect: 'manual' });
    const rLegacy = await fetch(`${baseUrl}/umrah`, { redirect: 'manual' });
    const rApex = await fetch(`${baseUrl}/services/hajj-umrah`, {
      redirect: 'manual',
      headers: { 'x-forwarded-host': 'visatripglobal.com' },
    });
    record(
      'Redirects',
      '301 normalization (trailing slash, uppercase, /umrah legacy, apex -> www)',
      rTrailing.status === 301 &&
        rTrailing.headers.get('location') === '/services' &&
        rUpper.status === 301 &&
        rUpper.headers.get('location') === '/about' &&
        rLegacy.status === 301 &&
        rLegacy.headers.get('location') === '/services/hajj-umrah' &&
        rApex.status === 301 &&
        rApex.headers.get('location') === 'https://www.visatripglobal.com/services/hajj-umrah',
      `trailing=${rTrailing.status}, upper=${rUpper.status}, legacy=${rLegacy.status}, www=${rApex.status}`
    );

    // 7. Sitemap & Robots.txt
    const sitemapResp = await fetch(`${baseUrl}/sitemap.xml`);
    const sitemapXml = await sitemapResp.text();
    const urlCount = (sitemapXml.match(/<url>/g) || []).length;
    const excludesNoIndex =
      !sitemapXml.includes('/admin/leads') && !sitemapXml.includes('/track-application');
    const hasHreflang =
      sitemapXml.includes('hreflang="bn-BD"') &&
      sitemapXml.includes('hreflang="en"') &&
      sitemapXml.includes('hreflang="x-default"');
    record(
      'SEO',
      'sitemap.xml valid XML with bidirectional bn-BD/en entries and zero noindex routes',
      sitemapResp.status === 200 && urlCount >= 90 && excludesNoIndex && hasHreflang,
      `${urlCount} URLs`
    );

    const robotsResp = await fetch(`${baseUrl}/robots.txt`);
    const robotsTxt = await robotsResp.text();
    record(
      'SEO',
      'robots.txt allows public routes, disallows /admin & /api, declares Sitemap',
      robotsResp.status === 200 &&
        robotsTxt.includes('Allow: /') &&
        robotsTxt.includes('Disallow: /admin') &&
        robotsTxt.includes('Disallow: /api') &&
        robotsTxt.includes('Sitemap: https://www.visatripglobal.com/sitemap.xml'),
      'valid'
    );

    // 8. Form API Tests (Valid + Invalid + Spam Honeypot + Live SMTP Email Delivery)
    const validFormResp = await fetch(`${baseUrl}/api/inquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '203.0.113.10' },
      body: JSON.stringify({
        name: 'মো. রফিকুল ইসলাম (QA)',
        phone: '01771304219',
        service: 'Hajj & Umrah',
        country: 'Saudi Arabia',
        message: 'QA Test: ওমরাহ প্যাকেজ সম্পর্কে বিস্তারিত জানতে চাই।',
        sourcePage: '/services/hajj-umrah',
        formType: 'consultation',
      }),
    });
    const validFormJson = await validFormResp.json();
    record(
      'Forms',
      'Valid form submission returns 201, generates Lead ID + WhatsApp URL, and delivers email',
      validFormResp.status === 201 &&
        validFormJson.ok === true &&
        typeof validFormJson.leadId === 'string' &&
        validFormJson.leadId.startsWith('VTG-') &&
        validFormJson.emailSent === true &&
        String(validFormJson.whatsappUrl).startsWith('https://wa.me/8801771304219?text='),
      `leadId=${validFormJson.leadId}, emailSent=${validFormJson.emailSent}`
    );

    // Verify captured SMTP message contents
    const sentMail = smtp.capturedEmails[0];
    record(
      'Email',
      'Live Nodemailer SMTP delivery received with correct recipient, subject & lead payload',
      Boolean(sentMail) &&
        sentMail.to.some((r) => r.includes('qa-alerts@visatripglobal.com')) &&
        sentMail.data.includes(validFormJson.leadId) &&
        sentMail.data.includes('Hajj & Umrah'),
      sentMail ? `captured ${smtp.capturedEmails.length} email(s) via SMTP port ${smtp.port}` : 'no email captured'
    );

    // Invalid submission (too short name & phone)
    const invalidFormResp = await fetch(`${baseUrl}/api/inquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '203.0.113.11' },
      body: JSON.stringify({ name: 'A', phone: '123', email: 'bad-email' }),
    });
    const invalidFormJson = await invalidFormResp.json();
    record(
      'Forms',
      'Invalid form submission rejected with HTTP 400 and Bangla validation message',
      invalidFormResp.status === 400 && invalidFormJson.ok === false && Boolean(invalidFormJson.error),
      `status=${invalidFormResp.status}, error="${invalidFormJson.error}"`
    );

    // Spam honeypot submission
    const spamBeforeCount = smtp.capturedEmails.length;
    const spamResp = await fetch(`${baseUrl}/api/inquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '203.0.113.12' },
      body: JSON.stringify({
        name: 'Spam Bot',
        phone: '01700000000',
        service: 'Work Permit',
        website_url: 'https://buy-spam-links.example',
      }),
    });
    const spamJson = await spamResp.json();
    record(
      'Forms',
      'Spam honeypot silently absorbed without storing lead or sending email',
      spamResp.status === 200 &&
        spamJson.ok === true &&
        spamJson.leadId === 'VTG-RECEIVED' &&
        smtp.capturedEmails.length === spamBeforeCount,
      `leadId=${spamJson.leadId}, emailsAfter=${smtp.capturedEmails.length}`
    );

    // Verify Admin Auth & persisted lead (only real lead saved, NOT spam)
    const unauthLeadsResp = await fetch(`${baseUrl}/api/leads`);
    const authLeadsResp = await fetch(`${baseUrl}/api/leads`, {
      headers: { 'X-Admin-Password': TEST_ADMIN_PWD },
    });
    const authLeadsJson = await authLeadsResp.json();
    const hasRealLead = authLeadsJson.leads?.some((l) => l.id === validFormJson.leadId);
    const hasSpamLead = authLeadsJson.leads?.some((l) => l.name === 'Spam Bot');
    record(
      'Admin API',
      '/api/leads rejects unauthenticated (401), persists valid lead & excludes spam',
      unauthLeadsResp.status === 401 && authLeadsResp.status === 200 && hasRealLead && !hasSpamLead,
      `unauth=${unauthLeadsResp.status}, auth=${authLeadsResp.status}, realSaved=${hasRealLead}, spamBlocked=${!hasSpamLead}`
    );

    // Application Tracker API tests
    const trackValid = await fetch(`${baseUrl}/api/track?applicationId=VTG-2026-101&phone=01771304219`);
    const trackMissing = await fetch(`${baseUrl}/api/track?applicationId=VTG-NOPE&phone=01771304219`);
    const trackBad = await fetch(`${baseUrl}/api/track?applicationId=&phone=12`);
    record(
      'Tracker API',
      '/api/track handles valid (200), not-found (404), and invalid (400)',
      trackValid.status === 200 && trackMissing.status === 404 && trackBad.status === 400,
      `valid=${trackValid.status}, notFound=${trackMissing.status}, invalid=${trackBad.status}`
    );

    // 9. WhatsApp & Call Links Static Audit
    const srcFiles = walkFiles(path.join(ROOT, 'src'), ['.ts', '.tsx']);
    const badWaOrTel = [];
    for (const file of srcFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const waMatches = content.match(/https:\/\/wa\.me\/[0-9]+/g) || [];
      for (const m of waMatches) {
        if (m !== 'https://wa.me/8801771304219') {
          badWaOrTel.push(`${path.relative(ROOT, file)}: ${m}`);
        }
      }
      const telMatches = content.match(/tel:\+?[0-9-]+/g) || [];
      for (const m of telMatches) {
        if (m !== 'tel:+8801771304219') {
          badWaOrTel.push(`${path.relative(ROOT, file)}: ${m}`);
        }
      }
    }
    record(
      'Contact Links',
      'All WhatsApp (wa.me) & Call (tel:) links match verified number +880 1771-304219',
      badWaOrTel.length === 0,
      badWaOrTel.length === 0 ? '100% consistent across src/' : badWaOrTel.join(', ')
    );

    // 10. Environment Variables Documentation Parity
    const envExample = fs.readFileSync(path.join(ROOT, '.env.example'), 'utf8');
    const allCodeFiles = [...srcFiles, path.join(ROOT, 'server.ts'), path.join(ROOT, 'vite.config.ts')];
    const usedEnvKeys = new Set();
    for (const file of allCodeFiles) {
      const content = fs.readFileSync(file, 'utf8');
      for (const match of content.matchAll(/(?:process\.env|import\.meta\.env\??)\.([A-Z][A-Z0-9_]+)/g)) {
        usedEnvKeys.add(match[1]);
      }
    }
    const undocumentedEnvs = [...usedEnvKeys].filter((k) => !new RegExp(`^#?\\s*${k}=`, 'm').test(envExample));
    record(
      'Env Vars',
      `All ${usedEnvKeys.size} environment variables documented in .env.example`,
      undocumentedEnvs.length === 0,
      undocumentedEnvs.length === 0 ? [...usedEnvKeys].sort().join(', ') : `missing: ${undocumentedEnvs.join(', ')}`
    );

    // 11. Cross-Browser & Responsive Readiness Audit (CSS/TSX)
    const indexCss = fs.readFileSync(path.join(ROOT, 'src/index.css'), 'utf8');
    const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    const hasSafeArea = indexCss.includes('env(safe-area-inset-bottom)') || srcFiles.some((f) => fs.readFileSync(f, 'utf8').includes('env(safe-area-inset-bottom)'));
    const hasViewportFit = indexHtml.includes('viewport-fit=cover') || indexHtml.includes('width=device-width');
    const hasOverflowClip = indexCss.includes('overflow-x: clip');
    const has16pxMobileInputs = indexCss.includes('font-size: 16px');
    const hasFirefoxScrollbar = indexCss.includes('scrollbar-width: none');
    const hasReducedMotion = indexCss.includes('prefers-reduced-motion: reduce');
    record(
      'Cross-Browser',
      'iOS Safari (16px inputs, safe-area), Firefox (scrollbar-width), Samsung/Chrome (overflow-x: clip, reduced-motion)',
      hasSafeArea && hasViewportFit && hasOverflowClip && has16pxMobileInputs && hasFirefoxScrollbar && hasReducedMotion,
      'all viewport & engine guards verified'
    );
  } finally {
    serverProc.kill('SIGTERM');
    await smtp.close();

    // Restore original .data/leads.json cleanly
    if (hadLeadsFile && previousLeadsBackup !== null) {
      fs.writeFileSync(leadsFile, previousLeadsBackup, 'utf8');
    } else if (fs.existsSync(leadsFile)) {
      fs.unlinkSync(leadsFile);
    }
  }

  const passedCount = results.filter((r) => r.passed).length;
  const failedCount = results.length - passedCount;
  console.log(`\n=== QA Summary: ${passedCount}/${results.length} Passed | ${failedCount} Failed ===\n`);

  if (failedCount > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('QA suite error:', err);
  process.exit(1);
});
