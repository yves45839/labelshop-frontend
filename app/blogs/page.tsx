import type { Metadata } from 'next';
import { blogPath, listBlogsServer, type BlogData } from '@/lib/blogs';
import { JsonLd, absoluteUrl, buildMetadata } from '@/lib/seo';
import BlogsListClient from '@/components/BlogsListClient';

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Blog sécurité électronique — conseils et guides techniques',
  description:
    "Guides vidéosurveillance, contrôle d'accès, alarme et sécurité incendie : les conseils des techniciens Label Retail pour vos projets en Côte d'Ivoire.",
  path: '/blogs',
  keywords: [
    'blog sécurité électronique',
    "vidéosurveillance Côte d'Ivoire",
    "contrôle d'accès Abidjan",
    'guides Hikvision',
    'Label Retail',
  ],
});

export default async function BlogsPage() {
  let blogs: BlogData[] = [];
  try {
    blogs = await listBlogsServer();
  } catch {
    blogs = [];
  }

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Le blog Label Retail',
    url: absoluteUrl('/blogs'),
    inLanguage: 'fr',
    blogPost: blogs.slice(0, 30).map((blog) => ({
      '@type': 'BlogPosting',
      headline: blog.title,
      url: absoluteUrl(blogPath(blog)),
      ...(blog.published_date || blog.created_at
        ? { datePublished: blog.published_date || blog.created_at }
        : {}),
    })),
  };

  return (
    <>
      <JsonLd data={blogJsonLd} />
      <BlogsListClient initialBlogs={blogs} />
    </>
  );
}
