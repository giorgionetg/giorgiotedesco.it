import { ImageResponse } from 'next/og';

export const alt = 'Siti web per PMI e studi professionali — Giorgio Tedesco';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '72px 80px', color: '#0f172a', background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 58%, #bae6fd 100%)', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', fontSize: 30, fontWeight: 700 }}>GiorgioTedesco<span style={{ color: '#2563eb' }}>.it</span></div>
        <div style={{ display: 'flex', maxWidth: 990, fontSize: 68, fontWeight: 750, lineHeight: 1.05, letterSpacing: '-0.035em' }}>Siti web per PMI e studi professionali</div>
        <div style={{ display: 'flex', fontSize: 28, color: '#334155' }}>Offerta, contenuti, sviluppo e misurazione nello stesso progetto.</div>
      </div>
    ),
    size,
  );
}
