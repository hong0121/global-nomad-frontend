'use client';

import { queries } from '@/src/services/primitives/queries';
import { useTokenStore } from '@/src/store/useTokenStore';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Dropdown from '../../primitives/Dropdown';
import LoadingSpinner from '../../primitives/LoadingSpinner';
import Image from 'next/image';
import BackBtn from '../../primitives/mypage/BackBtn';

export default function MyReservationStatusPage() {
  const [selectedExperience, setSelectedExperience] = useState<string | null>(
    null
  );
  const { accessToken } = useTokenStore();
  const { data, isPending } = useQuery(
    queries.myExperiencesOptions(accessToken)
  );

  return (
    <section className='flex flex-col items-center gap-8'>
      <div className='w-full flex flex-col gap-2 md:justify-between'>
        <div className='flex gap-4'>
          <BackBtn />
          <h1 className='text-18 font-bold'>예약 현황</h1>
        </div>
        <p className='font-14 text-gray-500'>
          내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
        </p>
      </div>
      {isPending ? (
        <LoadingSpinner />
      ) : (
        <>
          {data && data.totalCount !== 0 ? (
            <Dropdown
              label=''
              items={data.activities.map((el) => el.title)}
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e)}
            />
          ) : (
            <div className='space-y-8'>
              <Image
                src={'/images/Not_Found_Earth.png'}
                alt='찾을 수 없습니다'
                width={122}
                height={122}
                className='mx-auto'
              />
              <span className='text-18 text-gray-600'>
                아직 등록한 체험이 없어요
              </span>
            </div>
          )}
        </>
      )}
    </section>
  );
}
