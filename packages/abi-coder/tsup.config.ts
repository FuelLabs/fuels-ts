import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  format: ['cjs', 'esm'],
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: !options.watch,
}));
