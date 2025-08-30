'use client';

import { cn } from '@/src/utils/cn';
import { useRouter } from 'next/navigation';

interface Props {
  onClick?: () => void;
  className?: string;
}

export default function UpdateActivityButton({ onClick, className }: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) return onClick();
    // 동적 라우팅으로 변경 예정 (수정 페이지 담당(성현님)과 소통 필요!)
    router.push('/myUpdateExperiences');
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
