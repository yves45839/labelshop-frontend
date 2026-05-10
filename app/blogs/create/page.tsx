'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBlog } from '@/lib/blogs';
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

export default function CreateBlogPage() {
  const [title, setTitle]               = useState('');
  const [content, setContent]           = useState('');
  const [authorName, setAuthorName]     = useState('Yves Roland OUIYA');
  const [category, setCategory]         = useState('');
  const [language, setLanguage]         = useState('FR/EN (Bilingue)');
  const [publishedDate, setPublishedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [authorImage, setAuthorImage]   = useState<File | null>(null);
  const [attachments, setAttachments]   = useState<FileList | null>(null);
  const [loading, setLoading]           = useState(true);
  const [saving, setSaving]             = useState(false);
  const [tab, setTab]                   = useState<'edit' | 'preview'>('edit');

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router      = useRouter();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) { window.location.href = '/accounts/login'; return; }
    if (!isAdminEmail(user.email)) { window.location.href = '/'; return; }
    if (user.name) setAuthorName(user.name);
    setLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      const blog = await createBlog(form);
      router.push(`/blogs/${blog.id}`);
    } catch {
      alert("L'article n'a pas pu être créé. Réessayez ou contactez l'admin.");
    } finally {
      setSaving(false);
    }
  };

  const insertMarkdown = (before: string, after = '') => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end   = ta.selectionEnd;
    const sel   = content.slice(start, end);
    setContent(content.slice(0, start) + before + sel + after + content.slice(end));
    ta.focus();
    setTimeout(() => {
      ta.selectionStart = start + before.length;
      ta.selectionEnd   = start + before.length + sel.length;
    }, 0);
  };

  const previewHtml = markdownToHtml(content);

  if (loading) return (
    <div className="min-h-screen bg-[var(--lr-steel-50)] flex items-center justify-center">
      <span className="lr-mono text-sm text-[var(--lr-steel-500)]">// Chargement…</span>
    </div>
  );

  return (
    <div className="bg-[var(--lr-steel-50)] min-h-screen">
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="lr-eyebrow text-[var(--lr-orange-400)]">Console admin · Blog</span>
            <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mt-1">Nouvel article</h1>
          </div>
          <Link href="/blogs" className="lr-mono text-xs text-white/60 hover:text-white transition-colors">
            ← Retour au blog
          </Link>
        </div>
      </header>

      <main className="lr-container py-10 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Métadonnées */}
          <div className="bg-white border border-[var(--lr-border)] p-6 space-y-4">
            <div className="lr-stripe -mx-6 -mt-6 mb-4" />
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">Métadonnées</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Titre *</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="lr-input" placeholder="Titre de l'article" required />
              </div>
              <div>
                <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Auteur *</label>
                <input value={authorName} onChange={(e) => setAuthorName(e.target.value)} className="lr-input" required />
              </div>
              <div>
                <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Date de publication</label>
                <input type="date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} className="lr-input" />
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
                <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Photo auteur</label>
                <input type="file" accept="image/*" onChange={(e) => setAuthorImage(e.target.files?.[0] || null)} className="lr-input" />
              </div>
              <div>
                <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Pièces jointes</label>
                <input type="file" multiple onChange={(e) => setAttachments(e.target.files)} className="lr-input" />
              </div>
            </div>
          </div>

          {/* Éditeur */}
          <div className="bg-white border border-[var(--lr-border)]">
            <div className="flex border-b border-[var(--lr-border)]">
              {(['edit', 'preview'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`px-5 py-3 lr-mono text-xs uppercase tracking-widest transition-colors ${
                    tab === t ? 'bg-[var(--lr-navy-900)] text-white' : 'text-[var(--lr-steel-500)] hover:text-[var(--lr-navy-900)]'
                  }`}
                >
                  {t === 'edit' ? '✎ Éditer' : '👁 Aperçu'}
                </button>
              ))}
            </div>

            {tab === 'edit' && (
              <div className="flex flex-wrap gap-1 px-3 py-2 border-b border-[var(--lr-border)] bg-[var(--lr-steel-50)]">
                {[
                  { label: 'H2', fn: () => insertMarkdown('## ') },
                  { label: 'H3', fn: () => insertMarkdown('### ') },
                  { label: 'B', fn: () => insertMarkdown('**', '**') },
                  { label: 'I', fn: () => insertMarkdown('*', '*') },
                  { label: '—', fn: () => insertMarkdown('\n---\n') },
                  { label: '• Liste', fn: () => insertMarkdown('- ') },
                  { label: 'Lien', fn: () => insertMarkdown('[texte](', 'https://...)') },
                  { label: 'Code', fn: () => insertMarkdown('`', '`') },
                ].map((btn) => (
                  <button key={btn.label} type="button" onClick={btn.fn}
                    className="px-2.5 py-1 text-xs font-semibold bg-white border border-[var(--lr-border)] hover:bg-[var(--lr-steel-100)] text-[var(--lr-navy-900)] transition-colors">
                    {btn.label}
                  </button>
                ))}
              </div>
            )}

            {tab === 'edit' ? (
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 font-mono text-sm text-[var(--lr-steel-700)] focus:outline-none resize-none"
                style={{ minHeight: '480px' }}
                placeholder="Rédigez votre article en Markdown…"
                required
              />
            ) : (
              <div
                className="p-6 prose prose-lg max-w-none text-[var(--lr-steel-700)] min-h-48"
                dangerouslySetInnerHTML={{ __html: previewHtml || '<span class="lr-mono text-sm text-[var(--lr-steel-400)]">// Aucun contenu à prévisualiser</span>' }}
              />
            )}
          </div>

          {/* Barre de soumission */}
          <div className="sticky bottom-4 flex items-center justify-between bg-[var(--lr-navy-900)] border border-[var(--lr-orange-500)] px-5 py-3 shadow-xl">
            <span className="lr-mono text-xs text-white/50">Nouvel article · {publishedDate}</span>
            <div className="flex items-center gap-3">
              <Link href="/blogs" className="lr-mono text-xs text-white/60 hover:text-white transition-colors">
                Annuler
              </Link>
              <button type="submit" disabled={saving}
                className="lr-btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
                {saving ? '// Publication…' : '✓ Publier'}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
