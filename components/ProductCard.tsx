"use client";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaShoppingCart } from "react-icons/fa";

interface ProductCardProps {
  imageUrl: string;
  name: string;
  reference: string;
  slug: string;
  price: number;
  whatsappLink: string;
  onAddToCart: () => void;
}

export default function ProductCard({
  imageUrl,
  name,
  reference,
  slug,
  price,
  whatsappLink,
  onAddToCart,
}: ProductCardProps) {
  return (
    <article
      className="group relative w-full sm:w-80 bg-white border border-[var(--lr-border)] hover:border-[var(--lr-navy-800)] transition-all duration-200 hover:shadow-[0_12px_32px_-16px_rgba(11,37,69,0.4)]"
      itemScope
      itemType="https://schema.org/Product"
    >
      <meta itemProp="sku" content={reference} />
      <link itemProp="url" href={`/products/${slug}`} />

      {/* Header technique : référence + statut */}
      <div className="flex items-center justify-between border-b border-[var(--lr-border)] bg-[var(--lr-steel-50)] px-4 py-2">
        <span className="lr-mono text-[10px] font-semibold tracking-wider text-[var(--lr-navy-800)]">
          REF · {reference}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 bg-emerald-500" />
          <span className="lr-eyebrow text-emerald-700">Stock</span>
        </span>
      </div>

      <Link
        href={`/products/${slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lr-orange-500)] focus-visible:ring-offset-2"
      >
        {/* Visuel produit sur fond blueprint */}
        <div className="relative bg-white p-6 lr-blueprint border-b border-[var(--lr-border)]">
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[var(--lr-orange-500)]" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[var(--lr-orange-500)]" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[var(--lr-orange-500)]" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[var(--lr-orange-500)]" />
          <Image
            src={imageUrl}
            alt={name}
            width={320}
            height={240}
            className="h-44 w-full object-contain transition duration-300 group-hover:scale-105"
            itemProp="image"
          />
        </div>

        {/* Bloc info */}
        <div className="px-4 py-4 space-y-2">
          <h3
            className="font-display text-lg font-semibold uppercase tracking-wide leading-tight text-[var(--lr-navy-900)] line-clamp-2 min-h-[2.6rem]"
            itemProp="name"
          >
            {name}
          </h3>
          <div className="flex items-baseline justify-between border-t border-dashed border-[var(--lr-border)] pt-2">
            <span className="lr-eyebrow text-[var(--lr-steel-500)]">Prix HT</span>
            <div
              className="font-display text-2xl font-bold text-[var(--lr-navy-900)] lr-tnum"
              itemProp="offers"
              itemScope
              itemType="https://schema.org/Offer"
            >
              <meta itemProp="priceCurrency" content="XOF" />
              <span itemProp="price">{price.toLocaleString()}</span>
              <span className="text-xs font-normal text-[var(--lr-steel-500)] ml-1.5 tracking-wider">FCFA</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Actions */}
      <div className="grid grid-cols-2 border-t border-[var(--lr-border)]">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-emerald-600 px-3 py-3 font-display text-xs font-semibold uppercase tracking-widest text-white hover:bg-emerald-700 transition-colors border-r border-emerald-700"
        >
          <FaWhatsapp className="text-base" />
          Acheter
        </a>
        <button
          type="button"
          onClick={onAddToCart}
          className="flex items-center justify-center gap-2 bg-[var(--lr-navy-900)] px-3 py-3 font-display text-xs font-semibold uppercase tracking-widest text-white hover:bg-[var(--lr-orange-600)] transition-colors"
          aria-label={`Ajouter ${name} au panier`}
        >
          <FaShoppingCart className="text-base" />
          Ajouter au panier
        </button>
      </div>
    </article>
  );
}
