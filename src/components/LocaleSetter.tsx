// src/components/LocaleSetter.tsx
"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getCurrentLocaleFromPathname } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';


export function LocaleSetter() {
  const pathname = usePathname();
  
  useEffect(() => {
    const currentLocale: Locale = getCurrentLocaleFromPathname(pathname);
    if (document.documentElement.lang !== currentLocale) {
      document.documentElement.lang = currentLocale;
    }
  }, [pathname]);

  return null;
}
