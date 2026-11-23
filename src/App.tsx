import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LazyMotion, domAnimation, MotionConfig } from 'motion/react';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { Layout } from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PageRouteSkeleton } from './components/Skeletons';
import { HomePage } from './pages/HomePage';
import { routeLoaders } from './lib/prefetchRoutes';
import { getRouterBasename } from './lib/assetUrl';

// Route-level code splitting (shared with selective key-route prefetcher)
const AboutPage = lazy(() => routeLoaders.about().then((m) => ({ default: m.AboutPage })));
const ServicesOverviewPage = lazy(() =>
  routeLoaders.services().then((m) => ({ default: m.ServicesOverviewPage }))
);
const ServiceDetailPage = lazy(() =>
  routeLoaders.serviceDetail().then((m) => ({ default: m.ServiceDetailPage }))
);
const DestinationsPage = lazy(() =>
  routeLoaders.destinations().then((m) => ({ default: m.DestinationsPage }))
);
const DestinationDetailPage = lazy(() =>
  routeLoaders.destinationDetail().then((m) => ({ default: m.DestinationDetailPage }))
);
const TourPackagesPage = lazy(() =>
  routeLoaders.packages().then((m) => ({ default: m.TourPackagesPage }))
);
const TourPackageDetailPage = lazy(() =>
  routeLoaders.packageDetail().then((m) => ({ default: m.TourPackageDetailPage }))
);
const SuccessStoriesPage = lazy(() =>
  routeLoaders.successStories().then((m) => ({ default: m.SuccessStoriesPage }))
);
const GalleryPage = lazy(() =>
  routeLoaders.gallery().then((m) => ({ default: m.GalleryPage }))
);
const BlogListPage = lazy(() =>
  routeLoaders.blog().then((m) => ({ default: m.BlogListPage }))
);
const BlogDetailPage = lazy(() =>
  routeLoaders.blogDetail().then((m) => ({ default: m.BlogDetailPage }))
);
const FaqPage = lazy(() => routeLoaders.faq().then((m) => ({ default: m.FaqPage })));
const ContactPage = lazy(() =>
  routeLoaders.contact().then((m) => ({ default: m.ContactPage }))
);
const ServiceAreasPage = lazy(() =>
  routeLoaders.serviceAreas().then((m) => ({ default: m.ServiceAreasPage }))
);
const LicensesPage = lazy(() =>
  routeLoaders.licenses().then((m) => ({ default: m.LicensesPage }))
);
const LegalPage = lazy(() => routeLoaders.legal().then((m) => ({ default: m.LegalPage })));
const AdminLeadsPage = lazy(() =>
  routeLoaders.admin().then((m) => ({ default: m.AdminLeadsPage }))
);
const NotFoundPage = lazy(() =>
  routeLoaders.notFound().then((m) => ({ default: m.NotFoundPage }))
);

function AppRoutes({ prefix = '' }: { prefix?: string }) {
  return (
    <>
      <Route path={`${prefix}/`} element={<HomePage />} />
      <Route path={`${prefix}/about`} element={<AboutPage />} />
      <Route path={`${prefix}/services`} element={<ServicesOverviewPage />} />
      <Route path={`${prefix}/services/:slug`} element={<ServiceDetailPage />} />
      <Route path={`${prefix}/destinations`} element={<DestinationsPage />} />
      <Route path={`${prefix}/destinations/:country`} element={<DestinationDetailPage />} />
      <Route path={`${prefix}/tour-packages`} element={<TourPackagesPage />} />
      <Route path={`${prefix}/tour-packages/:slug`} element={<TourPackageDetailPage />} />
      <Route path={`${prefix}/success-stories`} element={<SuccessStoriesPage />} />
      <Route path={`${prefix}/gallery`} element={<GalleryPage />} />
      <Route path={`${prefix}/blog`} element={<BlogListPage />} />
      <Route path={`${prefix}/blog/:slug`} element={<BlogDetailPage />} />
      <Route path={`${prefix}/faq`} element={<FaqPage />} />
      <Route path={`${prefix}/contact`} element={<ContactPage />} />
      <Route path={`${prefix}/service-areas`} element={<ServiceAreasPage />} />
      <Route path={`${prefix}/licenses`} element={<LicensesPage />} />
      <Route path={`${prefix}/privacy-policy`} element={<LegalPage type="privacy" />} />
      <Route path={`${prefix}/terms-and-conditions`} element={<LegalPage type="terms" />} />
      <Route path={`${prefix}/refund-policy`} element={<LegalPage type="refund" />} />
    </>
  );
}

function RoutedAppShell() {
  const location = useLocation();
  return (
    <Layout>
      <ErrorBoundary resetKey={location.pathname}>
        <Suspense fallback={<PageRouteSkeleton />}>
          <Routes>
            {AppRoutes({ prefix: '' })}
            <Route path="/en" element={<HomePage />} />
            {AppRoutes({ prefix: '/en' })}
            <Route path="/admin/leads" element={<AdminLeadsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <BrowserRouter basename={getRouterBasename()}>
            <LanguageProvider>
              <ToastProvider>
                <RoutedAppShell />
              </ToastProvider>
            </LanguageProvider>
          </BrowserRouter>
        </MotionConfig>
      </LazyMotion>
    </ErrorBoundary>
  );
}
