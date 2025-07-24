import { notFound } from 'next/navigation';
import SearchResultsClient from '@/components/SearchResultsClient';

interface Product {
  id: number;
  name: string;
  slug: string;
  image_1024?: string;
  default_code?: string;
  list_price: number;
  [key: string]: unknown;
}

async function getProducts(q: string): Promise<Product[]> {
  const res = await fetch(
    `https://labelshop-backend.onrender.com/products/search-products/?q=${encodeURIComponent(q)}`,
    { cache: 'no-store' }
  );
  if (!res.ok) {
    return [];
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q?.toString().trim() ?? '';
  if (!q) {
    return (
      <main className="p-4 text-center">
        <p>Saisissez un terme dans la barre de recherche.</p>
      </main>
    );
  }

  const products = await getProducts(q);
  if (products.length === 0) {
    notFound();
  }

  return <SearchResultsClient products={products} query={q} />;
}
