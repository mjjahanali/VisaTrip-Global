import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'motion/react';
import {
  Phone,
  Mail,
  ChevronDown,
  Menu,
  X,
  MessageCircle,
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  FileSearch,
  SearchCheck,
  MapPin,
} from 'lucide-react';
import { siteConfig } from '../config/site';
import { serviceSummaries } from '../data/catalogSummary';
import { getPageLeadContext } from '../lib/leadContext';
import { trackAnalyticsEvent } from '../lib/analytics';
import { prefetchRouteByPath } from '../lib/prefetchRoutes';
import { useLanguage } from '../context/LanguageContext';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { ServiceIcon } from './ServiceIcon';
import { MOTION_EASE } from './MotionPrimitives';

export function Navbar({ onOpenConsultation }: { onOpenConsultation: () => void }) {
  const { locale, isEn, localizedPath, switchLocale, t } = useLanguage();
  const location = useLocation();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaRef = useRef<HTMLDivElement | null>(null);
  const servicesBtnRef = useRef<HTMLButtonElement | null>(null);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);

  const mobileDrawerRef = useFocusTrap<HTMLDivElement>({
    active: mobileOpen,
    onEscape: () => setMobileOpen(false),
    returnFocusTo: menuBtnRef,
  });

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const next = latest > 40;
    if (next !== scrolled) {
      setScrolled(next);
    }
  });

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!megaOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false);
        servicesBtnRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [megaOpen]);

  const basePath = location.pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  const isActive = (target: string) =>
    target === '/' ? basePath === '/' : basePath === target || basePath.startsWith(`${target}/`);

  const navLinkClass = (target: string) =>
    `text-sm font-medium transition-colors py-1.5 border-b-2 ${
      isActive(target)
        ? 'text-[#0B1F3A] border-[#C9A24B] font-semibold'
        : 'text-[#0B1F3A]/85 border-transparent hover:text-[#7D5D14] hover:border-[#C9A24B]/50'
    }`;

  const pageCtx = getPageLeadContext(location.pathname, locale);
  const waHref = pageCtx.whatsappUrl;

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
          scrolled && !mobileOpen ? '-translate-y-8 lg:-translate-y-10' : 'translate-y-0'
        }`}
      >
        <div className="relative bg-white/95 backdrop-blur-md border-b border-[#0B1F3A]/10">
          {/* Opacity-only elevated shadow layer when scrolled (zero paint/layout thrash) */}
          <m.div
            aria-hidden="true"
            initial={false}
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 0.24, ease: MOTION_EASE }}
            className="pointer-events-none absolute inset-0 shadow-[0_12px_32px_rgba(11,31,58,0.10)]"
          />

          {/* Mobile Compact Address + Hotline Strip */}
          <div
            data-dark-surface="true"
            className="lg:hidden bg-[#0B1F3A] text-white/95 text-xs border-b border-white/10"
          >
            <div className="max-w-[1200px] mx-auto px-3.5 min-h-8 py-1 flex flex-wrap items-center justify-between gap-2">
              <Link
                to={localizedPath('/contact')}
                className="inline-flex items-center gap-1.5 min-w-0 hover:text-[#C9A24B] transition-colors"
              >
                <MapPin className="w-3 h-3 text-[#C9A24B] shrink-0" aria-hidden="true" />
                <span className="leading-snug">
                  {t(siteConfig.contact.officeShortAddressBn, siteConfig.contact.officeShortAddressEn)}
                </span>
              </Link>
              <a
                href={siteConfig.contact.phoneHref}
                onClick={() => trackAnalyticsEvent('call_click', { location: 'mobile_header_strip' })}
                className="inline-flex items-center gap-1 font-semibold text-[#C9A24B] shrink-0 tabular-nums"
              >
                <Phone className="w-3 h-3 shrink-0" aria-hidden="true" />
                <span>{siteConfig.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Desktop Utility Top Bar */}
          <m.div
            data-dark-surface="true"
            initial={false}
            animate={{ opacity: scrolled ? 0 : 1 }}
            transition={{ duration: 0.22, ease: MOTION_EASE }}
            className="hidden lg:block bg-[#0B1F3A] text-white/95 text-xs"
          >
            <div className="max-w-[1200px] mx-auto px-6 min-h-10 py-1.5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 min-w-0">
                <Link
                  to={localizedPath('/contact')}
                  className="inline-flex items-center gap-1.5 hover:text-[#C9A24B] transition-colors min-w-0"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" aria-hidden="true" />
                  <span>
                    {t(siteConfig.contact.officeShortAddressBn, siteConfig.contact.officeShortAddressEn)}
                  </span>
                </Link>
                <span className="text-white/30 shrink-0" aria-hidden="true">|</span>
                <a
                  href={siteConfig.contact.phoneHref}
                  onClick={() => trackAnalyticsEvent('call_click', { location: 'topbar' })}
                  className="inline-flex items-center gap-1.5 hover:text-[#C9A24B] transition-colors shrink-0 tabular-nums font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9A24B]" aria-hidden="true" />
                  {siteConfig.contact.phoneDisplay}
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackAnalyticsEvent('whatsapp_click', {
                      location: 'topbar',
                      prefilled_topic: pageCtx.serviceLabel,
                    })
                  }
                  className="inline-flex items-center gap-1.5 hover:text-[#C9A24B] transition-colors shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#C9A24B]" aria-hidden="true" />
                  <span lang="en">WhatsApp</span>
                </a>
                {siteConfig.contact.email && (
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="inline-flex items-center gap-1.5 hover:text-[#C9A24B] transition-colors shrink-0"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C9A24B]" aria-hidden="true" />
                    <span lang="en">{siteConfig.contact.email}</span>
                  </a>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-5 shrink-0">
                <div className="flex items-center gap-3">
                  <Link
                    to={localizedPath('/visa-checker')}
                    lang="en"
                    className="hover:text-[#C9A24B] transition-colors"
                  >
                    Visa Checker
                  </Link>
                  <span className="text-white/35" aria-hidden="true">·</span>
                  <Link
                    to={localizedPath('/track-application')}
                    lang="en"
                    className="hover:text-[#C9A24B] transition-colors"
                  >
                    Track Application
                  </Link>
                </div>

                <div className="h-3.5 w-px bg-white/25" aria-hidden="true" />

                <div
                  className="inline-flex items-center gap-2"
                  role="group"
                  aria-label={t('ভাষা পরিবর্তন', 'Language switcher')}
                >
                  <Globe className="w-3.5 h-3.5 text-[#C9A24B]" aria-hidden="true" />
                  <button
                    type="button"
                    lang="bn"
                    aria-pressed={!isEn}
                    onClick={() => switchLocale('bn')}
                    className={`cursor-pointer px-1 py-0.5 rounded transition-colors ${
                      !isEn ? 'text-[#C9A24B] font-semibold' : 'text-white/85 hover:text-white'
                    }`}
                  >
                    বাংলা
                  </button>
                  <span className="text-white/35" aria-hidden="true">|</span>
                  <button
                    type="button"
                    lang="en"
                    aria-pressed={isEn}
                    onClick={() => switchLocale('en')}
                    className={`cursor-pointer px-1 py-0.5 rounded transition-colors ${
                      isEn ? 'text-[#C9A24B] font-semibold' : 'text-white/85 hover:text-white'
                    }`}
                  >
                    English
                  </button>
                </div>

                <div className="h-3.5 w-px bg-white/25" aria-hidden="true" />

                <div className="flex items-center gap-3">
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visatrip Global Facebook"
                    className="hover:text-[#C9A24B] transition-colors"
                  >
                    <Facebook className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visatrip Global Instagram"
                    className="hover:text-[#C9A24B] transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visatrip Global LinkedIn"
                    className="hover:text-[#C9A24B] transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </m.div>

          {/* Main Sticky Navbar (min-height safe for 200% text resize) */}
          <div className="relative max-w-[1200px] mx-auto px-3.5 sm:px-6 min-h-14 lg:min-h-[72px] py-1.5 flex flex-wrap items-center justify-between gap-3 lg:gap-6">
            <Link
              to={localizedPath('/')}
              aria-current={isActive('/') ? 'page' : undefined}
              className="inline-flex items-center gap-2.5 sm:gap-3 min-h-[44px] shrink-0"
            >
              <m.span
                aria-hidden="true"
                initial={false}
                animate={{ scale: scrolled ? 0.92 : 1 }}
                transition={{ duration: 0.24, ease: MOTION_EASE }}
                className="w-9 h-9 rounded-xl bg-[#0B1F3A] text-[#C9A24B] font-editorial font-bold text-base inline-flex items-center justify-center border border-[#C9A24B]/45 shadow-xs origin-left shrink-0"
              >
                V
              </m.span>
              <m.span
                lang="en"
                initial={false}
                animate={{ scale: scrolled ? 0.96 : 1 }}
                transition={{ duration: 0.24, ease: MOTION_EASE }}
                className="font-editorial text-[17px] sm:text-lg lg:text-xl font-bold tracking-tight text-[#0B1F3A] origin-left inline-block"
              >
                Visatrip Global
              </m.span>
            </Link>

            {/* Desktop Navigation */}
            <nav aria-label={t('প্রধান নেভিগেশন', 'Main navigation')} className="hidden lg:flex flex-wrap items-center gap-x-5 gap-y-1">
              <Link
                to={localizedPath('/')}
                aria-current={isActive('/') ? 'page' : undefined}
                className={navLinkClass('/')}
              >
                {t('হোম', 'Home')}
              </Link>
              <Link
                to={localizedPath('/about')}
                aria-current={isActive('/about') ? 'page' : undefined}
                className={navLinkClass('/about')}
              >
                {t('আমাদের সম্পর্কে', 'About')}
              </Link>

              <div ref={megaRef} className="relative">
                <button
                  ref={servicesBtnRef}
                  type="button"
                  onClick={() => setMegaOpen((prev) => !prev)}
                  aria-expanded={megaOpen}
                  aria-controls="desktop-services-menu"
                  className={`${navLinkClass('/services')} inline-flex items-center gap-1 cursor-pointer`}
                >
                  <span>{t('সার্ভিস', 'Services')}</span>
                  <m.span
                    animate={{ rotate: megaOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: MOTION_EASE }}
                    className="inline-flex"
                  >
                    <ChevronDown className="w-3.5 h-3.5 text-[#7D5D14]" aria-hidden="true" />
                  </m.span>
                </button>

                <AnimatePresence>
                  {megaOpen && (
                    <m.div
                      id="desktop-services-menu"
                      role="region"
                      aria-label={t('আমাদের ৮টি সার্ভিস তালিকা', 'Our 8 Services menu')}
                      initial={{ opacity: 0, y: 8, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.985 }}
                      transition={{ duration: 0.2, ease: MOTION_EASE }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[min(688px,92vw)] bg-white rounded-2xl border border-[#0B1F3A]/10 shadow-[0_24px_56px_rgba(11,31,58,0.14)] p-6 z-50"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[#0B1F3A]/8">
                        <span className="text-xs font-semibold text-[#525B68]">
                          {t('আমাদের ৮টি ট্রাভেল ও ভিসা সার্ভিস', 'All 8 Travel & Visa Services')}
                        </span>
                        <Link
                          to={localizedPath('/services')}
                          className="text-xs font-semibold text-[#7D5D14] hover:underline"
                        >
                          {t('সব সার্ভিস দেখুন →', 'View All Services →')}
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {serviceSummaries.map((srv) => (
                          <Link
                            key={srv.slug}
                            to={localizedPath(`/services/${srv.slug}`)}
                            aria-current={isActive(`/services/${srv.slug}`) ? 'page' : undefined}
                            onMouseEnter={() => prefetchRouteByPath(`/services/${srv.slug}`)}
                            onFocus={() => prefetchRouteByPath(`/services/${srv.slug}`)}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FAF8F4] border border-transparent hover:border-[#C9A24B]/45 transition-colors"
                          >
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                srv.theme === 'hajj'
                                  ? 'bg-[#0F5132]/10 text-[#0F5132]'
                                  : 'bg-[#0B1F3A]/6 text-[#0B1F3A]'
                              }`}
                            >
                              <ServiceIcon name={srv.icon} className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-bold text-[#0B1F3A]">
                                {isEn ? srv.titleEn : srv.titleBn}
                              </div>
                              <div className="text-xs text-[#525B68] line-clamp-2 mt-0.5">
                                {isEn ? srv.shortDescEn : srv.shortDescBn}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-[#0B1F3A]/8 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <Link
                          to={localizedPath('/visa-checker')}
                          className="inline-flex items-center gap-2 font-semibold text-[#0B1F3A] hover:text-[#7D5D14]"
                        >
                          <FileSearch className="w-4 h-4 text-[#7D5D14]" aria-hidden="true" />
                          {t('ফ্রি Visa Requirement Checker', 'Free Visa Requirement Checker')}
                        </Link>
                        <Link
                          to={localizedPath('/track-application')}
                          className="inline-flex items-center gap-2 font-semibold text-[#0B1F3A] hover:text-[#7D5D14]"
                        >
                          <SearchCheck className="w-4 h-4 text-[#7D5D14]" aria-hidden="true" />
                          {t('আবেদন ট্র্যাক করুন', 'Track Your Application')}
                        </Link>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to={localizedPath('/destinations')}
                aria-current={isActive('/destinations') ? 'page' : undefined}
                onMouseEnter={() => prefetchRouteByPath('/destinations')}
                className={navLinkClass('/destinations')}
              >
                {t('ডেস্টিনেশন', 'Destinations')}
              </Link>
              <Link
                to={localizedPath('/tour-packages')}
                aria-current={isActive('/tour-packages') ? 'page' : undefined}
                onMouseEnter={() => prefetchRouteByPath('/tour-packages')}
                className={navLinkClass('/tour-packages')}
              >
                {t('ট্যুর প্যাকেজ', 'Packages')}
              </Link>
              <Link
                to={localizedPath('/services/hajj-umrah')}
                aria-current={isActive('/services/hajj-umrah') ? 'page' : undefined}
                onMouseEnter={() => prefetchRouteByPath('/services/hajj-umrah')}
                className={navLinkClass('/services/hajj-umrah')}
              >
                {t('হজ্জ ও ওমরাহ', 'Hajj & Umrah')}
              </Link>
              <Link
                to={localizedPath('/blog')}
                aria-current={isActive('/blog') ? 'page' : undefined}
                onMouseEnter={() => prefetchRouteByPath('/blog')}
                className={navLinkClass('/blog')}
              >
                {t('ব্লগ', 'Blog')}
              </Link>
              <Link
                to={localizedPath('/contact')}
                aria-current={isActive('/contact') ? 'page' : undefined}
                onMouseEnter={() => prefetchRouteByPath('/contact')}
                className={navLinkClass('/contact')}
              >
                {t('যোগাযোগ', 'Contact')}
              </Link>
            </nav>

            {/* Primary Action + Mobile Controls (all >= 44x44px) */}
            <div className="flex items-center gap-2 shrink-0">
              <m.button
                type="button"
                onClick={onOpenConsultation}
                initial={false}
                animate={{ scale: scrolled ? 0.96 : 1 }}
                transition={{ duration: 0.24, ease: MOTION_EASE }}
                className="hidden sm:inline-flex btn-primary btn-sm origin-right"
              >
                {t('ফ্রি কনসাল্টেশন নিন', 'Free Consultation')}
              </m.button>

              <button
                type="button"
                onClick={() => switchLocale(isEn ? 'bn' : 'en')}
                lang={isEn ? 'bn' : 'en'}
                className="lg:hidden min-h-[44px] min-w-[44px] px-3 rounded-xl border border-[#0B1F3A]/15 text-xs font-semibold text-[#0B1F3A] active:bg-[#FAF8F4] cursor-pointer"
                aria-label={isEn ? 'বাংলা ভাষায় পরিবর্তন করুন' : 'Switch language to English'}
              >
                {isEn ? 'বাংলা' : 'EN'}
              </button>

              <button
                ref={menuBtnRef}
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label={mobileOpen ? t('মেনু বন্ধ করুন', 'Close menu') : t('মেনু খুলুন', 'Open menu')}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-drawer"
                className="lg:hidden w-11 h-11 rounded-xl border border-[#0B1F3A]/15 flex items-center justify-center text-[#0B1F3A] active:bg-[#FAF8F4] cursor-pointer"
              >
                {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer (focus-trapped, Escape & backdrop close, pinned thumb-zone CTAs) */}
      <AnimatePresence>
        {mobileOpen && (
          <div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-nav-title"
            className="lg:hidden fixed inset-0 z-50 flex justify-end"
          >
            {/* Dimmed Backdrop */}
            <m.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: MOTION_EASE }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-[#071529]/55 backdrop-blur-[2px]"
            />

            {/* Right Slide-Over Panel */}
            <m.div
              ref={mobileDrawerRef}
              tabIndex={-1}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.24, ease: MOTION_EASE }}
              className="relative z-10 w-[min(88vw,360px)] h-[100dvh] bg-white shadow-2xl flex flex-col focus:outline-none"
            >
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between px-4 min-h-14 py-2 border-b border-[#0B1F3A]/10 shrink-0">
                <span id="mobile-nav-title" lang="en" className="font-editorial text-lg font-bold text-[#0B1F3A]">
                  Visatrip Global
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label={t('মেনু বন্ধ করুন', 'Close menu')}
                  className="w-11 h-11 rounded-xl border border-[#0B1F3A]/12 flex items-center justify-center text-[#0B1F3A] active:bg-[#FAF8F4] cursor-pointer"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Scrollable Navigation Links (all rows >= 48px tap targets) */}
              <nav aria-label={t('মোবাইল মেনু', 'Mobile menu')} className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-1">
                {[
                  { path: '/', label: t('হোম', 'Home') },
                  { path: '/about', label: t('আমাদের সম্পর্কে', 'About Us') },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={localizedPath(item.path)}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                    className={`min-h-[48px] flex items-center px-4 py-2 rounded-xl text-[15px] font-semibold transition-colors ${
                      isActive(item.path)
                        ? 'bg-[#0B1F3A]/6 text-[#0B1F3A] ring-1 ring-[#C9A24B]/45'
                        : 'text-[#0B1F3A] active:bg-[#FAF8F4]'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                <div>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((prev) => !prev)}
                    aria-expanded={mobileServicesOpen}
                    aria-controls="mobile-services-list"
                    className="w-full min-h-[48px] flex items-center justify-between px-4 py-2 rounded-xl text-[15px] font-semibold text-[#0B1F3A] active:bg-[#FAF8F4] cursor-pointer"
                  >
                    <span>{t('আমাদের সার্ভিসসমূহ (৮টি)', 'Our Services (8)')}</span>
                    <m.span
                      animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: MOTION_EASE }}
                      className="inline-flex"
                    >
                      <ChevronDown className="w-4 h-4 text-[#7D5D14]" aria-hidden="true" />
                    </m.span>
                  </button>
                  <div
                    id="mobile-services-list"
                    className="accordion-panel"
                    data-open={mobileServicesOpen ? 'true' : 'false'}
                    hidden={!mobileServicesOpen}
                  >
                    <div>
                      <div className="pl-3 pr-1 py-1 space-y-1">
                        {serviceSummaries.map((srv) => (
                          <Link
                            key={srv.slug}
                            to={localizedPath(`/services/${srv.slug}`)}
                            aria-current={isActive(`/services/${srv.slug}`) ? 'page' : undefined}
                            className="min-h-[44px] flex items-center gap-3 px-3 py-1.5 rounded-xl text-sm font-medium text-[#374151] active:bg-[#FAF8F4] hover:text-[#0B1F3A]"
                          >
                            <ServiceIcon name={srv.icon} className="w-4 h-4 text-[#7D5D14] shrink-0" />
                            <span>{isEn ? srv.titleEn : srv.titleBn}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {[
                  { path: '/destinations', label: t('ডেস্টিনেশন', 'Destinations') },
                  { path: '/tour-packages', label: t('ট্যুর প্যাকেজ', 'Tour Packages') },
                  { path: '/services/hajj-umrah', label: t('হজ্জ ও ওমরাহ', 'Hajj & Umrah'), hajj: true },
                  { path: '/visa-checker', label: 'Visa Requirement Checker', enOnly: true },
                  { path: '/track-application', label: 'Track Application', enOnly: true },
                  { path: '/blog', label: t('ব্লগ ও গাইড', 'Blog & Guides') },
                  { path: '/service-areas', label: t('সার্ভিস এরিয়া (চাঁপাইনবাবগঞ্জ ও রাজশাহী)', 'Service Areas (Local)') },
                  { path: '/licenses', label: t('লাইসেন্স ও যাচাইকরণ', 'Licenses & Verification') },
                  { path: '/contact', label: t('যোগাযোগ', 'Contact Us') },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={localizedPath(item.path)}
                    lang={item.enOnly ? 'en' : undefined}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                    className={`min-h-[48px] flex items-center px-4 py-2 rounded-xl text-[15px] font-semibold transition-colors ${
                      isActive(item.path)
                        ? 'bg-[#0B1F3A]/6 text-[#0B1F3A] ring-1 ring-[#C9A24B]/45'
                        : item.hajj
                        ? 'text-[#0F5132] active:bg-[#0F5132]/8'
                        : 'text-[#0B1F3A] active:bg-[#FAF8F4]'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Pinned Thumb-Zone Action Dock (safe-area aware) */}
              <div className="shrink-0 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-[#FAF8F4] border-t border-[#0B1F3A]/10 space-y-2.5">
                <p className="flex items-start gap-2 text-xs text-[#4B5563] leading-snug pb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#7D5D14] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{t(siteConfig.contact.officeAddressBn, siteConfig.contact.officeAddressEn)}</span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenConsultation();
                  }}
                  className="w-full btn-primary"
                >
                  {t('ফ্রি কনসাল্টেশন নিন', 'Get Free Consultation')}
                </button>
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={siteConfig.contact.phoneHref}
                    onClick={() => trackAnalyticsEvent('call_click', { location: 'mobile_drawer' })}
                    className="btn-secondary btn-sm w-full tabular-nums"
                  >
                    <Phone className="w-4 h-4 text-[#7D5D14] shrink-0" aria-hidden="true" />
                    <span>{t('কল করুন', 'Call Now')}</span>
                  </a>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackAnalyticsEvent('whatsapp_click', {
                        location: 'mobile_drawer',
                        prefilled_topic: pageCtx.serviceLabel,
                      })
                    }
                    className="btn-navy btn-sm w-full"
                  >
                    <MessageCircle className="w-4 h-4 text-[#C9A24B] shrink-0" aria-hidden="true" />
                    <span lang="en">WhatsApp</span>
                  </a>
                </div>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
