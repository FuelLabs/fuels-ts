import type { UserConfig } from 'vitest/config';
import { mergeConfig } from 'vitest/config';

import baseConfig from './vite.base.config';

const config: UserConfig = {
  test: {
    include: ['packages/fuel-gauge/src/**/*.test.ts'],
    coverage: {
      reportsDirectory: 'coverage/environments/node',
    },
  },
};

export default mergeConfig(baseConfig, config);
