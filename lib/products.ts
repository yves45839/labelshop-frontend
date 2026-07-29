import { api, apiUrl } from './api';
import { mapProductCategory, MAIN_CATEGORIES } from './category';
import { slugify } from './seo';

export interface ProductData {
  name: string;
  slug: string;
  reference: string;
  price: number;
  [key: string]: any;
}

export type Product = {
  id: number;
  name: string;
  slug: string;
  image_1024?: string;
  default_code?: string;
  list_price: number;
  is_online?: boolean;
  categ_id?: string;
  category_main?: string;
  category_sub?: string;
  category_type?: string;
  [key: string]: unknown;
};

export interface ProductsByCategory {
  [category: string]: Product[];
}

export async function createProduct(data: ProductData) {
  const res = await api.post('/products/create/', data);
  return res.data;
}

/* ------------------------------------------------------------------ */
/* Côté serveur (SSR/SSG) : catalogue complet avec ISR                 */
/* ------------------------------------------------------------------ */

export async function listProductsServer(): Promise<Product[]> {
  const res = await fetch(apiUrl('/products/get-products/'), {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`listProductsServer: erreur ${res.status}`);
  const data = await res.json();
  return (Array.isArray(data) ? data : []).filter(
    (p: Product) => p.is_online !== false
  );
}

export function groupProductsByCategory(products: Product[]): ProductsByCategory {
  const groups: ProductsByCategory = {};
  products.forEach((p) => {
    const category = mapProductCategory(p);
    if (!groups[category]) groups[category] = [];
    groups[category].push(p);
  });
  return groups;
}

/** URL d'image produit, sans cache-buster (le ?t=Date.now() casse le cache navigateur/CDN). */
export function getProductImage(product: Product): string {
  if (product.image_1024 && typeof product.image_1024 === 'string') {
    return apiUrl(product.image_1024);
  }
  return '/default-product.png';
}

export function productWhatsappLink(product: Product): string {
  return `https://wa.me/22588899965?text=${encodeURIComponent(
    `Bonjour Label Retail, je m'intéresse au produit ${product.name} (Réf : ${product.default_code}). Pouvez-vous m'en dire plus ?`
  )}`;
}

/* ------------------------------------------------------------------ */
/* Pages catégorie : slugs et résolution                               */
/* ------------------------------------------------------------------ */

export function categorySlug(category: string): string {
  return slugify(category);
}

export function findCategoryBySlug(slug: string): string | undefined {
  return MAIN_CATEGORIES.find((category) => categorySlug(category) === slug);
}

export function categoryPath(category: string): string {
  return `/products/categories/${categorySlug(category)}`;
}
