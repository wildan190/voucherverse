
"use client";

import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { Phone, MessageSquare } from 'lucide-react';
import { useAutoTranslation } from '@/hooks/useAutoTranslation';

export async function generateMetadata(
  { params }: { params: {} },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const parentOpenGraph = (await parent).openGraph || {};
  const siteName = parentOpenGraph.siteName || 'Latsubnet';

  const currentCanonicalUrl = (await parent).url;
  const metadataBase = (await parent).metadataBase!;

  const enPath = '/contact';
  const idPath = '/id/contact';

  return {
    title: `Contact Us - ${siteName}`,
    description: `Get in touch with ${siteName} for support and inquiries about our WiFi vouchers. Contact us via WhatsApp for a quick response.`,
    keywords: ['contact latsubnet', 'kontak latsubnet', 'latsubnet support', 'whatsapp latsubnet', 'customer service wifi voucher'],
    alternates: {
      canonical: currentCanonicalUrl,
      languages: {
        'en': new URL(enPath, metadataBase).toString(),
        'id': new URL(idPath, metadataBase).toString(),
        'x-default': new URL(enPath, metadataBase).toString(),
      },
    },
  };
}

export default function ContactPage() {
  const { translatedText: pageTitle, isLoading: isLoadingPageTitle } = useAutoTranslation('contact.title');
  const { translatedText: intro, isLoading: isLoadingIntro } = useAutoTranslation('contact.intro');
  const { translatedText: whatsappTitle, isLoading: isLoadingWhatsappTitle } = useAutoTranslation('contact.whatsapp.title');
  const { translatedText: whatsappPrompt, isLoading: isLoadingWhatsappPrompt } = useAutoTranslation('contact.whatsapp.prompt');
  const { translatedText: whatsappButton, isLoading: isLoadingWhatsappButton } = useAutoTranslation('contact.whatsapp.button');
  const { translatedText: outro1, isLoading: isLoadingOutro1 } = useAutoTranslation('contact.outro1');
  const { translatedText: outro2, isLoading: isLoadingOutro2 } = useAutoTranslation('contact.outro2');

  const whatsappNumber = "6281996926744"; 
  const displayWhatsappNumber = "+62 819 9692 6744"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  
  const renderText = (text: string, isLoading: boolean) => {
    if (isLoading) return <span className="h-5 bg-muted-foreground/20 rounded w-full animate-pulse inline-block"></span>;
    return text;
  };
  
  const renderParagraph = (text: string, isLoading: boolean) => {
    if (isLoading) return <p className="h-5 bg-muted-foreground/20 rounded w-full animate-pulse mb-2"></p>;
    return <p>{text}</p>;
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-200px)]">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          {isLoadingPageTitle ? <span className="h-12 w-1/2 mx-auto animate-pulse bg-primary/20 rounded"></span> : pageTitle}
        </h1>
      </header>
      
      <div className="max-w-2xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
        <div className="space-y-6 text-lg text-card-foreground leading-relaxed text-center">
          {renderParagraph(intro, isLoadingIntro)}
          
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center justify-center">
              <MessageSquare className="mr-3 h-8 w-8" />
              {renderText(whatsappTitle, isLoadingWhatsappTitle)}
            </h2>
            <p className="mb-3">
              {renderText(whatsappPrompt, isLoadingWhatsappPrompt)}
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
              {isLoadingWhatsappButton ? <span className="h-6 w-32 animate-pulse bg-accent-foreground/30 rounded"></span> : whatsappButton}
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-border space-y-4">
             {renderParagraph(outro1, isLoadingOutro1)}
             {renderParagraph(outro2, isLoadingOutro2)}
          </div>
        </div>
      </div>
    </div>
  );
}
