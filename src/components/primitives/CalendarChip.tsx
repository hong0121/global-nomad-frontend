import { IScheduleCount } from '@/src/types/scheduleType';

export default function CalendarChip({
  state,
  children,
}: {
  state: keyof IScheduleCount;
  children: React.ReactNode;
}) {
  const stateClasses = {
    pending: 'bg-primary-100 text-primary-500',
    confirmed: 'bg-[#fff8dd] text-orange-400',
    completed: 'bg-gray-50 text-gray-500',
  };
  return (
    <div
      className={`${stateClasses[state]} w-[56px] md:w-[44px] lg:w-[68px] py-1 text-11 sm:text-14 text-center rounded`}
    >
      {children}
    </div>
  );
}
