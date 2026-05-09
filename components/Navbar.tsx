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
  FaClock,
  FaGraduationCap,
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
  { href: '/products', label: 'PRODUITS', icon: <FaBoxOpen /> },
  { href: '/lr-time', label: 'LR TIME', icon: <FaClock /> },
  { href: '/formations', label: 'FORMATIONS', icon: <FaGraduationCap /> },
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
  { href: '/about', label: 'À PROPOS', icon: <FaInfoCircle /> },
];

  return (
    <header
      className={`bg-white border-b border-[var(--lr-border)] transition-all duration-200 z-50 sticky top-0 w-full ${
        collapsed ? 'shadow-[0_2px_0_0_var(--lr-orange-500)]' : ''
      }`}
    >
      {/* Top bar industrielle : contact + statut */}
      {!collapsed && (
        <div className="bg-[var(--lr-navy-900)] text-white/90 text-[11px]">
          <div className="lr-container flex items-center justify-between py-1.5">
            <div className="flex items-center gap-4">
              <span className="lr-mono tracking-wider hidden sm:inline">+225 27 21 58 56 77</span>
              <span className="hidden md:inline text-white/60">info@label-ci.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-emerald-400" />
              <span className="lr-eyebrow text-white/80">Support 24/7 · Abidjan</span>
            </div>
          </div>
        </div>
      )}

      {/* Bande hachurée fine */}
      <div className="lr-stripe" />

      <div className={`lr-container flex flex-wrap items-center gap-4 md:flex-nowrap md:gap-6 ${collapsed ? 'py-2' : 'py-4'}`}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 md:flex-shrink-0 group">
          <div className="relative w-10 h-10 border border-[var(--lr-navy-800)] bg-white flex items-center justify-center">
            <Image
              src="/images/lr.png"
              alt="Logo Label Retail"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div className={`hidden sm:flex flex-col leading-none ${collapsed ? 'opacity-0 w-0 overflow-hidden' : ''}`}>
            <span className="font-display text-lg font-bold tracking-wide text-[var(--lr-navy-900)] uppercase">
              LABEL RETAIL
            </span>
            <span className="lr-eyebrow text-[var(--lr-orange-600)] mt-0.5">
              Sécurité · Télécom · LR Time
            </span>
          </div>
        </Link>

        {/* Navigation centrale */}
        <nav className="order-3 flex w-full flex-wrap justify-center md:order-2 md:flex-1 md:flex-nowrap md:overflow-x-auto">
          {navLinks.map(({ href, label, icon, showCount }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`group relative flex items-center gap-1.5 px-3 py-2 font-display text-[13px] font-semibold tracking-wider uppercase transition-colors border-b-2 ${
                  active
                    ? 'border-[var(--lr-orange-500)] text-[var(--lr-navy-900)]'
                    : 'border-transparent text-[var(--lr-steel-700)] hover:text-[var(--lr-navy-900)] hover:border-[var(--lr-steel-300)]'
                }`}
              >
                <span className="relative text-[var(--lr-orange-600)]">
                  {icon}
                  {showCount && cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-[var(--lr-orange-600)] text-white text-[10px] font-bold lr-mono w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </span>
                <span className={`${collapsed ? 'hidden lg:inline' : ''}`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Zone de recherche */}
        <div
          className={`relative order-2 w-full md:order-3 md:w-auto md:max-w-md md:flex-shrink-0 ${
            collapsed ? 'md:max-w-xs' : ''
          }`}
        >
          <form
            onSubmit={handleSearch}
            className="relative flex w-full border border-[var(--lr-border)] bg-white focus-within:border-[var(--lr-navy-800)]"
          >
            <input
              type="search"
              inputMode="search"
              autoComplete="off"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un produit, une référence…"
              className="w-full bg-transparent px-3 py-2 text-sm text-[var(--lr-navy-900)] placeholder:text-[var(--lr-steel-400)] focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-[var(--lr-navy-800)] px-4 text-xs font-display font-semibold uppercase tracking-widest text-white hover:bg-[var(--lr-orange-600)] transition-colors"
            >
              Rechercher
            </button>
          </form>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <ul className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto border border-[var(--lr-border)] bg-white text-sm shadow-xl">
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
                    className="flex items-center gap-3 px-3 py-2 border-b border-[var(--lr-steel-100)] last:border-0 hover:bg-[var(--lr-steel-50)] cursor-pointer transition-colors"
                  >
                    <Image
                      src={`${imageUrl}?t=${Date.now()}`}
                      alt={product.name}
                      width={32}
                      height={32}
                      unoptimized
                      className="object-contain w-8 h-8 border border-[var(--lr-border)]"
                    />
                    <span className="text-[var(--lr-navy-900)]">{product.name}</span>
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
