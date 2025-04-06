export const defaultLocale = 'ja';
export const locales = ['ja', 'en'];
export type Locale = typeof locales[number];

export interface Messages {
  [key: string]: string | Messages;
}

export interface LocaleMessages {
  [locale: string]: Messages;
}

export function getNestedValue(obj: Messages, path: string): string {
  const keys = path.split('.');
  let current: any = obj;

  for (const key of keys) {
    if (current[key] === undefined) {
      console.warn(`Translation key not found: ${path}`);
      return path;
    }
    current = current[key];
  }

  if (typeof current !== 'string') {
    console.warn(`Translation value is not a string: ${path}`);
    return path;
  }

  return current;
}