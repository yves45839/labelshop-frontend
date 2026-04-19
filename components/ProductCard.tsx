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
      <div className="relative flex h-full flex-col gap-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <Link
          href={`/products/${slug}`}
          className="space-y-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          <div className="flex justify-center">
            <span className="rounded-full bg-neutral-900 px-3 py-1 text-[0.65rem] font-medium tracking-widest text-white shadow-sm">
              {reference}
            </span>
          </div>

          <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-neutral-50 p-6">
            <Image
              src={imageUrl}
              alt={name}
              width={320}
              height={240}
              className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
              itemProp="image"
            />
          </div>

          <div className="space-y-2 text-center">
            <h3 className="text-lg font-bold text-neutral-900" itemProp="name">
              {name}
            </h3>
            <p className="text-xs font-medium uppercase tracking-widest text-neutral-500" itemProp="sku">
              Réf. {reference}
            </p>
            <div
              className="text-2xl font-bold text-neutral-900"
              itemProp="offers"
              itemScope
              itemType="https://schema.org/Offer"
            >
              <meta itemProp="priceCurrency" content="XOF" />
              <span itemProp="price">{price.toLocaleString()}</span> <span className="text-sm font-medium">FCFA</span>
            </div>
          </div>
        </Link>

        <div className="mt-auto grid gap-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group/whatsapp inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            itemProp="potentialAction"
            itemScope
            itemType="https://schema.org/BuyAction"
          >
            <meta itemProp="target" content={whatsappLink} />
            <FaWhatsapp className="text-lg transition-transform duration-300 group-hover/whatsapp:scale-110" />
            Commander via WhatsApp
          </a>
          <button
            type="button"
            onClick={onAddToCart}
            className="group/cart inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-700 transition duration-300 hover:bg-neutral-50 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
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
