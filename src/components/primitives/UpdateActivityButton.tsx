'use client';

import { cn } from '@/src/utils/cn';
import { useRouter } from 'next/navigation';

interface Props {
  activityId: number;
  onClick?: () => void;
  className?: string;
}

export default function UpdateActivityButton({
  onClick,
  className,
  activityId,
}: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) return onClick();
    router.push(`/myUpdateExperiences/${activityId}`);
  };

  return (
    <button
      type='button'
      className={cn('text-16 font-medium', className)}
      aria-label='수정하기'
      onClick={handleClick}
    >
      수정하기
    </button>
  );
}
