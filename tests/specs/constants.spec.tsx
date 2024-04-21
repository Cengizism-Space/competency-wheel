import { DEFAULT_TITLE, DEFAULT_WHEEL } from "../../src/constants";
import { createSlug } from "../../src/utils";

describe("Constants", () => {
  describe("DEFAULT_WHEEL", () => {
    it("has the correct default values", () => {
      expect(DEFAULT_WHEEL).toEqual({
        title: DEFAULT_TITLE,
        slug: {
          _type: "slug",
          current: createSlug(DEFAULT_TITLE),
        },
        competencies: [],
      });
    });
  });
});
