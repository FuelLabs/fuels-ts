import { index } from '@internal/tsup';

export default {
  ...index,
  entry: ['src/index.ts', 'src/cli.ts', 'src/install.ts', 'src/update.ts'],
};
