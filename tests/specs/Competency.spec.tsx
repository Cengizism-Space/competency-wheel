import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CompetenciesContext } from "@/context";
import Competency from "../../src/components/Competency";
import { defaultState, DEFAULT_WHEEL } from "../../src/constants";

describe("Competency", () => {
  const mockDispatch = jest.fn();
  const mockContext = {
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
    const { getByText } = render(
      <CompetenciesContext.Provider
        value={{
          ...defaultState,
          ...mockContext,
        }}
      >
        <Competency />
      </CompetenciesContext.Provider>
    );

    expect(getByText("Competency")).toBeInTheDocument();
  });

  it("handles title change", () => {
    const { getByLabelText } = render(
      <CompetenciesContext.Provider
        value={{
          ...defaultState,
          ...mockContext,
          dispatch: mockDispatch,
          wheel: {
            ...mockContext.wheel,
            competencies: [
              {
                title: "Existing Competency",
                value: 5,
                improvement: false,
                description: "Test description",
              },
            ],
          },
        }}
      >
        <Competency />
      </CompetenciesContext.Provider>
    );

    fireEvent.change(getByLabelText("Title"), {
      target: { value: "New Title" },
    });
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("handles description change", () => {
    const { getByLabelText } = render(
      <CompetenciesContext.Provider
        value={{
          ...defaultState,
          ...mockContext,
        }}
      >
        <Competency />
      </CompetenciesContext.Provider>
    );

    fireEvent.change(getByLabelText("Description (Optional)"), {
      target: { value: "New Description" },
    });
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("handles value change", () => {
    const { container } = render(
      <CompetenciesContext.Provider
        value={{
          ...defaultState,
          ...mockContext,
        }}
      >
        <Competency />
      </CompetenciesContext.Provider>
    );

    const input = container.querySelector(
      "#competencyValue"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "7" } });
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("handles form submission", () => {
    const { getByText } = render(
      <CompetenciesContext.Provider
        value={{
          ...defaultState,
          ...mockContext,
        }}
      >
        <Competency />
      </CompetenciesContext.Provider>
    );

    fireEvent.click(getByText("Update"));
    expect(mockDispatch).toHaveBeenCalled();
  });
});
