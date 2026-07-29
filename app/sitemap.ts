import type { MetadataRoute } from 'next';
import { apiUrl } from '@/lib/api';
import { SITE_URL, slugify } from '@/lib/seo';
import { blogPath, listBlogsServer } from '@/lib/blogs';
import { formations } from '@/lib/formations-data';
import { MAIN_CATEGORIES } from '@/lib/category';
import { SOLUTIONS } from '@/lib/solutions-data';
import { LR_TIME_MODULES } from '@/lib/lr-time-data';

export const revalidate = 3600;

function toDate(value?: string): Date | undefined {
  if (!value || isNaN(Date.parse(value))) return undefined;
  return new Date(value);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/products`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/products/categories`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/lr-time`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/formations`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/blogs`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/solutions`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/mentions-legales`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/politique-de-confidentialite`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/cgv`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const solutionPages: MetadataRoute.Sitemap = SOLUTIONS.map((solution) => ({
    url: `${SITE_URL}/solutions/${solution.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const lrTimePages: MetadataRoute.Sitemap = LR_TIME_MODULES.map((module) => ({
    url: `${SITE_URL}/lr-time/fonctionnalites/${module.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const categoryPages: MetadataRoute.Sitemap = MAIN_CATEGORIES.filter(
    (category) => category !== 'Non classé'
  ).map((category) => ({
    url: `${SITE_URL}/products/categories/${slugify(category)}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const formationPages: MetadataRoute.Sitemap = formations.map((formation) => ({
    url: `${SITE_URL}/formations/${formation.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  let productPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(apiUrl('/products/get-products/'), {
      next: { revalidate: 3600 },
    });
    const products = await res.json();
    productPages = (Array.isArray(products) ? products : [])
      .filter((product: any) => product.is_online && product.slug)
      .map((product: any) => ({
        url: `${SITE_URL}/products/${product.slug}`,
        lastModified: toDate(product.updated_at || product.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
  } catch (error) {
    console.error('Sitemap : produits inaccessibles', error);
  }

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const blogs = await listBlogsServer();
    blogPages = blogs
      .filter((blog) => blog.id)
      .map((blog) => ({
        url: `${SITE_URL}${blogPath(blog)}`,
        lastModified: toDate(blog.updated_at || blog.published_date || blog.created_at),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
  } catch (error) {
    console.error('Sitemap : blogs inaccessibles', error);
  }

  return [
    ...staticPages,
    ...solutionPages,
    ...lrTimePages,
    ...categoryPages,
    ...formationPages,
    ...productPages,
    ...blogPages,
  ];
}
