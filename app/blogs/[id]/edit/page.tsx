'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import NextLink from 'next/link';
import { getBlog, updateBlog, formatDateTime, type BlogData } from '@/lib/blogs';
import { getCurrentUser, isAdminEmail } from '@/lib/user';
import { markdownToHtml } from '@/lib/markdown';

const CATEGORIES = [
  'Vidéosurveillance',
  'Contrôle d\'accès',
  'Détection d\'intrusion',
  'Sécurité incendie',
  'Visiophonie',
  'Solutions intégrées',
  'IoT',
  'Tendances',
  'Label Retail',
];

const LANGUAGES = ['FR/EN (Bilingue)', 'Français', 'English'];

export default function EditBlogPage() {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [title, setTitle]         = useState('');
  const [content, setContent]     = useState('');
  const [authorName, setAuthorName] = useState('');
  const [category, setCategory]   = useState('');
  const [language, setLanguage]   = useState('FR/EN (Bilingue)');
  const [publishedDate, setPublishedDate] = useState('');
  const [authorImage, setAuthorImage]     = useState<File | null>(null);
  const [attachments, setAttachments]     = useState<FileList | null>(null);
  const [existingBlog, setExistingBlog]   = useState<BlogData | null>(null);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [tab, setTab]             = useState<'edit' | 'preview'>('edit');
  const [saved, setSaved]         = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router      = useRouter();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) { window.location.href = '/accounts/login'; return; }
    if (!isAdminEmail(user.email)) { window.location.href = '/'; return; }

    if (id) {
      getBlog(id)
        .then((b) => {
          setExistingBlog(b);
          setTitle(b.title ?? '');
          setContent(b.content ?? '');
          setAuthorName(b.author_name ?? '');
          setCategory(b.category ?? '');
          setLanguage(b.language ?? 'FR/EN (Bilingue)');
          setPublishedDate(
            b.published_date
              ? new Date(b.published_date).toISOString().split('T')[0]
              : b.created_at
              ? new Date(b.created_at).toISOString().split('T')[0]
              : ''
          );
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    const form = new FormData();
    form.append('title', title);
    form.append('content', content);
    form.append('author_name', authorName);
    form.append('category', category);
    form.append('language', language);
    if (publishedDate) form.append('published_date', publishedDate);
    if (authorImage) form.append('author_image', authorImage);
    if (attachments) {
      Array.from(attachments).forEach((file) => form.append('attachments', file));
    }
    try {
      await updateBlog(id, form);
      setSaved(true);
      setTimeout(() => {
        router.push(`/blogs/${id}`);
      }, 800);
    } catch {
      alert("La mise à jour n'a pas abouti. Réessayez ou contactez l'admin.");
    } finally {
      setSaving(false);
    }
  };

  /** Insère une balise Markdown autour de la sélection */
  const insertMarkdown = (before: string, after = '') => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end   = ta.selectionEnd;
    const sel   = content.slice(start, end);
    const newContent = content.slice(0, start) + before + sel + after + content.slice(end);
    setContent(newContent);
    ta.focus();
    setTimeout(() => {
      ta.selectionStart = start + before.length;
      ta.selectionEnd   = start + before.length + sel.length;
    }, 0);
  };

  const previewHtml = markdownToHtml(content);
  const modDate = formatDateTime(existingBlog?.updated_at);
  const wasEdited = existingBlog?.updated_at && existingBlog?.created_at && existingBlog.updated_at !== existingBlog.created_at;

  if (loading) return (
    <div className="min-h-screen bg-[var(--lr-steel-50)] flex items-center justify-center">
      <span className="lr-mono text-sm text-[var(--lr-steel-500)]">// Chargement…</span>
    </div>
  );

  return (
    <div className="bg-[var(--lr-steel-50)] min-h-screen">
      {/* En-tête */}
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="lr-eyebrow text-[var(--lr-orange-400)]">Console admin · Édition</span>
            <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mt-1">Modifier l'article</h1>
            {wasEdited && modDate && (
              <p className="mt-1 lr-mono text-xs text-[var(--lr-orange-300)]">
                ✏️ Dernière modification : {modDate}
              </p>
            )}
          </div>
          <NextLink href={`/blogs/${id}`} className="lr-mono text-xs text-white/60 hover:text-white transition-colors">
            ← Voir l'article
          </NextLink>
        </div>
      </header>

      <main className="lr-container py-10 max-w-4xl">
        {saved && (
          <div className="mb-6 bg-green-50 border border-green-300 px-4 py-3 flex items-center gap-2">
            <span className="text-green-700 font-semibold text-sm">✓ Article mis à jour avec succès ! Redirection…</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Métadonnées */}
          <div className="bg-white border border-[var(--lr-border)] p-6 space-y-4">
            <div className="lr-stripe -mx-6 -mt-6 mb-4" />
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">Métadonnées</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Titre *</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="lr-input" required />
              </div>
              <div>
                <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Auteur *</label>
                <input value={authorName} onChange={(e) => setAuthorName(e.target.value)} className="lr-input" required />
              </div>
              <div>
                <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Catégorie</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="lr-input">
                  <option value="">— Choisir —</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Langue</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="lr-input">
                  {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Date de publication</label>
                <input type="date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} className="lr-input" />
              </div>
              <div>
                <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Photo auteur</label>
                <input type="file" accept="image/*" onChange={(e) => setAuthorImage(e.target.files?.[0] || null)} className="lr-input" />
              </div>
            </div>

            <div>
              <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Pièces jointes</label>
              <input type="file" multiple onChange={(e) => setAttachments(e.target.files)} className="lr-input" />
            </div>
          </div>

          {/* Éditeur de contenu */}
          <div className="bg-white border border-[var(--lr-border)]">
            {/* Onglets */}
            <div className="flex border-b border-[var(--lr-border)]">
              <button
                type="button"
                onClick={() => setTab('edit')}
                className={`px-5 py-3 lr-mono text-xs uppercase tracking-widest transition-colors ${
                  tab === 'edit'
                    ? 'bg-[var(--lr-navy-900)] text-white'
                    : 'text-[var(--lr-steel-500)] hover:text-[var(--lr-navy-900)]'
                }`}
              >
                ✎ Éditer
              </button>
              <button
                type="button"
                onClick={() => setTab('preview')}
                className={`px-5 py-3 lr-mono text-xs uppercase tracking-widest transition-colors ${
                  tab === 'preview'
                    ? 'bg-[var(--lr-navy-900)] text-white'
                    : 'text-[var(--lr-steel-500)] hover:text-[var(--lr-navy-900)]'
                }`}
              >
                👁 Aperçu
              </button>
            </div>

            {/* Barre d'outils Markdown */}
            {tab === 'edit' && (
              <div className="flex flex-wrap gap-1 px-3 py-2 border-b border-[var(--lr-border)] bg-[var(--lr-steel-50)]">
                {[
                  { label: 'H2', action: () => insertMarkdown('## ') },
                  { label: 'H3', action: () => insertMarkdown('### ') },
                  { label: 'H4', action: () => insertMarkdown('#### ') },
                  { label: 'B', action: () => insertMarkdown('**', '**') },
                  { label: 'I', action: () => insertMarkdown('*', '*') },
                  { label: '—', action: () => insertMarkdown('\n---\n') },
                  { label: '• Liste', action: () => insertMarkdown('- ') },
                  { label: '1. Liste', action: () => insertMarkdown('1. ') },
                  { label: 'Lien', action: () => insertMarkdown('[texte](', 'https://...)') },
                  { label: 'Code', action: () => insertMarkdown('`', '`') },
                  { label: 'Bloc code', action: () => insertMarkdown('```\n', '\n```') },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    type="button"
                    onClick={btn.action}
                    className="px-2.5 py-1 text-xs font-semibold bg-white border border-[var(--lr-border)] hover:bg-[var(--lr-steel-100)] text-[var(--lr-navy-900)] transition-colors"
                  >
                    {btn.label}
                  </button>
                ))}
                <span className="ml-auto lr-mono text-[10px] text-[var(--lr-steel-400)] self-center pr-1">
                  Markdown supporté
                </span>
              </div>
            )}

            {/* Zone texte / aperçu */}
            {tab === 'edit' ? (
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 font-mono text-sm text-[var(--lr-steel-700)] focus:outline-none resize-none"
                style={{ minHeight: '520px' }}
                placeholder="Rédigez votre article en Markdown…"
                required
              />
            ) : (
              <div
                className="p-6 prose prose-lg max-w-none text-[var(--lr-steel-700)] min-h-64"
                dangerouslySetInnerHTML={{ __html: previewHtml || '<span class="lr-mono text-sm text-[var(--lr-steel-400)]">// Aucun contenu à prévisualiser</span>' }}
              />
            )}
          </div>

          {/* Barre de sauvegarde flottante */}
          <div className="sticky bottom-4 flex items-center justify-between bg-[var(--lr-navy-900)] border border-[var(--lr-orange-500)] px-5 py-3 shadow-xl">
            <div className="lr-mono text-xs text-white/50">
              {wasEdited && modDate ? `Dernière sauvegarde : ${modDate}` : 'Nouvelle version en cours…'}
            </div>
            <div className="flex items-center gap-3">
              <NextLink href={`/blogs/${id}`} className="lr-mono text-xs text-white/60 hover:text-white transition-colors">
                Annuler
              </NextLink>
              <button
                type="submit"
                disabled={saving}
                className="lr-btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? '// Sauvegarde…' : '✓ Enregistrer'}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

