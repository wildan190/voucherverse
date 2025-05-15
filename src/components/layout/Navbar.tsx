
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
// import { usePathname } from 'next/navigation'; // No longer directly needed for t function
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
// import { getTranslator, getCurrentLocaleFromPathname } from '@/lib/i18n'; // Replaced by hook
// import type { Locale } from '@/lib/i18n'; // No longer directly needed
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAutoTranslation } from '@/hooks/useAutoTranslation';

interface NavItem {
  labelKey: 'nav.home' | 'nav.about' | 'nav.contact';
  href: string;
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const pathname = usePathname(); // No longer directly needed for t function
  // const currentLocale = getCurrentLocaleFromPathname(pathname); // Hook handles locale
  // const t = getTranslator(currentLocale); // Replaced by hook

  const navItemsConfig: NavItem[] = [
    { labelKey: 'nav.home', href: '/' },
    { labelKey: 'nav.about', href: '/about' },
    { labelKey: 'nav.contact', href: '/contact' },
  ];

  // State to hold translated labels
  const [navItems, setNavItems] = useState<{label: string, href: string}[]>([]);
  
  const { translatedText: homeLabel, isLoading: isLoadingHome } = useAutoTranslation('nav.home');
  const { translatedText: aboutLabel, isLoading: isLoadingAbout } = useAutoTranslation('nav.about');
  const { translatedText: contactLabel, isLoading: isLoadingContact } = useAutoTranslation('nav.contact');

  useEffect(() => {
    setNavItems([
      { label: isLoadingHome ? 'Home...' : homeLabel, href: '/' },
      { label: isLoadingAbout ? 'About...' : aboutLabel, href: '/about' },
      { label: isLoadingContact ? 'Contact...' : contactLabel, href: '/contact' },
    ]);
  }, [homeLabel, aboutLabel, contactLabel, isLoadingHome, isLoadingAbout, isLoadingContact]);


  return (
    <nav className="bg-background text-foreground shadow-md sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-primary hover:text-primary/80 transition-colors">
            <span>Latsubnet</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button key={item.href} variant="ghost" asChild>
                <Link
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  {item.label}
                </Link>
              </Button>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <LanguageSwitcher />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:text-primary ml-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] bg-background text-foreground p-4">
                <div className="flex flex-col space-y-4 mt-6">
                  {navItems.map((item) => (
                     <Button key={item.href} variant="ghost" asChild className="justify-start">
                        <Link
                          href={item.href}
                          className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                     </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
