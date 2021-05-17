module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
  "testMatch": [
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "reporters": [
    "default",
    [ "jest-junit", {
      suiteName: "mazes cli tests",
      outputDirectory: "../reports/junit/",
      outputName: "mazesCli.xml"
    } ]
  ]
};