import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useRef } from "react";
import useOutsideClick from "../../../src/hooks/useOutsideClick";

describe("useOutsideClick", () => {
  it("calls the callback when clicked outside", () => {
    const callback = jest.fn();

    function TestComponent() {
      const ref = useRef(null);
      useOutsideClick(ref, callback);

      return <div ref={ref}>Test</div>;
    }

    const { container } = render(<TestComponent />);
    fireEvent.mouseDown(container);

    expect(callback).toHaveBeenCalled();
  });

  it("does not call the callback when clicked inside", () => {
    const callback = jest.fn();

    function TestComponent() {
      const ref = useRef(null);
      useOutsideClick(ref, callback);

      return <div ref={ref}>Test</div>;
    }

    const { getByText } = render(<TestComponent />);
    fireEvent.mouseDown(getByText("Test"));

    expect(callback).not.toHaveBeenCalled();
  });
});
