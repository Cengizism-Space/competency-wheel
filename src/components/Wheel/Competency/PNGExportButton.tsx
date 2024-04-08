import React, { useContext } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../../../typings";
import useExportToPng from "@/hooks/useExportToPng";
import { PhotoIcon } from "@heroicons/react/24/outline";

const PNGExportButton = () => {
  const { svgRef, isExportable } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const exportToPng = useExportToPng(svgRef);

  return (
    isExportable && (
      <button
        className="flex flex-row items-center w-full rounded px-8 py-3 text-sm font-medium text-slate-600 bg-white shadow hover:bg-slate-50 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
        onClick={exportToPng}
      >
        <PhotoIcon className="h-6 w-6 mr-2" />
        Export to PNG
      </button>
    )
  );
};

export default PNGExportButton;
