import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { JsonLd, absoluteUrl, buildMetadata, localBusinessJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact — devis, démo ou support technique',
  description:
    "Contactez Label Retail à Abidjan : devis vidéosurveillance, démo LR Time, inscription formation ou support technique. Réponse sous 24 h ouvrées.",
  path: '/contact',
  keywords: [
    'contact Label Retail',
    'devis vidéosurveillance Abidjan',
    'installateur sécurité Côte d\'Ivoire',
  ],
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  const contactPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Label Retail',
    url: absoluteUrl('/contact'),
    mainEntity: localBusinessJsonLd(),
  };

  return (
    <>
      <JsonLd data={contactPageJsonLd} />
      {children}
    </>
  );
}
