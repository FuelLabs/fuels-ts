import baseConfig from '@internals/configs/jest.config';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  setupFiles: ['../../internals/tests/jest.env.ts'],
  coverageThreshold: {
    global: {
      branches: 12,
      functions: 28.57,
      lines: 56.14,
      statements: 56.89,
    },
  },
};

export default config;
