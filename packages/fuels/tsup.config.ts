import { getIndexBinAndCliConfig } from '@internal/tsup';

export default (options) => ({
  ...getIndexBinAndCliConfig(options),
  loader: {
    '.hbs': 'text',
  },
});
