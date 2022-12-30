import baseConfig from '@fuel-toolbox/tests/jest.config.base';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 100,
      lines: 97.29,
      statements: 97.43,
    },
  },
};

export default config;
