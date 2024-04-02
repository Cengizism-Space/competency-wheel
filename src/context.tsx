import {
  createContext,
  useReducer,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { CompetencyContextType } from "@/../typings";
import { CompetenciesReducer } from "./reducer";
import { DEFAULT_WHEEL } from "./constants";
import { fetchTemplates } from "@/sanity";

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

  const fetchAndSetTemplates = useCallback(async () => {
    const templates = await fetchTemplates();
    dispatch({ type: "setState", payload: { templates: templates } });
  }, [dispatch]);

  useEffect(() => {
    fetchAndSetTemplates();
  }, [fetchAndSetTemplates]);

  return (
    <CompetenciesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CompetenciesContext.Provider>
  );
};
