import React, { useContext, useCallback } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
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
