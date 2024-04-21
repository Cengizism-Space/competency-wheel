import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CompetenciesContext } from "@/context";
import useDrawChart from "../../../src/hooks/useDrawChart";
import * as d3 from "d3";
import { defaultState, DEFAULT_WHEEL } from "../../../src/constants";
import { CompetencyContextType } from "../../../typings";

jest.mock("d3", () => ({
  select: jest.fn().mockReturnThis(),
  selectAll: jest.fn().mockReturnThis(),
  remove: jest.fn().mockReturnThis(),
  attr: jest.fn().mockReturnThis(),
  append: jest.fn().mockReturnThis(),
  on: jest.fn().mockImplementation(function () {
    // @ts-ignore
    if (this._onMock) {
      // @ts-ignore
      this._onMock();
    }
    // @ts-ignore
    return this;
  }),
  text: jest.fn().mockReturnThis(),
  node: jest.fn().mockReturnValue({ appendChild: jest.fn() }),
}));

describe("useDrawChart", () => {
  function createWrapper(context: CompetencyContextType) {
    return ({ children }: { children: React.ReactNode }) => (
      <CompetenciesContext.Provider value={context}>
        {children}
      </CompetenciesContext.Provider>
    );
  }

  it("should call D3 functions to draw the chart", () => {
    const mockDispatch = jest.fn(),
      mockContext = {
        ...defaultState,
        svgRef: { current: {} },
        wheel: {
          ...DEFAULT_WHEEL,
          competencies: [],
        },
        activeIndex: null,
        isEditing: false,
        isFound: true,
        isEmpty: false,
        dispatch: mockDispatch,
      };

    const TestComponent = () => {
      useDrawChart({ dimensions: { width: 100, height: 100 } });
      return <svg ref={mockContext.svgRef as React.RefObject<SVGSVGElement>} />;
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      // @ts-ignore
      <CompetenciesContext.Provider value={mockContext}>
        {children}
      </CompetenciesContext.Provider>
    );

    const { container } = render(<TestComponent />, { wrapper });

    fireEvent.click(container.querySelector("svg") as Element);

    expect(d3.select).toHaveBeenCalled();
    expect(d3.selectAll).toHaveBeenCalled();
    // @ts-ignore
    expect(d3.remove).toHaveBeenCalled();
    // @ts-ignore
    expect(d3.attr).toHaveBeenCalled();
    // @ts-ignore
    expect(d3.append).toHaveBeenCalled();
    // @ts-ignore
    expect(d3.on).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "setState",
      payload: { activeIndex: null },
    });
  });

  it("should not draw the chart when isFound is false", () => {
    jest.resetAllMocks();

    const mockContext = {
      ...defaultState,
      svgRef: { current: {} },
      isFound: false,
      dispatch: jest.fn(),
    };

    const TestComponent = () => {
      useDrawChart({ dimensions: { width: 100, height: 100 } });
      return <svg ref={mockContext.svgRef as React.RefObject<SVGSVGElement>} />;
    };
    // @ts-ignore
    render(<TestComponent />, { wrapper: createWrapper(mockContext) });

    expect(d3.select).not.toHaveBeenCalled();
  });
});
