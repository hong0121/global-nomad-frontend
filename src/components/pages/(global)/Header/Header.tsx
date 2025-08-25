'use client';
import LoggingInGnb from '@/src/app/(global)/_components/Header/LoggingInGnb';
import LoggingOutGnb from '@/src/app/(global)/_components/Header/LoggingOutGnb';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <header className='absolute top-0 left-0 right-0'>
      <div className='flex justify-between items-center max-w-[1520px] h-12 mx-auto px-6 md:px-[30px] lg:px-0 lg:w-[calc(100%-60px)]'>
        <h1>
          <Link href='/' className='w-7 md:w-[174px]'>
            <Image
              src='/images/LogoSm.svg'
              width={28}
              height={28}
              alt='GlobalNomad'
              className='md:hidden'
            />
            <Image
              src='/images/LogoLg.svg'
              width={174}
              height={28}
              alt='GlobalNomad'
              className='hidden md:block'
            />
          </Link>
        </h1>

        <nav>{isLogin ? <LoggingOutGnb /> : <LoggingInGnb />}</nav>
      </div>
    </header>
  );
}
