import React, { useCallback, useContext } from "react";
import { CompetenciesContext } from "../../context";

const CompetencyRemoval: React.FC = () => {
  const context = useContext(CompetenciesContext);
  if (!context) {
    throw new Error("Component must be used within a CompetenciesProvider");
  }
  const { wheel, activeIndex, dispatch } = context;

  const handleRemove = useCallback(() => {
    if (activeIndex !== null && wheel.competencies.length > 0) {
      dispatch({
        type: "setWheel",
        payload: {
          ...wheel,
          competencies: wheel.competencies.filter(
            (_, index) => index !== activeIndex
          ),
        },
      });
      dispatch({ type: "setActiveIndex", payload: null });
    }
  }, [activeIndex, wheel, dispatch]);

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
