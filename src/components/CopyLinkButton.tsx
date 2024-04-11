import React, { useContext, useCallback } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import { useClipboard } from "@/hooks/useClipboard";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";

const CopyLinkButton = () => {
  const { link } = useContext(CompetenciesContext) as CompetencyContextType;

  const { isCopied, copyToClipboard } = useClipboard();

  const handleCopy = useCallback(() => {
    copyToClipboard(link ?? "");
  }, [copyToClipboard, link]);

  return isCopied ? (
    <span>Copied to clipboard</span>
  ) : (
    <Button onClick={handleCopy} variant="whitey">
      <DocumentDuplicateIcon className="h-6 w-6 mr-2" />
      Copy to clipboard
    </Button>
  );
};

export default CopyLinkButton;
