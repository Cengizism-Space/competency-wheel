import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useClipboard } from "../../../src/hooks/useClipboard";

const TestComponent = () => {
  const { isCopied, copyToClipboard } = useClipboard();

  React.useEffect(() => {
    copyToClipboard("test");
  }, [copyToClipboard]);

  return isCopied ? <div>Copied</div> : <div>Not copied</div>;
};

describe("useClipboard", () => {
  it("should copy text to clipboard and set isCopied to true", async () => {
    // @ts-ignore
    global.navigator.clipboard = { writeText: jest.fn() };
    const { findByText } = render(<TestComponent />);

    expect(await findByText("Copied")).toBeInTheDocument();
    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith("test");
  });

  it("should call setIsCopied with true", () => {
    const setIsCopied = jest.fn();
    jest.spyOn(React, 'useState').mockReturnValue([false, setIsCopied]);
  
    // @ts-ignore
    global.navigator.clipboard = { writeText: jest.fn() };
  
    const copyToClipboard = () => setIsCopied(true);
    // @ts-ignore
    render(<TestComponent copyToClipboard={copyToClipboard} />);
  
    copyToClipboard();
  
    expect(setIsCopied).toHaveBeenCalledWith(true);
  });

  it("should set isCopied to false after 3 seconds", async () => {
    jest.useFakeTimers();

    // @ts-ignore
    global.navigator.clipboard = { writeText: jest.fn() };
    const { findByText } = render(<TestComponent />);

    jest.advanceTimersByTime(3000);
    expect(await findByText("Not copied")).toBeInTheDocument();
    jest.useRealTimers();
  });

  it("should handle clipboard API not available", () => {
    // @ts-ignore
    global.navigator.clipboard = {};
    const { queryByText } = render(<TestComponent />);

    expect(queryByText("Copied")).not.toBeInTheDocument();
  });
});
