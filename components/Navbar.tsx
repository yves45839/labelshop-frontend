'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products/${searchQuery}`);
    }
  };

  const navLinks = [
    { href: '/', label: 'ACCUEIL' },
    { href: '/about', label: 'A PROPOS' },
    { href: '/products', label: 'NOS PRODUITS' },
  ];

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex items-center justify-between px-4">

        {/* Logo + texte */}
        <Link href="/" className="flex flex-col items-center space-y-1">
          <Image
              src="/images/lr.png"
              alt="Logo Label Retail"
              width={80}
              height={80}
              className="w-10 h-10 object-contain"
            />

        </Link>

        {/* Navigation centrale */}
        <nav className="flex space-x-8 text-sm font-bold text-orange-500">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                pathname === href
                  ? 'bg-orange-400 text-white'
                  : 'hover:text-blue-600'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Recherche */}
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un produit..."
            className="px-3 py-2 rounded-l-md outline-none border border-gray-300 text-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md font-semibold text-sm"
          >
            Rechercher
          </button>
        </form>
      </div>
    </header>
  );
}
