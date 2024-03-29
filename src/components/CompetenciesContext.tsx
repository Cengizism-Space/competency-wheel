import { createContext, useState, FC, ReactNode } from "react";
import { WheelType, CompetencyType } from "@/../typings";

export interface CompetencyContextType {
  competencies: CompetencyType[];
  setCompetencies: React.Dispatch<React.SetStateAction<CompetencyType[]>>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  template: CompetencyType[];
  setTemplate: React.Dispatch<React.SetStateAction<CompetencyType[]>>;
  updateCompetency: (update: (competency: CompetencyType) => void) => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  templates: WheelType[];
  setTemplates: React.Dispatch<React.SetStateAction<WheelType[]>>;
}

export const CompetenciesContext = createContext<
  CompetencyContextType | undefined
>(undefined);

export const CompetenciesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [competencies, setCompetencies] = useState<CompetencyType[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [template, setTemplate] = useState<CompetencyType[]>([]);
  const [title, setTitle] = useState("Competency Chart");
  const [templates, setTemplates] = useState<WheelType[]>([]);

  const updateCompetency = (update: (competency: CompetencyType) => void) => {
    if (activeIndex !== null) {
      const updatedCompetencies = [...competencies];
      update(updatedCompetencies[activeIndex]);
      setCompetencies(updatedCompetencies);
    }
  };

  return (
    <CompetenciesContext.Provider
      value={{
        competencies,
        setCompetencies,
        activeIndex,
        setActiveIndex,
        template,
        setTemplate,
        updateCompetency,
        title,
        setTitle,
        templates,
        setTemplates,
      }}
    >
      {children}
    </CompetenciesContext.Provider>
  );
};
