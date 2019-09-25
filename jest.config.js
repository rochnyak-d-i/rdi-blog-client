const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  "moduleFileExtensions": [
    "js",
    "json",
    "jsx",
    "ts",
    "tsx",
    "node"
  ],
  "moduleDirectories": [
    "node_modules",
    "bower_components",
    "shared"
  ],
  "transform": {
    "^.+\\.[tj]sx?$": "babel-jest",
    "^.+\\.svg$": "jest-svg-transformer"
  },

  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
};
