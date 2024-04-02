import { useCallback } from 'react';
import { ShareData } from '../../typings';

export function useWebShare() {
  const share = useCallback(async ({ title, text, url }: ShareData) => {
    if (typeof navigator.share !== 'function') {
      console.error('Web Share API not available');
      return;
    }

    try {
      await navigator.share({ title, text, url });
    } catch (err) {
      console.error('Failed to share: ', err);
    }
  }, []);

  return { share };
}