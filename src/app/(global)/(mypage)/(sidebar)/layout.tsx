export default function MypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='mypage-layout'>
      <aside>사이드바</aside>
      <section>{children}</section>
    </div>
  );
}
