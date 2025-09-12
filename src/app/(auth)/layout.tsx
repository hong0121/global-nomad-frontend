import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='py-[65px] px-6 md:py-[140px]'>
      <div className='max-w-[640px] mx-auto'>
        <h1 className='flex justify-center'>
          <Link href='/'>
            <Image
              src='/images/AuthLogoMd.svg'
              width={255}
              height={199}
              alt='GlobalNomad 로고 큰 이미지'
              className='hidden md:block'
            />
            <Image
              src='/images/AuthLogoSm.svg'
              width={144}
              height={144}
              alt='GlobalNomad 로고 모바일용 이미지'
              className='md:hidden'
            />
          </Link>
        </h1>
        <main className='mt-[42px] md:mt-[62px]'>{children}</main>
      </div>
    </div>
  );
}
