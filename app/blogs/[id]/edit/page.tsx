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
      alert("Erreur lors de la mise à jour");
    }
  };

  if (loading) return <p className="p-4">Chargement...</p>;

  return (
    <main className="container mx-auto py-8 px-4 space-y-4 max-w-xl">
      <h1 className="text-2xl font-bold text-center mb-4">Modifier le Blog</h1>
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
        <input type="file" accept="image/*" onChange={(e) => setAuthorImage(e.target.files?.[0] || null)} />
        <input type="file" multiple onChange={(e) => setAttachments(e.target.files)} />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Enregistrer
        </button>
      </form>
    </main>
  );
}
