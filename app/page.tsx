import type { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';
import { JsonLd, localBusinessJsonLd, absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: "Label Retail | Intégrateur Hikvision et sécurité électronique en Côte d'Ivoire",
  description:
    "Label Retail installe et maintient la vidéosurveillance, le contrôle d'accès et les alarmes Hikvision en Côte d'Ivoire. Pilotez vos sites depuis votre téléphone ou votre poste.",
  keywords: [
    "Hikvision Côte d'Ivoire",
    'intégrateur Hikvision Abidjan',
    'sécurité électronique Côte d\'Ivoire',
    'installation vidéosurveillance Abidjan',
    'systèmes de contrôle d\'accès',
    'domotique professionnelle',
    'Label Retail',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: "Label Retail | Hikvision et sécurité électronique en Côte d'Ivoire",
    description:
      "Installation certifiée Hikvision : caméras, alarmes et solutions connectées, partout en Côte d'Ivoire.",
    url: '/',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary',
    title: "Label Retail | Intégrateur Hikvision en Côte d'Ivoire",
    description: "Conseil, installation et maintenance de vos systèmes de sécurité Hikvision en Côte d'Ivoire.",
  },
  robots: { index: true, follow: true },
};

export default function Home() {
  const localBusiness = {
    ...localBusinessJsonLd(),
    makesOffer: {
      "@type": "Offer",
      url: absoluteUrl('/products'),
      category: 'Sécurité électronique',
    },
  };

  return (
    <>
      <HomePageClient />
      <JsonLd data={localBusiness} />
    </>
  );
}
