import baseConfig from '@fuel-toolbox/tests/jest.config.base';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: {
    global: {
      branches: 66.66,
      functions: 81.08,
      lines: 84.61,
      statements: 84.4,
    },
  },
  setupFiles: ['../../toolbox/tests/jest.env.ts'],
};

export default config;
