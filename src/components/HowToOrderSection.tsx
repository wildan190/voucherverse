
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, FileText, CreditCard, QrCode, CheckCircle2, ArrowDownCircle } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
// import { usePathname } from 'next/navigation'; // No longer directly needed
// import { getTranslator, getCurrentLocaleFromPathname } from '@/lib/i18n'; // Replaced
// import type { Locale } from '@/lib/i18n'; // No longer directly needed
import { useAutoTranslation } from '@/hooks/useAutoTranslation';

const stepIcons = [
  <ShoppingCart key="cart" className="h-8 w-8 md:h-7 md:w-7 text-primary" />,
  <FileText key="file" className="h-8 w-8 md:h-7 md:w-7 text-primary" />,
  <CreditCard key="credit" className="h-8 w-8 md:h-7 md:w-7 text-primary" />,
  <QrCode key="qr" className="h-8 w-8 md:h-7 md:w-7 text-primary" />,
  <CheckCircle2 key="check" className="h-8 w-8 md:h-7 md:w-7 text-primary" />,
];

export function HowToOrderSection() {
  // const pathname = usePathname();
  // const currentLocale = getCurrentLocaleFromPathname(pathname);
  // const t = getTranslator(currentLocale);

  const { translatedText: sectionTitle, isLoading: isLoadingSectionTitle } = useAutoTranslation('howtoorder.title');
  const { translatedText: sectionSubtitle, isLoading: isLoadingSectionSubtitle } = useAutoTranslation('howtoorder.subtitle');
  const { translatedText: buttonBrowse, isLoading: isLoadingButtonBrowse } = useAutoTranslation('howtoorder.button');

  const stepKeys = [
    'howtoorder.step1.title', 'howtoorder.step1.description',
    'howtoorder.step2.title', 'howtoorder.step2.description',
    'howtoorder.step3.title', 'howtoorder.step3.description',
    'howtoorder.step4.title', 'howtoorder.step4.description',
    'howtoorder.step5.title', 'howtoorder.step5.description',
  ] as const; // Use "as const" for type safety with Messages keys
  
  type StepKey = typeof stepKeys[number];

  const translations: Record<StepKey, { text: string; loading: boolean }> = {} as any;
  stepKeys.forEach(key => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { translatedText, isLoading } = useAutoTranslation(key as keyof Messages);
    translations[key as StepKey] = { text: translatedText, loading: isLoading };
  });

  const steps = [
    {
      icon: stepIcons[0],
      titleKey: 'howtoorder.step1.title',
      descriptionKey: 'howtoorder.step1.description',
    },
    {
      icon: stepIcons[1],
      titleKey: 'howtoorder.step2.title',
      descriptionKey: 'howtoorder.step2.description',
    },
    {
      icon: stepIcons[2],
      titleKey: 'howtoorder.step3.title',
      descriptionKey: 'howtoorder.step3.description',
    },
    {
      icon: stepIcons[3],
      titleKey: 'howtoorder.step4.title',
      descriptionKey: 'howtoorder.step4.description',
    },
    {
      icon: stepIcons[4],
      titleKey: 'howtoorder.step5.title',
      descriptionKey: 'howtoorder.step5.description',
    },
  ];

  return (
    <section className="py-16 bg-background" id="how-to-order">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                {isLoadingSectionTitle ? <span className="h-10 w-3/4 mx-auto animate-pulse bg-primary/20 rounded"></span> : sectionTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {isLoadingSectionSubtitle ? <span className="h-6 w-full mx-auto animate-pulse bg-muted-foreground/20 rounded"></span> : sectionSubtitle}
            </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
            <ul className="space-y-8">
              {steps.map((step, index) => (
                <li key={index} className="flex flex-col sm:flex-row items-start bg-card p-6 rounded-xl shadow-lg border border-border hover:border-primary/30 transition-all duration-300 ease-in-out">
                  <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6 p-3 bg-primary/10 rounded-full">
                    {step.icon}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {translations[step.titleKey as StepKey].loading ? <span className="h-6 w-1/2 animate-pulse bg-foreground/20 rounded"></span> : translations[step.titleKey as StepKey].text}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {translations[step.descriptionKey as StepKey].loading ? 
                        <>
                          <span className="block h-4 w-full animate-pulse bg-muted-foreground/20 rounded mb-1"></span>
                          <span className="block h-4 w-3/4 animate-pulse bg-muted-foreground/20 rounded"></span>
                        </>
                       : translations[step.descriptionKey as StepKey].text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
        </div>

        <div className="text-center mt-12">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                <Link href="#voucher-list">
                    <ArrowDownCircle className="mr-2 h-5 w-5" />
                    {isLoadingButtonBrowse ? <span className="h-6 w-32 animate-pulse bg-primary-foreground/30 rounded"></span> : buttonBrowse}
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}

// Need to import Messages type for the hook usage
import type { Messages } from '@/lib/i18n';
