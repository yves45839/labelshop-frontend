'use client';

import { useState } from 'react';
import { addToCart, updateCartItem, removeFromCart } from '@/lib/cart';

interface ProductInfo {
  id: number;
  name: string;
  imageUrl?: string;
  price?: number;
}

export default function AddToCart({ product }: { product: ProductInfo }) {
  const [qty, setQty] = useState(0);
  const [itemId, setItemId] = useState<number | null>(null);

  const handleAdd = async () => {
    const res = await addToCart({
      product_id: product.id,
      quantity: 1,
      product_name: product.name,
      product_image: product.imageUrl,
      price: product.price,
    });
    if (res && typeof res === 'object' && 'id' in res) {
      setItemId((res as any).id as number);
    }
    setQty(1);
  };

  const increment = async () => {
    const newQty = qty + 1;
    await updateCartItem({ item_id: itemId ?? product.id, quantity: newQty });
    setQty(newQty);
  };

  const decrement = async () => {
    const newQty = qty - 1;
    if (newQty <= 0) {
      await removeFromCart(itemId ?? product.id);
      setQty(0);
      setItemId(null);
    } else {
      await updateCartItem({ item_id: itemId ?? product.id, quantity: newQty });
      setQty(newQty);
    }
  };

  if (qty === 0) {
    return (
      <button
        onClick={handleAdd}
        className="w-full bg-[var(--lr-navy-900)] hover:bg-[var(--lr-orange-600)] text-white font-display text-sm font-semibold uppercase tracking-widest py-2.5 px-4 border border-[var(--lr-navy-900)] hover:border-[var(--lr-orange-600)] transition-colors"
      >
        Ajouter au panier
      </button>
    );
  }

  return (
    <div className="inline-flex w-full justify-center border border-[var(--lr-navy-900)] bg-white">
      <button
        onClick={decrement}
        className="px-4 py-2 bg-[var(--lr-steel-100)] hover:bg-[var(--lr-orange-500)] hover:text-white font-display font-bold text-[var(--lr-navy-900)] transition-colors border-r border-[var(--lr-navy-900)]"
      >
        −
      </button>
      <span className="px-6 flex items-center font-display text-lg font-bold text-[var(--lr-navy-900)] lr-tnum">{qty}</span>
      <button
        onClick={increment}
        className="px-4 py-2 bg-[var(--lr-steel-100)] hover:bg-[var(--lr-orange-500)] hover:text-white font-display font-bold text-[var(--lr-navy-900)] transition-colors border-l border-[var(--lr-navy-900)]"
      >
        +
      </button>
    </div>
  );
}
