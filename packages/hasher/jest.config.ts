import baseConfig from '@fuel-toolbox/tests/jest.config.base';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: {
    global: {
      branches: 37.5,
      functions: 100,
      lines: 65.85,
      statements: 65.85,
    },
  },
};

export default config;
