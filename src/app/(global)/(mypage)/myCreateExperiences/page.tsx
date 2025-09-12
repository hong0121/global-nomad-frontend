'use client';

import AvailableTimeSlots from '@/src/components/pages/myCreateExperiences/AvailableTimeSlots';
import UploadBannerImage from '@/src/components/pages/myCreateExperiences/UploadBannerImage';
import Button from '@/src/components/primitives/Button';
import Dropdown from '@/src/components/primitives/Dropdown';
import FormInput from '@/src/components/primitives/input/FormInput';
import AlertModal from '@/src/components/primitives/modal/AlertModal';
import ConfirmModal from '@/src/components/primitives/modal/ConfirmModal';
import {
  uploadActivityImage,
  uploadActivityImages,
} from '@/src/services/pages/createImageUrl/api';
import { createExperience } from '@/src/services/pages/myCreateExperiences/api';
import { useReservationStore } from '@/src/store/ReservationStore';
import { useTimeSlotStore } from '@/src/store/TimeSlotStore';
import { useActivityStore } from '@/src/store/useActivityStore';
import { openDaumPostcode } from '@/src/utils/daumPostcode';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
  const dropdownItems = [
    { id: 1, title: '문화 ∙ 예술' },
    { id: 2, title: '식음료' },
    { id: 3, title: '스포츠' },
    { id: 4, title: '투어' },
    { id: 5, title: '관광' },
    { id: 6, title: '웰빙' },
  ];
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ExperiencesFormData>({ mode: 'onBlur' });
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const router = useRouter();

  const handleAddressClick = async () => {
    try {
      const data = await openDaumPostcode();
      setValue('address', data.address);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBackClick = () => {
    setIsConfirmOpen(true);
  };

  const handleCloseModal = () => {
    router.back();
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    router.back();
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
  };

  const formatNumber = (value?: number) => {
    if (value === undefined || value === null) return '';
    return value.toLocaleString();
  };
  const { timeSlots } = useTimeSlotStore();
  const selectedDate = useReservationStore(
    (state) => state.dateSelector.selectedDate
  );
  const { bannerImages, subImages } = useActivityStore();

  const onSubmit: SubmitHandler<ExperiencesFormData> = async (data) => {
    try {
      // 1️⃣ schedules 변환
      const schedules: Schedule[] = timeSlots
        .filter((slot) => slot.startTime && slot.endTime)
        .map((slot) => ({
          date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : 'yy/mm/dd',
          startTime: slot.startTime!,
          endTime: slot.endTime!,
        }));

      // 2️⃣ 배너 이미지 업로드 (단일)
      if (!bannerImages[0]) throw new Error('배너 이미지를 선택해주세요.');
      const bannerUrl = await uploadActivityImage(bannerImages[0]);

      // 3️⃣ 서브 이미지 업로드 (다중)
      const subImageUrls = subImages.length
        ? await uploadActivityImages(subImages)
        : [];

      // 4️⃣ payload 생성
      const payload = {
        ...data,
        schedules,
        bannerImageUrl: bannerUrl,
        subImageUrls,
      };

      // 5️⃣ 체험 등록 API 호출
      const response = await createExperience(payload);
      console.log('✅ 체험 등록 성공', response);
      setIsAlertOpen(true);
    } catch (error) {
      console.error('❌ 체험 등록 실패', error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-[30px] mt-[78px] mb-[53px] px-6 lg:w-[700px] lg:mx-auto'
      >
        <div className='flex justify-between'>
          <h1 className='font-bold text-18 text-gray-950'>내 체험 등록</h1>
          <button onClick={handleBackClick}>
            <Image
              src='/images/icons/BackIcon.svg'
              alt='BackIcon'
              width={24}
              height={24}
            />
          </button>
        </div>
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
              items={dropdownItems}
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
        <Controller
          name='price'
          control={control}
          rules={{ required: '필수 입력 항목입니다.' }}
          render={({ field }) => (
            <FormInput
              label='가격'
              variant='experience'
              placeholder='체험 금액을 입력해 주세요'
              value={formatNumber(field.value)}
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, '');
                const parsed = raw === '' ? undefined : Number(raw);
                field.onChange(parsed);
              }}
              errorMessage={errors.price?.message}
            />
          )}
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
      <AlertModal
        isOpen={isAlertOpen}
        message='체험 등록이 완료되었습니다'
        onClose={handleCloseModal}
      />
      <ConfirmModal
        isOpen={isConfirmOpen}
        message='작업 중인 내용이 저장되지 않습니다. 정말 이동하시겠습니까?'
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}
