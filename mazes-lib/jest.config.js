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
            suiteName: "mazes lib tests",
            outputDirectory: "../reports/junit/",
            outputName: "mazesLib.xml"
        } ]
    ]
};