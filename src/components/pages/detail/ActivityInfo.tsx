import { Activity } from '@/src/types/activityType';
import Image from 'next/image';
import DropdownList from './DrowdownList';
import { useEffect, useRef, useState } from 'react';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';

interface Props {
  activity: Activity;
}

export default function ActivityInfo({ activity }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickButton = () => {
    setIsOpen((pre) => !pre);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { data: currentUser, isLoading, isError, error } = useCurrentUser();

  // 디버깅용 코드
  // 현재 브라우저 저장소에 토큰 저장이 안되어 401에러 나오는 중입니다.
  useEffect(() => {
    if (isLoading) console.log('사용자 정보를 불러오는 중...');
    if (isError) {
      if ((error as any).response?.status === 401) {
        console.log('로그인이 필요합니다.');
      } else {
        console.log('사용자 정보를 불러오는 데 실패했습니다');
      }
    }
  }, [isError, isLoading, error]);

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
        {isOwner && (
          <div className='relative inline-block' ref={dropdownRef}>
            <button aria-label='더보기' onClick={handleClickButton}>
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
