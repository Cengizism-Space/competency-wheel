import { produce } from "immer";
import { DEFAULT_WHEEL } from "./constants";
import { Action, State } from "../typings";

export const CompetenciesReducer = produce((draft: State, action: Action) => {
  switch (action.type) {
    case 'setState':
      return { ...draft, ...action.payload };
      case 'updateCompetency':
        if (draft.activeIndex !== null) {
          const updatedCompetency = action.payload(draft.wheel.competencies[draft.activeIndex]);
          draft.wheel.competencies[draft.activeIndex] = updatedCompetency;
        }
        break;
    case 'reset':
      if (typeof window !== "undefined") {
        history.replaceState({}, "", `${window.location.origin}/`);
      }
      draft.activeIndex = null;
      draft.wheel = DEFAULT_WHEEL;
      draft.fetchedWheel = null;
      draft.templates = [];
      draft.savedLink = undefined;
      break;
    default:
      throw new Error();
  }
});