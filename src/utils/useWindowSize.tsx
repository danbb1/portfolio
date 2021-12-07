import { useCallback, useState, useEffect, RefObject } from 'react';
import { debounce } from 'lodash';

type WindowState = {
  windowWidth: number;
  windowHeight: number;
};

const useWindowSize = (ref: RefObject<HTMLElement> | null = null) => {
  const windowGlobal = typeof window !== 'undefined';

  const [windowSize, setWindowSize] = useState<WindowState | null>(
    windowGlobal ? { windowWidth: window.innerWidth, windowHeight: window.innerHeight } : null,
  );
  const [elSize, setElSize] = useState<{ width: number; height: number } | null>(null);

  const handleResize = () => {
    if (!windowGlobal) return;

    setWindowSize({
      ...windowSize,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });

    if (ref && ref.current) {
      const newSize = ref.current?.getBoundingClientRect();

      setElSize({ width: newSize.width, height: newSize.height });
    }
  };

  const debouncedHandleResize = useCallback(debounce(handleResize, 400), [windowSize, elSize]);

  useEffect(() => {
    if (windowGlobal) {
      handleResize();
      window.addEventListener('resize', debouncedHandleResize);
    }

    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, []);

  return { windowSize, elSize };
};

export default useWindowSize;
