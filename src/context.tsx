import React, { createContext, useReducer, useRef } from "react";
import { CompetencyContextType } from "@/../typings";
import { CompetenciesReducer } from "./reducer";
import { defaultState } from "./constants";

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

  return (
    <CompetenciesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CompetenciesContext.Provider>
  );
};
