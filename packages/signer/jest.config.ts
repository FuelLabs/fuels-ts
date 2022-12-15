import baseConfig from '@internals/configs/jest.config';
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
