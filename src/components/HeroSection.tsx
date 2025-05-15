
"use client";

import { Button } from "@/components/ui/button";
import Link from 'next/link';
// import { usePathname } from 'next/navigation'; // No longer directly needed
// import { getTranslator, getCurrentLocaleFromPathname } from '@/lib/i18n'; // Replaced
// import type { Locale } from '@/lib/i18n'; // No longer directly needed
import { useAutoTranslation } from '@/hooks/useAutoTranslation';

export function HeroSection() {
  // const pathname = usePathname();
  // const currentLocale = getCurrentLocaleFromPathname(pathname);
  // const t = getTranslator(currentLocale);

  const { translatedText: title, isLoading: isLoadingTitle } = useAutoTranslation('hero.title');
  const { translatedText: subtitle, isLoading: isLoadingSubtitle } = useAutoTranslation('hero.subtitle');
  const { translatedText: buttonText, isLoading: isLoadingButton } = useAutoTranslation('hero.button');

  return (
    <header 
      className="relative bg-gradient-to-br from-primary via-primary/70 to-accent text-white py-32 md:py-48"
    >
      <div className="absolute inset-0 bg-black opacity-20"></div> 
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-md">
          {isLoadingTitle ? <span className="h-12 w-3/4 mx-auto animate-pulse bg-white/30 rounded"></span> : title}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 drop-shadow-sm">
          {isLoadingSubtitle ? <span className="h-8 w-1/2 mx-auto animate-pulse bg-white/30 rounded"></span> : subtitle}
        </p>
        <Button asChild size="lg" className="bg-white hover:bg-white/90 text-primary shadow-lg font-semibold">
          <Link href="#voucher-list">
            {isLoadingButton ? <span className="h-6 w-24 animate-pulse bg-primary/30 rounded"></span> : buttonText}
          </Link>
        </Button>
      </div>
    </header>
  );
}
