'use client';

import { addMonths, format } from 'date-fns';
import ArrowLeft from '@/public/images/icons/ArrowLeft.svg';
import ArrowRight from '@/public/images/icons/ArrowRight.svg';
import { useCallback } from 'react';
import CalendarDay from '@/src/components/primitives/CalendarDay';
import { ISchedule } from '@/src/types/scheduleType';
import { useReservationStore } from '@/src/store/ReservationStore';
import { availableDateWithDaysArray } from '@/src/utils/mergeTwoDateArray';
import { useCalendar } from '@/src/hooks/useCalendar';

export default function Calendar({
  availableDate,
}: {
  availableDate: ISchedule[];
}) {
  const { dateSelector, displayController } = useReservationStore();
  const { daysArray } = useCalendar();
  const yoil = ['일', '월', '화', '수', '목', '금', '토'];

  const daysArrayWithAvailableDate = availableDateWithDaysArray(
    availableDate,
    daysArray
  );

  const dateSetter = useCallback((date: Date) => {
    dateSelector.setSelectedDate(date);
  }, []);

  const handleLeftClick = () => {
    displayController.setDateToDisplay((prev) => addMonths(prev, -1));
  };
  const handleRightClick = () => {
    displayController.setDateToDisplay((prev) => addMonths(prev, 1));
  };

  return (
    <article className='w-full'>
      <span className='text-16 font-bold'>날짜</span>
      <div className='w-full flex justify-between items-center'>
        <div className='space-x-2'>
          <span>{format(displayController.dateToDisplay, 'MMMM')}</span>
          <span>{format(displayController.dateToDisplay, 'yyyy')}</span>
        </div>
        <div className='flex'>
          <button
            onClick={handleLeftClick}
            className='w-[46px] h-[46px] flex justify-center items-center rounded-lg hover:bg-gray-50'
          >
            <ArrowLeft />
          </button>
          <button
            onClick={handleRightClick}
            className='w-[46px] h-[46px] flex justify-center items-center rounded-lg hover:bg-gray-50'
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div className='w-full grid grid-cols-7 gap-1'>
        {yoil.map((yoil, i) => (
          <div key={i} className='w-[46px] h-[46px] grid place-items-center'>
            {yoil}
          </div>
        ))}
        {daysArrayWithAvailableDate.map((day, i) => (
          <CalendarDay
            key={i}
            date={day.date}
            isAvailable={day.times ? true : false}
            currentDate={displayController.dateToDisplay}
            selected={dateSelector.selectedDate}
            dateCallback={dateSetter}
          />
        ))}
      </div>
    </article>
  );
}
