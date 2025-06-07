'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { viewCart, removeFromCart, updateCartItem } from '@/lib/cart';
import { createOrder } from '@/lib/orders';

interface CartItem {
  id?: number;
  product_id?: number;
  product_name?: string;
  product_image?: string;
  quantity: number;
}

function getItemImage(item: any): string {
  const base = 'https://labelshop-backend.onrender.com';
  const img =
    item.product_image ||
    item.image_url ||
    item.image_1024 ||
    item.image ||
    '';
  if (!img) return '/default-product.png';
  return img.startsWith('http') ? img : `${base}${img}`;
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

  const handleCheckout = async () => {
              className="flex items-center space-x-2"
              <img
                src={getItemImage(item)}
                alt={item.product_name}
                className="w-12 h-12 object-contain"
              />
              <span className="flex-1">{item.product_name}</span>
              <div className="flex items-center">
                <button
                  onClick={() => decrement(item)}
                  className="px-2 py-1 bg-gray-200 rounded-l"
                >
                  -
                </button>
                <span className="px-3 border-y border-gray-200">
                  {item.quantity}
                </span>
                <button
                  onClick={() => increment(item)}
                  className="px-2 py-1 bg-gray-200 rounded-r"
                >
                  +
                </button>
              </div>
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
              <div className="flex items-center space-x-2">
                <img
                  src={getItemImage(item)}
                  alt={item.product_name}
                  className="w-12 h-12 object-contain"
                />
                <span className="flex-1">{item.product_name} x{item.quantity}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decrement(item)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
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
              </div>
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
