import { twMerge } from 'tailwind-merge';

type AlertModalProps = {
  isOpen: boolean;
  message: string;
  onClose: () => void;
};

export default function AlertModal({ isOpen, message, onClose }: AlertModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      />
      <div
        className={twMerge(
          'relative flex flex-col justify-center items-center gap-5 w-[320px] h-[140px] bg-white rounded-[30px] p-6',
          'md:w-[400px] md:h-[170px]'
        )}
      >
        <p className="mt-1 text-black md:mt-2.5">{message}</p>{' '}
        <button
          onClick={onClose}
          className="w-full max-w-[180px] bg-primary-500 text-white px-4 py-3 rounded-[14px] md:max-w-[200px] md:py-3.5"
        >
          확인
        </button>
      </div>
    </div>
  );
}
