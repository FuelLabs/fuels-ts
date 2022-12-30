import baseConfig from '@fuel-toolbox/tests/jest.config.base';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: {
    global: {
      branches: 75.92,
      functions: 82.05,
      lines: 90.35,
      statements: 90.51,
    },
  },
};

export default config;
