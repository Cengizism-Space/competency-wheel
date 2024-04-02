import React, { useContext } from "react";
import { CompetenciesContext } from "@/context";
import { useWebShare } from "@/hooks/useWebShare";

const ShareButton = () => {
  const context = useContext(CompetenciesContext);
  if (!context) {
    throw new Error("Component must be used within a CompetenciesProvider");
  }
  const { savedLink } = context;

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
