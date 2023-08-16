import type { Config } from '@jest/types';

import jestBaseConfig from './jest.base.config';

const config: Config.InitialOptions = {
  ...jestBaseConfig,
  testEnvironment: 'node',
  // eslint-disable-next-line no-useless-escape
  testRegex: ['\.node\..*test\.ts'],
};

export default config;
