import baseConfig from '@internals/configs/jest.config';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 73.91,
      lines: 82.75,
      statements: 81.96,
    },
  },
};

export default config;
