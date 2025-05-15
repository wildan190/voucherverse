
import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, MessageSquare } from 'lucide-react'; // Using MessageSquare for a WhatsApp-like icon

export const metadata: Metadata = {
  title: 'Contact Us - Latsubnet',
  description: 'Get in touch with Latsubnet for support and inquiries via WhatsApp.',
};

export default function ContactPage() {
  const whatsappNumber = "6281996926744"; // Number for wa.me link (no + or special characters)
  const displayWhatsappNumber = "+62 819 9692 6744"; // Number for display
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-200px)]"> {/* Adjusted min-height */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Contact Us</h1>
      </header>
      
      <div className="max-w-2xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
        <div className="space-y-6 text-lg text-card-foreground leading-relaxed text-center">
          <p>
            Have questions, need assistance with a voucher, or just want to say hello? 
            We're here to help! The best way to reach us is via WhatsApp for prompt support.
          </p>
          
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center justify-center">
              <MessageSquare className="mr-3 h-8 w-8" />
              Chat with Us on WhatsApp
            </h2>
            <p className="mb-3">
              For quick assistance, tap the button below or send a message to:
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
              Open WhatsApp Chat
            </Link>
          </div>

          <p className="mt-8 pt-6 border-t border-border">
            Our dedicated team is available to assist you with any inquiries regarding our WiFi vouchers, 
            the payment process, or any other concerns you may have. We strive to provide timely and helpful responses.
          </p>
          <p>
            We look forward to hearing from you!
          </p>
        </div>
      </div>
    </div>
  );
}
