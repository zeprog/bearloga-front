const path = require("path")

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: [path.resolve(__dirname, "src/jest.setup.ts")],
  transform: {
    "^.+\\.(ts|tsx)$": ["babel-jest", { configFile: "./babel-jest.config.js" }],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
}