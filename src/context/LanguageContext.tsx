import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type Locale = 'bn' | 'en';

interface LanguageContextValue {
  locale: Locale;
  isEn: boolean;
  t: (bnText: string, enText: string) => string;
  localizedPath: (path: string) => string;
  switchLocale: (next: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const locale: Locale =
    location.pathname === '/en' || location.pathname.startsWith('/en/') ? 'en' : 'bn';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const value = useMemo<LanguageContextValue>(() => {
    const isEn = locale === 'en';

    const localizedPath = (rawPath: string) => {
      if (rawPath.startsWith('http') || rawPath.startsWith('mailto:') || rawPath.startsWith('tel:')) {
        return rawPath;
      }
      const normalized = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
      const basePath = normalized.replace(/^\/en(?=\/|$)/, '') || '/';
      if (!isEn) return basePath;
      return basePath === '/' ? '/en' : `/en${basePath}`;
    };

    const switchLocale = (next: Locale) => {
      if (next === locale) return;
      const basePath = location.pathname.replace(/^\/en(?=\/|$)/, '') || '/';
      const target =
        next === 'en' ? (basePath === '/' ? '/en' : `/en${basePath}`) : basePath;
      navigate(`${target}${location.search}${location.hash}`);
    };

    return {
      locale,
      isEn,
      t: (bnText: string, enText: string) => (isEn ? enText : bnText),
      localizedPath,
      switchLocale,
    };
  }, [locale, location.pathname, location.search, location.hash, navigate]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
