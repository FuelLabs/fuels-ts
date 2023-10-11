import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { mergeConfig } from 'vitest/config';
import type { UserConfig } from 'vitest/config';

import baseConfig from './vite.base.config';

const config: UserConfig = {
  plugins: [
    nodePolyfills({
      include: ['process', 'buffer'],
      globals: {
        Buffer: false,
        global: true,
        process: true,
      },
      protocolImports: false,
    }),
  ],
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
