'use client';

import { cn } from '@/src/utils/cn';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function SortDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        className='flex items-center p-[10px] pl-[14px] font-medium'
        onClick={() => setIsOpen(!isOpen)}
      >
        가격
        <Image
          src='/images/icons/TriangleDownIcon.svg'
          width={20}
          height={20}
          alt={'정렬 화살표 아이콘'}
          className={cn(isOpen && 'rotate-180')}
        />
      </button>
      {isOpen && (
        <div className='absolute top-full right-0 border border-[#DFDFDF] bg-white z-[1] whitespace-nowrap rounded-lg text-14 md:text-16'>
          <ul>
            <li>
              <button className='px-2 py-3'>가격이 낮은 순</button>
            </li>
            <li className='border-t border-t-[#DFDFDF]'>
              <button className='px-2 py-3'>가격이 높은 순</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
