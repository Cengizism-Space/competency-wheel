import React, { useCallback, useContext } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import { ShareIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useWebShare } from "@/hooks/useWebShare";
import { useClipboard } from "@/hooks/useClipboard";
import { DEFAULT_CHECKOUT_MY_WHEEL } from "@/constants";
import classNames from "classnames";

const linkButtonStyles = classNames(
  "flex w-full items-center text-left gap-2 bg-white px-9 py-6 hover:bg-gray-50 text-slate-600 border-t border-gray-100"
);

const Link = () => {
  const { wheel, link } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const { share } = useWebShare();
  const { isCopied, copyToClipboard } = useClipboard();

  const handleShare = useCallback(() => {
    share({
      title: wheel?.title ?? "",
      text: DEFAULT_CHECKOUT_MY_WHEEL,
      url: link ?? "",
    });
  }, [wheel, share, link]);

  const handleCopy = useCallback(() => {
    copyToClipboard(link ?? "");
  }, [copyToClipboard, link]);

  return link && typeof navigator.share !== "undefined" ? (
    <button onClick={handleShare} className={linkButtonStyles}>
      <ShareIcon className="h-4 w-4" />
      <span className="block leading-none text-sm">Share your wheel</span>
    </button>
  ) : (
    <button
      onClick={handleCopy}
      className={linkButtonStyles}
      disabled={isCopied}
    >
      <DocumentDuplicateIcon className="h-4 w-4" />
      <span className="block leading-none text-sm">
        {isCopied ? "Copied to clipboard" : "Copy link"}
      </span>
    </button>
  );
};

export default Link;
