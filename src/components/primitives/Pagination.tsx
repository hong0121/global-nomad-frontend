'use client';

import { cn } from '@/src/utils/cn';
import LeftIcon from '@/public/images/icons/ChevronLeftIcon.svg';
import RightIcon from '@/public/images/icons/ChevronRightIcon.svg';
import { useMemo } from 'react';

interface Props {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: Props) {
  const visiblePages = 5;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = useMemo(() => {
    const start =
      Math.floor((currentPage - 1) / visiblePages) * visiblePages + 1;
    const end = Math.min(start + visiblePages - 1, totalPages);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className='flex justify-center gap-2 w-full mt-10 mb-20'>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className='disabled:text-gray-300'
      >
        <LeftIcon className='w-10 h-10' />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            'w-10 h-10',
            currentPage === page
              ? 'font-bold border-b-2 border-primary-500'
              : 'font-medium text-gray-300'
          )}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className='disabled:text-gray-300'
      >
        <RightIcon className='w-10 h-10' />
      </button>
    </div>
  );
}
