import { useEffect, useRef, useState } from 'react';
import { Phone, RefreshCw, WifiOff } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

/**
 * Monitors browser network connectivity via navigator.onLine + online/offline events.
 * Displays an accessible high-contrast notice when offline with a direct phone call option
 * (works without internet) and announces reconnection via toast.
 */
export function OfflineNotice() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [isOffline, setIsOffline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );
  const wasOfflineRef = useRef(false);

  useEffect(() => {
    const handleOffline = () => {
      wasOfflineRef.current = true;
      setIsOffline(true);
    };

    const handleOnline = () => {
      setIsOffline(false);
      if (wasOfflineRef.current) {
        wasOfflineRef.current = false;
        showToast({
          variant: 'success',
          title: t('ইন্টারনেট সংযোগ ফিরে এসেছে', 'You Are Back Online'),
          description: t(
            'এখন আপনি স্বাভাবিকভাবে ফর্ম জমা দিতে ও পেজ ব্রাউজ করতে পারবেন।',
            'You can now submit forms and browse all pages normally.'
          ),
        });
      }
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [showToast, t]);

  if (!isOffline) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      data-dark-surface="true"
      className="bg-[#0B1F3A] text-white border-b border-[#C9A24B]/50"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <span
            aria-hidden="true"
            className="w-9 h-9 rounded-xl bg-[#C9A24B]/18 text-[#E2BE67] flex items-center justify-center shrink-0"
          >
            <WifiOff className="w-4 h-4" />
          </span>
          <div className="text-xs sm:text-sm leading-[1.6]">
            <p className="font-bold text-white">
              {t('আপনি বর্তমানে অফলাইনে আছেন', 'You Are Currently Offline')}
            </p>
            <p className="text-white/80">
              {t(
                'ইন্টারনেট সংযোগ বিচ্ছিন্ন থাকায় ফর্ম ও ম্যাপ লোড নাও হতে পারে। জরুরি প্রয়োজনে সরাসরি কল করুন।',
                'Forms and maps require an internet connection. For urgent assistance, please call us directly.'
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={siteConfig.contact.phoneHref}
            className="min-h-[44px] px-3.5 rounded-xl bg-[#C9A24B] text-[#0B1F3A] text-xs font-bold inline-flex items-center gap-1.5 tabular-nums hover:bg-[#D6B25E] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            {siteConfig.contact.phoneDisplay}
          </a>
          <button
            type="button"
            onClick={() => {
              if (navigator.onLine) {
                setIsOffline(false);
              } else {
                window.location.reload();
              }
            }}
            className="min-h-[44px] px-3.5 rounded-xl border border-white/25 bg-white/8 text-white text-xs font-semibold inline-flex items-center gap-1.5 hover:border-[#C9A24B] cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#E2BE67]" aria-hidden="true" />
            {t('আবার চেষ্টা করুন', 'Retry')}
          </button>
        </div>
      </div>
    </div>
  );
}
