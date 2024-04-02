import React, { useCallback, useContext } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";

const CompetencyRemoval: React.FC = () => {
  const { wheel, activeIndex, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const handleRemove = useCallback(() => {
    if (activeIndex !== null && wheel.competencies.length > 0) {
      dispatch({
        type: "setState",
        payload: {
          wheel: {
            ...wheel,
            competencies: wheel.competencies.filter(
              (_, index) => index !== activeIndex
            ),
          },
          activeIndex: null,
        },
      });
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
