
"use client";

import { useEffect } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { HowToOrderSection } from '@/components/HowToOrderSection';
import { VoucherList } from '@/components/vouchers/VoucherList';

// Removed export const metadata

export default function HomePage() {
  useEffect(() => {
    document.title = "LATSUBNET - Affordable WiFi Vouchers & Internet Packages";
  }, []);

  return (
    <>
      <HeroSection />
      <VoucherList />
      <HowToOrderSection />
    </>
  );
}
