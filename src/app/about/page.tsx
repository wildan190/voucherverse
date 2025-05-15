
import type { Metadata, ResolvingMetadata } from 'next';
import AboutClientPage from './AboutClientPage';

export async function generateMetadata(
  { params }: { params: {} },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const parentOpenGraph = (await parent).openGraph || {};
  const siteName = parentOpenGraph.siteName || 'Latsubnet';

  const metadataBase = (await parent).metadataBase!;
  const basePath = '/about';

  return {
    title: `About Us - ${siteName}`,
    description: `Learn more about ${siteName}, your trusted provider for WiFi vouchers in Indonesia. We offer diverse internet packages to keep you connected seamlessly.`,
    keywords: ['about latsubnet', 'tentang latsubnet', 'wifi voucher indonesia', 'internet packages', 'latsubnet company profile', 'penyedia internet'],
    alternates: {
      canonical: new URL(basePath, metadataBase).toString(),
      // languages removed
    },
  };
}

export default AboutClientPage;
