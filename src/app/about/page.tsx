
"use client";

import { useEffect } from 'react';

// Removed generateMetadata
// Removed import AboutClientPage

const pageTitle = "About Latsubnet";
const intro1 = "Welcome to <strong>Latsubnet</strong>, your go-to destination for seamless and reliable WiFi access! We understand the importance of staying connected in today's fast-paced digital world. That's why we specialize in providing a diverse range of WiFi vouchers meticulously designed to meet your varied internet needs.";
const intro2 = "Whether you're seeking short-term access for a quick task, a high-speed data package for streaming and gaming, or a budget-friendly option for everyday browsing, Latsubnet has you covered. Our core mission is to make internet access simple, affordable, and exceptionally convenient for everyone.";
const intro3 = "We invite you to explore our comprehensive selection of voucher options and experience truly uninterrupted connectivity with Latsubnet. We are passionately committed to offering top-quality service and ensuring you have the best possible online experience every time you connect.";
const outro = "Thank you for choosing Latsubnet. We look forward to keeping you connected!";

export default function AboutPage() {
  useEffect(() => {
    // Title will be composed by layout's template: "About Us - Latsubnet"
    document.title = "About Us"; 
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-200px)]">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          {pageTitle}
        </h1>
      </header>
      
      <div className="max-w-3xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
        <div className="space-y-6 text-lg text-card-foreground leading-relaxed">
          <p dangerouslySetInnerHTML={{ __html: intro1 }} />
          <p>{intro2}</p>
          <p>{intro3}</p>
          <p>{outro}</p>
        </div>
      </div>
    </div>
  );
}
