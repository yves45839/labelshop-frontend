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
    if (!confirm('Supprimer ce blog ?')) return;
    await deleteBlog(blog.id);
    window.location.href = '/blogs';
  };

  if (loading) return <p className="p-4">Chargement...</p>;
  if (!blog) return <p className="p-4">Blog introuvable.</p>;

  return (
    <main className="container mx-auto py-8 px-4 space-y-4">
      <h1 className="text-2xl font-bold">{blog.title}</h1>
      <p className="italic">Par {blog.author_name}</p>
      {blog.author_image && (
        <img src={blog.author_image} alt={blog.author_name} className="w-32 h-32 object-cover rounded" />
      )}
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      {blog.attachments && blog.attachments.length > 0 && (
        <div className="space-y-2">
          <h2 className="font-semibold">Fichiers</h2>
          <ul className="list-disc ml-6 space-y-1">
            {blog.attachments.map((att, idx) => (
              <li key={idx}>
                <a href={att} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {att.split('/').pop()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isAdmin && (
        <div className="space-x-2">
          <Link href={`/blogs/${blog.id}/edit`} className="text-blue-600 underline">
            Modifier
          </Link>
          <button onClick={handleDelete} className="text-red-600 underline">
            Supprimer
          </button>
        </div>
      )}
    </main>
  );
}
