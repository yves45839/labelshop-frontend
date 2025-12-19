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
      className="group relative w-full sm:w-80"
      itemScope
      itemType="https://schema.org/Product"
    >
      <meta itemProp="sku" content={reference} />
      <link itemProp="url" href={whatsappLink} />
      <div
        className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-orange-500 via-pink-500 to-purple-700 opacity-60 blur-2xl transition duration-500 group-hover:opacity-80"
        aria-hidden
      />
      <div className="relative flex h-full flex-col gap-6 rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-xl transition duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
        <Link
          href={`/products/${slug}`}
          className="space-y-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          <div className="flex justify-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            <span className="rounded-full bg-slate-900/90 px-3 py-1 text-[0.65rem] font-medium tracking-[0.3em] text-white shadow-sm">
              {reference}
            </span>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-inner">
            <Image
              src={imageUrl}
              alt={name}
              width={320}
              height={240}
              className="h-40 w-full object-contain transition duration-500 group-hover:scale-105"
              itemProp="image"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_55%)]"
              aria-hidden
            />
          </div>

          <div className="space-y-2 text-center">
            <h3 className="text-lg font-bold uppercase tracking-[0.25em] text-slate-900" itemProp="name">
              {name}
            </h3>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400" itemProp="sku">
              Réf. {reference}
            </p>
            <div
              className="text-3xl font-black text-slate-900"
              itemProp="offers"
              itemScope
              itemType="https://schema.org/Offer"
            >
              <meta itemProp="priceCurrency" content="XOF" />
              <span itemProp="price">{price.toLocaleString()}</span> FCFA
            </div>
          </div>
        </Link>

        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group/whatsapp inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200/40 transition duration-300 hover:shadow-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            itemProp="potentialAction"
            itemScope
            itemType="https://schema.org/BuyAction"
          >
            <meta itemProp="target" content={whatsappLink} />
            <FaWhatsapp className="text-lg transition-transform duration-300 group-hover/whatsapp:scale-110" />
            Acheter
          </a>
          <button
            type="button"
            onClick={onAddToCart}
            className="group/cart inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm font-semibold text-orange-600 shadow-lg shadow-orange-100/40 transition duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-300/60"
            aria-label={`Ajouter ${name} au panier`}
          >
            <FaShoppingCart className="text-lg transition-transform duration-300 group-hover/cart:scale-110" />
            Ajouter au panier
          </button>
        </div>
      </div>
    </article>
  );
}
