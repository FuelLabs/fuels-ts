import { tsupDefaults } from '@internal/tsup';

export default (options) => ({
  ...tsupDefaults,
  entry: {
    index: 'src/index.ts',
    cli: 'src/cli.ts',
    bin: 'src/bin.ts',
    runTypegen: 'src/runTypegen.ts',
  },
  format: ['cjs', 'esm'],
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: !options.watch,
  loader: {
    '.hbs': 'text',
  },
});
