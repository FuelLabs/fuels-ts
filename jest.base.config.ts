import type { Config } from '@jest/types';
import { defaults as tsjPreset } from 'ts-jest/presets';

const config: Config.InitialOptions = {
  ...tsjPreset,
  setupFiles: ['./jest.env.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '__snapshots__'],
  modulePathIgnorePatterns: [
    '/dist/',
    '/apps/demo-nextjs',
    '/apps/demo-react-cra',
    '/dist/demo-react-vite',
  ],
  coveragePathIgnorePatterns: ['/dist/', '/test/', '.test.ts', '.d.ts'],
  coverageDirectory: './coverage/',
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  testTimeout: 15000,
  transform: {
    '\\.hbs$': 'jest-text-transformer',
    ...tsjPreset.transform,
  },
};

export default config;
