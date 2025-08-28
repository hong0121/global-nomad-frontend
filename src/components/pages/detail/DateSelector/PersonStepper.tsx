'use client';

import { useEffect, useState } from 'react';

export default function PersonStepper({
  callback,
}: {
  callback: (person: number) => void;
}) {
  const [person, setPerson] = useState<number>(1);
  const handleMinusClick = () => {
    setPerson((prev) => {
      if (prev <= 1) return 1;
      else return prev - 1;
    });
  };
  const handlePlusClick = () => {
    setPerson((prev) => {
      if (prev >= 30) return 30;
      else return prev + 1;
    });
  };

  useEffect(() => {
    callback(person);
  }, [person, callback]);
  return (
    <div className='w-[140px] px-[9px] border border-[#EEEEEE] rounded-3xl flex justify-around'>
      <button className='w-[40px] h-[40px]' onClick={handleMinusClick}>
        -
      </button>
      <span className='text-16 font-bold w-[40px] h-[40px] grid place-items-center'>
        {person}
      </span>
      <button className='w-[40px] h-[40px]' onClick={handlePlusClick}>
        +
      </button>
    </div>
  );
}
