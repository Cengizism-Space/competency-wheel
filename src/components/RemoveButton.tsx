import { CompetencyType } from "@/constants";
import React, { useCallback } from "react";

interface RemoveButtonProps {
  competencies: CompetencyType[];
  setCompetencies: React.Dispatch<React.SetStateAction<CompetencyType[]>>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({
  competencies,
  setCompetencies,
  activeIndex,
  setActiveIndex,
}) => {
  const handleRemove = useCallback(() => {
    if (activeIndex !== null && competencies.length > 1) {
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
