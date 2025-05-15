
"use client";

import Link from 'next/link';
import { MessageSquare } from 'lucide-react'; // Using MessageSquare as a generic chat icon

export function FloatingWhatsAppButton() {
  const whatsappNumber = "6281996926744"; // Number for wa.me link (no + or special characters)
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-accent hover:bg-accent/80 text-accent-foreground p-4 rounded-full shadow-xl transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <MessageSquare size={28} strokeWidth={2.5} />
    </Link>
  );
}
