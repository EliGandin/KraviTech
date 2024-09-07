// module.exports = {
//   setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"], // Adjust path as necessary
//   testEnvironment: "jsdom", // Use jsdom environment for testing DOM elements
//   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
//   transform: {
//     "^.+\\.(ts|tsx)$": "ts-jest", // Transform TypeScript files using ts-jest
//   },
//   testMatch: ["**/__tests__/**/*.test.(ts|tsx|js|jsx)"],
// };

import type { Config } from "jest";

const config: Config = {
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/components/ui/(.*)$": "<rootDir>/src/components/ui/$1", // Adjust this path if necessary
  },
};

export default config;
