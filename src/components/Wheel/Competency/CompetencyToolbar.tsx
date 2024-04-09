import React, { useCallback, useContext } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyType, CompetencyContextType } from "../../../../typings";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/Commons/Button";

const CompetencyToolbar: React.FC = () => {
  const { wheel, activeIndex, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

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
    activeIndex !== null && (
      <div className="competency-value-controllers absolute top-0 right-0 flex flex-row gap-2">
        <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
          <Button
            className="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
            title="Increase competency value"
            onClick={() => handleValueAdjust(1)}
            variant="secondary"
          >
            <ChevronUpIcon className="h-5 w-5" />
          </Button>

          <Button
            className="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
            title="Decrease competency value"
            onClick={() => handleValueAdjust(-1)}
            variant="secondary"
          >
            <ChevronDownIcon className="h-5 w-5" />
          </Button>
        </span>

        <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
          <Button
            className="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
            title="Delete competency"
            onClick={handleRemove}
            variant="secondary"
          >
            <TrashIcon className="h-5 w-5" />
          </Button>
        </span>
      </div>
    )
  );
};

export default CompetencyToolbar;
