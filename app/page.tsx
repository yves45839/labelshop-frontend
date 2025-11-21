import type { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';

export const metadata: Metadata = {
  title: 'Label Retail | Sécurité électronique & domotique en Côte d\'Ivoire',
  description:
    "Label Retail conçoit, installe et maintient des solutions de vidéosurveillance, contrôle d'accès et alarme en Côte d'Ivoire.",
  keywords: [
    'sécurité électronique Côte d\'Ivoire',
    'installation vidéosurveillance Abidjan',
    'systèmes de contrôle d\'accès',
    'domotique professionnelle',
    'Label Retail',
  ],
  alternates: { canonical: 'https://labelretail.ci/' },
  openGraph: {
    title: 'Label Retail | Sécurité électronique & domotique',
    description:
      "Installation certifiée de caméras, alarmes et solutions connectées partout en Côte d'Ivoire.",
    url: 'https://labelretail.ci/',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary',
    title: 'Label Retail | Spécialiste sécurité électronique',
    description: "Conseil, installation et maintenance de systèmes de sécurité en Côte d'Ivoire.",
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
