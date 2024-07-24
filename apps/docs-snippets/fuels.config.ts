import { createConfig } from 'fuels';

export default createConfig({
  workspace: './test/fixtures/forc-projects',
  output: './test/typegen',
  forcBuildFlags: [],
  forcPath: 'fuels-forc',
  fuelCorePath: 'fuels-core',
});
