'use client';

import React, { SVGProps } from 'react';
import { cn } from '@/src/utils/cn';

interface FilterButtonProps {
  label: string;
  activeCategory: string | undefined;
  Icon?: React.FC<SVGProps<SVGSVGElement>>;
  onClick: () => void;
}

export default function FilterButton({
  label,
  activeCategory,
  Icon,
  onClick,
}: FilterButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-white border border-[#D8D8D8] font-medium h-[37px] px-[14px] gap-[6px] text-14 shrink-0 md:h-[44px] md:px-4 md:gap-1 md:text-16',
        activeCategory === label && 'bg-[#333333] text-white font-bold'
      )}
      onClick={onClick}
    >
      {Icon && <Icon className='w-4 h-4 md:w-6 md:h-6' />}
      <span className='leading-[100%] -tracking-[0.025em]'>{label}</span>
    </button>
  );
}
