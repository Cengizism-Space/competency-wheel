import React, { useContext, useCallback } from "react";
import { CompetenciesContext, CompetencyContextType } from "@/context";
import { useClipboard } from "@/hooks/useClipboard";

const CopyLinkButton = () => {
  const { savedLink } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const { isCopied, copyToClipboard } = useClipboard();

  const handleCopy = useCallback(() => {
    copyToClipboard(savedLink ?? "");
  }, [copyToClipboard, savedLink]);

  return isCopied ? (
    <span>Copied to clipboard</span>
  ) : (
    <button onClick={handleCopy}>Copy link</button>
  );
};

export default CopyLinkButton;
