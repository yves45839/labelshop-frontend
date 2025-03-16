import Image from 'next/image';

async function getProduct(slug) {
  const res = await fetch(`https://labelshop-backend.onrender.com/products/search-products/?q=${slug}`, {
    cache: 'no-store',
  });

  const products = await res.json();

  // Correction importante ici : gestion des tableaux vides !
  if (!products || products.length === 0) return null;

  return products[0];
}

// Correction robuste dans generateMetadata
export async function generateMetadata({ params }) {
  const { slug } = params;

  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Produit introuvable",
      description: "Le produit recherché n'existe pas.",
    };
  }

  return {
    title: product.meta_title || product.name,
    description: product.meta_description,
    keywords: product.keywords,
    openGraph: {
      title: product.meta_title || product.name,
      description: product.meta_description,
      images: [{ url: product.image_1024 || '/default-product.png' }],
    },
  };
}

// Composant produit robuste
export default async function ProductDetailPage({ params }) {
  const { slug } = params;

  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Produit introuvable</h1>
        <p>Le produit demandé n'existe pas ou a été supprimé.</p>
      </div>
    );
  }

  const whatsappLink = `https://wa.me/22588899965?text=${encodeURIComponent(
    `Je suis intéressé par le produit : ${product.name} (Ref: ${product.default_code}).`
  )}`;

  return (
    <main className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <img
          src={product.image_1024 || '/default-product.png'}
          alt={product.name}
          className="w-full h-[500px] object-contain rounded-md"
        />
        <div className="mt-4">
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-gray-800 font-semibold my-2">
            Prix : {product.list_price.toLocaleString()} FCFA
          </p>
          {product.discount_price && (
            <p className="text-lg text-red-500">
              Prix Promo : {product.discount_price.toLocaleString()} FCFA
            </p>
          )}
          <p className="my-4 text-gray-700">
            {product.description && product.description !== "False"
              ? product.description
              : product.short_description || "Description indisponible pour ce produit."}
          </p>
          <p className="font-medium">
            Disponibilité :
            <span className={product.is_available ? 'text-green-600' : 'text-red-600'}>
              {product.is_available ? ' En stock' : ' Indisponible'}
            </span>
          </p>
          <div className="mt-4 flex flex-col gap-1 text-sm text-gray-700">
            <p><span className="font-semibold">Catégorie :</span> {product.categ_id}</p>
            <p>
              <span className="font-semibold">Marque :</span> {product.brand || 'Hikvision'}
            </p>
            <p className="mt-2">
              Référence : {product.default_code}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Description :</h2>
            <p>
              {product.description && product.description !== 'False'
                ? product.description
                : product.short_description || "Description bientôt disponible."}
            </p>
          </div>

          <div className="mt-6">
            <a
              href={whatsappLink}
              target="_blank"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-5 rounded-full"
            >
              Acheter via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
