import React, { useContext, useCallback } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import { useWebShare } from "@/hooks/useWebShare";
import { DEFAULT_CHECKOUT_MY_WHEEL } from "@/constants";

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
  }, [share, link]);

  return (
    typeof navigator.share !== "undefined" && (
      <button onClick={handleShare}>Share link</button>
    )
  );
};

export default ShareButton;
