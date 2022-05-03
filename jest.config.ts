import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverageFrom: ['packages/**/*.[jt]s', '!**/node_modules/**', '!**/dist/**'],
};

export default config;
