'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCurrentUser, isAdminEmail } from '@/lib/user';
import { createProduct } from '@/lib/products';

export default function CreateProductPage() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [reference, setReference] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
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
    setLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct({
        name,
        slug,
        reference,
        price: parseFloat(price) || 0,
      });
      setMessage('Produit ajouté');
      setName('');
      setSlug('');
      setReference('');
      setPrice('');
    } catch {
      setMessage("Erreur lors de l'ajout du produit");
    }
  };

  if (loading) return <p className="p-4">Chargement...</p>;

  return (
    <main className="container mx-auto py-8 px-4 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-4">Ajouter un produit</h1>
      <div className="flex justify-center gap-4">
        <Link href="/inventory" className="text-blue-600 underline">
          Inventaire
        </Link>
        <Link href="/stock" className="text-blue-600 underline">
          Stock
        </Link>
      </div>
      {message && <p className="text-green-600 text-center">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-2 max-w-md mx-auto">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Slug"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          placeholder="Référence"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Prix"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Créer
        </button>
      </form>
    </main>
  );
}
