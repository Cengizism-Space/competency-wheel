import { produce } from "immer";
import { DEFAULT_WHEEL } from "./constants";
import { Action, State } from "../typings";

export const CompetenciesReducer = produce((draft: State, action: Action) => {
  switch (action.type) {
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