'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductGridClient from '@/components/ProductGridClient';
import { MAIN_CATEGORIES } from '@/lib/category';
import { api } from '@/lib/api';
import {
  categoryPath,
  groupProductsByCategory,
  type Product,
  type ProductsByCategory,
} from '@/lib/products';

type Props = {
  initialGrouped?: ProductsByCategory;
  initialCategories?: string[];
};

export default function ProductsPageClient({ initialGrouped, initialCategories }: Props) {
  const hasInitialData = Boolean(initialGrouped && initialCategories);
  const [grouped, setGrouped] = useState<ProductsByCategory>(initialGrouped ?? {});
  const [isLoading, setIsLoading] = useState(!hasInitialData);
  const [categories, setCategories] = useState<string[]>(initialCategories ?? []);
  const [selectedCategory, setSelectedCategory] = useState('Toutes les catégories');

  // Repli client si la page n'a pas pu précharger le catalogue côté serveur.
  useEffect(() => {
    if (hasInitialData) return;
    api
      .get('/products/get-products/')
      .then((res) => {
        const groups = groupProductsByCategory(res.data as Product[]);
        setGrouped(groups);
        setCategories(MAIN_CATEGORIES.filter((c) => groups[c]?.length));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des produits :', error);
        setIsLoading(false);
      });
  }, [hasInitialData]);

  if (isLoading) {
    return (
      <div className="lr-container py-24 text-center">
        <span className="lr-mono text-xs text-[var(--lr-orange-600)]">// LOADING</span>
        <p className="font-display text-2xl font-bold uppercase tracking-wide text-[var(--lr-navy-900)] mt-3">On charge le catalogue…</p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--lr-steel-50)] min-h-screen">
      {/* Header de page */}
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-12">
          <span className="lr-eyebrow text-[var(--lr-orange-400)]">Catalogue · Hikvision & écosystème</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mt-2">Nos produits</h1>
          <p className="mt-3 text-white/70 text-sm max-w-2xl">
            Caméras de vidéosurveillance, enregistreurs NVR/DVR, alarmes, contrôle d'accès et
            équipement réseau : tout le matériel que Label Retail installe et maintient en
            Côte d'Ivoire, livré depuis Abidjan.
          </p>
          <div className="lr-stripe mt-6 max-w-xs" />
        </div>
      </header>

      <main className="lr-container py-10">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white border border-[var(--lr-border)] p-4">
          <div className="flex items-center gap-3">
            <span className="w-1 h-6 bg-[var(--lr-orange-500)]" />
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-[var(--lr-navy-900)]">Filtrer par catégorie</p>
          </div>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="lr-input max-w-xs font-display text-sm uppercase tracking-wide"
          >
            <option value="Toutes les catégories">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {(selectedCategory === 'Toutes les catégories'
          ? categories
          : categories.filter((c) => c === selectedCategory)
        ).map((category, idx) => (
          <section key={category} className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">
                CAT.{String(idx + 1).padStart(2, '0')}
              </span>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-[var(--lr-navy-900)]">
                <Link href={categoryPath(category)} className="hover:text-[var(--lr-orange-700)]" prefetch={false}>
                  {category}
                </Link>
              </h2>
              <span className="h-px flex-1 bg-[var(--lr-border)]" />
              <Link
                href={categoryPath(category)}
                className="lr-mono text-xs text-[var(--lr-orange-600)] hover:text-[var(--lr-navy-900)]"
                prefetch={false}
              >
                {grouped[category].length} réf. →
              </Link>
            </div>
            <ProductGridClient products={grouped[category]} />
          </section>
        ))}
      </main>
    </div>
  );
}
