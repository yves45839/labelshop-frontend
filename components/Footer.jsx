import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-8 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="flex flex-col items-start">
          <div className="flex items-center space-x-2 mb-4">
            <Image src="/images/lr.png" alt="Logo Label Retail" width={40} height={40} />
            <h3 className="text-xl font-bold">Label Retail</h3>
          </div>
          <p>N° 1 en solutions Hikvision en Côte d'Ivoire.</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Liens utiles</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-blue-400">Accueil</Link></li>
            <li><Link href="/products" className="hover:text-blue-400">Produits</Link></li>
            <li><Link href="/about" className="hover:text-blue-400">À propos</Link></li>
            <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p>Email : info@label-ci.com</p>
          <p>Téléphone : +225 07 888 999 65</p>
          <p>Fixe : +225 27 21 58 56 77</p>
          <p>Adresse : Abidjan, Côte d'Ivoire</p>
        </div>
      </div>

      <div className="bg-gray-900 py-4 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} Label Retail. Tous droits réservés.
      </div>
    </footer>
  );
}
