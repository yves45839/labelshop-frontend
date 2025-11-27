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
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams;
  const query = q.toString().trim();
  if (!query) {
    return (
      <main className="p-4 text-center">
        <p>Saisissez un terme dans la barre de recherche.</p>
      </main>
    );
  }

  const products = await getProducts(query);
  const tokens = query.split(/\s+/).filter(Boolean);
  const broadenedQuery = tokens.find((token) => token.length >= 3) || query.slice(0, Math.min(query.length, 4));
  const suggestions = products.length === 0 && broadenedQuery ? await getProducts(broadenedQuery) : [];

  return <SearchResultsClient products={products} query={query} suggestions={suggestions} />;
}
