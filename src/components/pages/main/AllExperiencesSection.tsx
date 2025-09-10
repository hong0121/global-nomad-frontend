'use client';

import AllExperiencesList from '@/src/components/pages/main/AllExperiencesList';
import SortDropdown from '@/src/components/pages/main/SortDropdown';
import CategoryTags from '@/src/components/primitives/CategoryTags';
import { useActivities } from '@/src/hooks/useActivities';
import { useBreakPoint } from '@/src/hooks/useBreakPoint';
import { ActivitiesSort } from '@/src/services/pages/main/api';
import { useEffect, useState } from 'react';

const MAX_SIZE = {
  mo: 6,
  tb: 4,
  pc: 8,
};

export default function AllExperiencesSection() {
  const { isMd, isLg } = useBreakPoint();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(MAX_SIZE['mo']);
  const [cat, setCat] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<ActivitiesSort>('latest');

  const handleClickCategory = (selectCategory: string) => {
    const nextCategory = cat === selectCategory ? undefined : selectCategory;
    setCat(nextCategory);
    setPage(1); // 페이지 초기화
  };

  const handleClickSort = (selectSort: ActivitiesSort) => {
    setSort(selectSort);
    setPage(1); // 페이지 초기화
  };

  const { data: allExperiences, isLoading } = useActivities({
    page,
    size,
    category: cat,
    sort,
  });

  useEffect(() => {
    if (isLg && isMd) setSize(MAX_SIZE['pc']);
    else if (isMd && !isLg) setSize(MAX_SIZE['tb']);
    else setSize(MAX_SIZE['mo']);
  }, [isMd, isLg]);

  return (
    <section className='mt-[25px] md:mt-[65px]'>
      <div className='flex justify-between items-center flex-wrap gap-[10px] md:gap-4 lg:gap-5'>
        <h2 className='text-18 font-bold md:text-32 lg:w-full'>🛼 모든 체험</h2>
        <div className='lg:order-3'>
          <SortDropdown currentSort={sort} onClick={handleClickSort} />
        </div>
        <div className='w-full shrink-0 lg:shrink-1 lg:w-auto'>
          <CategoryTags
            currentCat={cat}
            onSelectCategory={handleClickCategory}
          />
        </div>
      </div>
      <AllExperiencesList
        isLoading={isLoading}
        data={allExperiences}
        onPageChange={setPage}
        currentPage={page}
        itemsPerPage={size}
      />
    </section>
  );
}
