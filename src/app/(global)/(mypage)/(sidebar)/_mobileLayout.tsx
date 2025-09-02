'use client';

import LeftSidebar from '@/src/components/pages/myExperiences/LeftSidebar';
import { useContext } from 'react';
import { PageContext } from './pageContext';

export default function MobileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { page } = useContext(PageContext);
  return (
    <section className='w-full'>
      {page === 1 ? <LeftSidebar /> : <>{children}</>}
    </section>
  );
}
