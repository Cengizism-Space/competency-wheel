import React, { useContext, useCallback } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../../../typings";
import { useClipboard } from "@/hooks/useClipboard";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

const CopyLinkButton = () => {
  const { link } = useContext(CompetenciesContext) as CompetencyContextType;

  const { isCopied, copyToClipboard } = useClipboard();

  const handleCopy = useCallback(() => {
    copyToClipboard(link ?? "");
  }, [copyToClipboard, link]);

  return isCopied ? (
    <span>Copied to clipboard</span>
  ) : (
    <button
      className="flex flex-row items-center hover:text-slate-900"
      onClick={handleCopy}
    >
      <DocumentDuplicateIcon className="h-6 w-6 mr-2" />
      Copy to clipboard
    </button>
  );
};

export default CopyLinkButton;
