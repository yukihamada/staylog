'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { defaultLocale, locales, Locale, Messages, getNestedValue } from './config';

// Import translations
import ja from './ja.json';
import en from './en.json';

const translations = {
  ja,
  en
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  locales: typeof locales;
  defaultLocale: typeof defaultLocale;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // Check if there's a saved locale in localStorage
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    if (savedLocale && locales.includes(savedLocale)) {
      setLocale(savedLocale);
    } else {
      // Try to detect browser language
      const browserLocale = navigator.language.split('-')[0] as Locale;
      if (locales.includes(browserLocale)) {
        setLocale(browserLocale);
      }
    }
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    document.documentElement.lang = newLocale;
  };

  const t = (key: string): string => {
    const messages = translations[locale] as Messages;
    return getNestedValue(messages, key);
  };

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale: handleSetLocale,
        t,
        locales,
        defaultLocale
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}