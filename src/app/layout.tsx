
import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { FloatingWhatsAppButton } from '@/components/FloatingWhatsAppButton';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteDomain = 'https://latsubnet.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteDomain),
  title: {
    default: 'LATSUBNET - Find Your Perfect WiFi Voucher',
    template: '%s | Latsubnet',
  },
  description: 'Best Deals, Best Prices, Just for You! Latsubnet offers a variety of WiFi vouchers for seamless internet access in Indonesia.',
  keywords: ['WiFi voucher', 'internet voucher', 'Latsubnet', 'beli voucher WiFi', 'paket internet', 'hotspot voucher', 'Indonesia internet', 'voucher WiFi murah', 'akses internet cepat'],
  openGraph: {
    title: 'LATSUBNET - WiFi Vouchers',
    description: 'Find the best WiFi voucher deals with Latsubnet. Fast, reliable, and affordable internet access.',
    url: siteDomain,
    siteName: 'Latsubnet',
    images: [
      {
        url: `${siteDomain}/og-image.png`, // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: 'Latsubnet WiFi Vouchers',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LATSUBNET - WiFi Vouchers',
    description: 'Discover affordable and reliable WiFi vouchers at Latsubnet.',
    // images: [`${siteDomain}/twitter-image.png`], // Replace with your actual Twitter image URL
    // siteId: 'YOUR_TWITTER_SITE_ID', // Optional: Your Twitter site ID
    // creator: '@YOUR_TWITTER_HANDLE', // Optional: Your Twitter handle
  },
  icons: { // Optional: Add favicon and other icons
    icon: '/favicon.ico',
    // apple: '/apple-touch-icon.png',
  },
  // manifest: '/site.webmanifest', // Optional: For PWA capabilities
};

const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "SB-Mid-client-OVHobrlLdKtUpsyk";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
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
