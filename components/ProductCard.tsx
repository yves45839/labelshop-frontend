"use client";
import Image from "next/image";
import { FaWhatsapp, FaShoppingCart } from "react-icons/fa";

interface ProductCardProps {
  imageUrl: string;
  name: string;
  reference: string;
  price: number;
  whatsappLink: string;
  onAddToCart: () => void;
}

export default function ProductCard({
  imageUrl,
  name,
  reference,
  price,
  whatsappLink,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="flex flex-col items-center w-full sm:w-72 p-4 rounded-xl shadow-md bg-white hover:scale-105 transition-transform duration-200">
      <Image
        src={imageUrl}
        alt={name}
        width={288}
        height={160}
        className="h-40 w-auto object-contain mx-auto mb-4"
      />
      <h3 className="uppercase text-orange-700 font-bold text-md text-center mb-1">
        {name}
      </h3>
      <p className="text-sm text-gray-500 text-center mb-2">{reference}</p>
      <p className="text-xl font-extrabold text-black text-center mb-4">
        {price.toLocaleString()} FCFA
      </p>
      <div className="flex flex-col sm:flex-row gap-2 mt-auto w-full">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-white text-green-500 rounded-lg px-4 py-2 w-full hover:bg-gray-100"
        >
          <FaWhatsapp className="mr-2" />
          Acheter via WhatsApp
        </a>
        <button
          onClick={onAddToCart}
          className="flex items-center justify-center bg-white text-orange-600 rounded-lg px-4 py-2 w-full hover:bg-gray-100"
        >
          <FaShoppingCart className="mr-2" />
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
