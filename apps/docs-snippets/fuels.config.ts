import { createConfig } from 'fuels';

export default createConfig({
  workspace: './test/fixtures/forc-projects',
  output: './test/typegen',
  forcBuildFlags: ['--debug'],
  forcPath: 'fuels-forc',
  fuelCorePath: 'fuels-core',
});
