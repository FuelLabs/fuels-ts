import baseConfig from '@internals/configs/jest.config';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: {
    global: {
      branches: 70.27,
      functions: 100,
      lines: 86.29,
      statements: 86.71,
    },
  },
};

export default config;
