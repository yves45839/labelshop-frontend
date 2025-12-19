'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';
import { addToCart } from '@/lib/cart';
import { mapProductCategory, MAIN_CATEGORIES } from '@/lib/category';

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
      .get('https://lr-samr.pythonanywhere.com/products/get-products/')
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
      <div className="text-center py-20">
        <p className="text-lg font-medium">Chargement des produits...</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Produits par catégorie</h1>
      {MAIN_CATEGORIES.filter((c) => grouped[c]).map((category) => (
        <section key={category} className="mb-10" id={category.toLowerCase().replace(/\s+/g, '-')}> 
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grouped[category].map((product) => {
              const imageUrl = product.image_1024?.startsWith('http')
                ? `${product.image_1024}?t=${Date.now()}`
                : `https://lr-samr.pythonanywhere.com${product.image_1024}?t=${Date.now()}`;
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
