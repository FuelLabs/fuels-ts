import { tsupDtsDefaults } from '@internal/tsup';
import type { Options } from 'tsup';

import { keystoreOptions } from './tsup.config';

const configs: Options[] = keystoreOptions.map((config) => ({
  ...config,
  ...tsupDtsDefaults,
}));

export default configs;
