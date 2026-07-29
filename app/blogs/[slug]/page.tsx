import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import {
  blogPath,
  formatDate,
  formatDateTime,
  getBlogServer,
  listBlogsServer,
  parseBlogId,
} from '@/lib/blogs';
import { markdownToHtml } from '@/lib/markdown';
import {
  JsonLd,
  blogPostingJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
  metaDescription,
} from '@/lib/seo';
import BlogAdminBar from '@/components/BlogAdminBar';
import { relatedProductsForBlog } from '@/lib/related';

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const blogs = await listBlogsServer();
    return blogs
      .filter((blog) => blog.id)
      .map((blog) => ({ slug: blogPath(blog).replace('/blogs/', '') }));
  } catch {
    return [];
  }
}

async function resolveBlog(slug: string) {
  const id = parseBlogId(slug);
  if (!id) return null;
  return getBlogServer(id);
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const blog = await resolveBlog(slug);

  if (!blog) {
    return {
      title: 'Article introuvable',
      robots: { index: false, follow: false },
    };
  }

  return buildMetadata({
    title: blog.title,
    description: metaDescription(blog.content || blog.title),
    path: blogPath(blog),
    ogType: 'article',
    publishedTime: blog.published_date || blog.created_at,
    modifiedTime: blog.updated_at,
    keywords: [blog.category, 'sécurité électronique', "Côte d'Ivoire", 'Label Retail'].filter(
      Boolean
    ) as string[],
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await resolveBlog(slug);

  if (!blog) {
    notFound();
  }

  // URL canonique unique : /blogs/{slug-du-titre}-{id}. Les anciennes URLs
  // numériques (/blogs/42) et les slugs obsolètes sont redirigés en 301.
  const canonicalPath = blogPath(blog);
  if (`/blogs/${decodeURIComponent(slug)}` !== canonicalPath) {
    permanentRedirect(canonicalPath);
  }

  const pubDate = formatDate(blog.published_date || blog.created_at);
  const modDate = formatDateTime(blog.updated_at);
  const wasEdited =
    blog.updated_at && blog.created_at && blog.updated_at !== blog.created_at;

  // Contenu : si HTML déjà rendu par le backend, on l'utilise tel quel.
  // Sinon on convertit le markdown.
  const isHtml = blog.content?.trim().startsWith('<');
  const renderedContent = isHtml ? blog.content : markdownToHtml(blog.content || '');

  const editPath = `${canonicalPath}/edit`;
  const relatedProducts = await relatedProductsForBlog(blog);

  return (
    <div className="bg-white">
      <JsonLd
        data={[
          blogPostingJsonLd(blog, canonicalPath),
          breadcrumbJsonLd([
            { name: 'Accueil', path: '/' },
            { name: 'Blog', path: '/blogs' },
            { name: blog.title, path: canonicalPath },
          ]),
        ]}
      />

      {/* En-tête article */}
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-12">
          <nav className="flex items-center gap-2 lr-mono text-[11px] text-white/60 flex-wrap">
            <Link href="/" className="hover:text-[var(--lr-orange-400)]" prefetch={false}>Accueil</Link>
            <span className="text-white/30">/</span>
            <Link href="/blogs" className="hover:text-[var(--lr-orange-400)]" prefetch={false}>Blog</Link>
            <span className="text-white/30">/</span>
            <span className="text-white line-clamp-1">{blog.title}</span>
          </nav>

          {blog.category && (
            <span className="mt-4 block lr-mono text-[10px] uppercase tracking-widest text-[var(--lr-orange-400)]">
              {blog.category}
            </span>
          )}

          <h1 className="font-display text-3xl md:text-5xl font-bold uppercase leading-[1.1] tracking-tight mt-2 max-w-4xl">
            {blog.title}
          </h1>

          {/* Auteur + dates */}
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60 border-t border-white/10 pt-4">
            {blog.author_image && typeof blog.author_image === 'string' && (
              <img
                src={blog.author_image}
                alt={blog.author_name}
                width={40}
                height={40}
                loading="lazy"
                className="w-10 h-10 object-cover border border-white/20 rounded-full"
              />
            )}

            <div className="flex flex-col gap-0.5">
              <span className="text-white font-semibold text-base">{blog.author_name}</span>
              <span className="lr-mono text-xs text-white/40">Expert sécurité électronique · Label Retail</span>
            </div>

            {pubDate && (
              <div className="flex items-center gap-1.5 border-l border-white/20 pl-4">
                <span className="text-white/40 lr-mono text-xs">Publié le</span>
                <span className="text-white/80 lr-mono text-xs font-semibold">{pubDate}</span>
              </div>
            )}

            {wasEdited && modDate && (
              <div className="flex items-center gap-1.5 border-l border-white/20 pl-4">
                <span className="text-[var(--lr-orange-400)] lr-mono text-xs">✏️ Modifié le</span>
                <span className="text-[var(--lr-orange-300)] lr-mono text-xs font-semibold">{modDate}</span>
              </div>
            )}

            {blog.language && (
              <div className="border-l border-white/20 pl-4">
                <span className="lr-mono text-xs text-white/50">🌐 {blog.language}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Corps de l'article */}
      <main className="lr-container py-10 max-w-3xl">
        <BlogAdminBar blog={blog} editPath={editPath} />

        {/* Contenu rendu */}
        <article
          className="
            prose prose-lg max-w-none
            text-[var(--lr-steel-700)] leading-relaxed
            prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-[var(--lr-navy-900)]
            prose-a:text-[var(--lr-orange-600)] prose-a:underline
            prose-strong:text-[var(--lr-navy-900)]
            prose-table:text-sm
            prose-th:bg-[var(--lr-navy-900)] prose-th:text-white
          "
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        />

        {/* Pièces jointes */}
        {blog.attachments && blog.attachments.length > 0 && (
          <div className="mt-10 bg-[var(--lr-steel-50)] border border-[var(--lr-border)] p-6">
            <div className="lr-section-heading mb-3">
              <span className="bar" />
              <h2 className="font-display text-base font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">Pièces jointes</h2>
            </div>
            <ul className="space-y-2 text-sm">
              {(blog.attachments as unknown as string[]).map((att, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-[var(--lr-orange-600)]">›</span>
                  <a href={att} target="_blank" rel="noopener noreferrer"
                    className="lr-mono text-[var(--lr-navy-700)] hover:text-[var(--lr-orange-600)] underline">
                    {att.split('/').pop()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Produits associés (maillage blog → catalogue) */}
        {relatedProducts.length > 0 && (
          <aside className="mt-12 bg-[var(--lr-steel-50)] border border-[var(--lr-border)] p-6">
            <div className="lr-section-heading mb-4">
              <span className="bar" />
              <h2 className="font-display text-base font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">
                Produits associés
              </h2>
            </div>
            <p className="text-sm text-[var(--lr-steel-700)]">
              Le matériel que nous installons sur ce sujet, disponible à Abidjan.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {relatedProducts.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="lr-link flex items-center gap-2"
                    prefetch={false}
                  >
                    <span className="text-[var(--lr-orange-500)]">›</span>
                    {product.name}
                    {product.default_code && (
                      <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">
                        · {product.default_code}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Footer article */}
        <footer className="mt-12 pt-6 border-t border-[var(--lr-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-sm text-[var(--lr-steel-500)] space-y-1">
            {pubDate && <p>📅 Publié le <span className="font-semibold text-[var(--lr-navy-900)]">{pubDate}</span></p>}
            {wasEdited && modDate && (
              <p className="text-[var(--lr-orange-600)]">✏️ Dernière modification : <span className="font-semibold">{modDate}</span></p>
            )}
          </div>
          <Link href="/blogs" className="lr-btn-secondary text-sm">← Tous les articles</Link>
        </footer>

        <BlogAdminBar blog={blog} editPath={editPath} variant="footer" />
      </main>
    </div>
  );
}
