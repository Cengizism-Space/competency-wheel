import React from "react";
import { render } from "@testing-library/react";
import App from "../../../src/components/App";
import Wheel from "../../../src/components/Wheel";

jest.mock("../../../src/components/Wheel", () => {
  return jest.fn(() => null);
});

jest.mock("../../../src/context", () => {
  return {
    CompetenciesProvider: ({ children }: { children?: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

describe("App", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { asFragment } = render(<App slug="test-slug" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("passes the slug prop to the Wheel component", () => {
    render(<App slug="test-slug" />);

    expect(Wheel).toHaveBeenCalledWith({ slug: "test-slug" }, {});
  });

  it("renders the Wheel component without a slug prop if none is provided", () => {
    render(<App />);

    expect(Wheel).toHaveBeenCalledWith({ slug: null }, {});
  });
});
