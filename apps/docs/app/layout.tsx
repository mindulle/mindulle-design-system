import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';

export const metadata = {
  title: {
    template: '%s | 민들레 디자인 시스템 (MDS)',
    default: '민들레 디자인 시스템 (MDS) — 공식 문서',
  },
  description: '겨울 끝, 민들레. Mindulle Design System v0.1.0 공식 실무 컴포넌트 및 토큰 문서',
  icons: [{ rel: 'icon', url: '/favicon.svg' }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,700&family=Noto+Serif+KR:wght@500;600;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
        <link
          rel="stylesheet"
          href="https://hangeul.pstatic.net/hangeul_style/css/maru-buri.css"
        />
      </head>
      <body className="flex flex-col min-h-screen bg-fd-background text-fd-foreground antialiased selection:bg-amber-400 selection:text-black">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
