import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/cart',
          '/orders',
          '/stock',
          '/inventory',
          '/accounts/',
          '/products/create',
          '/blogs/create',
          '/blogs/import',
          '/*/edit',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
