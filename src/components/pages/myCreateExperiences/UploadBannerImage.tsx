'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useActivityStore } from '@/src/store/useActivityStore';

interface UploadBannerImageProps {
  label: string;
  maxImages: number;
  storeKey?: 'bannerImages' | 'subImages'; // 등록 페이지용
  files?: File[]; // 수정 페이지용
  setImages?: (files: File[]) => void; // 수정 페이지용
  existingImages?: string[]; // 수정 페이지용: 서버에서 받아온 기존 이미지
  setExistingImages?: (urls: string[]) => void;
}

const UploadBannerImage = ({
  label,
  maxImages,
  storeKey,
  files: propFiles,
  setImages: propSetImages,
  existingImages = [],
  setExistingImages,
}: UploadBannerImageProps) => {
  const store = useActivityStore();

  // storeKey 기반이면 store에서 가져오기
  const storeFiles = storeKey ? store[storeKey] : [];
  const setStoreImages = storeKey
    ? (newFiles: File[]) => {
        if (storeKey === 'bannerImages') store.setBannerImages(newFiles);
        else store.setSubImages(newFiles);
      }
    : undefined;

  const files = propFiles ?? storeFiles;
  const setImages = propSetImages ?? setStoreImages!;

  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    const validExistingImages = existingImages.filter((url) => !!url);
    setPreviews([...validExistingImages, ...filePreviews]);

    return () => {
      filePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files, existingImages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    const updatedFiles = [...files, ...newFiles].slice(0, maxImages);
    setImages(updatedFiles);

    e.target.value = '';
  };

  const handleRemove = (index: number) => {
    if (index < existingImages.length) {
      // 기존 이미지 삭제
      setExistingImages?.(existingImages.filter((_, i) => i !== index));
    } else {
      // 새로 추가한 파일 삭제
      const fileIndex = index - existingImages.length;
      setImages(files.filter((_, i) => i !== fileIndex));
    }
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
              {files.length + existingImages.length}/{maxImages}
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
              sizes='(max-width: 768px) 80px, (max-width: 1024px) 126px, 128px'
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
