'use client';

import ProductCard from '@/components/ProductCard';
import { addToCart } from '@/lib/cart';
import {
  getProductImage,
  productWhatsappLink,
  type Product,
} from '@/lib/products';

/** Grille de fiches produit avec ajout panier — utilisable depuis une page serveur. */
export default function ProductGridClient({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => {
        const imageUrl = getProductImage(product);
        const handleAdd = async () => {
          await addToCart({
            product_id: product.id,
            quantity: 1,
            product_name: product.name,
            product_image: imageUrl,
            price: product.list_price,
          });
        };
        return (
          <ProductCard
            key={product.id}
            imageUrl={imageUrl}
            name={product.name}
            reference={product.default_code || ''}
            slug={product.slug}
            price={product.list_price}
            whatsappLink={productWhatsappLink(product)}
            onAddToCart={handleAdd}
          />
        );
      })}
    </div>
  );
}
