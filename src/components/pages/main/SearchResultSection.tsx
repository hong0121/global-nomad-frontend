'use client';
import AllExperiencesList from '@/src/components/pages/main/AllExperiencesList';
import { useActivities } from '@/src/hooks/useActivities';
import { useBreakPoint } from '@/src/hooks/useBreakPoint';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const MAX_SIZE = {
  mo: 6,
  tb: 4,
  pc: 8,
};

export default function SearchResultSection() {
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search');
  const { isMd, isLg } = useBreakPoint();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(MAX_SIZE['mo']);

  const { data: resultList, isLoading } = useActivities({
    page,
    size,
    sort: 'latest',
    keyword: currentSearch!,
  });

  useEffect(() => {
    if (isLg && isMd) setSize(MAX_SIZE['pc']);
    else if (isMd && !isLg) setSize(MAX_SIZE['tb']);
    else setSize(MAX_SIZE['mo']);

    // 마지막 페이지네이션에서 pagePerView 가 변경되었을 때 페이지의 데이터가 빈값이면 이전 페이지네이션을 보여주도록 처리
    // 조금 불안정. 다시 테스트 필요
    if (resultList?.activities.length === 0) {
      setPage((prev) => prev - 1);
    }
  }, [isMd, isLg, resultList]);

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
