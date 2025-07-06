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
    if (!confirm('Supprimer ce blog ?')) return;
    await deleteBlog(id);
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  if (loading) return <p className="p-4">Chargement...</p>;

  return (
    <main className="container mx-auto py-8 px-4 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-4">Blogs</h1>
      {isAdmin && (
        <div className="text-center">
          <Link href="/blogs/create" className="text-blue-600 underline">
            Nouveau blog
          </Link>
        </div>
      )}
      {blogs.length === 0 ? (
        <p>Aucun blog disponible.</p>
      ) : (
        <ul className="space-y-2">
          {blogs.map((blog) => (
            <li key={blog.id} className="border p-3 rounded flex justify-between items-center">
              <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
              {isAdmin && (
                <div className="space-x-2">
                  <Link href={`/blogs/${blog.id}/edit`} className="text-blue-600 underline">
                    Modifier
                  </Link>
                  <button onClick={() => handleDelete(blog.id)} className="text-red-600 underline">
                    Supprimer
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
