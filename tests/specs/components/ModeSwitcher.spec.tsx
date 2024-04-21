import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CompetenciesContext } from "@/context";
import ModeSwitcher, {
  ModeSwitcherButton,
} from "../../../src/components/ModeSwitcher";
import { defaultState, DEFAULT_WHEEL } from "../../../src/constants";

describe("ModeSwitcherButton", () => {
  test("renders ModeSwitcherButton component", () => {
    const onClick = jest.fn();
    render(
      <ModeSwitcherButton onClick={onClick} active={false}>
        Test
      </ModeSwitcherButton>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Test"));
    expect(onClick).toHaveBeenCalled();
  });
});

describe("ModeSwitcher", () => {
  test("renders ModeSwitcher component", () => {
    const mockDispatch = jest.fn(),
      mockContext = {
        ...defaultState,
        wheel: {
          ...DEFAULT_WHEEL,
        },
        isEditing: false,
        dispatch: mockDispatch,
      };

    render(
      <CompetenciesContext.Provider value={mockContext}>
        <ModeSwitcher />
      </CompetenciesContext.Provider>
    );

    expect(screen.getByText("View")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();

    fireEvent.click(screen.getByText("View"));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "setState",
      payload: { isEditing: false },
    });

    fireEvent.click(screen.getByText("Edit"));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "setState",
      payload: { isEditing: true },
    });
  });
});
