import {
  createSlug,
  degreesToRadians,
  randomizeCompetencies,
  defineWheelStates,
} from "../../src/utils";
import slugify from "slugify";
import { TemplateWithRandomCompetenciesType } from "../../typings";
import { DEFAULT_WHEEL } from "@/constants";

jest.mock("slugify");

describe("Utils", () => {
  describe("createSlug", () => {
    it("should create a slug with a timestamp and the input string", () => {
      (slugify as unknown as jest.Mock).mockReturnValue("test-string");
      const slug = createSlug("Test String");
      expect(slug).toMatch(/^\d+-test-string$/);
    });
  });

  describe("degreesToRadians", () => {
    it("should convert degrees to radians", () => {
      const radians = degreesToRadians(180);
      expect(radians).toBe(Math.PI);
    });
  });

  describe("randomizeCompetencies", () => {
    it("should randomize competencies and select three", () => {
      const templates: TemplateWithRandomCompetenciesType[] = [
        {
          title: "Template 1",
          slug: { _type: "slug", current: "template-1" },
          competencies: [
            {
              title: "Competency 1",
              description: "",
              value: 0,
              improvement: false,
            },
            {
              title: "Competency 2",
              description: "",
              value: 0,
              improvement: false,
            },
            {
              title: "Competency 3",
              description: "",
              value: 0,
              improvement: false,
            },
            {
              title: "Competency 4",
              description: "",
              value: 0,
              improvement: false,
            },
            {
              title: "Competency 5",
              description: "",
              value: 0,
              improvement: false,
            },
          ],
          randomCompetencies: "",
        },
      ];
      const randomizedTemplates = randomizeCompetencies(templates);
      expect(randomizedTemplates[0].randomCompetencies.split(", ").length).toBe(
        3
      );
    });
  });

  describe("defineWheelStates", () => {
    it("should return the correct states", () => {
      const wheel = {
        ...DEFAULT_WHEEL,
        title: "Test Wheel",
        competencies: [
          {
            title: "Test",
            value: 5,
            improvement: false,
            description: "Test description",
          },
        ],
      };
      const initialWheel = {
        ...DEFAULT_WHEEL,
        title: "Test Wheel",
        competencies: [
          {
            title: "Test",
            value: 5,
            improvement: false,
            description: "Test description",
          },
        ],
      };
      const states = defineWheelStates(wheel, initialWheel);
      expect(states.isExportable).toBe(true);
      expect(states.isInitial).toBe(true);
      expect(states.isEmpty).toBe(false);
    });
  });
});
