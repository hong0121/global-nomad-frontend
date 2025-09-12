'use client';

import CalendarChip from '@/src/components/primitives/CalendarChip';
import { IScheduleCount } from '@/src/types/scheduleType';
import { dateToCalendarDate } from '@/src/utils/dateParser';
import { format } from 'date-fns';
import DayModal from './modal/DayModal';
import { useEffect, useRef, useState } from 'react';
import { useBreakPoint } from '@/src/hooks/useBreakPoint';
import PopupWrapper from '../../primitives/popup/PopupWrapper';
import ResponsiveDayModal from './modal/ResponsiveDayModal';

export default function ReservationDay({
  date,
  displayMonth,
  schedule,
}: {
  date: Date;
  displayMonth: Date;
  schedule: IScheduleCount | null;
}) {
  const today = new Date();
  const todayDate = format(today, 'yyyy-MM-dd');
  const currentMonth = format(displayMonth, 'MM');
  const calendarDate = dateToCalendarDate(date);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { isLg } = useBreakPoint();

  const prevNextMonthClasses =
    calendarDate.month !== currentMonth ? 'text-gray-200' : 'text-black';
  const todayClasses =
    calendarDate.date === todayDate &&
    'text-primary-500 font-bold bg-primary-100 hover:bg-primary-100';
  const yoilClasses =
    calendarDate.month === currentMonth &&
    (calendarDate.yoil === 0 || calendarDate.yoil === 6) &&
    'text-red-500';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node))
        setIsModalVisible(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!schedule) {
    return (
      <div
        className={`${yoilClasses} ${prevNextMonthClasses} w-full h-[124px] flex flex-col items-center border-b border-b-gray-50`}
      >
        <div className={`${todayClasses} w-fit rounded-full p-2`}>
          <span className='text-12 sm:text-16'>{format(date, 'd')}</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className='relative'>
        <button
          className={`${yoilClasses} ${prevNextMonthClasses} w-full h-[124px] flex flex-col items-center gap-1 border-b border-b-gray-50`}
          onClick={() => setIsModalVisible(true)}
        >
          <div className={`${todayClasses} w-fit relative rounded-full p-2`}>
            <span className='text-12 sm:text-16'>{format(date, 'd')}</span>
            <div className='w-2 h-2 absolute top-0 right-0 rounded-full bg-red-500' />
          </div>
          {schedule && schedule.pending !== 0 && (
            <CalendarChip state='pending'>예약 {schedule.pending}</CalendarChip>
          )}
          {schedule && schedule.confirmed !== 0 && (
            <CalendarChip state='confirmed'>
              승인 {schedule.confirmed}
            </CalendarChip>
          )}
          {schedule && schedule.completed !== 0 && (
            <CalendarChip state='completed'>
              완료 {schedule.completed}
            </CalendarChip>
          )}
        </button>
        {isLg && isModalVisible ? (
          <DayModal
            ref={modalRef}
            schedule={schedule}
            selectedDate={date}
            setIsModalVisible={setIsModalVisible}
          />
        ) : (
          <PopupWrapper
            isVisible={isModalVisible}
            setIsVisible={setIsModalVisible}
          >
            <ResponsiveDayModal
              ref={modalRef}
              schedule={schedule}
              selectedDate={date}
              setIsModalVisible={setIsModalVisible}
            />
          </PopupWrapper>
        )}
      </div>
    );
  }
}
