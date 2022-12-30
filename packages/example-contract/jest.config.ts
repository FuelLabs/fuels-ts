import baseConfig from '@fuel-toolbox/tests/jest.config.base';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 66.66,
      lines: 85.71,
      statements: 87.5,
    },
  },
  setupFiles: ['../../toolbox/tests/jest.env.ts'],
};

export default config;
