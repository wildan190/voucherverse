
import type { Metadata, ResolvingMetadata } from 'next';
import ContactClientPage from './ContactClientPage';

export async function generateMetadata(
  { params }: { params: {} },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const parentOpenGraph = (await parent).openGraph || {};
  const siteName = parentOpenGraph.siteName || 'Latsubnet';

  const metadataBase = (await parent).metadataBase!;
  const basePath = '/contact';

  return {
    title: `Contact Us - ${siteName}`,
    description: `Get in touch with ${siteName} for support and inquiries about our WiFi vouchers. Contact us via WhatsApp for a quick response.`,
    keywords: ['contact latsubnet', 'kontak latsubnet', 'latsubnet support', 'whatsapp latsubnet', 'customer service wifi voucher'],
    alternates: {
      canonical: new URL(basePath, metadataBase).toString(),
      // languages removed
    },
  };
}

export default ContactClientPage;
