import React, { useContext } from "react";
import { CompetenciesContext } from "@/context";
import CopyLinkButton from "./CopyLinkButton";
import ShareButton from "./ShareButton";

const Link = () => {
  const context = useContext(CompetenciesContext);
  if (!context) {
    throw new Error("Component must be used within a CompetenciesProvider");
  }
  const { savedLink } = context;

  return (
    <div className="flex flex-row items-center space-x-4 mr-4">
      <a href={savedLink}>{savedLink}</a>
      <CopyLinkButton />
      <ShareButton />
    </div>
  );
};

export default Link;
