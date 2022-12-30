import baseConfig from '@fuel-toolbox/tests/jest.config.base';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: {
    global: {
      branches: 85.71,
      functions: 100,
      lines: 97.46,
      statements: 97.61,
    },
  },
};

export default config;
