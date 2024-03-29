import React, { useCallback, useContext } from "react";
import {
  CompetenciesContext,
  CompetencyContextType,
} from "../CompetenciesContext";

const CompetencyRemoval: React.FC = () => {
  const context = useContext(CompetenciesContext);
  const { competencies, setCompetencies, activeIndex, setActiveIndex } =
    context as CompetencyContextType;

  const handleRemove = useCallback(() => {
    if (activeIndex !== null && competencies.length > 0) {
      setCompetencies(competencies.filter((_, index) => index !== activeIndex));
      setActiveIndex(null);
    }
  }, [activeIndex, competencies, setCompetencies, setActiveIndex]);

  return (
    <div className="competency-remove">
      <button
        onClick={handleRemove}
        className="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Remove
      </button>
    </div>
  );
};

export default CompetencyRemoval;
