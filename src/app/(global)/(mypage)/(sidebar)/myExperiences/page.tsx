'use client';

import MyExperienceCard from '@/src/components/pages/myExperiences/MyExperienceCard';
import Button from '@/src/components/primitives/Button';
import LoadingSpinner from '@/src/components/primitives/LoadingSpinner';
import { getMyExperiences } from '@/src/services/pages/myExperiences/api';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import BackIcon from '@/public/images/icons/BackIcon.svg';
import { useContext } from 'react';
import { PageContext } from '../pageContext';

export default function MyExperiencesPage() {
  const { data, isPending } = useQuery({
    queryKey: ['myExperiences'],
    queryFn: getMyExperiences,
  });

  const { setPage } = useContext(PageContext);

  return (
    <section className='flex flex-col items-center gap-8 p-4 md:p-0'>
      <div className='w-full flex flex-col md:flex-row gap-4 md:justify-between'>
        <div className='flex gap-4 items-center'>
          <button onClick={() => setPage(1)} className='block md:hidden'>
            <BackIcon />
          </button>
          <div className='space-y-2.5'>
            <h1 className='text-18 font-bold'>내 체험 관리</h1>
            <p className='font-14 text-gray-500'>
              체험을 등록하거나 수정 및 삭제가 가능합니다.
            </p>
          </div>
        </div>
        <Button size='lg'>체험 등록하기</Button>
      </div>
      {!isPending ? (
        <>
          {data && data.totalCount !== 0 ? (
            <>
              {data.activities.map((activity) => (
                <MyExperienceCard data={activity} key={activity.id} />
              ))}
            </>
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
      ) : (
        <LoadingSpinner />
      )}
    </section>
  );
}
