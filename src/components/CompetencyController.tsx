import React, { ChangeEvent, useCallback, useMemo } from "react";
import { CompetencyType } from "../constants";
import CompetencyValueController from "./CompetencyValueController";
import CompetencyName from "./CompetencyName";
import RemoveButton from "./RemoveButton";

interface CompetencyControllerProps {
  competencies: CompetencyType[];
  setCompetencies: React.Dispatch<React.SetStateAction<CompetencyType[]>>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const CompetencyController: React.FC<CompetencyControllerProps> = ({
  competencies,
  setCompetencies,
  activeIndex,
  setActiveIndex,
}) => {
  const updateCompetency = (update: (competency: CompetencyType) => void) => {
    if (activeIndex !== null) {
      const updatedCompetencies = [...competencies];
      update(updatedCompetencies[activeIndex]);
      setCompetencies(updatedCompetencies);
    }
  };

  return (
    <div className="flex flex-rows items-center space-y-4 mb-8">
      <CompetencyName
        competencies={competencies}
        updateCompetency={updateCompetency}
        setCompetencies={setCompetencies}
        activeIndex={activeIndex}
      />
      {activeIndex !== null && (
        <RemoveButton
          competencies={competencies}
          setCompetencies={setCompetencies}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      )}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {activeIndex !== null && (
        <CompetencyValueController
          activeIndex={activeIndex}
          competencies={competencies}
          updateCompetency={updateCompetency}
        />
      )}
    </div>
  );
};

export default CompetencyController;
