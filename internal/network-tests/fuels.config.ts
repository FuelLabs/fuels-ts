import { createConfig } from 'fuels';

export default createConfig({
  workspace: './src/sway',
  output: './src/typegen',
  forcBuildFlags: ['--release'],
  forcPath: 'fuels-forc',
  fuelCorePath: 'fuels-core',
});
