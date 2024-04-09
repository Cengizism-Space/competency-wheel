import React from "react";
import ResetButton from "./ResetButton";
import PNGExportButton from "./PNGExportButton";
import SaveButton from "./SaveButton";
import DeleteButton from "./DeleteButton";
import CompetencyValue from "./CompetencyValue";
import CompetencyMeta from "./CompetencyMeta";
import CompetencyRemoval from "./CompetencyRemoval";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../../../typings";

const CompetencyCard = () => {
  const { isFound } = React.useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  return (
    isFound && (
      <div className="col-span-3 grow">
        <div className="w-full flex flex-col gap-4 rounded bg-slate-50 px-8 py-6">
          <p className="text-lg font-medium text-left">Competency</p>
          <div className="flex flex-col gap-4">
            <CompetencyMeta />
            <CompetencyValue />
            <CompetencyRemoval />
            <PNGExportButton />
            <SaveButton />
            <DeleteButton />
            <ResetButton />
          </div>
        </div>
      </div>
    )
  );
};

export default CompetencyCard;
