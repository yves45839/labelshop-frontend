'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBlog } from '@/lib/blogs';
import { getCurrentUser, isAdminEmail } from '@/lib/user';

export default function CreateBlogPage() {
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
    setAuthorName(user.name || user.email || '');
    setLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      const blog = await createBlog(form);
      router.push(`/blogs/${blog.id}`);
    } catch {
      alert("L'article n'a pas pu être créé. Réessayez ou contactez l'admin.");
    }
  };

  if (loading) return <p className="p-4">Chargement…</p>;

  return (
    <main className="container mx-auto py-8 px-4 space-y-4 max-w-xl">
      <h1 className="text-2xl font-bold text-center mb-4">Nouvel article</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Contenu"
          className="w-full border px-3 py-2 rounded h-40"
          required
        />
        <input
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Nom de l'auteur"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAuthorImage(e.target.files?.[0] || null)}
        />
        <input
          type="file"
          multiple
          onChange={(e) => setAttachments(e.target.files)}
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Créer
        </button>
      </form>
    </main>
  );
}
