import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Landing from "../../../src/components/Landing";
import { CompetenciesProvider } from "../../../src/context";

describe("Landing", () => {
  it("renders the title", () => {
    const { getByText } = render(
      <CompetenciesProvider>
        <Landing />
      </CompetenciesProvider>
    );

    expect(getByText("Competency Wheel")).toBeInTheDocument();
  });

  it("renders the description", () => {
    const { getByText } = render(
      <CompetenciesProvider>
        <Landing />
      </CompetenciesProvider>
    );

    expect(
      getByText(/You can use this tool to create your own competency wheel./i)
    ).toBeInTheDocument();
  });

  it("renders the start link", () => {
    const { getByText } = render(
      <CompetenciesProvider>
        <Landing />
      </CompetenciesProvider>
    );

    expect(getByText("Start with your own wheel")).toBeInTheDocument();
  });

  it("renders the Templates component", () => {
    const { getByTestId } = render(
      <CompetenciesProvider>
        <Landing />
      </CompetenciesProvider>
    );

    expect(getByTestId("wheel-templates")).toBeInTheDocument();
  });

  it("renders the MadeBy component", () => {
    const { getByTestId } = render(
      <CompetenciesProvider>
        <Landing />
      </CompetenciesProvider>
    );

    expect(getByTestId("made-by-component")).toBeInTheDocument();
  });
});
