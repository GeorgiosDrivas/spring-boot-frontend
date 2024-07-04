module.exports = {
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
      "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/test/fileMock.js",
      "\\.(css|less)$": "identity-obj-proxy"
    },
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
  };
  