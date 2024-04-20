import { CompetenciesReducer } from "../../src/reducer";
import { defaultState, DEFAULT_WHEEL } from "../../src/constants";
import { CompetencyType, State } from "../../typings";

describe("CompetenciesReducer", () => {
  let initialState: State;

  beforeEach(() => {
    initialState = {
      ...defaultState,
      activeIndex: null,
      wheel: {
        ...DEFAULT_WHEEL,
        competencies: [
          {
            title: "Competency 1",
            description: "",
            value: 0,
            improvement: false,
          },
          {
            title: "Competency 2",
            description: "",
            value: 0,
            improvement: false,
          },
          {
            title: "Competency 3",
            description: "",
            value: 0,
            improvement: false,
          },
        ],
      },
    };
  });

  it("should handle setState action", () => {
    const action = {
      type: "setState" as const,
      payload: { activeIndex: 1 },
    };
    const newState = CompetenciesReducer(initialState, action);

    expect(newState.activeIndex).toBe(1);
  });

  it("should handle updateCompetency action", () => {
    const action = {
      type: "updateCompetency" as const,
      payload: (competency: CompetencyType) => ({
        ...competency,
        title: "Updated Competency",
      }),
    };
    initialState.activeIndex = 1;
    const newState = CompetenciesReducer(initialState, action);

    expect(newState.wheel.competencies[1].title).toBe("Updated Competency");
  });

  it("should throw an error for unknown action type", () => {
    const action = { type: "reset" as const };

    expect(() => CompetenciesReducer(initialState, action)).toThrow(Error);
  });
});
