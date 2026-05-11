'use client';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { listBlogs, deleteBlog, formatDate, formatDateTime, type BlogData } from '@/lib/blogs';
import { getCurrentUser, isAdminEmail } from '@/lib/user';

const CATEGORY_COLORS: Record<string, string> = {
  'Vidéosurveillance':    'bg-blue-100 text-blue-800',
  'CCTV':                 'bg-blue-100 text-blue-800',
  "Contrôle d'accès":    'bg-purple-100 text-purple-800',
  'Access Control':       'bg-purple-100 text-purple-800',
  "Détection d'intrusion":'bg-amber-100 text-amber-800',
  'Sécurité incendie':   'bg-red-100 text-red-800',
  'Fire Safety':          'bg-red-100 text-red-800',
  'Visiophonie':          'bg-green-100 text-green-800',
  'Tendances':            'bg-gray-200 text-gray-800',
  'Solutions intégrées': 'bg-indigo-100 text-indigo-800',
  'IoT':                  'bg-teal-100 text-teal-800',
  'Label Retail':         'bg-orange-100 text-orange-800',
};

const CATEGORY_BORDER: Record<string, string> = {
  'Vidéosurveillance':    'border-blue-400',
  "Contrôle d'accès":    'border-purple-400',
  "Détection d'intrusion":'border-amber-400',
  'Sécurité incendie':   'border-red-400',
  'Visiophonie':          'border-green-400',
  'Tendances':            'border-gray-400',
  'Solutions intégrées': 'border-indigo-400',
  'IoT':                  'border-teal-400',
  'Label Retail':         'border-orange-400',
};

function CategoryBadge({ cat }: { cat?: string }) {
  if (!cat) return null;
  const cls = CATEGORY_COLORS[cat] ?? 'bg-gray-100 text-gray-700';
  return (
    <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-sm ${cls}`}>
      {cat}
    </span>
  );
}

function ArticleRow({
  blog, idx, isAdmin, onDelete,
}: {
  blog: BlogData; idx: number; isAdmin: boolean; onDelete: (id: number) => void;
}) {
  const pubDate  = formatDate(blog.published_date || blog.created_at);
  const modDate  = formatDateTime(blog.updated_at);
  const hasBeenEdited = blog.updated_at && blog.created_at &&
    Math.abs(new Date(blog.updated_at).getTime() - new Date(blog.created_at).getTime()) > 60_000;

  return (
    <article className="bg-white p-5 flex flex-col sm:flex-row justify-between gap-4 hover:bg-[var(--lr-steel-50)] transition-colors group">
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <span className="lr-mono text-xs text-[var(--lr-steel-400)] flex-shrink-0 pt-1">
          #{String(idx + 1).padStart(3, '0')}
        </span>
        <div className="min-w-0 flex-1">
          <Link
            href={`/blogs/${blog.id}`}
            className="font-display text-base font-semibold uppercase tracking-wide text-[var(--lr-navy-900)] hover:text-[var(--lr-orange-700)] line-clamp-2 block"
          >
            {blog.title}
          </Link>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <CategoryBadge cat={blog.category} />
            {pubDate && (
              <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">📅 {pubDate}</span>
            )}
            {hasBeenEdited && modDate && (
              <span className="lr-mono text-[10px] text-[var(--lr-orange-600)]" title={`Modifié le ${modDate}`}>
                ✏️ Modifié le {modDate}
              </span>
            )}
            {blog.language && (
              <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">🌐 {blog.language}</span>
            )}
          </div>
        </div>
      </div>

      {isAdmin && (
        <div className="flex items-center gap-3 flex-shrink-0 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/blogs/${blog.id}/edit`}
            className="lr-mono text-[10px] uppercase tracking-widest text-[var(--lr-navy-700)] hover:text-[var(--lr-orange-600)] border-b border-[var(--lr-navy-700)] pb-0.5"
          >
            ✎ Modifier
          </Link>
          <button
            onClick={() => onDelete(blog.id!)}
            className="lr-mono text-[10px] uppercase tracking-widest text-rose-700 hover:text-[var(--lr-navy-900)] border-b border-rose-700 pb-0.5"
          >
            ✕ Supprimer
          </button>
        </div>
      )}
    </article>
  );
}

