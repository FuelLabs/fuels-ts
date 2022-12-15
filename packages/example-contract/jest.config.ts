import baseConfig from '@internals/configs/jest.config';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  setupFiles: ['../../internals/tests/jest.env.ts'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 66.66,
      lines: 85.71,
      statements: 87.5,
    },
  },
};

export default config;
