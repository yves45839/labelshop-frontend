import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignore les erreurs ESLint au build
  },
};

module.exports = {
  images: {
    domains: ['labelshop-backend.onrender.com', 'labr1.odoo.com'],
  },
};


export default nextConfig;
