import React, { useContext } from "react";
import { CompetencyType } from "../constants";
import CompetencyValueController from "./CompetencyValueController";
import CompetencyName from "./CompetencyName";
import RemoveButton from "./RemoveButton";
import { CompetencyContext, CompetencyContextType } from "./CompetencyContext";

const CompetencyController: React.FC = () => {
  const context = useContext(CompetencyContext);
  const { competencies, setCompetencies, activeIndex, setActiveIndex } =
    context as CompetencyContextType;

  const updateCompetency = (update: (competency: CompetencyType) => void) => {
    if (activeIndex !== null) {
      const updatedCompetencies = [...competencies];
      update(updatedCompetencies[activeIndex]);
      setCompetencies(updatedCompetencies);
    }
  };

  return (
    <div className="flex flex-rows items-center space-y-4 mb-8">
      <CompetencyName updateCompetency={updateCompetency} />
      {activeIndex !== null && <RemoveButton />}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {activeIndex !== null && (
        <CompetencyValueController updateCompetency={updateCompetency} />
      )}
    </div>
  );
};

export default CompetencyController;
