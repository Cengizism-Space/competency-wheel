import React, { createContext, useReducer, useRef, useEffect } from "react";
import { CompetencyContextType } from "@/../typings";
import { CompetenciesReducer } from "./reducer";
import { defaultState } from "./constants";
import { isEqual } from "lodash";

export const CompetenciesContext = createContext<
  CompetencyContextType | undefined
>(undefined);

export const CompetenciesProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [state, dispatch] = useReducer(CompetenciesReducer, {
    ...defaultState,
    svgRef,
  });

  useEffect(() => {
    const isExportable =
      state.wheel.title.length > 0 && state.wheel.competencies.length > 0;
    const isInitial = isEqual(state.wheel, state.initialWheel);
    const link = state.wheel.hasOwnProperty("_id")
      ? `${window.location.origin}/wheel/${state.wheel?.slug.current}`
      : state.link;
    const isEmpty = state.wheel.competencies.length === 0;

    if (
      isExportable !== state.isExportable ||
      isInitial !== state.isInitial ||
      link !== state.link ||
      isEmpty !== state.isEmpty
    ) {
      dispatch({
        type: "setState",
        payload: {
          isExportable,
          isInitial,
          link,
          isEmpty,
        },
      });
    }
  }, [
    state.wheel,
    state.initialWheel,
    state.isExportable,
    state.isInitial,
    state.link,
    state.isEmpty,
  ]);

  return (
    <CompetenciesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CompetenciesContext.Provider>
  );
};
