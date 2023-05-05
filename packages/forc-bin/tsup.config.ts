import { index } from '@tooling/tsup';

export default {
  ...index,
  entry: ['src/index.ts', 'src/cli.ts', 'src/install.ts', 'src/update.ts'],
};
