import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "../../../src/app/wheel/page";

declare module "react" {
  let unstable_createRoot: any;
}

jest.mock("../../../src/components/App", () => () => <div>App</div>);
jest.mock("@/components/LoadingWheel", () => () => <div>LoadingWheel</div>);

describe("Page", () => {
  // it("renders the loading wheel initially", () => {
  //   render(<Page />);
  //   expect(screen.getByText("LoadingWheel")).toBeInTheDocument();
  // });

  it("renders the App component after suspense", async () => {
    render(<Page />);

    const appElement = await screen.findByText("App");
    expect(appElement).toBeInTheDocument();
  });
});
