import baseConfig from '@fuel-toolbox/tests/jest.config.base';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: {
    global: {
      branches: 7.35,
      functions: 4.83,
      lines: 22.22,
      statements: 22.56,
    },
  },
  setupFiles: ['../../toolbox/tests/jest.env.ts'],
};

export default config;
