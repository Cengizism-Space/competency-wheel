import { produce } from "immer";
import { CompetencyType, WheelType } from "../typings";
import { DEFAULT_WHEEL } from "./constants";

export type State = {
  activeIndex: number | null;
  wheel: WheelType;
  fetchedWheel: WheelType | null;
  templates: WheelType[];
  svgRef: React.MutableRefObject<SVGSVGElement | null>;
  saving: boolean;
  savedLink: string | undefined;
  deleting: boolean;
};

export type Action =
  | { type: 'setActiveIndex'; payload: number | null }
  | { type: 'setState'; payload: Partial<State> }
  | { type: 'updateCompetency'; payload: (competency: CompetencyType) => number }
  | { type: 'reset' };

export const CompetenciesReducer = produce((draft: State, action: Action) => {
  switch (action.type) {
    case 'setActiveIndex':
      draft.activeIndex = action.payload;
      break;
    case 'setState':
      return { ...draft, ...action.payload };
    case 'updateCompetency':
      if (draft.activeIndex !== null) {
        draft.wheel.competencies[draft.activeIndex].value = action.payload(draft.wheel.competencies[draft.activeIndex]);
      }
      break;
    case 'reset':
      if (typeof window !== "undefined") {
        history.replaceState({}, "", `${window.location.origin}/`);
      }

      return {
        activeIndex: null,
        wheel: DEFAULT_WHEEL,
        fetchedWheel: null,
        templates: [],
        svgRef: draft.svgRef,
        saving: false,
        savedLink: undefined,
        deleting: false,
      };
    default:
      throw new Error();
  }
});