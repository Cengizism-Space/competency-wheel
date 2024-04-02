import React, { useContext } from "react";
import { CompetenciesContext, CompetencyContextType } from "@/context";
import useExportToPng from "@/hooks/useExportToPng";

const PNGExportButton = () => {
  const context = useContext(CompetenciesContext);
  const { svgRef } = context as CompetencyContextType;
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
