import React from 'react';
import { AlertTriangle, Home, MessageCircle, RefreshCw, RotateCcw } from 'lucide-react';
import { siteConfig, buildWhatsAppLink } from '../config/site';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  /** Pass location.pathname so route-scoped boundaries automatically recover on navigation */
  resetKey?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  isChunkError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    isChunkError: false,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const msg = String(error?.message || error?.name || '');
    const isChunkError =
      msg.includes('ChunkLoadError') ||
      msg.includes('Failed to fetch dynamically imported module') ||
      msg.includes('Importing a module script failed') ||
      msg.includes('Loading chunk');
    return { hasError: true, isChunkError };
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false, isChunkError: false });
    }
  }

  componentDidCatch() {
    // Intentionally silent in UI; avoids exposing stack traces or internal logs to visitors
  }

  handleRetry = () => {
    if (this.state.isChunkError) {
      window.location.reload();
      return;
    }
    this.setState({ hasError: false, isChunkError: false });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const isEn =
      typeof window !== 'undefined' &&
      (window.location.pathname === '/en' || window.location.pathname.startsWith('/en/'));
    const homeHref = isEn ? '/en' : '/';
    const waHref = buildWhatsAppLink(
      'আসসালামু আলাইকুম, ওয়েবসাইটের একটি পেজ লোড হতে সমস্যা হচ্ছে। আমি সরাসরি তথ্য জানতে চাই।',
      isEn ? 'en' : 'bn'
    );

    return (
      <section
        role="alert"
        aria-live="assertive"
        className="min-h-[72vh] bg-[#FAF8F4] flex items-center justify-center px-4 py-16 sm:py-24"
      >
        <div className="max-w-xl w-full card-surface p-7 sm:p-10 text-center border-[#C9A24B]/40">
          <div
            aria-hidden="true"
            className="w-14 h-14 mx-auto rounded-2xl bg-[#0B1F3A] text-[#C9A24B] flex items-center justify-center mb-5"
          >
            <AlertTriangle className="w-7 h-7" />
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7D5D14]">
            {siteConfig.brandName}
          </p>

          <h1 className="heading-h2 text-[#0B1F3A] mt-2">
            {this.state.isChunkError
              ? isEn
                ? 'This Page Needs a Quick Refresh'
                : 'পেজটি লোড হতে একটু সমস্যা হয়েছে'
              : isEn
              ? 'Something Went Wrong While Loading This Section'
              : 'দুঃখিত, এই অংশটি দেখাতে সাময়িক সমস্যা হয়েছে'}
          </h1>

          <p className="mt-3 text-sm text-[#4B5563] leading-[1.75]">
            {this.state.isChunkError
              ? isEn
                ? 'Your internet connection may have dropped briefly or a newer version of the site was published. Please tap Retry to reload cleanly.'
                : 'ইন্টারনেট সংযোগ সাময়িকভাবে বিচ্ছিন্ন হলে বা ওয়েবসাইট আপডেট হলে এমন হতে পারে। নিচের বাটনে ক্লিক করে আবার চেষ্টা করুন।'
              : isEn
              ? 'Please try again, return to the home page, or message our consultant directly on WhatsApp.'
              : 'অনুগ্রহ করে আবার চেষ্টা করুন, হোমপেজে ফিরে যান অথবা সরাসরি আমাদের WhatsApp-এ যোগাযোগ করুন।'}
          </p>

          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={this.handleRetry}
              className="btn-primary btn-sm w-full sm:w-auto"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              {isEn ? 'Try Again' : 'আবার চেষ্টা করুন'}
            </button>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-navy btn-sm w-full sm:w-auto"
            >
              <RefreshCw className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />
              {isEn ? 'Reload Page' : 'পেজ রিলোড করুন'}
            </button>

            <a href={homeHref} className="btn-secondary btn-sm w-full sm:w-auto">
              <Home className="w-4 h-4" aria-hidden="true" />
              {isEn ? 'Back to Home' : 'হোমপেজে ফিরুন'}
            </a>
          </div>

          <div className="mt-6 pt-5 border-t border-[#0B1F3A]/10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#525B68]">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[44px] font-semibold text-[#0F5132] hover:underline"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              {isEn ? 'WhatsApp Support' : 'WhatsApp সহায়তা'}
            </a>
            <a
              href={siteConfig.contact.phoneHref}
              className="inline-flex items-center min-h-[44px] font-semibold text-[#0B1F3A] tabular-nums hover:underline"
            >
              {siteConfig.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    );
  }
}
