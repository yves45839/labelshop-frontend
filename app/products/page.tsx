// app/products/page.jsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';

const api = axios.create({
  baseURL: 'https://labelshop-backend.onrender.com',
});

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cachedProducts = localStorage.getItem('cachedProducts');

    if (cachedProducts) {
      setProducts(JSON.parse(cachedProducts));
      setIsLoading(false);
    } else {
      api.get('/products/get-products/')
        .then(res => {
          setProducts(res.data);
          localStorage.setItem('cachedProducts', JSON.stringify(res.data));
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
          setIsLoading(false);
        });
    }
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
