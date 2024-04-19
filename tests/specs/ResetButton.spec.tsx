import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResetButton from "../../src/components/ResetButton";

describe("ResetButton", () => {
  test("renders ResetButton component and checks the text", () => {
    render(<ResetButton />);

    const resetText = screen.getByText(/Restart/i);
    expect(resetText).toBeInTheDocument();
  });

  test("renders ResetButton component without crashing", () => {
    const { container } = render(<ResetButton />);

    expect(container).toBeTruthy();
  });

  test("checks if the icon is present", () => {
    render(<ResetButton />);

    const icon = screen.getByTestId("reset-icon");
    expect(icon).toBeInTheDocument();
  });

  test("checks if the link has the correct href", () => {
    render(<ResetButton />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });
});
