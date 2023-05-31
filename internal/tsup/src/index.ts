/**
 * [NOTE.1]
 * All `primary` DTS files must import `secondary` ones for all
 * packages containing multiple entry-points. We do this by injecting
 * the required `import` lines in the primary DTS file via the
 * TSUP `dts.banner` config property.
 */

/**
 * [NOTE.2]
 * Due to the limitations of TSUP regarding config inheritance, we
 * exports ready-to-go configurations for most used scenarios in the
 * monorepo. More complex configs can be done in isolation.
 */

import type { Options } from 'tsup';

/**
 * Entrypoints:
 *  - src/index.ts
 */
export const index: Options = {
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['cjs', 'esm', 'iife'],
  minify: false,
  sourcemap: true,
  splitting: false,
};

/**
 * Entrypoints:
 *  - src/index.ts
 *  - src/configs.ts
 */
export const indexAndConfigs: Options[] = [
  {
    ...index,
    entry: { index: 'src/index.ts' },
    dts: { banner: `import './configs';` },
  },
  {
    ...index,
    entry: { configs: 'src/configs.ts' },
  },
];

/**
 * Entrypoints:
 *  - src/index.ts
 *  - src/bin.ts
 *  - src/cli.ts
 */
export const indexBinAndCli: Options[] = [
  {
    ...index,
    dts: { banner: `import './bin'; import './cli';` },
  },
  {
    ...index,
    entry: { bin: 'src/bin.ts', cli: 'src/cli.ts' },
  },
];
