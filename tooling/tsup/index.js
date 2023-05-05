/**
 * [NOTE.1]
 * All `primary` DTS files must import `secondary` ones
 * for all packages witgh multiple entry-points; which is done
 * via the `dts.banner` property that you can see in use below.
 *
 * [NOTE.2]
 * Due to the limitations of TSUP config files, this
 * approach was used. It basically exports ready-to-go
 * configurations for most used configs in the monorepo.
 */

/** @type { import('tsup').Options } */
exports.index = {
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['cjs', 'esm', 'iife'],
  minify: false,
  sourcemap: true,
  splitting: false,
};

/** @type { import('tsup').Options[] } */
exports.indexAndConfig = [
  {
    ...exports.index,
    entry: { index: 'src/index.ts' },
    dts: { banner: `import './configs';` },
  },
  {
    ...exports.index,
    entry: { configs: 'src/configs.ts' },
  },
];

/** @type { import('tsup').Options[] } */
exports.indexBinAndCli = [
  {
    ...exports.index,
    dts: { banner: `import './bin'; import './cli';` },
  },
  {
    ...exports.index,
    entry: { bin: 'src/bin.ts', cli: 'src/cli.ts' },
  },
];
