'use client';
import ProductCard from '@/components/ProductCard';
import { addToCart } from '@/lib/cart';

interface Product {
  id: number;
  name: string;
  slug: string;
  image_1024?: string;
  default_code?: string;
  list_price: number;
  [key: string]: unknown;
}

function getImageUrl(product: Product): string {
  const baseUrl = 'https://labelshop-backend.onrender.com';
  if (product.image_1024 && typeof product.image_1024 === 'string') {
    return product.image_1024.startsWith('http')
      ? `${product.image_1024}?t=${Date.now()}`
      : `${baseUrl}${product.image_1024}?t=${Date.now()}`;
  }
  return '/default-product.png';
}

export default function SearchResultsClient({
  products,
  query,
}: {
  products: Product[];
  query: string;
}) {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Résultats pour {query}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const imageUrl = getImageUrl(product);
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
    </main>
  );
}
