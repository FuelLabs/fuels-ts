import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { tsupDefaults } from '@internal/tsup';
import type { Options } from 'tsup';

import { assets } from './src/providers/assets';

const configs: Options = {
  ...tsupDefaults,
  entry: {
    index: 'src/index.ts',
    configs: 'src/configs.ts',
    'test-utils': 'src/test-utils/index.ts',
  },
  onSuccess: async () => {
    const outputDir = join(__dirname, 'src', 'providers', 'assets', 'images');
    mkdirSync(outputDir, {
      recursive: true,
    });
    writeFileSync(join(outputDir, './assets.json'), JSON.stringify(assets));
  },
};

export default configs;
