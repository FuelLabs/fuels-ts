import baseConfig from '@fuel-toolbox/tests/jest.config.base';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 75,
      lines: 84.61,
      statements: 84.61,
    },
  },
};

export default config;
