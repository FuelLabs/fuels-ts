import { createConfig } from 'fuels';

export default createConfig({
  workspace: './sway-programs', // forc workspace
  output: './src/sway-programs-api',
  forcPath: 'fuels-forc',
  fuelCorePath: 'fuels-core',
});

/**
 * Check the docs:
 * https://fuellabs.github.io/fuels-ts/guide/fuels/config-file
 */
