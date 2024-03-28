import React, { useContext } from "react";
import CompetencyValueController from "./CompetencyValueController";
import CompetencyName from "./CompetencyName";
import RemoveButton from "./RemoveButton";
import { CompetencyContext, CompetencyContextType } from "./CompetencyContext";
import CompetencyTemplates from "./CompetencyTemplates";

const CompetencyController: React.FC = () => {
  const context = useContext(CompetencyContext);
  const { activeIndex } = context as CompetencyContextType;

  return (
    <div className="flex flex-rows items-center space-y-4 mb-8">
      <div className="columns-2 gap-8">
        <CompetencyTemplates />
        <CompetencyName />
      </div>
      {activeIndex !== null && (
        <>
          <RemoveButton />
          <CompetencyValueController />
        </>
      )}
    </div>
  );
};

export default CompetencyController;
