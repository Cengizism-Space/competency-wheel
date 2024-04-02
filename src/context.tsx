import { createContext, useReducer, useRef } from "react";
import { WheelType, CompetencyType } from "@/../typings";
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
  updateCompetency: (update: (competency: CompetencyType) => void) => void;
  reset: () => void;
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

  const updateCompetency = (update: (competency: CompetencyType) => void) => {
    if (state.activeIndex !== null) {
      const updatedCompetencies = [...state.wheel.competencies];
      update(updatedCompetencies[state.activeIndex]);
      dispatch({
        type: "setWheel",
        payload: { ...state.wheel, competencies: updatedCompetencies },
      });
    }
  };

  const reset = () => {
    dispatch({ type: "setWheel", payload: DEFAULT_WHEEL });
    dispatch({ type: "setActiveIndex", payload: null });
    dispatch({ type: "setSavedLink", payload: undefined });
    dispatch({ type: "setSaving", payload: false });
    if (typeof window !== "undefined") {
      history.replaceState({}, "", `${window.location.origin}/`);
    }
  };

  return (
    <CompetenciesContext.Provider
      value={{ ...state, dispatch, updateCompetency, reset }}
    >
      {children}
    </CompetenciesContext.Provider>
  );
};