export default function BlogsPage() {
  const [blogs, setBlogs]       = useState<BlogData[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Tous');
  const user    = getCurrentUser();
  const isAdmin = isAdminEmail(user?.email);

  useEffect(() => {
    listBlogs()
      .then(setBlogs)
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cet article définitivement ?')) return;
    await deleteBlog(id);
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  /** Catégories présentes dans les données, dans l'ordre d'apparition */
  const categories = useMemo(() => {
    const seen = new Set<string>();
    blogs.forEach((b) => { if (b.category) seen.add(b.category); });
    return Array.from(seen);
  }, [blogs]);

  /** Articles filtrés par recherche + catégorie active */
  const filtered = useMemo(() => {
    return blogs.filter((b) => {
      const matchSearch = !search ||
        b.title?.toLowerCase().includes(search.toLowerCase()) ||
        b.category?.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === 'Tous' || b.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [blogs, search, activeCategory]);

  /** Regroupement par catégorie pour la vue "Tous" */
  const groupedByCategory = useMemo(() => {
    if (activeCategory !== 'Tous') return null;
    const map = new Map<string, BlogData[]>();
    filtered.forEach((b) => {
      const cat = b.category || 'Autres';
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(b);
    });
    return map;
  }, [filtered, activeCategory]);

  if (loading) return (
    <div className="bg-[var(--lr-steel-50)] min-h-screen flex items-center justify-center">
      <span className="lr-mono text-sm text-[var(--lr-steel-500)]">// Chargement des articles…</span>
    </div>
  );

  return (
    <div className="bg-[var(--lr-steel-50)] min-h-screen">
      {/* En-tête */}
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-12 flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="lr-eyebrow text-[var(--lr-orange-400)]">Blog · Expertise &amp; Conseil</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mt-2">Le blog Label Retail</h1>
            <p className="mt-2 text-white/60 text-sm max-w-xl">
              Sécurité électronique, vidéosurveillance, contrôle d'accès — par{' '}
              <span className="font-semibold text-white/90">Yves Roland OUIYA</span>
            </p>
          </div>
          {isAdmin && (
            <div className="flex flex-wrap gap-3">
              <Link href="/blogs/create" className="lr-btn-primary">+ Nouvel article</Link>
              <Link
                href="/blogs/import"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-[var(--lr-orange-500)] hover:bg-[var(--lr-orange-600)] font-display text-xs font-semibold uppercase tracking-widest text-white border border-[var(--lr-orange-600)] transition-colors"
              >
                ↑ Importer les 20 articles
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className="lr-container py-10">

        {/* ── Filtres par catégorie ── */}
        {categories.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {/* Bouton "Tous" */}
            <button
              onClick={() => setActiveCategory('Tous')}
              className={`px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-widest border transition-colors ${
                activeCategory === 'Tous'
                  ? 'bg-[var(--lr-navy-900)] text-white border-[var(--lr-navy-900)]'
                  : 'bg-white text-[var(--lr-navy-900)] border-[var(--lr-border)] hover:border-[var(--lr-navy-900)]'
              }`}
            >
              Tous ({blogs.length})
            </button>

            {categories.map((cat) => {
              const count = blogs.filter((b) => b.category === cat).length;
              const isActive = activeCategory === cat;
              const colorCls = CATEGORY_COLORS[cat] ?? 'bg-gray-100 text-gray-700';
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-widest border transition-colors ${
                    isActive
                      ? `${colorCls} border-transparent ring-2 ring-offset-1 ring-current`
                      : 'bg-white text-[var(--lr-steel-600)] border-[var(--lr-border)] hover:border-[var(--lr-steel-400)]'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        )}

        {/* ── Barre de recherche ── */}
        <div className="mb-6 flex items-center gap-3">
          <input
            type="text"
            placeholder="Rechercher un article…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="lr-input max-w-sm"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="lr-mono text-xs text-[var(--lr-steel-500)] hover:text-[var(--lr-navy-900)]"
            >
              ✕ Effacer
            </button>
          )}
          <span className="ml-auto lr-mono text-xs text-[var(--lr-steel-400)]">
            {filtered.length} article{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'Tous' && (
              <span className="ml-1 text-[var(--lr-orange-600)]">· {activeCategory}</span>
            )}
          </span>
        </div>

        {/* ── Contenu ── */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-dashed border-[var(--lr-border)] py-16 text-center">
            <span className="lr-mono text-xs text-[var(--lr-steel-400)]">// EMPTY</span>
            <p className="mt-2 font-display text-lg uppercase tracking-wide text-[var(--lr-navy-900)]">
              {search ? 'Aucun résultat pour cette recherche.' : 'Pas encore d\'article publié.'}
            </p>
            {isAdmin && !search && (
              <div className="mt-6 flex justify-center gap-4">
                <Link href="/blogs/import" className="lr-btn-primary">Importer les 20 articles</Link>
                <Link href="/blogs/create" className="lr-btn-secondary">Écrire un article</Link>
              </div>
            )}
          </div>
        ) : activeCategory !== 'Tous' ? (
          /* ── Vue catégorie unique : liste plate ── */
          <div className="grid gap-px bg-[var(--lr-border)] border border-[var(--lr-border)]">
            {filtered.map((blog, idx) => (
              <ArticleRow key={blog.id} blog={blog} idx={idx} isAdmin={isAdmin} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          /* ── Vue "Tous" : regroupement par catégorie ── */
          <div className="space-y-10">
            {groupedByCategory && Array.from(groupedByCategory.entries()).map(([cat, articles]) => {
              const borderCls = CATEGORY_BORDER[cat] ?? 'border-[var(--lr-border)]';
              return (
                <section key={cat}>
                  {/* En-tête de catégorie */}
                  <div className={`flex items-center gap-3 mb-3 pb-2 border-b-2 ${borderCls}`}>
                    <h2 className="font-display text-sm font-bold uppercase tracking-widest text-[var(--lr-navy-900)]">
                      {cat}
                    </h2>
                    <span className="lr-mono text-xs text-[var(--lr-steel-400)]">
                      {articles.length} article{articles.length > 1 ? 's' : ''}
                    </span>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className="ml-auto lr-mono text-[10px] uppercase tracking-widest text-[var(--lr-orange-600)] hover:text-[var(--lr-navy-900)] border-b border-[var(--lr-orange-600)] pb-0.5"
                    >
                      Voir tout →
                    </button>
                  </div>

                  {/* Articles de cette catégorie */}
                  <div className="grid gap-px bg-[var(--lr-border)] border border-[var(--lr-border)]">
                    {articles.map((blog, idx) => (
                      <ArticleRow key={blog.id} blog={blog} idx={idx} isAdmin={isAdmin} onDelete={handleDelete} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
