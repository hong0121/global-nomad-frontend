'use client';

import ActivityDetail from '@/src/components/pages/detail/ActivityDetail';
import ActivityImage from '@/src/components/pages/detail/ActivityImage';
import ActivityInfo from '@/src/components/pages/detail/ActivityInfo';
import { useBreakPoint } from '@/src/hooks/useBreakPoint';
import { Activity } from '@/src/types/activityType';
import { ReviewResponse } from '@/src/types/reviewType';
import ReservationUI from './ReservationUI';
import PopupWrapper from '../../primitives/popup/PopupWrapper';
import ActivityFooter from './ActivityFooter';
import { useEffect, useState } from 'react';
import ResponsiveReservationUI from './ResponsiveReservationUI';

interface Props {
  activity: Activity;
  reviewData: ReviewResponse;
}

export default function ResponsiveLayout({ activity, reviewData }: Props) {
  const { isLg } = useBreakPoint();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow =
      isPopupVisible && !isLg ? 'hidden' : 'scroll';
  }, [isPopupVisible, isLg]);

  return (
    <div className='mt-12'>
      {isLg ? (
        // 데스크탑
        <div className='flex justify-center gap-10 mx-0'>
          <div className='max-w-[670px] w-full'>
            <ActivityImage activity={activity} />
            <ActivityDetail activity={activity} reviewData={reviewData} />
          </div>
          <div className='max-w-[410px] w-full'>
            <ActivityInfo activity={activity} />
            <ReservationUI activity={activity} />
          </div>
        </div>
      ) : (
        <div
          className={`mt-12 px-5 ${
            isPopupVisible ? 'overflow-hidden' : 'overflow-auto'
          }`}
        >
          {/* 테블릿 / 모바일 */}
          <ActivityImage activity={activity} />
          <ActivityInfo activity={activity} />
          <ActivityDetail activity={activity} reviewData={reviewData} />
          <ActivityFooter
            activity={activity}
            isPopupVisible={isPopupVisible}
            setIsPopupVisible={setIsPopupVisible}
          />
          <PopupWrapper
            isVisible={!isLg && isPopupVisible}
            setIsVisible={setIsPopupVisible}
          >
            <ResponsiveReservationUI
              activity={activity}
              setIsPopupVisible={setIsPopupVisible}
            />
          </PopupWrapper>
        </div>
      )}
    </div>
  );
}
