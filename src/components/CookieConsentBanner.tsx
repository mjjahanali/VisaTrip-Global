import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ShieldCheck } from 'lucide-react';
import {
  CONSENT_CHANGE_EVENT,
  OPEN_COOKIE_SETTINGS_EVENT,
  getConsentStatus,
  setConsentStatus,
  type ConsentStatus,
} from '../lib/consent';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

interface CookieConsentBannerProps {
  /** Temporarily hide while a full-screen consultation modal is open */
  suppress?: boolean;
}

/**
 * Minimal GDPR-style cookie & analytics consent notice.
 * Optional analytics (GA4 / Meta Pixel) stay completely disabled until the visitor clicks Accept.
 */
export function CookieConsentBanner({ suppress = false }: CookieConsentBannerProps) {
  const { localizedPath, t } = useLanguage();
  const { showToast } = useToast();
  const [status, setStatus] = useState<ConsentStatus>(() => getConsentStatus());
  const [reopened, setReopened] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Wait briefly after initial paint so LCP hero is completely unaffected
    const timer = window.setTimeout(() => setMounted(true), 600);

    const onOpenSettings = () => {
      setReopened(true);
      setMounted(true);
    };
    const onConsentChange = () => {
      setStatus(getConsentStatus());
    };

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);
    window.addEventListener(CONSENT_CHANGE_EVENT, onConsentChange);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);
      window.removeEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
    };
  }, []);

  const visible = mounted && !suppress && (status === 'unset' || reopened);
  if (!visible) return null;

  const choose = (next: 'accepted' | 'essential_only') => {
    setConsentStatus(next);
    setStatus(next);
    setReopened(false);
    showToast({
      variant: 'info',
      durationMs: 3600,
      title:
        next === 'accepted'
          ? t('কুকি সেটিংস সংরক্ষিত হয়েছে', 'Cookie Preferences Saved')
          : t('শুধু প্রয়োজনীয় কুকি চালু রয়েছে', 'Essential Cookies Only Enabled'),
      description:
        next === 'accepted'
          ? t(
              'আপনি যেকোনো সময় ফুটারের "কুকি সেটিংস" থেকে এটি পরিবর্তন করতে পারবেন।',
              'You can update this preference anytime from Cookie Settings in the footer.'
            )
          : t(
              'কোনো অ্যানালিটিক্স বা ট্র্যাকিং স্ক্রিপ্ট লোড করা হবে না।',
              'Optional analytics and tracking scripts remain turned off.'
            ),
    });
  };

  return (
    <aside
      role="region"
      aria-label={t('কুকি ও প্রাইভেসি সম্মতি', 'Cookie and privacy consent')}
      className="fixed inset-x-3 bottom-[calc(4.15rem+env(safe-area-inset-bottom))] lg:inset-x-auto lg:left-6 lg:bottom-6 z-40 lg:max-w-[440px]"
    >
      <div className="rounded-2xl bg-white border border-[#0B1F3A]/15 shadow-[0_16px_42px_rgba(7,21,41,0.18)] p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="w-9 h-9 rounded-xl bg-[#FAF8F4] border border-[#C9A24B]/40 text-[#7D5D14] flex items-center justify-center shrink-0 mt-0.5"
          >
            <Cookie className="w-4 h-4" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-[#0B1F3A]">
              {t('কুকি ও প্রাইভেসি পছন্দ', 'Cookie & Privacy Notice')}
            </p>
            <p className="mt-1 text-xs text-[#4B5563] leading-[1.68]">
              {t(
                'ওয়েবসাইটের মূল কাজের জন্য প্রয়োজনীয় স্টোরেজ ব্যবহৃত হয়। আপনার সম্মতি দিলেই কেবল ভিজিটর অ্যানালিটিক্স (GA4 / Meta Pixel) লোড হবে।',
                'We use essential storage for core site features. Optional analytics (GA4 / Meta Pixel) load only if you agree.'
              )}{' '}
              <Link
                to={localizedPath('/privacy-policy')}
                className="font-semibold text-[#0B1F3A] underline hover:text-[#7D5D14]"
              >
                {t('প্রাইভেসি পলিসি', 'Privacy Policy')}
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <button
            type="button"
            onClick={() => choose('essential_only')}
            className="min-h-[44px] px-4 py-2 rounded-xl border border-[#0B1F3A]/20 bg-[#FAF8F4] text-[#0B1F3A] text-xs font-semibold hover:border-[#0B1F3A] cursor-pointer transition-colors sm:flex-1"
          >
            {t('শুধু প্রয়োজনীয়', 'Essential Only')}
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-[#0B1F3A] text-white text-xs font-bold hover:bg-[#153159] inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors sm:flex-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#C9A24B]" aria-hidden="true" />
            {t('সম্মতি দিন', 'Accept Analytics')}
          </button>
        </div>
      </div>
    </aside>
  );
}
