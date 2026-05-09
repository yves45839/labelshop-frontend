import type { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingMenu from '@/components/FloatingMenu';
import FirebaseInit from '@/components/FirebaseInit';
import Script from 'next/script';
import type { Metadata } from 'next';
import { Inter, Barlow_Condensed, JetBrains_Mono } from 'next/font/google';
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
  metadataBase: new URL('https://labelretail.ci'),
  title: {
    default: 'Label Retail',
    template: '%s | Label Retail',
  },
  description:
    "Sécurité électronique, télécommunications et gestion du temps : Label Retail accompagne les entreprises ivoiriennes du conseil à la maintenance.",
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
    <html
      lang="fr"
      className={`${inter.variable} ${barlow.variable} ${jetbrains.variable}`}
    >
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
      <body className="flex flex-col min-h-screen bg-white text-[var(--lr-navy-900)] antialiased">
        <Navbar />
        <FirebaseInit />
        <main className="flex-grow content">
          {children}
        </main>
        <Footer />
        <FloatingMenu />
      </body>
    </html>
  );
}
