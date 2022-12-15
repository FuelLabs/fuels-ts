import baseConfig from '@internals/configs/jest.config';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: {
    global: {
      branches: 24.13,
      functions: 23.49,
      lines: 41.2,
      statements: 41.99,
    },
  },
};

export default config;
