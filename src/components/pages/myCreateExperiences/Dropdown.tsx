'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface DropdownProps {
  label: string;
  items: string[];
  value: string | null;
  onChange: (value: string) => void;
  error?: string;
}

export default function Dropdown({
  label,
  items,
  value,
  onChange,
}: DropdownProps) {
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
    <div
      ref={dropdownRef}
      className='relative w-full font-bold text-base text-gray-950'
    >
      {label}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='inline-flex w-full justify-between items-center border border-gray-100 rounded-2xl px-5 py-4 font-medium text-gray-400  mt-2.5'
      >
        <span className={value ? 'text-gray-900' : 'text-gray-400'}>
          {value ?? '카테고리를 선택해 주세요'}
        </span>
        <Image
          src={'/images/icons/TriangleDownIcon.svg'}
          alt='TriangleDownIcon'
          width={24}
          height={24}
        />
      </button>
      {isOpen && (
        <div className='absolute right-0 z-10 mt-2 w-full p-3 origin-top-right bg-white border border-gray-100 rounded-2xl'>
          {items.map((item) => (
            <button
              key={item}
              onClick={() => {
                onChange(item);
                setIsOpen(false);
              }}
              className='flex flex-col w-full px-5 py-4 gap-1 text-left text-sm text-gray-900 rounded-xl
                           hover:bg-[#E5F3FF]'
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
