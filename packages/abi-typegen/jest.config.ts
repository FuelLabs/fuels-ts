import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  modulePathIgnorePatterns: ['/dist/'],
  coveragePathIgnorePatterns: ['/dist/', '/test/', '.test.ts', '.hbs'],
};

export default config;
