import React, { ChangeEvent, useCallback, useMemo, useContext } from "react";
import {
  CompetenciesContext,
  CompetencyContextType,
} from "../CompetenciesContext";
import { CompetencyType } from "../../../typings";

const CompetencyValue: React.FC = () => {
  const context = useContext(CompetenciesContext);
  const { wheel, setWheel, activeIndex } = context as CompetencyContextType;

  const updateCompetency = useCallback((update: (competency: CompetencyType) => void) => {
    if (activeIndex !== null) {
      wheel.competencies.find((competency, index) => {
        if (index === activeIndex) {
          update(competency);
        }
      });

      const updatedCompetencies = [...wheel.competencies];
      update(updatedCompetencies[activeIndex]);
      setWheel({ ...wheel, competencies: updatedCompetencies });
    }
  }, [activeIndex, wheel, setWheel]);

  const handleValueChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateCompetency(
        (competency) => (competency.value = Number(event.target.value))
      );
    },
    [updateCompetency]
  );

  const handleIncrease = useCallback(() => {
    updateCompetency(
      (competency) => (competency.value = Math.min(10, competency.value + 1))
    );
  }, [updateCompetency]);

  const handleDecrease = useCallback(() => {
    updateCompetency(
      (competency) => (competency.value = Math.max(1, competency.value - 1))
    );
  }, [updateCompetency]);

  const competencyValue = useMemo(() => {
    return activeIndex !== null ? wheel.competencies[activeIndex].value : "";
  }, [activeIndex, wheel]);

  return (
    <div className="competency-value-controllers">
      <button
        onClick={handleIncrease}
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
        onClick={handleDecrease}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Decrease
      </button>
    </div>
  );
};

export default CompetencyValue;