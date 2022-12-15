import baseConfig from '@internals/configs/jest.config';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  setupFiles: ['../../internals/tests/jest.env.ts'],
  coverageThreshold: {
    global: {
      branches: 64.51,
      functions: 81.08,
      lines: 84.44,
      statements: 84.23,
    },
  },
};

export default config;
