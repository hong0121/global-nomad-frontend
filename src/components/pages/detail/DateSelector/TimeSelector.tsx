import { useReservationStore } from '@/src/store/ReservationStore';
import { ISchedule } from '@/src/types/scheduleType';
import { cn } from '@/src/utils/cn';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export default function TimeSelectorButtons({
  schedules,
}: {
  schedules: ISchedule[];
}) {
  const { dateSelector, timeSelector } = useReservationStore();
  const [availableTimeInSelectedDate, setAvailableTimeInSelectedDate] =
    useState<ISchedule[] | null>(
      () =>
        schedules.filter(
          (schedule) =>
            schedule.date !== format(dateSelector.selectedDate, 'yyyy-MM-dd')
        ) ?? null
    );

  useEffect(() => {
    setAvailableTimeInSelectedDate(
      schedules.filter(
        (schedule) =>
          schedule.date === format(dateSelector.selectedDate, 'yyyy-MM-dd')
      ) ?? null
    );
  }, [dateSelector.selectedDate, schedules]);

  return (
    <>
      {availableTimeInSelectedDate?.map((time) => (
        <TimeButton
          key={time.id}
          selectedValue={timeSelector.timeId}
          value={time.id}
          callback={timeSelector.setTimeId}
        >
          {time.startTime} &tilde; {time.endTime}
        </TimeButton>
      ))}
    </>
  );
}

function TimeButton({
  children,
  value,
  selectedValue,
  callback,
}: {
  children: React.ReactNode;
  value: number;
  selectedValue: number | null;
  callback: (time: number) => void;
}) {
  return (
    <label
      className={cn(
        'w-full px-4 py-4 rounded-xl text-16 text-center border border-gray-300 transition-colors cursor-pointer',
        selectedValue === value && 'bg-primary-100 border-primary-500'
      )}
    >
      <input
        type='radio'
        name='time'
        className='sr-only'
        value={value}
        onChange={() => callback(value)}
      />
      {children}
    </label>
  );
}
