
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Latsubnet',
  description: 'Learn more about Latsubnet and our WiFi voucher services.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-200px)]"> {/* Adjusted min-height for content visibility */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">About Latsubnet</h1>
      </header>
      
      <div className="max-w-3xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
        <div className="space-y-6 text-lg text-card-foreground leading-relaxed">
          <p>
            Welcome to <strong>Latsubnet</strong>, your go-to destination for seamless and reliable WiFi access! 
            We understand the importance of staying connected in today's fast-paced digital world. 
            That's why we specialize in providing a diverse range of WiFi vouchers meticulously designed to 
            meet your varied internet needs.
          </p>
          <p>
            Whether you're seeking short-term access for a quick task, a high-speed data package for 
            streaming and gaming, or a budget-friendly option for everyday browsing, Latsubnet has you covered. 
            Our core mission is to make internet access simple, affordable, and exceptionally convenient for everyone.
          </p>
          <p>
            We invite you to explore our comprehensive selection of voucher options and experience truly 
            uninterrupted connectivity with Latsubnet. We are passionately committed to offering top-quality 
            service and ensuring you have the best possible online experience every time you connect.
          </p>
          <p>
            Thank you for choosing Latsubnet. We look forward to keeping you connected!
          </p>
        </div>
      </div>
    </div>
  );
}
