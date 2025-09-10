'use client';
import AllExperiencesList from '@/src/components/pages/main/AllExperiencesList';
import { useActivities } from '@/src/hooks/pages/main/useActivities';
import useMainSize from '@/src/hooks/pages/main/useMainSize';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchResultSection() {
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search');
  const [page, setPage] = useState(1);
  const { size } = useMainSize();
  const { data: resultList, isLoading } = useActivities({
    page,
    size,
    sort: 'latest',
    keyword: currentSearch!,
  });

  useEffect(() => {
    const totalCount = resultList?.totalCount;
    const lastPage = totalCount && Math.ceil(totalCount / size);

    if (lastPage && size > lastPage) {
      setPage(lastPage);
    }
  }, [size, resultList]);

  useEffect(() => {
    // 검색값이 변경되면, 페이지네이션 초기화
    setPage(1);
  }, [currentSearch]);

  return (
    <section className='mt-[46px] md:mt-[72px] lg:mt-[92px]'>
      <h2 className='text-18 font-medium md:text-24'>
        <strong>{currentSearch}</strong>으로 검색한 결과입니다.
      </h2>
      <span className='block mt-[10px] text-14 text-gray-700 md:text-18'>
        총 {resultList?.totalCount}개의 결과
      </span>

      <AllExperiencesList
        isLoading={isLoading}
        data={resultList}
        onPageChange={setPage}
        currentPage={page}
        itemsPerPage={size}
      />
    </section>
  );
}
