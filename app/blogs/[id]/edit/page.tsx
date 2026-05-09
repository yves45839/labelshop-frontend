'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getBlog, updateBlog } from '@/lib/blogs';
import { getCurrentUser, isAdminEmail } from '@/lib/user';

export default function EditBlogPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorImage, setAuthorImage] = useState<File | null>(null);
  const [attachments, setAttachments] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      window.location.href = '/accounts/login';
      return;
    }
    if (!isAdminEmail(user.email)) {
      window.location.href = '/';
      return;
    }
    if (id) {
      getBlog(id)
        .then((b) => {
          setTitle(b.title);
          setContent(b.content);
          setAuthorName(b.author_name);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    const form = new FormData();
    form.append('title', title);
    form.append('content', content);
    form.append('author_name', authorName);
    if (authorImage) form.append('author_image', authorImage);
    if (attachments) {
      Array.from(attachments).forEach((file) => {
        form.append('attachments', file);
      });
    }
    try {
      await updateBlog(id, form);
      router.push(`/blogs/${id}`);
    } catch {
      alert("La mise à jour n'a pas abouti. Réessayez ou contactez l'admin.");
    }
  };

  if (loading) return <p className="lr-container py-12 lr-mono text-sm text-[var(--lr-steel-500)]">// Chargement…</p>;

  return (
    <div className="bg-[var(--lr-steel-50)] min-h-screen">
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-10">
          <span className="lr-eyebrow text-[var(--lr-orange-400)]">Console admin · Édition</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mt-1">Modifier l'article</h1>
        </div>
      </header>

      <main className="lr-container py-10 max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white border border-[var(--lr-border)] p-6 space-y-4">
          <div className="lr-stripe -mx-6 -mt-6 mb-4" />
          <div>
            <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Titre</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" className="lr-input" required />
          </div>
          <div>
            <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Contenu</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Contenu" className="lr-input h-40" required />
          </div>
          <div>
            <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Auteur</label>
            <input value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Nom de l'auteur" className="lr-input" required />
          </div>
          <div>
            <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Photo auteur</label>
            <input type="file" accept="image/*" onChange={(e) => setAuthorImage(e.target.files?.[0] || null)} className="lr-input" />
          </div>
          <div>
            <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Pièces jointes</label>
            <input type="file" multiple onChange={(e) => setAttachments(e.target.files)} className="lr-input" />
          </div>
          <button type="submit" className="lr-btn-primary w-full">Enregistrer</button>
        </form>
      </main>
    </div>
  );
}
