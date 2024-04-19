import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CompetenciesContext } from "@/context";
import CompetencyToolbar from "../../src/components/CompetencyToolbar";
import { defaultState, DEFAULT_WHEEL } from "../../src/constants";

describe("CompetencyToolbar", () => {
  const mockDispatch = jest.fn(),
    mockContext = {
      ...defaultState,
      wheel: {
        ...DEFAULT_WHEEL,
        competencies: [
          {
            title: "Test",
            value: 5,
            improvement: false,
            description: "Test description",
          },
        ],
      },
      activeIndex: 0,
      dispatch: mockDispatch,
    };

  it("renders correctly", () => {
    const { container } = render(
      <CompetenciesContext.Provider value={mockContext}>
        <CompetencyToolbar />
      </CompetenciesContext.Provider>
    );

    expect(container).toBeInTheDocument();
  });

  it("renders buttons and icons", () => {
    const { getByTitle } = render(
      <CompetenciesContext.Provider value={mockContext}>
        <CompetencyToolbar />
      </CompetenciesContext.Provider>
    );

    expect(getByTitle("Decrease competency value")).toBeInTheDocument();
    expect(getByTitle("Increase competency value")).toBeInTheDocument();
    expect(getByTitle("Want to improve!")).toBeInTheDocument();
    expect(getByTitle("Delete competency")).toBeInTheDocument();

    expect(screen.getByTestId("minus-icon")).toBeInTheDocument();
    expect(screen.getByTestId("plus-icon")).toBeInTheDocument();
    expect(screen.getByTestId("rocket-launch-icon")).toBeInTheDocument();
    expect(screen.getByTestId("trash-icon")).toBeInTheDocument();
  });

  it("calls the correct functions when buttons are clicked", () => {
    const { getByTitle } = render(
      <CompetenciesContext.Provider value={mockContext}>
        <CompetencyToolbar />
      </CompetenciesContext.Provider>
    );

    fireEvent.click(getByTitle("Decrease competency value"));
    fireEvent.click(getByTitle("Increase competency value"));
    fireEvent.click(getByTitle("Want to improve!"));
    fireEvent.click(getByTitle("Delete competency"));

    expect(mockDispatch).toHaveBeenCalledTimes(4);
  });
});
