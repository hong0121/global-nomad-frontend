import { useReservationStore } from '@/src/store/ReservationStore';
import { ISchedule } from '@/src/types/scheduleType';
import { cn } from '@/src/utils/cn';
import { format } from 'date-fns';
import { MouseEvent, useEffect, useState } from 'react';

export default function TimeSelectorButtons({
  schedules,
  onClickCapture,
}: {
  schedules: ISchedule[];
  onClickCapture?: (e: MouseEvent<HTMLDivElement>) => void;
}) {
  const { dateSelector, timeSelector } = useReservationStore();
  const [availableTimeInSelectedDate, setAvailableTimeInSelectedDate] =
    useState<ISchedule[] | null>(null);

  useEffect(() => {
    setAvailableTimeInSelectedDate(
      schedules.filter(
        (schedule) =>
          schedule.date === format(dateSelector.selectedDate, 'yyyy-MM-dd')
      ) ?? null
    );
  }, [dateSelector.selectedDate, schedules]);

  return (
    <div onClickCapture={onClickCapture} className='w-full flex flex-col gap-3'>
      {availableTimeInSelectedDate &&
      availableTimeInSelectedDate.length !== 0 ? (
        availableTimeInSelectedDate.map((time) => (
          <TimeButton
            key={time.id}
            selectedValue={timeSelector.timeId}
            value={time.id}
          >
            {time.startTime} &tilde; {time.endTime}
          </TimeButton>
        ))
      ) : (
        <span className='w-full text-center'>날짜를 선택해주세요.</span>
      )}
    </div>
  );
}

function TimeButton({
  children,
  value,
  selectedValue,
}: {
  children: React.ReactNode;
  value: number;
  selectedValue: number | null;
}) {
  const { timeSelector } = useReservationStore();
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
        onChange={() => timeSelector.setTimeId(value)}
      />
      {children}
    </label>
  );
}
