import Image from 'next/image';
import DropdownList from './DrowdownList';
import { useDropdown } from '@/src/hooks/pages/detail/useDropdown';
import useCurrentUser from '@/src/hooks/useCurrentUser';
import { Activity } from '@/src/types/activityType';

interface Props {
  activity: Activity;
}

export default function ActivityInfo({ activity }: Props) {
  const { isOpen, toggleDropdown, dropdownRef } = useDropdown();
  const currentUser = useCurrentUser();

  // 유저가 만든 체험 여부 확인
  const isOwner = currentUser?.id === activity.userId;

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
              {activity.rating.toFixed(1)} (
              {activity.reviewCount.toLocaleString()})
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
        {isOwner && (
          <div className='relative inline-block' ref={dropdownRef}>
            <button aria-label='더보기' onClick={toggleDropdown}>
              <Image
                src='/images/icons/MoreIcon.svg'
                alt=''
                width={28}
                height={28}
              />
            </button>

            {isOpen && (
              <div className='absolute right-7 top-0 z-10'>
                <DropdownList activityId={activity.id} />
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}
