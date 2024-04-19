import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../../src/components/Button";

describe("Button", () => {
  it("renders correctly", () => {
    const { getByRole } = render(<Button>Test</Button>);
    const button = getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Test");
  });

  it("applies the correct styles for each variant", () => {
    const { rerender, getByRole } = render(
      <Button variant="primary">Test</Button>
    );

    expect(getByRole("button")).toHaveClass("bg-indigo-600");

    rerender(<Button variant="secondary">Test</Button>);
    expect(getByRole("button")).toHaveClass("bg-white");

    rerender(<Button variant="link">Test</Button>);
    expect(getByRole("button")).toHaveClass("hover:text-gray-700 focus:none");

    rerender(<Button variant="danger">Test</Button>);
    expect(getByRole("button")).toHaveClass("bg-red-600");
  });

  it("handles onClick event", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Test</Button>);

    fireEvent.click(getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
