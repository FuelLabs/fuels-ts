import baseConfig from '@internals/configs/jest.config';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  setupFiles: ['../../internals/tests/jest.env.ts'],
};

export default config;
