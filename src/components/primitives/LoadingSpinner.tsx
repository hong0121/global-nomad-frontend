import { cn } from '@/src/utils/cn';

interface Props {
  className?: string;
}
export default function LoadingSpinner({ className }: Props) {
  return (
    <div
      className={cn(
        'w-[20px] h-[20px] border-[5px] border-primary-500 border-t-white rounded-full animate-spin',
        className
      )}
    />
  );
}
