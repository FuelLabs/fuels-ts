import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./jest.env.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    // TODO: Fix configs and remove ignore patterns below
    'packages/abi-typegen',
    'cli.test.ts',
    'bin.test.ts',
  ],
  modulePathIgnorePatterns: ['/dist/'],
  coveragePathIgnorePatterns: ['/dist/', '/test/', '.test.ts'],
  testTimeout: 15000,
};

export default config;
