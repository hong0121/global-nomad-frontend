import { useCallback, useEffect, useRef } from 'react';

export default function useInfiniteScroll(
  fetchData: () => void,
  hasMore: boolean
) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const isIntersecting = entries[0]?.isIntersecting;
      if (isIntersecting && hasMore) {
        fetchData();
      }
    },
    [fetchData, hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.7,
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [handleIntersection]);

  return { loadMoreRef };
}
