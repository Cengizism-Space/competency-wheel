import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "../../../src/app/page";

describe("Page", () => {
  test("renders Page component", () => {
    render(<Page />);

    expect(screen.getByTestId("landing-page")).toBeInTheDocument();
  });
});
