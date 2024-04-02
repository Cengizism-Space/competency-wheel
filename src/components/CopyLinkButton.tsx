import React, { useContext } from "react";
import { CompetenciesContext } from "@/context";
import { useClipboard } from "@/hooks/useClipboard";

const CopyLinkButton = () => {
  const context = useContext(CompetenciesContext);
  if (!context) {
    throw new Error("Component must be used within a CompetenciesProvider");
  }
  const { savedLink } = context;

  const { isCopied, copyToClipboard } = useClipboard();

  return isCopied ? (
    <span>Copied to clipboard</span>
  ) : (
    <button onClick={() => copyToClipboard(savedLink ?? "")}>Copy link</button>
  );
};

export default CopyLinkButton;
