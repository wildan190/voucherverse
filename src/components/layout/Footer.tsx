
"use client"; // Needs to be a client component for i18n

import { usePathname } from 'next/navigation';
import { getTranslator, getCurrentLocaleFromPathname } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

export function Footer() {
  const pathname = usePathname();
  const currentLocale = getCurrentLocaleFromPathname(pathname);
  const t = getTranslator(currentLocale);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground text-center py-6 border-t border-border">
      <div className="container mx-auto px-4">
        <p className="text-sm">&copy; {currentYear} {t('footer.copyright')}</p>
      </div>
    </footer>
  );
}
