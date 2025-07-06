import type { Metadata } from 'next';
import ProductsPageClient from '@/components/ProductsPageClient';

export const metadata: Metadata = {
  title: 'Nos produits',
  description: "Découvrez notre catalogue complet de solutions Label Retail",
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
