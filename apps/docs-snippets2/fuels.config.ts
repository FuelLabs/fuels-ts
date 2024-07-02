import { createConfig } from 'fuels';

export default createConfig({
  workspace: './sway',
  output: './src/typegend',
  forcBuildFlags: ['--release'],
});
