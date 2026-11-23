import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
import { siteConfig } from '../config/site';
import { serviceSummaries } from '../data/catalogSummary';
import { trackAnalyticsEvent } from '../lib/seo';
import { openCookieSettings } from '../lib/consent';
import { useLanguage } from '../context/LanguageContext';
import { LicenseStrip, PaymentReceiptNotice } from './TrustSignals';
import { GoogleMapFacade } from './GoogleMapFacade';

export function Footer() {
  const { isEn, localizedPath, t } = useLanguage();

  return (
    <footer className="bg-[#071529] text-white/85 pt-16 pb-[calc(6.5rem+env(safe-area-inset-bottom))] lg:pb-12 border-t border-[#C9A24B]/25">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link to={localizedPath('/')} className="inline-flex items-center gap-3 min-h-[44px]">
              <span className="w-9 h-9 rounded-xl bg-white/8 text-[#C9A24B] font-editorial font-bold text-lg inline-flex items-center justify-center border border-[#C9A24B]/45">
                V
              </span>
              <span className="font-editorial text-xl font-bold text-white tracking-tight">
                {siteConfig.brandName}
              </span>
            </Link>
            <p className="text-sm font-semibold text-[#C9A24B]">
              {t(siteConfig.taglineBn, siteConfig.taglineEn)}
            </p>
            <p className="text-sm text-white/72 leading-[1.75]">
              {t(
                'চাঁপাইনবাবগঞ্জ, রাজশাহী বিভাগ ও সারা বাংলাদেশের যাত্রীদের জন্য সৎ পরামর্শ, স্বচ্ছ ফি এবং নির্ভরযোগ্য ভিসা ও ট্রাভেল সলিউশন।',
                'Honest consultation, transparent fees, and dependable visa and travel solutions for Chapai Nawabganj, Rajshahi division, and all of Bangladesh.'
              )}
            </p>

            <address className="not-italic pt-2 space-y-2 text-sm text-white/80">
              <p className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A24B] shrink-0 mt-1" aria-hidden="true" />
                <span>{t(siteConfig.contact.officeAddressBn, siteConfig.contact.officeAddressEn)}</span>
              </p>
              <p className="flex items-center gap-3 tabular-nums">
                <Phone className="w-4 h-4 text-[#C9A24B] shrink-0" aria-hidden="true" />
                <a
                  href={siteConfig.contact.phoneHref}
                  onClick={() => trackAnalyticsEvent('call_click', { location: 'footer' })}
                  className="inline-flex items-center min-h-[44px] lg:min-h-0 hover:text-[#C9A24B] transition-colors"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </p>
              {siteConfig.contact.email && (
                <p className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C9A24B] shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="inline-flex items-center min-h-[44px] lg:min-h-0 hover:text-[#C9A24B]"
                  >
                    {siteConfig.contact.email}
                  </a>
                </p>
              )}
              <p className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C9A24B] shrink-0" aria-hidden="true" />
                <span>{t(siteConfig.contact.officeHoursBn, siteConfig.contact.officeHoursEn)}</span>
              </p>
            </address>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 rounded-xl bg-white/8 border border-white/10 hover:bg-[#C9A24B] hover:text-[#0B1F3A] hover:border-[#C9A24B] flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-xl bg-white/8 border border-white/10 hover:bg-[#C9A24B] hover:text-[#0B1F3A] hover:border-[#C9A24B] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-11 h-11 rounded-xl bg-white/8 border border-white/10 hover:bg-[#C9A24B] hover:text-[#0B1F3A] hover:border-[#C9A24B] flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* All 8 Services */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-bold text-white mb-3 lg:mb-4">
              {t('আমাদের ৮টি সার্ভিস', 'Our 8 Services')}
            </h2>
            <ul className="space-y-0.5 lg:space-y-2 text-sm">
              {serviceSummaries.map((srv) => (
                <li key={srv.slug}>
                  <Link
                    to={localizedPath(`/services/${srv.slug}`)}
                    className="inline-flex items-center min-h-[44px] lg:min-h-0 text-white/75 hover:text-[#C9A24B] transition-colors"
                  >
                    {isEn ? srv.titleEn : srv.titleBn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-bold text-white mb-3 lg:mb-4">
              {t('প্রয়োজনীয় লিংক', 'Quick Links')}
            </h2>
            <ul className="space-y-0.5 lg:space-y-2 text-sm">
              {[
                { to: '/about', label: t('আমাদের সম্পর্কে', 'About Us') },
                { to: '/destinations', label: t('জনপ্রিয় ডেস্টিনেশন', 'Destinations') },
                { to: '/tour-packages', label: t('ট্যুর প্যাকেজ', 'Tour Packages') },
                { to: '/visa-checker', label: 'Visa Checker', enOnly: true },
                { to: '/track-application', label: t('আবেদন ট্র্যাক করুন', 'Track Application') },
                { to: '/success-stories', label: t('সাফল্যের গল্প', 'Success Stories') },
                { to: '/gallery', label: t('গ্যালারি', 'Gallery') },
                { to: '/blog', label: t('ব্লগ ও গাইড', 'Blog & Guides') },
                { to: '/service-areas', label: t('সার্ভিস এরিয়া (রাজশাহী)', 'Service Areas') },
                { to: '/faq', label: t('সাধারণ প্রশ্ন (FAQ)', 'FAQ') },
                { to: '/licenses', label: t('লাইসেন্স ও সার্টিফিকেট', 'Licenses') },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={localizedPath(link.to)}
                    lang={link.enOnly ? 'en' : undefined}
                    className="inline-flex items-center min-h-[44px] lg:min-h-0 text-white/85 hover:text-[#C9A24B] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Office Map & Payment Methods */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-sm font-bold text-white">
              {t('আমাদের অফিস লোকেশন', 'Office Location')}
            </h2>
            <div className="rounded-xl overflow-hidden border border-white/15 bg-white/5">
              <GoogleMapFacade
                variant="compact"
                tone="dark"
                heightClass="min-h-[11rem]"
                title="Visatrip Global Office Map — Rohanpur, Gomastapur, Chapai Nawabganj"
              />
            </div>

            <div>
              <p className="text-xs font-semibold text-white/85 mb-2">
                {t('অনুমোদিত পেমেন্ট মাধ্যম:', 'Accepted Payment Methods:')}
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/90">
                {siteConfig.paymentMethods.map((pm, idx) => (
                  <span key={pm.name} className="inline-flex items-center gap-2">
                    {idx > 0 && <span className="text-white/35" aria-hidden="true">·</span>}
                    <span>{isEn ? pm.name : pm.labelBn}</span>
                  </span>
                ))}
              </div>
            </div>

            <PaymentReceiptNotice variant="dark" />
          </div>
        </div>

        {/* Consistent License & Verification Strip (pulls strictly from siteConfig) */}
        <div className="py-5 border-b border-white/10">
          <LicenseStrip variant="dark" />
        </div>

        {/* Legal Bottom Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/80">
          <p className="text-center sm:text-left">{t(siteConfig.copyrightBn, siteConfig.copyrightEn)}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link
              to={localizedPath('/privacy-policy')}
              lang="en"
              className="inline-flex items-center min-h-[44px] lg:min-h-0 hover:text-[#C9A24B]"
            >
              Privacy Policy
            </Link>
            <span className="text-white/35" aria-hidden="true">·</span>
            <Link
              to={localizedPath('/terms-and-conditions')}
              lang="en"
              className="inline-flex items-center min-h-[44px] lg:min-h-0 hover:text-[#C9A24B]"
            >
              Terms & Conditions
            </Link>
            <span className="text-white/35" aria-hidden="true">·</span>
            <Link
              to={localizedPath('/refund-policy')}
              lang="en"
              className="inline-flex items-center min-h-[44px] lg:min-h-0 hover:text-[#C9A24B]"
            >
              Refund Policy
            </Link>
            <span className="text-white/35" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={openCookieSettings}
              className="inline-flex items-center min-h-[44px] lg:min-h-0 hover:text-[#C9A24B] cursor-pointer transition-colors"
            >
              {t('কুকি সেটিংস', 'Cookie Settings')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
