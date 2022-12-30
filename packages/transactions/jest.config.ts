import baseConfig from '@fuel-toolbox/tests/jest.config.base';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: {
    global: {
      branches: 82.81,
      functions: 94.79,
      lines: 93.37,
      statements: 93.37,
    },
  },
};

export default config;
