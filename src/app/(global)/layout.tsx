export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='global-layout'>
      <header>헤더</header>
      <main>{children}</main>
      <footer>푸터</footer>
    </div>
  );
}
