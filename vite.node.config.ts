import type { UserConfig } from 'vitest/config';
import { mergeConfig } from 'vitest/config';

import baseConfig from './vite.base.config';

const config: UserConfig = {
  test: {
    coverage: {
      reportsDirectory: 'coverage/environments/node',
    },
    include: ['packages/fuel-gauge/src/**/*.test.ts'],
  },
};

export default mergeConfig(baseConfig, config);
