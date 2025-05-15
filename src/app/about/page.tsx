
"use client";

import type { Metadata } from 'next'; // Metadata remains static for now
import { usePathname } from 'next/navigation';
import { getTranslator, getCurrentLocaleFromPathname } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

// export const metadata: Metadata = { // Cannot be dynamic this way in client component
//   title: 'About Us - Latsubnet',
//   description: 'Learn more about Latsubnet and our WiFi voucher services.',
// };

export default function AboutPage() {
  const pathname = usePathname();
  const currentLocale = getCurrentLocaleFromPathname(pathname);
  const t = getTranslator(currentLocale);

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-200px)]">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">{t('about.title')}</h1>
      </header>
      
      <div className="max-w-3xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
        <div className="space-y-6 text-lg text-card-foreground leading-relaxed">
          <p dangerouslySetInnerHTML={{ __html: t('about.intro1') }} />
          <p>{t('about.intro2')}</p>
          <p>{t('about.intro3')}</p>
          <p>{t('about.outro')}</p>
        </div>
      </div>
    </div>
  );
}
