module.exports = {
  rootDir: ".",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
    "^.+\\.svg$": "jest-transformer-svg",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^next/navigation$": "<rootDir>/__mocks__/next/navigation.js",
    "^.+\\.svg$": "jest-transformer-svg",
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(test).[jt]s?(x)"],
};
