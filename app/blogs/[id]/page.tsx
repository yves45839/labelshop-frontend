'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getBlog, deleteBlog } from '@/lib/blogs';
import { getCurrentUser, isAdminEmail } from '@/lib/user';

interface BlogDetail {
  id: number;
  title: string;
  content: string;
  author_name: string;
  author_image?: string;
  attachments?: string[];
  [key: string]: any;
}

export default function BlogDetailPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [blog, setBlog] = useState<BlogDetail | null>(null);
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
    if (!confirm('Supprimer cet article ?')) return;
    await deleteBlog(blog.id);
    window.location.href = '/blogs';
  };

  if (loading) return <p className="lr-container py-12 lr-mono text-sm text-[var(--lr-steel-500)]">// Chargement…</p>;
  if (!blog) return <p className="lr-container py-12 font-display text-xl uppercase tracking-wide text-[var(--lr-navy-900)]">Cet article n'est plus en ligne.</p>;

  return (
    <div className="bg-white">
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-12">
          <Link href="/blogs" className="lr-mono text-xs text-[var(--lr-orange-400)] hover:text-white">← Retour au blog</Link>
          <h1 className="font-display text-3xl md:text-5xl font-bold uppercase leading-[1.1] tracking-tight mt-3 max-w-4xl">{blog.title}</h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-white/70">
            {blog.author_image && (
              <img src={blog.author_image} alt={blog.author_name} className="w-10 h-10 object-cover border border-white/20" />
            )}
            <span className="lr-eyebrow text-white/60">Par {blog.author_name}</span>
          </div>
        </div>
      </header>

      <main className="lr-container py-10 max-w-3xl">
        <article className="prose prose-lg max-w-none text-[var(--lr-steel-700)] leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>

        {blog.attachments && blog.attachments.length > 0 && (
          <div className="mt-10 bg-[var(--lr-steel-50)] border border-[var(--lr-border)] p-6">
            <div className="lr-section-heading mb-3">
              <span className="bar" />
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">Pièces jointes</h2>
            </div>
            <ul className="space-y-2 text-sm">
              {blog.attachments.map((att, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-[var(--lr-orange-600)]">›</span>
                  <a href={att} target="_blank" rel="noopener noreferrer" className="lr-mono text-[var(--lr-navy-700)] hover:text-[var(--lr-orange-600)] underline">
                    {att.split('/').pop()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isAdmin && (
          <div className="mt-8 flex items-center gap-3 border-t border-[var(--lr-border)] pt-6">
            <Link href={`/blogs/${blog.id}/edit`} className="lr-btn-secondary">Modifier</Link>
            <button onClick={handleDelete} className="inline-flex items-center justify-center px-6 py-3 bg-rose-600 hover:bg-rose-700 font-display text-xs font-semibold uppercase tracking-widest text-white border border-rose-700 transition-colors">
              Supprimer
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
