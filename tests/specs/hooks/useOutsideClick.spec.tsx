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

  it("does not call the callback when clicked on .competency-value-controllers, .competency-remove, or form", () => {
    const callback = jest.fn();
  
    function TestComponent() {
      const ref = useRef(null);
      useOutsideClick(ref, callback);
  
      return (
        <div>
          <div ref={ref}>
            <div className="competency-value-controllers">Test 1</div>
            <div className="competency-remove">Test 2</div>
            <form>Test 3</form>
          </div>
        </div>
      );
    }
  
    const { getByText } = render(<TestComponent />);
    fireEvent.mouseDown(getByText("Test 1"));
    fireEvent.mouseDown(getByText("Test 2"));
    fireEvent.mouseDown(getByText("Test 3"));
  
    expect(callback).not.toHaveBeenCalled();
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
