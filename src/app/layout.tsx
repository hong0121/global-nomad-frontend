import type { Metadata } from 'next';
import '@/src/styles/globals.css';
import { pretendard } from '@/src/styles/fonts';
import QueryProvider from '@/src/components/primitives/QueryProvider';
import AuthProvicder from '@/src/components/primitives/AuthProvider';

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
    <html lang='ko'>
      <body className={pretendard.className}>
        <QueryProvider>
          <AuthProvicder>{children}</AuthProvicder>
        </QueryProvider>
        <div id='portal' />
      </body>
    </html>
  );
}
