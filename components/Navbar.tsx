'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { watchAuth } from '@/lib/firebase';
import { viewCart } from '@/lib/cart';

type Product = {
  id: number;
  name: string;
  slug: string;
  default_code?: string;
  image_1024?: string;
};

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products/${searchQuery}`);
      setSearchQuery('');
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await axios.get('https://labelshop-backend.onrender.com/products/get-products/');
        const query = searchQuery.toLowerCase();
        const filtered = res.data.filter((p: Product) =>
          p.name.toLowerCase().includes(query) ||
          p.slug.toLowerCase().includes(query) ||
          p.default_code?.toLowerCase().includes(query)
        );
        setSuggestions(filtered.slice(0, 5));
      } catch (err) {
        console.error('Erreur suggestions :', err);
      }
    };

    fetchSuggestions();
  }, [searchQuery]);

  useEffect(() => {
    const unsubscribe = watchAuth((u) => {
      if (u) {
        const obj = { id: u.uid, email: u.email, name: u.displayName };
        localStorage.setItem('user', JSON.stringify(obj));
        setUser(obj);
      } else {
        localStorage.removeItem('user');
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    const id = stored ? JSON.parse(stored).id : undefined;
    viewCart(id).then((items) => {
      const total = items.reduce((sum: number, it: any) => sum + (it.quantity || 0), 0);
      setCartCount(total);
    });
    function handle(e: any) {
      const items = e.detail || [];
      const total = items.reduce((sum: number, it: any) => sum + (it.quantity || 0), 0);
      setCartCount(total);
    }
    window.addEventListener('cart-changed', handle);
    return () => window.removeEventListener('cart-changed', handle);
  }, []);

const navLinks: { href: string; label: string }[] = [
  { href: '/', label: 'ACCUEIL' },
  { href: '/about', label: 'A PROPOS' },
  { href: '/products', label: 'NOS PRODUITS' },
  { href: '/cart', label: 'PANIER' },
  { href: '/orders', label: 'COMMANDES' },
  ...(user
    ? [{ href: '/accounts/profile', label: 'MON COMPTE' }]
    : [{ href: '/accounts/login', label: 'CONNEXION' }]),
];

  return (
    <header className="bg-white shadow-sm py-4 relative z-50">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/lr.png"
            alt="Logo Label Retail"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-xs font-bold text-blue-700 tracking-wide hidden sm:inline">
            LABEL RETAIL
          </span>
        </Link>

        {/* Navigation centrale */}
        <nav className="flex flex-wrap justify-center gap-4 text-sm font-bold text-orange-500">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 rounded-md transition-all duration-300 ${
                pathname === href
                  ? 'bg-orange-400 text-white'
                  : 'hover:text-blue-600'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Zone de recherche */}
        <div className="relative w-full md:w-64">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un produit..."
              className="w-full px-3 py-2 rounded-l-md border border-gray-300 text-sm"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md font-semibold text-sm"
            >
              Rechercher
            </button>
          </form>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded shadow mt-1 z-50 text-sm max-h-60 overflow-y-auto">
              {suggestions.map((product) => {
                const imageUrl = product.image_1024?.startsWith('http')
                  ? product.image_1024
                  : `https://labelshop-backend.onrender.com${product.image_1024}`;

                return (
                  <li
                    key={product.id}
                    onClick={() => {
                      router.push(`/products/${product.slug}`);
                      setSearchQuery('');
                      setSuggestions([]);
                    }}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <Image
                      src={`${imageUrl}?t=${Date.now()}`}
                      alt={product.name}
                      width={32}
                      height={32}
                      unoptimized
                      className="rounded object-contain w-8 h-8"
                    />
                    <span>{product.name}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <Link href="/cart" className="relative text-2xl">
          <span role="img" aria-label="Panier">🛒</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
