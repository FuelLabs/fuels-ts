import baseConfig from '@fuel-toolbox/tests/jest.config.base';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: {
    global: {
      branches: 61,
      functions: 80.17,
      lines: 83.27,
      statements: 83.09,
    },
  },
};

export default config;
