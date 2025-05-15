
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, FileText, CreditCard, QrCode, CheckCircle2, ArrowDownCircle } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const stepIcons = [
  <ShoppingCart key="cart" className="h-8 w-8 md:h-7 md:w-7 text-primary" />,
  <FileText key="file" className="h-8 w-8 md:h-7 md:w-7 text-primary" />,
  <CreditCard key="credit" className="h-8 w-8 md:h-7 md:w-7 text-primary" />,
  <QrCode key="qr" className="h-8 w-8 md:h-7 md:w-7 text-primary" />,
  <CheckCircle2 key="check" className="h-8 w-8 md:h-7 md:w-7 text-primary" />,
];

const sectionTitle = "Simple Steps to Your Voucher";
const sectionSubtitle = "Getting your internet voucher is quick and easy. Follow these steps to get connected in no time.";
const buttonBrowse = "Start Browsing Vouchers";

const stepsData = [
  {
    icon: stepIcons[0],
    title: "1. Choose Your Voucher",
    description: "Explore our diverse range of internet voucher packages. Click on a voucher card to view more details or hit 'Buy Now' when you've found the perfect one for your needs.",
  },
  {
    icon: stepIcons[1],
    title: "2. Provide Your Details",
    description: "After selecting your voucher, you'll be prompted to enter your full name and email address. This information is crucial for us to deliver your voucher to you.",
  },
  {
    icon: stepIcons[2],
    title: "3. Select Your Payment Method",
    description: "Proceed to our secure payment gateway. You can choose from various convenient payment options, including QRIS (e.g., GoPay, OVO, Dana, ShopeePay) and Virtual Account transfers from major banks.",
  },
  {
    icon: stepIcons[3],
    title: "4. Paying with QRIS (e.g., GoPay)",
    description: "If you choose QRIS: Ensure you have a compatible app like GoPay (downloadable from the Play Store). Top up your GoPay balance if needed (GoPay supports top-ups via Visa, Mastercard, and other methods within their app). Then, simply scan the QRIS code displayed at our checkout using your GoPay app to complete the payment instantly.",
  },
  {
    icon: stepIcons[4],
    title: "5. Complete Payment & Receive Voucher",
    description: "Follow the on-screen instructions to finalize your payment. Once confirmed, your voucher will be automatically downloaded in PDF format, ready for you to use. Enjoy your seamless internet access!",
  },
];

export function HowToOrderSection() {
  return (
    <section className="py-16 bg-background" id="how-to-order">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                {sectionTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {sectionSubtitle}
            </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
            <ul className="space-y-8">
              {stepsData.map((step, index) => (
                <li key={index} className="flex flex-col sm:flex-row items-start bg-card p-6 rounded-xl shadow-lg border border-border hover:border-primary/30 transition-all duration-300 ease-in-out">
                  <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6 p-3 bg-primary/10 rounded-full">
                    {step.icon}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
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
                    {buttonBrowse}
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
