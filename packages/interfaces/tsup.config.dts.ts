import { tsupDtsDefaults } from '@internal/tsup';
import type { Options } from 'tsup';

import tsupPkg from './tsup.config';

const configs: Options = {
  ...tsupPkg,
  ...tsupDtsDefaults,
};

export default configs;
