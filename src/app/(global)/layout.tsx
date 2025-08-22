import Footer from "@/app/(global)/_components/Footer";
import Header from "@/app/(global)/_components/Header/Header";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
