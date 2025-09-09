'use client';

import { useEffect, useState } from 'react';
import Dropdown from '../../primitives/Dropdown';
import LoadingSpinner from '../../primitives/LoadingSpinner';
import Image from 'next/image';
import BackBtn from '../../primitives/mypage/BackBtn';
import { Activity } from '@/src/types/activityType';
import ReservationCalendar from './ReservationCalendar';
import { getMyReservationStatus } from '@/src/services/pages/myExperiences/api';
import { useReservationStore } from '@/src/store/ReservationStore';
import { format } from 'date-fns';
import { IReservedSchedule } from '@/src/types/scheduleType';
import { useQuery } from '@tanstack/react-query';
import { queries } from '@/src/services/primitives/queries';

export default function MyReservationStatusPage() {
  const { data: activities, isPending } = useQuery(
    queries.myExperiencesOptions()
  );

  if (isPending || !activities) return <LoadingSpinner />;

  return (
    <section className='flex flex-col items-center gap-8'>
      <div className='w-full flex flex-col gap-2 md:justify-between'>
        <div className='flex gap-4'>
          <BackBtn />
          <h1 className='text-18 font-bold'>예약 현황</h1>
        </div>
        <p className='font-14 text-gray-500'>
          내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
        </p>
      </div>
      {activities && activities.totalCount !== 0 ? (
        <DropdownAndCalendar data={activities.activities} />
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
    </section>
  );
}

function DropdownAndCalendar({ data }: { data: Activity[] }) {
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [schedule, setSchedule] = useState<IReservedSchedule[] | null>(null);
  const selectedDate = useReservationStore(
    (state) => state.displayController.dateToDisplay
  );

  useEffect(() => {
    if (!selectedActivity) return;
    getMyReservationStatus(
      selectedActivity,
      format(selectedDate, 'yyyy'),
      format(selectedDate, 'MM')
    ).then((res) => setSchedule(res));
  }, [selectedActivity, selectedDate]);
  return (
    <>
      <Dropdown
        label=''
        items={data}
        value={'category'}
        onChange={setSelectedActivity}
      />
      {schedule && <ReservationCalendar schedule={schedule} />}
    </>
  );
}
