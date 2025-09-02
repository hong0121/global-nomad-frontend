'use client';

import Image from 'next/image';
import DefaultImgIcon from '@/public/images/Default_Profile.png';
import EditIcon from '@/public/images/icons/EditIcon.svg';
import UserIcon from '@/public/images/icons/UserIcon.svg';
import ListIcon from '@/public/images/icons/ListIcon.svg';
import SettingIcon from '@/public/images/icons/SettingIcon.svg';
import CalendarIcon from '@/public/images/icons/CalendarIcon.svg';
import Link from 'next/link';
import { cn } from '@/src/utils/cn';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { PageContext } from '@/src/app/(global)/(mypage)/(sidebar)/pageContext';

export default function LeftSidebar() {
  const pathname = usePathname();
  const { setPage } = useContext(PageContext);

  return (
    <aside className='shadow w-[290px] h-fit px-3.5 py-6 m-auto flex flex-col items-center rounded-2xl'>
      <div className='relative'>
        <Image src={DefaultImgIcon} alt='기본 아바타' />
        <button className='absolute bottom-0 right-0 w-[30px] h-[30px] rounded-full bg-gray-300'>
          <EditIcon className='m-auto fill-white' />
        </button>
      </div>
      <ul className='w-full mt-6'>
        <li onClick={() => setPage && setPage(2)}>
          <Link
            href={'/myInfo'}
            className={cn(
              'w-full h-[54px] flex gap-2 items-center py-3 pl-5 text-gray-600 rounded-2xl transition-colors hover:bg-primary-100',
              pathname === '/myInfo' && 'text-gray-950 bg-primary-100'
            )}
          >
            <UserIcon
              className={cn(
                'fill-gray-600',
                pathname === '/myInfo' && 'fill-primary-500'
              )}
            />
            내 정보
          </Link>
        </li>
        <li onClick={() => setPage && setPage(2)}>
          <Link
            href={'/myReservation'}
            className={cn(
              'w-full h-[54px] flex gap-2 items-center py-3 pl-5 text-gray-600 rounded-2xl transition-colors hover:bg-primary-100',
              pathname === '/myReservation' && 'text-gray-950 bg-primary-100'
            )}
          >
            <ListIcon
              className={cn(
                'fill-gray-600',
                pathname === '/myReservation' && 'fill-primary-500'
              )}
            />
            예약 내역
          </Link>
        </li>
        <li onClick={() => setPage && setPage(2)}>
          <Link
            href={'/myExperiences'}
            className={cn(
              'w-full h-[54px] flex gap-2 items-center py-3 pl-5 text-gray-600 rounded-2xl transition-colors hover:bg-primary-100',
              pathname === '/myExperiences' && 'text-gray-950 bg-primary-100'
            )}
          >
            <SettingIcon
              className={cn(
                'fill-gray-600',
                pathname === '/myExperiences' && 'fill-primary-500'
              )}
            />
            내 체험 관리
          </Link>
        </li>
        <li onClick={() => setPage && setPage(2)}>
          <Link
            href={'/myReservationStatus'}
            className={cn(
              'w-full h-[54px] flex gap-2 items-center py-3 pl-5 text-gray-600 rounded-2xl transition-colors hover:bg-primary-100',
              pathname === '/myReservationStatus' &&
                'text-gray-950 bg-primary-100'
            )}
          >
            <CalendarIcon
              className={cn(
                'fill-gray-600',
                pathname === '/myReservationStatus' && 'fill-primary-500'
              )}
            />
            예약 현황
          </Link>
        </li>
      </ul>
    </aside>
  );
}
