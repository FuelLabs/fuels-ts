import baseConfig from '@fuel-toolbox/tests/jest.config.base';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageThreshold: undefined, // there's not source files on this package
  setupFiles: ['../../toolbox/tests/jest.env.ts'],
};

export default config;
