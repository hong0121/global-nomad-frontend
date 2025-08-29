import { cn } from '@/src/utils/cn';

export default function DateButton({
  children,
  value,
  selectedValue,
  callback,
}: {
  children: React.ReactNode;
  value: number;
  selectedValue: number | undefined;
  callback: (time: number) => void;
}) {
  return (
    <label
      className={cn(
        'w-full px-4 py-4 rounded-xl text-16 text-center border border-gray-300 transition-colors cursor-pointer',
        selectedValue === value && 'bg-primary-100 border-primary-500'
      )}
    >
      <input
        type='radio'
        name='time'
        className='sr-only'
        value={value}
        onChange={() => callback(value)}
      />
      {children}
    </label>
  );
}
