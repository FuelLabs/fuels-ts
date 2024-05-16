import { createConfig } from 'fuels';

export default createConfig({
  workspace: './sway-programs', // forc workspace
  output: './src/sway-programs-api',
  forcPath: 'fuels-forc',
  fuelCorePath: 'fuels-core',
});

/**
 * Check the docs:
 * https://docs.fuel.network/docs/fuels-ts/fuels-cli/config-file/
 */
