import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import useContainerDimensions from "../../src/hooks/useContainerDimensions";

// @ts-ignore
global.ResizeObserver = class ResizeObserver {
  // @ts-ignore
  constructor(callback) {
    // @ts-ignore
    this.callback = callback;
  }
  observe() {
    // @ts-ignore
    this.callback([
      {
        contentRect: {
          width: 100,
          height: 200,
        },
      },
    ]);
  }
  disconnect() {}
};

const TestComponent = () => {
  const [ref, dimensions] = useContainerDimensions();

  return (
    <div ref={ref}>
      Width: {dimensions.width}, Height: {dimensions.height}
    </div>
  );
};

describe("useContainerDimensions", () => {
  it("should update dimensions when container size changes", () => {
    const { getByText } = render(<TestComponent />);

    expect(getByText("Width: 100, Height: 200")).toBeInTheDocument();
  });
});
