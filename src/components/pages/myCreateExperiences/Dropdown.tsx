'use client';

import Image from 'next/image';
import { useState } from 'react';

interface TimepickerDropdownProps {
  times: string[];
  selectedTime?: string;
  onSelect: (time: string) => void;
  placeholder?: string;
}

export default function TimepickerDropdown({
  times,
  selectedTime,
  onSelect,
  placeholder = '시간 선택',
}: TimepickerDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={() => setOpen((prev) => !prev)}
        className='flex w-full justify-between border border-gray-100 rounded-2xl pt-4 pr-5 pb-4 pl-5'
      >
        {selectedTime || placeholder}
        <Image
          src={'/images/icons/TriangleDownIcon.svg'}
          alt='TriangleDownIcon'
          width={24}
          height={24}
        />
      </button>
      {open && (
        <ul className='absolute top-full left-0 w-full max-h-[200px] overflow-y-auto m-0 p-1 list-none border border-gray-300 rounded bg-white z-[1000]'>
          {times.map((time, index) => (
            <li
              key={time + index}
              onClick={() => {
                onSelect(time);
                setOpen(false);
              }}
              className='px-2 py-2 cursor-pointer '
            >
              {time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
