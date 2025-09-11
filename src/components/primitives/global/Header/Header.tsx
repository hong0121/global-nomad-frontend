'use client';
import LoggingInGnb from '@/src/components/primitives/global/Header/LoggingInGnb';
import LoggingOutGnb from '@/src/components/primitives/global/Header/LoggingOutGnb';
import useCurrentUser from '@/src/hooks/useCurrentUser';
import { cn } from '@/src/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const userInfo = useCurrentUser();
  const headerRef = useRef<HTMLHeadElement>(null);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const headerCurrent = headerRef.current;
    if (!headerCurrent) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsTop(true);
        } else {
          setIsTop(false);
        }
      },
      { threshold: 1 }
    );

    observer.observe(headerCurrent);

    return () => {
      observer.unobserve(headerCurrent);
    };
  }, []);

  return (
    <header className='absolute top-0 left-0 right-0 z-50' ref={headerRef}>
      <div
        className={cn(
          'fixed top-0 left-0 right-0 flex justify-between items-center max-w-[1520px] h-12 md:h-20 mx-auto px-6 md:px-[30px] lg:px-0 lg:w-[calc(100%-60px)] transition-all',
          !isTop &&
            'left-2 right-2 top-2 bg-primary-500/10 rounded-md backdrop-blur-2xl lg:px-[30px]'
        )}
      >
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

        <nav>{!!userInfo ? <LoggingInGnb /> : <LoggingOutGnb />}</nav>
      </div>
    </header>
  );
}
