import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos',
  description:
    "En savoir plus sur Label Retail, spécialiste des solutions de sécurité en Côte d'Ivoire",
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">À propos de nous</h1>

      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="w-full lg:w-1/2">
          <Image
            src="/images/about.jpg"
            alt="About Label Retail"
            width={600}
            height={400}
            className="rounded-lg shadow"
          />
        </div>

        <div className="w-full lg:w-1/2 text-gray-800 text-lg leading-relaxed">
          <p className="mb-4">
            <strong>LABEL RETAIL</strong> est une entreprise de sécurité électronique, qui offre des solutions sur mesure à ses clients.
          </p>
          <p className="mb-4">
            Nous avons une équipe de professionnels qualifiés, qui conçoivent des systèmes de sécurité de pointe.
          </p>
          <p>
            Nous avons réalisé plusieurs projets d’envergure dans différents secteurs. Nous sommes reconnus pour notre savoir-faire, notre fiabilité, notre innovation et notre service personnalisé.
          </p>
        </div>
      </div>
    </main>
  );
}
