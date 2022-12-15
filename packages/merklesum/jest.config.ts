import baseConfig from '@internals/configs/jest.config';
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
