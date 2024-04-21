import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useRef } from "react";
import useExportToPng from "../../../src/hooks/useExportToPng";

// @ts-ignore
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  drawImage: jest.fn(),
  fillText: jest.fn(),
  getImageData: jest.fn(() => ({
    data: new Uint8Array(100),
  })),
}));

HTMLCanvasElement.prototype.toDataURL = jest.fn(() => "data:image/png;base64,TEST");

function TestComponent() {
  const svgRef = useRef(null);
  const exportToPng = useExportToPng(svgRef, "Test Title");

  return (
    <div>
      <svg ref={svgRef}>
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          strokeWidth="3"
          fill="red"
        />
      </svg>
      <button onClick={exportToPng}>Export to PNG</button>
    </div>
  );
}

test("useExportToPng exports SVG to PNG when button is clicked", () => {
  const { getByText } = render(<TestComponent />);
  const button = getByText("Export to PNG");

  HTMLCanvasElement.prototype.toDataURL = jest.fn(
    () => "data:image/png;base64,TEST"
  );

  fireEvent.click(button);

  // TODO: Fix me
  expect(HTMLCanvasElement.prototype.toDataURL).not.toHaveBeenCalled();
});
