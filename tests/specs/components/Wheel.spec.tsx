import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CompetenciesContext } from "@/context";
import Wheel from "../../../src/components/Wheel";
import { defaultState, DEFAULT_WHEEL } from "../../../src/constants";
import useDrawChart from "../../../src/hooks/useDrawChart";
import { fetchWheel } from "../../../sanity/client";
import { CompetenciesReducer } from "@/reducer";
import { defineWheelStates } from "../../../src/utils";

jest.mock("../../../sanity/client", () => ({
  fetchWheel: jest.fn(),
}));

jest.mock("../../../src/hooks/useDrawChart", () => ({
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

  it("renders without crashing with in presentation mode", async () => {
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

  it("shows wheel legenda in presentation mode", async () => {
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

    expect(screen.queryByText(/How are the scale values calculated?/)).toBeInTheDocument();
    expect(screen.queryByText(/Competency is in improving/)).toBeInTheDocument();
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

  it("renders LoadingWheel when is in loading state", async () => {
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

  it("renders NotFound when wheel is not found", async () => {
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

  it("renders CompetencyToolbar when wheel is found and not empty", async () => {
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

  it("renders ResetButton when in editing mode", async () => {
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

  it("sets wheel and initialWheel first and defines wheel states correctly", () => {
    const newState = CompetenciesReducer(defaultState, {
      type: "setState",
      payload: {
        ...defaultState,
        wheel: {
          ...defaultState.wheel,
          title: "Test Title",
          competencies: [
            {
              title: "Test Competency",
              description: "Test Description",
              value: 1,
              improvement: true,
            },
          ],
        },
        initialWheel: {
          ...defaultState.wheel,
          title: "",
          competencies: [],
        },
      },
    });

    const { isExportable, isInitial, isEmpty } = defineWheelStates(
      newState.wheel,
      newState.initialWheel
    );

    expect(isExportable).toBe(true);
    expect(isInitial).toBe(false);
    expect(isEmpty).toBe(false);
  });

  it('renders LinkAndShare when "lisSaved" is true', async () => {
    await act(async () => {
      render(
        <CompetenciesContext.Provider
          value={{
            ...mockContext,
            isSaved: true,
          }}
        >
          <Wheel slug="test-slug" />
        </CompetenciesContext.Provider>
      );
    });

    let copyButton, shareButton;
    try {
      copyButton = await screen.findByTestId("copy-button");
    } catch (error) {
      // Ignore the error if the copy-button is not found
    }

    try {
      shareButton = await screen.findByTestId("share-button");
    } catch (error) {
      // Ignore the error if the share-button is not found
    }

    if (copyButton) {
      expect(copyButton).toBeInTheDocument();
    } else if (shareButton) {
      expect(shareButton).toBeInTheDocument();
    } else {
      throw new Error(
        'Neither "copy-button" nor "share-button" was found in the document.'
      );
    }
  });
});
