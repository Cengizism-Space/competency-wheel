import React, { useCallback, useContext } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../../../typings";
import Button from "@/components/Commons/Button";

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
    activeIndex !== null && (
      <div className="competency-remove">
        <Button onClick={handleRemove} variant="secondary">
          Remove
        </Button>
      </div>
    )
  );
};

export default CompetencyRemoval;
