'use client';

import { useCalendar } from '@/src/hooks/useCalendar';
import { IActivity, ISchedule } from '@/src/types/scheduleType';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Button from '@/src/components/primitives/Button';
import DateButton from './DateSelector/DateButton';
import PersonStepper from './DateSelector/PersonStepper';
import Calendar from './DateSelector/Calendar';

export default function ReservationUI({ activity }: { activity: IActivity }) {
  const { dateSelector } = useCalendar();
  const [selectedDate, setSelectedDate] = useState<ISchedule[] | null>(
    () =>
      activity.schedules.filter(
        (schedule) =>
          schedule.date !== format(dateSelector.selectedDate, 'yyyy-MM-dd')
      ) ?? null
  );
  const [selectedTime, setSelectedTime] = useState<number>();
  const [person, setPerson] = useState<number>(1);

  useEffect(() => {
    setSelectedDate(
      activity.schedules.filter(
        (schedule) =>
          schedule.date === format(dateSelector.selectedDate, 'yyyy-MM-dd')
      ) ?? null
    );
  }, [dateSelector.selectedDate, activity.schedules]);

  return (
    <section className='w-fit p-[30px] rounded-2xl shadow space-y-6'>
      <div className='flex items-center gap-1'>
        <h2 className='text-24 font-bold'>
          &#8361; {activity.price.toLocaleString()}
        </h2>
        <span className='text-20 text-[#79747E]'>&#47; 1명</span>
      </div>
      <Calendar />
      <div className='flex justify-between items-center'>
        <h3 className='text-16 font-bold'>참여 인원 수</h3>
        <PersonStepper callback={setPerson} />
      </div>
      <div className='flex flex-col gap-3.5'>
        <h3 className='text-16 font-bold'>예약 가능한 시간</h3>
        {selectedDate &&
          selectedDate.map((time) => (
            <DateButton
              key={time.id}
              selectedValue={selectedTime}
              value={time.id}
              callback={setSelectedTime}
            >
              {time.startTime} &tilde; {time.endTime}
            </DateButton>
          ))}
      </div>
      {selectedTime && (
        <div className='flex justify-between items-center'>
          <div className='text-20 flex gap-2'>
            <h3 className='text-[#79747e]'>총 합계</h3>
            <h4 className='font-bold'>
              &#8361; {(activity.price * person).toLocaleString()}
            </h4>
          </div>
          <Button variant='primary' size='lg'>
            예약하기
          </Button>
        </div>
      )}
    </section>
  );
}
