
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, FileText, CreditCard, QrCode, CheckCircle2, ArrowDownCircle } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { getTranslator, getCurrentLocaleFromPathname } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

export function HowToOrderSection() {
  const pathname = usePathname();
  const currentLocale = getCurrentLocaleFromPathname(pathname);
  const t = getTranslator(currentLocale);

  const steps = [
    {
      icon: <ShoppingCart className="h-8 w-8 md:h-7 md:w-7 text-primary" />,
      title: t('howtoorder.step1.title'),
      description: t('howtoorder.step1.description'),
    },
    {
      icon: <FileText className="h-8 w-8 md:h-7 md:w-7 text-primary" />,
      title: t('howtoorder.step2.title'),
      description: t('howtoorder.step2.description'),
    },
    {
      icon: <CreditCard className="h-8 w-8 md:h-7 md:w-7 text-primary" />,
      title: t('howtoorder.step3.title'),
      description: t('howtoorder.step3.description'),
    },
    {
      icon: <QrCode className="h-8 w-8 md:h-7 md:w-7 text-primary" />,
      title: t('howtoorder.step4.title'),
      description: t('howtoorder.step4.description'),
    },
    {
      icon: <CheckCircle2 className="h-8 w-8 md:h-7 md:w-7 text-primary" />,
      title: t('howtoorder.step5.title'),
      description: t('howtoorder.step5.description'),
    },
  ];

  return (
    <section className="py-16 bg-background" id="how-to-order">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                {t('howtoorder.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('howtoorder.subtitle')}
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
                    <h3 className="text-xl font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </li>
              ))}
            </ul>
        </div>

        <div className="text-center mt-12">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                <Link href="#voucher-list">
                    <ArrowDownCircle className="mr-2 h-5 w-5" />
                    {t('howtoorder.button')}
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
