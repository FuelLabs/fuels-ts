import baseConfig from '@fuel-toolbox/tests/jest.config.base';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: {
    global: {
      branches: 24.13,
      functions: 24.32,
      lines: 41.5,
      statements: 42.27,
    },
  },
  setupFiles: ['../../toolbox/tests/jest.env.ts'],
};

export default config;
