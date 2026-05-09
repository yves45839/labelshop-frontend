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

  if (loading) return <p className="lr-container py-12 lr-mono text-sm text-[var(--lr-steel-500)]">// Chargement…</p>;

  return (
    <div className="bg-[var(--lr-steel-50)] min-h-screen">
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-10">
          <span className="lr-eyebrow text-[var(--lr-orange-400)]">Console admin</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mt-1">Gestion de stock</h1>
        </div>
      </header>

      <main className="lr-container py-10 space-y-6 max-w-4xl">
        <div className="flex flex-wrap gap-3">
          <Link href="/stock" className="lr-btn-secondary">Voir stock</Link>
          <Link href="/products/create" className="lr-btn-secondary">Ajouter produit</Link>
        </div>

        <section className="bg-white border border-[var(--lr-border)] p-6">
          <div className="lr-section-heading mb-4">
            <span className="bar" />
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">Sites</h2>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[var(--lr-border)] border border-[var(--lr-border)] mb-4">
            {sites.map((site, idx) => (
              <li key={site.id} className="bg-white p-3">
                <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">SITE.{String(idx + 1).padStart(2, '0')}</span>
                <p className="font-display font-semibold uppercase text-sm text-[var(--lr-navy-900)] mt-1">{site.name}</p>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <input value={newSite} onChange={(e) => setNewSite(e.target.value)} placeholder="Nouveau site" className="lr-input flex-grow" />
            <button onClick={handleCreateSite} className="lr-btn-primary">Ajouter</button>
          </div>
        </section>

        <section className="bg-white border border-[var(--lr-border)] p-6 space-y-4">
          <div className="lr-section-heading">
            <span className="bar" />
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">Stock par produit</h2>
          </div>
          <div className="flex gap-2 items-end">
            <div className="flex flex-col flex-grow">
              <label className="lr-eyebrow text-[var(--lr-steel-500)] mb-1">ID Produit</label>
              <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} className="lr-input lr-mono" />
            </div>
            <button onClick={fetchStock} className="lr-btn-primary">Voir stock</button>
          </div>

          {stock.length > 0 && (
            <table className="w-full text-sm border border-[var(--lr-border)]">
              <thead className="bg-[var(--lr-navy-900)] text-white">
                <tr>
                  <th className="px-3 py-2 text-left font-display uppercase tracking-widest text-xs">Site</th>
                  <th className="px-3 py-2 font-display uppercase tracking-widest text-xs">Quantité</th>
                  <th className="px-3 py-2 font-display uppercase tracking-widest text-xs">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--lr-border)]">
                {stock.map((entry) => (
                  <tr key={entry.site_id} className="hover:bg-[var(--lr-steel-50)]">
                    <td className="px-3 py-2 font-display font-semibold text-[var(--lr-navy-900)]">{entry.site_name}</td>
                    <td className="px-3 py-2 text-center lr-mono lr-tnum text-[var(--lr-navy-900)]">{entry.quantity}</td>
                    <td className="px-3 py-2 text-center">
                      <div className="inline-flex border border-[var(--lr-navy-900)]">
                        <button onClick={() => handleUpdate(entry.site_id, entry.quantity + 1)} className="px-3 py-1 bg-[var(--lr-steel-100)] hover:bg-[var(--lr-orange-500)] hover:text-white font-display font-bold transition-colors border-r border-[var(--lr-navy-900)]">+</button>
                        <button onClick={() => handleUpdate(entry.site_id, Math.max(0, entry.quantity - 1))} className="px-3 py-1 bg-[var(--lr-steel-100)] hover:bg-[var(--lr-orange-500)] hover:text-white font-display font-bold transition-colors">−</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {sites.length >= 2 && (
          <section className="bg-white border border-[var(--lr-border)] p-6">
            <div className="lr-section-heading mb-4">
              <span className="bar" />
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">Transférer du stock</h2>
            </div>
            <div className="flex flex-wrap gap-2 items-end">
              <div className="flex flex-col">
                <label className="lr-eyebrow text-[var(--lr-steel-500)] mb-1">Depuis</label>
                <select value={transfer.from} onChange={(e) => setTransfer({ ...transfer, from: e.target.value })} className="lr-input">
                  <option value="">Depuis…</option>
                  {sites.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="lr-eyebrow text-[var(--lr-steel-500)] mb-1">Vers</label>
                <select value={transfer.to} onChange={(e) => setTransfer({ ...transfer, to: e.target.value })} className="lr-input">
                  <option value="">Vers…</option>
                  {sites.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="lr-eyebrow text-[var(--lr-steel-500)] mb-1">Qté</label>
                <input type="number" min={1} value={transfer.qty} onChange={(e) => setTransfer({ ...transfer, qty: parseInt(e.target.value, 10) || 1 })} className="lr-input lr-mono w-24" />
              </div>
              <button onClick={handleTransfer} className="lr-btn-primary">Transférer</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
