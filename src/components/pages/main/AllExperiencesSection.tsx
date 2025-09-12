'use client';

import AllExperiencesList from '@/src/components/pages/main/AllExperiencesList';
import SortDropdown from '@/src/components/pages/main/SortDropdown';
import CategoryTags from '@/src/components/primitives/CategoryTags';
import { useActivities } from '@/src/hooks/pages/main/useActivities';
import useMainSize from '@/src/hooks/pages/main/useMainSize';
import { ActivitiesSort } from '@/src/services/pages/main/api';
import { useEffect, useState } from 'react';

export default function AllExperiencesSection() {
  const [page, setPage] = useState(1);
  const [cat, setCat] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<ActivitiesSort>('latest');
  const { size } = useMainSize();
  const {
    data: allExperiences,
    isLoading,
    isFetching,
  } = useActivities({
    page,
    size,
    category: cat,
    sort,
  });

  const handleClickCategory = (selectCategory: string) => {
    const nextCategory = cat === selectCategory ? undefined : selectCategory;
    setCat(nextCategory);
    setPage(1); // 페이지 초기화
  };

  const handleClickSort = (selectSort: ActivitiesSort) => {
    setSort(selectSort);
    setPage(1); // 페이지 초기화
  };

  useEffect(() => {
    const totalCount = allExperiences?.totalCount;
    const lastPage = totalCount && Math.ceil(totalCount / size);

    if (lastPage && size > lastPage) {
      setPage(lastPage);
    }
  }, [allExperiences, size]);

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
        isLoading={isLoading && isFetching}
        data={allExperiences}
        onPageChange={setPage}
        currentPage={page}
        itemsPerPage={size}
      />
    </section>
  );
}
