import React, { useContext } from "react";
import { CompetenciesContext, CompetencyContextType } from "@/context";
import { useClipboard } from "@/hooks/useClipboard";

const CopyLinkButton = () => {
  const { isCopied, copyToClipboard } = useClipboard();
  const context = useContext(CompetenciesContext);
  const { savedLink } = context as CompetencyContextType;

  return isCopied ? (
    <span>Copied to clipboard</span>
  ) : (
    <button onClick={() => copyToClipboard(savedLink ?? "")}>Copy link</button>
  );
};

export default CopyLinkButton;
