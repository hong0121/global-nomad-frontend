import { IActivity } from '@/src/types/scheduleType';
import Button from '../../primitives/Button';
import { format } from 'date-fns';
import { useReservationStore } from '@/src/store/ReservationStore';

export default function ActivityFooter({
  activity,
  isPopupVisible,
  setIsPopupVisible,
}: {
  activity: IActivity;
  isPopupVisible: boolean;
  setIsPopupVisible: (state: boolean) => void;
}) {
  const { dateSelector, timeSelector } = useReservationStore();
  const timeInfo = activity.schedules.find(
    (schedule) => schedule.id === timeSelector.timeId
  );

  return (
    <nav className='fixed bottom-0 left-0 w-full space-y-3 px-6 py-4 z-[2] bg-white border-t border-[#e6e6e6]'>
      <div className='w-full flex justify-between'>
        <h1 className='text-18 font-bold'>
          {activity.price.toLocaleString()}
          <span className='text-16 text-[#79747e]'>/ 1명</span>
        </h1>
        <button
          className='text-16 text-primary-500 font-bold underline'
          onClick={() => setIsPopupVisible(!isPopupVisible)}
        >
          {timeSelector.timeId
            ? `${format(dateSelector.selectedDate, 'yy/M/dd')} ${timeInfo?.startTime} ~ ${timeInfo?.endTime}`
            : '날짜 선택하기'}
        </button>
      </div>
      <Button variant='primary' full>
        확인
      </Button>
    </nav>
  );
}
