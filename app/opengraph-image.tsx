import { ImageResponse } from 'next/og';

export const alt = '卫梦亭｜内容增长 × AI 运营';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F4F2ED',
          color: '#11110F',
          padding: '52px 60px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #11110F', paddingBottom: 22, fontSize: 22 }}>
          <span style={{ color: '#8C1D24', fontWeight: 800 }}>WM.</span>
          <span>WEI MENGTING · BEIJING</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 92, fontWeight: 800, lineHeight: 0.94, letterSpacing: '-5px' }}>
          <span>CONTENT GROWTH</span>
          <span style={{ color: '#8C1D24' }}>× AI OPERATIONS</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #11110F', paddingTop: 20, fontSize: 22 }}>
          <span>内容策略 / 新媒体增长 / 商业转化 / AI内容体系</span>
          <span>PORTFOLIO 2026</span>
        </div>
      </div>
    ),
    size,
  );
}
