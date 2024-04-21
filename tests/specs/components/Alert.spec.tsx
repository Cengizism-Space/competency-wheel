import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CompetenciesContext } from "../../../src/context";
import Alert from "../../../src/components/Alert";
import { defaultState } from "../../../src/constants";

describe("Alert", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Alert component when isErrored and errorMessage are truthy", () => {
    render(
      <CompetenciesContext.Provider
        value={{
          ...defaultState,
          isErrored: true,
          errorMessage: "Error message",
          dispatch: mockDispatch,
        }}
      >
        <Alert />
      </CompetenciesContext.Provider>
    );

    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  test("does not render Alert component when isErrored and errorMessage are falsy", () => {
    render(
      <CompetenciesContext.Provider
        value={{
          ...defaultState,
          isErrored: false,
          errorMessage: "",
          dispatch: mockDispatch,
        }}
      >
        <Alert />
      </CompetenciesContext.Provider>
    );

    expect(screen.queryByText("Error message")).not.toBeInTheDocument();
  });

  test("calls handleClose function when close button is clicked", () => {
    render(
      <CompetenciesContext.Provider
        value={{
          ...defaultState,
          isErrored: true,
          errorMessage: "Error message",
          dispatch: mockDispatch,
        }}
      >
        <Alert />
      </CompetenciesContext.Provider>
    );

    fireEvent.click(screen.getByLabelText("Close"));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "setState",
      payload: { isErrored: false, errorMessage: "" },
    });
  });
});
