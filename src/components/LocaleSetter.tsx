// src/components/LocaleSetter.tsx
"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { getCurrentLocaleFromPathname } from '@/lib/i18n';


export function LocaleSetter() {
  const pathname = usePathname();
  
  useEffect(() => {
    const currentLocale = getCurrentLocaleFromPathname(pathname);
    document.documentElement.lang = currentLocale;
  }, [pathname]);

  return null;
}
