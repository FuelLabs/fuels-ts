import baseConfig from '@internals/configs/jest.config';
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
