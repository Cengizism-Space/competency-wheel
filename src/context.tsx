import { createContext, useReducer, useRef, useEffect } from "react";
import { CompetencyContextType } from "@/../typings";
import { CompetenciesReducer } from "./reducer";
import { DEFAULT_TITLE, DEFAULT_WHEEL } from "./constants";
import { isEqual } from "lodash";

export const CompetenciesContext = createContext<
  CompetencyContextType | undefined
>(undefined);

export const CompetenciesProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(CompetenciesReducer, {
    activeIndex: null,
    wheel: DEFAULT_WHEEL,
    initialWheel: null,
    templates: [],
    svgRef: useRef<SVGSVGElement | null>(null),
    link: undefined,
    isAdjusted: false,
    isExportable: false,
    isInitial: true,
  });

  useEffect(() => {
    if (
      state.wheel.title !== DEFAULT_TITLE ||
      state.wheel.competencies.length > 0
    ) {
      dispatch({
        type: "setState",
        payload: {
          isAdjusted: true,
        },
      });
    }

    if (state.wheel.title.length > 0 && state.wheel.competencies.length > 0) {
      dispatch({
        type: "setState",
        payload: {
          isExportable: true,
        },
      });
    }

    dispatch({
      type: "setState",
      payload: {
        isInitial: isEqual(state.wheel, state.initialWheel),
      },
    });
  }, [state.wheel]);

  return (
    <CompetenciesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CompetenciesContext.Provider>
  );
};
