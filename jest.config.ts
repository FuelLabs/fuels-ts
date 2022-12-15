import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  modulePathIgnorePatterns: ['/dist/'],
  coveragePathIgnorePatterns: ['/dist/', '/test/', '.test.ts'],
  testEnvironment: 'node',
  setupFiles: ['./internals/tests/jest.env.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', 'packages/abi-typegen'],

  // reporters: [['jest-simple-dot-reporter', { color: true }]],
  // projects: ['<rootDir>/packages/*/jest.config.ts'],
  // projects: [
  //   '<rootDir>/packages/abi-typegen/jest.config.ts',
  //   '<rootDir>/packages/fuels/jest.config.ts',
  //   '<rootDir>/packages/versions/jest.config.ts',
  // ],
  // coverageThreshold: {
  //   global: {
  //     branches: 59.19,
  //     functions: 73.75,
  //     lines: 83.14,
  //     statements: 83.12,
  //   },
  // },
};

export default config;
