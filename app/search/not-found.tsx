'use client';
import Link from 'next/link';

export default function SearchNotFound() {
  return (
    <main className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-4">
      <h1 className="text-2xl font-bold text-orange-500">Aucun produit trouvé</h1>
      <p>Essayez une autre recherche.</p>
      <Link href="/" className="text-blue-600 underline">
        Retour à l'accueil
      </Link>
    </main>
  );
}
