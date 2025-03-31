import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  const whatsappLink = `https://wa.me/22588899965?text=${encodeURIComponent(
    `Bonjour, je souhaite connaître le prix du produit : ${product.name} (Réf : ${product.default_code}).`
  )}`;

  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group bg-white">
      <Link href={`/products/${product.slug}`}>
        <div>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={300}
            unoptimized
            className="rounded object-contain mx-auto"
          />
        </div>
        <div className="px-4 py-3">
          <h2 className="text-orange-600 font-bold text-sm uppercase group-hover:text-orange-500 transition-colors duration-300">
            {product.name}
          </h2>
          <p className="text-gray-500 text-xs my-1">{product.default_code}</p>

          {!product.hide_price && (
            <span className="text-black font-bold text-sm">
              {product.list_price.toLocaleString()} FCFA
            </span>
          )}
        </div>
      </Link>

      {/* ✅ Lien WhatsApp séparé du <Link> principal */}
      {product.hide_price && (
        <div className="px-4 pb-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-full transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              className="w-4 h-4 mr-2"
            />
            Demander le prix
          </a>
        </div>
      )}
    </div>
  );
}
