'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import ProductGridClient from '@/components/ProductGridClient';
import { MAIN_CATEGORIES } from '@/lib/category';
import { apiUrl } from '@/lib/api';
import {
  categoryPath,
  groupProductsByCategory,
  type Product,
  type ProductsByCategory,
} from '@/lib/products';

export default function ProductsByCategoryClient({
  initialGrouped,
}: {
  initialGrouped?: ProductsByCategory;
}) {
  const hasInitialData = Boolean(initialGrouped);
  const [grouped, setGrouped] = useState<ProductsByCategory>(initialGrouped ?? {});
  const [isLoading, setIsLoading] = useState(!hasInitialData);

  // Repli client si la page n'a pas pu précharger le catalogue côté serveur.
  useEffect(() => {
    if (hasInitialData) return;
    axios
      .get(apiUrl('/products/get-products/'))
      .then((res) => {
        setGrouped(groupProductsByCategory(res.data as Product[]));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des produits :', err);
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
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-12">
          <span className="lr-eyebrow text-[var(--lr-orange-400)]">Index par typologie</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mt-2">Produits par catégorie</h1>
          <div className="lr-stripe mt-6 max-w-xs" />
        </div>
      </header>

      <main className="lr-container py-10">
        {MAIN_CATEGORIES.filter((c) => grouped[c]).map((category, idx) => (
          <section key={category} className="mb-12" id={category.toLowerCase().replace(/\s+/g, '-')}>
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
