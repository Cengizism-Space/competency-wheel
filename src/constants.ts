import { CompetencyType, WheelType } from "../typings";
import { createSlug } from "./utils";

export const colors = [
  "#6A2B8B", // Dark Orchid
  "#864C9E", // Medium Purple
  "#9C69AC", // Medium Orchid
  "#CB2026", // Firebrick
  "#EF4749", // Indian Red
  "#F37D80", // Light Coral
  "#CA6E28", // Chocolate
  "#F6881F", // Dark Orange
  "#FDBA34", // Goldenrod
  "#FFD700", // Gold
  "#446630", // Dark Olive Green
  "#688E23", // Olive Drab
  "#659A41", // Yellow Green
  "#98CA3C", // Lime Green
  "#0099CD", // Deep Sky Blue
  "#34B5E3", // Sky Blue
  "#B21E5B", // Medium Violet Red
  "#E50F73", // Deep Pink
  "#EE3B95", // Hot Pink
  "#FF69B4", // Hot Pink
] as const;

export const DEFAULT_TITLE = "Competency Chart" as string;

export const DEFAULT_WHEEL: WheelType = {
  title: DEFAULT_TITLE,
  slug: {
    _type: "slug",
    current: createSlug(DEFAULT_TITLE)
  },
  competencies: [] as CompetencyType[],
};