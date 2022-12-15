import baseConfig from '@internals/configs/jest.config';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: {
    global: {
      branches: 75.43,
      functions: 93.1,
      lines: 90.79,
      statements: 91.12,
    },
  },
};

export default config;
