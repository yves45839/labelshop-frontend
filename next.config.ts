import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignore les erreurs ESLint bloquantes au build
  },
  images: {
    domains: ['labelshop-backend.onrender.com', 'labr1.odoo.com'],
    loader: 'custom',
    loaderFile: './lib/imageLoader.ts',
  },
  async redirects() {
    return [
      {
        source: '/shop/:slug',       // 🔁 ancienne structure
        destination: '/products/:slug', // ✅ nouvelle structure
        permanent: true,             // 🔁 redirection 301
      },
    ];
  },
};

export default nextConfig;
