import type { Config } from '@jest/types';

import jestBaseConfig from './jest.base.config';

const config: Config.InitialOptions = {
  ...jestBaseConfig,
  testEnvironment: 'node',
  preset: 'jest-playwright-preset',
};

export default config;
