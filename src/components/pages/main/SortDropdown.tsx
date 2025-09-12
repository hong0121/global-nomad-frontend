'use client';

import { ActivitiesSort } from '@/src/services/pages/main/api';
import { cn } from '@/src/utils/cn';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const SORT_DATA: { label: string; value: ActivitiesSort }[] = [
  { label: '최신순', value: 'latest' },
  { label: '가격이 낮은 순', value: 'price_asc' },
  { label: '가격이 높은 순', value: 'price_desc' },
];

interface Props {
  currentSort: ActivitiesSort;
  onClick: (selectSort: ActivitiesSort) => void;
}

export default function SortDropdown({ currentSort, onClick }: Props) {
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

  const handleClick = (value: ActivitiesSort) => {
    onClick(value);
    setIsOpen(false);
  };

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        className='flex items-center p-[10px] pl-[14px] font-medium'
        onClick={() => setIsOpen(!isOpen)}
      >
        {SORT_DATA.find((item) => item.value === currentSort)?.label}
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
            {SORT_DATA.map((item) => (
              <li
                className='border-t border-t-[#DFDFDF] first-of-type:border-t-0'
                key={item.value}
              >
                <button
                  className='px-2 py-3'
                  onClick={() => handleClick(item.value)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
