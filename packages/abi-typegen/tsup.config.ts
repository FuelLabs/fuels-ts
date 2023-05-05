import { index } from '@tooling/tsup';
import type { Options } from 'tsup';

const primary = {
  index: 'src/index.ts',
};

const secondaries = {
  cli: 'src/cli.ts',
  bin: 'src/bin.ts',
  runTypegen: 'src/runTypegen.ts',
};

const commonOptions: Options = {
  ...index,
  loader: {
    '.hbs': 'text',
  },
};

const configs: Options[] = [
  {
    ...commonOptions,
    entry: { ...primary },
    dts: {
      banner: Object.keys(secondaries)
        .map((key) => `import './${key}';`)
        .join('\n'),
    },
  },
  {
    ...commonOptions,
    entry: { ...secondaries },
  },
];

export default configs;
