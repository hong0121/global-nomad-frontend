'use client';

import BackIcon from '@/public/images/icons/BackIcon.svg';
import { TabContext } from '@/src/app/(global)/(mypage)/myInfo/pageContext';
import { useContext } from 'react';
export default function BackBtn() {
  const { setIsTabOpen } = useContext(TabContext);

  return (
    <button onClick={() => setIsTabOpen(false)} className='block md:hidden'>
      <BackIcon />
    </button>
  );
}
