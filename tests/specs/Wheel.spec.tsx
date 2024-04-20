import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CompetenciesContext } from "@/context";
// import { CompetenciesReducer } from "../../src/reducer";
import Wheel from "../../src/components/Wheel";
import { defaultState, DEFAULT_WHEEL } from "../../src/constants";
import useDrawChart from "../../src/hooks/useDrawChart";
import { fetchWheel } from "../../sanity/client";

jest.mock("../../sanity/client", () => ({
  fetchWheel: jest.fn(),
}));

jest.mock("../../src/hooks/useDrawChart", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Wheel", () => {
  const mockDispatch = jest.fn(),
    mockContext = {
      ...defaultState,
      svgRef: { current: null },
      isFound: true,
      isEditing: true,
      isEmpty: false,
      isSaved: false,
      wheel: {
        ...DEFAULT_WHEEL,
        competencies: [
          {
            title: "Test",
            value: 5,
            improvement: false,
            description: "Test description",
          },
        ],
      },
      activeIndex: 0,
      dispatch: mockDispatch,
    };

  beforeEach(() => {
    (useDrawChart as jest.Mock).mockImplementation(() => {});

    (fetchWheel as jest.Mock).mockImplementation((slug) => {
      if (slug === "test-slug") {
        return Promise.resolve({
          title: "Test Wheel",
          template: false,
          slug: {
            current: "test-slug",
          },
          competencies: [
            {
              title: "Test",
              value: 5,
              improvement: false,
              description: "Test description",
            },
          ],
        });
      }
    });
  });

  afterEach(() => {
    mockDispatch.mockClear();
  });

  it("renders without crashing", async () => {
    await act(async () => {
      render(
        <CompetenciesContext.Provider value={mockContext}>
          <Wheel slug="test-slug" />
        </CompetenciesContext.Provider>
      );
    });

    expect(screen.getByTestId("wheel-component")).toBeInTheDocument();
  });

  it("renders without crashing with ?presentation=true", async () => {
    await act(async () => {
      render(
        <CompetenciesContext.Provider
          value={{
            ...mockContext,
            isEditing: false,
          }}
        >
          <Wheel slug="test-slug" />
        </CompetenciesContext.Provider>
      );
    });

    expect(screen.queryByTestId("edit-title-button")).not.toBeInTheDocument();
  });

  it("renders without crashing without presentation parameter", async () => {
    await act(async () => {
      render(
        <CompetenciesContext.Provider
          value={{
            ...mockContext,
            isEditing: true,
          }}
        >
          <Wheel slug="test-slug" />
        </CompetenciesContext.Provider>
      );
    });

    const editTitleButton = await screen.findByTestId("edit-title-button");
    expect(editTitleButton).toBeInTheDocument();
  });

  it("renders Alert and ModeSwitcher", async () => {
    await act(async () => {
      render(
        <CompetenciesContext.Provider
          value={{
            ...mockContext,
            isErrored: true,
            errorMessage: "Error message",
          }}
        >
          <Wheel slug="test-slug" />
        </CompetenciesContext.Provider>
      );
    });

    expect(screen.getByTestId("alert-component")).toBeInTheDocument();
    expect(screen.getByTestId("mode-switcher-component")).toBeInTheDocument();
  });

  it("renders LoadingWheel when isLoading is true", async () => {
    await act(async () => {
      render(
        <CompetenciesContext.Provider
          value={{
            ...mockContext,
            isLoading: true,
          }}
        >
          <Wheel slug="test-slug" />
        </CompetenciesContext.Provider>
      );
    });

    expect(screen.getByTestId("loading-wheel-component")).toBeInTheDocument();
  });

  it("renders NotFound when isFound is false", async () => {
    await act(async () => {
      render(
        <CompetenciesContext.Provider
          value={{
            ...mockContext,
            isFound: false,
          }}
        >
          <Wheel slug="test-slug" />
        </CompetenciesContext.Provider>
      );
    });

    expect(screen.getByTestId("not-found-component")).toBeInTheDocument();
  });

  it("renders CompetencyToolbar when isFound is true and isEmpty is false", async () => {
    await act(async () => {
      render(
        <CompetenciesContext.Provider
          value={{
            ...mockContext,
            isFound: true,
            isEmpty: false,
          }}
        >
          <Wheel slug="test-slug" />
        </CompetenciesContext.Provider>
      );
    });

    expect(
      screen.getByTestId("competency-toolbar-component")
    ).toBeInTheDocument();
  });

  it("renders MadeBy component", async () => {
    await act(async () => {
      render(
        <CompetenciesContext.Provider value={mockContext}>
          <Wheel slug="test-slug" />
        </CompetenciesContext.Provider>
      );
    });

    expect(screen.getByTestId("made-by-component")).toBeInTheDocument();
  });

  it("renders ResetButton when isEditing is true", async () => {
    await act(async () => {
      render(
        <CompetenciesContext.Provider
          value={{
            ...mockContext,
            isEditing: true,
          }}
        >
          <Wheel slug="test-slug" />
        </CompetenciesContext.Provider>
      );
    });

    expect(screen.getByTestId("reset-button-component")).toBeInTheDocument();
  });

  // it("sets and dispatches isExportable correctly", () => {
  //   const newState = CompetenciesReducer(defaultState, {
  //     type: "setState",
  //     payload: {
  //       ...defaultState,
  //       wheel: {
  //         ...defaultState.wheel,
  //         title: "Test Title",
  //         competencies: []
  //         // [
  //         //   {
  //         //     title: "Test Competency",
  //         //     description: "Test Description",
  //         //     value: 1,
  //         //     improvement: true,
  //         //   },
  //         // ],
  //       },
  //     },
  //   });

  //   expect(newState.isEmpty).toBe(true);
  // });


});
