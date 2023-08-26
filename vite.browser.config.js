import { mergeConfig } from 'vitest/config';

import baseConfig from './vite.base.config';

export default mergeConfig(baseConfig, {
  test: {
    coverage: {
      reportsDirectory: 'coverage/browser',
    },
    browser: {
      enabled: true,
      headless: true,
      name: 'chrome',
    },
  },
});
