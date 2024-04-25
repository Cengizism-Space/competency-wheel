import React from "react";
import { render } from "@testing-library/react";
import { CompetenciesProvider, CompetenciesContext } from "../../src/context";
import { defaultState } from "../../src/constants";
import { CompetencyContextType } from "../../types/app";

describe("CompetenciesProvider", () => {
  it("provides the initial state", () => {
    let receivedState: CompetencyContextType | undefined | null = null;

    render(
      <CompetenciesProvider>
        <CompetenciesContext.Consumer>
          {(state) => {
            receivedState = state;
            return null;
          }}
        </CompetenciesContext.Consumer>
      </CompetenciesProvider>
    );

    expect(receivedState).toEqual({
      ...defaultState,
      svgRef: expect.any(Object),
      dispatch: expect.any(Function),
    });
  });
});
