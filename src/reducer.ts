import { produce } from "immer";
import { Action, State } from "../types/app";

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

    default:
      throw new Error();
  }
});