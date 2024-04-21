import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "../../../src/app/wheel/page";

jest.mock("../../../src/components/App", () => {
  return ({ slug }: { slug?: string }) => (
    <div>{`App component with slug: ${slug}`}</div>
  );
});

describe("Page", () => {
  // it("renders the App component with correct slug", () => {
  //   const slug = "test-slug";
  //   render(<Page params={{ slug: slug }} />);
  //   expect(
  //     screen.getByText(`App component with slug: ${slug}`)
  //   ).toBeInTheDocument();
  // });

  it("renders the App component with undefined slug when params is undefined", () => {
    render(<Page params={undefined} />);
    expect(
      screen.getByText("App component with slug: undefined")
    ).toBeInTheDocument();
  });
});
