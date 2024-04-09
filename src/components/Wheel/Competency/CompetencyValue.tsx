import React, { ChangeEvent, useCallback, useMemo, useContext } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyType, CompetencyContextType } from "../../../../typings";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import InputField from "@/components/Commons/InputField";
import Button from "@/components/Commons/Button";

const CompetencyValue: React.FC = () => {
  const { activeIndex, wheel, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const handleValueChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "updateCompetency",
        payload: (competency: CompetencyType) => ({
          ...competency,
          value: Number(event.target.value),
        }),
      });
    },
    [dispatch]
  );

  const handleValueAdjust = useCallback(
    (adjustment: number) => {
      dispatch({
        type: "updateCompetency",
        payload: (competency: CompetencyType) => ({
          ...competency,
          value: Math.min(10, Math.max(1, competency.value + adjustment)),
        }),
      });
    },
    [dispatch]
  );

  const competencyValue = useMemo(() => {
    return activeIndex !== null ? wheel.competencies[activeIndex].value : 5;
  }, [activeIndex, wheel]);

  return (
    activeIndex !== null && (
      <div className="competency-value-controllers flex flex-row gap-2">
        <Button onClick={() => handleValueAdjust(1)} variant="secondary">
          <ChevronUpIcon className="h-6 w-6" />
        </Button>
        <InputField
          id="competencyValue"
          label="Value"
          placeholder="5"
          value={competencyValue}
          onChange={handleValueChange}
          type="number"
          min={1}
          max={10}
        />
        <Button onClick={() => handleValueAdjust(-1)} variant="secondary">
          <ChevronDownIcon className="h-6 w-6" />
        </Button>
      </div>
    )
  );
};

export default CompetencyValue;
