import React, { useCallback, useContext } from "react";
import {
  CompetenciesContext,
  CompetencyContextType,
} from "../../context";

const CompetencyRemoval: React.FC = () => {
  const context = useContext(CompetenciesContext);
  const { wheel, setWheel, activeIndex, setActiveIndex } =
    context as CompetencyContextType;

  const handleRemove = useCallback(() => {
    if (activeIndex !== null && wheel.competencies.length > 0) {
      setWheel({
        ...wheel,
        competencies: wheel.competencies.filter(
          (_, index) => index !== activeIndex
        ),
      });
      setActiveIndex(null);
    }
  }, [activeIndex, wheel, setWheel, setActiveIndex]);

  return (
    <button
      onClick={handleRemove}
      className="bg-red-500 text-white px-4 py-2 rounded-md"
    >
      Remove
    </button>
  );
};

export default CompetencyRemoval;
