'use client';

import { useState, useEffect, type ReactElement } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { watchAuth } from '@/lib/firebase';
import { getCurrentUser, isAdminEmail } from '@/lib/user';
import { viewCart, type CartItemData } from '@/lib/cart';
import { apiUrl } from '@/lib/api';
import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaClipboardList,
  FaWarehouse,
  FaBoxes,
  FaPlus,
  FaSignInAlt,
  FaInfoCircle,
  FaNewspaper,
  FaUser,
} from 'react-icons/fa';

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
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
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
        const res = await axios.get(apiUrl('/products/get-products/'));
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
        setUser({ id: u.uid, email: u.email, name: u.displayName });
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setCollapsed(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When the user scrolls the page we reduce the navbar height but keep it at
  // the top instead of turning it into a sidebar.
  // Previously we added a class to the body to shift the content when the
  // sidebar was displayed. This behaviour is no longer required so the effect
  // is removed.

  useEffect(() => {
    const user = getCurrentUser();
    const id = user?.id;
    viewCart(id).then((items) => {
      const total = items.reduce(
        (sum: number, it: CartItemData) => sum + (it.quantity || 0),
        0,
      );
      setCartCount(total);
    });
    function handle(e: any) {
      const items = (e.detail || []) as CartItemData[];
      const total = items.reduce(
        (sum: number, it: CartItemData) => sum + (it.quantity || 0),
        0,
      );
      setCartCount(total);
    }
    window.addEventListener('cart-changed', handle);
    return () => window.removeEventListener('cart-changed', handle);
  }, []);

const navLinks: {
  href: string;
  label: string;
  icon: ReactElement;
  showCount?: boolean;
}[] = [
  { href: '/', label: 'ACCUEIL', icon: <FaHome /> },
  { href: '/products', label: 'NOS PRODUITS', icon: <FaBoxOpen /> },
  { href: '/cart', label: 'PANIER', icon: <FaShoppingCart />, showCount: true },
  { href: '/orders', label: 'COMMANDES', icon: <FaClipboardList /> },
  ...(user && isAdminEmail(user.email)
    ? [
        { href: '/inventory', label: 'INVENTAIRE', icon: <FaWarehouse /> },
        { href: '/stock', label: 'STOCK', icon: <FaBoxes /> },
        { href: '/products/create', label: 'NOUVEAU', icon: <FaPlus /> },
      ]
    : []),
  ...(user
    ? [{ href: '/accounts/profile', label: 'MON COMPTE', icon: <FaUser /> }]
    : [{ href: '/accounts/login', label: 'CONNEXION', icon: <FaSignInAlt /> }]),
  { href: '/blogs', label: 'BLOG', icon: <FaNewspaper /> },
  { href: '/about', label: 'A PROPOS', icon: <FaInfoCircle /> },
];

  return (
    <header
      className={`bg-white shadow-sm transition-all duration-300 z-50 ${
        collapsed ? 'fixed top-0 left-0 w-full py-2' : 'sticky top-0 w-full py-4'
      }`}
    >
      <div className="mx-auto flex w-full max-w-screen-xl flex-wrap items-center gap-4 px-4 md:flex-nowrap md:gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 md:flex-shrink-0">
          <Image
            src="/images/lr.png"
            alt="Logo Label Retail"
            width={40}
            height={40}
            className="object-contain"
          />
          <span
            className={`text-xs font-bold text-blue-700 tracking-wide hidden sm:inline ${
              collapsed ? 'opacity-0 w-0' : ''
            }`}
          >
            LABEL RETAIL
          </span>
        </Link>

        {/* Navigation centrale */}
        <nav className="order-3 flex w-full flex-wrap justify-center gap-3 text-sm font-bold text-orange-500 md:order-2 md:flex-1">
          {navLinks.map(({ href, label, icon, showCount }) => (
            <Link
              key={href}
              href={href}
              className={`group relative transition-all duration-300 rounded-md flex items-center gap-1 px-3 py-2 ${
                pathname === href ? 'bg-orange-400 text-white' : 'hover:text-blue-600'
              }`}
            >
              <span className="relative">
                {icon}
                {showCount && cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </span>
              <span className={`${collapsed ? 'hidden' : ''}`}>
                {label}
              </span>
            </Link>
          ))}
        </nav>


        {/* Zone de recherche */}
        <div
          className={`relative order-2 w-full transition-all duration-300 md:order-3 md:w-auto md:max-w-md md:flex-shrink-0 ${
            collapsed ? 'md:max-w-sm' : ''
          }`}
        >
          <form
            onSubmit={handleSearch}
            className="relative flex w-full overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-300"
          >
            <input
              type="search"
              inputMode="search"
              autoComplete="off"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un produit..."
              className="w-full bg-transparent px-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-blue-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
            >
              Rechercher
            </button>
          </form>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <ul className="absolute z-50 mt-2 w-full max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white text-sm shadow-lg">
              {suggestions.map((product) => {
                const imageUrl = product.image_1024 ? apiUrl(product.image_1024) : '';

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
      </div>
    </header>
  );
}
