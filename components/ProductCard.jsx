"use client";
import Link from 'next/link';
import Image from 'next/image';
import { addToCart, updateCartItem, removeFromCart } from '@/lib/cart';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const whatsappLink = `https://wa.me/22588899965?text=${encodeURIComponent(
    `Bonjour, je souhaite acheter le produit : ${product.name} (Réf : ${product.default_code}).`
  )}`;

  const imageUrl = `${product.imageUrl}?t=${Date.now()}`;
  const [qty, setQty] = useState(0);

  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group bg-white flex flex-col h-full">
      {/* ✅ Lien vers la page produit */}
      <Link href={`/products/${product.slug}`} className="flex-grow flex flex-col">
        <div>
          <Image
            src={imageUrl}
            alt={product.name}
            width={400}
            height={300}
            unoptimized
            className="rounded object-contain mx-auto"
          />
        </div>
        <div className="px-4 py-3 flex-grow flex flex-col">
          <h2 className="text-orange-600 font-bold text-sm uppercase group-hover:text-orange-500 transition-colors duration-300">
            {product.name}
          </h2>
          <p className="text-gray-500 text-xs my-1">{product.default_code}</p>

          {!product.hide_price && (
            <span className="text-black font-bold text-sm mt-auto">
              {product.list_price.toLocaleString()} FCFA
            </span>
          )}
        </div>
      </Link>

      {/* ✅ Actions */}
      <div className="px-4 pb-4 mt-auto space-y-2">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-full transition w-full justify-center"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-4 h-4 mr-2"
          />
          Acheter via WhatsApp
        </a>
        {qty === 0 ? (
          <button
            onClick={async () => {
              await addToCart({
                product_id: product.id,
                quantity: 1,
                product_name: product.name,
                product_image: product.imageUrl,
              });
              setQty(1);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-4 rounded-full transition"
          >
            Ajouter au panier
          </button>
        ) : (
          <div className="inline-flex border rounded w-full justify-center">
            <button
              onClick={async () => {
                const newQty = qty - 1;
                if (newQty <= 0) {
                  await removeFromCart(product.id);
                  setQty(0);
                } else {
                  await updateCartItem({ item_id: product.id, quantity: newQty });
                  setQty(newQty);
                }
              }}
              className="px-3 bg-gray-200 rounded-l"
            >
              -
            </button>
            <span className="px-4 flex items-center">{qty}</span>
            <button
              onClick={async () => {
                const newQty = qty + 1;
                await updateCartItem({ item_id: product.id, quantity: newQty });
                setQty(newQty);
              }}
              className="px-3 bg-gray-200 rounded-r"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
