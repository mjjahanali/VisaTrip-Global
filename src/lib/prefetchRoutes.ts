/**
 * Shared route chunk loaders + selective network-aware prefetching.
 *
 * Strategy:
 * - Only prefetches the 4 highest-intent conversion routes on idle:
 *   1. /services (ServicesOverviewPage)
 *   2. /services/:slug (ServiceDetailPage)
 *   3. /visa-checker (VisaCheckerPage)
 *   4. /contact (ContactPage)
 * - Strictly respects `navigator.connection.saveData` and skips prefetch on
 *   `slow-2g` / `2g` / low-bandwidth mobile connections.
 * - Supports hover/focus intent prefetching for Navbar & Hero links.
 */

export const routeLoaders = {
  about: () => import('../pages/AboutPage'),
  services: () => import('../pages/ServicesOverviewPage'),
  serviceDetail: () => import('../pages/ServiceDetailPage'),
  destinations: () => import('../pages/DestinationsPage'),
  destinationDetail: () => import('../pages/DestinationDetailPage'),
  packages: () => import('../pages/TourPackagesPage'),
  packageDetail: () => import('../pages/TourPackageDetailPage'),
  visaChecker: () => import('../pages/VisaCheckerPage'),
  trackApplication: () => import('../pages/TrackApplicationPage'),
  successStories: () => import('../pages/SuccessStoriesPage'),
  gallery: () => import('../pages/GalleryPage'),
  blog: () => import('../pages/BlogListPage'),
  blogDetail: () => import('../pages/BlogDetailPage'),
  faq: () => import('../pages/FaqPage'),
  contact: () => import('../pages/ContactPage'),
  serviceAreas: () => import('../pages/ServiceAreasPage'),
  licenses: () => import('../pages/LicensesPage'),
  legal: () => import('../pages/LegalPage'),
  admin: () => import('../pages/AdminLeadsPage'),
  notFound: () => import('../pages/NotFoundPage'),
} as const;

type RouteKey = keyof typeof routeLoaders;

const prefetchedKeys = new Set<RouteKey>();

interface NavigatorWithConnection extends Navigator {
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
    downlink?: number;
  };
}

function canPrefetchOnCurrentNetwork(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const conn = (navigator as NavigatorWithConnection).connection;
  if (!conn) return true;
  if (conn.saveData) return false;
  if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') return false;
  if (typeof conn.downlink === 'number' && conn.downlink < 1.2) return false;
  return true;
}

export function prefetchRouteKey(key: RouteKey): void {
  if (prefetchedKeys.has(key)) return;
  if (!canPrefetchOnCurrentNetwork()) return;
  prefetchedKeys.add(key);
  void routeLoaders[key]().catch(() => {
    prefetchedKeys.delete(key);
  });
}

/**
 * Prefetches a single route chunk matching a normalized pathname (e.g. on link hover/focus).
 */
export function prefetchRouteByPath(pathname: string): void {
  const clean = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  if (clean === '/services') return prefetchRouteKey('services');
  if (clean.startsWith('/services/')) return prefetchRouteKey('serviceDetail');
  if (clean === '/destinations') return prefetchRouteKey('destinations');
  if (clean.startsWith('/destinations/')) return prefetchRouteKey('destinationDetail');
  if (clean === '/tour-packages') return prefetchRouteKey('packages');
  if (clean.startsWith('/tour-packages/')) return prefetchRouteKey('packageDetail');
  if (clean === '/visa-checker') return prefetchRouteKey('visaChecker');
  if (clean === '/contact') return prefetchRouteKey('contact');
  if (clean === '/service-areas') return prefetchRouteKey('serviceAreas');
  if (clean === '/about') return prefetchRouteKey('about');
  if (clean === '/blog') return prefetchRouteKey('blog');
  if (clean.startsWith('/blog/')) return prefetchRouteKey('blogDetail');
}

let idlePrefetchScheduled = false;

/**
 * Schedules selective idle prefetching for ONLY the 4 highest-conversion routes
 * after window `load` + `requestIdleCallback`, keeping initial LCP/TBT untouched.
 */
export function scheduleKeyRoutesPrefetch(): void {
  if (typeof window === 'undefined' || idlePrefetchScheduled) return;
  idlePrefetchScheduled = true;

  const run = () => {
    if (!canPrefetchOnCurrentNetwork()) return;
    // Key conversion routes ONLY (never prefetch admin, gallery, legal, or low-frequency routes)
    const keyRoutes: RouteKey[] = ['services', 'serviceDetail', 'visaChecker', 'contact'];
    keyRoutes.forEach((key, index) => {
      window.setTimeout(() => {
        prefetchRouteKey(key);
      }, index * 350);
    });
  };

  const scheduleWhenIdle = () => {
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    if (typeof win.requestIdleCallback === 'function') {
      win.requestIdleCallback(run, { timeout: 4000 });
    } else {
      window.setTimeout(run, 2500);
    }
  };

  if (document.readyState === 'complete') {
    scheduleWhenIdle();
  } else {
    window.addEventListener('load', scheduleWhenIdle, { once: true });
  }
}
