// components/Navbar.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/products/${searchQuery}`);
  };

  return (
    <header className="bg-blue-600 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="text-3xl text-white font-bold">
          Label Retail
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-white hover:text-blue-200 transition-colors">Accueil</Link>
          <Link href="/products" className="text-white hover:text-blue-200 transition-colors">Produits</Link>
          <Link href="/about" className="text-white hover:text-blue-200 transition-colors">À propos</Link>
          <Link href="/contact" className="text-white hover:text-blue-200 transition-colors">Contact</Link>
        </nav>

        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un produit..."
            className="px-3 py-2 rounded-l-md outline-none"
          />
          <button type="submit" className="bg-white text-blue-600 px-4 py-2 rounded-r-md font-semibold">
            Rechercher
          </button>
        </form>
      </div>
    </header>
  );
}
