
import type { Metadata, ResolvingMetadata } from 'next';
import VoucherClientPage from './VoucherClientPage';

// This function would ideally fetch voucher details on the server for metadata.
// For now, we'll use placeholder data or data derived from params for metadata.
// async function getVoucherForMetadata(id: string): Promise<Partial<Voucher> | null> {
//   try {
//     const response = await fetch(`http://127.0.0.1:8000/api/detail-voucher/${id}`);
//     if (!response.ok) return null;
//     const data = await response.json();
//     return data.success ? data.data : null;
//   } catch (error) {
//     console.error("Error fetching voucher for metadata:", error);
//     return null;
//   }
// }

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const voucherId = params.id;
  // const voucher = await getVoucherForMetadata(voucherId);

  // Using placeholders or data from params until server-side fetch is fully integrated here
  const voucherName = `Voucher ${voucherId}`; // Placeholder: use voucher.name if fetched
  const voucherDescription = `Purchase WiFi voucher ${voucherId} for fast internet. Check details and buy now.`; // Placeholder

  const parentOpenGraph = (await parent).openGraph || {};
  const siteName = parentOpenGraph.siteName || 'Latsubnet';

  const currentCanonicalUrl = (await parent).url;
  const metadataBase = (await parent).metadataBase!;

  // Base paths without locale prefix
  const basePath = `/voucher/${voucherId}`;
  const enPath = basePath;
  const idPath = `/id${basePath}`;

  return {
    title: `${voucherName} - ${siteName}`,
    description: voucherDescription,
    keywords: ['buy wifi voucher', `voucher ${voucherId}`, 'internet package details', 'latsubnet voucher', `beli voucher ${voucherId}`],
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

export default VoucherClientPage;
