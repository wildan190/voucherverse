
"use client"; // Needs to be a client component to use hooks for i18n

import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getTranslator, getCurrentLocaleFromPathname } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

export function HeroSection() {
  const pathname = usePathname();
  const currentLocale = getCurrentLocaleFromPathname(pathname);
  const t = getTranslator(currentLocale);

  return (
    <header 
      className="relative bg-gradient-to-br from-primary via-primary/70 to-accent text-white py-32 md:py-48"
    >
      <div className="absolute inset-0 bg-black opacity-20"></div> 
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-md">
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 drop-shadow-sm">
          {t('hero.subtitle')}
        </p>
        <Button asChild size="lg" className="bg-white hover:bg-white/90 text-primary shadow-lg font-semibold">
          <Link href="#voucher-list">{t('hero.button')}</Link>
        </Button>
      </div>
    </header>
  );
}
