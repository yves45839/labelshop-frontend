import type { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';

export const metadata: Metadata = {
  title: "Label Retail | No 1 Hikvision & sécurité électronique en Côte d'Ivoire",
  description:
    "Label Retail, intégrateur Hikvision n°1 en Côte d'Ivoire, conçoit et maintient vos solutions de vidéosurveillance, contrôle d'accès et alarmes sur tous vos écrans.",
  keywords: [
    "Hikvision Côte d'Ivoire",
    'intégrateur Hikvision Abidjan',
    'sécurité électronique Côte d\'Ivoire',
    'installation vidéosurveillance Abidjan',
    'systèmes de contrôle d\'accès',
    'domotique professionnelle',
    'Label Retail',
  ],
  alternates: { canonical: 'https://labelretail.ci/' },
  openGraph: {
    title: "Label Retail | No 1 Hikvision & sécurité électronique",
    description:
      "Installation certifiée Hikvision de caméras, alarmes et solutions connectées partout en Côte d'Ivoire.",
    url: 'https://labelretail.ci/',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary',
    title: "Label Retail | Intégrateur Hikvision en Côte d'Ivoire",
    description: "Conseil, installation et maintenance Hikvision de systèmes de sécurité en Côte d'Ivoire.",
  },
  robots: { index: true, follow: true },
};

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: 'Label Retail',
    url: 'https://labelretail.ci/',
    image: 'https://labelretail.ci/logo.png',
    telephone: '+2250788899965',
    address: {
      "@type": "PostalAddress",
      addressCountry: 'CI',
      addressLocality: 'Abidjan',
      addressRegion: 'Lagunes',
      streetAddress: 'Côte d\'Ivoire',
    },
    areaServed: 'CI',
    openingHours: 'Mo-Fr 08:00-18:00',
    sameAs: [
      'https://www.facebook.com/labelretail',
      'https://www.linkedin.com/company/labelretail',
    ],
    makesOffer: {
      "@type": "Offer",
      url: 'https://labelretail.ci/products',
      category: 'Sécurité électronique',
    },
  };

  return (
    <>
      <HomePageClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
