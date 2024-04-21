import { useState, useCallback } from 'react';

export function useClipboard() {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = useCallback(async (text: string) => {
    if (typeof navigator.clipboard.writeText !== 'function') {
      // TODO: Hook to error reporting service <Alert>
      //       Web copy clipboard api not available
      /* istanbul ignore next */
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);

      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      // TODO: Hook to error reporting service <Alert>
      //       'Failed to copy text: ', err
      // console.error('Failed to copy text: ', err);
    }
  }, []);

  return { isCopied, copyToClipboard };
}