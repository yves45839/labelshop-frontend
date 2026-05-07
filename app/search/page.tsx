import SearchResultsClient from '@/components/SearchResultsClient';
import { apiUrl } from '@/lib/api';

interface Product {
  id: number;
  name: string;
  slug: string;
  image_1024?: string;
  default_code?: string;
  list_price: number;
  [key: string]: unknown;
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim();
}

async function getProducts(q: string): Promise<Product[]> {
  const res = await fetch(
    apiUrl(`/products/search-products/?q=${encodeURIComponent(q)}&limit=50`),
    { cache: 'no-store' }
  );
  if (!res.ok) {
    return [];
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

async function getCatalog(): Promise<Product[]> {
  const res = await fetch(apiUrl('/products/get-products/'), {
    cache: 'no-store',
  });
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
  const normalizedQuery = normalize(query);
  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
  let enrichedProducts = products;

  if (normalizedQuery && products.length <= 1) {
    const catalog = await getCatalog();
    const localMatches = catalog.filter((product) => {
      const normalizedName = normalize(product.name);
      const normalizedReference = normalize((product.default_code as string | undefined) || '');
      return normalizedName.includes(normalizedQuery) || normalizedReference.includes(normalizedQuery);
    });

    if (localMatches.length > products.length) {
      enrichedProducts = localMatches;
    }
  }

  const broadenedQuery = tokens.find((token) => token.length >= 3) || normalizedQuery.slice(0, Math.min(normalizedQuery.length, 4));
  const suggestions = enrichedProducts.length === 0 && broadenedQuery ? await getProducts(broadenedQuery) : [];

  return <SearchResultsClient products={enrichedProducts} query={query} suggestions={suggestions} />;
}
