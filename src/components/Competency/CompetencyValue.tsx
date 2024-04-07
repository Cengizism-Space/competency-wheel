import React, { ChangeEvent, useCallback, useMemo, useContext } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyType, CompetencyContextType } from "../../../typings";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

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
        <button
          onClick={() => handleValueAdjust(1)}
          className="block w-full rounded bg-red-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
        >
          <ChevronUpIcon className="h-6 w-6" />
        </button>

        <label
          htmlFor="competencyValue"
          className="block overflow-hidden rounded-md border bg-white border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <span className="text-xs font-medium text-gray-700"> Value </span>

          <input
            type="number"
            id="competencyValue"
            placeholder="5"
            value={competencyValue}
            onChange={handleValueChange}
            min="1"
            max="10"
            className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
        </label>

        <button
          onClick={() => handleValueAdjust(-1)}
          className="block w-full rounded bg-red-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
        >
          <ChevronDownIcon className="h-6 w-6" />
        </button>
      </div>
    )
  );
};

export default CompetencyValue;
