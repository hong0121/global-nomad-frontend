import TimepickerDropdown from './Dropdown';
import CalendarInput from '../../primitives/input/CalendarInput';
import { useTimeSlotStore } from '@/src/store/TimeSlotStore';
import Image from 'next/image';

export default function AvailableTimeSlots() {
  const { timeSlots, setTimeSlots } = useTimeSlotStore();
  const availableTimes: string[] = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const handleAddSlot = () => {
    const lastSlot = timeSlots[timeSlots.length - 1];
    if (!lastSlot.startTime || !lastSlot.endTime) return;
    setTimeSlots([...timeSlots, { startTime: '', endTime: '' }]);
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
        <CalendarInput />
        <div className='flex items-center gap-2'>
          <div className='flex-1'>
            <TimepickerDropdown
              times={availableTimes}
              selectedTime={timeSlots[0]?.startTime || ''}
              onSelect={(time) => handleChange(0, 'startTime', time)}
              placeholder='00:00'
            />
          </div>
          <Image
            src='/images/icons/MinusIcon.svg'
            alt='MinusIcon'
            width={16}
            height={16}
          />
          <div className='flex-1 items-center gap-2'>
            <TimepickerDropdown
              times={availableTimes}
              selectedTime={timeSlots[0]?.endTime || ''}
              onSelect={(time) => handleChange(0, 'endTime', time)}
              placeholder='00:00'
            />
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

        {timeSlots.slice(1).map((slot, index) => (
          <div key={index + 1} className='flex flex-col gap-2'>
            <CalendarInput />
            <div className='flex items-center gap-2'>
              <div className='flex-1'>
                <TimepickerDropdown
                  times={availableTimes}
                  selectedTime={slot.startTime}
                  onSelect={(time) =>
                    handleChange(index + 1, 'startTime', time)
                  }
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
                  onSelect={(time) => handleChange(index + 1, 'endTime', time)}
                  placeholder='00:00'
                />
              </div>
              <div className='flex cursor-pointer items-center justify-center bg-gray-50 rounded-[30px] w-7 h-7'>
                <Image
                  onClick={() => handleRemoveSlot(index + 1)}
                  src='/images/icons/MinusIcon.svg'
                  alt='MinusIcon'
                  className='cursor-pointer'
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
