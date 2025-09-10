import { useBreakPoint } from '@/src/hooks/useBreakPoint';
import { useEffect, useState } from 'react';

const MAX_SIZE = {
  mo: 6,
  tb: 4,
  pc: 8,
};

export default function useMainSize() {
  const { isMd, isLg } = useBreakPoint();
  const [size, setSize] = useState(MAX_SIZE['mo']);

  useEffect(() => {
    if (isLg && isMd) setSize(MAX_SIZE['pc']);
    else if (isMd && !isLg) setSize(MAX_SIZE['tb']);
    else setSize(MAX_SIZE['mo']);
  }, [isMd, isLg]);

  return { size, setSize };
}
