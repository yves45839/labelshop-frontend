// components/Footer.jsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-8 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h3 className="text-xl font-bold mb-4">Label Retail</h3>
          <p>Votre expert en solutions de sécurité et vidéosurveillance en Côte d'Ivoire.</p>
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
          <p>Email : contact@labelretail.ci</p>
          <p>Téléphone : +225 888 999 65</p>
          <p>Adresse : Abidjan, Côte d'Ivoire</p>
        </div>

      </div>
      <div className="bg-gray-900 py-4 text-center">
        © {new Date().getFullYear()} Label Retail. Tous droits réservés.
      </div>
    </footer>
  );
}
