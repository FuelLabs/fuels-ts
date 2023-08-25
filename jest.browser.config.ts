import type { Config } from '@jest/types';

import jestBaseConfig from './jest.base.config';

const config: Config.InitialOptions = {
  ...jestBaseConfig,
  preset: 'jest-playwright-preset',
  coverageDirectory: 'coverage/environments/browser',
};

export default config;
