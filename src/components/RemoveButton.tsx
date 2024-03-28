import React, { useCallback, useContext } from "react";
import { CompetencyContext, CompetencyContextType } from "./CompetencyContext";

const RemoveButton: React.FC = () => {
  const context = useContext(CompetencyContext);
  const { competencies, setCompetencies, activeIndex, setActiveIndex } =
    context as CompetencyContextType;

  const handleRemove = useCallback(() => {
    if (activeIndex !== null && competencies.length > 0) {
      setCompetencies(competencies.filter((_, index) => index !== activeIndex));
      setActiveIndex(null);
    }
  }, [activeIndex, competencies, setCompetencies, setActiveIndex]);

  return (
    <button
      onClick={handleRemove}
      className="bg-red-500 text-white px-4 py-2 rounded-md"
    >
      Remove
    </button>
  );
};

export default RemoveButton;
