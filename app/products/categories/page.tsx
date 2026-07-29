import type { Metadata } from 'next';
import ProductsByCategoryClient from './ProductsByCategoryClient';
import {
  groupProductsByCategory,
  listProductsServer,
  type ProductsByCategory,
} from '@/lib/products';
import { JsonLd, absoluteUrl, breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Catégories de produits | Vidéosurveillance & sécurité Label Retail',
  description:
    "Caméras, enregistreurs, alarmes et accessoires rangés par catégorie. Pour trouver vite ce qu'il vous faut, en Côte d'Ivoire.",
  path: '/products/categories',
  keywords: [
    'catégories vidéosurveillance',
    "caméras de sécurité Côte d'Ivoire",
    'NVR et DVR',
    'alarmes intrusion Abidjan',
    'Label Retail produits',
  ],
});

export default async function ProductsByCategoryPage() {
  let initialGrouped: ProductsByCategory | undefined;
  try {
    initialGrouped = groupProductsByCategory(await listProductsServer());
  } catch (error) {
    console.error('Catégories : préchargement serveur impossible', error);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Produits par catégorie',
    description:
      'Notre sélection de caméras, enregistreurs, alarmes, équipement réseau et accessoires, rangée par catégorie.',
    url: absoluteUrl('/products/categories'),
    breadcrumb: breadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: 'Produits', path: '/products' },
      { name: 'Catégories', path: '/products/categories' },
    ]),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <ProductsByCategoryClient initialGrouped={initialGrouped} />
    </>
  );
}
