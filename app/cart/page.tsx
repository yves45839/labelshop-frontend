'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { viewCart, removeFromCart, updateCartItem } from '@/lib/cart';
import { createOrder } from '@/lib/orders';

interface CartItem {
  id?: number;
  product_id?: number;
  product_name?: string;
  quantity: number;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const stored = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const userId = stored ? JSON.parse(stored).id : null;

  useEffect(() => {
    if (!userId) {
      const local = localStorage.getItem('cart');
      setItems(local ? JSON.parse(local) : []);
      setLoading(false);
      return;
    }
    viewCart(userId)
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (id: number) => {
    if (userId) {
      await removeFromCart(id);
      setItems(items.filter((it) => it.id !== id));
      return;
    }
    const updated = items.filter((it) => it.product_id !== id && it.id !== id);
    localStorage.setItem('cart', JSON.stringify(updated));
    setItems(updated);
  };

  const handleCheckout = async () => {
    await createOrder({ items });
    const text = items
      .map((it) => `${it.product_name} x${it.quantity}`)
      .join(', ');
    const url = `https://wa.me/22588899965?text=${encodeURIComponent(
      'Bonjour, je souhaite commander: ' + text
    )}`;
    if (!userId) {
      localStorage.removeItem('cart');
    }
    router.push(url);
  };

  const updateQuantity = async (item: CartItem, quantity: number) => {
    const id = item.id ?? item.product_id ?? 0;
    if (quantity <= 0) {
      await handleRemove(id);
      return;
    }
    await updateCartItem({ item_id: id, quantity });
    const updated = await viewCart(userId ?? undefined);
    setItems(updated);
  };

  const increment = (item: CartItem) => updateQuantity(item, item.quantity + 1);
  const decrement = (item: CartItem) => updateQuantity(item, item.quantity - 1);

  if (loading) return <p className="p-4">Chargement...</p>;

  return (
    <main className="container mx-auto py-8 px-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Mon panier</h1>
      {items.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li
              key={item.id ?? item.product_id ?? idx}
              className="flex items-center justify-between space-x-2"
            >
              <button
                onClick={() => decrement(item)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span className="flex-1 text-center">
                {item.product_name} x{item.quantity}
              </span>
              <button
                onClick={() => increment(item)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
              <button
                onClick={() => handleRemove(item.id ?? item.product_id ?? 0)}
                className="text-red-600 text-sm"
              >
                Retirer
              </button>
            </li>

                onClick={() => handleRemove(item.id ?? item.product_id ?? 0)}
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
