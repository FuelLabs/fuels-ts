import type { Options } from 'tsup';

import { tsupDtsDefaults } from './src';
import tsupPkg from './tsup.config';

const configs: Options = {
  ...tsupPkg,
  ...tsupDtsDefaults
};

export default configs;
