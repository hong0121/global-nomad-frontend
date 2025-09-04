'use client';

import MyReservationFilter from '@/src/components/pages/myReservation/MyReservationFilter';
import MyReservationList from '@/src/components/pages/myReservation/MyReservationList';
import LoadingSpinner from '@/src/components/primitives/LoadingSpinner';
import { getMyReservationList } from '@/src/services/pages/myReservation/api';
import { ReservationStatus } from '@/src/types/myReservationType';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function MyReservationListArea() {
  const [status, setStatus] = useState<ReservationStatus | null>(null);

  const {
    isLoading,
    data: myReservationList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['myReservationList', status],
    queryFn: ({ pageParam }) => getMyReservationList({ pageParam, status }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });

  const pagesData = myReservationList?.pages ?? [];

  if (isLoading)
    return (
      <div className='flex justify-center items-center h-[50vh]'>
        <LoadingSpinner />
      </div>
    );

  return (
    <>
      <MyReservationFilter status={status} onChange={setStatus} />
      <MyReservationList
        pagesData={pagesData}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </>
  );
}
