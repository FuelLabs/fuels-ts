import { tsupDefaults } from '@internal/tsup';
import type { Options } from 'tsup';

const configs: Options = {
  ...tsupDefaults,
  entry: {
    index: 'src/index.ts',
    cli: 'src/cli.ts',
    bin: 'src/bin.ts',
    runTypegen: 'src/runTypegen.ts',
  },
  loader: {
    '.hbs': 'text',
  },
};

export default configs;
