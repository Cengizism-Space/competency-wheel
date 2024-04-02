import React, { useContext } from "react";
import { CompetenciesContext, CompetencyContextType } from "@/context";
import CopyLinkButton from "./CopyLinkButton";
import ShareButton from "./ShareButton";

import {} from "@/context";
const Link = () => {
  const { savedLink } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  return (
    <div className="flex flex-row items-center space-x-4 mr-4">
      <a href={savedLink}>{savedLink}</a>
      <CopyLinkButton />
      <ShareButton />
    </div>
  );
};

export default Link;
