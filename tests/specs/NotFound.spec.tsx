import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotFound from "../../src/components/NotFound";

describe("NotFound component", () => {
  it("renders without crashing", () => {
    render(<NotFound>Test</NotFound>);

    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders the children prop", () => {
    render(<NotFound>Test</NotFound>);

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("renders the static texts", () => {
    render(<NotFound>Test</NotFound>);

    expect(screen.getByText("Was it here before?")).toBeInTheDocument();
  });
});
