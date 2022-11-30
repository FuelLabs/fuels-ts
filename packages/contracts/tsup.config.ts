import { defineConfig } from 'tsup';

export default defineConfig((options) => [
  {
    entry: {
      index: 'src/index.ts',
      cli: 'src/bin/cli.ts',
      bin: 'src/bin/bin.ts',
    },
    clean: true,
    dts: {
      entry: './src/index.ts',
    },
    noExternal: ['*'],
    format: ['cjs', 'esm'],
    minify: !options.watch,
  },
]);
