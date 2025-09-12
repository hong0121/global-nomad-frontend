'use client';

import { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import Calendar from '@/src/components/pages/detail/DateSelector/Calendar';
import { useReservationStore } from '@/src/store/ReservationStore';

export default function CalendarInput() {
  const [open, setOpen] = useState(false);
  const selectedDate = useReservationStore(
    (state) => state.dateSelector.selectedDate
  );

  const prevDateRef = useRef<Date | null>(null);
  useEffect(() => {
    if (!open) return;
    if (selectedDate && selectedDate !== prevDateRef.current) {
      setOpen(false);
    }
    prevDateRef.current = selectedDate ?? null;
  }, [selectedDate, open]);

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={() => setOpen((prev) => !prev)}
        className='w-full flex items-center justify-between border border-gray-100 rounded-2xl pt-4 pr-5 pb-4 pl-5'
      >
        <span>
          {selectedDate ? format(selectedDate, 'yyyy-MM-dd') : 'yy/mm/dd'}
        </span>
        <Image
          src='/images/icons/CalendarIcon.svg'
          alt='Calendar Icon'
          width={24}
          height={24}
        />
      </button>

      {open && (
        <div className='absolute top-full left-0 z-[1000] bg-white p-5'>
          <Calendar availableDate={[]} />
        </div>
      )}
    </div>
  );
}
