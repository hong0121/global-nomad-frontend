import { cn } from '@/src/utils/cn';
import LeftIcon from '@/public/images/icons/ChevronLeftIcon.svg';
import RightIcon from '@/public/images/icons/ChevronRightIcon.svg';

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
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={cn(
            'w-10 h-10',
            currentPage === i + 1
              ? 'font-bold border-b-2 border-primary-500'
              : 'font-medium text-gray-300'
          )}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
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
