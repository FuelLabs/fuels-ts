import { indexBinAndCliConfig } from '@internal/tsup';

export default {
  ...indexBinAndCliConfig,
  entry: {
    ...indexBinAndCliConfig.entry,
    'cli-utils': 'src/cli-utils.ts',
  },
};
