import type { Options } from 'tsup';

import tsupDefaults from './tsup.config';

const configs: Options = {
  ...tsupDefaults,
  tsconfig: 'tsconfig.dts.json',
  'sourcemap': true,
  'dts': true,
  clean: false
};

export default configs;
