import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

type ConfirmModalProps = {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({ isOpen, message, onConfirm, onCancel }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onCancel}
      />
      <div
        className="relative flex flex-col items-center bg-white rounded-3xl p-6 w-[320px] h-auto
          md:w-[400px]"
      >
        <div className="relative w-[49px] h-[49px] md:w-[88px] md:h-[88px]">
          <Image
            src="/images/icons/ConfirmModalIcon.svg"
            alt="모달 아이콘"
            fill
          />
        </div>
        <p className="text-black mt-0.5 mb-5 whitespace-pre-line text-center md:mb-6">{message}</p>
        <div className="flex justify-center gap-2 md:gap-3">
          <button
            onClick={onCancel}
            className="flex-shrink-0 w-full max-w-[113px] h-[41px] px-4 py-2 rounded-xl border border-gray-200 text-gray-600"
          >
            아니오
          </button>
          <button
            onClick={onConfirm}
            className="flex-shrink-0 w-full max-w-[113px] h-[41px] px-4 py-2 rounded-xl bg-primary-500 text-white"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}
