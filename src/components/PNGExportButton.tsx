import React, { useContext } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import useExportToPng from "@/hooks/useExportToPng";

const PNGExportButton = () => {
  const { svgRef } = useContext(CompetenciesContext) as CompetencyContextType;

  const exportToPng = useExportToPng(svgRef);

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md"
      onClick={exportToPng}
    >
      Export to PNG
    </button>
  );
};

export default PNGExportButton;
