'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  listSites,
  createSite,
  listProductStock,
  updateProductStock,
  transferProductStock,
  type Site,
  type StockEntry,
} from '@/lib/inventory';
import { getCurrentUser, isAdminEmail } from '@/lib/user';

export default function InventoryPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [productId, setProductId] = useState('');
  const [stock, setStock] = useState<StockEntry[]>([]);
  const [newSite, setNewSite] = useState('');
  const [transfer, setTransfer] = useState({ from: '', to: '', qty: 1 });
  const [loading, setLoading] = useState(true);

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
    listSites().then(setSites).finally(() => setLoading(false));
  }, []);

  const fetchStock = async () => {
    if (!productId) return;
    try {
      const data = await listProductStock(productId);
      setStock(data);
    } catch {
      setStock([]);
    }
  };

  const handleUpdate = async (siteId: number, qty: number) => {
    if (!productId) return;
    try {
      await updateProductStock(Number(productId), siteId, qty);
      setStock(stock.map((s) => (s.site_id === siteId ? { ...s, quantity: qty } : s)));
    } catch {
      /* ignore */
    }
  };

  const handleTransfer = async () => {
    if (!productId || !transfer.from || !transfer.to) return;
    try {
      await transferProductStock({
        product_id: Number(productId),
        from_site_id: Number(transfer.from),
        to_site_id: Number(transfer.to),
        quantity: transfer.qty,
      });
      await fetchStock();
    } catch {
      /* ignore */
    }
  };

  const handleCreateSite = async () => {
    if (!newSite.trim()) return;
    try {
      const site = await createSite(newSite.trim());
      setSites([...sites, site]);
      setNewSite('');
    } catch {
      /* ignore */
    }
  };

  if (loading) return <p className="p-4">Chargement…</p>;

  return (
    <main className="container mx-auto py-8 px-4 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-4">Gestion de stock</h1>
      <div className="flex justify-center gap-4">
        <Link href="/stock" className="text-blue-600 underline">
          Voir stock
        </Link>
        <Link href="/products/create" className="text-blue-600 underline">
          Ajouter produit
        </Link>
      </div>

      <section className="space-y-2">
        <h2 className="font-semibold">Sites</h2>
        <ul className="list-disc ml-6">
          {sites.map((site) => (
            <li key={site.id}>{site.name}</li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            value={newSite}
            onChange={(e) => setNewSite(e.target.value)}
            placeholder="Nouveau site"
            className="border px-2 py-1 rounded flex-grow"
          />
          <button
            onClick={handleCreateSite}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          >
            Ajouter
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex gap-2 items-end">
          <div className="flex flex-col flex-grow">
            <label className="text-sm">ID Produit</label>
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="border px-2 py-1 rounded"
            />
          </div>
          <button
            onClick={fetchStock}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          >
            Voir stock
          </button>
        </div>

        {stock.length > 0 && (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border px-2 py-1 text-left">Site</th>
                <th className="border px-2 py-1">Quantité</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((entry) => (
                <tr key={entry.site_id}>
                  <td className="border px-2 py-1">{entry.site_name}</td>
                  <td className="border px-2 py-1 text-center">{entry.quantity}</td>
                  <td className="border px-2 py-1 text-center space-x-1">
                    <button
                      onClick={() => handleUpdate(entry.site_id, entry.quantity + 1)}
                      className="px-2 bg-gray-200 rounded-l"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleUpdate(entry.site_id, Math.max(0, entry.quantity - 1))}
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
      </section>

      {sites.length >= 2 && (
        <section className="space-y-2">
          <h2 className="font-semibold">Transférer du stock</h2>
          <div className="flex flex-wrap gap-2 items-end">
            <select
              value={transfer.from}
              onChange={(e) => setTransfer({ ...transfer, from: e.target.value })}
              className="border px-2 py-1 rounded"
            >
              <option value="">Depuis…</option>
              {sites.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <select
              value={transfer.to}
              onChange={(e) => setTransfer({ ...transfer, to: e.target.value })}
              className="border px-2 py-1 rounded"
            >
              <option value="">Vers…</option>
              {sites.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={1}
              value={transfer.qty}
              onChange={(e) => setTransfer({ ...transfer, qty: parseInt(e.target.value, 10) || 1 })}
              className="border w-24 px-2 py-1 rounded"
            />
            <button
              onClick={handleTransfer}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            >
              Transférer
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
