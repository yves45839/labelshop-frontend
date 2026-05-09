'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { addToCart } from '@/lib/cart';
import { mapProductCategory, MAIN_CATEGORIES } from '@/lib/category';
import { api, apiUrl } from '@/lib/api';

type Product = {
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
  [key: string]: unknown;
};

// ✅ Utilise uniquement image_1024 (format complet ou relatif)
function getProductImage(product: Product): string {
  if (product.image_1024 && typeof product.image_1024 === 'string') {
    return `${apiUrl(product.image_1024)}?t=${Date.now()}`;
  }
  return '/default-product.png';
}

interface ProductsByCategory {
  [category: string]: Product[];
}

export default function ProductsPageClient() {
  const [grouped, setGrouped] = useState<ProductsByCategory>({});
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Toutes les catégories');

  useEffect(() => {
    api
      .get('/products/get-products/')
      .then((res) => {
        const products = res.data as Product[];
        const groups: ProductsByCategory = {};
        products.forEach((p) => {
          const category = mapProductCategory(p);
          if (!groups[category]) groups[category] = [];
          groups[category].push(p);
        });
        setGrouped(groups);
        setCategories(MAIN_CATEGORIES.filter((c) => groups[c]?.length));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des produits :', error);
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
      {/* Header de page */}
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-12">
          <span className="lr-eyebrow text-[var(--lr-orange-400)]">Catalogue · Hikvision & écosystème</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mt-2">Nos produits</h1>
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
                {category}
              </h2>
              <span className="h-px flex-1 bg-[var(--lr-border)]" />
              <span className="lr-mono text-xs text-[var(--lr-steel-500)]">
                {grouped[category].length} réf.
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {grouped[category].map((product) => {
              const imageUrl = getProductImage(product);
              const whatsappLink = `https://wa.me/22588899965?text=${encodeURIComponent(
                `Bonjour Label Retail, je suis intéressé par le produit ${product.name} (Réf : ${product.default_code}). Pouvez-vous m'en dire plus ?`
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
