import type { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingMenu from '@/components/FloatingMenu';
import FirebaseInit from '@/components/FirebaseInit';
import Script from 'next/script';
import type { Metadata } from 'next';
import { Inter, Barlow_Condensed, JetBrains_Mono } from 'next/font/google';
import { JsonLd, organizationJsonLd, webSiteJsonLd, SITE_URL, SITE_NAME } from '@/lib/seo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Sécurité électronique & Hikvision à Abidjan`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Sécurité électronique, télécommunications et gestion du temps : Label Retail accompagne les entreprises ivoiriennes du conseil à la maintenance.",
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${barlow.variable} ${jetbrains.variable}`}
    >
      <body className="flex flex-col min-h-screen bg-white text-[var(--lr-navy-900)] antialiased">
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd()]} />
        <Navbar />
        <FirebaseInit />
        <main className="flex-grow content">
          {children}
        </main>
        <Footer />
        <FloatingMenu />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-MFV8XCTVGF"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MFV8XCTVGF');
          `}
        </Script>
      </body>
    </html>
  );
}
