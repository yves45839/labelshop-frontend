import { blogPath, listBlogsServer, type BlogData } from './blogs';
import {
  groupProductsByCategory,
  listProductsServer,
  type Product,
} from './products';

/** Correspondance catégorie d'article de blog → catégorie produit (MAIN_CATEGORIES). */
const BLOG_TO_PRODUCT_CATEGORY: Record<string, string> = {
  'Vidéosurveillance': 'Videosurveillance IP',
  'CCTV': 'Videosurveillance IP',
  "Contrôle d'accès": 'Controle d’acces',
  'Access Control': 'Controle d’acces',
  "Détection d'intrusion": 'Alarme intrusion',
  'Visiophonie': 'Interphonie',
  'Solutions intégrées': 'Controle d’acces',
  'IoT': 'Reseau & transmission',
};

const PRODUCT_TO_BLOG_CATEGORIES: Record<string, string[]> = {
  'Videosurveillance IP': ['Vidéosurveillance', 'CCTV', 'Tendances'],
  'Videosurveillance analogique': ['Vidéosurveillance', 'CCTV'],
  'Videosurveillance specialisee': ['Vidéosurveillance', 'Tendances'],
  'Controle d’acces': ["Contrôle d'accès", 'Access Control', 'Solutions intégrées'],
  'Alarme intrusion': ["Détection d'intrusion"],
  Interphonie: ['Visiophonie'],
  'Reseau & transmission': ['IoT', 'Tendances'],
  Enregistreurs: ['Vidéosurveillance', 'CCTV'],
  Stockage: ['Vidéosurveillance'],
};

export type RelatedProduct = Pick<Product, 'name' | 'slug' | 'default_code'>;
export type RelatedArticle = { title: string; path: string; category?: string };

/** Produits associés à un article de blog (3 max), pour le bloc « Produits associés ». */
export async function relatedProductsForBlog(
  blog: Pick<BlogData, 'category'>,
  limit = 3
): Promise<RelatedProduct[]> {
  const productCategory = blog.category
    ? BLOG_TO_PRODUCT_CATEGORY[blog.category]
    : undefined;
  if (!productCategory) return [];
  try {
    const grouped = groupProductsByCategory(await listProductsServer());
    return (grouped[productCategory] ?? [])
      .slice(0, limit)
      .map(({ name, slug, default_code }) => ({ name, slug, default_code }));
  } catch {
    return [];
  }
}

/** Articles associés à une catégorie produit (3 max), pour le bloc « Articles liés ». */
export async function relatedArticlesForCategory(
  productCategory: string,
  limit = 3
): Promise<RelatedArticle[]> {
  const blogCategories = PRODUCT_TO_BLOG_CATEGORIES[productCategory];
  if (!blogCategories?.length) return [];
  try {
    const blogs = await listBlogsServer();
    return blogs
      .filter((blog) => blog.category && blogCategories.includes(blog.category))
      .slice(0, limit)
      .map((blog) => ({
        title: blog.title,
        path: blogPath(blog),
        category: blog.category,
      }));
  } catch {
    return [];
  }
}
