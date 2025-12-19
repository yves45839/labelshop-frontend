'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';
import { addToCart } from '@/lib/cart';
import { mapProductCategory, MAIN_CATEGORIES } from '@/lib/category';

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

const api = axios.create({
  baseURL: 'https://lr-samr.pythonanywhere.com',
});

// ✅ Utilise uniquement image_1024 (format complet ou relatif)
function getProductImage(product: Product): string {
  const baseUrl = 'https://lr-samr.pythonanywhere.com';

  if (product.image_1024 && typeof product.image_1024 === 'string') {
    return product.image_1024.startsWith('http')
      ? `${product.image_1024}?t=${Date.now()}`
      : `${baseUrl}${product.image_1024}?t=${Date.now()}`;
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
      <div className="text-center py-20">
        <p className="text-lg font-medium">Chargement des produits...</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Nos Produits</h1>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-slate-700">Filtrer par catégorie</p>
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className="w-full max-w-xs rounded-lg border border-slate-200 px-4 py-2 text-sm shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
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
      ).map((category) => (
        <section key={category} className="mb-10">
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grouped[category].map((product) => {
              const imageUrl = getProductImage(product);
              const whatsappLink = `https://wa.me/22588899965?text=${encodeURIComponent(
                `Bonjour, je souhaite acheter le produit : ${product.name} (Réf : ${product.default_code}).`
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
  );
}
