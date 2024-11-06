import { createConfig } from 'fuels';

export default createConfig({
  workspace: './test/fixtures/forc-projects',
  output: './test/typegen',
  forcBuildFlags: ['--release'],
  forcPath: 'fuels-forc',
  fuelCorePath: 'fuels-core',
  fuelCorePort: 4001,
  providerUrl: 'http://127.0.0.1:4001/v1/graphql',
});
