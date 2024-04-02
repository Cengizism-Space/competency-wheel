import { createContext } from "react";
import { WheelType, CompetencyType } from "@/../typings";

export interface CompetencyContextType {
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  wheel: WheelType;
  setWheel: React.Dispatch<React.SetStateAction<WheelType>>;
  fetchedWheel: WheelType | null;
  templates: WheelType[];
  setTemplates: React.Dispatch<React.SetStateAction<WheelType[]>>;
  svgRef: React.MutableRefObject<SVGSVGElement | null>;
  saving: boolean;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
  savedLink: string | undefined;
  setSavedLink: React.Dispatch<React.SetStateAction<string | undefined>>;
  deleting: boolean;
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  updateCompetency: (update: (competency: CompetencyType) => void) => void;
  reset: () => void;
}

export const CompetenciesContext = createContext<
  CompetencyContextType | undefined
>(undefined);
