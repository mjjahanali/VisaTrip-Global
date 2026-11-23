import { useEffect } from 'react';
import { ROUTE_LOADING_EVENT } from './RouteProgressBar';

interface SkeletonBlockProps {
  className?: string;
  tone?: 'light' | 'dark';
}

export function SkeletonBlock({ className = '', tone = 'light' }: SkeletonBlockProps) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-xl ${tone === 'dark' ? 'skeleton-shimmer-dark' : 'skeleton-shimmer'} ${className}`}
    />
  );
}

interface CardGridSkeletonProps {
  variant?: 'service' | 'destination' | 'package' | 'blog' | 'gallery';
  count?: number;
  columnsClass?: string;
}

export function CardGridSkeleton({
  variant = 'package',
  count = 6,
  columnsClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
}: CardGridSkeletonProps) {
  const hasMedia = variant !== 'service';
  const aspectClass =
    variant === 'blog'
      ? 'aspect-[16/9]'
      : variant === 'destination'
      ? 'aspect-[4/3]'
      : 'aspect-[4/3]';

  return (
    <div aria-hidden="true" className={`grid ${columnsClass} gap-6`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="card-surface overflow-hidden flex flex-col justify-between bg-white"
        >
          <div>
            {hasMedia && (
              <SkeletonBlock className={`w-full ${aspectClass} rounded-none`} />
            )}
            <div className="p-6 space-y-3">
              {variant === 'service' && <SkeletonBlock className="w-11 h-11 rounded-xl mb-1" />}
              <SkeletonBlock className="h-3.5 w-24 rounded-md" />
              <SkeletonBlock className="h-5 w-4/5 rounded-md" />
              <SkeletonBlock className="h-4 w-full rounded-md" />
              <SkeletonBlock className="h-4 w-2/3 rounded-md" />
            </div>
          </div>
          <div className="px-6 pb-6 pt-4 border-t border-[#0B1F3A]/8 flex items-center justify-between gap-3">
            <SkeletonBlock className="h-5 w-28 rounded-md" />
            <SkeletonBlock className="h-10 w-24 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface ListSkeletonProps {
  rows?: number;
  variant?: 'timeline' | 'table' | 'faq';
}

export function ListSkeleton({ rows = 4, variant = 'faq' }: ListSkeletonProps) {
  if (variant === 'timeline') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="card-surface border-[#C9A24B]/35 p-6 sm:p-8 space-y-6"
      >
        <span className="sr-only">আবেদনের তথ্য লোড হচ্ছে... / Loading application status...</span>
        <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-[#0B1F3A]/10">
          <div className="space-y-2.5 flex-1 min-w-[200px]">
            <SkeletonBlock className="h-3.5 w-40 rounded-md" />
            <SkeletonBlock className="h-6 w-64 max-w-full rounded-md" />
            <SkeletonBlock className="h-3.5 w-52 max-w-full rounded-md" />
          </div>
          <SkeletonBlock className="h-7 w-28 rounded-lg" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-xl p-4 border border-[#0B1F3A]/10 bg-[#FAF8F4] space-y-3"
            >
              <div className="flex items-center justify-between">
                <SkeletonBlock className="h-4 w-7 rounded-md" />
                <SkeletonBlock className="h-4 w-4 rounded-full" />
              </div>
              <SkeletonBlock className="h-4 w-4/5 rounded-md" />
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-[#FAF8F4] p-5 border border-[#0B1F3A]/8 space-y-2">
          <SkeletonBlock className="h-4 w-full rounded-md" />
          <SkeletonBlock className="h-4 w-3/4 rounded-md" />
        </div>
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div role="status" aria-live="polite" className="divide-y divide-[#0B1F3A]/8">
        <span className="sr-only">তালিকা লোড হচ্ছে... / Loading list...</span>
        {Array.from({ length: rows }).map((_, idx) => (
          <div
            key={idx}
            className="p-4 grid grid-cols-1 sm:grid-cols-5 gap-3 items-center"
          >
            <div className="space-y-1.5">
              <SkeletonBlock className="h-4 w-24 rounded-md" />
              <SkeletonBlock className="h-3 w-28 rounded-md" />
            </div>
            <div className="space-y-1.5">
              <SkeletonBlock className="h-4 w-32 rounded-md" />
              <SkeletonBlock className="h-3 w-24 rounded-md" />
            </div>
            <div className="space-y-1.5">
              <SkeletonBlock className="h-4 w-28 rounded-md" />
              <SkeletonBlock className="h-3 w-20 rounded-md" />
            </div>
            <SkeletonBlock className="h-4 w-44 max-w-full rounded-md" />
            <SkeletonBlock className="h-10 w-28 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div role="status" aria-live="polite" className="space-y-3">
      <span className="sr-only">তথ্য লোড হচ্ছে... / Loading content...</span>
      {Array.from({ length: rows }).map((_, idx) => (
        <div
          key={idx}
          className="card-surface p-5 flex items-center justify-between gap-4"
        >
          <SkeletonBlock className="h-5 w-3/4 rounded-md" />
          <SkeletonBlock className="h-6 w-6 rounded-lg shrink-0" />
        </div>
      ))}
    </div>
  );
}

export function HomeSectionSkeleton() {
  return (
    <section
      role="status"
      aria-live="polite"
      className="py-16 sm:py-24 bg-white"
    >
      <span className="sr-only">পৃষ্ঠার বাকি অংশ লোড হচ্ছে... / Loading section...</span>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
        <div className="space-y-3 max-w-xl">
          <SkeletonBlock className="h-3.5 w-32 rounded-md" />
          <SkeletonBlock className="h-8 w-4/5 rounded-lg" />
          <SkeletonBlock className="h-4 w-full rounded-md" />
        </div>
        <CardGridSkeleton variant="blog" count={3} />
      </div>
    </section>
  );
}

/**
 * Full-route Suspense skeleton that mirrors Visatrip Global's navy hero + card grid
 * and signals the branded top progress bar while lazy chunks resolve.
 */
export function PageRouteSkeleton() {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent(ROUTE_LOADING_EVENT, { detail: { active: true } }));
    return () => {
      window.dispatchEvent(new CustomEvent(ROUTE_LOADING_EVENT, { detail: { active: false } }));
    };
  }, []);

  return (
    <div role="status" aria-live="polite" className="min-h-[70vh] bg-[#FAF8F4]">
      <span className="sr-only">পেজ লোড হচ্ছে... / Loading page...</span>

      {/* Branded Navy Hero Skeleton */}
      <div className="bg-navy-hero py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-5">
          <SkeletonBlock tone="dark" className="h-3.5 w-40 rounded-md" />
          <SkeletonBlock tone="dark" className="h-10 sm:h-12 w-3/4 max-w-2xl rounded-xl" />
          <SkeletonBlock tone="dark" className="h-5 w-full max-w-xl rounded-md" />
          <div className="flex flex-wrap gap-3 pt-2">
            <SkeletonBlock tone="dark" className="h-12 w-44 rounded-xl" />
            <SkeletonBlock tone="dark" className="h-12 w-36 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Main Content Card Grid Skeleton */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <CardGridSkeleton variant="package" count={6} />
      </div>
    </div>
  );
}
