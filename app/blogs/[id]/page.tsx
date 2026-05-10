'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getBlog, deleteBlog, formatDate, formatDateTime, type BlogData } from '@/lib/blogs';
import { getCurrentUser, isAdminEmail } from '@/lib/user';
import { markdownToHtml } from '@/lib/markdown';

export default function BlogDetailPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();
  const isAdmin = isAdminEmail(user?.email);

  useEffect(() => {
    if (!id) return;
    getBlog(id)
      .then(setBlog)
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!blog) return;
    if (!confirm('Supprimer cet article définitivement ?')) return;
    await deleteBlog(blog.id!);
    window.location.href = '/blogs';
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <span className="lr-mono text-sm text-[var(--lr-steel-500)]">// Chargement…</span>
    </div>
  );

  if (!blog) return (
    <div className="min-h-screen bg-white lr-container py-20">
      <p className="font-display text-xl uppercase tracking-wide text-[var(--lr-navy-900)]">Cet article n'est plus en ligne.</p>
      <Link href="/blogs" className="lr-mono text-sm text-[var(--lr-orange-600)] hover:underline mt-4 block">← Retour au blog</Link>
    </div>
  );

  const pubDate   = formatDate(blog.published_date || blog.created_at);
  const modDate   = formatDateTime(blog.updated_at);
  const wasEdited = blog.updated_at && blog.created_at && blog.updated_at !== blog.created_at;

  // Contenu : si HTML déjà rendu par le backend, on l'utilise tel quel.
  // Sinon on convertit le markdown.
  const isHtml = blog.content?.trim().startsWith('<');
  const renderedContent = isHtml
    ? blog.content
    : markdownToHtml(blog.content || '');

  return (
    <div className="bg-white">
      {/* En-tête article */}
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-12">
          <Link href="/blogs" className="lr-mono text-xs text-[var(--lr-orange-400)] hover:text-white transition-colors">
            ← Retour au blog
          </Link>

          {blog.category && (
            <span className="mt-3 block lr-mono text-[10px] uppercase tracking-widest text-[var(--lr-orange-400)]">
              {blog.category}
            </span>
          )}

          <h1 className="font-display text-3xl md:text-5xl font-bold uppercase leading-[1.1] tracking-tight mt-2 max-w-4xl">
            {blog.title}
          </h1>

          {/* Auteur + dates */}
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60 border-t border-white/10 pt-4">
            {blog.author_image && (
              <img
                src={typeof blog.author_image === 'string' ? blog.author_image : ''}
                alt={blog.author_name}
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

        {/* Barre de navigation rapide admin */}
        {isAdmin && (
          <div className="mb-8 flex items-center gap-3 bg-amber-50 border border-amber-200 px-4 py-2.5">
            <span className="lr-mono text-[10px] uppercase tracking-widest text-amber-700">Admin</span>
            <Link href={`/blogs/${blog.id}/edit`} className="lr-mono text-xs text-[var(--lr-navy-700)] hover:text-[var(--lr-orange-600)] border-b border-[var(--lr-navy-700)] pb-0.5">
              ✎ Modifier cet article
            </Link>
            <button
              onClick={handleDelete}
              className="lr-mono text-xs text-rose-700 hover:text-[var(--lr-navy-900)] border-b border-rose-700 pb-0.5"
            >
              ✕ Supprimer
            </button>
          </div>
        )}

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
              {(blog.attachments as string[]).map((att, i) => (
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

        {/* Actions admin bas de page */}
        {isAdmin && (
          <div className="mt-8 flex items-center gap-3 border-t border-[var(--lr-border)] pt-6">
            <Link href={`/blogs/${blog.id}/edit`} className="lr-btn-secondary">✎ Modifier</Link>
            <button
              onClick={handleDelete}
              className="inline-flex items-center justify-center px-6 py-3 bg-rose-600 hover:bg-rose-700 font-display text-xs font-semibold uppercase tracking-widest text-white border border-rose-700 transition-colors"
            >
              ✕ Supprimer
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
