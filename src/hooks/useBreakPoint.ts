'use client';

import { useEffect, useState } from 'react';

export function useBreakPoint() {
  const [breakPoint, setBreakpoint] = useState({
    isMd: false,
    isLg: false,
  });

  useEffect(() => {
    const root = document.documentElement;

    const md = parseInt(
      getComputedStyle(root).getPropertyValue('--breakpoint-md')
    );
    const lg = parseInt(
      getComputedStyle(root).getPropertyValue('--breakpoint-lg')
    );

    const handleResize = () => {
      const width = window.innerWidth;
      setBreakpoint({
        isMd: width >= md,
        isLg: width >= lg,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakPoint; // { isMd, isLg }
}
