// src/lib/i18n.ts
import enMessages from '../translations/en.json';
import idMessages from '../translations/id.json';

export type Locale = 'en' | 'id';
export type Messages = typeof enMessages; // Assume 'en' has all keys, or define a common type

const messagesData: Record<Locale, Messages> = {
  en: enMessages,
  id: idMessages,
};

export function getTranslator(locale: Locale) {
  const currentMessages = messagesData[locale] || messagesData.en; // Fallback to 'en'
  const fallbackMessages = messagesData.en;

  return function t(key: keyof Messages): string {
    // @ts-ignore - If Messages is typed strictly, this might not be needed.
    // Or use a more robust way to handle potentially missing keys if id.json might not have all keys from en.json
    return currentMessages[key] || fallbackMessages[key] || String(key);
  };
}

export function getCurrentLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/');
  const potentialLocale = segments[1];
  if (potentialLocale === 'id') {
    return 'id';
  }
  return 'en'; // Default to 'en' if no prefix or unknown prefix
}
