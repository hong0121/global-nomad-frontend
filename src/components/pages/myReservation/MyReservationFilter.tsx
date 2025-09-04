'use client';

import { ReservationStatus } from '@/src/types/myReservationType';
import { cn } from '@/src/utils/cn';

const filterMatching = {
  pending: '예약 완료',
  confirmed: '예약 승인',
  declined: '예약 거절',
  canceled: '예약 취소',
  completed: '체험 완료',
};

interface Props {
  status: ReservationStatus | null;
  onChange: (status: ReservationStatus | null) => void;
}

export default function MyReservationFilter({ status, onChange }: Props) {
  const handleClick = (key: ReservationStatus) => {
    const nextFilter = key === status ? null : key;
    onChange(nextFilter);
  };

  return (
    <div className='flex items-center gap-2 mb-3 md:mb-[30px] overflow-x-auto'>
      {Object.entries(filterMatching).map(([key, value]) => (
        <button
          key={key}
          className={cn(
            'py-[10px] px-4 border border-[#D8D8D8] text-16 font-medium rounded-4xl shrink-0',
            status === key &&
              'border-[#333333] bg-[#333333] text-white font-medium'
          )}
          onClick={() => handleClick(key as ReservationStatus)}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
