import type { Metadata, ResolvingMetadata } from 'next';
import AddToCart from '@/components/AddToCart';

// 🔁 Récupère l'image
function getImageUrl(product: any): string {
  const baseUrl = 'https://labelshop-backend.onrender.com';

  if (product.image_1024?.startsWith('http')) {
    return product.image_1024;
  }

  if (product.image_1024?.startsWith('/')) {
    return `${baseUrl}${product.image_1024}`;
  }

  return '/default-product.png';
}

// 🔁 API : Récupère le produit
async function getProduct(slug: string) {
  const res = await fetch(
    `https://labelshop-backend.onrender.com/products/search-products/?q=${slug}`,
    { cache: 'no-store' }
  );

  if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) {
    return null;
  }

  const products = await res.json();
  return products?.[0] || null;
}

// ✅ SEO dynamique
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Produit introuvable',
      description: "Le produit recherché n'existe pas.",
    };
  }

  return {
    title: product.meta_title || product.name,
    description: product.meta_description,
    openGraph: {
      images: [{ url: getImageUrl(product) }],
    },
  };
}

// ✅ Page produit avec JSON-LD
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Produit introuvable</h1>
        <p>Le produit demandé n'existe pas ou a été supprimé.</p>
      </div>
    );
  }

  const imageUrl = getImageUrl(product);
  const whatsappLink = `https://wa.me/22588899965?text=${encodeURIComponent(
    `Je suis intéressé par le produit : ${product.name} (Réf : ${product.default_code})`
  )}`;

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: [imageUrl],
    description:
      product.meta_description || product.description || 'Produit Label Retail',
    sku: product.default_code,
    brand: {
      "@type": "Brand",
      name: product.brand || 'Label Retail',
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "XOF",
      price: product.list_price,
      availability: product.is_available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://labelretail.ci/products/${product.slug}`,
    },
  };

  return (
    <main className="container mx-auto py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8 border-t-4 border-blue-600">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-[400px] object-contain rounded-lg"
        />

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-orange-500">{product.name}</h1>

          {!product.hide_price && (
            <p className="text-xl font-semibold text-gray-700 my-2">
              Prix : {product.list_price.toLocaleString()} FCFA
            </p>
          )}

          <div className="mt-4 space-y-2 sm:space-y-0 sm:flex sm:space-x-2">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition w-full justify-center"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-5 h-5 mr-2"
              />
              Acheter
            </a>
            <AddToCart
              product={{
                id: product.id,
                name: product.name,
                imageUrl,
                price: product.list_price,
              }}
            />
          </div>

          <div className="mt-4 text-sm text-gray-700 space-y-1">
            <p><strong>Catégorie :</strong> {product.categ_id}</p>
            <p><strong>Marque :</strong> {product.brand || 'Hikvision'}</p>
            <p><strong>Référence :</strong> {product.default_code}</p>
          </div>

          <div className="mt-6 text-gray-800">
            <p>
              {product.description && product.description !== 'False'
                ? product.description
                : product.meta_description || 'Description bientôt disponible.'}
            </p>
          </div>
        </div>
      </div>

      {/* ✅ JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
