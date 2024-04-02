import React, { ChangeEvent, useCallback, useMemo, useContext } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyType, CompetencyContextType } from "../../typings";

const CompetencyValue: React.FC = () => {
  const { activeIndex, wheel, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const handleValueChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "updateCompetency",
        payload: (competency: CompetencyType) =>
          (competency.value = Number(event.target.value)),
      });
    },
    [dispatch]
  );

  const handleValueAdjust = useCallback(
    (adjustment: number) => {
      dispatch({
        type: "updateCompetency",
        payload: (competency: CompetencyType) =>
          (competency.value = Math.min(
            10,
            Math.max(1, competency.value + adjustment)
          )),
      });
    },
    [dispatch]
  );

  const competencyValue = useMemo(() => {
    return activeIndex !== null ? wheel.competencies[activeIndex].value : "";
  }, [activeIndex, wheel]);

  return (
    <div className="competency-value-controllers">
      <button
        onClick={() => handleValueAdjust(1)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Increase
      </button>
      <input
        type="number"
        value={competencyValue}
        onChange={handleValueChange}
        className="border-2 border-gray-300 rounded-md p-2 mx-2"
        min="1"
        max="10"
      />
      <button
        onClick={() => handleValueAdjust(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Decrease
      </button>
    </div>
  );
};

export default CompetencyValue;
