'use client';

import AvailableTimeSlots from '@/src/components/pages/myCreateExperiences/AvailableTimeSlots';
import UploadBannerImage from '@/src/components/pages/myCreateExperiences/UploadBannerImage';
import Button from '@/src/components/primitives/Button';
import Dropdown from '@/src/components/primitives/Dropdown';
import FormInput from '@/src/components/primitives/input/FormInput';
import { useReservationStore } from '@/src/store/ReservationStore';
import { useTimeSlotStore } from '@/src/store/TimeSlotStore';
import { useActivityStore } from '@/src/store/useActivityStore';
import { openDaumPostcode } from '@/src/utils/daumPostcode';
import { format } from 'date-fns';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

interface ExperiencesFormData {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  schedules: Schedule[];
}

export default function MyCreateExperiencesPage() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ExperiencesFormData>({ mode: 'onBlur' });

  const handleAddressClick = async () => {
    try {
      const data = await openDaumPostcode();
      setValue('address', data.address);
    } catch (err) {
      console.error(err);
    }
  };

  const { timeSlots } = useTimeSlotStore();
  const selectedDate = useReservationStore(
    (state) => state.dateSelector.selectedDate
  );
  const { bannerImages } = useActivityStore();

  const onSubmit: SubmitHandler<ExperiencesFormData> = (data) => {
    // timeSlots 배열을 schedules 형태로 변환
    const schedules: Schedule[] = timeSlots
      .filter((slot) => slot.startTime && slot.endTime)
      .map((slot) => ({
        date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
        startTime: slot.startTime!,
        endTime: slot.endTime!,
      }));

    console.log('폼 제출됨 ✅', { ...data, schedules, bannerImages });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-[30px]'
      >
        <h1 className='font-bold text-18 text-gray-950'>내 체험 등록</h1>
        <FormInput
          label='제목'
          variant='experience'
          placeholder='제목을 입력해 주세요'
          errorMessage={errors.title?.message}
          {...register('title', { required: '필수 입력 항목입니다.' })}
        />
        <Controller
          name='category'
          control={control}
          rules={{ required: '필수 입력 항목입니다.' }}
          render={({ field, fieldState }) => (
            <Dropdown
              label='카테고리'
              items={[
                '문화 ∙ 예술',
                '식음료',
                '스포츠',
                '투어',
                '관광',
                '웰빙',
              ]}
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        <FormInput
          label='설명'
          variant='experience'
          placeholder='체험에 대한 설명을 입력해 주세요'
          isTextarea={true}
          errorMessage={errors.description?.message}
          {...register('description', { required: '필수 입력 항목입니다.' })}
        />
        <FormInput
          label='가격'
          type='number'
          variant='experience'
          placeholder='체험 금액을 입력해 주세요'
          errorMessage={errors.price?.message}
          {...register('price', {
            valueAsNumber: true,
            required: '필수 입력 항목입니다.',
          })}
        />
        <FormInput
          label='주소'
          placeholder='주소를 입력해 주세요'
          readOnly
          {...register('address', { required: '필수 입력 항목입니다.' })}
          errorMessage={errors.address?.message}
          onClick={handleAddressClick}
        />
        <AvailableTimeSlots />
        <UploadBannerImage
          label={'배너'}
          maxImages={1}
          storeKey={'bannerImages'}
        />
        <UploadBannerImage
          label={'소개'}
          maxImages={4}
          storeKey={'subImages'}
        />
        <div className='w-full flex justify-center'>
          <Button type='submit' className='w-[120px]' variant='primary'>
            등록하기
          </Button>
        </div>
      </form>
    </div>
  );
}
