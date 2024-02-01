import { tsupDefaults } from '@internal/tsup';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { Options } from 'tsup';

import { assets, resolveIconPath } from './src/assets-utils';

const configs: Options = {
  ...tsupDefaults,
  entry: {
    index: 'src/index.ts',
    'test-utils': 'src/test-utils.ts',
    'cli-utils': 'src/cli-utils.ts',
    'assets-utils': 'src/assets-utils.ts',
  },
  env: {
    BASE_URL: process.env.ASSETS_BASE_URL || '',
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  onSuccess: async () => {
    const outputDir = join(__dirname, './images');
    mkdirSync(outputDir, {
      recursive: true,
    });
    const assetsData = resolveIconPath(process.env.ASSETS_BASE_URL as string, assets);
    writeFileSync(join(outputDir, './assets.json'), JSON.stringify(assetsData));
  },
};

export default configs;
