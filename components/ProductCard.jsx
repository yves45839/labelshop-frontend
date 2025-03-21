// components/ProductCard.jsx
import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
        <div className="bg-white">
          <img
            src={product.image_512 || '/default-product.png'}
            alt={product.name}
            className="w-full h-48 object-contain p-4 transform group-hover:scale-110 transition-transform duration-300"
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
