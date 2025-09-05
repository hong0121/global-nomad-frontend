'use client';

import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import Left from '@/public/images/icons/ArrowLeft.svg';
import Right from '@/public/images/icons/ArrowRight.svg';
import Delete from '@/public/images/icons/DeleteIcon.svg';

interface Props {
  images: string[];
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function LightBox({
  images,
  index,
  setIndex,
  isOpen,
  setIsOpen,
}: Props) {
  if (!isOpen) return null;

  const prevImage = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className='fixed inset-0 bg-gray-700 bg-opacity-80 z-50 flex items-center justify-center'>
      <button onClick={prevImage}>
        <Left className='w-10 h-10 text-white hover:text-gray-400' />
      </button>
      <div className='flex justify-center items-center w-[80vw] h-[80vh] flex-shrink-0 flex-grow-0 relative'>
        <Image
          src={images[index]}
          alt={`이미지 ${index}`}
          fill
          className='object-contain'
        />
      </div>
      <button onClick={nextImage}>
        <Right className='w-10 h-10 text-white hover:text-gray-400' />
      </button>
      <button onClick={() => setIsOpen(false)} className=''>
        <Delete className='absolute top-7 right-5 w-8 h-8 text-black hover:text-gray-400 z-10' />
        <div className='absolute top-5 right-5 w-10 h-10 rounded-4xl bg-gray-50' />
      </button>
    </div>
  );
}
