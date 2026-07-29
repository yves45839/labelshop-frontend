import type { Metadata } from 'next';
import ProductsPageClient from '@/components/ProductsPageClient';
import { MAIN_CATEGORIES } from '@/lib/category';
import {
  groupProductsByCategory,
  listProductsServer,
  type ProductsByCategory,
} from '@/lib/products';
import { buildMetadata } from '@/lib/seo';

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Nos produits — vidéosurveillance, alarme et contrôle d\'accès',
  description:
    "Caméras, alarmes, contrôle d'accès et accessoires : tout le matériel que Label Retail installe et maintient en Côte d'Ivoire.",
  path: '/products',
  keywords: [
    'catalogue vidéosurveillance',
    "caméras Hikvision Côte d'Ivoire",
    'NVR DVR Abidjan',
    "matériel contrôle d'accès",
    'Label Retail produits',
  ],
});

export default async function ProductsPage() {
  let initialGrouped: ProductsByCategory | undefined;
  let initialCategories: string[] | undefined;

  try {
    const products = await listProductsServer();
    initialGrouped = groupProductsByCategory(products);
    initialCategories = MAIN_CATEGORIES.filter(
      (c) => initialGrouped![c]?.length
    );
  } catch (error) {
    console.error('Produits : préchargement serveur impossible', error);
  }

  return (
    <ProductsPageClient
      initialGrouped={initialGrouped}
      initialCategories={initialCategories}
    />
  );
}
