'use client';

import { useI18n } from '@/i18n/context';
import { Locale } from '@/i18n/config';
import { useState, useEffect } from 'react';

const languageNames: Record<Locale, string> = {
  ja: '日本語',
  en: 'English'
};

export default function LanguageSwitcher() {
  const { locale, setLocale, locales } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  // Don't render the dropdown during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="relative">
        <button
          type="button"
          className="flex items-center text-sm font-medium text-zinc-300 hover:text-white"
        >
          <span>{languageNames.ja}</span>
          <svg
            className="ml-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center text-sm font-medium text-zinc-300 hover:text-white"
        onClick={toggleDropdown}
      >
        <span>{languageNames[locale]}</span>
        <svg
          className="ml-1 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-zinc-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => changeLanguage(l)}
              className={`block w-full text-left px-4 py-2 text-sm ${
                locale === l ? 'bg-zinc-700 text-white' : 'text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {languageNames[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}