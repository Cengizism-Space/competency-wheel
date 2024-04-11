import React, { useContext, useCallback } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import { useWebShare } from "@/hooks/useWebShare";
import { DEFAULT_CHECKOUT_MY_WHEEL } from "@/constants";
import { ShareIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";

const ShareLinkButton = () => {
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
      <Button onClick={handleShare} variant="whitey">
        <ShareIcon className="h-6 w-6 mr-2" />
        Share
      </Button>
    )
  );
};

export default ShareLinkButton;
