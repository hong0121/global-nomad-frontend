'use client';

import { cn } from '@/src/utils/cn';
import { createPortal } from 'react-dom';

export default function PopupWrapper({
  isVisible,
  setIsVisible,
  children,
  className,
}: {
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      {isVisible &&
        createPortal(
          <div>
            <div
              className='fixed top-0 left-0 w-screen h-screen bg-black/50 z-[1]'
              onClick={() => setIsVisible(false)}
            />
            <div
              className={cn(
                'fixed bottom-0 left-0 w-full bg-white z-[2]',
                className
              )}
            >
              {children}
            </div>
          </div>,
          document.getElementById('portal') as HTMLElement
        )}
    </>
  );
}
