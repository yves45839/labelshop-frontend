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
      `Bonjour Label Retail, je m'intéresse au produit ${product.name} (Réf : ${reference}). Pouvez-vous m'en dire plus ?`
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
    <div className="bg-[var(--lr-steel-50)] min-h-screen">
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-10 space-y-2">
          <span className="lr-eyebrow text-[var(--lr-orange-400)]">Recherche · {totalResults} {resultLabel}</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight">
            {totalResults} {resultLabel} pour{' '}
            <span className="text-[var(--lr-orange-400)]">«{query}»</span>
          </h1>
          <p className="text-sm text-white/60 max-w-2xl">
            Une question sur un produit ? Écrivez-nous sur WhatsApp, ou ajoutez vos articles au panier pour bâtir votre devis.
          </p>
        </div>
      </header>

      <main className="lr-container py-10 space-y-8">

      {hasResults ? (
        <section className="bg-white border border-[var(--lr-border)] p-6 relative">
          <span className="absolute top-0 left-0 h-1 w-16 bg-[var(--lr-orange-500)]" />
          <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between mb-4 pb-4 border-b border-[var(--lr-border)]">
            <div>
              <span className="lr-eyebrow text-[var(--lr-orange-700)]">Top des résultats</span>
              <h2 className="font-display text-xl font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">Les correspondances les plus proches</h2>
              <p className="text-sm text-[var(--lr-steel-700)] mt-1">
                Les produits qui collent le plus à votre recherche, pour gagner du temps.
              </p>
            </div>
            <span className="lr-tag lr-tag--orange">
              {featuredProducts.length} aperçu{featuredProducts.length > 1 ? 's' : ''}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <article
                key={product.id}
                className="flex h-full flex-col justify-between gap-4 border border-[var(--lr-border)] bg-white p-4 hover:border-[var(--lr-navy-800)] transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="h-16 w-16 border border-[var(--lr-border)] bg-white flex-shrink-0">
                    <img src={product.imageUrl} alt={product.name} className="h-full w-full object-contain" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">REF · {product.reference}</span>
                    <h3 className="font-display text-sm font-bold uppercase tracking-wide text-[var(--lr-navy-900)] line-clamp-2">{product.name}</h3>
                    <p className="font-display text-base font-bold text-[var(--lr-orange-700)] lr-tnum">{product.list_price.toLocaleString()} FCFA</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 border-t border-[var(--lr-border)] pt-3">
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center justify-center border border-[var(--lr-navy-900)] px-3 py-1.5 lr-mono text-[10px] uppercase tracking-widest font-semibold text-[var(--lr-navy-900)] hover:bg-[var(--lr-navy-900)] hover:text-white transition-colors"
                  >
                    Voir la fiche
                  </Link>
                  <a
                    href={product.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-emerald-600 px-3 py-1.5 lr-mono text-[10px] uppercase tracking-widest font-semibold text-white hover:bg-emerald-700 transition-colors"
                  >
                    WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={product.handleAdd}
                    className="inline-flex items-center justify-center bg-[var(--lr-orange-600)] px-3 py-1.5 lr-mono text-[10px] uppercase tracking-widest font-semibold text-white hover:bg-[var(--lr-orange-700)] transition-colors"
                  >
                    Ajouter
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section className="bg-white border border-dashed border-[var(--lr-border)] p-10 text-center">
          <span className="lr-mono text-xs text-[var(--lr-orange-600)]">// NO_MATCH</span>
          <p className="mt-2 font-display text-xl font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">Rien ne correspond à «{query}»</p>
          <p className="mt-2 text-sm text-[var(--lr-steel-700)]">
            {showingFallbackSuggestions
              ? "On vous propose quelques alternatives proches, à parcourir juste en dessous."
              : "Vérifiez l'orthographe, ou essayez avec un mot-clé plus large."}
          </p>
        </section>
      )}

      {hasResults ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 justify-items-stretch md:grid-cols-2 lg:grid-cols-3">
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
            <div className="flex items-center justify-center gap-3 lr-mono text-xs">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="border border-[var(--lr-navy-900)] bg-white px-4 py-2 uppercase tracking-widest font-semibold text-[var(--lr-navy-900)] enabled:hover:bg-[var(--lr-navy-900)] enabled:hover:text-white disabled:opacity-30 transition-colors"
              >
                Précédent
              </button>
              <span className="text-[var(--lr-steel-700)]">
                Page {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="border border-[var(--lr-navy-900)] bg-white px-4 py-2 uppercase tracking-widest font-semibold text-[var(--lr-navy-900)] enabled:hover:bg-[var(--lr-navy-900)] enabled:hover:text-white disabled:opacity-30 transition-colors"
              >
                Suivant
              </button>
            </div>
          )}
        </div>
      ) : null}

      {hasSuggestions && (
        <section className="bg-white border border-[var(--lr-border)] p-6">
          <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between mb-4 pb-4 border-b border-[var(--lr-border)]">
            <div>
              <span className="lr-eyebrow text-[var(--lr-orange-700)]">Produits similaires</span>
              <h2 className="font-display text-xl font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">
                {showingFallbackSuggestions
                  ? 'Pas de match exact, voici les références les plus proches'
                  : 'Ces produits pourraient vous intéresser'}
              </h2>
              <p className="text-sm text-[var(--lr-steel-700)] mt-1">
                {showingFallbackSuggestions
                  ? "Les modèles ci-dessous se rapprochent de votre recherche. Cliquez pour comparer."
                  : "Quelques suggestions à parcourir."}
              </p>
            </div>
            <span className="lr-tag lr-tag--orange">
              {suggestions.length} suggestion{suggestions.length > 1 ? 's' : ''}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 justify-items-stretch md:grid-cols-2 lg:grid-cols-3">
            {suggestions.slice(0, 6).map((product) => (
              <ProductCard
                key={product.id}
                imageUrl={getImageUrl(product)}
                name={product.name}
                reference={product.default_code?.trim() || 'NC'}
                slug={product.slug}
                price={product.list_price}
                whatsappLink={`https://wa.me/22588899965?text=${encodeURIComponent(
                  `Bonjour Label Retail, je m'intéresse au produit ${product.name} (Réf : ${product.default_code?.trim() || 'NC'}). Pouvez-vous m'en dire plus ?`
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
    </div>
  );
}
