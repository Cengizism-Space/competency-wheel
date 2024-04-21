module.exports = {
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js|jsx)",
    "**/?(*.)+(spec|test).+(ts|tsx|js|jsx)",
  ],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  setupFiles: ["./jest.setup.js"],
  setupFilesAfterEnv: [],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["/sanity/", "/node_modules/", "/dist/", "/.next"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/sanity/**/*.{js,jsx,ts,tsx}",
    "!src/app/layout.tsx",
    "!src/app/wheel/[slug]/page.tsx",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
