import React, { useContext } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import useExportToPng from "@/hooks/useExportToPng";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";

const ExportToPNGButton = () => {
  const { svgRef, isExportable } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const exportToPng = useExportToPng(svgRef);

  return (
    isExportable && (
      <button
        onClick={exportToPng}
        className="inline-flex w-fit items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-500 transition hover:text-gray-700 focus:outline-none focus:ring"
        type="button"
      >
        <PhotoIcon className="h-4 w-4 mr-1" />
        <span className="text-sm font-medium"> Export to PNG </span>
      </button>

      // <Button onClick={exportToPng} variant="secondary">
      //   <PhotoIcon className="h-6 w-6 mr-2" />
      //   Export to PNG
      // </Button>
    )
  );
};

export default ExportToPNGButton;
