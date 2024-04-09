import React, { useContext } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../../../typings";
import useExportToPng from "@/hooks/useExportToPng";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Commons/Button";

const PNGExportButton = () => {
  const { svgRef, isExportable } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const exportToPng = useExportToPng(svgRef);

  return (
    isExportable && (
      <Button onClick={exportToPng} variant="secondary">
        <PhotoIcon className="h-6 w-6 mr-2" />
        Export to PNG
      </Button>
    )
  );
};

export default PNGExportButton;
