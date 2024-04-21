import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useWebShare } from "../../../src/hooks/useWebShare";

describe("useWebShare", () => {
  it("calls navigator.share when share is called", () => {
    const shareData = {
      title: "Test",
      text: "Test text",
      url: "https://test.com",
    };
    const mockShare = jest.fn();
    global.navigator.share = mockShare;

    function TestComponent() {
      const { share } = useWebShare();

      return <button onClick={() => share(shareData)}>Share</button>;
    }

    const { getByText } = render(<TestComponent />);
    fireEvent.click(getByText("Share"));

    expect(mockShare).toHaveBeenCalledWith(shareData);
  });
});
