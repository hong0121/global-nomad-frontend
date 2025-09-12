import Button from '@/src/components/primitives/Button';
import Image from 'next/image';
import { createPortal } from 'react-dom';

type ConfirmModalProps = {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  isOpen,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div
        className='absolute inset-0 bg-black opacity-50'
        onClick={onCancel}
      />
      <div
        className='relative flex flex-col items-center bg-white rounded-3xl p-6 w-[320px] h-auto
          md:w-[400px]'
      >
        <div className='relative w-[49px] h-[49px] md:w-[88px] md:h-[88px]'>
          <Image
            src='/images/icons/ConfirmModalIcon.svg'
            alt='모달 아이콘'
            fill
          />
        </div>
        <p className='text-black mt-0.5 mb-5 whitespace-pre-line text-center font-bold text-16 leading-relaxed md:text-18 md:mb-6'>
          {message}
        </p>
        <div className='flex justify-center gap-2 md:gap-3'>
          <Button
            onClick={onCancel}
            variant='secondary'
            className='flex-shrink-0 w-full max-w-[113px] h-[41px] md:max-w-[135px] md:h-[47px]'
          >
            아니오
          </Button>
          <Button
            onClick={onConfirm}
            className='flex-shrink-0 w-full max-w-[113px] h-[41px] md:max-w-[135px] md:h-[47px]'
          >
            네
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  );
}
