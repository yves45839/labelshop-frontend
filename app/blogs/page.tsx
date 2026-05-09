'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { listBlogs, deleteBlog } from '@/lib/blogs';
import { getCurrentUser, isAdminEmail } from '@/lib/user';

interface Blog {
  id: number;
  title: string;
  author_name: string;
  [key: string]: any;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();
  const isAdmin = isAdminEmail(user?.email);

  useEffect(() => {
    listBlogs()
      .then(setBlogs)
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cet article ?')) return;
    await deleteBlog(id);
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  if (loading) return <p className="lr-container py-12 lr-mono text-sm text-[var(--lr-steel-500)]">// Chargement…</p>;

  return (
    <div className="bg-[var(--lr-steel-50)] min-h-screen">
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-12 flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="lr-eyebrow text-[var(--lr-orange-400)]">Journal · Conseil & retours de chantier</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mt-2">Le blog</h1>
          </div>
          {isAdmin && (
            <Link href="/blogs/create" className="lr-btn-primary">
              Nouvel article
            </Link>
          )}
        </div>
      </header>

      <main className="lr-container py-10">
        {blogs.length === 0 ? (
          <div className="bg-white border border-dashed border-[var(--lr-border)] py-12 text-center">
            <span className="lr-mono text-xs text-[var(--lr-steel-400)]">// EMPTY</span>
            <p className="mt-2 font-display text-lg uppercase tracking-wide text-[var(--lr-navy-900)]">Pas encore d'article publié. Revenez bientôt.</p>
          </div>
        ) : (
          <ul className="grid gap-px bg-[var(--lr-border)] border border-[var(--lr-border)]">
            {blogs.map((blog, idx) => (
              <li key={blog.id} className="bg-white p-5 flex justify-between items-center gap-4 hover:bg-[var(--lr-steel-50)] transition-colors">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <span className="lr-mono text-xs text-[var(--lr-steel-400)] flex-shrink-0">#{String(idx + 1).padStart(3, '0')}</span>
                  <Link href={`/blogs/${blog.id}`} className="font-display text-lg font-semibold uppercase tracking-wide text-[var(--lr-navy-900)] hover:text-[var(--lr-orange-700)] truncate">
                    {blog.title}
                  </Link>
                </div>
                {isAdmin && (
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Link href={`/blogs/${blog.id}/edit`} className="lr-mono text-[10px] uppercase tracking-widest text-[var(--lr-navy-700)] hover:text-[var(--lr-orange-600)] border-b border-[var(--lr-navy-700)] pb-0.5">
                      Modifier
                    </Link>
                    <button onClick={() => handleDelete(blog.id)} className="lr-mono text-[10px] uppercase tracking-widest text-rose-700 hover:text-[var(--lr-navy-900)] border-b border-rose-700 pb-0.5">
                      Supprimer
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
