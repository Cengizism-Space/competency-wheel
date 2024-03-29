import { createContext, useState, FC, ReactNode } from "react";
import { WheelType, CompetencyType } from "@/../typings";
import { DEFAULT_TITLE, DEFAULT_WHEEL } from "@/constants";

export interface CompetencyContextType {
  competencies: CompetencyType[];
  setCompetencies: React.Dispatch<React.SetStateAction<CompetencyType[]>>;

  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;

  wheel: WheelType;
  setWheel: React.Dispatch<React.SetStateAction<WheelType>>;

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

  const [wheel, setWheel] = useState<WheelType>(DEFAULT_WHEEL);

  const [title, setTitle] = useState(DEFAULT_TITLE);

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

        wheel,
        setWheel,

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
