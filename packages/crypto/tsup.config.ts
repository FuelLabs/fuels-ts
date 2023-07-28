import { index } from '@internal/tsup';
import type { Options } from 'tsup';

export const keystoreOptions: Options[] = [
  {
    ...index,
    entry: ['src/index.ts'],
    format: ['cjs'],
  },
  {
    ...index,
    entry: ['src/index.ts', 'src/index.browser.ts'],
    format: ['esm'],
  },
];

export default keystoreOptions;
