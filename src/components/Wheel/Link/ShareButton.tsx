import React, { useContext, useCallback } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../../../typings";
import { useWebShare } from "@/hooks/useWebShare";
import { DEFAULT_CHECKOUT_MY_WHEEL } from "@/constants";
import { ShareIcon } from "@heroicons/react/24/outline";

const ShareButton = () => {
  const { wheel, link } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const { share } = useWebShare();

  const handleShare = useCallback(() => {
    share({
      title: wheel?.title ?? "",
      text: DEFAULT_CHECKOUT_MY_WHEEL,
      url: link ?? "",
    });
  }, [wheel, share, link]);

  return (
    typeof navigator.share !== "undefined" && (
      <button
        className="flex flex-row items-center hover:text-slate-900"
        onClick={handleShare}
      >
        <ShareIcon className="h-6 w-6 mr-2" />
        Share
      </button>
    )
  );
};

export default ShareButton;
