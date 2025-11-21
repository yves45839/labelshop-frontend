import type { Metadata } from 'next';
import ProductsByCategoryClient from './ProductsByCategoryClient';

export const metadata: Metadata = {
  title: 'Catégories de produits | Vidéosurveillance & sécurité Label Retail',
  description:
    "Découvrez les caméras, enregistreurs, alarmes et accessoires classés par catégorie pour une installation rapide en Côte d'Ivoire.",
  keywords: [
    'catégories vidéosurveillance',
    'caméras de sécurité Côte d\'Ivoire',
    'NVR et DVR',
    'alarmes intrusion Abidjan',
    'Label Retail produits',
  ],
  alternates: { canonical: 'https://labelretail.ci/products/categories' },
  openGraph: {
    title: 'Catalogue par catégorie | Label Retail',
    description:
      "Parcourez nos solutions de sécurité par catégorie : caméras, enregistreurs, alarmes et réseaux.",
    url: 'https://labelretail.ci/products/categories',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Label Retail - Produits par catégorie',
    description: "Catalogue vidéosurveillance et contrôle d'accès classé par univers.",
  },
  robots: { index: true, follow: true },
};

export default function ProductsByCategoryPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: 'Produits par catégorie',
    description:
      "Sélection Label Retail de caméras, enregistreurs, alarmes, solutions réseau et accessoires classés par catégorie.",
    url: 'https://labelretail.ci/products/categories',
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: 'Accueil',
          item: 'https://labelretail.ci/',
        },
        {
          "@type": "ListItem",
          position: 2,
          name: 'Produits',
          item: 'https://labelretail.ci/products',
        },
        {
          "@type": "ListItem",
          position: 3,
          name: 'Catégories',
          item: 'https://labelretail.ci/products/categories',
        },
      ],
    },
  };

  return (
    <>
      <ProductsByCategoryClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
