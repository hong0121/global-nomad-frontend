'use client';

import { useEffect, useState } from 'react';

interface BreakPoint {
  isMd: boolean;
  isLg: boolean;
}

export function useBreakPoint(): BreakPoint {
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
      const next = {
        isMd: width >= md,
        isLg: width >= lg,
      };

      setBreakpoint((prev) => {
        if (prev.isMd === next.isMd && prev.isLg === next.isLg) return prev;
        return next;
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakPoint; // { isMd, isLg }
}
