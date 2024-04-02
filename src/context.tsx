import { createContext, useReducer, useRef } from "react";
import { WheelType } from "@/../typings";
import { CompetenciesReducer } from "./reducer";
import { DEFAULT_WHEEL } from "./constants";

interface CompetencyContextType {
  activeIndex: number | null;
  wheel: WheelType;
  fetchedWheel: WheelType | null;
  templates: WheelType[];
  svgRef: React.MutableRefObject<SVGSVGElement | null>;
  saving: boolean;
  savedLink: string | undefined;
  deleting: boolean;
  dispatch: React.Dispatch<any>;
}

export const CompetenciesContext = createContext<
  CompetencyContextType | undefined
>(undefined);

export const CompetenciesProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(CompetenciesReducer, {
    activeIndex: null,
    wheel: DEFAULT_WHEEL,
    fetchedWheel: null,
    templates: [],
    svgRef: useRef<SVGSVGElement | null>(null),
    saving: false,
    savedLink: undefined,
    deleting: false,
  });

  return (
    <CompetenciesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CompetenciesContext.Provider>
  );
};
