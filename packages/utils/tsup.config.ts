import { tsupDefaults } from '@internal/tsup';
import type { Options } from 'tsup';

const configs: Options = {
  ...tsupDefaults,
  entry: {
    index: 'src/index.ts',
    'test-utils': 'src/test-utils.ts',
    'cli-utils': 'src/cli-utils.ts',
  },
};

export default configs;
