import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CompetenciesContext } from "@/context";
import LinkAndShare from "../../src/components/LinkAndShare";
import { useWebShare } from "@/hooks/useWebShare";
import { useClipboard } from "@/hooks/useClipboard";
import { defaultState, DEFAULT_WHEEL } from "../../src/constants";

declare global {
  interface Navigator {
    // @ts-ignore
    share?: (data?: any) => Promise<void>;
  }
}

jest.mock("@/hooks/useWebShare", () => ({
  __esModule: true,
  useWebShare: jest.fn(),
}));

jest.mock("@/hooks/useClipboard", () => ({
  __esModule: true,
  useClipboard: jest.fn(),
}));

describe("LinkAndShare", () => {
  const mockShare = jest.fn();
  const mockCopyToClipboard = jest.fn();

  const mockDispatch = jest.fn(),
    mockContext = {
      ...defaultState,
      wheel: {
        ...DEFAULT_WHEEL,
        title: "Test Wheel",
        link: "test-link",
        competencies: [
          {
            title: "Test Competency",
            value: 5,
            improvement: false,
            description: "Test description",
          },
        ],
      },
      dispatch: mockDispatch,
    };

  beforeEach(() => {
    // @ts-ignore
    useWebShare.mockReturnValue({ share: mockShare });
    // @ts-ignore
    useClipboard.mockReturnValue({
      isCopied: false,
      copyToClipboard: mockCopyToClipboard,
    });
    Object.defineProperty(global.navigator, "share", {
      value: jest.fn(),
      writable: true,
      configurable: true, // Add this line
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete global.navigator.share;
  });

  // it("renders the share button if navigator.share is available", () => {
  //   global.navigator.share = jest.fn();

  //   const { getByTestId } = render(
  //     <CompetenciesContext.Provider value={mockContext}>
  //       <LinkAndShare />
  //     </CompetenciesContext.Provider>
  //   );

  //   expect(getByTestId("share-button")).toBeInTheDocument();

  //   delete global.navigator.share;
  // });

  // it("renders the copy button if navigator.share is not available", () => {
  //   const { getByTestId } = render(
  //     <CompetenciesContext.Provider value={mockContext}>
  //       <LinkAndShare />
  //     </CompetenciesContext.Provider>
  //   );

  //   expect(getByTestId("copy-button")).toBeInTheDocument();
  // });

  // it("calls the share function when the share button is clicked", () => {
  //   const { getByTestId } = render(
  //     <CompetenciesContext.Provider value={mockContext}>
  //       <LinkAndShare />
  //     </CompetenciesContext.Provider>
  //   );

  //   fireEvent.click(getByTestId("share-button"));

  //   expect(mockShare).toHaveBeenCalled();
  // });

  it("calls the copy function when the copy button is clicked", () => {
    const { getByTestId } = render(
      <CompetenciesContext.Provider value={mockContext}>
        <LinkAndShare />
      </CompetenciesContext.Provider>
    );

    fireEvent.click(getByTestId("copy-button"));

    expect(mockCopyToClipboard).toHaveBeenCalled();
  });
});
