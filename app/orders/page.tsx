'use client';
import { useEffect, useState } from 'react';
import { listOrders } from '@/lib/orders';
import { getCurrentUser } from '@/lib/user';

interface Order {
  id: number;
  created_at: string;
  total: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = getCurrentUser()?.id ?? null;

  useEffect(() => {
    if (!userId) {
      window.location.href = '/accounts/login';
      return;
    }
    listOrders(userId)
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="lr-container py-12 lr-mono text-sm text-[var(--lr-steel-500)]">// Chargement…</p>;

  return (
    <div className="bg-[var(--lr-steel-50)] min-h-screen">
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-10">
          <span className="lr-eyebrow text-[var(--lr-orange-400)]">Espace client · Historique</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mt-1">Mes commandes</h1>
        </div>
      </header>

      <main className="lr-container py-10 max-w-3xl">
        {orders.length === 0 ? (
          <div className="bg-white border border-dashed border-[var(--lr-border)] py-12 text-center">
            <span className="lr-mono text-xs text-[var(--lr-steel-400)]">// NO_ORDERS</span>
            <p className="mt-2 font-display text-lg uppercase tracking-wide text-[var(--lr-navy-900)]">Pas encore de commande à votre actif.</p>
          </div>
        ) : (
          <div className="bg-white border border-[var(--lr-border)] overflow-hidden">
            <div className="bg-[var(--lr-navy-900)] text-white grid grid-cols-3 gap-3 px-5 py-3 font-display text-xs uppercase tracking-widest">
              <span>Commande</span>
              <span>Date</span>
              <span className="text-right">Total</span>
            </div>
            <ul className="divide-y divide-[var(--lr-border)]">
              {orders.map((order) => (
                <li key={order.id} className="grid grid-cols-3 gap-3 px-5 py-4 text-sm hover:bg-[var(--lr-steel-50)] transition-colors">
                  <span className="lr-mono font-semibold text-[var(--lr-navy-900)]">#{order.id}</span>
                  <span className="text-[var(--lr-steel-700)] lr-mono text-xs">{new Date(order.created_at).toLocaleDateString()}</span>
                  <span className="font-display font-bold text-[var(--lr-navy-900)] lr-tnum text-right">{order.total.toLocaleString()} <span className="text-xs text-[var(--lr-steel-500)]">FCFA</span></span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
