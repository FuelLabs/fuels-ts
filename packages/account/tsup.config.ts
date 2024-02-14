import { tsupDefaults } from '@internal/tsup';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { Options } from 'tsup';

import { assets } from './src/providers/assets';
import { resolveIconPath } from './src/providers/assets/utils';

const configs: Options = {
  ...tsupDefaults,
  entry: {
    index: 'src/index.ts',
    configs: 'src/configs.ts',
    'test-utils': 'src/test-utils/index.ts',
  },
  env: {
    BASE_URL: process.env.ASSETS_BASE_URL || '',
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  onSuccess: async () => {
    const outputDir = join(__dirname, 'src', 'providers', 'assets', 'images');
    mkdirSync(outputDir, {
      recursive: true,
    });
    const assetsData = resolveIconPath(process.env.ASSETS_BASE_URL as string, assets);
    writeFileSync(join(outputDir, './assets.json'), JSON.stringify(assetsData));
  },
};

export default configs;
