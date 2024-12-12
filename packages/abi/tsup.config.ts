import { index } from '@internal/tsup';
import type { Options } from 'tsup';

const configs: Options = {
  ...index,
  loader: {
    '.hbs': 'text',
  },
};

export default configs;
