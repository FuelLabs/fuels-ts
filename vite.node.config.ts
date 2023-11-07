import type { UserConfig } from 'vitest/config';
import { mergeConfig } from 'vitest/config';

import baseConfig from './vite.base.config';

const config: UserConfig = {
  test: {
    exclude: ['packages/fuels/**/*.test.ts'],
    coverage: {
      reportsDirectory: 'coverage/environments/node',
    },
  },
};

export default mergeConfig(baseConfig, config);
