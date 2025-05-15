
import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { FloatingWhatsAppButton } from '@/components/FloatingWhatsAppButton';
import { LocaleSetter } from '@/components/LocaleSetter'; // Added import

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Note: Making metadata dynamic based on locale requires more advanced setup,
// typically involving generating metadata in page.tsx or layout.tsx using params.locale
// if using [locale] segments, or fetching translations.
// For now, it remains static.
export const metadata: Metadata = {
  title: 'LATSUBNET - Find Your Perfect Voucher',
  description: 'Best Deals, Best Prices, Just for You!',
};

const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "SB-Mid-client-OVHobrlLdKtUpsyk";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> {/* Default lang, LocaleSetter will update it client-side. Added suppressHydrationWarning */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <LocaleSetter /> {/* Add LocaleSetter here */}
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
        <FloatingWhatsAppButton />
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={MIDTRANS_CLIENT_KEY}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
