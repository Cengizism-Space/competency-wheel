import { createContext, useReducer, useRef, useEffect } from "react";
import { CompetencyContextType } from "@/../typings";
import { CompetenciesReducer } from "./reducer";
import { DEFAULT_WHEEL } from "./constants";
import { isEqual } from "lodash";

export const CompetenciesContext = createContext<
  CompetencyContextType | undefined
>(undefined);

export const CompetenciesProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(CompetenciesReducer, {
    activeIndex: null,
    activeLabelCoords: { x: 0, y: 0 },
    wheel: DEFAULT_WHEEL,
    initialWheel: null,
    templates: [],
    svgRef: useRef<SVGSVGElement | null>(null),
    link: undefined,
    isFound: false,
    isExportable: false,
    isInitial: true,
    isEditing: true,
  });

  useEffect(() => {
    const isExportable =
      state.wheel.title.length > 0 && state.wheel.competencies.length > 0;
    const isInitial = isEqual(state.wheel, state.initialWheel);
    const link = state.wheel.hasOwnProperty("_id")
      ? `${window.location.origin}/wheel/${state.wheel?.slug.current}`
      : state.link;

    if (
      isExportable !== state.isExportable ||
      isInitial !== state.isInitial ||
      link !== state.link
    ) {
      dispatch({
        type: "setState",
        payload: {
          isExportable,
          isInitial,
          link,
        },
      });
    }
  }, [
    state.wheel,
    state.initialWheel,
    state.isExportable,
    state.isInitial,
    state.link,
  ]);

  return (
    <CompetenciesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CompetenciesContext.Provider>
  );
};
