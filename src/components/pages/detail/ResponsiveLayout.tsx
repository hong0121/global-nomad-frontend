'use client';

import ActivityDetail from '@/src/components/pages/detail/ActivityDetail';
import ActivityImage from '@/src/components/pages/detail/ActivityImage';
import ActivityInfo from '@/src/components/pages/detail/ActivityInfo';
import { useBreakPoint } from '@/src/hooks/useBreakPoint';
import { Activity } from '@/src/services/pages/detail/activity';
import { ReviewResponse } from '@/src/services/pages/detail/review';

interface Props {
  activity: Activity;
  reviewData: ReviewResponse;
}

export default function ResponsiveLayout({ activity, reviewData }: Props) {
  const { isLg } = useBreakPoint();

  return (
    <div>
      {isLg ? (
        // 데스크탑
        <div className='flex justify-center gap-5 mx-0'>
          <div className='max-w-[670px] w-full'>
            <ActivityImage activity={activity} />
            <ActivityDetail activity={activity} reviewData={reviewData} />
          </div>
          <div className='max-w-[410px] w-full'>
            <ActivityInfo activity={activity} />
            {/* 예약 컴포넌트 들어갈 자리 */}
          </div>
        </div>
      ) : (
        <>
          {/* 테블릿 / 모바일 */}
          <ActivityImage activity={activity} />
          <ActivityInfo activity={activity} />
          <ActivityDetail activity={activity} reviewData={reviewData} />
          {/* 예약 컴포넌트 들어갈 자리 */}
        </>
      )}
    </div>
  );
}
