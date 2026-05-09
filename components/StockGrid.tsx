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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((p) => (
        <div key={p.id} className="border border-[var(--lr-border)] bg-white flex flex-col hover:border-[var(--lr-navy-800)] transition-colors">
          {p.reference && (
            <div className="flex items-center justify-between border-b border-[var(--lr-border)] bg-[var(--lr-steel-50)] px-3 py-2">
              <span className="lr-mono text-[10px] font-semibold tracking-wider text-[var(--lr-navy-800)]">REF · {p.reference}</span>
              <span className="lr-mono text-[10px] text-[var(--lr-steel-500)] lr-tnum">QTY {p.quantity}</span>
            </div>
          )}
          {p.image && (
            <div className="lr-blueprint border-b border-[var(--lr-border)] p-3">
              <Image src={p.image} alt={p.name} width={300} height={200} className="object-contain h-32 w-full" />
            </div>
          )}
          <div className="p-3 flex-1 flex flex-col">
            <h3 className="font-display font-semibold uppercase tracking-wide text-[var(--lr-navy-900)] text-sm leading-tight line-clamp-2">{p.name}</h3>
            {p.price != null && (
              <p className="mt-2 font-display text-xl font-bold text-[var(--lr-navy-900)] lr-tnum">{p.price.toLocaleString()} <span className="text-xs text-[var(--lr-steel-500)]">FCFA</span></p>
            )}
            <div className="mt-3 pt-3 border-t border-dashed border-[var(--lr-border)] flex items-center justify-between">
              <span className="lr-eyebrow text-[var(--lr-steel-500)]">Stock</span>
              {onUpdate && (
                <div className="inline-flex border border-[var(--lr-navy-900)]">
                  <button onClick={() => onUpdate(p, Math.max(0, p.quantity - 1))} className="px-2 py-0.5 bg-[var(--lr-steel-100)] hover:bg-[var(--lr-orange-500)] hover:text-white font-display font-bold transition-colors border-r border-[var(--lr-navy-900)]">−</button>
                  <span className="px-3 flex items-center font-display font-bold text-[var(--lr-navy-900)] lr-tnum text-sm">{p.quantity}</span>
                  <button onClick={() => onUpdate(p, p.quantity + 1)} className="px-2 py-0.5 bg-[var(--lr-steel-100)] hover:bg-[var(--lr-orange-500)] hover:text-white font-display font-bold transition-colors border-l border-[var(--lr-navy-900)]">+</button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
