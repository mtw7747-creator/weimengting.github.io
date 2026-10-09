import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { ScrollManager } from '@/components/scroll-manager';
import { siteUrl } from '@/lib/site';
import './globals.css';
import './portfolio-v10.css';
import './portfolio-v11.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '卫梦亭｜AI 产品内容运营',
    template: '%s｜卫梦亭',
  },
  description: 'AI 产品内容运营作品集：Product Communication、AI Workflow 与 0–1 Building。',
  keywords: ['AI 产品内容运营', 'Product Communication', 'AI Workflow', '内容运营', '北京'],
  authors: [{ name: '卫梦亭' }],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    title: '卫梦亭｜AI 产品内容运营',
    description: '连接产品理解、内容表达与流程落地的 AI 产品内容运营作品集。',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '卫梦亭｜AI 产品内容运营',
    description: '连接产品理解、内容表达与流程落地的 AI 产品内容运营作品集。',
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body className="antialiased">
        <ScrollManager />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
