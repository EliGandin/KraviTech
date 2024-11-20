import * as path from "path";
import { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  rootDir: path.resolve(__dirname, "../"),
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(.*\\.mjs$|pdfjs-dist))"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },
  setupFiles: ["dotenv/config"],
};

export default config;