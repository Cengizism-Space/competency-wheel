import { createContext, useState, FC, ReactNode } from "react";
import { CompetencyType } from "../constants";

export interface CompetencyContextType {
  competencies: CompetencyType[];
  setCompetencies: React.Dispatch<React.SetStateAction<CompetencyType[]>>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  template: CompetencyType[];
  setTemplate: React.Dispatch<React.SetStateAction<CompetencyType[]>>;
  updateCompetency: (update: (competency: CompetencyType) => void) => void;
}

export const CompetencyContext = createContext<
  CompetencyContextType | undefined
>(undefined);

export const CompetencyProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [competencies, setCompetencies] = useState<CompetencyType[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [template, setTemplate] = useState<CompetencyType[]>([]);

  const updateCompetency = (update: (competency: CompetencyType) => void) => {
    if (activeIndex !== null) {
      const updatedCompetencies = [...competencies];
      update(updatedCompetencies[activeIndex]);
      setCompetencies(updatedCompetencies);
    }
  };

  return (
    <CompetencyContext.Provider
      value={{
        competencies,
        setCompetencies,
        activeIndex,
        setActiveIndex,
        template,
        setTemplate,
        updateCompetency,
      }}
    >
      {children}
    </CompetencyContext.Provider>
  );
};
