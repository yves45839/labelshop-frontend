import type { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingMenu from '@/components/FloatingMenu';
import FirebaseInit from '@/components/FirebaseInit';
import Script from 'next/script';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://labelretail.ci'),
  title: {
    default: 'Label Retail',
    template: '%s | Label Retail',
  },
  description:
    "Solutions de sécurité électronique et de télécommunication en Côte d'Ivoire",
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://labelretail.ci',
    siteName: 'Label Retail',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-MFV8XCTVGF" />
        <Script id="gtag-init">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MFV8XCTVGF');
          `}
        </Script>
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <FirebaseInit />
        <div className="flex-grow content">
          {children}
        </div>
        <Footer />
        <FloatingMenu />
      </body>
    </html>
  );
}
