'use client';
import LoggingInGnb from '@/src/components/primitives/global/Header/LoggingInGnb';
import LoggingOutGnb from '@/src/components/primitives/global/Header/LoggingOutGnb';
import { queries } from '@/src/services/primitives/queries';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [hasMounted, setHasMounted] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    setAccessToken(localStorage.getItem('accessToken'));
    setHasMounted(true);
  }, []);

  const { data: userInfo } = useQuery(queries.userOptions(accessToken));

  if (!hasMounted) return null;

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

        <nav>{!userInfo ? <LoggingOutGnb /> : <LoggingInGnb />}</nav>
      </div>
    </header>
  );
}
