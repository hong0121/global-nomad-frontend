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
      // 이전 값과 동일하면 상태 업데이트하지 않음 -> 불필요한 리렌더링 방지
      if (breakPoint.isMd !== next.isMd || breakPoint.isLg !== next.isLg) {
        setBreakpoint(next);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakPoint; // { isMd, isLg }
}
