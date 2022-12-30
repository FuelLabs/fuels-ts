import baseConfig from '@fuel-toolbox/tests/jest.config.base';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: {
    global: {
      branches: 12,
      functions: 28.57,
      lines: 56.14,
      statements: 56.89,
    },
  },
  setupFiles: ['../../toolbox/tests/jest.env.ts'],
};

export default config;
