// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: {
    index: 'src/index.ts',
    configs: 'src/configs.ts',
  },
  format: ['cjs', 'esm', 'iife'],
  splitting: false,
  sourcemap: true,
  clean: false,
  minify: !options.watch,
}));
