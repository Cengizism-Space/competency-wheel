import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotFound from "../../../src/app/not-found";

describe("NotFound", () => {
  test("renders NotFound component", () => {
    render(<NotFound />);

    expect(screen.getByText("That page can not be found.")).toBeInTheDocument();
    expect(screen.getByText("Go Back Home")).toBeInTheDocument();
  });

  test("Go Back Home link points to the correct page", () => {
    render(<NotFound />);

    expect(screen.getByText("Go Back Home")).toHaveAttribute("href", "/");
  });
});
