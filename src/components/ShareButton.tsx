import React, { useContext } from "react";
import { CompetenciesContext, CompetencyContextType } from "@/context";
import { useWebShare } from "@/hooks/useWebShare";

const ShareButton = () => {
  const context = useContext(CompetenciesContext);
  const { savedLink } = context as CompetencyContextType;
  const { share } = useWebShare();

  return (
    typeof navigator.share !== "undefined" && (
      <button
        onClick={() =>
          share({
            title: "Wheel",
            text: "Check out this wheel",
            url: savedLink ?? "",
          })
        }
      >
        Share link
      </button>
    )
  );
};

export default ShareButton;
