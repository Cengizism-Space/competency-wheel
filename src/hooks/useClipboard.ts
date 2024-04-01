import { useState, useCallback } from 'react';

export function useClipboard() {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = useCallback(async (text: string) => {
    if (typeof navigator.clipboard.writeText !== 'function') {
      console.error('Clipboard API not available');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);

      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, []);

  return { isCopied, copyToClipboard };
}