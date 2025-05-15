
"use client";

import { useAutoTranslation } from '@/hooks/useAutoTranslation';

export function Footer() {
  const { translatedText: copyrightText, isLoading: isLoadingCopyright } = useAutoTranslation('footer.copyright');
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);


  return (
    <footer className="bg-muted text-muted-foreground text-center py-6 border-t border-border">
      <div className="container mx-auto px-4">
        {isLoadingCopyright || currentYear === null ? (
          <p className="text-sm h-5 animate-pulse bg-muted-foreground/20 rounded w-1/3 mx-auto"></p>
        ) : (
          <p className="text-sm">&copy; {currentYear} {copyrightText}</p>
        )}
      </div>
    </footer>
  );
}

// Need to import useState and useEffect for currentYear
import { useState, useEffect } from 'react';
