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
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full transition"
      >
        Ajouter au panier
      </button>
    );
  }

  return (
    <div className="inline-flex border rounded w-full justify-center">
      <button onClick={decrement} className="px-3 bg-gray-200 rounded-l">
        -
      </button>
      <span className="px-4 flex items-center">{qty}</span>
      <button onClick={increment} className="px-3 bg-gray-200 rounded-r">
        +
      </button>
    </div>
  );
}
