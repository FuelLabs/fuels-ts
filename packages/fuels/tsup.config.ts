import { indexBinAndCliConfig } from '@internal/tsup';
import type { Options } from 'tsup';

const options: Options = {
  ...indexBinAndCliConfig,
  entry: {
    ...indexBinAndCliConfig.entry,
    api: 'src/api.ts',
    'test-utils': 'src/test-utils.ts',
  },
  loader: {
    '.hbs': 'text',
  },
};

export default options;
