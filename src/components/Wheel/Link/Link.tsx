import React, { useContext } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../../../typings";
import CopyLinkButton from "./CopyLinkButton";
import ShareButton from "./ShareButton";

const Link = () => {
  const { link, isFound } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  // if (!isFound) {
  //   return <p className="flex flex-row gap-12 justify-center items-center rounded bg-slate-600 text-white px-8 py-6 text-lg font-medium">Wheel not found!</p>;
  // }

  return (
    link && (
      <div className="flex flex-row gap-12 justify-center items-center rounded bg-slate-600 text-white px-8 py-6">
        <div className="text-left">
          <p className="text-lg font-medium">Link to your wheel</p>
          <a className="hover:text-slate-900" href={link}>
            {link}
          </a>
        </div>
        <CopyLinkButton />
        <ShareButton />
      </div>
    )
  );
};

export default Link;
