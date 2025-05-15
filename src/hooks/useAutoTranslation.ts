
"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getCurrentLocaleFromPathname } from '@/lib/i18n';
import { translateText } from '@/ai/flows/translate-text-flow';
import type { Messages, Locale } from '@/lib/i18n';

// Eagerly load JSON data
import enMessagesData from '@/translations/en.json';
import idMessagesData from '@/translations/id.json';

const messagesData: Record<Locale, Messages> = {
  en: enMessagesData,
  id: idMessagesData,
};

export function useAutoTranslation(key: keyof Messages) {
  const pathname = usePathname();
  const locale = getCurrentLocaleFromPathname(pathname);
  
  const getInitialText = () => {
    const englishText = messagesData.en[key] || String(key);
    if (locale === 'id') {
      return messagesData.id[key] || englishText; // Show Indonesian if available, else English
    }
    return englishText; // Show English for 'en' locale
  };

  const [translatedText, setTranslatedText] = useState<string>(getInitialText());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const englishText = messagesData.en[key];

    if (!englishText) {
      setTranslatedText(String(key)); // Key itself if English text is missing
      return;
    }

    if (locale === 'en') {
      setTranslatedText(englishText);
      return;
    }

    // For 'id' locale
    const indonesianTextInJson = messagesData.id[key];
    if (indonesianTextInJson) { // Check if translation already exists in id.json
      setTranslatedText(indonesianTextInJson);
      return;
    }

    // If 'id' and no pre-existing translation in id.json, then auto-translate
    setIsLoading(true);
    // Set to English text temporarily while loading AI translation
    setTranslatedText(englishText); 
    
    translateText({ textToTranslate: englishText, targetLanguageCode: locale })
      .then(result => {
        if (result && result.translatedText) {
          setTranslatedText(result.translatedText);
        } else {
          // If translation result is empty or malformed, fallback to English
          setTranslatedText(englishText);
        }
      })
      .catch(error => {
        console.error("Auto-translation failed for key:", key, error);
        setTranslatedText(englishText); // Fallback to English on error
      })
      .finally(() => {
        setIsLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, locale, pathname]); // Add pathname to re-trigger on URL change if key/locale logic depends on it indirectly via getInitialText's locale capture

  return { translatedText, isLoading };
}
