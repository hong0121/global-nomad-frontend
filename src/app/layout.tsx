import type { Metadata } from 'next';
import '@/src/styles/globals.css';
import { pretendard } from '@/src/styles/fonts';
import QueryProvider from '@/src/components/primitives/QueryProvider';
import AuthProvicder from '@/src/components/primitives/AuthProvider';
import { Suspense } from 'react';
import LoadingSpinner from '@/src/components/primitives/LoadingSpinner';

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
          <AuthProvicder>
            <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
          </AuthProvicder>
        </QueryProvider>
        <div id='portal' />
      </body>
    </html>
  );
}
