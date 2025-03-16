'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

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
      api.get('/products/search-products/')
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
          <Link href={`/products/${product.slug}`} key={product.id} className="group"> {/* ✅ correction exacte ici */}
            <div className="border shadow rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={product.image_512 || '/default-product.png'}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors duration-300">
                  {product.name}
                </h2>
                <p className="text-gray-600">
                  {product.default_code || " "}
                </p>
                <span className="font-bold text-lg mt-2 block text-green-600">
                  {product.list_price.toLocaleString()} FCFA
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
