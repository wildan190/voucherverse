
import type { MetadataRoute } from 'next';

const domain = 'https://latsubnet.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Define base paths for your pages
  const basePaths = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    // Add other static paths here if needed
  ];

  const sitemapEntries: MetadataRoute.Sitemap = basePaths.map(basePathInfo => {
    const url = `${domain}${basePathInfo.path}`;
    return {
      url: url,
      lastModified,
      changeFrequency: basePathInfo.changeFrequency,
      priority: basePathInfo.priority,
    };
  });

  // Note: For dynamic routes like /voucher/[id], you would typically fetch all possible IDs
  // and generate an entry for each. For simplicity, this example only includes static pages.
  // Example for dynamic routes (if you had a way to get all voucher IDs):
  // const voucherIds = await getAllVoucherIds(); // Placeholder function
  // voucherIds.forEach(id => {
  //   const voucherUrl = `${domain}/voucher/${id}`;
  //   sitemapEntries.push({ url: voucherUrl, lastModified });
  // });

  return sitemapEntries;
}
