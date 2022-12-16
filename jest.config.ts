import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./jest.env.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    // '/packages/abi-typegen/',
    // '/packages/fuels/',
    // '/packages/versions/',
  ],
  modulePathIgnorePatterns: ['/dist/'],
  coveragePathIgnorePatterns: ['/dist/', '/test/', '.test.ts'],
  testTimeout: 15000,
};

export default config;
