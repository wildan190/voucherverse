
import type { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { HowToOrderSection } from '@/components/HowToOrderSection';
import { VoucherList } from '@/components/vouchers/VoucherList';

export const metadata: Metadata = {
  title: 'LATSUBNET - Affordable WiFi Vouchers & Internet Packages', // Homepage specific title
  description: 'Explore a wide range of WiFi vouchers at Latsubnet. Get fast and reliable internet access with our best deals and prices in Indonesia.',
  alternates: {
    canonical: '/', // Relative to metadataBase in layout.tsx
    languages: {
      'en': '/',
      'id': '/id',
      'x-default': '/', // Default language version (English)
    },
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <VoucherList />
      <HowToOrderSection />
    </>
  );
}
