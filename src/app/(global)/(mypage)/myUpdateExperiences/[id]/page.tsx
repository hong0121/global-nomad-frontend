'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { format } from 'date-fns';

import AvailableTimeSlots from '@/src/components/pages/myCreateExperiences/AvailableTimeSlots';
import UploadBannerImage from '@/src/components/pages/myCreateExperiences/UploadBannerImage';
import Button from '@/src/components/primitives/Button';
import FormInput from '@/src/components/primitives/input/FormInput';

import {
  uploadActivityImage,
  uploadActivityImages,
} from '@/src/services/pages/createImageUrl/api';
import {
  getExperienceDetail,
  updateExperience,
  UpdateExperiencePayload,
} from '@/src/services/pages/myUpdateExperiences/api';

import { useReservationStore } from '@/src/store/ReservationStore';
import { useTimeSlotStore } from '@/src/store/TimeSlotStore';
import { useActivityStore } from '@/src/store/useActivityStore';
import { openDaumPostcode } from '@/src/utils/daumPostcode';
import AlertModal from '@/src/components/primitives/modal/AlertModal';

import ConfirmModal from '@/src/components/primitives/modal/ConfirmModal';
import Image from 'next/image';

import Dropdown from '@/src/components/primitives/Dropdown';

interface Schedule {
  id: number;
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

const dropdownItem = [
  { id: 1, title: '문화 · 예술' },
  { id: 2, title: '식음료' },
  { id: 3, title: '스포츠' },
  { id: 4, title: '투어' },
  { id: 5, title: '관광' },
  { id: 6, title: '웰빙' },
];

export default function MyUpdateExperiencesPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [existingSubImages, setExistingSubImages] = useState<
    { id: number; url: string }[]
  >([]);
  const [existingSchedules, setExistingSchedules] = useState<Schedule[]>([]);
  const { timeSlots, setTimeSlots } = useTimeSlotStore();
  const { bannerImages, subImages, setBannerImages, setSubImages } =
    useActivityStore();
  const { setSelectedDate } = useReservationStore(
    (state) => state.dateSelector
  );
  const [bannerUrls, setBannerUrls] = useState<string[]>([]);
  const [subUrls, setSubUrls] = useState<string[]>([]);
  const [categoryDefaultValue, setCategoryDefaultValue] = useState<{
    id: number;
    title: string;
  } | null>(null);

  // ✅ 수정 전용 useForm
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<ExperiencesFormData>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      category: '',
      description: '',
      price: 0,
      address: '',
      schedules: [],
    },
  });

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

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    router.back();
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
  };

  const handleCloseModal = () => {
    router.back();
  };

  const formatNumber = (value?: number) => {
    if (value === undefined || value === null) return '';
    return value.toLocaleString();
  };

  // 1️⃣ 기존 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const detail = await getExperienceDetail(id);

        // form 값 세팅
        reset({
          title: detail.title,
          category:
            dropdownItem
              .find((el) => el.title === detail.category)
              ?.id.toString() || '',
          description: detail.description,
          price: detail.price,
          address: detail.address,
        });

        // 카테고리 상태 세팅
        setCategoryDefaultValue(
          dropdownItem.find((el) => el.title === detail.category) ?? null
        );

        // 이미지 상태 세팅
        setBannerUrls([detail.bannerImageUrl]);
        setSubUrls(
          detail.subImages?.map(
            (img: { id: number; imageUrl: string }) => img.imageUrl
          ) ?? []
        );

        setExistingSubImages(detail.subImages ?? []);
        setExistingSchedules(detail.schedules ?? []);

        // timeSlots & 날짜 세팅
        setTimeSlots(
          detail.schedules.map((s: Schedule) => ({
            id: s.id,
            startTime: s.startTime,
            endTime: s.endTime,
          }))
        );
        if (detail.schedules.length > 0 && detail.schedules[0].date) {
          setSelectedDate(new Date(detail.schedules[0].date));
        }
      } catch (error) {
        console.error('❌ 체험 상세 불러오기 실패', error);
      }
    };
    fetchData();
  }, [id, reset, setBannerImages, setSubImages, setTimeSlots, setSelectedDate]);

  const onSubmit = async (data: ExperiencesFormData) => {
    try {
      const selectedCategory = dropdownItem.find(
        (el) => el.id === parseInt(data.category)
      );

      if (!selectedCategory) {
        alert('유효한 카테고리를 선택해주세요.');
        return;
      }

      data.category = selectedCategory.title;

      // 1️⃣ 스케줄 처리
      const schedulesToAdd = timeSlots
        .filter((slot) => slot.startTime && slot.endTime)
        .map((slot) => ({
          date: format(new Date(), 'yyyy-MM-dd'),
          startTime: slot.startTime!,
          endTime: slot.endTime!,
        }));

      const scheduleIdsToRemove = existingSchedules
        .filter((s) => !timeSlots.some((slot) => slot.id === s.id)) // 현재 timeSlots에 없는 스케줄
        .map((s) => s.id);

      // 2️⃣ 배너 이미지 처리
      const bannerUrl = bannerImages[0]
        ? await uploadActivityImage(bannerImages[0])
        : bannerUrls[0]; // 기존 URL 유지

      // 3️⃣ 서브 이미지 처리
      // 새로 업로드한 파일만 업로드
      const newFiles = subImages.filter(
        (file) => file instanceof File
      ) as File[];

      // 업로드 후 반환되는 URL 배열
      let subImageUrlsToAdd: string[] = [];
      if (newFiles.length > 0) {
        subImageUrlsToAdd = await uploadActivityImages(newFiles);
      }
      // 삭제할 기존 이미지 ID 추출
      const subImageIdsToRemove = existingSubImages
        .filter((img) => !subUrls.includes(img.url)) // 삭제된 것만
        .map((img) => img.id);

      // 4️⃣ payload 구성 (기존 이미지는 API에서 자동 유지됨)
      const payload: UpdateExperiencePayload = {
        ...data,
        bannerImageUrl: bannerUrl,
        subImageIdsToRemove,
        subImageUrlsToAdd,
        scheduleIdsToRemove,
        schedulesToAdd,
      };

      // 5️⃣ API 호출
      const response = await updateExperience(id, payload);
      console.log('✅ 체험 수정 성공', response);
      setIsAlertOpen(true);
    } catch (error) {
      console.error('❌ 체험 수정 실패', error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-[30px] mt-[78px] mb-[53px] px-6 lg:w-[700px] lg:mx-auto'
      >
        <div className='flex justify-between'>
          <h1 className='font-bold text-18 text-gray-950'>체험 수정하기</h1>
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
              items={dropdownItem}
              value={field.value}
              onChange={field.onChange}
              defaultValue={categoryDefaultValue!}
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
          label='배너'
          maxImages={1}
          files={bannerImages}
          setImages={setBannerImages}
          existingImages={bannerUrls}
        />
        <UploadBannerImage
          label='소개'
          maxImages={4}
          files={subImages}
          setImages={setSubImages}
          existingImages={subUrls}
          setExistingImages={setSubUrls}
        />

        <div className='w-full flex justify-center'>
          <Button type='submit' className='w-[120px]' variant='primary'>
            수정하기
          </Button>
        </div>
      </form>
      <AlertModal
        isOpen={isAlertOpen}
        message='체험 수정이 완료되었습니다'
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
