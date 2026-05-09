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
      setMessage('Produit ajouté.');
      setName('');
      setSlug('');
      setReference('');
      setPrice('');
    } catch {
      setMessage("L'ajout n'a pas abouti. Vérifiez les champs et réessayez.");
    }
  };

  if (loading) return <p className="lr-container py-12 lr-mono text-sm text-[var(--lr-steel-500)]">// Chargement…</p>;

  return (
    <div className="bg-[var(--lr-steel-50)] min-h-screen">
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-10">
          <span className="lr-eyebrow text-[var(--lr-orange-400)]">Console admin</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mt-1">Ajouter un produit</h1>
        </div>
      </header>

      <main className="lr-container py-10">
        <div className="flex justify-center gap-3 mb-8">
          <Link href="/inventory" className="lr-btn-secondary">Inventaire</Link>
          <Link href="/stock" className="lr-btn-secondary">Stock</Link>
        </div>

        {message && (
          <div className="max-w-md mx-auto mb-4 border border-emerald-300 bg-emerald-50 text-emerald-800 px-4 py-3 lr-mono text-sm">
            // {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white border border-[var(--lr-border)] p-6">
          <div className="lr-stripe -mx-6 -mt-6 mb-4" />
          <div>
            <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Nom</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom" className="lr-input" required />
          </div>
          <div>
            <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Slug</label>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Slug" className="lr-input" required />
          </div>
          <div>
            <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Référence</label>
            <input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Référence" className="lr-input lr-mono" required />
          </div>
          <div>
            <label className="lr-eyebrow text-[var(--lr-steel-500)] block mb-1">Prix</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Prix" className="lr-input lr-mono" required />
          </div>
          <button type="submit" className="lr-btn-primary w-full">Créer</button>
        </form>
      </main>
    </div>
  );
}
