'use client';

import LeftSidebar from '@/src/components/pages/myExperiences/LeftSidebar';
import { useBreakPoint } from '@/src/hooks/useBreakPoint';
import MobileLayout from './_mobileLayout';
import { useState } from 'react';
import { PageContext } from './pageContext';

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMd } = useBreakPoint();
  const [page, setPage] = useState(1);

  return (
    <PageContext.Provider value={{ page, setPage }}>
      <section className='w-full mt-24 md:my-24'>
        <div className='w-full lg:w-[980px] flex gap-12 m-auto'>
          {isMd ? (
            <>
              <LeftSidebar />
              <article className='flex-1'>{children}</article>
            </>
          ) : (
            <MobileLayout>{children}</MobileLayout>
          )}
        </div>
      </section>
    </PageContext.Provider>
  );
}
