import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingWheel from "../../src/components/LoadingWheel";

describe("LoadingWheel", () => {
  test("renders LoadingWheel component", () => {
    render(<LoadingWheel />);

    expect(screen.getByText("Loading")).toBeInTheDocument();
    expect(
      screen.getByText("Fetching the requested competency wheel")
    ).toBeInTheDocument();
  });
});
