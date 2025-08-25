'use client';

import { addMonths, format } from 'date-fns';
import ArrowLeft from '@/public/images/icons/ArrowLeft.svg';
import ArrowRight from '@/public/images/icons/ArrowRight.svg';
import { useCalendar } from '@/src/hooks/useCalendar';
import { useCallback } from 'react';
import CalendarDay from '@/src/components/primitives/CalendarDay';

export default function Calendar() {
  const { daysArray, dateSelector, displayController } = useCalendar();
  const yoil = ['일', '월', '화', '수', '목', '금', '토'];

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
    <article className='w-sm'>
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
        {daysArray.map((day, i) => (
          <CalendarDay
            key={i}
            date={day}
            currentDate={displayController.dateToDisplay}
            dateCallback={dateSetter}
            selected={dateSelector.selectedDate}
          />
        ))}
      </div>
    </article>
  );
}
