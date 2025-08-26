import Footer from '@/src/components/primitives/global/Footer';
import Header from '@/src/components/primitives/global/Header/Header';

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
}
