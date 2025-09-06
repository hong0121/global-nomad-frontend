'use client';

import { useEffect, useState } from 'react';
import Dropdown from '../../primitives/Dropdown';
import LoadingSpinner from '../../primitives/LoadingSpinner';
import Image from 'next/image';
import BackBtn from '../../primitives/mypage/BackBtn';
import { Activity, IMyReservations } from '@/src/types/activityType';
import ReservationCalendar from './ReservationCalendar';
import {
  getMyExperiences,
  getMyReservationStatus,
} from '@/src/services/pages/myExperiences/api';
import { useReservationStore } from '@/src/store/ReservationStore';
import { format } from 'date-fns';
import { IReservedSchedule } from '@/src/types/scheduleType';

export default function MyReservationStatusPage() {
  const [activities, setActivities] = useState<IMyReservations | null>();

  useEffect(() => {
    const fn = async () => {
      const activitiesList = await getMyExperiences();
      if (!activitiesList || activitiesList.totalCount === 0)
        setActivities(null);
      setActivities(activitiesList);
    };
    fn();
  }, []);

  console.log(activities);

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
      {activities !== undefined ? (
        <>
          {activities !== null && activities.totalCount !== 0 ? (
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
        </>
      ) : (
        <LoadingSpinner />
      )}
    </section>
  );
}

function DropdownAndCalendar({ data }: { data: Activity[] }) {
  const [selectedExperience, setSelectedExperience] = useState<string | null>(
    null
  );
  const [reservedSchedule, setReservedSchedule] = useState<
    IReservedSchedule[] | null
  >(null);

  const calendarDisplayDate = useReservationStore(
    (state) => state.displayController.dateToDisplay
  );

  Promise.all(
    data.map((el) => {
      return getMyReservationStatus(
        el.id,
        format(calendarDisplayDate, 'yyyy'),
        format(calendarDisplayDate, 'MM')
      );
    })
  ).then((res) => setReservedSchedule(res));

  return (
    <div>
      <Dropdown
        label=''
        items={data.map((el) => el.title)}
        value={selectedExperience}
        onChange={(e) => setSelectedExperience(e)}
      />
      <ReservationCalendar schedule={reservedSchedule} />
    </div>
  );
}
