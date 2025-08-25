'use client';

import { useCalendar } from '@/src/hooks/useCalendar';
import { addMonths, format } from 'date-fns';
import LeftArrowIcon from '@/public/images/icons/ArrowLeft.svg';
import RightArrowIcon from '@/public/images/icons/ArrowRight.svg';
import ReservationDay from './ReservationDay';
import { IReservedSchedule, IScheduleCount } from '@/src/types/scheduleType';

export default function ReservationCalendar({
  schedule,
}: {
  schedule: IReservedSchedule[];
}) {
  const { daysArray, dateSelector, displayController } = useCalendar();
  const yoils = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handleLeftClick = () => {
    displayController.setDateToDisplay((prev) => addMonths(prev, -1));
  };
  const handleRightClick = () => {
    displayController.setDateToDisplay((prev) => addMonths(prev, 1));
  };

  const displayYear = format(displayController.dateToDisplay, 'yyyy');
  const displayMonth = format(displayController.dateToDisplay, 'M');

  const mergeScheduleWithDays = (
    schedule: IReservedSchedule[],
    days: Date[]
  ) => {
    const scheduleMap = new Map<string, IScheduleCount>();

    schedule.forEach((item) => {
      scheduleMap.set(item.date, item.reservations);
    });

    return days.map((day) => {
      return {
        schedule: scheduleMap.get(format(day, 'yyyy-MM-dd')) ?? null,
        date: day,
      };
    });
  };

  const mappedScheduleToDate = mergeScheduleWithDays(schedule, daysArray);

  return (
    <section className='w-[375px] md:w-[476px] lg:w-[640px] rounded-2xl shadow space-y-6'>
      <div className='w-full py-6 flex justify-center items-center gap-8'>
        <button onClick={handleLeftClick}>
          <LeftArrowIcon />
        </button>
        <span className='text-20 font-bold'>
          {displayYear}년 {displayMonth}월
        </span>
        <button onClick={handleRightClick}>
          <RightArrowIcon />
        </button>
      </div>
      <div className='grid grid-cols-7 place-items-center'>
        {yoils.map((yoil, i) => (
          <div key={i} className='text-13 sm:text-16 font-bold'>
            {yoil}
          </div>
        ))}
      </div>
      <div className='w-full border-b border-b-gray-100' />
      <div className='grid grid-cols-7 place-items-center'>
        {mappedScheduleToDate.map((date, i) => (
          <ReservationDay
            date={date.date}
            schedule={date.schedule}
            displayMonth={displayController.dateToDisplay}
            key={i}
          />
        ))}
      </div>
    </section>
  );
}
