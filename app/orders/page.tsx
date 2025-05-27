'use client';
import { useEffect, useState } from 'react';
import { listOrders } from '@/lib/orders';

interface Order {
  id: number;
  created_at: string;
  total: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = 1; // TODO: replace with actual user id

  useEffect(() => {
    listOrders(userId)
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Chargement...</p>;

  return (
    <main className="container mx-auto py-8 px-4 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-4">Mes commandes</h1>
      {orders.length === 0 ? (
        <p>Aucune commande pour le moment.</p>
      ) : (
        <ul className="space-y-2">
          {orders.map((order) => (
            <li key={order.id} className="border p-3 rounded">
              <p>Commande #{order.id}</p>
              <p>Date : {new Date(order.created_at).toLocaleDateString()}</p>
              <p>Total : {order.total} FCFA</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
