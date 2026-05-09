'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';
import { addToCart } from '@/lib/cart';
import { mapProductCategory, MAIN_CATEGORIES } from '@/lib/category';
import { apiUrl } from '@/lib/api';

interface Product {
  id: number;
  name: string;
  slug: string;
  image_1024?: string;
  default_code?: string;
  list_price: number;
  categ_id?: string;
  category_main?: string;
  category_sub?: string;
  category_type?: string;
  [key: string]: any;
}

interface ProductsByCategory {
  [category: string]: Product[];
}

export default function ProductsByCategoryClient() {
  const [grouped, setGrouped] = useState<ProductsByCategory>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(apiUrl('/products/get-products/'))
      .then((res) => {
        const products = res.data as Product[];
        const groups: ProductsByCategory = {};
        products.forEach((p) => {
          const category = mapProductCategory(p);
          if (!groups[category]) groups[category] = [];
          groups[category].push(p);
        });
        setGrouped(groups);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des produits :', err);
        setIsLoading(false);
      });
  }, []);

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
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-[var(--lr-navy-900)]">{category}</h2>
              <span className="h-px flex-1 bg-[var(--lr-border)]" />
              <span className="lr-mono text-xs text-[var(--lr-steel-500)]">{grouped[category].length} réf.</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {grouped[category].map((product) => {
              const imageUrl = `${apiUrl(product.image_1024 || '')}?t=${Date.now()}`;
              const whatsappLink = `https://wa.me/22588899965?text=${encodeURIComponent(
                `Bonjour Label Retail, je m'intéresse au produit ${product.name} (Réf : ${product.default_code}). Pouvez-vous m'en dire plus ?`
              )}`;
              const handleAdd = async () => {
                await addToCart({
                  product_id: product.id,
                  quantity: 1,
                  product_name: product.name,
                  product_image: imageUrl,
                  price: product.list_price,
                });
              };
              return (
                <ProductCard
                  key={product.id}
                  imageUrl={imageUrl}
                  name={product.name}
                  reference={product.default_code || ''}
                  slug={product.slug}
                  price={product.list_price}
                  whatsappLink={whatsappLink}
                  onAddToCart={handleAdd}
                />
              );
            })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
