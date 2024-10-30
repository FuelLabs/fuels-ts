import { createConfig } from 'fuels';

export default createConfig({
  workspace: './sway',
  output: './src/snippets/typegend',
  forcBuildFlags: ['--release'],
  forcPath: 'fuels-forc',
  fuelCorePath: 'fuels-core',
});
