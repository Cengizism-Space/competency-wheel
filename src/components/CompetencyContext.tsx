import { createContext, useState, FC, ReactNode } from "react";
import { CompetencyType, UXCompetencies } from "../constants";

export interface CompetencyContextType {
  competencies: CompetencyType[];
  setCompetencies: React.Dispatch<React.SetStateAction<CompetencyType[]>>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export const CompetencyContext = createContext<
  CompetencyContextType | undefined
>(undefined);

export const CompetencyProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [competencies, setCompetencies] =
    useState<CompetencyType[]>(UXCompetencies);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <CompetencyContext.Provider
      value={{ competencies, setCompetencies, activeIndex, setActiveIndex }}
    >
      {children}
    </CompetencyContext.Provider>
  );
};
