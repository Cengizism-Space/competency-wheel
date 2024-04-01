import { useCallback } from 'react';

interface ShareData {
  title: string;
  text: string;
  url: string;
}

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