
"use client";

import type { Metadata } from 'next'; // Metadata remains static for now
import Link from 'next/link';
import { Phone, MessageSquare } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getTranslator, getCurrentLocaleFromPathname } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

// export const metadata: Metadata = { // Cannot be dynamic this way in client component
//   title: 'Contact Us - Latsubnet',
//   description: 'Get in touch with Latsubnet for support and inquiries via WhatsApp.',
// };

export default function ContactPage() {
  const pathname = usePathname();
  const currentLocale = getCurrentLocaleFromPathname(pathname);
  const t = getTranslator(currentLocale);

  const whatsappNumber = "6281996926744"; 
  const displayWhatsappNumber = "+62 819 9692 6744"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-200px)]">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">{t('contact.title')}</h1>
      </header>
      
      <div className="max-w-2xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
        <div className="space-y-6 text-lg text-card-foreground leading-relaxed text-center">
          <p>
            {t('contact.intro')}
          </p>
          
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center justify-center">
              <MessageSquare className="mr-3 h-8 w-8" />
              {t('contact.whatsapp.title')}
            </h2>
            <p className="mb-3">
              {t('contact.whatsapp.prompt')}
            </p>
            <p className="font-bold text-2xl text-accent mb-6 tracking-wider">
              {displayWhatsappNumber}
            </p>
            <Link
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-medium rounded-lg shadow-md transition-colors text-lg"
              aria-label="Chat on WhatsApp"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              {t('contact.whatsapp.button')}
            </Link>
          </div>

          <p className="mt-8 pt-6 border-t border-border">
            {t('contact.outro1')}
          </p>
          <p>
            {t('contact.outro2')}
          </p>
        </div>
      </div>
    </div>
  );
}
