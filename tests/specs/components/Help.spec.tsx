import React from "react";
import { render, fireEvent, within, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Help from "../../../src/components/Help";
import { scaleValues } from "../../../src/constants";

describe("Help component", () => {
  it("renders without crashing", () => {
    render(<Help />);
  });

  it("opens the modal when the button is clicked", async () => {
    const { getByText } = render(<Help />);

    await act(async () => {
      fireEvent.click(getByText("How are the scale values calculated?"));
    });

    expect(getByText("Competency scale values")).toBeInTheDocument();
  });

  it("closes the modal when the close button is clicked", async () => {
    const { getByText, getByRole } = render(<Help />);

    await act(async () => {
      fireEvent.click(getByText("How are the scale values calculated?"));
    });

    const dialog = getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const closeDialogButton = within(dialog).getByTestId("close-help-dialog-button");
    fireEvent.click(closeDialogButton);
    await waitFor(() => expect(dialog).not.toBeInTheDocument());
  });

  it("renders the scale values correctly", async () => {
    const { getByText, getAllByRole } = render(<Help />);

    await act(async () => {
      fireEvent.click(getByText("How are the scale values calculated?"));
    });

    const rows = getAllByRole("row");
    scaleValues.forEach((scale, index) => {
      const { getByText } = within(rows[index + 1]);

      expect(getByText(scale.value.toString())).toBeInTheDocument();
      expect(getByText(scale.definition)).toBeInTheDocument();
    });
  });
});
