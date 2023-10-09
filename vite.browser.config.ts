import { mergeConfig } from 'vitest/config';
import type { UserConfig } from 'vitest/config';

import baseConfig from './vite.base.config';

const config: UserConfig = {
  define: {
    'process.env': process.env ?? {},
  },
  test: {
    coverage: {
      reportsDirectory: 'coverage/environments/browser',
    },
    browser: {
      enabled: true,
      headless: true,
      name: 'chrome',
    },
  },
};

export default mergeConfig(baseConfig, config);
