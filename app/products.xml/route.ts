import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
  const baseUrl = 'https://labelretail.ci';

  try {
    const res = await fetch('https://lr-samr.pythonanywhere.com/products/get-products', {
      cache: 'no-store',
    });
    const products = await res.json();

    const feedItems = products
      .filter((product: any) => product.is_online)
      .map((product: any) => {
        const image = product.image_1024?.startsWith('http')
          ? product.image_1024
          : `https://lr-samr.pythonanywhere.com${product.image_1024}`;

        const price = product.hide_price
          ? '0.00 XOF'
          : `${product.list_price.toFixed(2)} XOF`;

        return `
          <item>
            <g:id>${product.default_code || product.id}</g:id>
            <title><![CDATA[${product.name}]]></title>
            <description><![CDATA[${product.meta_description || product.description || 'Description indisponible'}]]></description>
            <link>${baseUrl}/products/${product.slug}</link>
            <g:image_link>${image}</g:image_link>
            <g:price>${price}</g:price>
            <g:availability>${product.is_available ? 'in stock' : 'out of stock'}</g:availability>
            <g:condition>new</g:condition>
          </item>
        `;
      })
      .join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Label Retail - Produits</title>
    <link>${baseUrl}</link>
    <description>Catalogue des produits Label Retail</description>
    ${feedItems}
  </channel>
</rss>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Erreur XML produit Google:', error);
    return new NextResponse('Erreur serveur', { status: 500 });
  }
}
