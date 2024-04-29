import { useEffect, useRef } from 'react';

export const useScroll = (
  loadHandler: () => void
): React.RefObject<HTMLDivElement> => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 1) {
        loadHandler();
      }
    };

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [loadHandler]);

  return scrollContainerRef;
};
