import { indexBinAndCliConfig } from '@internal/tsup';
import type { Options } from 'tsup';

const options: Options = {
  ...indexBinAndCliConfig,
  loader: {
    '.hbs': 'text',
  },
};

export default options;
