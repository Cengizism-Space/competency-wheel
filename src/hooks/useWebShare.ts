import { useCallback } from 'react';
import { ShareData } from '../../typings';

export function useWebShare() {
  const share = useCallback(async ({ title, text, url }: ShareData) => {
    /* istanbul ignore next */
    if (typeof navigator.share !== 'function') {
      // TODO: Hook to error reporting service <Alert>
      //       Web Share API not available
      return;
    }

    try {
      await navigator.share({ title, text, url });
    } catch (err) {
      // TODO: Hook to error reporting service <Alert>
      //       'Failed to share: ', err
      // console.error('Failed to share: ', err);
    }
  }, []);

  return { share };
}