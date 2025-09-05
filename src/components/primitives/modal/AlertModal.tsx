import Button from '@/src/components/primitives/Button';
import { createPortal } from 'react-dom';

type AlertModalProps = {
  isOpen: boolean;
  message: string;
  onClose: () => void;
};

export default function AlertModal({
  isOpen,
  message,
  onClose,
}: AlertModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='fixed inset-0 bg-black opacity-50' onClick={onClose} />
      <div className='relative flex flex-col justify-center items-center gap-5 w-[320px] h-[140px] bg-white rounded-[30px] p-6 md:w-[400px] md:h-[170px] z-10'>
        <p className='mt-1 text-black md:mt-2.5 text-16 font-bold md:text-18'>
          {message}
        </p>
        <Button
          onClick={onClose}
          className='w-full max-w-[180px] rounded-[14px] md:max-w-[200px] md:py-3.5'
        >
          확인
        </Button>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  );
}
