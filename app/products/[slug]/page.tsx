import type { Metadata, ResolvingMetadata } from 'next';
import AddToCart from '@/components/AddToCart';
import { mapCategory } from '@/lib/category';

// 🔁 Récupère l'image
function getImageUrl(product: any): string {
  const baseUrl = 'https://labelshop-backend.onrender.com';

  if (product.image_1024?.startsWith('http')) {
    return product.image_1024;
  }

  if (product.image_1024?.startsWith('/')) {
    return `${baseUrl}${product.image_1024}`;
  }

  return '/default-product.png';
}

// 🔁 API : Récupère le produit
async function getProduct(slug: string) {
  const res = await fetch(
    `https://labelshop-backend.onrender.com/products/search-products/?q=${slug}`,
    { cache: 'no-store' }
  );

  if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) {
    return null;
  }

  const products = await res.json();
  return products?.[0] || null;
}

// ✅ SEO dynamique
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Produit introuvable',
      description: "Le produit recherché n'existe pas.",
    };
  }

  return {
    title: product.meta_title || product.name,
    description: product.meta_description,
    openGraph: {
      images: [{ url: getImageUrl(product) }],
    },
  };
}

// ✅ Page produit avec JSON-LD
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Produit introuvable</h1>
        <p>Le produit demandé n'existe pas ou a été supprimé.</p>
      </div>
    );
  }

  const imageUrl = getImageUrl(product);
  const whatsappLink = `https://wa.me/22588899965?text=${encodeURIComponent(
    `Je suis intéressé par le produit : ${product.name} (Réf : ${product.default_code})`
  )}`;
  const categoryName = mapCategory(product.categ_id);
  const priceDisplay =
    !product.hide_price && typeof product.list_price === 'number'
      ? `${product.list_price.toLocaleString()} FCFA`
      : null;
  const stockStatus = product.is_available
    ? {
        label: 'En stock',
        className:
          'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/40 shadow-[0_0_40px_-15px_rgba(16,185,129,0.7)]',
      }
    : {
        label: 'Rupture de stock',
        className:
          'bg-rose-500/10 text-rose-200 ring-1 ring-rose-400/40 shadow-[0_0_40px_-15px_rgba(244,63,94,0.7)]',
      };

  const infoHighlights = [
    { label: 'Catégorie', value: categoryName },
    { label: 'Marque', value: product.brand || 'Hikvision' },
    { label: 'Référence', value: product.default_code },
  ];

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: [imageUrl],
    description:
      product.meta_description || product.description || 'Produit Label Retail',
    sku: product.default_code,
    brand: {
      "@type": "Brand",
      name: product.brand || 'Label Retail',
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "XOF",
      price: product.list_price,
      availability: product.is_available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://labelretail.ci/products/${product.slug}`,
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-16 px-6 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-8 py-10 shadow-[0_45px_100px_-40px_rgba(56,189,248,0.35)] backdrop-blur">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_55%)]" />
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] xl:gap-16">
            <div className="flex flex-col justify-between gap-8">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-200">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 backdrop-blur transition ${stockStatus.className}`}>
                    {stockStatus.label}
                  </span>
                  {categoryName && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-slate-100">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      {categoryName}
                    </span>
                  )}
                </div>

                <h1 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {product.name}
                </h1>
                {product.meta_description && (
                  <p className="mt-4 max-w-2xl text-base text-slate-200/80 sm:text-lg">
                    {product.meta_description}
                  </p>
                )}
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-inner">
                <div className="absolute right-6 top-6 h-16 w-16 rounded-full bg-cyan-400/10 blur-xl" />
                <div className="relative grid gap-4 sm:grid-cols-3">
                  {infoHighlights.map((info) => (
                    <div
                      key={info.label}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 shadow-[0_20px_45px_-35px_rgba(14,165,233,0.65)]"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-300/60">
                        {info.label}
                      </p>
                      <p className="mt-2 font-semibold text-white">{info.value || '—'}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative flex flex-col gap-6 rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/70 via-slate-900/30 to-slate-900/70 p-8 shadow-[0_45px_80px_-50px_rgba(59,130,246,0.55)]">
              <div className="absolute -right-20 top-8 hidden h-48 w-48 rounded-full bg-cyan-500/30 blur-3xl lg:block" />
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="h-80 w-full object-contain object-center bg-gradient-to-br from-slate-900 via-slate-950 to-black"
                />
              </div>

              <div className="space-y-4">
                {priceDisplay ? (
                  <p className="text-3xl font-semibold text-white">
                    <span className="block text-sm font-medium uppercase tracking-[0.3em] text-slate-300/70">
                      Prix indicatif
                    </span>
                    {priceDisplay}
                  </p>
                ) : (
                  <p className="text-lg font-medium text-slate-200">
                    Contactez-nous pour obtenir un devis personnalisé.
                  </p>
                )}

                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-500/20 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-emerald-100 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-400/30 hover:text-white"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                      alt="WhatsApp"
                      className="h-5 w-5"
                    />
                    Discuter sur WhatsApp
                  </a>
                  <div className="rounded-full border border-white/15 bg-white/5 p-[2px]">
                    <AddToCart
                      product={{
                        id: product.id,
                        name: product.name,
                        imageUrl,
                        price: product.list_price,
                      }}
                    />
                  </div>
                </div>

                <p className="text-sm text-slate-300/90">
                  Livraison rapide sur toute la Côte d'Ivoire et installation possible par nos équipes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-100 shadow-[0_35px_80px_-45px_rgba(14,165,233,0.65)] backdrop-blur">
            <h2 className="text-xl font-semibold text-white">Description détaillée</h2>
            <div className="prose prose-invert mt-4 max-w-none text-base leading-relaxed text-slate-200/90">
              <p>
                {product.description && product.description !== 'False'
                  ? product.description
                  : product.meta_description || 'Description bientôt disponible.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_70px_-50px_rgba(56,189,248,0.55)] backdrop-blur">
              <h3 className="text-lg font-semibold text-white">Informations complémentaires</h3>
              <dl className="mt-4 space-y-3 text-sm text-slate-200/80">
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <dt className="uppercase tracking-[0.3em] text-xs text-slate-300/70">
                    SKU
                  </dt>
                  <dd className="font-semibold text-white">{product.default_code || '—'}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <dt className="uppercase tracking-[0.3em] text-xs text-slate-300/70">
                    Marque
                  </dt>
                  <dd className="font-semibold text-white">{product.brand || 'Hikvision'}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <dt className="uppercase tracking-[0.3em] text-xs text-slate-300/70">
                    Catégorie
                  </dt>
                  <dd className="font-semibold text-white">{categoryName || '—'}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <dt className="uppercase tracking-[0.3em] text-xs text-slate-300/70">
                    Disponibilité
                  </dt>
                  <dd className="font-semibold text-white">{stockStatus.label}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-3xl border border-cyan-400/40 bg-cyan-500/10 p-8 text-cyan-50 shadow-[0_30px_70px_-45px_rgba(14,165,233,0.55)]">
              <h3 className="text-lg font-semibold">Besoin d'un accompagnement ?</h3>
              <p className="mt-3 text-sm text-cyan-50/80">
                Nos experts Label Retail vous conseillent sur le choix, la configuration et
                l'installation de vos équipements de sécurité.
              </p>
              <a
                href="tel:+2250788899965"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-cyan-100 transition hover:text-white"
              >
                <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                Appeler le service commercial (+225 07 888 999 65)
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ✅ JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
