/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  collectCoverage: true, // Habilita a cobertura
  coverageDirectory: "coverage", // Define a pasta onde o relatório será salvo
  coverageReporters: ["json", "lcov", "text", "clover"],
};