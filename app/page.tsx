import type { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';

export const metadata: Metadata = {
  title: 'Accueil',
  description:
    "Label Retail - Solutions de sécurité électronique et domotique en Côte d'Ivoire",
  alternates: { canonical: '/' },
};

export default function Home() {
  return <HomePageClient />;
}
