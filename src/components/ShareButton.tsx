import React, { useContext, useCallback } from "react";
import { CompetenciesContext, CompetencyContextType } from "@/context";
import { useWebShare } from "@/hooks/useWebShare";

const ShareButton = () => {
  const { savedLink } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const { share } = useWebShare();

  const handleShare = useCallback(() => {
    share({
      title: "Wheel",
      text: "Check out this wheel",
      url: savedLink ?? "",
    });
  }, [share, savedLink]);

  return (
    typeof navigator.share !== "undefined" && (
      <button onClick={handleShare}>Share link</button>
    )
  );
};

export default ShareButton;
