// src/components/layout/LanguageSwitcher.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import type { Locale } from '@/lib/i18n';
import { getCurrentLocaleFromPathname } from '@/lib/i18n';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = getCurrentLocaleFromPathname(pathname);

  // Function to construct the path without the current locale prefix if it exists
  const getPathWithoutLocale = () => {
    if (currentLocale === 'en' && pathname.startsWith('/en')) {
      return pathname.substring(3) || '/'; // Remove /en
    }
    if (currentLocale === 'id' && pathname.startsWith('/id')) {
      return pathname.substring(3) || '/'; // Remove /id
    }
    return pathname; // Path already has no prefix or is for default locale
  };
  
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant={currentLocale === 'en' ? 'secondary' : 'ghost'}
        size="sm"
        asChild
        className={`px-2 py-1 text-xs font-medium ${currentLocale === 'en' ? 'bg-primary/20 text-primary' : 'text-foreground'}`}
      >
        <Link href={pathWithoutLocale} locale="en">
          EN
        </Link>
      </Button>
      <Button
        variant={currentLocale === 'id' ? 'secondary' : 'ghost'}
        size="sm"
        asChild
        className={`px-2 py-1 text-xs font-medium ${currentLocale === 'id' ? 'bg-primary/20 text-primary' : 'text-foreground'}`}
      >
        <Link href={pathWithoutLocale} locale="id">
          ID
        </Link>
      </Button>
    </div>
  );
}
