/**
 * Generates an accurate production bundle analysis report (raw, gzip, brotli)
 * for all emitted JS/CSS/HTML assets in dist/.
 *
 * Run after `npm run build`: node scripts/bundle-report.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const distDir = path.resolve(import.meta.dirname, '../dist');
const assetsDir = path.join(distDir, 'assets');

if (!fs.existsSync(assetsDir)) {
  console.error('dist/assets not found. Run `npm run build` first.');
  process.exit(1);
}

const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Extract entry scripts, modulepreloads, and stylesheets referenced directly by index.html (initial `/` payload)
const initialAssetPaths = new Set();
for (const match of indexHtml.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)) {
  initialAssetPaths.add(path.basename(match[1]));
}

const files = fs.readdirSync(assetsDir).sort();
const rows = files.map((file) => {
  const buf = fs.readFileSync(path.join(assetsDir, file));
  const raw = buf.length;
  const gzip = zlib.gzipSync(buf, { level: 9 }).length;
  const br = zlib.brotliCompressSync(buf, {
    params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 6 },
  }).length;
  const ext = path.extname(file);
  const initial = initialAssetPaths.has(file);
  return { file, ext, raw, gzip, br, initial };
});

const fmt = (bytes) => `${(bytes / 1024).toFixed(2)} kB`;

const initialJs = rows.filter((r) => r.initial && r.ext === '.js');
const initialCss = rows.filter((r) => r.initial && r.ext === '.css');
const lazyJs = rows.filter((r) => !r.initial && r.ext === '.js');
const otherAssets = rows.filter((r) => r.ext !== '.js' && r.ext !== '.css');

const sum = (list, key) => list.reduce((acc, r) => acc + r[key], 0);

console.log('\n=== INITIAL `/` ROUTE PAYLOAD (loaded on first visit) ===');
for (const r of [...initialCss, ...initialJs].sort((a, b) => b.gzip - a.gzip)) {
  console.log(
    `${r.file.padEnd(44)} raw: ${fmt(r.raw).padStart(10)} | gzip: ${fmt(r.gzip).padStart(9)} | br: ${fmt(r.br).padStart(9)}`
  );
}
console.log(
  `TOTAL INITIAL JS (${initialJs.length} chunks):`.padEnd(44) +
    ` raw: ${fmt(sum(initialJs, 'raw')).padStart(10)} | gzip: ${fmt(sum(initialJs, 'gzip')).padStart(9)} | br: ${fmt(sum(initialJs, 'br')).padStart(9)}`
);
console.log(
  `TOTAL INITIAL CSS (${initialCss.length} file):`.padEnd(44) +
    ` raw: ${fmt(sum(initialCss, 'raw')).padStart(10)} | gzip: ${fmt(sum(initialCss, 'gzip')).padStart(9)} | br: ${fmt(sum(initialCss, 'br')).padStart(9)}`
);

console.log('\n=== LAZY-LOADED ROUTE & COMPONENT CHUNKS (top 15 by gzip) ===');
for (const r of lazyJs.sort((a, b) => b.gzip - a.gzip).slice(0, 15)) {
  console.log(
    `${r.file.padEnd(44)} raw: ${fmt(r.raw).padStart(10)} | gzip: ${fmt(r.gzip).padStart(9)} | br: ${fmt(r.br).padStart(9)}`
  );
}
console.log(
  `TOTAL LAZY JS (${lazyJs.length} chunks):`.padEnd(44) +
    ` raw: ${fmt(sum(lazyJs, 'raw')).padStart(10)} | gzip: ${fmt(sum(lazyJs, 'gzip')).padStart(9)} | br: ${fmt(sum(lazyJs, 'br')).padStart(9)}`
);

console.log(`\n=== OTHER EMITTED ASSETS IN dist/assets (${otherAssets.length}) ===`);
for (const r of otherAssets) {
  console.log(`${r.file.padEnd(44)} raw: ${fmt(r.raw).padStart(10)}`);
}
