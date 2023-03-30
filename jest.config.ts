import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./jest.env.ts'],
  coverageReporters: ['text', 'text-summary'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  modulePathIgnorePatterns: ['/dist/'],
  coveragePathIgnorePatterns: ['/dist/', '/test/', '.test.ts', '.d.ts'],
  testTimeout: 15000,
};

export default config;
