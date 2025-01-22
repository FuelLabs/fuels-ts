import { indexBinAndCliConfig } from '@internal/tsup';
import type { Options } from 'tsup';

const configs: Options = {
  ...indexBinAndCliConfig,
  loader: {
    '.hbs': 'text',
  },
};

export default configs;
