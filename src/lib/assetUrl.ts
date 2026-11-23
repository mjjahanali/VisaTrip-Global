const RAW_BASE = import.meta.env?.BASE_URL || '/';

/** Always starts and ends with "/" (e.g. "/" or "/visatrip-global/"). */
export const APP_BASE_URL = RAW_BASE.endsWith('/') ? RAW_BASE : `${RAW_BASE}/`;

/** React Router basename (undefined when hosted at domain root "/"). */
export function getRouterBasename(): string | undefined {
  return APP_BASE_URL === '/' ? undefined : APP_BASE_URL.slice(0, -1);
}

/** Prefixes root-relative static asset paths with Vite BASE_URL for GitHub Pages subpaths. */
export function withBasePath(assetPath: string): string {
  if (!assetPath) return assetPath;
  if (
    assetPath.startsWith('http://') ||
    assetPath.startsWith('https://') ||
    assetPath.startsWith('data:') ||
    assetPath.startsWith('blob:') ||
    assetPath.startsWith('mailto:') ||
    assetPath.startsWith('tel:') ||
    assetPath.startsWith('#')
  ) {
    return assetPath;
  }
  if (APP_BASE_URL === '/') {
    return assetPath;
  }
  if (assetPath.startsWith(APP_BASE_URL)) {
    return assetPath;
  }
  const clean = assetPath.replace(/^\/+/, '');
  return `${APP_BASE_URL}${clean}`;
}

/** Rewrites every candidate URL inside an HTML srcSet string with Vite BASE_URL. */
export function withBaseSrcSet(srcSet?: string): string | undefined {
  if (!srcSet) return srcSet;
  if (APP_BASE_URL === '/') return srcSet;
  return srcSet
    .split(',')
    .map((entry) => {
      const trimmed = entry.trim();
      if (!trimmed) return '';
      const spaceIdx = trimmed.search(/\s/);
      if (spaceIdx === -1) return withBasePath(trimmed);
      const url = trimmed.slice(0, spaceIdx);
      const descriptor = trimmed.slice(spaceIdx);
      return `${withBasePath(url)}${descriptor}`;
    })
    .filter(Boolean)
    .join(', ');
}

/** Strips Vite BASE_URL from window.location.pathname so route checks work on subpath deploys. */
export function stripBasePath(pathname: string): string {
  if (!pathname) return '/';
  const baseNoTrail = getRouterBasename();
  if (!baseNoTrail) return pathname;
  if (pathname === baseNoTrail) return '/';
  if (pathname.startsWith(`${baseNoTrail}/`)) {
    return pathname.slice(baseNoTrail.length) || '/';
  }
  return pathname;
}

const API_BASE = (import.meta.env?.VITE_API_BASE_URL || '').replace(/\/+$/, '');
const FORM_ENDPOINT = (import.meta.env?.VITE_FORM_ENDPOINT || '').trim();

/** Resolves API endpoint against optional external backend URL (VITE_API_BASE_URL). */
export function getApiUrl(apiPath: string): string {
  const normalized = apiPath.startsWith('/') ? apiPath : `/${apiPath}`;
  return API_BASE ? `${API_BASE}${normalized}` : normalized;
}

/** True on static-only hosts (e.g. GitHub Pages) when no external Express API is configured. */
export function isStaticSiteMode(): boolean {
  return import.meta.env?.VITE_STATIC_SITE === 'true' && !API_BASE;
}

/** Optional third-party static form endpoint (e.g. Formspree / Web3Forms). */
export function getStaticFormEndpoint(): string {
  return FORM_ENDPOINT;
}
