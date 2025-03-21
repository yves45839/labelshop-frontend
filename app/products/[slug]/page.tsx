import Image from 'next/image';
import type { Metadata, ResolvingMetadata } from 'next';

// Fonction pour récupérer le produit
async function getProduct(slug: string) {
  const res = await fetch(`https://labelshop-backend.onrender.com/products/search-products/?q=${slug}`, {
    cache: 'no-store',
  });

  const products = await res.json();
  return products?.[0] || null;
}

// ✅ SEO dynamique avec typage correct
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Produit introuvable',
      description: 'Le produit recherché n\'existe pas.',
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

// ✅ Composant principal avec params typé comme Promise
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

  const whatsappLink = `https://wa.me/22588899965?text=${encodeURIComponent(
    `Je suis intéressé par le produit : ${product.name} (Ref: ${product.default_code}).`
  )}`;

  return (
    <main className="container mx-auto py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8 border-t-4 border-blue-600">
        <img
          src={product.image_1024 || '/default-product.png'}
          alt={product.name}
          className="w-full h-[400px] object-contain rounded-lg"
        />

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-orange-500">{product.name}</h1>
          <p className="text-xl font-semibold text-gray-700 my-2">
            Prix : {product.list_price.toLocaleString()} FCFA
          </p>

          {product.discount_price && (
            <p className="text-lg text-red-500">
              Prix Promo : {product.discount_price.toLocaleString()} FCFA
            </p>
          )}

          <p className="font-medium mt-2">
            Disponibilité :
            <span className={product.is_available ? 'text-green-600' : 'text-red-600'}>
              {product.is_available ? ' En stock' : ' Indisponible'}
            </span>
          </p>

          <div className="mt-4 text-gray-700">
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

          <div className="mt-8">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full transition-colors"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-6 h-6 mr-2"
              />
              Acheter via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
