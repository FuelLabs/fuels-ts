import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  modulePathIgnorePatterns: ['/dist/'],
  coveragePathIgnorePatterns: ['/dist/', '/test/', '.test.ts'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  // reporters: [['jest-simple-dot-reporter', { color: true }]],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

export default config;
