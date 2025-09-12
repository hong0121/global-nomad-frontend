'use client';

import { cn } from '@/src/utils/cn';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface DropdownItem {
  id: number;
  title: string;
}

interface DropdownProps {
  label: string;
  items: string[] | DropdownItem[];
  value: string | null;
  onChange: (id: number) => void;
  error?: string;
}

export default function Dropdown({
  label,
  items,
  value,
  onChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const [contentUp, setContentUp] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dropdownItems: DropdownItem[] = items.map((item, idx) =>
    typeof item === 'string' ? { id: idx + 1, title: item } : item
  );

  useEffect(() => {
    if (isOpen && dropdownRef.current && contentRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const contentHeight = contentRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      const spaceBelow = viewportHeight - dropdownRect.bottom;
      const spaceAbove = dropdownRect.top;

      if (spaceBelow < contentHeight && spaceAbove > contentHeight) {
        setContentUp(true);
      } else {
        setContentUp(false);
      }
    }
  }, [isOpen]);

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
          {selectedItem?.title ?? '카테고리를 선택해 주세요'}
        </span>
        <Image
          src={'/images/icons/TriangleDownIcon.svg'}
          alt='TriangleDownIcon'
          width={24}
          height={24}
        />
      </button>
      {isOpen && (
        <div
          className={cn(
            contentUp ? 'bottom-full' : 'top-full',
            'absolute right-0 z-10 mt-2 w-full p-3 origin-top-right bg-white border border-gray-100 rounded-2xl'
          )}
          ref={contentRef}
        >
          {dropdownItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onChange(item.id);
                setSelectedItem(item);
                setIsOpen(false);
              }}
              className='flex flex-col w-full px-5 py-4 gap-1 text-left text-sm text-gray-900 rounded-xl
                           hover:bg-[#E5F3FF]'
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
