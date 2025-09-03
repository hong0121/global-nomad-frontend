import { cn } from '@/src/utils/cn';

interface Props {
  status: 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';
}

const STATUS_DATA = {
  pending: {
    name: '예약 완료',
    className: 'text-[#2BA90D] bg-[#E9FBE4]',
  },
  confirmed: {
    name: '예약 승인',
    className: 'text-[#1790A0] bg-[#DDF9F9]',
  },
  declined: {
    name: '예약 거절',
    className: 'text-[#F96767] bg-[#FCECEA]',
  },
  canceled: {
    name: '예약 취소',
    className: 'text-gray-600 bg-gray-100',
  },
  completed: {
    name: '체험 완료',
    className: 'text-[#0D6CD1] bg-[#DAF0FF]',
  },
};

export default function ReservationStatusBadge({ status }: Props) {
  return (
    <span
      className={cn(
        'inline-flex py-1 px-2 text-13 font-bold rounded-3xl',
        STATUS_DATA[status].className
      )}
    >
      {STATUS_DATA[status].name}
    </span>
  );
}
