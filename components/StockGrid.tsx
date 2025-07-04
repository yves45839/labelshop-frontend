'use client';
import Image from 'next/image';

export type StockProduct = {
  id: number;
  name: string;
  price?: number;
  image?: string;
  reference?: string;
  quantity: number;
};

export default function StockGrid({
  products,
  onUpdate,
}: {
  products: StockProduct[];
  onUpdate?: (product: StockProduct, qty: number) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((p) => (
        <div key={p.id} className="border rounded-lg p-4 bg-white flex flex-col">
          {p.image && (
            <Image
              src={p.image}
              alt={p.name}
              width={300}
              height={200}
              className="object-contain mb-2"
            />
          )}
          <h3 className="font-semibold">{p.name}</h3>
          {p.reference && <p className="text-sm text-gray-500">{p.reference}</p>}
          {p.price != null && (
            <p className="mt-auto font-bold">{p.price.toLocaleString()} FCFA</p>
          )}
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm">Stock: {p.quantity}</span>
            {onUpdate && (
              <div className="space-x-1">
                <button
                  onClick={() => onUpdate(p, p.quantity + 1)}
                  className="px-2 bg-gray-200 rounded-l"
                >
                  +
                </button>
                <button
                  onClick={() => onUpdate(p, Math.max(0, p.quantity - 1))}
                  className="px-2 bg-gray-200 rounded-r"
                >
                  -
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
