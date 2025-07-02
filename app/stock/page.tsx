'use client';
import { useEffect, useMemo, useState } from 'react';
import { listStock, updateStock, type StockItem } from '@/lib/stock';

export default function StockPage() {
  const [items, setItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const stored = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const userId = stored ? JSON.parse(stored).id : null;

  useEffect(() => {
    if (!userId) {
      window.location.href = '/accounts/login';
      return;
    }
    listStock()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = async (item: StockItem, qty: number) => {
    const quantity = Math.max(0, qty);
    try {
      await updateStock(item.id, quantity);
      setItems(items.map((it) => (it.id === item.id ? { ...it, quantity } : it)));
    } catch (err) {
      console.error('Failed to update stock', err);
    }
  };

  const siteNames = useMemo(
    () =>
      Array.from(
        new Set(
          items.flatMap((it) =>
            it.site_quantities ? Object.keys(it.site_quantities) : []
          )
        )
      ),
    [items]
  );

  if (loading) return <p className="p-4">Chargement...</p>;

  return (
    <main className="container mx-auto py-8 px-4 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-4">Gestion de stock</h1>
      {items.length === 0 ? (
        <p>Aucun produit en stock.</p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border px-2 py-1 text-left">Produit</th>
              {siteNames.map((site) => (
                <th key={site} className="border px-2 py-1 text-center">
                  {site}
                </th>
              ))}
              <th className="border px-2 py-1">Total</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="border px-2 py-1">{item.name}</td>
                {siteNames.map((site) => (
                  <td key={site} className="border px-2 py-1 text-center">
                    {item.site_quantities?.[site] ?? 0}
                  </td>
                ))}
                <td className="border px-2 py-1 text-center">{item.quantity}</td>
                <td className="border px-2 py-1 text-center space-x-1">
                  <button
                    onClick={() => handleUpdate(item, item.quantity + 1)}
                    className="px-2 bg-gray-200 rounded-l"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleUpdate(item, item.quantity - 1)}
                    className="px-2 bg-gray-200 rounded-r"
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
