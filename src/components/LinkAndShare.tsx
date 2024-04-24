import React, { useCallback, useContext } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../types/app";
import { ShareIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useWebShare } from "@/hooks/useWebShare";
import { useClipboard } from "@/hooks/useClipboard";
import { DEFAULT_CHECKOUT_MY_WHEEL } from "@/constants";

const LinkAndShare = () => {
  const { wheel, link } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const { share } = useWebShare();
  const { isCopied, copyToClipboard } = useClipboard();

  const handleShare = useCallback(() => {
    share({
      title: wheel?.title ?? "",
      text: DEFAULT_CHECKOUT_MY_WHEEL,
      url: `${link}?presentation=true` ?? "",
    });
  }, [wheel, share, link]);

  const handleCopy = useCallback(() => {
    copyToClipboard(`${link}?presentation=true` ?? "");
  }, [copyToClipboard, link]);

  return link && typeof navigator.share !== "undefined" ? (
    <button
      onClick={handleShare}
      className="flex w-full items-center text-left gap-2 bg-white px-9 py-6 hover:bg-gray-50 text-slate-600 border-t border-gray-100"
      data-testid="share-button"
    >
      <ShareIcon className="h-4 w-4" />
      <span className="block leading-none text-sm">Share your wheel</span>
    </button>
  ) : (
    <button
      onClick={handleCopy}
      className="flex w-full items-center text-left gap-2 bg-white px-9 py-6 hover:bg-gray-50 text-slate-600 border-t border-gray-100"
      disabled={isCopied}
      data-testid="copy-button"
    >
      <DocumentDuplicateIcon className="h-4 w-4" />
      <span className="block leading-none text-sm">
        {isCopied ? "Copied to clipboard" : "Copy link"}
      </span>
    </button>
  );
};

export default LinkAndShare;
