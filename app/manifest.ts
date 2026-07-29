import type { MetadataRoute } from 'next';
import { SITE_NAME } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Sécurité électronique en Côte d'Ivoire`,
    short_name: SITE_NAME,
    description:
      "Intégrateur Hikvision à Abidjan : vidéosurveillance, contrôle d'accès, alarme, gestion du temps et formation.",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0b2545',
    lang: 'fr',
    icons: [
      {
        src: '/images/lr.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
