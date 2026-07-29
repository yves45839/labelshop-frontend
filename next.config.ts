import type { NextConfig } from 'next';

const PRIVATE_PATHS = [
  '/cart',
  '/orders',
  '/stock',
  '/inventory',
  '/accounts/:path*',
  '/products/create',
  '/blogs/create',
  '/blogs/import',
];

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignore les erreurs ESLint bloquantes au build
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lr-samr.pythonanywhere.com' },
      { protocol: 'https', hostname: 'labr1.odoo.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    loader: 'custom',
    loaderFile: './lib/imageLoader.ts',
  },
  async redirects() {
    return [
      {
        // Canonicalisation www → apex (filet applicatif, la vraie 301 se fait côté DNS/hébergeur)
        source: '/:path*',
        has: [{ type: 'host', value: 'www.labelretail.ci' }],
        destination: 'https://labelretail.ci/:path*',
        permanent: true,
      },
      {
        source: '/shop/:slug',       // 🔁 ancienne structure
        destination: '/products/:slug', // ✅ nouvelle structure
        permanent: true,             // 🔁 redirection 301
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      ...PRIVATE_PATHS.map((source) => ({
        source,
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      })),
    ];
  },
};

export default nextConfig;
