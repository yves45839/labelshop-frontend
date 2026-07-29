import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductGridClient from '@/components/ProductGridClient';
import { CATEGORY_INTROS, MAIN_CATEGORIES } from '@/lib/category';
import {
  categorySlug,
  findCategoryBySlug,
  groupProductsByCategory,
  listProductsServer,
  type Product,
} from '@/lib/products';
import {
  JsonLd,
  absoluteUrl,
  breadcrumbJsonLd,
  buildMetadata,
} from '@/lib/seo';

export const revalidate = 3600;

const PAGE_SIZE = 24;

export function generateStaticParams() {
  return MAIN_CATEGORIES.filter((c) => c !== 'Non classé').map((category) => ({
    category: categorySlug(category),
  }));
}

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { category: slug } = await props.params;
  const { page } = await props.searchParams;
  const category = findCategoryBySlug(slug);

  if (!category) {
    return { title: 'Catégorie introuvable', robots: { index: false, follow: false } };
  }

  const pageNum = Math.max(1, Number(page) || 1);
  const basePath = `/products/categories/${slug}`;
  const path = pageNum > 1 ? `${basePath}?page=${pageNum}` : basePath;

  return buildMetadata({
    title:
      pageNum > 1
        ? `${category} — page ${pageNum}`
        : `${category} — prix et modèles en Côte d'Ivoire`,
    description:
      CATEGORY_INTROS[category] ??
      `${category} : matériel installé et maintenu par Label Retail en Côte d'Ivoire.`,
    path,
    keywords: [category, `${category} Abidjan`, `${category} Côte d'Ivoire`, 'Label Retail'],
  });
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category: slug } = await params;
  const { page } = await searchParams;
  const category = findCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  let products: Product[] = [];
  try {
    const grouped = groupProductsByCategory(await listProductsServer());
    products = grouped[category] ?? [];
  } catch (error) {
    console.error(`Catégorie ${category} : chargement produits impossible`, error);
  }

  const pageNum = Math.max(1, Number(page) || 1);
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  if (pageNum > totalPages) {
    notFound();
  }
  const pageProducts = products.slice((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE);

  const basePath = `/products/categories/${slug}`;
  const intro =
    CATEGORY_INTROS[category] ??
    `${category} : matériel installé et maintenu par Label Retail en Côte d'Ivoire.`;

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category,
    url: absoluteUrl(basePath),
    numberOfItems: products.length,
    itemListElement: pageProducts.map((product, index) => ({
      '@type': 'ListItem',
      position: (pageNum - 1) * PAGE_SIZE + index + 1,
      name: product.name,
      url: absoluteUrl(`/products/${product.slug}`),
    })),
  };

  return (
    <div className="bg-[var(--lr-steel-50)] min-h-screen">
      <JsonLd
        data={[
          itemListJsonLd,
          breadcrumbJsonLd([
            { name: 'Accueil', path: '/' },
            { name: 'Produits', path: '/products' },
            { name: 'Catégories', path: '/products/categories' },
            { name: category, path: basePath },
          ]),
        ]}
      />

      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-12">
          <nav className="flex items-center gap-2 lr-mono text-[11px] text-white/60 flex-wrap">
            <Link href="/" className="hover:text-[var(--lr-orange-400)]" prefetch={false}>Accueil</Link>
            <span className="text-white/30">/</span>
            <Link href="/products" className="hover:text-[var(--lr-orange-400)]" prefetch={false}>Produits</Link>
            <span className="text-white/30">/</span>
            <Link href="/products/categories" className="hover:text-[var(--lr-orange-400)]" prefetch={false}>Catégories</Link>
            <span className="text-white/30">/</span>
            <span className="text-white">{category}</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mt-4">{category}</h1>
          <p className="mt-3 text-white/70 text-sm max-w-2xl">{intro}</p>
          <div className="lr-stripe mt-6 max-w-xs" />
        </div>
      </header>

      <main className="lr-container py-10">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
          <span className="lr-mono text-xs text-[var(--lr-steel-500)]">
            {products.length} référence{products.length > 1 ? 's' : ''}
            {totalPages > 1 && ` · page ${pageNum}/${totalPages}`}
          </span>
          <Link href="/products/categories" className="lr-mono text-xs text-[var(--lr-orange-600)] hover:text-[var(--lr-navy-900)]" prefetch={false}>
            ← Toutes les catégories
          </Link>
        </div>

        {pageProducts.length === 0 ? (
          <div className="bg-white border border-dashed border-[var(--lr-border)] py-16 text-center">
            <p className="font-display text-lg uppercase tracking-wide text-[var(--lr-navy-900)]">
              Aucun produit en ligne dans cette catégorie pour le moment.
            </p>
            <Link href="/products" className="lr-mono text-sm text-[var(--lr-orange-600)] hover:underline mt-4 inline-block">
              Voir tout le catalogue →
            </Link>
          </div>
        ) : (
          <ProductGridClient products={pageProducts} />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-10 flex items-center justify-center gap-4" aria-label="Pagination">
            {pageNum > 1 && (
              <Link
                href={pageNum === 2 ? basePath : `${basePath}?page=${pageNum - 1}`}
                className="lr-btn-secondary text-sm"
                rel="prev"
                prefetch={false}
              >
                ← Page précédente
              </Link>
            )}
            <span className="lr-mono text-xs text-[var(--lr-steel-500)]">
              {pageNum} / {totalPages}
            </span>
            {pageNum < totalPages && (
              <Link
                href={`${basePath}?page=${pageNum + 1}`}
                className="lr-btn-secondary text-sm"
                rel="next"
                prefetch={false}
              >
                Page suivante →
              </Link>
            )}
          </nav>
        )}
      </main>
    </div>
  );
}
