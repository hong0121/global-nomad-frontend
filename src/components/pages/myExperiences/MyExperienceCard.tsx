'use client';

import { IActivity } from '@/src/types/scheduleType';
import StarIcon from '@/public/images/icons/StarFilled.svg';
import ExperienceButton from './ExperienceButton';
import Link from 'next/link';

export default function MyExperienceCard({
  data,
  callbackId,
  setIsModalVisible,
}: {
  data: IActivity;
  callbackId: (id: number) => void;
  setIsModalVisible: (state: boolean) => void;
}) {
  return (
    <div className='w-full p-6 flex justify-between rounded-3xl shadow'>
      <div className='flex flex-col gap-2.5 lg:gap-3'>
        <h1 className='text-16 lg:text-18 font-bold'>{data.title}</h1>
        <div className='flex gap-0.5'>
          <StarIcon className='w-3.5 h-3.5 lg:w-4 lg:h-4' />
          <span className='text-13 lg:text-16 text-gray-500'>
            {data.rating}
          </span>
          <span className='text-13 lg:text-16 text-gray-500'>
            ({data.reviewCount})
          </span>
        </div>
        <h2 className='text-16 lg:text-18 font-bold'>
          &#8361; {data.price.toLocaleString()} <span>&#47; 인</span>
        </h2>
        <div className='flex gap-2'>
          <Link href={`/myUpdateExperiences/${data.id}`}>
            <ExperienceButton size='sm' variant='outline'>
              수정하기
            </ExperienceButton>
          </Link>
          <ExperienceButton
            size='sm'
            variant='outline'
            alert={true}
            onClick={() => {
              callbackId(data.id);
              setIsModalVisible(true);
            }}
          >
            삭제하기
          </ExperienceButton>
        </div>
      </div>
      <img
        src={data.bannerImageUrl}
        alt='행사 이미지 URL'
        className='h-[82px] lg:h-[142px] aspect-square rounded-3xl object-cover'
      />
    </div>
  );
}
