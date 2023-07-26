import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./jest.env.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  modulePathIgnorePatterns: [
    '/dist/',
    '/apps/demo-nextjs',
    '/apps/demo-react-cra',
    '/dist/demo-react-vite',
  ],
  coveragePathIgnorePatterns: ['/dist/', '/test/', '.test.ts', '.d.ts'],
  testTimeout: 15000,
  transform: {
    '\\.hbs$': 'jest-text-transformer',
  },
};

export default config;
