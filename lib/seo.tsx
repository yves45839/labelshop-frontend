import type { Metadata } from 'next';

/** Domaine canonique unique — surchargez via NEXT_PUBLIC_SITE_URL en déploiement. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://labelretail.ci').replace(/\/$/, '');
export const SITE_NAME = 'Label Retail';
export const SITE_LOCALE = 'fr_FR';
export const SITE_TWITTER = '@LabelRetail';

export const ORG = {
  name: SITE_NAME,
  legalName: 'Label Retail',
  phone: '+2250788899965',
  whatsapp: 'https://wa.me/2250788899965',
  email: 'roland@label-ci.com',
  logo: `${SITE_URL}/images/lr.png`,
  streetAddress: 'Abidjan',
  addressLocality: 'Abidjan',
  addressRegion: 'Lagunes',
  addressCountry: 'CI',
  sameAs: [
    'https://www.facebook.com/labelretail',
    'https://www.linkedin.com/company/labelretail',
  ],
};

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Slug URL sans accents ni ponctuation (ex : "Vidéosurveillance IP & IA" → "videosurveillance-ip-ia"). */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['’]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Tronque un texte brut à ~155 caractères pour une meta description. */
export function metaDescription(text: string, max = 155): string {
  const clean = text
    .replace(/[#*_`>\[\]()]/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).replace(/\s+\S*$/, '')}…`;
}

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  keywords?: string[];
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
};

/** Metadata complète et cohérente (canonical, OG, Twitter) pour une page indexable. */
export function buildMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  noindex = false,
  keywords,
  ogType = 'website',
  publishedTime,
  modifiedTime,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const images = image
    ? [{ url: absoluteUrl(image), width: 1200, height: 630, alt: imageAlt ?? title }]
    : undefined;

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: ogType,
      ...(images ? { images } : {}),
      ...(ogType === 'article' && publishedTime ? { publishedTime } : {}),
      ...(ogType === 'article' && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      site: SITE_TWITTER,
      ...(image ? { images: [absoluteUrl(image)] } : {}),
    },
  };
}

/* ------------------------------------------------------------------ */
/* Builders JSON-LD                                                    */
/* ------------------------------------------------------------------ */

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: ORG.name,
    url: SITE_URL,
    logo: ORG.logo,
    telephone: ORG.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ORG.streetAddress,
      addressLocality: ORG.addressLocality,
      addressRegion: ORG.addressRegion,
      addressCountry: ORG.addressCountry,
    },
    sameAs: ORG.sameAs,
  };
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'fr',
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: ORG.name,
    url: SITE_URL,
    image: ORG.logo,
    telephone: ORG.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ORG.streetAddress,
      addressLocality: ORG.addressLocality,
      addressRegion: ORG.addressRegion,
      addressCountry: ORG.addressCountry,
    },
    areaServed: "Côte d'Ivoire",
    openingHours: 'Mo-Fr 08:00-18:00',
    sameAs: ORG.sameAs,
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

type ProductLike = {
  name: string;
  slug: string;
  description?: string;
  meta_description?: string;
  default_code?: string | number;
  brand?: string;
  list_price?: number;
  hide_price?: boolean;
  is_available?: boolean;
};

export function productJsonLd(product: ProductLike, imageUrl: string, categoryName?: string) {
  const priceValidUntil = new Date();
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);

  const showPrice = !product.hide_price && typeof product.list_price === 'number';

  return {
    '@type': 'Product',
    name: product.name,
    image: [imageUrl],
    description: product.meta_description || product.description || `${product.name} — ${SITE_NAME}`,
    sku: product.default_code,
    mpn: product.default_code,
    brand: { '@type': 'Brand', name: product.brand?.trim() || 'Hikvision' },
    ...(categoryName ? { category: categoryName } : {}),
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(`/products/${product.slug}`),
      priceCurrency: 'XOF',
      ...(showPrice
        ? {
            price: product.list_price,
            priceValidUntil: priceValidUntil.toISOString().slice(0, 10),
          }
        : {}),
      availability:
        product.is_available === false
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
      areaServed: 'CI',
      seller: { '@id': `${SITE_URL}/#organization` },
    },
  };
}

type BlogLike = {
  id?: number;
  title: string;
  content: string;
  author_name?: string;
  published_date?: string;
  created_at?: string;
  updated_at?: string;
  category?: string;
};

export function blogPostingJsonLd(blog: BlogLike, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: metaDescription(blog.content),
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    inLanguage: 'fr',
    ...(blog.category ? { articleSection: blog.category } : {}),
    datePublished: blog.published_date || blog.created_at,
    ...(blog.updated_at ? { dateModified: blog.updated_at } : {}),
    author: { '@type': 'Organization', name: blog.author_name || SITE_NAME },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

type CourseLike = {
  title: string;
  slug: string;
  summary?: string;
};

export function courseJsonLd(course: CourseLike) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.summary || course.title,
    url: absoluteUrl(`/formations/${course.slug}`),
    inLanguage: 'fr',
    provider: { '@id': `${SITE_URL}/#organization` },
    offers: {
      '@type': 'Offer',
      category: 'Paid',
      priceCurrency: 'XOF',
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Onsite',
      location: {
        '@type': 'Place',
        name: `${SITE_NAME} — Abidjan`,
        address: { '@type': 'PostalAddress', addressLocality: 'Abidjan', addressCountry: 'CI' },
      },
    },
  };
}

/** Injecte un bloc JSON-LD (server component). */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
