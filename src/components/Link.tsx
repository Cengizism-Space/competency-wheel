import React, { useContext } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import CopyLinkButton from "./CopyLinkButton";
import ShareLinkButton from "./ShareLinkButton";
import { ShareIcon } from "@heroicons/react/24/outline";

const Link = () => {
  const { link } = useContext(CompetenciesContext) as CompetencyContextType;

  return (
    link && (
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <a
          href="#"
          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50 text-slate-600"
        >
          <ShareIcon className="h-5 w-5" />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">Share your wheel</strong>

              <span> with others </span>
            </p>
          </div>
        </a>
      </div>
      // <div className="flex flex-row gap-12 justify-center items-center rounded bg-slate-600 text-white px-8 py-6">
      //   <div className="text-left">
      //     <p className="text-lg font-medium">Link to your wheel</p>
      //     <a className="hover:text-slate-900" href={link}>
      //       {link}
      //     </a>
      //   </div>
      //   <CopyLinkButton />
      //   <ShareButton />
      // </div>
    )
  );
};

export default Link;
