
import type { Metadata, ResolvingMetadata } from 'next';
import ContactClientPage from './ContactClientPage';

export async function generateMetadata(
  { params }: { params: {} },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const parentOpenGraph = (await parent).openGraph || {};
  const siteName = parentOpenGraph.siteName || 'Latsubnet';

  const currentCanonicalUrl = (await parent).url;
  const metadataBase = (await parent).metadataBase!;

  const enPath = '/contact';
  const idPath = '/id/contact';

  return {
    title: `Contact Us - ${siteName}`,
    description: `Get in touch with ${siteName} for support and inquiries about our WiFi vouchers. Contact us via WhatsApp for a quick response.`,
    keywords: ['contact latsubnet', 'kontak latsubnet', 'latsubnet support', 'whatsapp latsubnet', 'customer service wifi voucher'],
    alternates: {
      canonical: currentCanonicalUrl?.toString(),
      languages: {
        'en': new URL(enPath, metadataBase).toString(),
        'id': new URL(idPath, metadataBase).toString(),
        'x-default': new URL(enPath, metadataBase).toString(),
      },
    },
  };
}

export default ContactClientPage;
