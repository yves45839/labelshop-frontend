import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa';
import type { Metadata, ResolvingMetadata } from 'next';
import AddToCart from '@/components/AddToCart';
import { mapProductCategory } from '@/lib/category';
import { apiUrl } from '@/lib/api';
import { categoryPath } from '@/lib/products';
import { absoluteUrl, productJsonLd } from '@/lib/seo';
import { relatedArticlesForCategory } from '@/lib/related';

// 🔁 Récupère l'image
function getImageUrl(product: any): string {
  if (product.image_1024?.startsWith('http')) {
    return product.image_1024;
  }

  if (product.image_1024?.startsWith('/')) {
    return apiUrl(product.image_1024);
  }

  return '/default-product.png';
}

// 🔁 API : Récupère le produit (cache 1h pour de meilleures perfs SEO)
async function getProduct(slug: string) {
  const res = await fetch(
    apiUrl(`/products/search-products/?q=${slug}`),
    { next: { revalidate: 3600 } }
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
      robots: { index: false, follow: false },
    };
  }

  const brand = product.brand?.trim() || 'Label Retail';
  const categoryName = mapProductCategory(product) || 'Équipement de sécurité';
  const isHikvision = brand.toLowerCase().includes('hikvision');
  const imageUrl = getImageUrl(product);
  const canonicalUrl = `https://labelretail.ci/products/${product.slug}`;

  const title =
    product.meta_title || `${brand} ${product.name} | Réf ${product.default_code || product.slug}`;
  const description =
    product.meta_description ||
    (isHikvision
      ? `${product.name}, référence Hikvision ${product.default_code || product.slug}. Disponible chez Label Retail à Abidjan, configuration et support assurés par nos techniciens.`
      : `${brand} ${product.name}, en stock à Abidjan. Référence ${product.default_code || product.slug}. Livraison suivie et support technique par notre équipe locale.`);

  const priceMeta: Metadata['other'] = {
    'product:brand': brand,
    'product:availability': product.is_available === false ? 'oos' : 'instock',
    ...(!product.hide_price && typeof product.list_price === 'number'
      ? {
          'product:price:amount': product.list_price.toString(),
          'product:price:currency': 'XOF',
        }
      : {}),
  };

  return {
    title,
    description,
    keywords: [
      product.name,
      brand,
      product.default_code?.toString(),
      categoryName,
      "sécurité électronique Côte d'Ivoire",
      'vidéosurveillance Abidjan',
      'installation caméra de surveillance',
      'Label Retail',
    ].filter(Boolean) as string[],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Label Retail',
      type: 'website',
      locale: 'fr_CI',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Image de ${product.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      site: '@LabelRetail',
    },
    robots: { index: true, follow: true },
    other: priceMeta,
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
    notFound();
  }

  const imageUrl = getImageUrl(product);
  const brand = product.brand?.trim() || 'Hikvision';
  const isHikvision = brand.toLowerCase().includes('hikvision');
  const whatsappLink = `https://wa.me/22588899965?text=${encodeURIComponent(
    `Bonjour Label Retail, je m'intéresse au produit ${product.name} (Réf : ${product.default_code}). Pouvez-vous m'en dire plus ?`
  )}`;
  const categoryName = mapProductCategory(product);
  const relatedArticles = await relatedArticlesForCategory(categoryName);
  const categoryChips = Array.from(
    new Set(
      [
        mapProductCategory(product),
        product.category_main,
        product.category_sub,
        product.category_type,
        product.categ_id,
      ]
        .filter((value): value is string => Boolean(value))
        .map((value) => value.trim())
    )
  );
  const priceDisplay =
    !product.hide_price && typeof product.list_price === 'number'
      ? `${product.list_price.toLocaleString()} FCFA`
      : null;
  const trustBadge = {
    label: 'Vérifié par Label Retail',
    className:
      'bg-emerald-50 text-emerald-700 border border-emerald-300',
  };

  const infoHighlights = [
    { label: 'Catégorie', value: categoryName },
    { label: 'Marque', value: brand },
    { label: 'Référence', value: product.default_code },
  ];

  const seoIntro =
    product.meta_description ||
    `${brand} ${product.name}, en stock à Abidjan. Référence ${product.default_code || product.slug}. Nos techniciens s'occupent du paramétrage et restent joignables après installation.`;

  const serviceHighlights = [
    {
      title: 'Livraison suivie',
      detail: "Expédition depuis Abidjan, avec numéro de suivi et emballage renforcé pour les zones reculées.",
    },
    {
      title: 'Configuration & maintenance',
      detail:
        "Nos techniciens certifiés s'occupent du paramétrage, des mises à jour firmware et de l'intégration sur votre réseau.",
    },
    {
      title: isHikvision ? 'Compatibilité Hikvision garantie' : "Compatibilité avec votre installation",
      detail: isHikvision
        ? "Fonctionne avec les NVR, caméras et accessoires Hikvision déjà en place."
        : "On vérifie l'intégration avec votre infrastructure (NVR, stockage, réseau PoE) avant de livrer.",
    },
    {
      title: 'Conseil avant achat',
      detail:
        "Un doute sur le modèle, le nombre d'unités ou le câblage ? On en discute avant la commande.",
    },
  ];

  const faqItems = [
    {
      question: 'Quels sont les délais de livraison ?',
      answer:
        "Comptez 24 à 72 heures selon la localité. Pour Abidjan, c'est en général le jour même ou le lendemain.",
    },
    {
      question: 'Le produit est-il compatible avec mon enregistreur ?',
      answer: isHikvision
        ? "Oui, c'est nativement compatible avec les NVR Hikvision. On vérifie aussi avec vos accessoires existants."
        : "On confirme la compatibilité avec votre NVR ou votre solution de stockage avant de lancer le déploiement.",
    },
    {
      question: "Proposez-vous de l'assistance après l'achat ?",
      answer:
        "Oui. On reste joignables pour la configuration, la maintenance préventive et les mises à jour de sécurité.",
    },
    {
      question: 'Comment obtenir des conseils personnalisés ?',
      answer:
        "Décrivez-nous votre site (taille, usage, budget). On vous renvoie une préconisation, un guide de pose et une checklist réseau.",
    },
  ];

  const breadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: 'Accueil',
        item: 'https://labelretail.ci/',
      },
      {
        "@type": "ListItem",
        position: 2,
        name: 'Produits',
        item: 'https://labelretail.ci/products',
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryName,
        item: absoluteUrl(categoryPath(categoryName)),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: absoluteUrl(`/products/${product.slug}`),
      },
    ].filter((item) => Boolean(item.name)),
  };

  const faqJsonLd = {
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      productJsonLd(product, imageUrl, categoryName),
      breadcrumbList,
      faqJsonLd,
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--lr-steel-50)]">
      {/* Header navy avec breadcrumb */}
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-4">
          <nav className="flex items-center gap-2 lr-mono text-[11px] text-white/60 flex-wrap">
            <Link href="/" className="hover:text-[var(--lr-orange-400)]" prefetch={false}>Accueil</Link>
            <span className="text-white/30">/</span>
            <Link href="/products" className="hover:text-[var(--lr-orange-400)]" prefetch={false}>Produits</Link>
            {categoryName && (
              <>
                <span className="text-white/30">/</span>
                <Link
                  href={categoryPath(categoryName)}
                  className="hover:text-[var(--lr-orange-400)]"
                  prefetch={false}
                >
                  {categoryName}
                </Link>
              </>
            )}
            <span className="text-white/30">/</span>
            <span className="text-white">{product.name}</span>
          </nav>
        </div>
      </header>

      <main className="lr-container py-10">
        {/* Bloc principal : visuel + identité + achat */}
        <section className="bg-white border border-[var(--lr-border)] shadow-sm">
          <div className="lr-stripe" />
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">

            {/* Visuel */}
            <div className="relative bg-white p-8 lr-blueprint border-r border-[var(--lr-border)]">
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[var(--lr-orange-500)]" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[var(--lr-orange-500)]" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[var(--lr-orange-500)]" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[var(--lr-orange-500)]" />
              <Image
                src={imageUrl}
                alt={product.name}
                width={768}
                height={384}
                priority
                className="h-96 w-full object-contain"
              />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 lr-mono text-[10px] text-[var(--lr-navy-800)] bg-white/80 px-2 py-0.5">
                REF · {product.default_code || product.slug}
              </div>
            </div>

            {/* Bloc identité + actions */}
            <div className="p-8 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center px-3 py-1 lr-eyebrow ${trustBadge.className}`}>
                  {trustBadge.label}
                </span>
                {categoryChips.slice(0, 3).map((category) => (
                  <span key={category} className="lr-tag">{category}</span>
                ))}
              </div>

              <div>
                <span className="lr-eyebrow text-[var(--lr-orange-700)]">{brand}</span>
                <h1 className="font-display text-3xl md:text-4xl font-bold uppercase leading-tight tracking-tight text-[var(--lr-navy-900)] mt-2">
                  {product.name}
                </h1>
              </div>

              <p className="text-sm md:text-base text-[var(--lr-steel-700)] leading-relaxed border-l-2 border-[var(--lr-orange-500)] pl-4">
                {seoIntro}
              </p>

              {/* Bloc prix */}
              <div className="flex items-end justify-between border-y border-[var(--lr-border)] py-4">
                <div>
                  <span className="lr-eyebrow text-[var(--lr-steel-500)]">Prix indicatif</span>
                  {priceDisplay ? (
                    <div className="font-display text-4xl font-bold text-[var(--lr-navy-900)] lr-tnum mt-1">
                      {priceDisplay}
                    </div>
                  ) : (
                    <div className="font-display text-lg font-semibold text-[var(--lr-navy-900)] mt-1">
                      Écrivez-nous pour obtenir un devis sur mesure.
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500" />
                  <span className="lr-eyebrow text-emerald-700">En stock</span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-5 py-3 font-display text-sm font-semibold uppercase tracking-widest text-white border border-emerald-700 transition-colors"
                >
                  <FaWhatsapp aria-hidden className="h-5 w-5" />
                  Discuter sur WhatsApp
                </a>
                <AddToCart
                  product={{
                    id: product.id,
                    name: product.name,
                    imageUrl,
                    price: product.list_price,
                  }}
                />
              </div>

              <p className="lr-mono text-xs text-[var(--lr-steel-500)] tracking-wide">
                // Livraison rapide partout en Côte d'Ivoire. Paramétrage inclus pour un démarrage sans accroc.
              </p>

              {/* Specs grid */}
              <div className="grid grid-cols-3 gap-px bg-[var(--lr-border)] border border-[var(--lr-border)]">
                {infoHighlights.map((info) => (
                  <div key={info.label} className="bg-white p-3">
                    <p className="lr-eyebrow text-[var(--lr-steel-500)]">{info.label}</p>
                    <p className="mt-1 font-display text-sm font-bold uppercase text-[var(--lr-navy-900)]">{info.value || '—'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bandeau Hikvision */}
        {isHikvision && (
          <section className="mt-6 bg-[var(--lr-navy-900)] text-white border border-[var(--lr-orange-500)]">
            <div className="grid md:grid-cols-[auto_1fr] gap-6 p-6 md:p-8">
              <div className="flex flex-col items-start gap-2">
                <span className="lr-mono text-[10px] text-[var(--lr-orange-400)]">// HIKVISION OFFICIEL</span>
                <h2 className="font-display text-xl font-bold uppercase tracking-wide">Référence Hikvision officielle</h2>
              </div>
              <div className="space-y-3 text-sm text-white/80">
                <p>
                  {product.default_code || product.slug} : on a la pièce en stock chez nous, prête à être expédiée
                  partout en Côte d'Ivoire. On vous accompagne ensuite pour la mise en route.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 border-l-2 border-[var(--lr-orange-500)] pl-3">
                    <span>Compatible avec votre écosystème Hikvision (NVR, caméras, accessoires).</span>
                  </li>
                  <li className="flex items-start gap-2 border-l-2 border-[var(--lr-orange-500)] pl-3">
                    <span>Configuration, maintenance et mises à jour firmware assurées par nos techniciens.</span>
                  </li>
                  <li className="flex items-start gap-2 border-l-2 border-[var(--lr-orange-500)] pl-3">
                    <span>Conseil sur le placement, le réseau et la sécurité de votre installation.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Service highlights */}
        <section className="mt-6 grid gap-px bg-[var(--lr-border)] border border-[var(--lr-border)] sm:grid-cols-2 lg:grid-cols-4">
          {serviceHighlights.map((item, idx) => (
            <div key={item.title} className="bg-white p-5 relative">
              <span className="absolute top-0 left-0 h-0.5 w-10 bg-[var(--lr-orange-500)]" />
              <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">SERV.0{idx + 1}</span>
              <h3 className="mt-2 font-display text-base font-bold uppercase tracking-wide text-[var(--lr-navy-900)] leading-tight">{item.title}</h3>
              <p className="mt-2 text-xs text-[var(--lr-steel-700)] leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </section>

        {/* Description + sidebar */}
        <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-white border border-[var(--lr-border)] p-6 md:p-8">
            <div className="lr-section-heading mb-5">
              <span className="bar" />
              <h2 className="font-display text-xl font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">Description détaillée</h2>
            </div>
            <div className="text-base leading-relaxed text-[var(--lr-steel-700)] space-y-4">
              <p>
                {product.description && product.description !== 'False'
                  ? product.description
                  : product.meta_description || seoIntro}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm border-l-2 border-[var(--lr-orange-500)] pl-3">Livraison suivie en Côte d'Ivoire, emballage renforcé pour les longs trajets.</li>
                <li className="flex items-start gap-2 text-sm border-l-2 border-[var(--lr-border)] pl-3">Aide à la configuration réseau, à l'accès mobile et aux mises à jour de sécurité.</li>
                <li className="flex items-start gap-2 text-sm border-l-2 border-[var(--lr-border)] pl-3">
                  Référence {product.default_code || product.slug}, compatibilité vérifiée{' '}
                  {isHikvision ? "avec l'écosystème Hikvision (NVR, caméras, accessoires)." : 'avec votre infrastructure existante.'}
                </li>
                <li className="flex items-start gap-2 text-sm border-l-2 border-[var(--lr-border)] pl-3">Préconisations et guides de pose rédigés par nos techniciens, pas par un robot.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-[var(--lr-border)] p-6 md:p-8">
              <div className="lr-section-heading mb-5">
                <span className="bar" />
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">Informations complémentaires</h3>
              </div>
              <dl className="space-y-0 border-t border-[var(--lr-border)]">
                <div className="grid grid-cols-[120px_1fr] gap-3 py-3 border-b border-[var(--lr-border)]">
                  <dt className="lr-eyebrow text-[var(--lr-steel-500)]">SKU</dt>
                  <dd className="lr-mono text-sm font-semibold text-[var(--lr-navy-900)]">{product.default_code || '—'}</dd>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-3 py-3 border-b border-[var(--lr-border)]">
                  <dt className="lr-eyebrow text-[var(--lr-steel-500)]">Marque</dt>
                  <dd className="text-sm font-semibold text-[var(--lr-navy-900)]">{product.brand || 'Hikvision'}</dd>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-3 py-3 border-b border-[var(--lr-border)]">
                  <dt className="lr-eyebrow text-[var(--lr-steel-500)]">Catégorie</dt>
                  <dd className="text-sm font-semibold text-[var(--lr-navy-900)]">{categoryName || '—'}</dd>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-3 py-3 border-b border-[var(--lr-border)]">
                  <dt className="lr-eyebrow text-[var(--lr-steel-500)]">Support</dt>
                  <dd className="text-sm text-[var(--lr-navy-900)]">Réponse sous 24 h avec préconisation réseau</dd>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-3 py-3">
                  <dt className="lr-eyebrow text-[var(--lr-steel-500)]">Livraison</dt>
                  <dd className="text-sm text-[var(--lr-navy-900)]">Colis suivi à Abidjan et en région</dd>
                </div>
              </dl>
            </div>

            <div className="bg-[var(--lr-navy-900)] text-white border border-[var(--lr-navy-800)] p-6 md:p-8 relative">
              <span className="absolute top-0 left-0 h-1 w-16 bg-[var(--lr-orange-500)]" />
              <h3 className="font-display text-lg font-bold uppercase tracking-wide">Vous voulez en parler à quelqu'un ?</h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                Notre équipe vous aide à choisir, à configurer et à entretenir votre matériel. Un appel et c'est plié.
              </p>
              <a
                href="tel:+2250788899965"
                className="mt-5 inline-flex items-center gap-2 lr-mono text-sm font-semibold text-[var(--lr-orange-400)] hover:text-white border-b border-[var(--lr-orange-400)] hover:border-white pb-1 transition-colors"
              >
                <span className="inline-flex h-2 w-2 bg-[var(--lr-orange-400)]" />
                Appeler le service commercial (+225 07 88 89 99 65)
              </a>
            </div>

            <div className="bg-white border border-[var(--lr-border)] p-6 md:p-8">
              <div className="lr-section-heading mb-5">
                <span className="bar" />
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">FAQ rapide</h3>
              </div>
              <dl className="space-y-3 text-sm">
                {faqItems.map((item) => (
                  <div key={item.question} className="border-l-2 border-[var(--lr-orange-500)] pl-4 py-1">
                    <dt className="font-display font-semibold uppercase tracking-wide text-[var(--lr-navy-900)] text-sm">{item.question}</dt>
                    <dd className="mt-1 text-[var(--lr-steel-700)]">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="bg-white border border-[var(--lr-border)] p-6 md:p-8">
              <div className="lr-section-heading mb-5">
                <span className="bar" />
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">Pour aller plus loin</h3>
              </div>
              <p className="text-sm text-[var(--lr-steel-700)]">
                Quelques ressources pour préparer votre projet vidéosurveillance en Côte d'Ivoire.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {relatedArticles.map((article) => (
                  <li key={article.path}>
                    <Link href={article.path} className="lr-link flex items-center gap-2" prefetch={false}>
                      <span className="text-[var(--lr-orange-500)]">›</span>
                      {article.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/blogs" className="lr-link flex items-center gap-2" prefetch={false}>
                    <span className="text-[var(--lr-orange-500)]">›</span>
                    Notre blog : conseils et retours de chantier
                  </Link>
                </li>
                <li>
                  <Link href="/products/categories" className="lr-link flex items-center gap-2" prefetch={false}>
                    <span className="text-[var(--lr-orange-500)]">›</span>
                    Toutes les catégories de produits
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="lr-link flex items-center gap-2" prefetch={false}>
                    <span className="text-[var(--lr-orange-500)]">›</span>
                    L'équipe et nos certifications
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
