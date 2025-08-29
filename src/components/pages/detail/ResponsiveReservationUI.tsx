'use client';

import { IActivity } from '@/src/types/scheduleType';
import Button from '@/src/components/primitives/Button';
import PersonStepper from './DateSelector/PersonStepper';
import Calendar from './DateSelector/Calendar';
import TimeSelectorButtons from './DateSelector/TimeSelector';
import { useState } from 'react';
import { useBreakPoint } from '@/src/hooks/useBreakPoint';
import BackIcon from '@/public/images/icons/BackIcon.svg';

export default function ResponsiveReservationUI({
  activity,
  setIsPopupVisible,
}: {
  activity: IActivity;
  setIsPopupVisible: (state: boolean) => void;
}) {
  const [page, setPage] = useState(1);
  const { isLg, isMd } = useBreakPoint();

  const handleReserveClick = () => {
    setIsPopupVisible(false);
  };

  if (!isLg && !isMd) {
    return (
      <>
        <section className='w-full px-6 pt-6 rounded-2xl space-y-6'>
          <article className={`${page === 1 ? 'block' : 'hidden'}`}>
            <Calendar availableDate={activity.schedules} />
            <div className='flex flex-col gap-3.5'>
              <h3 className='text-16 font-bold'>예약 가능한 시간</h3>
              <TimeSelectorButtons
                schedules={activity.schedules}
                onClickCapture={() => setPage(2)}
              />
            </div>
          </article>
          <article
            className={`flex flex-col gap-5 ${page === 2 ? 'block' : 'hidden'}`}
          >
            <div className='flex items-center gap-2'>
              <button onClick={() => setPage(1)}>
                <BackIcon />
              </button>
              <h2 className='text-18 font-bold'>인원</h2>
            </div>
            <p>예약할 인원을 선택해주세요.</p>
            <div className='flex justify-between items-center'>
              <h3 className='text-16 font-bold'>참여 인원 수</h3>
              <PersonStepper />
            </div>
          </article>
        </section>
        <div className='px-7 pt-10 pb-4'>
          <Button variant='primary' size='lg' full onClick={handleReserveClick}>
            확인
          </Button>
        </div>
      </>
    );
  } else if (!isLg && isMd) {
    return (
      <>
        <section className='w-full px-7 pt-6 grid grid-cols-[auto_301px] rounded-2xl gap-6'>
          <Calendar availableDate={activity.schedules} />
          <div className='px-6 py-7 space-y-9 shadow-lg rounded-xl'>
            <div className='flex flex-col gap-3.5'>
              <h3 className='text-16 font-bold'>예약 가능한 시간</h3>
              <TimeSelectorButtons schedules={activity.schedules} />
            </div>
            <div className='w-full flex flex-col gap-5'>
              <h3 className='text-16 font-bold'>참여 인원 수</h3>
              <PersonStepper />
            </div>
          </div>
        </section>
        <section>
          <div className='px-7 pt-10 pb-4'>
            <Button
              variant='primary'
              size='lg'
              full
              onClick={handleReserveClick}
            >
              확인
            </Button>
          </div>
        </section>
      </>
    );
  }
}
