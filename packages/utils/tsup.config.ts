import { index } from '@internal/tsup';
import type { Options } from 'tsup';

const entrypoints: Options[] = [
  {
    ...index,
    entry: { index: 'src/utils/index.ts' },
    dts: { banner: `import './test';` },
  },
  {
    ...index,
    entry: { test: 'src/test-utils/index.ts' },
  },
];

export default entrypoints;
