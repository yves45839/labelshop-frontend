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

  if (loading) return <p className="p-4">Chargement...</p>;

  return (
    <main className="container mx-auto py-8 px-4 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-4">Gestion de stock</h1>
      <div className="flex justify-center gap-4">
        <Link href="/inventory" className="text-blue-600 underline">
          Inventaire
        </Link>
        <Link href="/products/create" className="text-blue-600 underline">
          Ajouter produit
        </Link>
      </div>
      {items.length === 0 ? (
        <p>Aucun produit en stock.</p>
      ) : (
        <StockGrid products={items} onUpdate={handleUpdate} />
      )}
    </main>
  );
}
