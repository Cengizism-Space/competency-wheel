import { useEffect, MutableRefObject } from 'react';

const useOutsideClick = (
  ref: MutableRefObject<SVGSVGElement | HTMLDivElement | null>,
  callback: () => void
): void => {
  const handleClick = (e: MouseEvent) => {
    const targetElement = e.target as Element;
    if (
      targetElement.closest('.competency-templates') ||
      targetElement.closest('.competency-value-controllers') ||
      targetElement.closest('.competency-remove') ||
      targetElement.closest('form')
    ) {
      return;
    }

    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
};

export default useOutsideClick;