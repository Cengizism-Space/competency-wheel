import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import InputField from "../../../src/components/InputField";

describe("InputField", () => {
  it("renders the label", () => {
    const { getByText } = render(
      <InputField
        id="test"
        label="Test Label"
        placeholder="Test Placeholder"
        value=""
        onChange={jest.fn()}
      />
    );

    expect(getByText("Test Label")).toBeInTheDocument();
  });

  it("renders the input field with the correct placeholder", () => {
    const { getByPlaceholderText } = render(
      <InputField
        id="test"
        label="Test Label"
        placeholder="Test Placeholder"
        value=""
        onChange={jest.fn()}
      />
    );

    expect(getByPlaceholderText("Test Placeholder")).toBeInTheDocument();
  });

  it("calls the onChange handler when the input value changes", () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <InputField
        id="test"
        label="Test Label"
        placeholder="Test Placeholder"
        value=""
        onChange={handleChange}
      />
    );

    fireEvent.change(getByPlaceholderText("Test Placeholder"), {
      target: { value: "New Value" },
    });

    expect(handleChange).toHaveBeenCalled();
  });

  it("renders the input field with the correct type", () => {
    const { getByTestId } = render(
      <InputField
        id="test"
        label="Test Label"
        placeholder="Test Placeholder"
        value=""
        onChange={jest.fn()}
        type="number"
      />
    );

    expect(getByTestId("input-field")).toHaveAttribute("type", "number");
  });

  it("renders the input field with the correct min and max values", () => {
    const { getByTestId } = render(
      <InputField
        id="test"
        label="Test Label"
        placeholder="Test Placeholder"
        value=""
        onChange={jest.fn()}
        min={1}
        max={10}
      />
    );

    expect(getByTestId("input-field")).toHaveAttribute("min", "1");
    expect(getByTestId("input-field")).toHaveAttribute("max", "10");
  });
});
