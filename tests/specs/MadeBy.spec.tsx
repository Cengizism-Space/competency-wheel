import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MadeBy from "../../src/components/MadeBy";

describe("MadeBy", () => {
  test("renders MadeBy component", () => {
    render(<MadeBy />);

    expect(screen.getByTestId("made-by")).toBeInTheDocument();
    expect(screen.getByText("Cengizism")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Cengizism/i })).toHaveAttribute(
      "href",
      "https://github.com/cengizism-Space/competency-wheel"
    );
  });
});
