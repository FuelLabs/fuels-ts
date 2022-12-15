import baseConfig from '@internals/configs/jest.config';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: {
    global: {
      branches: 80.39,
      functions: 100,
      lines: 95.83,
      statements: 94.89,
    },
  },
};

export default config;
