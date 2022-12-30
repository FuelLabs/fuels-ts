import baseConfig from '@fuel-toolbox/tests/jest.config.base';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: {
    global: {
      branches: 70.58,
      functions: 53.33,
      lines: 69.56,
      statements: 71.13,
    },
  },
};

export default config;
