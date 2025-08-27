'use client';

import { cn } from '@/src/utils/cn';
import { createPortal } from 'react-dom';
import CloseIcon from '@/public/images/icons/DeleteIcon.svg';

export default function NotificationModal({
  visible,
  setVisible,
  className,
}: {
  visible: boolean;
  setVisible: (state: boolean) => void;
  className?: string;
}) {
  return (
    <>
      {visible &&
        createPortal(
          <>
            <div
              className='w-screen h-screen absolute top-0 left-0 z-[1]'
              onClick={() => setVisible(false)}
            />
            <section
              className={cn(
                'w-[231px] h-48 pt-4 pb-2 z-[2] bg-white rounded-2xl shadow',
                className
              )}
            >
              <div className='px-6 pb-3.5 flex justify-between border-b border-gray-100'>
                <h2 className='text-16 font-bold'>알림 6개</h2>
                <button onClick={() => setVisible(false)}>
                  <CloseIcon />
                </button>
              </div>
              <article>므아지경</article>
            </section>
          </>,
          document.getElementById('portal') as HTMLElement
        )}
    </>
  );
}
