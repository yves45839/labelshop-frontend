'use client';
import Link from 'next/link';
import { deleteBlog, type BlogData } from '@/lib/blogs';
import { getCurrentUser, isAdminEmail } from '@/lib/user';

/** Contrôles admin (localStorage) d'un article — rendus uniquement côté client. */
export default function BlogAdminBar({
  blog,
  editPath,
  variant = 'bar',
}: {
  blog: BlogData;
  editPath: string;
  variant?: 'bar' | 'footer';
}) {
  const user = getCurrentUser();
  const isAdmin = isAdminEmail(user?.email);
  if (!isAdmin) return null;

  const handleDelete = async () => {
    if (!confirm('Supprimer cet article définitivement ?')) return;
    await deleteBlog(blog.id!);
    window.location.href = '/blogs';
  };

  if (variant === 'footer') {
    return (
      <div className="mt-8 flex items-center gap-3 border-t border-[var(--lr-border)] pt-6">
        <Link href={editPath} className="lr-btn-secondary">✎ Modifier</Link>
        <button
          onClick={handleDelete}
          className="inline-flex items-center justify-center px-6 py-3 bg-rose-600 hover:bg-rose-700 font-display text-xs font-semibold uppercase tracking-widest text-white border border-rose-700 transition-colors"
        >
          ✕ Supprimer
        </button>
      </div>
    );
  }

  return (
    <div className="mb-8 flex items-center gap-3 bg-amber-50 border border-amber-200 px-4 py-2.5">
      <span className="lr-mono text-[10px] uppercase tracking-widest text-amber-700">Admin</span>
      <Link href={editPath} className="lr-mono text-xs text-[var(--lr-navy-700)] hover:text-[var(--lr-orange-600)] border-b border-[var(--lr-navy-700)] pb-0.5">
        ✎ Modifier cet article
      </Link>
      <button
        onClick={handleDelete}
        className="lr-mono text-xs text-rose-700 hover:text-[var(--lr-navy-900)] border-b border-rose-700 pb-0.5"
      >
        ✕ Supprimer
      </button>
    </div>
  );
}
