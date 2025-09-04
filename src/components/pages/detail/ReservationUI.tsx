'use client';

import { IActivity } from '@/src/types/scheduleType';
import Button from '@/src/components/primitives/Button';
import PersonStepper from './DateSelector/PersonStepper';
import Calendar from './DateSelector/Calendar';
import { useReservationStore } from '@/src/store/ReservationStore';
import TimeSelectorButtons from './DateSelector/TimeSelector';
import { createReservation } from '@/src/services/pages/detail/postReservation';

export default function ReservationUI({ activity }: { activity: IActivity }) {
  const { personSelector, timeSelector } = useReservationStore();

  const handleReserveClick = async () => {
    const data = await createReservation(activity.id, {
      scheduleId: timeSelector.timeId!,
      headCount: personSelector.person,
    });
  };

  return (
    <section className='w-fit p-[30px] rounded-2xl shadow space-y-6'>
      <div className='flex items-center gap-1'>
        <h2 className='text-24 font-bold'>
          &#8361; {activity.price.toLocaleString()}
        </h2>
        <span className='text-20 text-[#79747E]'>&#47; 1명</span>
      </div>
      <Calendar availableDate={activity.schedules} />
      <div className='flex justify-between items-center'>
        <h3 className='text-16 font-bold'>참여 인원 수</h3>
        <PersonStepper />
      </div>
      <div className='flex flex-col gap-3.5'>
        <h3 className='text-16 font-bold'>예약 가능한 시간</h3>
        <TimeSelectorButtons schedules={activity.schedules} />
      </div>
      {timeSelector.timeId && (
        <div className='flex justify-between items-center'>
          <div className='text-20 flex gap-2'>
            <h3 className='text-[#79747e]'>총 합계</h3>
            <h4 className='font-bold'>
              &#8361;{' '}
              {(activity.price * personSelector.person).toLocaleString()}
            </h4>
          </div>
          <Button variant='primary' size='lg' onClick={handleReserveClick}>
            예약하기
          </Button>
        </div>
      )}
    </section>
  );
}
