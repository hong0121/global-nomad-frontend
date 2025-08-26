import { Activity } from '@/src/services/pages/[id]/Activity';
import Image from 'next/image';

interface Props {
  activity: Activity;
}

export default function ActivityInfo({ activity }: Props) {
  return (
    <>
      <section className='flex items-start justify-between pt-5 md:pt-6 pb-5 md:pb-6 border-b border-gray-100 lg:border-none'>
        <div className='flex flex-col'>
          <p className='text-gray-700 text-13 font-medium mb-1 md:mb-2.5 md:text-14'>
            {activity.category}
          </p>
          <h1 className='text-18 font-bold mb-4 md:text-24'>
            {activity.title}
          </h1>

          <div className='flex gap-0.5 mb-2.5'>
            <div className='relative w-4 h-4'>
              <Image src='/images/icons/StarFilled.svg' alt='체험별점' fill />
            </div>
            <span className='text-gray-700 text-14 font-medium'>
              {activity.rating}({activity.reviewCount})
            </span>
          </div>
          <div className='flex gap-0.5 lg:mb-4'>
            <div className='relative w-4 h-4'>
              <Image src='/images/icons/MapIcon.svg' alt='체험주소' fill />
            </div>
            <span className='text-gray-700 text-14 font-medium'>
              {activity.address}
            </span>
          </div>
        </div>
        <button aria-label='더보기'>
          <Image
            src='/images/icons/MoreIcon.svg'
            alt=''
            width={28}
            height={28}
          />
        </button>
      </section>
    </>
  );
}
