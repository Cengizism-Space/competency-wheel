import { useEffect, useContext, MutableRefObject, useCallback } from 'react';
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from '../../typings';

const useOutsideClick = (
  ref: MutableRefObject<SVGSVGElement | HTMLDivElement | null>,
  callback: () => void
): void => {
  const { isBootstrapped } = useContext(CompetenciesContext) as CompetencyContextType;

  const handleClick = useCallback((e: MouseEvent) => {
    const targetElement = e.target as Element;

    if (
      targetElement.closest('.competency-value-controllers') ||
      targetElement.closest('.competency-remove') ||
      targetElement.closest('form')
    ) {
      return;
    }

    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  }, [ref, callback]);

  useEffect(() => {
    if (isBootstrapped) {
      document.addEventListener('mousedown', handleClick);

      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    }
  }, [isBootstrapped, handleClick]);
};

export default useOutsideClick;