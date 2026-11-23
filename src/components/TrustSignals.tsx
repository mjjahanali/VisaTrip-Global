import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  ShieldAlert,
  FileCheck2,
  ReceiptText,
  Wallet,
  Lock,
  CalendarCheck,
  ExternalLink,
  MapPin,
  ArrowRight,
  Check,
  Building2,
  Users,
  BookOpenCheck,
} from 'lucide-react';
import {
  siteConfig,
  getActiveLicenses,
  getLicenseByKey,
  getOfficialSourcesByTags,
  getVerifiedOfficePhotos,
  getVerifiedTeamMembers,
  toBanglaDigits,
} from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { GoogleMapFacade } from './GoogleMapFacade';

/**
 * 1. CONSISTENT LICENSE STRIP
 * Renders ONLY real populated license numbers from siteConfig.licenses.
 * When no numbers are published online yet, cleanly displays the permanent verifiable Rohanpur office
 * and official in-office verification statement from siteConfig — never fabricates license numbers.
 */
export function LicenseStrip({
  variant = 'light',
  showLink = true,
  className = '',
}: {
  variant?: 'light' | 'white' | 'dark' | 'hajj';
  showLink?: boolean;
  className?: string;
}) {
  const { isEn, localizedPath, t } = useLanguage();
  const cfg = siteConfig.trust.licenseStrip;
  if (!cfg.enabled) return null;

  const activeLicenses = getActiveLicenses();
  const isDark = variant === 'dark' || variant === 'hajj';

  const containerClass =
    variant === 'dark'
      ? 'bg-white/[0.04] border-white/12 text-white/85'
      : variant === 'hajj'
      ? 'bg-[#09321E]/85 border-[#C9A24B]/35 text-white/90'
      : variant === 'white'
      ? 'bg-white border-[#0B1F3A]/10 text-[#0B1F3A] shadow-[0_4px_20px_rgba(11,31,58,0.04)]'
      : 'bg-[#FAF8F4] border-[#C9A24B]/35 text-[#0B1F3A]';

  return (
    <div
      data-dark-surface={isDark ? 'true' : undefined}
      className={`rounded-2xl border px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 ${containerClass} ${className}`}
    >
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-[13px] leading-[1.6]">
        <span
          className={`inline-flex items-center gap-2 font-bold shrink-0 ${
            variant === 'hajj' ? 'text-[#E2BE67]' : isDark ? 'text-[#C9A24B]' : 'text-[#0B1F3A]'
          }`}
        >
          <ShieldCheck
            className={`w-4 h-4 shrink-0 ${
              variant === 'hajj' ? 'text-[#E2BE67]' : isDark ? 'text-[#C9A24B]' : 'text-[#7D5D14]'
            }`}
            aria-hidden="true"
          />
          {activeLicenses.length > 0
            ? t(cfg.headingVerifiedBn, cfg.headingVerifiedEn)
            : t('নিবন্ধন ও অফিস যাচাইকরণ', 'Verified Agency Office')}
        </span>

        {activeLicenses.length > 0 ? (
          activeLicenses.map((lic) => (
            <span key={lic.key} className="inline-flex items-center gap-1.5 tabular-nums">
              <FileCheck2
                className={`w-3.5 h-3.5 shrink-0 ${
                  variant === 'hajj' ? 'text-[#E2BE67]' : isDark ? 'text-[#C9A24B]' : 'text-[#7D5D14]'
                }`}
                aria-hidden="true"
              />
              <span className={isDark ? 'text-white/85' : 'text-[#4B5563]'}>
                {isEn ? lic.labelEn : lic.labelBn}:
              </span>
              <strong className={isDark ? 'text-white' : 'text-[#0B1F3A]'}>{lic.number}</strong>
            </span>
          ))
        ) : (
          <span className={isDark ? 'text-white/85' : 'text-[#4B5563]'}>
            {t(cfg.inOfficeNoticeBn, cfg.inOfficeNoticeEn)}
          </span>
        )}
      </div>

      {showLink && (
        <Link
          to={localizedPath('/licenses')}
          className={`inline-flex items-center gap-1.5 text-xs font-semibold shrink-0 min-h-[44px] md:min-h-0 transition-colors ${
            variant === 'hajj'
              ? 'text-[#E2BE67] hover:text-white'
              : isDark
              ? 'text-[#C9A24B] hover:text-white'
              : 'text-[#7D5D14] hover:text-[#0B1F3A]'
          }`}
        >
          <span>{t('লাইসেন্স ও যাচাইকরণ', 'Licenses & Verification')}</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

/**
 * 2. "সততার অঙ্গীকার" (HONESTY PLEDGE) PROMISE BLOCK
 * Editorial Navy/Gold (or Deep Green for Hajj) promise section strictly driven by siteConfig.trust.honestyPledge.
 */
export function HonestyPledgeBlock({
  variant = 'white',
  compact = false,
  className = '',
}: {
  variant?: 'white' | 'light' | 'navy' | 'hajj';
  compact?: boolean;
  className?: string;
}) {
  const { isEn, localizedPath, t } = useLanguage();
  const pledge = siteConfig.trust.honestyPledge;
  if (!pledge.enabled) return null;

  const isDark = variant === 'navy' || variant === 'hajj';
  const surfaceClass =
    variant === 'hajj'
      ? 'bg-hajj-hero text-white border-[#C9A24B]/35'
      : variant === 'navy'
      ? 'bg-navy-hero text-white border-[#C9A24B]/35'
      : variant === 'light'
      ? 'bg-[#FAF8F4] text-[#0B1F3A] border-[#C9A24B]/45'
      : 'bg-white text-[#0B1F3A] border-[#C9A24B]/45 shadow-[0_10px_32px_rgba(11,31,58,0.06)]';

  const goldAccentText =
    variant === 'hajj' ? 'text-[#E2BE67]' : isDark ? 'text-[#C9A24B]' : 'text-[#7D5D14]';

  return (
    <div className={`rounded-2xl border p-6 sm:p-8 lg:p-10 ${surfaceClass} ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#C9A24B]/25">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-7 bg-[#C9A24B]" aria-hidden="true" />
            <p className={`text-xs font-semibold tracking-[0.08em] uppercase ${goldAccentText}`}>
              {t(pledge.kickerBn, pledge.kickerEn)}
            </p>
          </div>
          <h2 className={`heading-h2 ${isDark ? 'text-white' : 'text-[#0B1F3A]'}`}>
            {t(pledge.titleBn, pledge.titleEn)}
          </h2>
          <blockquote
            className={`mt-4 pl-4 border-l-2 border-[#C9A24B] text-sm sm:text-base leading-[1.8] font-medium ${
              isDark ? 'text-white/90' : 'text-[#1F2937]'
            }`}
          >
            “{t(pledge.quoteBn, pledge.quoteEn)}”
          </blockquote>
        </div>

        <Link
          to={localizedPath('/licenses')}
          className={`${isDark ? 'btn-secondary-light' : 'btn-secondary'} btn-sm shrink-0 self-start lg:self-end`}
        >
          <ShieldCheck className={`w-4 h-4 ${goldAccentText}`} aria-hidden="true" />
          <span>{t('আমাদের যাচাইকরণ নীতি', 'Our Verification Policy')}</span>
        </Link>
      </div>

      <div
        className={`mt-6 grid grid-cols-1 ${
          compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-4'
        } gap-4 sm:gap-5`}
      >
        {pledge.commitments.map((item, idx) => (
          <div
            key={item.id}
            className={`rounded-xl p-4 sm:p-5 border ${
              isDark
                ? 'bg-white/[0.06] border-white/12'
                : variant === 'light'
                ? 'bg-white border-[#0B1F3A]/8'
                : 'bg-[#FAF8F4] border-[#0B1F3A]/8'
            }`}
          >
            <span className={`font-editorial text-xs font-bold tabular-nums ${goldAccentText}`}>
              {isEn ? `0${idx + 1}` : toBanglaDigits(`0${idx + 1}`)}
            </span>
            <h3
              className={`mt-1.5 text-sm sm:text-[15px] font-bold leading-snug ${
                isDark ? 'text-white' : 'text-[#0B1F3A]'
              }`}
            >
              {isEn ? item.titleEn : item.titleBn}
            </h3>
            <p
              className={`mt-1.5 text-xs sm:text-[13px] leading-[1.7] ${
                isDark ? 'text-white/85' : 'text-[#4B5563]'
              }`}
            >
              {isEn ? item.descEn : item.descBn}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 3. SCAM-AWARENESS BANNER FOR WORK PERMIT & HAJJ/UMRAH PAGES
 * Strictly config-driven with official Bangladesh/Saudi verification portal links.
 */
export function ScamAwarenessBanner({
  topic,
  className = '',
}: {
  topic: 'work-permit' | 'hajj-umrah';
  className?: string;
}) {
  const { isEn, localizedPath, t } = useLanguage();
  const cfg =
    topic === 'hajj-umrah'
      ? siteConfig.trust.scamAwareness.hajjUmrah
      : siteConfig.trust.scamAwareness.workPermit;

  if (!cfg.enabled) return null;

  const isHajj = topic === 'hajj-umrah';
  const license = isHajj ? getLicenseByKey('hab') : getLicenseByKey('bmet');

  return (
    <aside
      aria-label={t(cfg.kickerBn, cfg.kickerEn)}
      className={`rounded-2xl border p-6 sm:p-8 ${
        isHajj
          ? 'bg-[#F3FAF6] border-[#0F5132]/30'
          : 'bg-[#FFFDF7] border-[#C9A24B]/65'
      } shadow-[0_6px_24px_rgba(11,31,58,0.04)] ${className}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
            isHajj ? 'bg-[#0F5132] text-[#E2BE67]' : 'bg-[#0B1F3A] text-[#C9A24B]'
          }`}
        >
          <ShieldAlert className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.08em] ${
              isHajj ? 'text-[#0F5132]' : 'text-[#7D5D14]'
            }`}
          >
            {t(cfg.kickerBn, cfg.kickerEn)}
          </p>
          <h2 className="heading-h3 text-[#0B1F3A] mt-1">{t(cfg.titleBn, cfg.titleEn)}</h2>
          <p className="mt-2.5 text-sm text-[#374151] leading-[1.75]">
            {t(cfg.bodyBn, cfg.bodyEn)}
          </p>

          <ul className="mt-4 space-y-2.5">
            {cfg.checkpoints.map((cp) => (
              <li
                key={cp.en}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1F2937] leading-[1.7]"
              >
                <Check
                  className={`w-4 h-4 shrink-0 mt-1 ${
                    isHajj ? 'text-[#0F5132]' : 'text-[#7D5D14]'
                  }`}
                  aria-hidden="true"
                />
                <span>{isEn ? cp.en : cp.bn}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 pt-4 border-t border-[#0B1F3A]/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-semibold text-[#0B1F3A]">
                {t('সরকারি যাচাই লিংক:', 'Official Verification Portals:')}
              </span>
              {cfg.officialVerifyLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#7D5D14] hover:text-[#0B1F3A] underline underline-offset-2 min-h-[44px] sm:min-h-0"
                >
                  <span>{isEn ? link.labelEn : link.labelBn}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
                </a>
              ))}
            </div>

            {license ? (
              <span className="font-bold text-[#0F5132] tabular-nums">
                {isEn ? license.labelEn : license.labelBn}: {license.number}
              </span>
            ) : (
              <Link
                to={localizedPath('/licenses')}
                className="font-semibold text-[#0B1F3A] hover:text-[#7D5D14] inline-flex items-center gap-1"
              >
                <span>{t('অফিস ও নিবন্ধন যাচাই', 'Verify Office & Credentials')}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

/**
 * 4. PAYMENT RECEIPT POLICY NOTICE
 */
export function PaymentReceiptNotice({
  variant = 'card',
  className = '',
}: {
  variant?: 'card' | 'inline' | 'dark';
  className?: string;
}) {
  const { isEn, t } = useLanguage();
  const cfg = siteConfig.trust.paymentReceiptPolicy;
  if (!cfg.enabled) return null;

  if (variant === 'dark') {
    return (
      <div
        className={`rounded-xl bg-white/[0.05] border border-[#C9A24B]/30 px-4 py-3 flex items-start gap-3 text-xs text-white/80 leading-[1.65] ${className}`}
      >
        <ReceiptText className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" aria-hidden="true" />
        <p>
          <strong className="text-white">{t('মানি রিসিট নীতিমালা:', 'Receipt Policy:')}</strong>{' '}
          {t(cfg.shortBn, cfg.shortEn)}
        </p>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div
        className={`rounded-xl bg-[#FFFDF7] border border-[#C9A24B]/45 px-4 py-3.5 flex items-start gap-3 text-xs sm:text-[13px] text-[#374151] leading-[1.7] ${className}`}
      >
        <ReceiptText className="w-4 h-4 text-[#7D5D14] shrink-0 mt-0.5" aria-hidden="true" />
        <p>
          <strong className="text-[#0B1F3A]">{t(cfg.titleBn, cfg.titleEn)}:</strong>{' '}
          {t(cfg.shortBn, cfg.shortEn)}
        </p>
      </div>
    );
  }

  return (
    <div className={`card-surface border-[#C9A24B]/40 p-6 flex items-start gap-4 ${className}`}>
      <div className="w-10 h-10 rounded-xl bg-[#0B1F3A] text-[#C9A24B] flex items-center justify-center shrink-0">
        <ReceiptText className="w-5 h-5" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <h3 className="text-sm sm:text-base font-bold text-[#0B1F3A]">
          {t(cfg.titleBn, cfg.titleEn)}
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-[#4B5563] leading-[1.75]">
          {t(cfg.bodyBn, cfg.bodyEn)}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-[#0B1F3A]">
          <span className="text-[#7D5D14]">{t('অনুমোদিত মাধ্যম:', 'Official Methods:')}</span>
          {siteConfig.paymentMethods.map((pm, idx) => (
            <span key={pm.name} className="inline-flex items-center gap-2">
              {idx > 0 && <span className="text-[#0B1F3A]/25" aria-hidden="true">·</span>}
              <span>{isEn ? pm.name : pm.labelBn}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 5. TRANSPARENT FEE NOTE
 */
export function TransparentFeeNote({
  variant = 'card',
  className = '',
}: {
  variant?: 'card' | 'inline';
  className?: string;
}) {
  const { t } = useLanguage();
  const cfg = siteConfig.trust.transparentFeeNote;
  if (!cfg.enabled) return null;

  if (variant === 'inline') {
    return (
      <div
        className={`rounded-xl bg-[#FAF8F4] border border-[#0B1F3A]/10 px-4 py-3.5 flex items-start gap-3 text-xs sm:text-[13px] text-[#374151] leading-[1.7] ${className}`}
      >
        <Wallet className="w-4 h-4 text-[#7D5D14] shrink-0 mt-0.5" aria-hidden="true" />
        <p>
          <strong className="text-[#0B1F3A]">{t(cfg.titleBn, cfg.titleEn)}:</strong>{' '}
          {t(cfg.bodyBn, cfg.bodyEn)}
        </p>
      </div>
    );
  }

  return (
    <div className={`card-surface p-6 flex items-start gap-4 ${className}`}>
      <div className="w-10 h-10 rounded-xl bg-[#FAF8F4] border border-[#C9A24B]/40 text-[#7D5D14] flex items-center justify-center shrink-0">
        <Wallet className="w-5 h-5" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <h3 className="text-sm sm:text-base font-bold text-[#0B1F3A]">
          {t(cfg.titleBn, cfg.titleEn)}
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-[#4B5563] leading-[1.75]">
          {t(cfg.bodyBn, cfg.bodyEn)}
        </p>
      </div>
    </div>
  );
}

/**
 * 6. SECURE-FORM BADGE
 * Refined, editorial security note shown with InquiryForm and ChecklistModal.
 */
export function SecureFormBadge({
  darkSurface = false,
  className = '',
}: {
  darkSurface?: boolean;
  className?: string;
}) {
  const { t } = useLanguage();
  const cfg = siteConfig.trust.secureFormBadge;
  if (!cfg.enabled) return null;

  return (
    <div
      className={`rounded-xl border px-3.5 py-2.5 flex items-start gap-2.5 text-xs ${
        darkSurface
          ? 'bg-white/[0.05] border-white/15 text-white/80'
          : 'bg-[#FAF8F4] border-[#0B1F3A]/10 text-[#374151]'
      } ${className}`}
    >
      <Lock
        className={`w-4 h-4 shrink-0 mt-0.5 ${darkSurface ? 'text-[#E2BE67]' : 'text-[#7D5D14]'}`}
        aria-hidden="true"
      />
      <div className="min-w-0 leading-[1.55]">
        <span className={`font-bold ${darkSurface ? 'text-white' : 'text-[#0B1F3A]'}`}>
          {t(cfg.labelBn, cfg.labelEn)}
        </span>
        <span className={darkSurface ? 'text-white/80' : 'text-[#525B68]'}>
          {' — '}
          {t(cfg.subBn, cfg.subEn)}
        </span>
      </div>
    </div>
  );
}

/**
 * 7. "VERIFIED ON [DATE]" STAMP FOR VISA INFO PAGES
 * Pulls verified date strictly from siteConfig.trust.visaInfoVerification.
 * Automatically renders nothing if disabled or date is empty.
 */
export function VerifiedDateStamp({
  light = false,
  className = '',
}: {
  light?: boolean;
  className?: string;
}) {
  const { t } = useLanguage();
  const cfg = siteConfig.trust.visaInfoVerification;
  if (!cfg.enabled || !cfg.verifiedDateIso.trim()) return null;

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-2 text-xs font-medium ${
        light ? 'text-white/85' : 'text-[#4B5563]'
      } ${className}`}
    >
      <CalendarCheck
        className={`w-4 h-4 shrink-0 ${light ? 'text-[#E2BE67]' : 'text-[#7D5D14]'}`}
        aria-hidden="true"
      />
      <span>{t(cfg.noteBn, cfg.noteEn)}:</span>
      <time
        dateTime={cfg.verifiedDateIso}
        className={`font-bold tabular-nums ${light ? 'text-[#E2BE67]' : 'text-[#0B1F3A]'}`}
      >
        {t(cfg.verifiedDateBn, cfg.verifiedDateEn)}
      </time>
    </div>
  );
}

/**
 * 8. "তথ্যের উৎস" (OFFICIAL SOURCES) NOTE LINKING TO OFFICIAL EMBASSY & GOVERNMENT PORTALS
 */
export function OfficialSourcesNote({
  tags,
  variant = 'white',
  className = '',
}: {
  tags: string[];
  variant?: 'white' | 'light';
  className?: string;
}) {
  const { isEn, t } = useLanguage();
  const sources = getOfficialSourcesByTags(tags);
  if (sources.length === 0) return null;

  return (
    <div
      className={`rounded-2xl border p-6 sm:p-7 ${
        variant === 'light'
          ? 'bg-[#FAF8F4] border-[#0B1F3A]/10'
          : 'bg-white border-[#0B1F3A]/10 shadow-[0_6px_24px_rgba(11,31,58,0.04)]'
      } ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#0B1F3A]/8">
        <div className="flex items-center gap-2.5">
          <BookOpenCheck className="w-4 h-4 text-[#7D5D14] shrink-0" aria-hidden="true" />
          <h3 className="text-sm sm:text-base font-bold text-[#0B1F3A]">
            {t('তথ্যের উৎস (অফিশিয়াল সরকারি ও Embassy পোর্টাল)', 'Information Sources (Official Government & Embassy Portals)')}
          </h3>
        </div>
        <VerifiedDateStamp />
      </div>

      <p className="mt-3 text-xs sm:text-[13px] text-[#525B68] leading-[1.7]">
        {t(
          'ভিসার নিয়ম, ফি ও ডকুমেন্ট তালিকা যেকোনো সময় সংশ্লিষ্ট দেশের সরকার পরিবর্তন করতে পারে। চূড়ান্ত ও সর্বশেষ নির্দেশনার জন্য নিচের অফিশিয়াল পোর্টালগুলো যাচাই করুন:',
          'Visa policies, fees, and document checklists may change at any time. Always cross-check final regulations on the official portals below:'
        )}
      </p>

      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sources.map((src) => (
          <li key={src.id}>
            <a
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-3 rounded-xl border border-[#0B1F3A]/10 bg-[#FAF8F4]/70 hover:bg-white hover:border-[#C9A24B]/60 p-3.5 transition-colors min-h-[44px]"
            >
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-[#0B1F3A] group-hover:text-[#7D5D14] transition-colors leading-snug">
                  {isEn ? src.nameEn : src.nameBn}
                </div>
                <div className="text-xs leading-[1.6] text-[#525B68] mt-0.5">
                  {isEn ? src.authorityEn : src.authorityBn} · <span className="font-mono text-xs">{src.domain}</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#7D5D14] shrink-0 mt-0.5" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * 9. REAL TEAM & OFFICE PHOTO SLOTS
 * Strictly driven by siteConfig.trust.teamMembers and siteConfig.trust.officePhotos.
 * - Never renders fake team names or bracketed placeholders.
 * - Never passes off stock photography as "our Rohanpur office photo."
 * - Automatically displays verified real portraits and real office photos the moment the owner populates siteConfig.
 */
export function TeamAndOfficeSlots() {
  const { isEn, localizedPath, t } = useLanguage();
  const verifiedTeam = getVerifiedTeamMembers();
  const verifiedOfficePhotos = getVerifiedOfficePhotos();

  return (
    <div className="space-y-14">
      {/* TEAM SECTION */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="h-[1px] w-8 bg-[#C9A24B]" aria-hidden="true" />
              <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#7D5D14]">
                {t('আমাদের কনসাল্টেশন টিম ও ডেস্ক', 'Our Team & Advisory Desks')}
              </p>
            </div>
            <h2 className="heading-h2 text-[#0B1F3A]">
              {verifiedTeam.length > 0
                ? t('যাঁরা আপনার প্রতিটি ফাইলের দায়িত্ব নেন', 'Meet the Specialists Behind Every File')
                : t('প্রতিটি সেবার জন্য নির্ধারিত ডেডিকেটেড ডেস্ক', 'Dedicated Service Desks at Our Rohanpur Office')}
            </h2>
          </div>
          <Link to={localizedPath('/contact')} className="btn-secondary btn-sm self-start sm:self-end">
            {t('সরাসরি দেখা করুন', 'Meet Us In Office')}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {verifiedTeam.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {verifiedTeam.map((member) => (
              <div key={member.id} className="card-surface overflow-hidden flex flex-col">
                {member.photoSrc ? (
                  <div className="aspect-[4/3] bg-[#0B1F3A] overflow-hidden">
                    <img
                      src={member.photoSrc}
                      alt={isEn ? `${member.nameEn} — ${member.roleEn}` : `${member.nameBn} — ${member.roleBn}`}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="p-6 pb-0">
                    <div className="w-14 h-14 rounded-2xl bg-[#0B1F3A] text-[#C9A24B] font-editorial font-bold text-xl flex items-center justify-center">
                      {member.nameEn.slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-xs font-semibold tracking-wider uppercase text-[#7D5D14]">
                    {isEn ? member.specialtyEn : member.specialtyBn}
                  </p>
                  <h3 className="heading-h3 mt-1.5 text-[#0B1F3A]">
                    {isEn ? member.nameEn : member.nameBn}
                  </h3>
                  <p className="text-xs text-[#525B68] mt-1">{isEn ? member.roleEn : member.roleBn}</p>
                  <p className="mt-3 text-sm text-[#4B5563] leading-[1.75]">
                    {isEn ? member.bioEn : member.bioBn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Honest desk breakdown from siteConfig — zero fabricated person names or fake stock portraits */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteConfig.trust.teamMembers.map((desk) => (
              <div key={desk.id} className="card-surface p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] text-[#C9A24B] flex items-center justify-center mb-5">
                    <Users className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-[#7D5D14]">
                    {isEn ? desk.specialtyEn : desk.specialtyBn}
                  </p>
                  <h3 className="heading-h3 mt-2 text-[#0B1F3A]">
                    {isEn ? desk.roleEn : desk.roleBn}
                  </h3>
                  <p className="mt-3 text-sm text-[#4B5563] leading-[1.75]">
                    {isEn ? desk.bioEn : desk.bioBn}
                  </p>
                </div>
                <p className="mt-5 pt-4 border-t border-[#0B1F3A]/8 text-xs text-[#525B68]">
                  {t(siteConfig.contact.officeShortAddressBn, siteConfig.contact.officeShortAddressEn)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* REAL OFFICE PHOTO SLOTS + LIVE OFFICE LOCATION */}
      <div>
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="h-[1px] w-8 bg-[#C9A24B]" aria-hidden="true" />
          <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#7D5D14]">
            {t('আমাদের স্থায়ী অফিস', 'Our Permanent Physical Office')}
          </p>
        </div>
        <h2 className="heading-h2 text-[#0B1F3A]">
          {t('রহনপুর, গোমস্তাপুর, চাঁপাইনবাবগঞ্জ অফিস', 'Visit Visatrip Global in Rohanpur, Chapai Nawabganj')}
        </h2>

        {verifiedOfficePhotos.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifiedOfficePhotos.map((photo) => (
              <figure key={photo.id} className="card-surface overflow-hidden">
                <div className="aspect-[4/3] bg-[#0B1F3A] overflow-hidden">
                  <img
                    src={photo.src}
                    alt={isEn ? photo.slotLabelEn : photo.slotLabelBn}
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="p-5">
                  <div className="text-sm font-bold text-[#0B1F3A]">
                    {isEn ? photo.slotLabelEn : photo.slotLabelBn}
                  </div>
                  <p className="mt-1 text-xs text-[#525B68] leading-[1.65]">
                    {isEn ? photo.captionEn : photo.captionBn}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          /* Real verifiable address + interactive map + honest desk verification without faking office stock photos */
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5 card-surface border-[#C9A24B]/40 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-[#0B1F3A] text-[#C9A24B] flex items-center justify-center">
                  <Building2 className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="heading-h3 text-[#0B1F3A]">
                  {t('সরাসরি অফিসে এসে যাচাই করুন', 'Walk-In Consultation & Verification')}
                </h3>
                <p className="text-sm text-[#4B5563] leading-[1.75]">
                  {t(
                    'আমরা কখনোই স্টক ছবিকে আমাদের অফিসের ছবি হিসেবে ব্যবহার করি না। সরাসরি রহনপুর অফিসে এসে আমাদের কনসালটেন্ট, কাগজপত্র ও নিবন্ধন দেখে নিশ্চিত হতে পারেন।',
                    'We never pass off stock photos as our office. Visit our permanent Rohanpur office directly to meet our desk and review official documentation in person.'
                  )}
                </p>
                <div className="space-y-2 pt-2 text-xs sm:text-sm text-[#0B1F3A]">
                  <p className="flex items-start gap-2.5 font-semibold">
                    <MapPin className="w-4 h-4 text-[#7D5D14] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{t(siteConfig.contact.officeAddressBn, siteConfig.contact.officeAddressEn)}</span>
                  </p>
                  <p className="text-[#525B68] pl-6.5">
                    {t(siteConfig.contact.officeHoursBn, siteConfig.contact.officeHoursEn)} ·{' '}
                    <span className="tabular-nums font-semibold text-[#0B1F3A]">
                      {siteConfig.contact.phoneDisplay}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={siteConfig.contact.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-navy btn-sm"
                >
                  <MapPin className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />
                  <span>{t('গুগল ম্যাপে দিকনির্দেশনা', 'Open Google Maps')}</span>
                </a>
                <Link to={localizedPath('/licenses')} className="btn-secondary btn-sm">
                  {t('লাইসেন্স যাচাই', 'Verify Licenses')}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 card-surface overflow-hidden min-h-[300px] flex flex-col">
              <GoogleMapFacade
                variant="card"
                tone="light"
                heightClass="min-h-[300px] flex-1"
                title="Visatrip Global — Rohanpur, Gomastapur, Chapai Nawabganj Office Location"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
