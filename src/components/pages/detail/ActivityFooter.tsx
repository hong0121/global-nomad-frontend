import { IActivity } from '@/src/types/scheduleType';
import Button from '../../primitives/Button';
import { format } from 'date-fns';
import { useReservationStore } from '@/src/store/ReservationStore';
import { createReservation } from '@/src/services/pages/detail/postReservation';
import { useToastStore } from '@/src/store/useToastStore';

export default function ActivityFooter({
  activity,
  isPopupVisible,
  setIsPopupVisible,
}: {
  activity: IActivity;
  isPopupVisible: boolean;
  setIsPopupVisible: (state: boolean) => void;
}) {
  const { dateSelector, timeSelector, personSelector } = useReservationStore();
  const timeInfo = activity.schedules.find(
    (schedule) => schedule.id === timeSelector.timeId
  );
  const createToast = useToastStore((state) => state.createToast);

  const handleReserveClick = () => {
    createReservation(activity.id, {
      scheduleId: timeSelector.timeId!,
      headCount: personSelector.person,
    })
      .then(() => {
        createToast({
          message: '예약이 완료되었습니다!',
          type: 'success',
        });
      })
      .catch((err) => {
        createToast({
          message:
            err.response.status === 409
              ? '이미 예약된 스케줄입니다!'
              : '예약이 실패했습니다!',
          type: 'failed',
        });
      });
  };

  return (
    <div className='fixed bottom-0 left-0 w-full space-y-3 px-6 py-4 bg-white border-t border-[#e6e6e6]'>
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
      <Button variant='primary' full onClick={handleReserveClick}>
        예약하기
      </Button>
    </div>
  );
}
