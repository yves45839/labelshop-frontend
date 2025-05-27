'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { viewCart, removeFromCart } from '@/lib/cart';
import { createOrder } from '@/lib/orders';

interface CartItem {
  id: number;
  product_name: string;
  quantity: number;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = 1; // TODO: replace with actual user id
  const router = useRouter();

  useEffect(() => {
    viewCart(userId)
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (id: number) => {
    await removeFromCart(id);
    setItems(items.filter((it) => it.id !== id));
  };

  const handleCheckout = async () => {
    await createOrder({ items });
    const text = items
      .map((it) => `${it.product_name} x${it.quantity}`)
      .join(', ');
    const url = `https://wa.me/22588899965?text=${encodeURIComponent(
      'Bonjour, je souhaite commander: ' + text
    )}`;
    router.push(url);
  };

  if (loading) return <p className="p-4">Chargement...</p>;

  return (
    <main className="container mx-auto py-8 px-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Mon panier</h1>
      {items.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <span>
                {item.product_name} x{item.quantity}
              </span>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600 text-sm"
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>
      )}
      {items.length > 0 && (
        <button
          onClick={handleCheckout}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Commander via WhatsApp
        </button>
      )}
    </main>
  );
}
