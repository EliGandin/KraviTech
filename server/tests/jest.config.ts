import { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(.*\\.mjs$|pdfjs-dist))"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default config;