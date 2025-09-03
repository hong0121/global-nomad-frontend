'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useActivityStore } from '@/src/store/useActivityStore';

interface UploadBannerImageProps {
  label: string;
  maxImages: number;
  required?: boolean;
  storeKey: 'bannerImages' | 'subImages';
}

const UploadBannerImage = ({
  label,
  maxImages,
  storeKey,
}: UploadBannerImageProps) => {
  const store = useActivityStore();
  const images = store[storeKey];
  const setImages = (files: File[]) => store.setStoreImages(storeKey, files);

  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    // 기존 이미지 파일로 미리보기 생성
    const previewUrls = images.map((file: File) => URL.createObjectURL(file));
    setPreviews(previewUrls);

    // 컴포넌트 언마운트 시 URL 객체 해제
    return () => previewUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const newImages = [...images, ...fileArray].slice(0, maxImages);

    setImages(newImages);

    const previewUrls = newImages.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);

    e.target.value = '';
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  return (
    <div className='flex flex-col gap-2'>
      <label className='font-bold text-16'>{label} 이미지 등록</label>
      <div className='flex items-center gap-2'>
        <label className='flex flex-col items-center justify-center flex-shrink-0 w-20 h-20 sm:w-32 sm:h-32 md:w-32 md:h-32 border border-gray-100 rounded-lg cursor-pointer'>
          <input
            type='file'
            accept='image/*'
            multiple={maxImages > 1}
            onChange={handleFileChange}
            className='hidden'
          />
          <div className='flex flex-col items-center justify-center'>
            <Image
              src='/images/icons/EyeOffIcon.svg'
              alt='Add'
              width={40}
              height={40}
            />
            <div className='text-xs text-gray-500 mt-1'>
              {images.length}/{maxImages}
            </div>
          </div>
        </label>

        {previews.map((src, idx) => (
          <div
            key={idx}
            className='relative flex-shrink-0 border border-gray-100 rounded-lg w-20 h-20 sm:w-32 sm:h-32 md:w-32 md:h-32'
          >
            <Image
              src={src}
              alt={`Preview ${idx + 1}`}
              fill
              className='object-cover'
            />
            <button
              type='button'
              onClick={() => handleRemove(idx)}
              className='absolute -top-2 -right-2 bg-gray-950 rounded-full p-1 shadow-md z-20'
            >
              <Image
                src='/images/icons/DeleteIcon.svg'
                alt='Delete'
                width={16}
                height={16}
                className='filter invert'
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadBannerImage;
