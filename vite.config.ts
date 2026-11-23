import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';

const rootDir = import.meta.dirname;

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      // Injects art-directed LCP hero AVIF preloads AFTER Vite HTML asset rewriting
      // so preload URLs match <SafeImage> srcSet character-for-character (zero double fetch).
      {
        name: 'inject-hero-lcp-preload',
        transformIndexHtml: {
          order: 'post',
          handler(html) {
            const preloadTags = [
              '<link rel="preload" as="image" type="image/avif" imagesrcset="/src/assets/optimized/hero/mobile-480w.avif 480w, /src/assets/optimized/hero/mobile-720w.avif 720w" imagesizes="100vw" media="(max-width: 767px)" fetchpriority="high" />',
              '<link rel="preload" as="image" type="image/avif" imagesrcset="/src/assets/optimized/hero/480w.avif 480w, /src/assets/optimized/hero/960w.avif 960w, /src/assets/optimized/hero/1376w.avif 1376w" imagesizes="100vw" media="(min-width: 768px)" fetchpriority="high" />',
            ].join('\n    ');
            return html.replace('</head>', `    ${preloadTags}\n  </head>`);
          },
        },
      },
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/optimized/..." resolve cleanly in production builds.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(rootDir, 'dist');
          const srcAssets = path.resolve(rootDir, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, { recursive: true, force: true });
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(rootDir, '.'),
      },
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      sourcemap: false,
      reportCompressedSize: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react/') ||
              id.includes('node_modules/scheduler')
            ) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/react-router')) {
              return 'vendor-router';
            }
            if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('/src/data/catalogSummary')) {
              return 'data-catalog-summary';
            }
            return undefined;
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
