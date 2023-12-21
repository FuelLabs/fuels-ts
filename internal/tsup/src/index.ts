/**
 * [NOTE]
 * Due to the limitations of TSUP regarding config inheritance, we
 * exports ready-to-go configurations for most used scenarios in the
 * monorepo. More complex configs can be done in isolation.
 */

import type { Options } from 'tsup';

export const tsupDefaults: Options = {
  clean: true,
  dts: false,
  format: ['cjs', 'esm', 'iife'],
  minify: false,
  sourcemap: true,
  splitting: false,
};

export const index: Options = {
  ...tsupDefaults,
  entry: {
    index: 'src/index.ts',
  },
};

export const indexAndConfigs: Options = {
  ...tsupDefaults,
  entry: {
    index: 'src/index.ts',
    configs: 'src/configs.ts',
  },
};

export const indexBinAndCliConfig: Options = {
  ...tsupDefaults,
  entry: {
    index: 'src/index.ts',
    bin: 'src/bin.ts',
    cli: 'src/cli.ts',
  },
};

export const binAndCli: Options = {
  ...tsupDefaults,
  entry: {
    bin: 'src/bin.ts',
    cli: 'src/cli.ts',
  },
};
