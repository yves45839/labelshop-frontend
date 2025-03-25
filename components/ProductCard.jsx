// components/ProductCard.jsx
import Link from 'next/link';
import Image from 'next/image';


export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
        <div className="bg-white">
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
          <span className="text-black font-bold text-sm">
            {product.list_price.toLocaleString()} CFA
          </span>
        </div>
      </div>
    </Link>
  );
}
