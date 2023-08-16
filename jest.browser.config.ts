import type { Config } from '@jest/types';

import jestBaseConfig from './jest.base.config';

const config: Config.InitialOptions = {
  ...jestBaseConfig,
  preset: 'jest-playwright-preset',
  // eslint-disable-next-line no-useless-escape
  testRegex: ['\.browser\..*test\.ts'],
};

export default config;
