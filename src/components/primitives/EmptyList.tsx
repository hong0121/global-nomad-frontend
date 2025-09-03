import Image from 'next/image';
import { ReactNode } from 'react';

interface Props {
  message?: string;
  children?: ReactNode;
}

export default function EmptyList({ message, children }: Props) {
  return (
    <div className='flex flex-col justify-center items-center gap-[30px]'>
      <Image
        src='/images/Empty.svg'
        width={122}
        height={122}
        alt='내용이 비었을때 아이콘'
      />
      {message && (
        <p className='text-18 text-gray-600 font-medium'>{message}</p>
      )}
      {children}
    </div>
  );
}
