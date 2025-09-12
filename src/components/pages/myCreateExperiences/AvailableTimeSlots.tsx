'use client';

import TimepickerDropdown from './Dropdown';
import { useBreakPoint } from '@/src/hooks/useBreakPoint';
import CalendarInput from '../../primitives/input/CalendarInput';
import { useTimeSlotStore } from '@/src/store/TimeSlotStore';
import Image from 'next/image';

export default function AvailableTimeSlots() {
  const { timeSlots, setTimeSlots } = useTimeSlotStore();
  const { isMd } = useBreakPoint();

  const availableTimes: string[] = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  // 가이드 슬롯 (UI용, 첫 번째)
  const guideSlot = { startTime: '', endTime: '' };

  const handleAddSlot = () => {
    // 실제 슬롯 배열 (첫 번째는 UI 가이드용이므로 제외)
    const actualSlots = timeSlots;

    // 마지막 실제 슬롯이 완전히 입력되었거나 슬롯이 없는 경우에만 추가
    if (
      actualSlots.length === 0 ||
      (actualSlots[actualSlots.length - 1].startTime &&
        actualSlots[actualSlots.length - 1].endTime)
    ) {
      setTimeSlots([...actualSlots, { startTime: '', endTime: '' }]);
    } else {
      alert('예약 날짜를 모두 입력해야 새로운 슬롯을 추가할 수 있습니다.');
    }
  };
  const handleRemoveSlot = (index: number) => {
    const updatedSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(updatedSlots);
  };

  const handleChange = (
    index: number,
    field: 'startTime' | 'endTime',
    value: string
  ) => {
    const updatedSlots = [...timeSlots];
    updatedSlots[index][field] = value;

    // 중복 체크
    const duplicate = updatedSlots.some(
      (slot, i) =>
        i !== index &&
        slot.startTime === updatedSlots[index].startTime &&
        slot.endTime === updatedSlots[index].endTime
    );

    if (duplicate) {
      alert('같은 시간대에는 1개의 체험만 생성할 수 있습니다.');
      return;
    }

    setTimeSlots(updatedSlots);
  };

  return (
    <div>
      <h1 className='font-bold text-16'>예약 가능한 시간대</h1>
      <h2 className='font-medium text-14 mt-[19px] mb-[9px]'>날짜</h2>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-3.5'>
          {/* 첫 번째 가이드 슬롯 */}
          <div className='md:min-w-[344px]'>
            <div className='relative'>
              <button
                type='button'
                className={`flex items-center justify-between border border-gray-100 rounded-2xl pt-4 pr-5 pb-4 pl-5 w-full text-gray-400 ${
                  isMd ? 'max-w-[344px]' : 'w-full'
                }`}
              >
                <span>{'yy/mm/dd'}</span>
                <Image
                  src='/images/icons/CalendarIcon.svg'
                  alt='Calendar Icon'
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
          <div className='flex items-center gap-2 flex-1'>
            <div className='flex-1'>
              <div className='relative'>
                <button
                  type='button'
                  className={`flex w-full justify-between border border-gray-100 rounded-2xl pt-4 pr-5 pb-4 pl-5 text-gray-400`}
                >
                  {'00:00'}
                  <Image
                    src={'/images/icons/TriangleDownIcon.svg'}
                    alt='TriangleDownIcon'
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>
            <Image
              src='/images/icons/MinusIcon.svg'
              alt='MinusIcon'
              width={16}
              height={16}
            />
            <div className='flex-1'>
              <div className='relative'>
                <button
                  type='button'
                  className={`flex w-full justify-between border border-gray-100 rounded-2xl pt-4 pr-5 pb-4 pl-5 text-gray-400`}
                >
                  {'00:00'}
                  <Image
                    src={'/images/icons/TriangleDownIcon.svg'}
                    alt='TriangleDownIcon'
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>
            <div
              onClick={handleAddSlot}
              className='flex cursor-pointer items-center justify-center bg-[var(--color-primary-500)] rounded-[30px] w-7 h-7'
            >
              <Image
                src='/images/icons/PlusIcon.svg'
                alt='PlusIcon'
                width={16}
                height={16}
                className='filter invert'
              />
            </div>
          </div>
        </div>
        <hr className='my-4 border-gray-100' />
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            className={`flex gap-3.5 ${isMd ? 'flex-row' : 'flex-col'}`}
          >
            {/* CalendarInput */}
            <div className='md:min-w-[344px]'>
              <CalendarInput />
            </div>

            {/* Timepicker + 버튼 그룹 (남은 공간 차지) */}
            <div className='flex items-center gap-2 flex-1'>
              <div className='flex-1'>
                <TimepickerDropdown
                  times={availableTimes}
                  selectedTime={slot.startTime}
                  onSelect={(time) => handleChange(index, 'startTime', time)}
                  placeholder='00:00'
                />
              </div>
              <Image
                src='/images/icons/MinusIcon.svg'
                alt='MinusIcon'
                width={16}
                height={16}
              />
              <div className='flex-1'>
                <TimepickerDropdown
                  times={availableTimes}
                  selectedTime={slot.endTime}
                  onSelect={(time) => handleChange(index, 'endTime', time)}
                  placeholder='00:00'
                />
              </div>
              <div
                onClick={() => handleRemoveSlot(index)}
                className='flex cursor-pointer items-center justify-center bg-gray-50 rounded-[30px] w-7 h-7'
              >
                <Image
                  src='/images/icons/MinusIcon.svg'
                  alt='MinusIcon'
                  width={16}
                  height={16}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
