import baseConfig from '@fuel-toolbox/tests/jest.config.base';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 76,
      lines: 85.07,
      statements: 84.28,
    },
  },
};

export default config;
