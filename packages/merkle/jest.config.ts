import baseConfig from '@internals/configs/jest.config';
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
