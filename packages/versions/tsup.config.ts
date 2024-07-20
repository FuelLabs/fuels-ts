import { indexBinAndCliConfig } from '@internal/tsup';

export default {
  entry: {
    ...indexBinAndCliConfig.entry,
    'cli-utils': 'src/cli-utils.ts',
  },
};
