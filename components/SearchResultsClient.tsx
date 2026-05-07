'use client';
import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { addToCart } from '@/lib/cart';
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

function getImageUrl(product: Product): string {
  if (product.image_1024 && typeof product.image_1024 === 'string') {
    return `${apiUrl(product.image_1024)}?t=${Date.now()}`;
  }
  return '/default-product.png';
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim();
}

function diceCoefficient(a: string, b: string): number {
  if (!a || !b) return 0;
  if (a === b) return 1;

  const bigrams = new Map<string, number>();
  for (let i = 0; i < a.length - 1; i += 1) {
    const gram = a.slice(i, i + 2);
    bigrams.set(gram, (bigrams.get(gram) || 0) + 1);
  }

  let intersectionSize = 0;
  for (let i = 0; i < b.length - 1; i += 1) {
    const gram = b.slice(i, i + 2);
    const count = bigrams.get(gram) || 0;
    if (count > 0) {
      bigrams.set(gram, count - 1);
      intersectionSize += 1;
    }
  }

  const totalBigrams = a.length + b.length - 2;
  return totalBigrams === 0 ? 0 : (2 * intersectionSize) / totalBigrams;
}

function getRelevanceScore(product: Product, normalizedQuery: string): number {
  const reference = product.default_code?.trim() || '';
  const normalizedName = normalize(product.name);
  const normalizedReference = normalize(reference);
  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);

  const mainSimilarity = diceCoefficient(normalizedName, normalizedQuery);
  const tokenBonus = tokens.reduce((score, token) => {
    if (normalizedName.startsWith(token)) return score + 0.25;
    if (normalizedName.includes(token)) return score + 0.15;
    return score;
  }, 0);

  const referenceBonus = normalizedReference && normalizedQuery && normalizedReference.includes(normalizedQuery) ? 0.2 : 0;

  return Math.min(1, mainSimilarity + tokenBonus + referenceBonus);
}

export default function SearchResultsClient({
  products,
  query,
  suggestions = [],
}: {
  products: Product[];
  query: string;
  suggestions?: Product[];
}) {
  const totalResults = products.length;
  const resultLabel = totalResults > 1 ? 'résultats' : 'résultat';
  const normalizedQuery = normalize(query);
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 12;
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));
  const enhancedProducts = products.map((product) => {
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

    const relevance = getRelevanceScore(product, normalizedQuery);

    return { ...product, imageUrl, reference, whatsappLink, handleAdd, relevance };
  });

  const sortedProducts = enhancedProducts
    .slice()
    .sort((a, b) => (b.relevance || 0) - (a.relevance || 0));

  const featuredProducts = sortedProducts.slice(0, 6);
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const hasResults = paginatedProducts.length > 0;
  const hasSuggestions = suggestions.length > 0;
  const showingFallbackSuggestions = !hasResults && hasSuggestions;

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

      {hasResults ? (
        <section className="space-y-4 rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-6 shadow-sm">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-500">Résultats intermédiaires</p>
              <h2 className="text-xl font-bold text-slate-900">Vos correspondances les plus prometteuses</h2>
              <p className="text-sm text-slate-600">
                Un aperçu rapide des meilleures options trouvées, pour vous aider à affiner immédiatement votre sélection.
              </p>
            </div>
            <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-orange-700">
              {featuredProducts.length} aperçu{featuredProducts.length > 1 ? 's' : ''}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <article
                key={product.id}
                className="flex h-full flex-col justify-between gap-4 rounded-xl border border-orange-100 bg-white/80 p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="h-16 w-16 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                    <img src={product.imageUrl} alt={product.name} className="h-full w-full object-contain" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Aperçu rapide</p>
                    <h3 className="text-sm font-bold text-slate-900">{product.name}</h3>
                    <p className="text-xs text-slate-500">Réf. {product.reference}</p>
                    <p className="text-sm font-semibold text-orange-600">{product.list_price.toLocaleString()} FCFA</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center justify-center rounded-lg border border-orange-200 px-3 py-2 text-xs font-semibold text-orange-700 transition duration-200 hover:border-orange-300 hover:bg-orange-50"
                  >
                    Voir la fiche
                  </Link>
                  <a
                    href={product.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-white shadow-sm transition duration-200 hover:bg-emerald-600"
                  >
                    WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={product.handleAdd}
                    className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-orange-700 transition duration-200 hover:border-orange-300 hover:text-orange-800"
                  >
                    Ajouter
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-900">Aucun produit trouvé pour «{query}»</p>
          <p className="text-sm text-slate-600">
            {showingFallbackSuggestions
              ? 'Nous avons cherché des alternatives proches pour vous proposer des produits similaires à explorer.'
              : "Vérifiez l'orthographe ou essayez un terme plus générique."}
          </p>
        </section>
      )}

      {hasResults ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-8 justify-items-center md:grid-cols-2 lg:grid-cols-3">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                imageUrl={product.imageUrl}
                name={product.name}
                reference={product.reference}
                slug={product.slug}
                price={product.list_price}
                whatsappLink={product.whatsappLink}
                onAddToCart={product.handleAdd}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-700">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 transition duration-200 enabled:hover:border-orange-200 enabled:hover:text-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Précédent
              </button>
              <span>
                Page {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 transition duration-200 enabled:hover:border-orange-200 enabled:hover:text-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Suivant
              </button>
            </div>
          )}
        </div>
      ) : null}

      {hasSuggestions && (
        <section className="space-y-4 rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-500">Produits similaires</p>
              <h2 className="text-xl font-bold text-slate-900">
                {showingFallbackSuggestions
                  ? 'Aucun résultat exact — voici des produits proches'
                  : 'Ces articles pourraient vous intéresser'}
              </h2>
              <p className="text-sm text-slate-600">
                {showingFallbackSuggestions
                  ? 'Nous affichons les références les plus proches de votre recherche pour que vous puissiez choisir rapidement.'
                  : 'Suggestions proches de votre recherche.'}
              </p>
            </div>
            <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-orange-700">
              {suggestions.length} suggestion{suggestions.length > 1 ? 's' : ''}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-8 justify-items-center md:grid-cols-2 lg:grid-cols-3">
            {suggestions.slice(0, 6).map((product) => (
              <ProductCard
                key={product.id}
                imageUrl={getImageUrl(product)}
                name={product.name}
                reference={product.default_code?.trim() || 'NC'}
                slug={product.slug}
                price={product.list_price}
                whatsappLink={`https://wa.me/22588899965?text=${encodeURIComponent(
                  `Bonjour, je souhaite acheter le produit : ${product.name} (Réf : ${product.default_code?.trim() || 'NC'}).`
                )}`}
                onAddToCart={async () =>
                  addToCart({
                    product_id: product.id,
                    quantity: 1,
                    product_name: product.name,
                    product_image: getImageUrl(product),
                    price: product.list_price,
                  })
                }
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
