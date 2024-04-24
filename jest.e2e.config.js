module.exports = {
  preset: "jest-puppeteer",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testMatch: ["**/tests/e2e/**/*.e2e.+(ts|tsx|js|jsx)"],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  setupFiles: ["./jest.setup.js"],
  setupFilesAfterEnv: [],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "jest-environment-puppeteer",
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
