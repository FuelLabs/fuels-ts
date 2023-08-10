import type { Config } from '@jest/types';
import { defaults as tsjPreset } from 'ts-jest/presets';

const config: Config.InitialOptions = {
  ...tsjPreset,
  preset: 'jest-playwright-preset',
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
    ...tsjPreset.transform,
  },
  // TODO: Implement custom runner to work with Jest
  // runner: 'groups',
};

export default config;
