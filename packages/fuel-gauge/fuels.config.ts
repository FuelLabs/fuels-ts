import { createConfig } from 'fuels';

export default createConfig({
  workspace: './test/fixtures/forc-projects',
  output: './test/typegen',
  forcBuildFlags: ['--release', '--experimental', 'storage_domains,partial_eq,try_from_bytes_for_b256'],
  forcPath: 'fuels-forc',
  fuelCorePath: 'fuels-core',
  fuelCorePort: 0,
});
