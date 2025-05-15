import { Button } from "@/components/ui/button";
import Link from 'next/link';

export function HeroSection() {
  return (
    <header 
      className="relative bg-cover bg-center text-white py-32 md:py-48"
      style={{ backgroundImage: "url('https://placehold.co/1600x900.png')" }}
      data-ai-hint="internet technology"
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Find Your Perfect Voucher
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8">
          Best Deals, Best Prices, Just for You!
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="#voucher-list">Explore Now</Link>
        </Button>
      </div>
    </header>
  );
}
