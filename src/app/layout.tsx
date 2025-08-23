import type { Metadata } from 'next';
import '../styles/globals.css';
import { pretendard } from '../styles/fonts';

export const metadata: Metadata = {
  title: 'Global Nomad',
  description: 'Global Nomad Project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
