import { tsupDefaults } from '@internal/tsup';
import type { Options } from 'tsup';

const configs: Options = {
  ...tsupDefaults,
  entry: {
    index: 'src/index.ts',
    configs: 'src/configs.ts',
    'test-utils': 'src/test-utils.ts',
  },
};

export default configs;
