'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { viewCart, removeFromCart, updateCartItem } from '@/lib/cart';
import { getCurrentUser } from '@/lib/user';
import { createOrder } from '@/lib/orders';
import { apiUrl } from '@/lib/api';

interface CartItem {
  id?: number;
  product_id?: number;
  product_name?: string;
  product_image?: string;
  price?: number;
  quantity: number;
}

function getItemImage(item: any): string {
  const img =
    item.product_image ||
    item.image_url ||
    item.image_1024 ||
    item.image ||
    '';
  if (!img) return '/default-product.png';
  return apiUrl(img);
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const userId = getCurrentUser()?.id ?? null;

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
    const newWindow = window.open('', '_blank');
    try {
      await createOrder({ items });
    } catch (err) {
      console.error('Failed to create order', err);
    }
    const format = (n: number) => n.toLocaleString('fr-FR');
    const lines = items.map((it) => {
      const unit = it.price ?? 0;
      const lineTotal = unit * it.quantity;
      return `- ${it.product_name} x${it.quantity} = ${format(lineTotal)} FCFA`;
    });
    const total = items.reduce(
      (sum, it) => sum + (it.price ?? 0) * it.quantity,
      0
    );
    const message =
      'Bonjour, je souhaite commander:\n' +
      lines.join('\n') +
      `\nTotal: ${format(total)} FCFA`;
    const url = `https://wa.me/22588899965?text=${encodeURIComponent(message)}`;
    if (!userId) {
      localStorage.removeItem('cart');
    }
    if (newWindow) {
      newWindow.location.href = url;
    } else {
      window.open(url, '_blank');
    }
  };

  if (loading) return <p className="lr-container py-12 lr-mono text-sm text-[var(--lr-steel-500)]">// Chargement...</p>;

  const total = items.reduce((sum, it) => sum + (it.price ?? 0) * it.quantity, 0);
  const totalQty = items.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <div className="bg-[var(--lr-steel-50)] min-h-screen">
      <header className="bg-[var(--lr-navy-900)] text-white border-b border-[var(--lr-orange-500)]">
        <div className="lr-container py-10">
          <span className="lr-eyebrow text-[var(--lr-orange-400)]">Étape 1 / 2 — Récapitulatif</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mt-1">Mon panier</h1>
        </div>
      </header>

      <main className="lr-container py-10">
        {items.length === 0 ? (
          <div className="bg-white border border-dashed border-[var(--lr-border)] py-16 text-center">
            <span className="lr-mono text-xs text-[var(--lr-steel-400)]">// CART_EMPTY</span>
            <p className="mt-2 font-display text-xl font-semibold uppercase tracking-wide text-[var(--lr-navy-900)]">Votre panier est vide.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-6">
            <div className="bg-white border border-[var(--lr-border)]">
              <div className="lr-stripe" />
              <ul className="divide-y divide-[var(--lr-border)]">
                {items.map((item, idx) => (
                  <li
                    key={item.id ?? item.product_id ?? idx}
                    className="grid grid-cols-[64px_1fr_auto] items-center gap-4 p-4"
                  >
                    <img
                      src={getItemImage(item)}
                      alt={item.product_name}
                      className="w-16 h-16 object-contain border border-[var(--lr-border)] bg-white"
                    />
                    <div>
                      <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">REF.{String(idx + 1).padStart(2, '0')}</span>
                      <p className="font-display font-semibold uppercase tracking-wide text-[var(--lr-navy-900)] text-sm">{item.product_name}</p>
                      <p className="lr-mono text-xs text-[var(--lr-steel-500)] mt-0.5">{(item.price ?? 0).toLocaleString()} FCFA / unité</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="inline-flex border border-[var(--lr-navy-900)]">
                        <button onClick={() => decrement(item)} className="px-3 py-1 bg-[var(--lr-steel-100)] hover:bg-[var(--lr-orange-500)] hover:text-white font-display font-bold text-[var(--lr-navy-900)] transition-colors border-r border-[var(--lr-navy-900)]">−</button>
                        <span className="px-4 flex items-center font-display font-bold text-[var(--lr-navy-900)] lr-tnum">{item.quantity}</span>
                        <button onClick={() => increment(item)} className="px-3 py-1 bg-[var(--lr-steel-100)] hover:bg-[var(--lr-orange-500)] hover:text-white font-display font-bold text-[var(--lr-navy-900)] transition-colors border-l border-[var(--lr-navy-900)]">+</button>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id ?? item.product_id ?? 0)}
                        className="lr-mono text-[10px] uppercase tracking-widest text-[var(--lr-orange-700)] hover:text-[var(--lr-navy-900)] border-b border-[var(--lr-orange-700)] pb-0.5"
                      >
                        Retirer
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="bg-white border border-[var(--lr-border)] h-fit">
              <div className="bg-[var(--lr-navy-900)] text-white px-5 py-3">
                <span className="lr-eyebrow text-[var(--lr-orange-400)]">Récap commande</span>
              </div>
              <div className="p-5 space-y-3 text-sm">
                <div className="flex justify-between border-b border-dashed border-[var(--lr-border)] pb-2">
                  <span className="lr-eyebrow text-[var(--lr-steel-500)]">Articles</span>
                  <span className="lr-mono text-[var(--lr-navy-900)]">{totalQty}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2">
                  <span className="lr-eyebrow text-[var(--lr-steel-500)]">Total</span>
                  <span className="font-display text-2xl font-bold text-[var(--lr-navy-900)] lr-tnum">{total.toLocaleString()} <span className="text-xs text-[var(--lr-steel-500)]">FCFA</span></span>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button
                  onClick={handleCheckout}
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-5 py-3 font-display text-sm font-semibold uppercase tracking-widest text-white border border-emerald-700 transition-colors"
                >
                  Commander via WhatsApp
                </button>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
