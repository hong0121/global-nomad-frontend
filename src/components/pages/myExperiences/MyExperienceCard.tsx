'use client';

import { IActivity } from '@/src/types/scheduleType';
import Button from '../../primitives/Button';
import StarIcon from '@/public/images/icons/StarFilled.svg';

export default function MyExperienceCard({ data }: { data: IActivity }) {
  return (
    <div className='p-6 flex justify-between rounded-3xl shadow'>
      <div className='flex flex-col gap-2.5 lg:gap-3'>
        <h1 className='text-16 lg:text-18 font-bold'>{data.title}</h1>
        <div className='flex gap-0.5'>
          <StarIcon width='14' height='14' className='block lg:hidden' />
          <StarIcon width='16' height='16' className='hidden lg:block' />
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
          <Button size='sm' variant='primary'>
            수정하기
          </Button>
        </div>
      </div>
      <img
        src={data.subImages[0].imageUrl}
        alt='행사 이미지 URL'
        className='h-[82px] lg:h-[142px] aspect-square rounded-3xl object-cover'
      />
    </div>
  );
}
