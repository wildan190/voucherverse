
import { HeroSection } from '@/components/HeroSection';
import { HowToOrderSection } from '@/components/HowToOrderSection';
import { VoucherList } from '@/components/vouchers/VoucherList';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <VoucherList />
      <HowToOrderSection />
    </>
  );
}
