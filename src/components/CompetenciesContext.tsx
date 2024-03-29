import { createContext, useState, FC, ReactNode, useCallback } from "react";
import { WheelType, CompetencyType } from "@/../typings";
import { DEFAULT_WHEEL } from "@/constants";

export interface CompetencyContextType {
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  wheel: WheelType;
  setWheel: React.Dispatch<React.SetStateAction<WheelType>>;
  templates: WheelType[];
  setTemplates: React.Dispatch<React.SetStateAction<WheelType[]>>;
  updateCompetency: (update: (competency: CompetencyType) => void) => void;
}

export const CompetenciesContext = createContext<
  CompetencyContextType | undefined
>(undefined);

export const CompetenciesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [wheel, setWheel] = useState<WheelType>(DEFAULT_WHEEL);
  const [templates, setTemplates] = useState<WheelType[]>([]);

  const updateCompetency = useCallback(
    (update: (competency: CompetencyType) => void) => {
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
    },
    [activeIndex, wheel, setWheel]
  );

  return (
    <CompetenciesContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        wheel,
        setWheel,
        templates,
        setTemplates,
        updateCompetency,
      }}
    >
      {children}
    </CompetenciesContext.Provider>
  );
};
