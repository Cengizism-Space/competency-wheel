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
];

export type CompetencyType = {
  name: string;
  description?: string;
  value: number;
};

const ux = [
  {
    name: "Vision",
    description:
      "The ability to see the big picture and anticipate future trends.",
    value: 6,
  },
  {
    name: "Concept development",
    description: "The ability to generate and develop new ideas.",
    value: 7,
  },
  {
    name: "Value proposition",
    description: "The ability to create value for customers.",
    value: 5,
  },
  {
    name: "Contextual research",
    description:
      "The ability to understand the context in which a product will be used.",
    value: 3,
  },
  {
    name: "User research",
    description:
      "The ability to understand the needs and preferences of users.",
    value: 8,
  },
  {
    name: "Market research",
    description:
      "The ability to understand the market in which a product will be sold.",
    value: 9,
  },
  {
    name: "Information architecture",
    description:
      "The ability to organise and structure information in a clear and logical way.",
    value: 7,
  },
  {
    name: "User flow",
    description:
      "The ability to design the flow of a product in a way that is intuitive and easy to use.",
    value: 8,
  },
  {
    name: "Behaviour",
    description: "The ability to understand and predict user behaviour.",
    value: 5,
  },
  {
    name: "Graphic design",
    description: "The ability to create visually appealing designs.",
    value: 4,
  },
  {
    name: "Data visualisation",
    description:
      "The ability to present data in a way that is easy to understand.",
    value: 5,
  },
  {
    name: "Specifications",
    description: "The ability to create detailed specifications for a product.",
    value: 7,
  },
  {
    name: "Mock-up",
    description: "The ability to create mock-ups of a product.",
    value: 8,
  },
  {
    name: "Interactive prototype",
    description: "The ability to create interactive prototypes of a product.",
    value: 10,
  },
  {
    name: "Front-end development",
    description: "The ability to develop the front-end of a product.",
    value: 6,
  },
  {
    name: "Hardware",
    description: "The ability to design and develop hardware products.",
    value: 5,
  },
  {
    name: "Testing",
    description: "The ability to test and evaluate a product.",
    value: 3,
  },
];

const frontend = [
  { name: "JavaScript", description: "The ability to write clean, maintainable JavaScript code.", value: 6 },
  { name: "TypeScript", description: "The ability to write clean, maintainable TypeScript code.", value: 7 },
  { name: "React", description: "The ability to build React applications.", value: 8 },
  { name: "Vue", description: "The ability to build Vue applications.", value: 5 },
  { name: "Angular", description: "The ability to build Angular applications.", value: 4 },
  { name: "Svelte", description: "The ability to build Svelte applications.", value: 3 },
  { name: "Redux", description: "The ability to manage state with Redux.", value: 6 },
  { name: "Vuex", description: "The ability to manage state with Vuex.", value: 5 },
  { name: "NgRx", description: "The ability to manage state with NgRx.", value: 4 },
  { name: "Sapper", description: "The ability to build Sapper applications.", value: 3 },
  { name: "Next.js", description: "The ability to build Next.js applications.", value: 7 },
  { name: "Gatsby", description: "The ability to build Gatsby applications.", value: 6 },
  { name: "Webpack", description: "The ability to configure Webpack.", value: 5 }
];

export const Templates = {
  ux: ux,
  frontend: frontend
}