import { createConfig } from 'fuels';

export default createConfig({
  workspace: './test/fixtures/forc-projects',
  output: './test/typegen',
  forcBuildFlags: ['--release', '--experimental', 'error_type'],
  forcPath: 'fuels-forc',
  fuelCorePath: 'fuels-core',
  fuelCorePort: 0,
});
