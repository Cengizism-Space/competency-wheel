import type { Metadata } from "next";
import { CompetencyContextType, CompetencyType, WheelType } from "../typings";
import { createSlug } from "./utils";

export const metadata: Metadata = {
  title: "Competency wheel app",
  description: "Made for company intern evaluation",
} as {
  title: string;
  description: string;
};

export const colors = {
  rainbow: [
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
  ],
  grayscale: [
    "#11111140",
    "#22222240",
    "#33333340",
    "#44444440",
    "#55555540",
    "#66666640",
    "#77777740",
    "#88888840",
    "#99999940",
    "#AAAAAA40"
  ],
} as { [key: string]: string[] };

export const DEFAULT_TITLE = "Competency Chart" as string;

export const DEFAULT_WHEEL: WheelType = {
  title: DEFAULT_TITLE,
  slug: {
    _type: "slug",
    current: createSlug(DEFAULT_TITLE)
  },
  competencies: [] as CompetencyType[],
};

export const defaultState: CompetencyContextType = {
  dispatch: () => {},
  activeIndex: null,
  activeLabelCoords: { x: 0, y: 0 },
  wheel: DEFAULT_WHEEL,
  initialWheel: null,
  templates: [],
  svgRef: null as unknown as React.MutableRefObject<SVGSVGElement | null>,
  link: undefined,
  isFound: false,
  isExportable: false,
  isInitial: true,
  isEditing: true,
  isEmpty: true,
  isSaved: false,
  isErrored: false,
  errorMessage: "",
};

export const DEFAULT_CHECKOUT_MY_WHEEL = "Check out my competency wheel" as string;

// 🚀
export const TO_BE_IMPROVED_ICON = "M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" as string;

export const scaleValues = [
  {
    value: "9-10",
    definition:
      "I have extensive experience with this competency and master it completely",
  },
  {
    value: "7-8",
    definition: "I have used this competency in multiple or in larger projects",
  },
  { value: "5-6", definition: "I have used this competency in small projects" },
  {
    value: "3-4",
    definition: "I have theoretical knowledge of this competency",
  },
  { value: "1-2", definition: "I have heard about this subject" },
] as { value: string; definition: string }[]