import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/cormorant-garamond/700-italic.css';
import '@fontsource/noto-serif-kr/latin-500.css';
import '@fontsource/noto-serif-kr/korean-500.css';
import '@fontsource/noto-serif-kr/latin-600.css';
import '@fontsource/noto-serif-kr/korean-600.css';
import '@fontsource/noto-serif-kr/latin-700.css';
import '@fontsource/noto-serif-kr/korean-700.css';
import '@fontsource/noto-serif-kr/latin-900.css';
import '@fontsource/noto-serif-kr/korean-900.css';
import '@fontsource/pretendard/400.css';
import '@fontsource/pretendard/500.css';
import '@fontsource/pretendard/600.css';
import '@fontsource/pretendard/700.css';
import '@fontsource/pretendard/800.css';
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
      <body className="flex flex-col min-h-screen bg-fd-background text-fd-foreground antialiased selection:bg-brand-primary selection:text-text-inverse">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
