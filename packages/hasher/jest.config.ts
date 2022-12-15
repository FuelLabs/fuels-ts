import baseConfig from '@internals/configs/jest.config';
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
