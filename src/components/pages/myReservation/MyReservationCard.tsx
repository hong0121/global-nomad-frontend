import ReservationStatusBadge from '@/src/components/pages/myReservation/ReservationStatusBadge';
import { MyReservationItem } from '@/src/types/myReservationType';
import { Reservation } from '@/src/types/reservationType';
import { cn } from '@/src/utils/cn';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  reservation: MyReservationItem;
  onCancel: (reservationId: number) => void;
  onWriteReview: (reservation: MyReservationItem) => void;
}

export default function MyReservationCard({
  reservation,
  onCancel,
  onWriteReview,
}: Props) {
  const {
    activity,
    scheduleId,
    id,
    teamId,
    userId,
    status,
    reviewSubmitted,
    totalPrice,
    headCount,
    date,
    startTime,
    endTime,
    createdAt,
    updatedAt,
  } = reservation;

  const hasButtonUI = status === 'pending' || status === 'completed';

  return (
    <>
      <div className='px-2 pb-3 text-16 text-gray-800 font-bold lg:hidden'>
        {format(reservation.date, 'yyyy. MM. dd')}
      </div>
      <div className={cn('relative', hasButtonUI && 'pb-[50px] lg:pb-[0]')}>
        <div
          className={`pr-[98px] rounded-3xl shadow-[0px_4px_24px_rgba(156,180,202,0.2)] md:pr-[116px] lg:pr-[155px]`}
        >
          <div className='shadow-[0px_-8px_20px_rgba(0,0,0,0.05)] rounded-3xl lg:relative'>
            <Link
              href={`/detail/${activity.id}`}
              className='relative block p-5 bg-white rounded-3xl z-[1] lg:px-10 lg:py-[30px]'
            >
              <ReservationStatusBadge status={status} />
              <h4 className='mt-2 text-14 font-bold break-keep lg:mt-3 lg:text-18'>
                {activity.title}
              </h4>
              <div className='mt-1 text-13 font-medium text-gray-500 lg:mt-[10px] lg:text-16'>
                <span className='hidden lg:inline-block lg:mr-1'>
                  {date}
                  <i className='inline-block w-[2px] h-[2px] ml-1 rounded-full bg-gray-500 align-middle' />
                </span>
                {startTime} - {endTime}
              </div>
              <div className='flex items-center gap-1 mt-2 lg:mt-[10px]'>
                <strong className='text-16 lg:text-18'>
                  &#8361;{totalPrice.toLocaleString()}
                </strong>
                <span className='text-14 text-gray-400 lg:text-16'>
                  {headCount}명
                </span>
              </div>
            </Link>
            <div className='absolute bottom-0 left-0 right-0 flex gap-3 h-[37px] px-[9px] text-14 text-gray-600 font-medium md:px-0 lg:left-auto lg:right-10 lg:bottom-[30px] lg:h-[29px] lg:z-[1] lg:gap-2'>
              {status === 'pending' && (
                <button
                  className='grow-1 h-full py-[6px] px-[10px] bg-gray-50 rounded-[8px]'
                  onClick={() => onCancel(id)}
                >
                  예약 취소
                </button>
              )}
              {status === 'completed' && (
                <button
                  className='grow-1 h-full py-[6px] px-[10px] bg-primary-500 text-white rounded-[8px]'
                  onClick={() => onWriteReview(reservation)}
                >
                  후기 작성
                </button>
              )}
            </div>
          </div>
          <div
            className={cn(
              'absolute top-0 right-0 bottom-0 w-[136px] h-auto rounded-r-3xl overflow-hidden lg:w-[181px]',
              hasButtonUI && 'bottom-[50px] lg:bottom-0'
            )}
          >
            <Image
              width={181}
              height={181}
              src={activity.bannerImageUrl}
              alt={activity.title}
              className='w-full h-full block object-cover'
            />
          </div>
        </div>
      </div>
    </>
  );
}
