'use client';

import { ToastType, useToastStore } from '@/src/store/useToastStore';
import { cn } from '@/src/utils/cn';
import { useCallback, useEffect } from 'react';

interface Props {
  toast: ToastType;
  order: number;
}

const TOAST_DEFAULT = {
  duration: 500,
  delay: 3000,
};

const ToastIcon = {
  info: 'ℹ️',
  warning: '⚠️',
  success: '✅',
  failed: '✖️',
};

const ToastStyle = {
  info: 'bg-primary-500 text-white',
  warning: 'bg-[#ffeb3b]',
  success: 'bg-[#5ab55e] text-white',
  failed: 'bg-[#f54712] text-white',
};

const ToastBarBg = {
  info: 'bg-[#ffeb3b]',
  warning: 'bg-primary-500',
  success: 'bg-[#ffeb3b]',
  failed: 'bg-[#ffeb3b]',
};

export default function Toast({ toast, order }: Props) {
  const deleteToast = useToastStore((state) => state.deleteToast);
  const {
    message,
    id,
    type,
    duration = TOAST_DEFAULT.duration,
    delay = TOAST_DEFAULT.delay,
  } = toast;

  const handleDeleteToast = useCallback(
    () => deleteToast(id),
    [deleteToast, id]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleDeleteToast();
    }, delay + duration);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [delay, duration, handleDeleteToast]);

  return (
    <button
      className={cn(
        'absolute py-2 px-3 rounded-md bg-white shadow-[0px_4px_10px_rgba(0,0,0,0.1)] cursor-pointer overflow-hidden transition-[top] duration-300 ease-linear',
        ToastStyle[type]
      )}
      style={{
        top: `${40 * order}px`,
        animation: `toastIn ${duration}ms ease forwards, toastOut ${duration}ms ease forwards ${delay}ms`,
      }}
      onClick={handleDeleteToast}
    >
      <span
        className={`absolute top-0 left-0 right-0 h-[2px] block animate-toastBar origin-left ${ToastBarBg[type]}`}
        style={{ animationDuration: `${delay}ms` }}
      />
      {`${type && ToastIcon[type]} ${message}`}
    </button>
  );
}
