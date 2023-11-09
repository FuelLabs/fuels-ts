import type { UserConfig } from 'vitest/config';
import { mergeConfig } from 'vitest/config';

import baseConfig from './vite.base.config';

const config: UserConfig = {
  test: {
    testTimeout: process.env.CI ? 10000 : 10000,
    isolate: false,
    exclude: ['packages/fuels/**/*.test.ts'],
    coverage: {
      reportsDirectory: 'coverage/environments/node',
    },
  },
};

export default mergeConfig(baseConfig, config);
