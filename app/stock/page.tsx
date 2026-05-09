'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { listStock, updateStock } from '@/lib/stock';
import { getCurrentUser, isAdminEmail } from '@/lib/user';
import StockGrid, { type StockProduct } from '@/components/StockGrid';

export default function StockPage() {
  const [items, setItems] = useState<StockProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();
  const userId = user?.id ?? null;

  useEffect(() => {
    if (!userId) {
      window.location.href = '/accounts/login';
      return;
    }
    if (!isAdminEmail(user?.email)) {
      window.location.href = '/';
      return;
    }
    listStock()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = async (item: StockProduct, qty: number) => {
    const quantity = Math.max(0, qty);
    try {
      await updateStock(item.id, quantity);
      setItems(items.map((it) => (it.id === item.id ? { ...it, quantity } : it)));
    } catch (err) {
      console.error('Failed to update stock', err);
    }
  };

  if (loading) return <p className="lr-container py-12 lr-mono text-sm text-[var(--lr-steel-500)]">// Chargement…</p>;

  return (
    <div className="bg-[var(--lr-steel-50)] min-h-screen">
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-10">
          <span className="lr-eyebrow text-[var(--lr-orange-400)]">Console admin</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mt-1">Gestion du stock</h1>
        </div>
      </header>

      <main className="lr-container py-10 space-y-6">
        <div className="flex flex-wrap gap-3">
          <Link href="/inventory" className="lr-btn-secondary">Inventaire</Link>
          <Link href="/products/create" className="lr-btn-secondary">Ajouter un produit</Link>
        </div>
        {items.length === 0 ? (
          <div className="bg-white border border-dashed border-[var(--lr-border)] py-12 text-center">
            <span className="lr-mono text-xs text-[var(--lr-steel-400)]">// EMPTY_STOCK</span>
            <p className="mt-2 font-display text-lg uppercase tracking-wide text-[var(--lr-navy-900)]">Le stock est vide pour le moment.</p>
          </div>
        ) : (
          <StockGrid products={items} onUpdate={handleUpdate} />
        )}
      </main>
    </div>
  );
}
