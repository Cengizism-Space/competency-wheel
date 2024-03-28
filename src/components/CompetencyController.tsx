import React, { useContext } from "react";
import CompetencyValue from "./CompetencyValue";
import CompetencyMeta from "./CompetencyMeta";
import CompetencyRemoval from "./CompetencyRemoval";
import { CompetencyContext, CompetencyContextType } from "./CompetencyContext";
import CompetencyTemplates from "./CompetencyTemplates";

const CompetencyController: React.FC = () => {
  const context = useContext(CompetencyContext);
  const { activeIndex } = context as CompetencyContextType;

  return (
    <div className="flex flex-rows items-center space-y-4 mb-8">
      <div className="columns-2 gap-8">
        <CompetencyTemplates />
        <CompetencyMeta />
      </div>
      {activeIndex !== null && (
        <>
          <CompetencyRemoval />
          <CompetencyValue />
        </>
      )}
    </div>
  );
};

export default CompetencyController;
