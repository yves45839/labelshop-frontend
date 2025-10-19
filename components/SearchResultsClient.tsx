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
  const totalResults = products.length;
  const resultLabel = totalResults > 1 ? 'résultats' : 'résultat';

  return (
    <main className="container mx-auto space-y-8 px-4 py-10">
      <header className="space-y-2 text-center md:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-500">Recherche</p>
        <h1 className="text-3xl font-bold text-slate-900">
          {totalResults} {resultLabel} pour{' '}
          <span className="text-orange-600">«{query}»</span>
        </h1>
        <p className="text-sm text-slate-500">
          Besoin d'aide pour finaliser votre choix ? Contactez-nous sur WhatsApp ou
          ajoutez vos produits au panier pour créer votre sélection personnalisée.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-8 justify-items-center md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const imageUrl = getImageUrl(product);
          const reference = product.default_code?.trim() || 'NC';
          const whatsappLink = `https://wa.me/22588899965?text=${encodeURIComponent(
            `Bonjour, je souhaite acheter le produit : ${product.name} (Réf : ${reference}).`
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
              reference={reference}
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
