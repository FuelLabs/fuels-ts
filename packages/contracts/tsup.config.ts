import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: {
    index: 'src/index.ts',
    cli: 'src/bin/cli.ts',
    bin: 'src/bin/bin.ts',
  },
  format: ['cjs', 'esm'],
  noExternal: [
    '@ethersproject/bytes',
    '@fuel-ts',
    'chalk',
    'commander',
    'joycon',
    'lodash.camelcase',
    'toml',
    'yup',
  ],
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: !options.watch,
  loader: {
    '.hbs': 'text',
  },
}));
