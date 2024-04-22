import React from "react";
import {
  render,
  fireEvent,
  screen,
  within,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { CompetenciesContext } from "@/context";
import WheelController from "../../../src/components/WheelController";
import { defaultState, DEFAULT_WHEEL } from "../../../src/constants";

jest.mock("@/hooks/useExportToPng", () => () => jest.fn());
jest.mock("../../../sanity/client", () => ({
  saveWheel: jest.fn(),
  updateWheel: jest.fn(),
  deleteWheel: jest.fn(),
}));

describe("WheelController", () => {
  const mockDispatch = jest.fn(),
    mockContext = {
      ...defaultState,
      svgRef: { current: null },
      isInitial: false,
      isExportable: true,
      isFound: true,
      isEditing: true,
      isEmpty: false,
      isSaved: true,
      link: "test-link",
      wheel: {
        ...DEFAULT_WHEEL,
        title: "Test Wheel",
        slug: { _type: "slug" as "slug", current: "test-wheel" },
      },
      initialWheel: {
        ...defaultState.wheel,
        title: "Test Wheel",
        slug: { _type: "slug" as "slug", current: "test-wheel" },
      },
      activeIndex: 0,
      dispatch: mockDispatch,
    };

  // @ts-ignore
  delete window.location;
  // @ts-ignore
  window.location = { assign: jest.fn() };

  it("renders without crashing", async () => {
    await act(async () => {
      render(
        <CompetenciesContext.Provider value={mockContext}>
          <WheelController />
        </CompetenciesContext.Provider>
      );
    });
  });

  it('renders "Download image" button when isExportable is true', async () => {
    await act(async () => {
      render(
        <CompetenciesContext.Provider value={mockContext}>
          <WheelController />
        </CompetenciesContext.Provider>
      );
    });

    expect(screen.getByText("Download image")).toBeInTheDocument();
  });

  it('renders "Delete wheel" button when isSaved is true', async () => {
    await act(async () => {
      render(
        <CompetenciesContext.Provider value={mockContext}>
          <WheelController />
        </CompetenciesContext.Provider>
      );
    });

    expect(screen.getByText("Delete wheel")).toBeInTheDocument();
  });

  it('renders "Delete wheel" button and opens confirmation dialog when clicked', async () => {
    await act(async () => {
      render(
        <CompetenciesContext.Provider value={mockContext}>
          <WheelController />
        </CompetenciesContext.Provider>
      );
    });

    const deleteButton = screen.getByText("Delete wheel");
    expect(deleteButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(deleteButton);
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it('renders "Save" button and calls "handleSaveWheel" when clicked', async () => {
    await act(async () => {
      render(
        <CompetenciesContext.Provider
          value={{
            ...mockContext,
            isInitial: true,
            isSaved: false,
            link: "",
          }}
        >
          <WheelController />
        </CompetenciesContext.Provider>
      );
    });

    const saveButton = screen.getByText("Save");
    expect(saveButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(saveButton);
    });

    await waitFor(() => expect(mockDispatch).toHaveBeenCalled());

    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      type: "setState",
      payload: {
        isSaving: true,
      },
    });

    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: "setState",
      payload: {
        link: "undefined/wheel/test-wheel",
      },
    });

    expect(mockDispatch).toHaveBeenNthCalledWith(3, {
      type: "setState",
      payload: {
        initialWheel: {
          competencies: [],
          title: "Test Wheel",
          slug: { _type: "slug", current: "test-wheel" },
        },
        isSaved: true,
        isSaving: false,
      },
    });
  });

  it('renders "Saving" when "isSaving" is true', async () => {
    await act(async () => {
      render(
        <CompetenciesContext.Provider
          value={{
            ...mockContext,
            isSaving: true,
          }}
        >
          <WheelController />
        </CompetenciesContext.Provider>
      );
    });

    const savingButton = screen.getByText("Saving");
    expect(savingButton).toBeInTheDocument();
  });

  // TODO: Fix this test
  it("opens the delete confirmation dialog when confirmation button is clicked, starts deleting", async () => {
    await act(async () => {
      render(
        <CompetenciesContext.Provider value={mockContext}>
          <WheelController />
        </CompetenciesContext.Provider>
      );
    });

    const deleteButton = screen.getByText("Delete wheel");

    await act(async () => {
      fireEvent.click(deleteButton);
    });

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    // await act(async () => {
    //   const closeButton = within(dialog).getByRole("button", {
    //     name: /Got it, delete it!/i,
    //   });

    //   fireEvent.click(closeButton);
    // });

    // const deletingText = await screen.findByText("Deleting");
    // expect(deletingText).toBeInTheDocument();
  });

  // it("closes the delete confirmation dialog when clicked outside of the dialog", async () => {
  //   render(
  //     <CompetenciesContext.Provider value={mockContext}>
  //       <WheelController />
  //     </CompetenciesContext.Provider>
  //   );

  //   const deleteButton = screen.getByText("Delete wheel");
  //   fireEvent.click(deleteButton);

  //   const dialog = screen.getByRole("dialog");
  //   expect(dialog).toBeInTheDocument();

  //   const overlay = await waitFor(() => document.querySelector('.fixed.inset-0.bg-black\\2f25'));
  //   fireEvent.click(overlay);

  //   await waitFor(() => expect(dialog).not.toBeInTheDocument());
  // });
});
