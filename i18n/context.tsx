'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { defaultLocale, locales, Locale, Messages, getNestedValue } from './config';

// Import translations
import ja from './ja.json';
import en from './en.json';

const translations: Record<Locale, Messages> = {
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if there's a saved locale in localStorage
    try {
      const savedLocale = localStorage.getItem('locale') as Locale | null;
      if (savedLocale && locales.includes(savedLocale as Locale)) {
        setLocale(savedLocale as Locale);
      } else {
        // Try to detect browser language
        const browserLocale = navigator.language.split('-')[0];
        if (locales.includes(browserLocale as Locale)) {
          setLocale(browserLocale as Locale);
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    try {
      localStorage.setItem('locale', newLocale);
      document.documentElement.lang = newLocale;
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };

  const t = (key: string): string => {
    try {
      const messages = translations[locale];
      return getNestedValue(messages, key);
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error);
      return key;
    }
  };

  // During SSR, use default translations to avoid hydration mismatch
  if (!mounted) {
    return (
      <I18nContext.Provider
        value={{
          locale: defaultLocale,
          setLocale: () => {},
          t: (key) => {
            try {
              const messages = translations[defaultLocale];
              return getNestedValue(messages, key);
            } catch (error) {
              return key;
            }
          },
          locales,
          defaultLocale
        }}
      >
        {children}
      </I18nContext.Provider>
    );
  }

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