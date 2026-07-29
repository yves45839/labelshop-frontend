import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Label Retail — Sécurité électronique & Hikvision à Abidjan';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0b2545',
          padding: 64,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', height: 10, width: 220, backgroundColor: '#f97316' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 34,
              color: '#f97316',
              textTransform: 'uppercase',
              letterSpacing: 6,
            }}
          >
            Intégrateur Hikvision · Côte d'Ivoire
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 84,
              fontWeight: 700,
              color: '#ffffff',
              textTransform: 'uppercase',
              lineHeight: 1.05,
            }}
          >
            Label Retail
          </div>
          <div style={{ marginTop: 20, fontSize: 36, color: 'rgba(255,255,255,0.75)' }}>
            Sécurité électronique · Gestion du temps · Formation
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'rgba(255,255,255,0.6)',
            fontSize: 28,
          }}
        >
          <div>labelretail.ci</div>
          <div style={{ display: 'flex', height: 10, width: 220, backgroundColor: '#f97316' }} />
        </div>
      </div>
    ),
    size
  );
}
