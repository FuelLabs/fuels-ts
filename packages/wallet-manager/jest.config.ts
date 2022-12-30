import baseConfig from '@fuel-toolbox/tests/jest.config.base';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 100,
      lines: 97.87,
      statements: 97.97,
    },
  },
};

export default config;
