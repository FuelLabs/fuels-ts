// #region config
import { createConfig } from 'fuels';

export default createConfig({
  workspace: './sway-programs', // forc workspace
  output: './src/sway-programs-api',
  forcPath: 'fuels-forc',
  fuelCorePath: 'fuel-core',
});
// #endregion config

/**
 * Check the docs:
 * https://fuellabs.github.io/fuels-ts/guide/fuels/config-file
 */
