/**
 * We don't inherit from '@internal/tsup' for this
 * case because at this point, the package might not
 * have been built yet, since this config will probably
 * be called before the `build` even starts.
 */
// import { index } from '@internal/tsup';

export default {
  clean: true,
  dts: true,
  entry: ['src/index.ts', 'src/cli.ts', 'src/install.ts', 'src/update.ts'],
  format: ['cjs', 'esm', 'iife'],
  minify: false,
  sourcemap: true,
  splitting: false,
};
