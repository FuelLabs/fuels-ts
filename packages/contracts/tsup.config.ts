import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: {
    index: 'src/index.ts',
    cli: 'src/bin/cli.ts',
    bin: 'src/bin/bin.ts',
  },
  format: ['cjs', 'esm', 'iife'],
  splitting: false,
  sourcemap: true,
  minify: !options.watch,
}));
