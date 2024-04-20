import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CompetenciesContext } from "@/context";
import "@testing-library/jest-dom";
import Title from "../../src/components/Title";
import { defaultState, DEFAULT_WHEEL } from "../../src/constants";

describe("Title component", () => {
  const mockDispatch = jest.fn(),
    mockContext = {
      ...defaultState,
      isFound: true,
      isEditing: true,
      isEmpty: false,
      wheel: {
        ...DEFAULT_WHEEL,
        title: "Test Title",
        slug: {
          ...DEFAULT_WHEEL.slug,
          current: "test-title",
        },
      },
      activeIndex: 0,
      dispatch: mockDispatch,
    };

  afterEach(() => {
    mockDispatch.mockClear();
  });

  it("renders without crashing", () => {
    const { getByText } = render(
      <CompetenciesContext.Provider value={mockContext}>
        <Title />
      </CompetenciesContext.Provider>
    );

    expect(getByText("Test Title")).toBeInTheDocument();
  });

  it("handles edit click", () => {
    const { getByDisplayValue, getByTestId } = render(
      <CompetenciesContext.Provider value={mockContext}>
        <Title />
      </CompetenciesContext.Provider>
    );

    fireEvent.click(getByTestId("edit-title-button"));
    expect(getByDisplayValue("Test Title")).toBeInTheDocument();
  });

  it("handles title change", () => {
    const { getByTestId, getByDisplayValue } = render(
      <CompetenciesContext.Provider value={mockContext}>
        <Title />
      </CompetenciesContext.Provider>
    );

    fireEvent.click(getByTestId("edit-title-button"));
    fireEvent.change(getByDisplayValue("Test Title"), {
      target: { value: "New Title" },
    });

    // Info: To make it work for nested properties, you need to use expect.objectContaining recursively.
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "setState",
        payload: expect.objectContaining({
          wheel: expect.objectContaining({
            title: "New Title",
            slug: expect.objectContaining({
              _type: "slug",
              current: expect.stringMatching(/.*new-title$/),
            }),
          }),
        }),
      })
    );
  });
});
