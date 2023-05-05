import { index } from '@internal/tsup';
import type { Options } from 'tsup';

const primary = {
  index: 'src/index.ts',
};

const secondaries = {
  configs: 'src/configs.ts',
};

const configs: Options[] = [
  {
    ...index,
    entry: { ...primary },
    dts: {
      banner: Object.keys(secondaries)
        .map((key) => `import './${key}';`)
        .join('\n'),
    },
  },
  {
    ...index,
    entry: { ...secondaries },
  },
];

export default configs;
