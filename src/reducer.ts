import { produce } from "immer";
import { DEFAULT_WHEEL } from "./constants";
import { Action, State } from "../typings";

export const CompetenciesReducer = produce((draft: State, action: Action) => {
  switch (action.type) {
    case 'setState':
      Object.assign(draft, action.payload);
      break;

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
      draft.activeLabelCoords = { x: 0, y: 0 };
      draft.wheel = DEFAULT_WHEEL;
      draft.initialWheel = null;
      draft.templates = [];
      draft.link = undefined;
      draft.isFound = false;
      draft.isExportable = false;
      draft.isInitial = true;
      break;

    default:
      throw new Error();
  }
});