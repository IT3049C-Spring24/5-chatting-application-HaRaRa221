module.exports = {
  setupFilesAfterEnv: [ `regenerator-runtime/runtime`, `@testing-library/jest-dom/extend-expect` ],
  testMatch: [ `**/__tests__/**/*.js?(x)`, `**/?(*.)+(test).js?(x)` ],
  clearMocks: true, 
  testEnvironment: `node`,
  watchPathIgnorePatterns: [
    `node_modules`
  ],
  testPathIgnorePatterns:[
    `node_modules`
  ],
  transform: {
    "^.+\\.[t|j]sx?$": `babel-jest`
  }
};