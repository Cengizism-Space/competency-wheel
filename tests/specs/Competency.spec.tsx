import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CompetenciesContext } from "@/context";
import Competency from "../../src/components/Competency";
import { defaultState, DEFAULT_WHEEL } from "../../src/constants";

describe("Competency", () => {
  const mockDispatch = jest.fn(),
    mockContext = {
      ...defaultState,
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

  afterEach(() => {
    mockDispatch.mockClear();
  });

  it("renders correctly", () => {
    const { getByText } = render(
      <CompetenciesContext.Provider value={mockContext}>
        <Competency />
      </CompetenciesContext.Provider>
    );

    expect(getByText("Competency")).toBeInTheDocument();
  });

  it("renders elements", () => {
    const { getByLabelText, getByText, getAllByLabelText, getByTestId } = render(
      <CompetenciesContext.Provider value={mockContext}>
        <Competency />
      </CompetenciesContext.Provider>
    );

    expect(getByLabelText("Title")).toBeInTheDocument();
    expect(getByLabelText("Description (Optional)")).toBeInTheDocument();
    expect(getAllByLabelText("Scale of")[0]).toBeInTheDocument();
    expect(getByText("Want to improve")).toBeInTheDocument();
    expect(getByTestId("competency-submit-button")).toBeInTheDocument();
  });

  it("handles title change", () => {
    const { getByLabelText } = render(
      <CompetenciesContext.Provider
        value={{
          ...mockContext,
          wheel: {
            ...mockContext.wheel,
            competencies: [
              {
                title: "Existing Competency",
                value: 5,
                improvement: false,
                description: "Test description",
              },
            ],
          },
        }}
      >
        <Competency />
      </CompetenciesContext.Provider>
    );

    fireEvent.change(getByLabelText("Title"), {
      target: { value: "New Title" },
    });
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("handles title change when competencies length is 0", () => {
    const { getByLabelText } = render(
      <CompetenciesContext.Provider
        value={{
          ...mockContext,
          wheel: {
            ...mockContext.wheel,
            competencies: [],
          },
        }}
      >
        <Competency />
      </CompetenciesContext.Provider>
    );

    fireEvent.change(getByLabelText("Title"), {
      target: { value: "New Title" },
    });
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("handles add or update when title is empty", () => {
    const { getByTestId } = render(
      <CompetenciesContext.Provider
        value={{
          ...mockContext,
          wheel: {
            ...mockContext.wheel,
            competencies: [],
          },
        }}
      >
        <Competency />
      </CompetenciesContext.Provider>
    );

    fireEvent.click(getByTestId("competency-submit-button"));
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("handles description change", () => {
    const { getByLabelText } = render(
      <CompetenciesContext.Provider value={mockContext}>
        <Competency />
      </CompetenciesContext.Provider>
    );

    fireEvent.change(getByLabelText("Description (Optional)"), {
      target: { value: "New Description" },
    });
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("handles description change when competencies length is 0", () => {
    const { getByLabelText } = render(
      <CompetenciesContext.Provider
        value={{
          ...mockContext,
          wheel: {
            ...mockContext.wheel,
            competencies: [],
          },
        }}
      >
        <Competency />
      </CompetenciesContext.Provider>
    );

    fireEvent.change(getByLabelText("Description (Optional)"), {
      target: { value: "New Description" },
    });
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('toggles improvement on button click', () => {
    const { getByTestId } = render(
      <CompetenciesContext.Provider value={mockContext}>
        <Competency />
      </CompetenciesContext.Provider>
    );
  
    fireEvent.click(getByTestId('improvement-button'));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'updateCompetency',
      payload: expect.any(Function),
    });
  });

  it("handles value change", () => {
    const { container } = render(
      <CompetenciesContext.Provider value={mockContext}>
        <Competency />
      </CompetenciesContext.Provider>
    );
    const input = container.querySelector(
      "#competencyValue"
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "7" } });
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("handles value decrease", () => {
    const { getByTestId } = render(
      <CompetenciesContext.Provider value={mockContext}>
        <Competency />
      </CompetenciesContext.Provider>
    );

    fireEvent.click(getByTestId("decrease-button"));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "updateCompetency",
      payload: expect.any(Function),
    });
  });

  it("handles value increase", () => {
    const { getByTestId } = render(
      <CompetenciesContext.Provider value={mockContext}>
        <Competency />
      </CompetenciesContext.Provider>
    );

    fireEvent.click(getByTestId("increase-button"));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "updateCompetency",
      payload: expect.any(Function),
    });
  });

  it("handles value change when competencies length is 0", () => {
    const { getByTestId } = render(
      <CompetenciesContext.Provider
        value={{
          ...mockContext,
          wheel: {
            ...mockContext.wheel,
            competencies: [],
          },
        }}
      >
        <Competency />
      </CompetenciesContext.Provider>
    );

    fireEvent.change(getByTestId("competency-value"), { target: { value: 7 } });
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("clears form", () => {
    const { getByTestId } = render(
      <CompetenciesContext.Provider value={mockContext}>
        <Competency />
      </CompetenciesContext.Provider>
    );

    fireEvent.click(getByTestId("competency-submit-button"));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "setState",
      payload: { activeIndex: null },
    });
  });

  it("handles form submission", () => {
    const { getByText } = render(
      <CompetenciesContext.Provider value={mockContext}>
        <Competency />
      </CompetenciesContext.Provider>
    );

    fireEvent.click(getByText("Update"));
    expect(mockDispatch).toHaveBeenCalled();
  });
});
