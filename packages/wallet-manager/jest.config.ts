import baseConfig from '@internals/configs/jest.config';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 100,
      lines: 97.85,
      statements: 97.95,
    },
  },
};

export default config;
