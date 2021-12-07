import { useState, useEffect, RefObject } from 'react';

const useIsVisible = (ref: RefObject<HTMLElement>, rootMargin = '0px') => {
  const windowGlobal = typeof window !== 'undefined';

  const [isIntersecting, setIsIntersecting] = useState(false);

  let observer: ResizeObserver | null;

  useEffect(() => {
    if (!windowGlobal || !ref.current) return () => {};

    observer = new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting), { rootMargin });

    observer.observe(ref.current);

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return isIntersecting;
};

export default useIsVisible;
