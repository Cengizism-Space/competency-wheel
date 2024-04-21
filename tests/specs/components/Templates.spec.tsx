import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CompetenciesContext } from "@/context";
import Templates from "../../../src/components/Templates";
import { defaultState } from "../../../src/constants";
// import { waitFor } from "@testing-library/react";

jest.mock('../../../sanity/client');

// import { fetchTemplates } from "../../sanity/client";

describe("Templates component", () => {
  jest.mock('../../../sanity/client', () => ({
    fetchTemplates: jest.fn(() => Promise.resolve([
      {
        title: "Template 1",
        slug: {
          _type: "slug",
          current: "template-1",
        },
        competencies: [],
      },
      {
        title: "Template 2",
        slug: {
          _type: "slug",
          current: "template-2",
        },
        competencies: [],
      },
    ])),
  }));

  const mockDispatch = jest.fn(),
    mockContext = {
      ...defaultState,
      templates: [],
      dispatch: mockDispatch,
    };

  afterEach(() => {
    mockDispatch.mockClear();
  });

  it("renders without crashing", () => {
    const { getByTestId } = render(
      <CompetenciesContext.Provider value={mockContext}>
        <Templates />
      </CompetenciesContext.Provider>
    );

    expect(getByTestId("wheel-templates")).toBeInTheDocument();
  });

  it("renders loading state", () => {
    const { getByText } = render(
      <CompetenciesContext.Provider value={mockContext}>
        <Templates />
      </CompetenciesContext.Provider>
    );

    expect(getByText("Loading templates...")).toBeInTheDocument();
  });

  // it("renders templates", async () => {
  //   (fetchTemplates as jest.Mock).mockResolvedValue([
  //     {
  //       title: "Template 1",
  //       slug: {
  //         _type: "slug",
  //         current: "template-1",
  //       },
  //       competencies: [],
  //     },
  //     {
  //       title: "Template 2",
  //       slug: {
  //         _type: "slug",
  //         current: "template-2",
  //       },
  //       competencies: [],
  //     },
  //   ]);
  
  //   render(
  //     <CompetenciesContext.Provider
  //       value={{
  //         ...defaultState,
  //         dispatch: mockDispatch,
  //       }}
  //     >
  //       <Templates />
  //     </CompetenciesContext.Provider>
  //   );
  
  //   await waitFor(() => {
  //     expect(screen.getByText("Template 1")).toBeInTheDocument();
  //     expect(screen.getByText("Template 2")).toBeInTheDocument();
  //   }, { timeout: 4000 });
  // });
});
