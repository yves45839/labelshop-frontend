import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
  const baseUrl = 'https://labelretail.ci';

  try {
    const res = await fetch('https://lr-samr.pythonanywhere.com/products/get-products', {
      cache: 'no-store',
    });
    const products = await res.json();

    const urls = products
      .filter((product: any) => product.is_online)
      .map((product: any) => {
        const baseUrl = 'https://labelretail.ci';
        const date = product.updated_at || product.created_at;
        const lastmod = date && !isNaN(Date.parse(date))
          ? new Date(date).toISOString()
          : new Date().toISOString();

        const imageUrl = product.image_1024?.startsWith('http')
          ? product.image_1024
          : `https://lr-samr.pythonanywhere.com${product.image_1024}`;

        return `
          <url>
            <loc>${baseUrl}/products/${product.slug}</loc>
            <lastmod>${lastmod}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
            ${imageUrl ? `
            <image:image xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
              <image:loc>${imageUrl}</image:loc>
              <image:caption>${product.name}</image:caption>
            </image:image>` : ''}
          </url>
        `;
      })
      .join('');


    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${urls}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Erreur génération sitemap :', error);
    return new NextResponse(null, { status: 500 });
  }
}
