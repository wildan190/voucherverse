
"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { Phone, MessageSquare } from 'lucide-react';

// Removed generateMetadata
// Removed import ContactClientPage

const pageTitle = "Contact Us";
const intro = "Have questions, need assistance with a voucher, or just want to say hello? We're here to help! The best way to reach us is via WhatsApp for prompt support.";
const whatsappTitle = "Chat with Us on WhatsApp";
const whatsappPrompt = "For quick assistance, tap the button below or send a message to:";
const whatsappButton = "Open WhatsApp Chat";
const outro1 = "Our dedicated team is available to assist you with any inquiries regarding our WiFi vouchers, the payment process, or any other concerns you may have. We strive to provide timely and helpful responses.";
const outro2 = "We look forward to hearing from you!";

export default function ContactPage() {
  const whatsappNumber = "6281996926744"; 
  const displayWhatsappNumber = "+62 819 9692 6744"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  useEffect(() => {
    // Title will be composed by layout's template: "Contact Us - Latsubnet"
    document.title = "Contact Us";
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-200px)]">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          {pageTitle}
        </h1>
      </header>
      
      <div className="max-w-2xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
        <div className="space-y-6 text-lg text-card-foreground leading-relaxed text-center">
          <p>{intro}</p>
          
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center justify-center">
              <MessageSquare className="mr-3 h-8 w-8" />
              {whatsappTitle}
            </h2>
            <p className="mb-3">
              {whatsappPrompt}
            </p>
            <p className="font-bold text-2xl text-accent mb-6 tracking-wider">
              {displayWhatsappNumber}
            </p>
            <Link
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-medium rounded-lg shadow-md transition-colors text-lg"
              aria-label="Chat on WhatsApp"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              {whatsappButton}
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-border space-y-4">
             <p>{outro1}</p>
             <p>{outro2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
