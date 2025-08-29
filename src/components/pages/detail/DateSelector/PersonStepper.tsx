'use client';

import { useReservationStore } from '@/src/store/ReservationStore';

export default function PersonStepper() {
  const { personSelector } = useReservationStore();
  const handleMinusClick = () => {
    if (personSelector.person <= 1) return;
    else personSelector.decrementPerson();
  };
  const handlePlusClick = () => {
    if (personSelector.person >= 30) return;
    else personSelector.incrementPerson();
  };

  return (
    <div className='w-[140px] px-[9px] border border-[#EEEEEE] rounded-3xl flex justify-around'>
      <button className='w-[40px] h-[40px]' onClick={handleMinusClick}>
        -
      </button>
      <span className='text-16 font-bold w-[40px] h-[40px] grid place-items-center'>
        {personSelector.person}
      </span>
      <button className='w-[40px] h-[40px]' onClick={handlePlusClick}>
        +
      </button>
    </div>
  );
}
