'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createBlogJson } from '@/lib/blogs';
import { getCurrentUser, isAdminEmail } from '@/lib/user';
import { markdownToHtml } from '@/lib/markdown';
import { ARTICLES as SOURCE_ARTICLES } from './articles-data';

const CATEGORIES = [
  'Vidéosurveillance','Contrôle d\'accès','Détection d\'intrusion',
  'Sécurité incendie','Visiophonie','Solutions intégrées','IoT','Tendances','Label Retail',
];
const LANGUAGES = ['FR/EN (Bilingue)', 'Français', 'English'];

const ARTICLES = SOURCE_ARTICLES;


/* ─── Composant principal ─── */
type Status = 'idle' | 'loading' | 'success' | 'error';
interface ArticleStatus { status: Status; message?: string }
interface EditState {
  title: string;
  author_name: string;
  category: string;
  language: string;
  published_date: string;
  content: string;
}

export default function ImportBlogsPage() {
  const [statuses, setStatuses] = useState<ArticleStatus[]>(
    ARTICLES.map(() => ({ status: 'idle' }))
  );
  const [edits, setEdits] = useState<EditState[]>(
    ARTICLES.map((a) => ({
      title: a.title,
      author_name: a.author_name,
      category: a.category,
      language: a.language,
      published_date: a.published_date,
      content: a.content,
    }))
  );
  const [expanded, setExpanded] = useState<boolean[]>(ARTICLES.map(() => false));
  const [previewMode, setPreviewMode] = useState<('edit' | 'preview')[]>(ARTICLES.map(() => 'edit'));
  const [importing, setImporting] = useState(false);
  const [done, setDone]           = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) { window.location.href = '/accounts/login'; return; }
    if (!isAdminEmail(user.email)) { window.location.href = '/'; }
  }, []);

  const toggleExpanded = (idx: number) => {
    setExpanded((prev) => { const n = [...prev]; n[idx] = !n[idx]; return n; });
  };

  const updateEdit = (idx: number, field: keyof EditState, value: string) => {
    setEdits((prev) => { const n = [...prev]; n[idx] = { ...n[idx], [field]: value }; return n; });
  };

  const togglePreview = (idx: number) => {
    setPreviewMode((prev) => {
      const n = [...prev]; n[idx] = n[idx] === 'edit' ? 'preview' : 'edit'; return n;
    });
  };

  const importOne = async (idx: number): Promise<boolean> => {
    setStatuses((prev) => { const n = [...prev]; n[idx] = { status: 'loading' }; return n; });
    try {
      const art = edits[idx];
      await createBlogJson({
        title: art.title,
        content: art.content,
        author_name: art.author_name,
        category: art.category,
        language: art.language,
        published_date: art.published_date,
      });
      setStatuses((prev) => { const n = [...prev]; n[idx] = { status: 'success' }; return n; });
      return true;
    } catch (err: any) {
      const raw = err?.response?.data;
      const msg = typeof raw === 'string'
        ? raw
        : raw?.detail || raw?.non_field_errors?.[0] || JSON.stringify(raw) || err?.message || 'Erreur inconnue';
      setStatuses((prev) => { const n = [...prev]; n[idx] = { status: 'error', message: msg }; return n; });
      return false;
    }
  };

  const importAll = async () => {
    setImporting(true);
    for (let i = 0; i < ARTICLES.length; i++) {
      if (statuses[i].status !== 'success') {
        await importOne(i);
        await new Promise((r) => setTimeout(r, 300));
      }
    }
    setImporting(false);
    setDone(true);
  };

  const successCount = statuses.filter((s) => s.status === 'success').length;
  const errorCount   = statuses.filter((s) => s.status === 'error').length;

  return (
    <div className="bg-[var(--lr-steel-50)] min-h-screen">
      {/* En-tête */}
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="lr-eyebrow text-[var(--lr-orange-400)]">Console admin · Import</span>
            <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mt-1">
              Importer les 20 articles
            </h1>
            <p className="mt-1 text-white/60 text-sm">
              Cliquez sur un article pour le consulter ou modifier avant import
            </p>
          </div>
          <Link href="/blogs" className="lr-mono text-xs text-white/60 hover:text-white transition-colors">
            ← Retour au blog
          </Link>
        </div>
      </header>

      <main className="lr-container py-10 max-w-4xl">
        {/* Compteurs */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="bg-white border border-[var(--lr-border)] px-5 py-3 flex items-center gap-3">
            <span className="font-display text-2xl font-bold text-[var(--lr-navy-900)]">{ARTICLES.length}</span>
            <span className="lr-mono text-xs text-[var(--lr-steel-500)] uppercase">articles</span>
          </div>
          <div className="bg-white border border-green-300 px-5 py-3 flex items-center gap-3">
            <span className="font-display text-2xl font-bold text-green-700">{successCount}</span>
            <span className="lr-mono text-xs text-green-600 uppercase">importés</span>
          </div>
          {errorCount > 0 && (
            <div className="bg-white border border-red-300 px-5 py-3 flex items-center gap-3">
              <span className="font-display text-2xl font-bold text-red-700">{errorCount}</span>
              <span className="lr-mono text-xs text-red-600 uppercase">erreurs</span>
            </div>
          )}
        </div>

        {/* Bouton import global */}
        {!done ? (
          <div className="mb-6 flex flex-wrap gap-3 items-center">
            <button
              onClick={importAll}
              disabled={importing}
              className="lr-btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {importing
                ? `// Import en cours… (${successCount}/${ARTICLES.length})`
                : '↑ Importer tous les articles'}
            </button>
            <span className="lr-mono text-xs text-[var(--lr-steel-400)]">
              Ou importez article par article ci-dessous
            </span>
          </div>
        ) : (
          <div className="mb-6 bg-green-50 border border-green-300 px-5 py-4 flex items-center justify-between">
            <span className="text-green-800 font-semibold">
              ✓ Import terminé — {successCount} article{successCount > 1 ? 's' : ''} importé{successCount > 1 ? 's' : ''}{errorCount > 0 ? `, ${errorCount} erreur(s)` : ''}
            </span>
            <Link href="/blogs" className="lr-btn-secondary text-sm">Voir le blog →</Link>
          </div>
        )}

        {/* Liste des articles avec expand */}
        <div className="grid gap-px bg-[var(--lr-border)] border border-[var(--lr-border)]">
          {ARTICLES.map((_, idx) => {
            const st  = statuses[idx];
            const art = edits[idx];
            const isOpen = expanded[idx];
            const mode   = previewMode[idx];

            return (
              <div key={idx} className="bg-white">
                {/* Ligne principale */}
                <div className="p-4 flex items-center gap-3">
                  {/* Numéro + toggle */}
                  <button
                    onClick={() => toggleExpanded(idx)}
                    className="flex items-center gap-2 text-left min-w-0 flex-1"
                  >
                    <span className="lr-mono text-xs text-[var(--lr-steel-400)] flex-shrink-0 w-8 text-right">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="lr-mono text-xs text-[var(--lr-steel-400)] flex-shrink-0">
                      {isOpen ? '▾' : '▸'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-sm font-semibold text-[var(--lr-navy-900)] truncate">
                        {art.title}
                      </p>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                        <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">📅 {art.published_date}</span>
                        <span className="lr-mono text-[10px] text-[var(--lr-orange-600)]">{art.category}</span>
                        <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">🌐 {art.language}</span>
                      </div>
                    </div>
                  </button>

                  {/* Statut + actions */}
                  <div className="flex-shrink-0 flex items-center gap-2">
                    {st.status === 'idle' && (
                      <button
                        onClick={() => importOne(idx)}
                        className="lr-mono text-[10px] uppercase tracking-widest text-[var(--lr-navy-700)] hover:text-[var(--lr-orange-600)] border-b border-[var(--lr-navy-700)] pb-0.5"
                      >
                        ↑ Importer
                      </button>
                    )}
                    {st.status === 'loading' && (
                      <span className="lr-mono text-[10px] text-[var(--lr-steel-400)] animate-pulse">// Import…</span>
                    )}
                    {st.status === 'success' && (
                      <span className="lr-mono text-[10px] text-green-700 font-semibold">✓ Importé</span>
                    )}
                    {st.status === 'error' && (
                      <button
                        onClick={() => importOne(idx)}
                        className="lr-mono text-[10px] uppercase tracking-widest text-rose-700 hover:text-[var(--lr-navy-900)] border-b border-rose-700 pb-0.5"
                      >
                        ↻ Réessayer
                      </button>
                    )}
                  </div>
                </div>

                {/* Message d'erreur visible */}
                {st.status === 'error' && st.message && (
                  <div className="mx-4 mb-3 bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700 font-mono rounded">
                    ✕ Erreur : {st.message}
                  </div>
                )}

                {/* Panneau expandable */}
                {isOpen && (
                  <div className="border-t border-[var(--lr-border)] bg-[var(--lr-steel-50)] p-4 space-y-4">
                    {/* Métadonnées éditables */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="sm:col-span-2">
                        <label className="lr-eyebrow text-[10px] text-[var(--lr-steel-500)] block mb-1">Titre</label>
                        <input
                          value={art.title}
                          onChange={(e) => updateEdit(idx, 'title', e.target.value)}
                          className="lr-input text-sm"
                        />
                      </div>
                      <div>
                        <label className="lr-eyebrow text-[10px] text-[var(--lr-steel-500)] block mb-1">Date de publication</label>
                        <input
                          type="date"
                          value={art.published_date}
                          onChange={(e) => updateEdit(idx, 'published_date', e.target.value)}
                          className="lr-input text-sm"
                        />
                      </div>
                      <div>
                        <label className="lr-eyebrow text-[10px] text-[var(--lr-steel-500)] block mb-1">Auteur</label>
                        <input
                          value={art.author_name}
                          onChange={(e) => updateEdit(idx, 'author_name', e.target.value)}
                          className="lr-input text-sm"
                        />
                      </div>
                      <div>
                        <label className="lr-eyebrow text-[10px] text-[var(--lr-steel-500)] block mb-1">Catégorie</label>
                        <select
                          value={art.category}
                          onChange={(e) => updateEdit(idx, 'category', e.target.value)}
                          className="lr-input text-sm"
                        >
                          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="lr-eyebrow text-[10px] text-[var(--lr-steel-500)] block mb-1">Langue</label>
                        <select
                          value={art.language}
                          onChange={(e) => updateEdit(idx, 'language', e.target.value)}
                          className="lr-input text-sm"
                        >
                          {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Éditeur contenu */}
                    <div className="border border-[var(--lr-border)] bg-white">
                      <div className="flex border-b border-[var(--lr-border)]">
                        {(['edit', 'preview'] as const).map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => togglePreview(idx)}
                            className={`px-4 py-2 lr-mono text-[10px] uppercase tracking-widest transition-colors ${
                              mode === t
                                ? 'bg-[var(--lr-navy-900)] text-white'
                                : 'text-[var(--lr-steel-500)] hover:text-[var(--lr-navy-900)]'
                            }`}
                          >
                            {t === 'edit' ? '✎ Markdown' : '👁 Aperçu'}
                          </button>
                        ))}
                      </div>
                      {mode === 'edit' ? (
                        <textarea
                          value={art.content}
                          onChange={(e) => updateEdit(idx, 'content', e.target.value)}
                          className="w-full p-3 font-mono text-xs text-[var(--lr-steel-700)] focus:outline-none resize-y"
                          style={{ minHeight: '320px' }}
                        />
                      ) : (
                        <div
                          className="p-4 prose prose-sm max-w-none text-[var(--lr-steel-700)] min-h-40"
                          dangerouslySetInnerHTML={{ __html: markdownToHtml(art.content) }}
                        />
                      )}
                    </div>

                    {/* Bouton importer depuis le panneau */}
                    {st.status !== 'success' && (
                      <div className="flex justify-end">
                        <button
                          onClick={() => importOne(idx)}
                          disabled={st.status === 'loading'}
                          className="lr-btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {st.status === 'loading' ? '// Import…' : '↑ Importer cet article'}
                        </button>
                      </div>
                    )}
                    {st.status === 'success' && (
                      <p className="text-right lr-mono text-xs text-green-700 font-semibold">✓ Article importé avec succès</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
