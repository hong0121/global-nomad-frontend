'use client';

import AllExperiencesList from '@/src/components/pages/main/AllExperiencesList';
import SortDropdown from '@/src/components/pages/main/SortDropdown';
import CategoryTags from '@/src/components/primitives/CategoryTags';
import { useState } from 'react';

export default function AllExperiencesSection() {
  const [cat, setCat] = useState<string | null>(null);
  const handleClick = (selectCategory: string) => {
    const nextCategory = cat === selectCategory ? '전체' : selectCategory;
    setCat(nextCategory);
  };

  return (
    <section className='mt-[25px] md:mt-[65px]'>
      <div className='flex justify-between items-center flex-wrap gap-[10px] md:gap-4 lg:gap-5'>
        <h2 className='text-18 font-bold md:text-32 lg:w-full'>🛼 모든 체험</h2>
        <div className='lg:order-3'>
          <SortDropdown />
        </div>
        <div className='w-full shrink-0 lg:shrink-1 lg:w-auto'>
          <CategoryTags cat={cat} onSelectCategory={handleClick} />
        </div>
      </div>
      <AllExperiencesList />
    </section>
  );
}
