import { useState, useEffect, useRef, RefObject } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

const useContainerDimensions = (): [RefObject<HTMLDivElement>, Dimensions] => {
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width !== dimensions.width || height !== dimensions.height) {
          setDimensions({ width, height });
        }
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, dimensions.height, dimensions.width]);

  return [ref, dimensions];
};

export default useContainerDimensions;