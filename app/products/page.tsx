import type { Metadata } from 'next';
import ProductsPageClient from '@/components/ProductsPageClient';

export const metadata: Metadata = {
  title: 'Nos produits',
  description: "Caméras, alarmes, contrôle d'accès et accessoires : tout le matériel que Label Retail installe et maintient en Côte d'Ivoire.",
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
