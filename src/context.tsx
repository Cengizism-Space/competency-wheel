import { createContext } from "react";
import { WheelType, CompetencyType } from "@/../typings";

export interface CompetencyContextType {
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  wheel: WheelType;
  setWheel: React.Dispatch<React.SetStateAction<WheelType>>;
  fetchedWheel: WheelType | null;
  setFetchedWheel: React.Dispatch<React.SetStateAction<WheelType | null>>;
  templates: WheelType[];
  setTemplates: React.Dispatch<React.SetStateAction<WheelType[]>>;
  updateCompetency: (update: (competency: CompetencyType) => void) => void;
}

export const CompetenciesContext = createContext<
  CompetencyContextType | undefined
>(undefined);
