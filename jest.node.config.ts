import type { Config } from '@jest/types';

import jestBaseConfig from './jest.base.config';

const config: Config.InitialOptions = {
  ...jestBaseConfig,
  testEnvironment: 'node',
  coverageDirectory: 'coverage/environments/node',
};

export default config;
